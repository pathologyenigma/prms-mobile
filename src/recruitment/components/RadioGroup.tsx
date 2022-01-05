import React, { PropsWithChildren, useEffect, useState } from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import { RadioContext } from './RadioContext'

interface RadioGroupProps {
  style?: StyleProp<ViewStyle>
  value?: string | number | boolean
  onValueChecked?: (value: any) => void
}

export default function RadioGroup({
  value,
  onValueChecked,
  children,
}: PropsWithChildren<RadioGroupProps>) {
  const [checkedValue, setCheckedValue] = useState<string | number | boolean>()

  useEffect(() => {
    if (checkedValue !== undefined) {
      onValueChecked?.(checkedValue)
    }
  }, [checkedValue, onValueChecked])

  return (
    <RadioContext.Provider value={{ checkedValue: value, setCheckedValue }}>
      {children}
    </RadioContext.Provider>
  )
}
