import 'react-native-gesture-handler'
import React, { Component } from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import Navigator from './src/navigator'
import store from './src/store'
import { Provider as AntProvider } from '@ant-design/react-native'
import {
  NavigationContainer,
} from '@react-navigation/native'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client"

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
})

// const client = ...

client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log('111111111111: ', result));


class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <ApolloProvider client={client}>
          <AntProvider>
            <Provider store={store}>
              <Navigator />
            </Provider>
          </AntProvider>
        </ApolloProvider>
      </NavigationContainer>
    )
  }
}

export default App
