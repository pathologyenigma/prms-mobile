import React from 'react'
import { useCallback } from 'react'
import {
  ViewStyle,
  StyleProp,
  requireNativeComponent,
  NativeSyntheticEvent,
} from 'react-native'

const AMapView = requireNativeComponent<any>('AMapView')

export interface LatLng {
  latitude: number
  longitude: number
}

export interface MoveEvent {
  latitude: number
  longitude: number
  wasUserAction: boolean
}

export interface MapViewProps {
  style?: StyleProp<ViewStyle>
  zoomLevel?: number
  scrollEnabled?: boolean
  centerLatLng?: LatLng
  onMoveStart?: (event: MoveEvent) => void
  onMoveEnd?: (event: MoveEvent) => void
}

function MapView(props: MapViewProps) {
  const { onMoveEnd, onMoveStart } = props

  const handleMoveEnd = useCallback(
    (event: NativeSyntheticEvent<MoveEvent>) => {
      onMoveEnd?.(event.nativeEvent)
    },
    [onMoveEnd],
  )

  const handleMoveStart = useCallback(
    (event: NativeSyntheticEvent<MoveEvent>) => {
      onMoveStart?.(event.nativeEvent)
    },
    [onMoveStart],
  )

  return (
    <AMapView
      {...props}
      onMoveStart={handleMoveStart}
      onMoveEnd={handleMoveEnd}
    />
  )
}

export default MapView
