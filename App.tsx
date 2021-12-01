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
import { Login_Token } from './src/utils/constant'
import AsyncStorage from '@react-native-community/async-storage'
import RootLoading from './src/utils/rootLoading'

interface IProps {

}
interface IStates {
  localToken: string | undefined,
}

class App extends Component<IProps, IStates> {
  constructor(props: any) {
    super(props)
    this.state = ({
      localToken: undefined
    })
  }

  componentDidMount() {
    AsyncStorage.getItem(Login_Token)
      .then((result: any) => {
        if (result) {
          this.setState({ localToken: result })
        } else {
          this.setState({ localToken: '' })
        }
      })
      .catch((error) => {
        this.setState({ localToken: '' })
      })
  }
  render() {
    if (this.state.localToken === undefined) {
      return null
    }
    return (
      <NavigationContainer>
        <AntProvider>
          <ApolloProvider client={initApolloClient(this.state.localToken)}>
            <Provider store={store}>
              <Navigator />
            </Provider>
          </ApolloProvider>
        </AntProvider>
      </NavigationContainer>
    )
  }
}

export default App
