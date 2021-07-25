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

export default class Dummy extends React.Component {
  constructor(props: any) {
    super(props)
    console.log('props: ', props)
    this.state = ({
      loginType: undefined
    })
  }

  componentDidMount() {
    this.loadData()
  }

  renderRequestType(loginType: string) {
    if (loginType === '1') {
      //返回 我要求职 Tab页面
      const { stacks } = RequestJobRouterStacks
      return (
        Object.keys(stacks).map(stack => (
          <Stack.Screen
            key={stack}
            name={stack}
            component={stacks[stack]}
          />
        ))
      )
    }
    if (loginType === '2') {
      //返回 我要找人 Tab页面

    }
    if (loginType === '3') {
      //返回 我要创业或投资 Tab页面

    }
    //未登录,返回登录页面(默认)
    const { stacks } = RequestLoginStacks
    return (
      Object.keys(stacks).map(stack => (
        <Stack.Screen
          key={stack}
          name={stack}
          component={stacks[stack]}
        />
      ))
    )
  }

  loadData() {
    AsyncStorage.getItem(Login_type, (error, result) => {
      if (!error && result) {
        console.log('result: ', result)
        // this.setState({})
        this.setState({ loginType: result })
      } else {
        this.setState({ loginType: 0 })
      }
    })
  }

  render() {
    const { loginType } = this.state
    if (loginType === undefined) {
      return null
    }
    return (
      <Stack.Navigator
        headerMode="none"
      >
        {this.renderRequestType(loginType)}
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
