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
  onSingleTap?: (event: LatLng) => void
}

function MapView(props: MapViewProps) {
  const { onMoveEnd, onMoveStart, onSingleTap } = props

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

  const handleSingleTap = useCallback(
    (event: NativeSyntheticEvent<LatLng>) => {
      onSingleTap?.(event.nativeEvent)
    },
    [onSingleTap],
  )

  return (
    <AMapView
      {...props}
      onMoveStart={handleMoveStart}
      onMoveEnd={handleMoveEnd}
      onSingleTap={handleSingleTap}
    />
  )
}

export default MapView
