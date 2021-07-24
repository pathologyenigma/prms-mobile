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

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AntProvider>
          <Provider store={store}>
            <Navigator />
          </Provider>
        </AntProvider>
      </NavigationContainer>
    )
  }
}

export default App
