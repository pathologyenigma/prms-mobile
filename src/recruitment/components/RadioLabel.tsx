import React, { useContext } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import { RadioContext } from './RadioContext'

interface RadioLabelProps {
  label?: string
  value?: string | number | boolean
  style?: StyleProp<TextStyle>
  checkedStyle?: StyleProp<TextStyle>
}

export default function RadioLabel({
  label,
  value,
  style,
  checkedStyle,
}: RadioLabelProps) {
  const { checkedValue, setCheckedValue } = useContext(RadioContext)
  const checked = value === checkedValue
  return (
    <Text
      style={[styles.text, style, checked ? checkedStyle : undefined]}
      suppressHighlighting
      onPress={() => setCheckedValue(value)}>
      {label}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})
