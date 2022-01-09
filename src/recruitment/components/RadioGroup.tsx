import React, { PropsWithChildren } from 'react'
import { RadioContext } from './RadioContext'

interface RadioGroupProps {
  value?: string | number | boolean
  onValueChecked?: (value: any) => void
}

export default function RadioGroup({
  value,
  onValueChecked,
  children,
}: PropsWithChildren<RadioGroupProps>) {
  const setCheckedValue = (v: any) => {
    onValueChecked?.(v)
  }

  return (
    <RadioContext.Provider value={{ checkedValue: value, setCheckedValue }}>
      {children}
    </RadioContext.Provider>
  )
}
