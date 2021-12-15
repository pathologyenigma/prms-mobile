import React, { PropsWithChildren, useEffect, useState } from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import { RadioContext } from './RadioContext'

interface RadioGroupProps {
  style?: StyleProp<ViewStyle>
  defaultValue?: string | number
  value?: string | number
  onValueChecked?: (value: any) => void
}

export default function RadioGroup({
  value,
  defaultValue,
  onValueChecked,
  children,
}: PropsWithChildren<RadioGroupProps>) {
  const [checkedValue, setCheckedValue] = useState<string | number>()

  useEffect(() => {
    if (checkedValue !== undefined) {
      onValueChecked?.(checkedValue)
    } else if (defaultValue !== undefined) {
      onValueChecked?.(defaultValue)
    }
  }, [defaultValue, checkedValue, onValueChecked])

  return (
    <RadioContext.Provider value={{ checkedValue: value, setCheckedValue }}>
      {children}
    </RadioContext.Provider>
  )
}
