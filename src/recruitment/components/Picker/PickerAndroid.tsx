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
}

function PickerAndroid({
  selectedValue,
  onValueChange,
  values = [],
  style = { height: 180 },
  itemStyle = {},
}: Props) {
  const handleItemSelected = useCallback((event: Event) => {
    const selectedIndex = event.nativeEvent.selectedIndex
    if (onValueChange && values.length > selectedIndex) {
      onValueChange(values[selectedIndex], selectedIndex)
    }
  }, [])

  const selectedIndex = values.findIndex(v => v === selectedValue)
  const is = StyleSheet.flatten(itemStyle)
  const fontSize = is.fontSize ?? 15
  const itemHeight =
    is.height && typeof is.height === 'number' ? is.height : is.lineHeight
  const color = is.color && typeof is.color === 'string' ? is.color : undefined
  let lineSpacingMultiplier = 2
  if (itemHeight && itemHeight > fontSize) {
    lineSpacingMultiplier = (itemHeight * 1.0) / fontSize
  }

  return (
    <HBDPickerView
      onItemSelected={handleItemSelected}
      selectedIndex={selectedIndex === -1 ? 0 : selectedIndex}
      cyclic={false}
      items={values}
      style={style}
      fontSize={fontSize}
      textColorCenter={color}
      lineSpacingMultiplier={lineSpacingMultiplier}
      roundRectType="all"
    />
  )
}

export default PickerAndroid
