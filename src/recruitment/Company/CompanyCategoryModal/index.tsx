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

interface CompanyCategoryModalProps {
  visible: boolean
  onCancel?: () => void
}

const categories = ['国有企业', '民营企业', '联营企业']

export default function CompanyCategoryModal({
  visible,
  onCancel,
}: CompanyCategoryModalProps) {
  const [catetory, setCategory] = useState('民营企业')

  const handleCategoryChange = (category: string) => {
    setCategory(category)
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
        <Text style={styles.title}>公司类型</Text>
        <TextButton
          title="确定"
          style={styles.rightButton}
          textStyle={styles.rightButtonText}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={catetory}
          values={categories}
          onValueChange={handleCategoryChange}
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
    marginHorizontal: Platform.OS === 'android' ? 22 : 13,
  },
  pickerItemStyle: {
    color: '#666666',
    fontSize: 15,
    fontWeight: 'bold',
  },
})
