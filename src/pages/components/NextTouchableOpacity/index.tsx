import React, { PureComponent } from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'

interface IButton {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  delay?: number
  children?: JSX.Element[] | JSX.Element
  target?: any
  disabled?: boolean
  playSound?: boolean
}

export default class NextTouchableOpacity extends PureComponent<IButton> {
  private press(onPress: any, delay = 300, e: object) {
    let { target = 'self' } = this.props
    if (target === 'self') {
      target = this
    } else {
      target = global
    }
    if (target.didPress) {
      return
    }
    target.didPress = true
    if (onPress) {
      onPress(e)
    }
    setTimeout(() => {
      target.didPress = false
    }, delay)
  }

  render() {
    const { onPress, children, delay, disabled } = this.props
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={disabled}
        {...this.props}
        onPress={(e) => {
          if (onPress) {
            this.press(onPress, delay, e)
          }
        }}
      >
        {children}
      </TouchableOpacity>
    )
  }
}
