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
import TextButton from '../../components/TextButton'
import CancelableTag from '../components/CancelableTag'
import { isIphoneX } from 'react-native-iphone-x-helper'
import NavBar from '../../components/NavBar'
import { StackScreenProps } from '@react-navigation/stack'
import { TalentParamList } from '../typings'
import { Province, useProvinces } from '../../hooks/useProvinces'
import { City, useCities } from '../../hooks/useCities'
import RootLoading from '../../../utils/rootLoading'

const cityLimit = 3

export default function CandidateFilterCity({
  navigation,
  route,
}: StackScreenProps<TalentParamList, 'CandidateFilterCity'>) {
  const { cities: jobCities = [] } = route.params || {}

  const { provinces } = useProvinces()
  const [province, setProvince] = useState<Province>()
  const { cities, getCities } = useCities()

  useEffect(() => {
    if (provinces) {
      setProvince(provinces[0])
    }
  }, [provinces])

  useEffect(() => {
    if (province && province.id !== '0') {
      getCities(province.id)
    }
  }, [province])

  const handleCityChecked = (city: City, checked: boolean) => {
    if (!checked) {
      navigation.setParams({
        cities: jobCities.filter(c => c !== city.name),
      })
      return
    }

    if (jobCities.length >= cityLimit) {
      RootLoading.info(`最多可选 ${cityLimit} 项`)
      return
    }
    navigation.setParams({
      cities: [...jobCities, city.name],
    })
  }

  const renderProviceItem: ListRenderItem<Province> = ({ item }) => {
    const { name, id } = item
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
    let { name, id } = item
    if (name === '市辖区' || name === '县') {
      name = province!.name
    }

    const checked = jobCities.includes(name)
    return (
      <TouchableWithoutFeedback
        onPress={() => handleCityChecked({ name, id }, !checked)}>
        <View style={[styles.item]}>
          <Text
            style={[
              styles.cityText,
              checked ? styles.itemTextChecked : undefined,
            ]}>
            {name}
          </Text>
          {checked && (
            <Image
              style={styles.cityCheckedIndicator}
              source={require('../images/checked.png')}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.container}>
      <NavBar
        title="期望城市"
        headerRight={() => (
          <TextButton
            title="保存"
            onPress={() =>
              navigation.navigate('CandidateFilter', { cities: jobCities })
            }
          />
        )}
      />
      <View style={styles.selectedTagContainer}>
        <Text style={styles.count}>
          已选（{jobCities.length}/{cityLimit}）
        </Text>
        <View style={styles.tags}>
          {jobCities.map(city => (
            <CancelableTag
              style={styles.tag}
              tag={city}
              key={city}
              onClose={() =>
                navigation.setParams({
                  cities: jobCities.filter(c => c !== city),
                })
              }
            />
          ))}
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={provinces}
          keyExtractor={item => item.id}
          renderItem={renderProviceItem}
          style={styles.provinceContainer}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        />
        <FlatList
          data={cities}
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
