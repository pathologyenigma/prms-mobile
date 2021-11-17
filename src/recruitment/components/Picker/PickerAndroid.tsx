import React, { useCallback } from 'react'
import {
  requireNativeComponent,
  StyleProp,
  TextStyle,
  ViewProps,
  StyleSheet,
} from 'react-native'

interface HBDPickerViewProps extends ViewProps {
  onItemSelected: (event: Event) => void
  onValueChange?: (itemValue: any, itemIndex: number) => void
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
  const handleItemSelected = useCallback((event: Event) => {
    const selectedIndex = event.nativeEvent.selectedIndex
    if (onValueChange && values.length > selectedIndex) {
      onValueChange(values[selectedIndex], selectedIndex)
    }
  }, [])

  const selectedIndex = values.findIndex(v => v === selectedValue)
  const s = StyleSheet.flatten(itemStyle)
  const fontSize = s.fontSize ?? 15
  const color = s.color && typeof s.color === 'string' ? s.color : undefined

  return (
    <HBDPickerView
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
