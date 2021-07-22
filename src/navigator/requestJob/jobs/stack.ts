import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Component, PureComponent, ClassAttributes, Key } from 'react'
import { ConnectedComponent } from 'react-redux'
import LoginScreen from '../../../pages/loginInfo/Login'
import ForgetPassword from '../../../pages/loginInfo/ForgetPassword'
import ChooseRole from '../../../pages/loginInfo/ChooseRole'
import Jobs from '../../../pages/requestJob/jobs/Jobs'

type TRouterParams = {
  Jobs: any,
  LoginScreen: any,
  ForgetPassword: any,
  ChooseRole: any,
}

export type GenProps<RouteName extends keyof TRouterParams> = {
  route: RouteProp<TRouterParams, RouteName>
  navigation: StackNavigationProp<TRouterParams, RouteName>
}

export default class RouterStacks {
  /**
   * 路由栈
   */

  public static readonly stacks: {
    [key: string]: any
  } = {
      LoginScreen,
      ForgetPassword,
      ChooseRole,
      Jobs,
    }
}
