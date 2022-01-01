import { NativeModules } from 'react-native'

const GeoLocationModule = NativeModules.GeoLocationModule

interface Configuration {
  apiKey: string
  mockEnable: boolean
}

export interface Location {
  latitude: number
  longitude: number
  altitude: number
  accuracy: number
  speed: number
  bearing: number
  timestamp: number

  adcode: string
  province: string
  city: string
  cityCode: string
  address: string
  aoi: string
  poi: string
}

export interface InputTip {
  adcode: string
  name: string
  address: string
  district: string
  latitude: number
  longitude: number
}

const LocationManagerErrorCode = 'GeoLocationModuleOnceLocationManager'

function getLocation(): Promise<Location> {
  return GeoLocationModule.getLocation({
    apiKey: '5b9826b16a2e7a03ca5a32bdd262844a',
  })
}

function getInputTips(key: string, city: string): Promise<InputTip[]> {
  return GeoLocationModule.getInputTips(key, city)
}

export default {
  getLocation,
  getInputTips,
  LocationManagerErrorCode,
}
