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
import TextButton from '../../../components/TextButton'
import CancelableTag from '../CancelableTag'
import { isIphoneX } from 'react-native-iphone-x-helper'
import NavBar from '../../../components/NavBar'

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

export default function JobCity() {
  const [checkedProvince, setCheckedProvince] = useState('热门')
  const [cities, setCities] = useState(citiesForProvince(checkedProvince))
  const cityLimit = 3
  const [selectedCities, setSelectedCities] = useState(['深圳'])

  const handleCityChecked = (city: string, checked: boolean) => {
    if (!checked) {
      setSelectedCities(cities => cities.filter(c => c !== city))
      return
    }

    if (selectedCities.length >= cityLimit) {
      // TODO: toast
      return
    }

    setSelectedCities(cities => [...cities, city])
  }

  useEffect(() => {
    const cities = citiesForProvince(checkedProvince)
    setCities(cities)
  }, [checkedProvince])

  const renderProviceItem: ListRenderItem<string> = ({ item }) => {
    const checked = item === checkedProvince
    return (
      <TouchableWithoutFeedback onPress={() => setCheckedProvince(item)}>
        <View style={styles.item}>
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
    const checked = selectedCities.includes(item)
    return (
      <TouchableWithoutFeedback
        onPress={() => handleCityChecked(item, !checked)}>
        <View style={[styles.item]}>
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
              source={require('../../images/checked.png')}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.container}>
      <NavBar
        title="期望工作地"
        headerRight={() => (
          <TextButton title="保存" textStyle={styles.rightButton} />
        )}
      />
      <View style={styles.selectedTagContainer}>
        <Text style={styles.count}>
          已选（{selectedCities.length}/{cityLimit}）
        </Text>
        <View style={styles.tags}>
          {selectedCities.map(tag => (
            <CancelableTag
              style={styles.tag}
              tag={tag}
              key={tag}
              onClose={() =>
                setSelectedCities(
                  selectedCities.filter(category => category !== tag),
                )
              }
            />
          ))}
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={provinces}
          keyExtractor={item => item}
          renderItem={renderProviceItem}
          style={styles.provinceContainer}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        />
        <FlatList
          data={cities}
          keyExtractor={item => item}
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
  selectedTagContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 21,
    height: 50,
    justifyContent: 'center',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginTop: 4,
    marginRight: 9,
  },
  count: {
    color: '#888888',
    fontSize: 12,
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
  rightButton: {
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
