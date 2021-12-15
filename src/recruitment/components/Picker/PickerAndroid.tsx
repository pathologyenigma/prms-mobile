import React, { useCallback, useRef } from 'react'
import {
  requireNativeComponent,
  StyleProp,
  TextStyle,
  ViewProps,
  StyleSheet,
} from 'react-native'

interface HBDPickerViewProps extends ViewProps {
  onItemSelected: (event: Event) => void
  selectedIndex: number
  cyclic: boolean
  items: string[]
  fontSize: number
  lineSpacingMultiplier: number
  textColorCenter?: string
  textColorOut?: string
  roundRectType?: 'left' | 'right' | 'all' | 'none'
}

const HBDPickerView =
  requireNativeComponent<HBDPickerViewProps>('HBDPickerView')

interface Event {
  nativeEvent: {
    selectedIndex: number
  }
}

interface Item {
  value: string
  label: string
}

interface Props {
  onValueChange?: (itemValue: string, itemIndex: number) => void
  selectedValue: string
  values: string[]
  style?: StyleProp<TextStyle>
  itemStyle?: StyleProp<TextStyle>
  roundRectType?: 'left' | 'right' | 'all' | 'none'
}

function PickerAndroid({
  selectedValue,
  onValueChange,
  values = [],
  style,
  itemStyle = {},
  roundRectType = 'all',
}: Props) {
  const ref = useRef<any>(null)

  const selectedIndex = values.findIndex(v => v === selectedValue)

  const handleItemSelected = useCallback(
    (event: Event) => {
      const index = event.nativeEvent.selectedIndex
      if (onValueChange && values.length > index) {
        onValueChange(values[index], index)
      }
      if (selectedIndex !== index) {
        ref.current &&
          ref.current.setNativeProps({
            selectedIndex,
          })
      }
    },
    [onValueChange, values, selectedIndex],
  )

  const s = StyleSheet.flatten(itemStyle)
  const fontSize = s.fontSize ?? 15
  const color = s.color && typeof s.color === 'string' ? s.color : undefined

  return (
    <HBDPickerView
      ref={ref}
      onItemSelected={handleItemSelected}
      selectedIndex={selectedIndex === -1 ? 0 : selectedIndex}
      cyclic={false}
      items={values}
      style={style}
      fontSize={fontSize}
      textColorCenter={color}
      lineSpacingMultiplier={(19 + fontSize) / fontSize}
      roundRectType={roundRectType}
    />
  )
}

export default PickerAndroid
