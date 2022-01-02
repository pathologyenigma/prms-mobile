import React, { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import SearchBar from '../../components/SearchBar'
import TextButton from '../../components/TextButton'
import AddressItem from './Addresstem'
import AddressHeader from './AddressHeader'
import NavBar from '../../components/NavBar'
import IconLabelButton from '../../components/IconLabelButton'
import { JobParamList } from '../typing'
import { useGeoLocation } from '../../hooks/useGeoLocation'
import { useInputTips } from '../../hooks/useInputTips'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import MapView, { LatLng } from '../../../bridge/MapView'
import { useMemo } from 'react'

export default function SearchJobAddress({
  navigation,
  route,
}: StackScreenProps<JobParamList, 'SearchJobAddress'>) {
  const { city } = route.params || {}
  const geoLocation = useGeoLocation()

  const centerLatLng = useMemo<LatLng | undefined>(() => {
    if (geoLocation) {
      const { latitude, longitude } = geoLocation
      return {
        latitude,
        longitude,
      }
    }
  }, [geoLocation])

  useEffect(() => {
    if (geoLocation?.city) {
      navigation.setParams({ city: geoLocation.city })
    }
    console.log(geoLocation)
  }, [geoLocation])

  console.log('-------------------SearchJobAddress-----------------------')

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
        <IconLabelButton
          style={styles.city}
          icon={require('./images/location.png')}
          label={city || '定位中'}
          onPress={() =>
            navigation.navigate('EditJobCity', {
              currentCity: geoLocation?.city,
            })
          }
        />
        <SearchBar
          onChangeText={setText}
          style={styles.search}
          placeholder="请输入上班地址"
        />
        <TextButton
          style={styles.cancel}
          title="取消"
          onPress={() => navigation.goBack()}
        />
      </NavBar>
      <View style={{ flex: 1 }}>
        <MapView style={styles.map} centerLatLng={centerLatLng} />
        <FlatList
          data={inputTips}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          keyExtractor={item => item.district + item.name}
          renderItem={({ item }) => <AddressItem {...item} />}
          ListHeaderComponent={
            <AddressHeader
              title="卤潮鲜"
              detail="粤海街道科技园中区科苑路15号科兴科学园臻食美食广场 100铺"
            />
          }
        />
        {showsSearchResult && (
          <KeyboardAwareFlatList
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode={'on-drag'}
            style={styles.searchList}
            data={inputTips}
            keyExtractor={item => item.district + item.name}
            renderItem={({ item }) => (
              <AddressItem
                {...item}
                onPress={() =>
                  navigation.navigate('EditJobAddress', {
                    address: { ...item, city },
                  })
                }
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
    marginRight: 19,
  },
  search: {
    flex: 1,
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
  mapList: {},
  map: {
    width: '100%',
    aspectRatio: 375 / 350,
  },
})
