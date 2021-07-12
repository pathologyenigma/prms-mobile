import React, { Component } from 'react'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import Routers from './src/pages/router'
import store from './src/store'
import { Provider as AntProvider } from '@ant-design/react-native'

class App extends Component {
  render() {
    return (
      <AntProvider>
        <Provider store={store}>
          <Routers />
        </Provider>
      </AntProvider>
    )
  }
}

export default App
