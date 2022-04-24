import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import BottomModal from '../../components/BottomModal'
import Picker from '../../components/Picker'
import TextButton from '../../components/TextButton'

interface CompanyAddressModalProps {
  visible: boolean
  onCancel?: () => void
}

const provinces = ['北京', '广东', '江苏', '上海', '湖南', '湖北', '广西']

const cities = ['广州', '深圳', '珠海', '东莞', '惠州']

export default function CompanyAddressModal({
  visible,
  onCancel,
}: CompanyAddressModalProps) {
  const [provice, setProvice] = useState('广东')
  const [city, setCity] = useState('深圳')

  const handleProvinceChange = (provice: string) => {
    setProvice(provice)
  }

  const handleHighValueChange = (city: string) => {
    setCity(city)
  }

  return (
    <BottomModal visible={visible} contentStyle={styles.content}>
      <View style={styles.header}>
        <TextButton
          title="取消"
          onPress={onCancel}
          style={styles.leftButton}
          textStyle={styles.leftButtonText}
        />
        <Text style={styles.title}>公司所在地</Text>
        <TextButton
          title="确定"
          style={styles.rightButton}
          textStyle={styles.rightButtonText}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={provice}
          values={provinces}
          onValueChange={handleProvinceChange}
        />
        <Picker
          style={styles.picker}
          selectedValue={city}
          values={cities}
          onValueChange={handleHighValueChange}
        />
      </View>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  content: {
    minHeight: isIphoneX() ? 250 : 216,
  },
  header: {
    flexDirection: 'row',
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftButton: {
    marginLeft: 22,
  },
  leftButtonText: {
    fontSize: 15,
    color: '#666666',
  },
  rightButton: {
    marginRight: 22,
  },
  rightButtonText: {
    color: '#79D398',
    fontSize: 15,
  },
  title: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: isIphoneX() ? getBottomSpace() : 8,
    overflow: 'hidden',
  },
  picker: {
    flex: 1,
    marginHorizontal: Platform.OS === 'android' ? 9 : 0,
  },
  pickerItemStyle: {
    color: '#666666',
    fontSize: 15,
    fontWeight: 'bold',
  },
})
