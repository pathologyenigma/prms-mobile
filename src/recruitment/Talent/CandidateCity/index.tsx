import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ListRenderItem,
  TouchableWithoutFeedback,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import TextButton from '../../components/TextButton'

export const CandidateCityOptions: StackNavigationOptions = {
  title: '求职者当前所在地',
  headerRight: () => <TextButton title="保存" textStyle={styles.rightButton} />,
}

const provinces = [
  '热门',
  '安徽',
  '福建',
  '甘肃',
  '广东',
  '广西',
  '贵州',
  '海南',
  '河北',
  '黑龙江',
  '河南',
]

const hotCities = [
  '北京',
  '深圳',
  '广州',
  '上海',
  '南京',
  '西安',
  '成都',
  '大连',
  '长春',
  '沈阳',
  '杭州',
  '苏州',
]

function citiesForProvince(province: string) {
  if (province === '热门') {
    return hotCities
  }
  return ['不可知之地', '无人区', '神之领域']
}

export default function CandidateCity() {
  const [checkedProvince, setCheckedProvince] = useState('热门')
  const [cities, setCities] = useState(citiesForProvince(checkedProvince))
  const [checkedCity, setCheckedCity] = useState(cities[0])

  useEffect(() => {
    const cities = citiesForProvince(checkedProvince)
    setCities(cities)
    setCheckedCity(cities[0])
  }, [checkedProvince])

  const renderProviceItem: ListRenderItem<string> = ({ item }) => {
    const checked = item === checkedProvince
    return (
      <TouchableWithoutFeedback onPress={() => setCheckedProvince(item)}>
        <View style={[styles.item, checked ? styles.itemChecked : undefined]}>
          {checked && <View style={styles.provinceCheckedIndicator}></View>}
          <Text
            style={[
              styles.provinceText,
              checked ? styles.itemTextChecked : undefined,
            ]}>
            {item}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const renderCityItem: ListRenderItem<string> = ({ item }) => {
    const checked = item === checkedCity
    return (
      <TouchableWithoutFeedback onPress={() => setCheckedCity(item)}>
        <View style={[styles.item, checked ? styles.itemChecked : undefined]}>
          <Text
            style={[
              styles.cityText,
              checked ? styles.itemTextChecked : undefined,
            ]}>
            {item}
          </Text>
          {checked && (
            <Image
              style={styles.cityCheckedIndicator}
              source={require('./checked.png')}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={provinces}
        keyExtractor={item => item}
        renderItem={renderProviceItem}
        style={styles.provinceContainer}
        contentContainerStyle={styles.content}
      />
      <FlatList
        data={cities}
        keyExtractor={item => item}
        renderItem={renderCityItem}
        style={styles.cityContainer}
        contentContainerStyle={styles.content}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
  },
  rightButton: {
    marginRight: 11,
    color: '#79D398',
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
  itemChecked: {
    backgroundColor: '#E9F4EE',
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
  cityCheckedIndicator: {
    position: 'absolute',
    right: 21,
  },
})
