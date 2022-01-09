import React from 'react'

export interface CheckContext {
  checkedValues?: Array<any>
  setCheckedValues: (value: Array<any>) => void
}

export const CheckContext = React.createContext<CheckContext>({
  setCheckedValues: () => {},
})
