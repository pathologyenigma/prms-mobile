import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItem,
  TouchableWithoutFeedback,
} from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import NavBar from '../../components/NavBar'
import { Province, useProvinces } from './useProvinces'
import { City, useCities } from './useCities'

export default function EditJobCity() {
  const { provinces } = useProvinces()
  const [province, setProvince] = useState<Province>()
  const { cities, getCities } = useCities()

  useEffect(() => {
    if (provinces) {
      setProvince(provinces[0])
    }
  }, [provinces])

  useEffect(() => {
    if (province) {
      getCities(province.id)
    }
  }, [province])

  console.log('---------------------EditJobCity-------------------------')

  const renderProviceItem: ListRenderItem<Province> = ({ item }) => {
    const { id, name } = item
    const checked = id === province?.id
    return (
      <TouchableWithoutFeedback onPress={() => setProvince(item)}>
        <View style={styles.item}>
          {checked && <View style={styles.provinceCheckedIndicator}></View>}
          <Text
            style={[
              styles.provinceText,
              checked ? styles.itemTextChecked : undefined,
            ]}>
            {name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const renderCityItem: ListRenderItem<City> = ({ item }) => {
    const { id, name, provinceId } = item
    return (
      <TouchableWithoutFeedback>
        <View style={[styles.item]}>
          <Text style={styles.cityText}>{name}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.container}>
      <NavBar title="工作城市" />
      <View style={styles.listContainer}>
        <FlatList
          data={provinces || []}
          keyExtractor={item => item.id}
          renderItem={renderProviceItem}
          style={styles.provinceContainer}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        />
        <FlatList
          data={cities || []}
          keyExtractor={item => item.id}
          renderItem={renderCityItem}
          style={styles.cityContainer}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  provinceContainer: {
    width: '40%',
    backgroundColor: '#FFFFFF',
  },
  cityContainer: {
    width: '60%',
    backgroundColor: '#F8F8F8',
  },
  content: {
    flexGrow: 1,
    paddingBottom: isIphoneX() ? 44 : 10,
  },
  item: {
    height: 60,
    flex: 1,
    justifyContent: 'center',
  },
  provinceText: {
    color: '#666666',
    fontSize: 15,
    marginLeft: 37,
  },
  cityText: {
    color: '#666666',
    fontSize: 15,
    marginLeft: 49,
  },
  itemTextChecked: {
    color: '#79D398',
    fontWeight: 'bold',
  },
  provinceCheckedIndicator: {
    width: 5,
    height: 15,
    backgroundColor: '#79D398',
    position: 'absolute',
    left: 0,
  },
})
