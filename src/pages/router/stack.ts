import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Component, PureComponent, ClassAttributes, Key } from 'react'
import { ConnectedComponent } from 'react-redux'
import LoginScreen from '../loginInfo/Login'

type TRouterParams = {
  LoginScreen: undefined
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
    [key: string]: typeof Component
    | ConnectedComponent<typeof Component, Pick<Component, never>>
    | ConnectedComponent<typeof Component, Pick<any, any>>
  } = {
      LoginScreen,
    }
}
