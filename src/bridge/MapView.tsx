import React from 'react'
import { ViewStyle, StyleProp, requireNativeComponent } from 'react-native'

const AMapView = requireNativeComponent<any>('AMapView')

export interface LatLng {
  latitude: number
  longitude: number
}

export interface MapViewProps {
  style?: StyleProp<ViewStyle>
  zoomLevel?: number
  scrollEnabled?: boolean
  centerLatLng?: LatLng
}

function MapView(props: MapViewProps) {
  return <AMapView {...props} />
}

export default MapView
