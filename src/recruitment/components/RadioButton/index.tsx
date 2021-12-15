import React, { useContext, useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import { RadioContext } from '../RadioContext'

interface RadioButtonProps {
  label?: string
  value?: string | number
  style?: StyleProp<ViewStyle>
}

export default function RadioButton({ label, value, style }: RadioButtonProps) {
  const { checkedValue, setCheckedValue } = useContext(RadioContext)
  const checked = value === checkedValue

  return (
    <TouchableWithoutFeedback
      onPress={() => setCheckedValue(value)}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <View style={[styles.container, style]}>
        <Image
          source={
            checked ? require('./checked.png') : require('./unchecked.png')
          }
          style={styles.radio}
        />
        <Text style={[styles.label, checked ? styles.checkedLabel : undefined]}>
          {label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {},
  label: {
    color: '#888888',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  checkedLabel: {
    color: '#57DE9E',
  },
})
