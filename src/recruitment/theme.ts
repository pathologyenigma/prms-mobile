import { Platform, StatusBar } from 'react-native'
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'

export const headerHeight = () => {
  if (Platform.OS === 'ios') {
    if (isIphoneX()) {
      return 88
    } else {
      return 64
    }
  } else {
    return 56 + statusBarHeight()
  }
}

export const navigationBarHeight = () => {
  return headerHeight() - statusBarHeight()
}

export const statusBarHeight = () => {
  return getStatusBarHeight(true)
}
