import { useCallback, useMemo } from 'react'
import GeoLocationManager from '~/common/location/geolocation'
import useAsync from './useAsync'
import throttle from 'lodash.throttle'

export function useInputTips(key: string, city?: string) {
  const throttleGetInputTips = useMemo(
    () => throttle(GeoLocationManager.getInputTips, 500),
    [],
  )

  const poiItems = useAsync(
    useCallback(async () => {
      if (key && city) {
        return throttleGetInputTips(key, city)
      }
    }, [key, city]),
  )

  return poiItems
}
