import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Component, PureComponent, ClassAttributes, Key } from 'react'
import { ConnectedComponent } from 'react-redux'
import LoginScreen from '../../pages/loginInfo/Login'
import ForgetPassword from '../../pages/loginInfo/ForgetPassword'
import ChooseRole from '../../pages/loginInfo/ChooseRole'
import AgreementPrivacy from '../../pages/loginInfo/AgreementPrivacy'
import InputVerifyCode from '../../pages/loginInfo/InputVerifyCode'

// import RequestJob from '../requestPerson/index'
// import AppRouter from '../../navigator'

type TRouterParams = {
  LoginScreen: any,
  ForgetPassword: any,
  ChooseRole: any,
  AgreementPrivacy: { pageType: number } // 1: 用户协议 2: 隐私政策
  InputVerifyCode: any
  // RequestJob: any,
  // AppRouter: any,
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
      AgreementPrivacy,
      InputVerifyCode,
      // RequestJob,
      // AppRouter,
    }
}
