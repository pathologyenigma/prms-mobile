import { useCallback, useMemo, useState } from 'react'
import GeoLocationManager, { PoiItem } from '../../bridge/geolocation'
import throttle from 'lodash.throttle'

export function usePoiItems() {
  const throttleGetPoiItems = useMemo(
    () => throttle(GeoLocationManager.getPoiItems, 500),
    [],
  )

  const [poiItems, setPoiItems] = useState<PoiItem[]>()

  const getPoiItems = useCallback(
    async (latitude: number, longitude: number) => {
      if (latitude !== 0 && longitude !== 0) {
        try {
          const result = await throttleGetPoiItems(latitude, longitude)
          setPoiItems(result)
        } catch (e) {
          console.warn('usePoiItems', e)
        }
      }
    },
    [],
  )

  return { poiItems, getPoiItems }
}
