import React, { Component } from 'react'
import {
  Image, ImageRequireSource, StatusBar, Text,
  TouchableOpacity, View, StyleProp, TextStyle, ImageStyle,
} from 'react-native'
import SystemHelper from '../../../utils/system'
import Styles from './styles'

export enum EButtonType {
  TEXT,
  IMAGE,
}

interface IButtonProps {
  type: EButtonType,
  value: string | ImageRequireSource,
  disable?: boolean,
  act?: () => void,
  style?: any,
  viewStyle?: any,
}

export interface INavBarProps {
  left?: IButtonProps
  title?: string
  right?: IButtonProps
  barStyle?: Object
  statusBarTheme?: 'dark-content' | 'default' | 'light-content' | undefined
  titleStyle?: Object
}

export default class NavBar extends Component<INavBarProps> {
  private renderLeft(): JSX.Element | null {
    const { left } = this.props
    if (!left) {
      return <View style={Styles.left} />
    }
    let content
    if (left.type === EButtonType.IMAGE) {
      content = (
        <Image
          style={[Styles.icon, left.style]}
          resizeMode="contain"
          source={left.value as ImageRequireSource}
        />
      )
    } else {
      content = (
        <Text style={[Styles.font, left.style]}>
          {left.value}
        </Text>
      )
    }
    return (
      <TouchableOpacity
        style={Styles.left}
        activeOpacity={0.9}
        disabled={!left.act}
        onPress={() => {
          if (left.act) {
            left.act()
          }
        }}
      >
        {content}
      </TouchableOpacity >
    )
  }

  private renderTitle(): JSX.Element | null {
    const { title, titleStyle } = this.props
    return (
      <Text style={[Styles.title, titleStyle]}>
        {title ?? ''}
      </Text>
    )
  }

  private renderRight(): JSX.Element | null {
    const { right, rightContent } = this.props
    if (rightContent) {
    	return rightContent
    }
    if (!right) {
      return <View style={Styles.right} />
    }
    let content
    if (right.type === EButtonType.IMAGE) {
      content = (
        <Image
          style={[Styles.icon, right.style]}
          resizeMode="contain"
          source={right.value as ImageRequireSource}
        />
      )
    } else {
      content = (
        <Text style={[Styles.font, right.style]}>
          {right.value}
        </Text>
      )
    }
    return (
      <TouchableOpacity
        style={[Styles.right, right.disable && { opacity: 0.5 }, right.viewStyle]}
        activeOpacity={0.8}
        onPress={() => {
          if (right.act) {
            right.act()
          }
        }}
        disabled={right.disable}
      >
        {content}
      </TouchableOpacity>
    )
  }

  render() {
    const { barStyle, statusBarTheme } = this.props
    return (
      <View>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={statusBarTheme || 'dark-content'}
        />
        <View style={[Styles.bar, barStyle]}>
          {this.renderLeft()}
          {this.renderTitle()}
          {this.renderRight()}
        </View>
      </View>
    )
  }
}
