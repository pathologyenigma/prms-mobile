import React, { PropsWithChildren } from 'react'
import { CheckContext } from './CheckContext'

interface CheckGroupProps {
  limit?: number
  values?: Array<any>
  onValuesChanged?: (value: any) => void
}

export default function CheckGroup({
  limit = 0,
  values,
  onValuesChanged,
  children,
}: PropsWithChildren<CheckGroupProps>) {
  const setCheckedValues = (v: Array<any>) => {
    if (limit <= 0 || v.length <= limit) {
      onValuesChanged?.(v)
    }
  }

  return (
    <CheckContext.Provider value={{ checkedValues: values, setCheckedValues }}>
      {children}
    </CheckContext.Provider>
  )
}
