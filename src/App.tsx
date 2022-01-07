import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { Provider as AntProvider } from '@ant-design/react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloProvider } from '@apollo/client'
import { client, reset } from './utils/client'
import { Login_Identity, Log_Out } from './utils/constant'
import { navigationRef, setNavigationReady } from './RootNavigation'
import { createStackNavigator } from '@react-navigation/stack'
import RequestJobRouterStacks from './navigator/requestJob/stack'
import { Route as RenderRequestZhaopinTabs } from './recruitment'
import RequestLoginStacks from './navigator/loginPages/stack'
import { DeviceEventEmitter, StatusBar } from 'react-native'
import Splash from './bridge/splash'
import { setApolloClient } from './utils/postQuery'
import { Identity, getTargetIdentity } from './utils/auth'
import { setApolloClient as setApolloClientForRefreshToken } from './utils/refreshToken'
import RootLoading from './utils/rootLoading'

setApolloClient(client)
setApolloClientForRefreshToken(client)

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

function App() {
  useEffect(() => {
    setNavigationReady(false)
  }, [navigationRef.current])

  const [identity, setIdentity] = useState<Identity | null>()

  useEffect(() => {
    if (identity !== undefined) {
      Splash.hide()
    }
  }, [identity])

  useEffect(() => {
    const renderNotification = async () => {
      const identity = await getTargetIdentity()
      console.log(
        '----------------------identity------------------------',
        identity,
      )
      reset()
      RootLoading.hide()
      setIdentity(identity as Identity)
    }

    const subscriptions = [
      DeviceEventEmitter.addListener(Log_Out, renderNotification),
      DeviceEventEmitter.addListener(Login_Identity, renderNotification),
    ]

    renderNotification()

    return () => {
      subscriptions.forEach(subscription => {
        subscription.remove()
      })
    }
  }, [])

  let container

  if (identity === undefined) {
    container = null
  }

  if (identity === null) {
    container = (
      <NavigationContainer
        key="Auth"
        ref={navigationRef}
        onReady={() => {
          setNavigationReady(true)
        }}>
        <RenderLoginContainer />
      </NavigationContainer>
    )
  }

  if (identity === 'PersonalUser') {
    container = (
      <NavigationContainer
        key="PersonalUser"
        ref={navigationRef}
        onReady={() => {
          setNavigationReady(true)
        }}>
        <RenderRequestJobTabs />
      </NavigationContainer>
    )
  }

  if (identity === 'EnterpriseUser') {
    container = (
      <NavigationContainer
        key="EnterpriseUser"
        ref={navigationRef}
        onReady={() => {
          setNavigationReady(true)
        }}>
        <RenderRequestZhaopinTabs />
      </NavigationContainer>
    )
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar translucent backgroundColor="transparent" />
          <AntProvider>{container}</AntProvider>
        </SafeAreaProvider>
      </Provider>
    </ApolloProvider>
  )
}

export default App
