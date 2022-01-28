import { hostUri, wssUri } from './config'
import { WebSocketLink } from '@apollo/link-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import {
  ApolloClient,
  ApolloLink,
  from,
  fromPromise,
  InMemoryCache,
  split,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import * as Auth from './auth'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { refreshToken } from './refreshToken'
import { createUploadLink } from 'apollo-upload-client'

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
})

const wsLink = new WebSocketLink(wsClient)

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
      for (let error of graphQLErrors) {
        console.warn(`[GraphQL error]:  ${JSON.stringify(error, null, 2)}`)
        if (error.extensions.code === 'UNAUTHENTICATED') {
          if (operation.operationName === 'UserRefreshToken') {
            Auth.logout()
            return
          }

          const def = getMainDefinition(operation.query)
          const isWs =
            def.kind === 'OperationDefinition' &&
            def.operation === 'subscription'

          return fromPromise(
            Auth.getToken().then(async token => {
              if (token === null) {
                Auth.logout()
                return false
              }

              const headers = operation.getContext().headers
              if (headers) {
                const usedToken = headers['Authorization'] as string
                // token 已经刷新了
                if (usedToken && usedToken !== token) {
                  return true
                }
              }

              try {
                await refreshToken()
                return true
              } catch (e) {
                if (isWs) {
                  Auth.logout()
                }
                return false
              }
            }),
          )
            .filter(value => value)
            .flatMap(() => {
              if (isWs) {
                wsClient.unsubscribeAll()
                wsClient.close(false, false)
              }
              return forward(operation)
            })
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

const httpLink = createUploadLink({ uri: hostUri })

const newLink = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    )
  },
  from([errorLink, wsLink]),
  from([errorLink, authLink, loggingLink, httpLink as any]),
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
  client.stop()
  wsClient.unsubscribeAll()
  wsClient.close(false, false)
}

export { client, reset }
