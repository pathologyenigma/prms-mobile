import { useLayout } from '@react-native-community/hooks'
import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import CheckLabel from './CheckLabel'

interface Label {
  title: string
  checked: boolean
}

interface CheckLabelGroupProps {
  labels: Label[]
  limit: number
  numOfRow?: number
  horizontalSpace?: number
  style?: StyleProp<ViewStyle>
  onValuesChange?: (labels: Label[]) => void
}

export default function CheckLabelGroup({
  labels,
  numOfRow = 3,
  horizontalSpace = 19,
  style,
  limit,
  onValuesChange,
}: CheckLabelGroupProps) {
  const { onLayout, width } = useLayout()
  const itemWidth = (width - (numOfRow - 1) * horizontalSpace - 0.5) / numOfRow

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {labels.map((label, index) => (
        <CheckLabel
          style={{
            width: itemWidth,
            marginBottom: 15,
            marginLeft: index % numOfRow !== 0 ? horizontalSpace : 0,
          }}
          key={index}
          title={label.title}
          checked={label.checked}
          onCheckedChange={checked => {
            const isSingleChecked = limit === 1
            if (isSingleChecked) {
              if (checked) {
                onValuesChange &&
                  onValuesChange(
                    labels.map(l => {
                      l.checked = l.title === label.title
                      return l
                    }),
                  )
              }
              return
            }

            const count = labels.filter(l => l.checked).length
            if (checked) {
              if (count < limit) {
                label.checked = true
                onValuesChange && onValuesChange([...labels])
              }
            } else {
              label.checked = false
              onValuesChange && onValuesChange([...labels])
            }
          }}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
})
