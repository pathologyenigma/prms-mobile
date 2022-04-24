import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextButton from '../../components/TextButton'
import JobInfoItem from '../PostJob/JobInfoItem'
import TextInputWithCounter from '../../components/TextInputWithCounter'
import { StackScreenProps } from '@react-navigation/stack'
import NavBar from '../../components/NavBar'
import { PoiItem } from '~/common/location/geolocation'
import { JobParamList } from '../typings'

function computeBuildingName(poiItem?: PoiItem) {
  if (poiItem) {
    const { city, district, name } = poiItem
    return `${city}${district}${name}`
  }
  return undefined
}

function computeWorkingAddress(poiItem: PoiItem) {
  const { adcode, province, city, district } = poiItem
  return [
    `${adcode.substr(0, 2)}0000000000`,
    `${adcode.substr(0, 4)}00000000`,
    `${adcode}000000`,
    province,
    city,
    district,
  ]
}

export default function EditJobAddress({
  navigation,
  route,
}: StackScreenProps<JobParamList, 'EditJobAddress'>) {
  const { poiItem, workingAddress, coordinates } = route.params || {}

  const [buildingName, setBuildingName] = useState(workingAddress?.[6])
  const [floorNum, setFloorNum] = useState(
    workingAddress && workingAddress.length >= 7 ? workingAddress[7] : '',
  )

  useEffect(() => {
    if (poiItem) {
      setBuildingName(computeBuildingName(poiItem))
      const { latitude, longitude } = poiItem
      navigation.setParams({ coordinates: [longitude, latitude] })
    }
  }, [poiItem])

  console.log(
    '-------------------------EditJobAddress--------------------------',
  )

  const handleSave = () => {
    if (!buildingName) {
      Toast.show('请填写上班地址')
      return
    }

    if (!floorNum) {
      Toast.show('请填写门牌号')
      return
    }

    if (!coordinates) {
      Toast.show('请重新填写上班地址')
      return
    }

    let newAddress = ['']

    if (poiItem) {
      // 重新填写了上班地址
      newAddress = computeWorkingAddress(poiItem)
      newAddress.push(buildingName)
    } else if (workingAddress) {
      // 仅仅修改了门牌号
      newAddress = [...workingAddress]
      newAddress.length = 7
    }
    newAddress.push(floorNum)

    console.log(newAddress)

    navigation.navigate('PostJob', {
      coordinates: coordinates,
      workingAddress: newAddress,
    })
  }

  return (
    <View style={styles.container}>
      <NavBar
        title="上班地址"
        headerRight={() => <TextButton title="保存" onPress={handleSave} />}
      />
      <JobInfoItem
        title="上班地址（必填）"
        content={buildingName}
        placeholder="请填写工作地点"
        onPress={() =>
          navigation.navigate('SearchJobAddress', {
            city: workingAddress?.[4],
            coordinates: coordinates
              ? { latitude: coordinates[1], longitude: coordinates[0] }
              : undefined,
          })
        }
      />
      <Text style={styles.doors}>门牌号</Text>
      <TextInputWithCounter
        placeholder="例：C座12层2206室"
        maxLength={50}
        autoFocus={false}
        style={styles.input}
        value={floorNum}
        onChangeText={setFloorNum}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  doors: {
    color: '#666666',
    fontSize: 15,
    marginLeft: 11,
    marginTop: 25,
    marginBottom: 15,
  },
  input: {
    marginHorizontal: 11,
    height: 72,
  },
})
