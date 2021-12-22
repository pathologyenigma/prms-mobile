import { hostUri, wssUri } from './config'
import { WebSocketLink } from '@apollo/link-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import {
  ApolloClient,
  ApolloLink,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import * as Auth from './auth'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { refreshToken } from './refreshToken'

const wsClient = new SubscriptionClient(wssUri, {
  reconnect: true,
  lazy: true,
  connectionParams: async () => {
    const token = await Auth.getToken()
    console.log('[SubscriptionClient] connectionParams', token)
    return {
      Authorization: token ?? '',
    }
  },
  connectionCallback: (error, result) => {
    if (error) {
      console.warn('[SubscriptionClient] connectionCallback', error, result)
    } else {
      console.log('[SubscriptionClient] connectionCallback', error, result)
    }
  },
})

const wsLink = new WebSocketLink(wsClient)

const httpLink = new HttpLink({
  uri: hostUri,
})

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
      for (let error of graphQLErrors) {
        console.warn(`[GraphQL error]:  ${JSON.stringify(error, null, 2)}`)

        if (error.extensions.code === 'UNAUTHENTICATED') {
          const headers = operation.getContext().headers
          if (headers) {
            return fromPromise(
              Auth.getToken()
                .then(token => {
                  const usedToken = headers['Authorization'] as string
                  if (token === null || !usedToken) {
                    Auth.logout()
                    throw new Error('UNAUTHENTICATED')
                  }
                  if (token !== usedToken) {
                    return
                  }

                  return refreshToken()
                })
                .then(() => true)
                .catch(() => false),
            )
              .filter(value => value)
              .flatMap(() => {
                return forward(operation)
              })
          }
          Auth.logout()
        }
      }

    if (networkError) console.warn(`[Network error]: ${networkError}`)
  },
)

const authLink = setContext(async (_, { headers }) => {
  const token = await Auth.getToken()
  return {
    headers: {
      ...headers,
      Authorization: token ?? '',
    },
  }
})

const loggingLink = new ApolloLink((operation, forward) => {
  console.log(
    '[logging][request]',
    operation.operationName,
    operation.variables,
    operation.getContext().headers,
  )
  return forward(operation).map(result => {
    console.log('[logging][response]', result.data)
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

const client = new ApolloClient({
  link: newLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
})

const reset = () => {
  wsClient.unsubscribeAll()
  wsClient.close(false, true)
  client.stop()
}

export { client, reset }
