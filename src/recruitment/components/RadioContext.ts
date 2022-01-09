import React from 'react'

export interface RadioContext {
  checkedValue?: string | number | boolean
  setCheckedValue: (value: string | number | boolean | undefined) => void
}

export const RadioContext = React.createContext<RadioContext>({
  setCheckedValue: () => {},
})
