import React, { Component, useEffect, useState } from 'react'
import { Text, View, TextInput, Image } from 'react-native'
import styles from './styles/HomeLocation.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'
import SystemHelper from '../../../utils/system'
import NextPressable from '../../components/NextPressable'
import { useGeoLocation } from '../../../recruitment/hooks/useGeoLocation'

type IProps = GenProps<'HomeLocation'> & {

}

interface IState {
  location: string
}

export default function HomeLocation(props: IProps) {


  const { navigation } = props
  const geoLocation = useGeoLocation()
  const [location, setLocation] = useState('')
  console.log('geoLocation: ', geoLocation)

  useEffect(() => {
    if (geoLocation) {
      setLocation(geoLocation.address)
    }
  }, [geoLocation])

  const renderNavBar = () => {
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 1,
          borderBottomColor: '#F3F3F3',
          elevation: 0,
        }}
        title="家的位置"
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/close-gray.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          value: '保存',
          style: styles.saveBtn,
          act: () => {

          }
        }}
      />
    )
  }

  const renderEdit = () => {
    return (
      <View style={styles.inputView}>
        <TextInput
          multiline={true}
          editable={false}
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.contentInput}
          placeholder="输入家的位置，用于推荐您家附近的职位"
          placeholderTextColor="#AAAAAA"
          value={location}
          numberOfLines={3}
          maxLength={100}
          onChangeText={(value) => {
            setLocation(value)
          }}
        />
      </View>
    )
  }

  const renderBtn = () => {
    return (
      <View style={styles.locationView}>
        <NextPressable
          style={styles.locationItem}
          onPress={() => {
            navigation.push('SearchJobAddress')
          }}
        >
          <Image
            style={styles.currentIcon}
            source={require('../../../assets/requestJobs/location-current.png')}
          />
          <Text style={styles.locationText}>当前定位</Text>
        </NextPressable>
        <View style={styles.line} />
        <NextPressable
          style={styles.locationItem}
          onPress={() => {
            navigation.push('MapLocate')
          }}
        >
          <Image
            style={styles.mapIcon}
            source={require('../../../assets/requestJobs/location-map.png')}
          />
          <Text style={styles.locationText}>地图选址</Text>
        </NextPressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderNavBar()}
      {renderEdit()}
      {renderBtn()}
    </View>
  )
}