import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { Provider as AntProvider } from '@ant-design/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloProvider } from '@apollo/client'
import { initApolloClient } from './utils/postQuery'
import { Login_Identity, Login_Token, Log_Out } from './utils/constant'
import AsyncStorage from '@react-native-community/async-storage'
import RootLoading from './utils/rootLoading'
import { navigationRef, setNavigationReady } from './RootNavigation'
import { createStackNavigator } from '@react-navigation/stack'
import RequestJobRouterStacks from './navigator/requestJob/stack'
import { Route as RenderRequestZhaopinTabs } from './recruitment'
import RequestLoginStacks from './navigator/loginPages/stack'
import { DeviceEventEmitter, EmitterSubscription } from 'react-native'
import Splash from './bridge/splash'

const Stack = createStackNavigator()

function RenderLoginContainer() {
  const { stacks } = RequestLoginStacks
  return (
    <Stack.Navigator headerMode="none">
      {Object.keys(stacks).map(stack => (
        <Stack.Screen key={stack} name={stack} component={stacks[stack]} />
      ))}
    </Stack.Navigator>
  )
}

function RenderRequestJobTabs() {
  const { stacks } = RequestJobRouterStacks
  return (
    <Stack.Navigator headerMode="none">
      {Object.keys(stacks).map(stack => (
        <Stack.Screen key={stack} name={stack} component={stacks[stack]} />
      ))}
    </Stack.Navigator>
  )
}

interface IProps {}
interface IStates {
  localToken: string | undefined
  loginIdentity: string | undefined
}

class App extends Component<IProps, IStates> {
  constructor(props: any) {
    super(props)
    this.state = {
      localToken: undefined,
      loginIdentity: undefined,
    }
    this.renderNotification = this.renderNotification.bind(this)
  }

  private subscriptions: EmitterSubscription[] = []

  renderNotification() {
    this.loadData()
  }

  componentDidMount() {
    setNavigationReady(false)
    AsyncStorage.getItem(Login_Token)
      .then((result: any) => {
        if (result) {
          this.setState({ localToken: result })
        } else {
          this.setState({ localToken: '' })
        }
      })
      .catch(error => {
        this.setState({ localToken: '' })
      })

    this.subscriptions = [
      DeviceEventEmitter.addListener(Log_Out, this.renderNotification),
      DeviceEventEmitter.addListener(Login_Identity, this.renderNotification),
    ]
    this.loadData()
  }

  componentWillUnmount() {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => {
        subscription.remove()
      })
    }
  }

  componentDidUpdate() {
    setNavigationReady(false)
    if (
      this.state.loginIdentity !== undefined &&
      this.state.localToken !== undefined
    ) {
      Splash.hide()
    }
  }

  loadData() {
    RootLoading.loading()
    AsyncStorage.getItem(Login_Identity, (error, result) => {
      console.log('--------" ', error, result)
      RootLoading.hide()
      if (!error && result) {
        this.setState({
          loginIdentity: result,
        })
      } else {
        this.setState({
          loginIdentity: 'Auth',
        })
      }
    })
  }

  render() {
    if (this.state.localToken === undefined) {
      return null
    }

    if (this.state.loginIdentity === undefined) {
      return null
    }

    if (this.state.loginIdentity === 'Auth') {
      return (
        <NavigationContainer
          key="Auth"
          ref={navigationRef}
          onReady={() => {
            setNavigationReady(true)
          }}>
          <AntProvider>
            <ApolloProvider client={initApolloClient(this.state.localToken)}>
              <Provider store={store}>
                <RenderLoginContainer />
              </Provider>
            </ApolloProvider>
          </AntProvider>
        </NavigationContainer>
      )
    }

    if (this.state.loginIdentity === 'PersonalUser') {
      return (
        <NavigationContainer
          key="PersonalUser"
          ref={navigationRef}
          onReady={() => {
            setNavigationReady(true)
          }}>
          <AntProvider>
            <ApolloProvider client={initApolloClient(this.state.localToken)}>
              <Provider store={store}>
                <RenderRequestJobTabs />
              </Provider>
            </ApolloProvider>
          </AntProvider>
        </NavigationContainer>
      )
    }

    if (this.state.loginIdentity === 'EnterpriseUser') {
      return (
        <NavigationContainer
          key="EnterpriseUser"
          ref={navigationRef}
          onReady={() => {
            setNavigationReady(true)
          }}>
          <AntProvider>
            <ApolloProvider client={initApolloClient(this.state.localToken)}>
              <Provider store={store}>
                <RenderRequestZhaopinTabs />
              </Provider>
            </ApolloProvider>
          </AntProvider>
        </NavigationContainer>
      )
    }

    return null
  }
}

export default App
