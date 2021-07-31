import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, StyleProp, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { gradienRightGreenColor, greenColor } from '../../../utils/constant'
import NextTouchableOpacity from '../NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
  },
  linear: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
})

interface IButton {
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  target?: any
  text: string
  disabled?: boolean
}

export default class GradientButton extends PureComponent<IButton> {
  renderInner(disabled, textStyle, text) {
    if (disabled) {
      return (
        <View style={styles.linear}>
          <Text style={[styles.text, textStyle]}>
            {text}
          </Text>
        </View>
      )
    }
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <LinearGradient
        start={start}
        end={end}
        colors={[greenColor, gradienRightGreenColor]}
        style={styles.linear}
      >
        <Text style={[styles.text, textStyle]}>
          {text}
        </Text>
      </LinearGradient>
    )
  }

  render() {
    const {
      text, containerStyle, textStyle, onPress, disabled,
    } = this.props
    return (
      <NextTouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.container, containerStyle]}
      >
        {this.renderInner(disabled, textStyle, text)}
      </NextTouchableOpacity>
    )
  }
}
