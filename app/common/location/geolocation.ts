import { NativeModules, Platform } from 'react-native'

const GeoLocationModule = NativeModules.GeoLocationModule

interface Configuration {
  apiKey: string
}

export interface Location {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number

  adcode: string
  province: string
  city: string
  district: string
  name: string
}

export interface PoiItem {
  poiID: string
  adcode: string
  name: string
  address: string
  province: string
  city: string
  district: string
  latitude: number
  longitude: number
}

const LocationManagerErrorCode = 'GeoLocationModuleOnceLocationManager'

function getLocation(): Promise<Location> {
  return GeoLocationModule.getLocation()
}

function getInputTips(key: string, city: string): Promise<PoiItem[]> {
  return GeoLocationModule.getInputTips(key, city)
}

function getPoiItems(latitude: number, longitude: number): Promise<PoiItem[]> {
  // https://i.xdc.at/assets/images/poi-data/poi-type-list.pdf

  // 0801 运动场馆
  // 0901 综合医院
  // 0902 专科医院
  // 1001 宾馆酒店
  // 1002 旅馆招待所
  // 1101 公园广场
  // 1102 风景名胜
  // 12 商务住宅
  // 1301 政府机关
  // 1302 外国机构
  // 1305 公检法机构
  // 1401 博物馆
  // 1402 展览馆
  // 1403 会展中心
  // 1404 美术馆
  // 1405 图书馆
  // 1406 科技馆
  // 1407 天文馆
  // 1408 文化宫
  // 1412 学校
  // 1501 机场相关
  // 1502 火车站
  // 1503 港口码头
  // 1504 长途汽车站
  // 1505 地铁站
  // 1601 银行
  return GeoLocationModule.getPoiItems(
    latitude,
    longitude,
    '0601|061205|080101|0806|0901|1001|11|12|130101|130102|130103|1401|1402|1403|1404|1405|1406|1407|1408|1412|1501|1502|1503|1504',
  )
}

export default {
  getLocation,
  getInputTips,
  getPoiItems,
  LocationManagerErrorCode,
}
