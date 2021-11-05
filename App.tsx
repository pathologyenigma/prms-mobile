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
  ApolloProvider,
} from "@apollo/client"
import { initApolloClient } from './src/utils/postQuery'

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <ApolloProvider client={initApolloClient()}>
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
