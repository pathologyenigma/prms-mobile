import React from 'react'
import {
  TouchableOpacity,
  ViewProps,
  StyleProp,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native'

interface GhostButtonProps {
  title: string
  onPress?: () => void
  hitSlop?: ViewProps['hitSlop']
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  disabled?: boolean
}

export default function GhostButton({
  onPress,
  hitSlop,
  style,
  title,
  textStyle,
  disabled,
}: GhostButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.75}
      disabled={disabled}
      hitSlop={{ left: 8, right: 8, top: 8, bottom: 8, ...hitSlop }}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9FFF0',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#7AD398',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#7AD398',
  },
})
