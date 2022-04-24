import React, { useContext } from 'react'
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  StyleProp,
  TextStyle,
} from 'react-native'
import { CheckContext } from './CheckContext'

interface CheckLabelProps {
  label: string
  value: any
  style?: StyleProp<TextStyle>
}

export default function CheckLabel({ label, value, style }: CheckLabelProps) {
  const { checkedValues = [], setCheckedValues } = useContext(CheckContext)
  const checked = checkedValues?.includes(value)

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (checked) {
          setCheckedValues(checkedValues.filter(v => v !== value))
        } else {
          setCheckedValues([...checkedValues, value])
        }
      }}>
      <Text
        suppressHighlighting
        style={[styles.label, checked ? styles.checked : undefined, style]}>
        {label}
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
    fontWeight: 'bold',
  },
})
