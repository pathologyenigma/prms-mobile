import React from 'react'
import {
  TouchableOpacity,
  ViewProps,
  StyleProp,
  Text,
  StyleSheet,
  TextStyle,
} from 'react-native'

interface TextButtonProps {
  title: string
  onPress?: () => void
  hitSlop?: ViewProps['hitSlop']
  style?: StyleProp<TextStyle>
}

export default function TextButton({
  onPress,
  hitSlop,
  style,
  title,
}: TextButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{ left: 8, right: 8, top: 8, bottom: 8, ...hitSlop }}>
      <Text style={[styles.text, style]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#333333',
    fontSize: 15,
  },
})
