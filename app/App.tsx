import 'react-native-gesture-handler'
import HTInitManager from '~/common/init/HTInitManager'
HTInitManager.init()
import HTAuthManager from '~/common/auth/common/model/HTAuthManager'

import SystemHelper from './utils/system'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, NativeModules } from 'react-native'
import { Provider } from 'react-redux'
import { Provider as AntProvider } from '@ant-design/react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import RequestJobRouterStacks from './navigator/requestJob/stack'
import { Route as RenderRequestZhaopinTabs } from './recruitment'
import RequestLoginStacks from './navigator/loginPages/stack'
import { DeviceEventEmitter, StatusBar } from 'react-native'
import HTGlobalModalPage from '~/common/modal/HTGlobalModalPage'

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

  const [identity, setIdentity] = useState()

  NativeModules.SplashModule.hideSplash()

  useEffect(() => {
    const renderNotification = async () => {
      const identity = HTAuthManager.keyValueList.userRole
      setIdentity(identity)
    }

    const subscriptions = [
      DeviceEventEmitter.addListener(HTAuthManager.kHTUserRoleDidChangeNotice, renderNotification),
    ]

    renderNotification()

    return () => {
      subscriptions.forEach(subscription => {
        subscription.remove()
      })
    }
  }, [])

  let container

  if ((identity?.length ?? 0) <= 0) {
    container = (
      <NavigationContainer
        key="Auth"
        onReady={() => {
          
        }}>
        <RenderLoginContainer />
      </NavigationContainer>
    )
  }

  if (identity === 'PersonalUser') {
    container = (
      <NavigationContainer
        key="PersonalUser"
        onReady={() => {
          
        }}>
        <RenderRequestJobTabs />
      </NavigationContainer>
    )
  }

  if (identity === 'EnterpriseUser') {
    container = (
      <NavigationContainer
        key="EnterpriseUser"
        onReady={() => {
          
        }}>
        <RenderRequestZhaopinTabs />
      </NavigationContainer>
    )
  }

  return (
  	<View style={{ flex: 1, backgroundColor: 'white' }}>
	{ container }
	<View pointerEvents={'box-none'} style={StyleSheet.absoluteFill}>
		<HTGlobalModalPage />
	</View>
	</View>
  )

  return (
	<AntProvider>
		
	</AntProvider>
  )
}

export default App
