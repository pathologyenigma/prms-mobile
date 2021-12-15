import React from 'react'

export interface RadioContext {
  checkedValue?: string | number
  setCheckedValue: (value: string | number | undefined) => void
}

export const RadioContext = React.createContext<RadioContext>({
  setCheckedValue: () => {},
})
