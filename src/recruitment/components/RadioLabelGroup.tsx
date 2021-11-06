import React from 'react'
import { ViewStyle, StyleProp, StyleSheet, TextStyle, View } from 'react-native'

import RadioLabel from './RadioLabel'

interface RadioLabelGroupProps {
  labels: string[]
  checkedIndex: number
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  labelInactiveStyle?: StyleProp<TextStyle>
  labelSpace?: number
  onValueChange?: (value: string, index: number) => void
}

export default function RadioLabelGroup({
  labels,
  style,
  labelStyle,
  labelInactiveStyle,
  labelSpace,
  onValueChange,
  checkedIndex,
}: RadioLabelGroupProps) {
  const size = labels.length

  function renderRadioLabel(text: string, index: number) {
    const checked = index === checkedIndex
    const isLast = index === size - 1

    return (
      <View
        key={text + '-' + index}
        style={[styles.space, { paddingRight: isLast ? 0 : labelSpace }]}>
        <RadioLabel
          text={text}
          checked={checked}
          style={labelStyle}
          inactiveStyle={labelInactiveStyle}
          onPress={() => {
            if (!checked) {
              onValueChange && onValueChange(text, index)
            }
          }}
        />
      </View>
    )
  }

  return (
    <View style={[styles.container, style]}>
      {labels.map(renderRadioLabel)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  space: {},
})
