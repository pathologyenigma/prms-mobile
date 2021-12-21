import { hostUri, wssUri } from './config'
import { WebSocketLink } from '@apollo/link-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import * as Auth from './auth'

const newClient = () => {
  const wsLink = new WebSocketLink({
    uri: wssUri,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: async () => {
        const token = await Auth.getToken()
        console.log('----------connectionParams-----------', token)
        return {
          Authorization: token ?? '',
        }
      },
    },
  })

  const httpLink = new HttpLink({
    uri: hostUri,
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(error => {
        console.warn(`[GraphQL error]:  ${JSON.stringify(error, null, 2)}`)
        if (error.extensions.code === 'UNAUTHENTICATED') {
          Auth.logout()
        }
      })

    if (networkError) console.warn(`[Network error]: ${networkError}`)
  })

  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await Auth.getToken()
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ?? '',
      },
    }
  })

  const loggingLink = new ApolloLink((operation, forward) => {
    console.log(
      '[logging]',
      operation.operationName,
      operation.variables,
      operation.getContext().headers,
    )
    return forward(operation).map(result => {
      console.log('[logging]', result.data)
      return result
    })
  })

  const newLink = split(
    ({ query }) => {
      const def = getMainDefinition(query)
      return (
        def.kind === 'OperationDefinition' && def.operation === 'subscription'
      )
    },
    from([errorLink, wsLink]),
    from([errorLink, authLink, loggingLink, httpLink]),
  )

  return new ApolloClient({
    link: newLink,
    cache: new InMemoryCache(),
  })
}

let _client = newClient()

const client = () => {
  return _client
}

const reset = () => {
  _client.stop()
  _client = newClient()
}

export { client, reset }
