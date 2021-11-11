import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  StyleProp,
  TextStyle,
} from 'react-native'

interface CheckLabelProps {
  title: string
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  style?: StyleProp<TextStyle>
}

export default function CheckLabel({
  title,
  checked,
  onCheckedChange,
  style,
}: CheckLabelProps) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onCheckedChange && onCheckedChange(!checked)
      }}>
      <Text
        suppressHighlighting
        style={[styles.label, checked ? styles.checked : undefined, style]}>
        {title}
      </Text>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  label: {
    color: '#666666',
    fontSize: 13,
    backgroundColor: '#F0F0F0',
    height: 34,
    lineHeight: 34,
    textAlign: 'center',
    borderRadius: 4,
    overflow: 'hidden',
  },
  checked: {
    color: '#79D398',
    backgroundColor: '#E7FEF1',
  },
})
