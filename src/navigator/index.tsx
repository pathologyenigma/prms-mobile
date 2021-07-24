import React, { Component } from 'react'
import {
  Image, NativeModules, View, Text, AsyncStorage, InteractionManager, TextBase,
} from 'react-native'
import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack'
import * as http from '../utils/http'
import { connect } from 'react-redux'
import SystemHelper from '../utils/system'
import RequestJobRouterStacks from '../navigator/requestJob/stack'
import RequestLoginStacks from '../navigator/loginPages/stack'
import RootLoading from '../utils/rootLoading'

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
    console.log('props: ', props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const { navigation } = this.props
    console.log('判断是否有登录: ', navigation)
    // TODO: 判断是否登录
    // todo: 判断需要跳转到的模块
    navigation.navigate('RenderRequestJobTabs')
    // RootLoading.loading('正在加载中...')
    // setTimeout(() => {
    //   RootLoading.hide()
    //   navigation.navigate('RenderRequestJobTabs')
    // }, 1000);
  }

  render() {
    return null
  }
}

const Router = createSwitchNavigator(
  {
    Dummy,
    RenderLoginContainer,
    RenderRequestJobTabs,
  },
  {
    initialRouteName: 'Dummy',
  },
)

const mapStateToProps = (state: any) => {
  return {

  }
}
export default connect(mapStateToProps)(Router)
