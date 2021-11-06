import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'

interface RadioLabelProps {
  text: string
  checked?: boolean
  style?: StyleProp<TextStyle>
  inactiveStyle?: StyleProp<TextStyle>
  onPress?: () => void
}

export default function RadioLabel({
  text,
  checked = false,
  style,
  inactiveStyle,
  onPress,
}: RadioLabelProps) {
  return (
    <Text
      style={[styles.text, checked ? style : inactiveStyle]}
      suppressHighlighting
      onPress={onPress}>
      {text}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})
