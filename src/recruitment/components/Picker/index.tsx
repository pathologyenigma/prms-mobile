import React from 'react'
import { Picker as PickerIOS } from '@react-native-picker/picker'
import { TextStyle, Platform, StyleProp, StyleSheet } from 'react-native'
import PickerAndroid from './PickerAndroid'

interface PickerProps {
  onValueChange?: (itemValue: string, itemIndex: number) => void
  selectedValue: string
  values: string[]
  style?: StyleProp<TextStyle>
  itemStyle?: StyleProp<TextStyle>
}

export default function Picker({
  style,
  itemStyle = {},
  selectedValue,
  onValueChange,
  values,
}: PickerProps) {
  if (Platform.OS === 'ios') {
    const { color } = StyleSheet.flatten(itemStyle)

    return (
      <PickerIOS
        style={style}
        itemStyle={itemStyle}
        selectedValue={selectedValue}
        onValueChange={onValueChange}>
        {values.map(v => (
          <PickerIOS.Item
            key={v}
            label={v}
            value={v}
            color={color && typeof color === 'string' ? color : undefined}
          />
        ))}
      </PickerIOS>
    )
  }
  return (
    <PickerAndroid
      style={style}
      itemStyle={itemStyle}
      values={values}
      selectedValue={selectedValue}
    />
  )
}
