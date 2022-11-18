import React, { Component, useCallback, useEffect, useMemo, useState } from 'react'
import { View, Image, StatusBar, Keyboard, StyleSheet, Text, ImageBackground } from 'react-native'
import styles from './styles/MapLocate.style'
import { GenProps } from '../../../utils/StackProps'
import SystemHelper from '../../../utils/system'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'
import NextPressable from '../../components/NextPressable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGeoLocation } from '../../../recruitment/hooks/useGeoLocation'
import { usePoiItems } from '../../../recruitment/hooks/usePoiItems'
import MapView, { LatLng, MoveEvent } from '~/common/location/MapView'
import { useInputTips } from '../../../recruitment/hooks/useInputTips'

type IProps = GenProps<'MapLocate'> & {

}

export default function MapLocate(props: IProps) {
  // export default class MapLocate extends Component<IProps, IState> {

  const { navigation, route } = props
  const [isMoveing, setIsMoveing] = useState(false)
  const [isShowMarkerBox, setIsShowMarkerBox] = useState(false)

  const geoLocation = useGeoLocation()
  const { city, coordinates } = route.params || {}

  useEffect(() => {
    if (!city && geoLocation?.city) {
      navigation.setParams({ city: geoLocation.city })
    }
    console.log(geoLocation)
  }, [geoLocation, city])

  // 地图，兴趣点搜索
  const centerLatLng = useMemo<LatLng | undefined>(() => {
    if (coordinates) {
      return coordinates
    }

    if (geoLocation) {
      const { latitude, longitude } = geoLocation
      return {
        latitude,
        longitude,
      }
    }
  }, [geoLocation, coordinates])

  const { poiItems, getPoiItems } = usePoiItems()

  const onMoveEnd = useCallback(
    async ({ wasUserAction, latitude, longitude }: MoveEvent) => {
      console.log(
        'wasUserAction',
        wasUserAction,
        'latitude',
        latitude,
        'longitude',
        longitude,
      )
      getPoiItems(latitude, longitude)
      setIsMoveing(false)
    },
    [],
  )

  useEffect(() => {
    console.log('poiItems123: ', poiItems)
    if (poiItems && poiItems.length === 0) {
      Toast.show('请重新选择附近的位置')
    }
    setIsShowMarkerBox(true)
  }, [poiItems])

  console.log('-------------------SearchJobAddress-----------------------')

  // 关键字搜索
  const [text, setText] = useState<string>('')
  const [showsSearchResult, setShowsSearchResult] = useState(false)

  useEffect(() => {
    setShowsSearchResult(text !== '')
  }, [text])

  const inputTips = useInputTips(text, city)
  useEffect(() => {
    console.log(inputTips)
  }, [inputTips])

  const renderNavBar = () => {
    return (
      <NextPressable
        style={styles.leftBtn}
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Image
          source={require('../../../assets/black_back.png')}
          style={styles.leftIcon}
        />
      </NextPressable>
    )
  }

  const renderMap = () => {
    return (
      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          zoomLevel={17}
          centerLatLng={centerLatLng}
          onMoveStart={() => {
            setIsShowMarkerBox(false)
            setIsMoveing(true)
          }}
          onMoveEnd={onMoveEnd}
        />
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
          <View style={styles.mapMarkerBox}>
            {!isMoveing && isShowMarkerBox && poiItems && poiItems.length > 0 && (
              <ImageBackground
                resizeMode="stretch"
                source={require('../../../assets/requestJobs/map_toast_bg.png')}
                style={styles.mapMarkerBg}
              >
                <Text style={styles.mapMarkerText}>{poiItems[0].name}</Text>
              </ImageBackground>
            )}
            <Image source={require('~/recruitment/Job/SearchJobAddress/images/marker.png')} />
          </View>
          <View style={styles.mapMarkerBox}></View>
        </View>
      </View>
    )
  }

  const renderBottom = () => {
    const disabled = !poiItems || poiItems.length === 0
    return (
      <View
        style={styles.bottomContainer}
      >
        <GradientButton
          disabled={disabled}
          containerStyle={styles.btnContainer}
          text={disabled ? '正在加载中,请稍候...' : '使用该定位做为家的位置'}
          textStyle={disabled ? {
            color: '#666', fontSize: 13,
            fontWeight: 'normal'
          } : null}
          onPress={() => {
            // 设置家的位置接口
            Toast.show(`您选择了位置: ${poiItems && poiItems[0].name}`)
          }}
        />
      </View>
    )
  }

  return (
    <View style={[styles.container]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        animated
        barStyle={'dark-content'}
      />
      {renderNavBar()}
      {renderMap()}
      {renderBottom()}
    </View>
  )
}