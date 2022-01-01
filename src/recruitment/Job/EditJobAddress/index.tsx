import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextButton from '../../components/TextButton'
import JobInfoItem from '../PostJob/JobInfoItem'
import TextInputWithCounter from '../../components/TextInputWithCounter'
import { StackScreenProps } from '@react-navigation/stack'
import NavBar from '../../components/NavBar'
import { JobAddress, JobParamList } from '../typing'

interface AddressRegion {
  province: string
  city: string
  town: string
}

function regionFromAddress(address?: JobAddress) {
  if (!address) {
    return undefined
  }

  const { city, district } = address
  if (district.includes(city)) {
    const [province, town] = district.split(city)
    console.log(province, town)
    return { province, city, town }
  }
}

function workAddress(address?: JobAddress, region?: AddressRegion) {
  if (address && region) {
    const { city, town } = region
    return `${city}${town}${address.name}`
  }

  if (address) {
    return `${address.district}${address.name}`
  }
  return undefined
}

export default function EditJobAddress({
  navigation,
  route,
}: StackScreenProps<JobParamList, 'EditJobAddress'>) {
  const { address } = route.params || {}
  const region = regionFromAddress(address)
  const [text, setText] = useState<string>()

  return (
    <View style={styles.container}>
      <NavBar
        title="上班地址"
        headerRight={() => <TextButton title="保存" />}
      />
      <JobInfoItem
        title="上班地址（必填）"
        content={workAddress(address, region)}
        placeholder="请填写工作地点"
        onPress={() => navigation.navigate('SearchJobAddress', {})}
      />
      <Text style={styles.doors}>门牌号</Text>
      <TextInputWithCounter
        placeholder="例：C座12层2206室"
        maxLength={50}
        autoFocus={false}
        style={styles.input}
        value={text}
        onChangeText={setText}
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
