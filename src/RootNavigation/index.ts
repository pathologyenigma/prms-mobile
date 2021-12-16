import { NavigationContainerRef } from '@react-navigation/native'
import React from 'react'

export const navigationRef = React.createRef<NavigationContainerRef>()

let isReady = false

export function setNavigationReady(ready: boolean) {
  isReady = ready
}

export function navigate(name: string, params: any) {
  if (isReady && navigationRef.current) {
    navigationRef.current.navigate(name, params)
  }
}

// add other navigation functions that you need and export them
