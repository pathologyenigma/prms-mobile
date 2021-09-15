import React, { Component } from 'react'
import {
  Image, NativeModules, View, Text, InteractionManager, TextBase,
} from 'react-native'
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack'
import * as http from '../utils/http'
import { connect } from 'react-redux'
import SystemHelper from '../utils/system'
import RequestJobRouterStacks from '../navigator/requestJob/stack'
import RequestLoginStacks from '../navigator/loginPages/stack'
import RootLoading from '../utils/rootLoading'
import AsyncStorage from '@react-native-community/async-storage'
import { Login_type } from '../utils/constant'

const SplashScreen = NativeModules.SplashManager
const styles = {
  navbar: {
    backgroundColor: '#3574FA',
    height: SystemHelper.safeTop,
  }
}

const Stack = createStackNavigator()

function RenderLoginContainer() {
  const { stacks } = RequestLoginStacks
  return (
    <Stack.Navigator
      headerMode="none"
    >
      {
        Object.keys(stacks).map(stack => (
          <Stack.Screen
            key={stack}
            name={stack}
            component={stacks[stack]}
          />
        ))
      }
    </Stack.Navigator>
  )
}

function RenderRequestJobTabs() {
  const { stacks } = RequestJobRouterStacks
  return (
    <Stack.Navigator
      headerMode="none"
    >
      {
        Object.keys(stacks).map(stack => (
          <Stack.Screen
            key={stack}
            name={stack}
            component={stacks[stack]}
          />
        ))
      }
    </Stack.Navigator>
  )
}

class Dummy extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = ({
      loginType: undefined
    })
    this.loadData()
  }

  renderRequestType(loginType: string) {
    const { navigation } = this.props
    RootLoading.hide()
    if (loginType === '1') {
      //返回 我要求职 Tab页面
      navigation.navigate('RenderRequestJobTabs')
      return
    }
    // 默认返回 登录 Tab页面
    navigation.navigate('RenderLoginContainer')
    return
  }

  loadData() {
    RootLoading.loading()
    AsyncStorage.getItem(Login_type, (error, result) => {
      if (!error && result) {
        this.renderRequestType(result)
      } else {
        this.renderRequestType('0')
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1, }}>
      </View>
    )
  }
}

export default class Temp extends React.Component {
  render() {
    return (
      <Stack.Navigator
        headerMode="none"
        initialRouteName="Dummy"
      >
        <Stack.Screen key="Dummy" name="Dummy" component={Dummy} />
        <Stack.Screen key="RenderLoginContainer" name="RenderLoginContainer" component={RenderLoginContainer} />
        <Stack.Screen key="RenderRequestJobTabs" name="RenderRequestJobTabs" component={RenderRequestJobTabs} />
      </Stack.Navigator>
    )
  }
}

// const Router = createSwitchNavigator(
//   {
//     Dummy,
//     RenderLoginContainer,
//     RenderRequestJobTabs,
//   },
//   {
//     initialRouteName: 'Dummy',
//   },
// )

// const mapStateToProps = (state: any) => {
//   return {

//   }
// }
// export default connect(mapStateToProps)(Dummy)
