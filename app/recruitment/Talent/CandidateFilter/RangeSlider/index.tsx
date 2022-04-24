import React from 'react'
import { ViewStyle, StyleProp, View, Image } from 'react-native'
//@ts-ignore
import Slider from 'rn-range-slider'

interface RangeSliderProps {
  min: number
  max: number
  onValueChanged?: (low: number, high: number) => void
  style?: StyleProp<ViewStyle>
}

export default function RangeSlider({
  min,
  max,
  onValueChanged,
  style,
}: RangeSliderProps) {
  return (
    <Slider
      style={style}
      min={min}
      max={max}
      step={1}
      onValueChanged={onValueChanged}
      renderThumb={() => <Image source={require('./thumb.png')} />}
      renderRail={() => (
        <View
          style={{
            flex: 1,
            height: 3,
            borderRadius: 1.5,
            backgroundColor: '#EEEEEE',
          }}
        />
      )}
      renderRailSelected={() => (
        <View
          style={{
            height: 2.5,
            backgroundColor: '#79D398',
            borderRadius: 1.25,
          }}
        />
      )}
    />
  )
}
