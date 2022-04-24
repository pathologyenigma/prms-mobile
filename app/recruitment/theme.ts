import { Platform, StatusBar } from 'react-native'
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'

export const headerHeight = () => {
  if (Platform.OS === 'ios') {
    return global.STATUS_BAR_HEIGHT + 44
  } else {
    return 48 + statusBarHeight()
  }
}

export const navigationBarHeight = () => {
  return headerHeight() - statusBarHeight()
}

export const statusBarHeight = () => {
  return global.STATUS_BAR_HEIGHT
}
