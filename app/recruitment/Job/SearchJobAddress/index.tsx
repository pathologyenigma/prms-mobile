import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { View, StyleSheet, FlatList, Image, Keyboard } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import SearchTextinput from '~/pages/components/SearchTextinput'
import TextButton from '../../components/TextButton'
import AddressItem from './Addresstem'
import NavBar from '../../components/NavBar'
import IconLabelButton from '../../components/IconLabelButton'
import { useGeoLocation } from '../../hooks/useGeoLocation'
import { useInputTips } from '../../hooks/useInputTips'
import MapView, { LatLng, MoveEvent } from '~/common/location/MapView'
import { usePoiItems } from '../../hooks/usePoiItems'
import { JobParamList } from '../typings'

export default function SearchJobAddress({
  navigation,
  route,
}: StackScreenProps<JobParamList, 'SearchJobAddress'>) {
  // 当前城市
  const geoLocation = useGeoLocation()
  const { city, coordinates, callback } = route.params || {}

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
    },
    [],
  )

  useEffect(() => {
    console.log(poiItems)
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

  return (
    <View style={styles.container}>
      <NavBar>
        {/*<IconLabelButton
          style={styles.city}
          icon={require('./images/city_location.png')}
          label={city || '定位中'}
          onPress={() => {
          	navigation.push('JobSelectCity', {
              mode: 1,
              selectJobCityCallback: (e: any) => {
                navigation.setParams({ city: e[1].name })
              }
            })
          }}
        />*/}
        <SearchTextinput
        	cellStyle={{ flex: 1 }}
        	inputProps={{
        		placeholder: "请输入上班地址",
          		onChangeText: setText
        	}}
        />
        <TextButton
          style={styles.cancel}
          title="取消"
          onPress={() => navigation.goBack()}
        />
      </NavBar>
      <View style={{ flex: 1 }}>
        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            zoomLevel={17}
            centerLatLng={centerLatLng}
            onMoveStart={() => Keyboard.dismiss()}
            onMoveEnd={onMoveEnd}
            onSingleTap={() => Keyboard.dismiss()}
          />
          <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
            <View style={styles.mapMarkerBox}>
              <Image source={require('./images/marker.png')} />
            </View>
            <View style={styles.mapMarkerBox}></View>
          </View>
        </View>
        <FlatList
          key="poiItems"
          data={poiItems}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          keyExtractor={item => item.poiID}
          renderItem={({ item, index }) => (
            <AddressItem
              {...item}
              index={index}
              onPress={() => {
              	callback && callback(navigation, { poiItem: { ...item } })
                navigation.pop()
              }}
            />
          )}
        />
        {showsSearchResult && (
          <FlatList
            key="inputTips"
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode={'on-drag'}
            style={styles.searchList}
            data={inputTips}
            keyExtractor={item => item.poiID}
            renderItem={({ item }) => (
              <AddressItem
                {...item}
                index={-1}
                onPress={() => {
                  callback && callback(navigation, { poiItem: { ...item } })
                  navigation.pop()
                }}
              />
            )}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  city: {
    marginLeft: 11,
    // marginRight: 19,
  },
  search: {
    flex: 1,
    marginLeft: 15,
  },
  cancel: {
    marginLeft: 24,
    marginRight: 11,
    color: '#666666',
  },
  searchList: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  mapWrapper: {
    width: '100%',
    aspectRatio: 375 / 350,
  },
  map: {
    flex: 1,
  },
  mapMarkerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})
