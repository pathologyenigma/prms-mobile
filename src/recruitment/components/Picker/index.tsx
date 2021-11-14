import React from 'react'
import { Picker as PickerIOS } from '@react-native-picker/picker'
import { TextStyle, Platform, StyleProp, StyleSheet, View } from 'react-native'
import PickerAndroid from './PickerAndroid'

interface PickerProps {
  onValueChange?: (itemValue: string, itemIndex: number) => void
  selectedValue: string
  values: string[]
  style?: StyleProp<TextStyle>
  itemStyle?: StyleProp<TextStyle>
  roundRectType?: 'left' | 'right' | 'all' | 'none'
}

export default function Picker({
  style,
  itemStyle = {},
  selectedValue,
  onValueChange,
  values,
  roundRectType,
}: PickerProps) {
  if (Platform.OS === 'ios') {
    const { color } = StyleSheet.flatten(itemStyle)

    return (
      <PickerIOS
        style={[styles.picker, style]}
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
      style={[styles.picker, style]}
      itemStyle={itemStyle}
      values={values}
      selectedValue={selectedValue}
      roundRectType={roundRectType}
    />
  )
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
})
