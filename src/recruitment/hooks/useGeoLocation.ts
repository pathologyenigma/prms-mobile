import { useCallback, useEffect } from 'react'
import { Alert, AppState, AppStateStatus, Platform } from 'react-native'
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions'
import GeoLocationManager from '../../bridge/geolocation'
import useAsyncFn from './useAsyncFn'

type Callback<T> = (() => Promise<T>) | (() => T)

export class GeoLocationPermissionError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export function withLocationPermission<T>(fn: Callback<T>) {
  if (Platform.OS === 'ios') {
    return withLocationPermissionIOS(fn)
  } else {
    return withLocationPermissionAndroid(fn)
  }
}

function withLocationPermissionAndroid<T>(fn: Callback<T>) {
  return async function () {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    if (result === RESULTS.GRANTED) {
      return fn()
    } else if (result === RESULTS.BLOCKED) {
      throw new GeoLocationPermissionError('未授予定位权限')
    } else if (result === RESULTS.DENIED) {
      const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      if (response === RESULTS.GRANTED) {
        return fn()
      } else {
        throw new GeoLocationPermissionError('未授予定位权限')
      }
    } else {
      throw new Error('设备定位功能不可用')
    }
  }
}

function withLocationPermissionIOS<T>(fn: Callback<T>) {
  return async function () {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    if (result === RESULTS.GRANTED) {
      return fn()
    } else if (result === RESULTS.BLOCKED) {
      throw new GeoLocationPermissionError('未授予定位权限')
    } else if (result === RESULTS.DENIED) {
      const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      if (response === RESULTS.GRANTED) {
        return fn()
      } else {
        throw new GeoLocationPermissionError('未授予定位权限')
      }
    } else {
      throw new Error('设备定位功能不可用')
    }
  }
}

let locationTask: ReturnType<typeof GeoLocationManager.getLocation> | null =
  null

async function _getLocation() {
  try {
    return await withLocationPermission(GeoLocationManager.getLocation)()
  } finally {
    locationTask = null
  }
}

export function getLocation() {
  if (!locationTask) {
    locationTask = _getLocation()
  }
  return locationTask
}

export function useGeoLocation() {
  const [fn, state] = useAsyncFn(useCallback(() => getLocation(), []))

  useEffect(() => {
    fn()
  }, [fn])

  const { value, error } = state

  useEffect(() => {
    if (error && error instanceof GeoLocationPermissionError) {
      Alert.alert(error.message, '请前往设置页面，授予本应用定位权限', [
        { text: '取消' },
        { text: '确定', onPress: () => openSettings() },
      ])
    }
  }, [error])

  useEffect(() => {
    const hanleAppActive = (state: AppStateStatus) => {
      if (!value && state === 'active') {
        fn()
      }
    }

    AppState.addEventListener('change', hanleAppActive)
    return () => AppState.removeEventListener('change', hanleAppActive)
  }, [value, fn])

  return value
}
