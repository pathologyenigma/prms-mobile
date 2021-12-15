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
import BottomModal from '../../../components/BottomModal'
import Picker from '../../../components/Picker'
import TextButton from '../../../components/TextButton'

interface JobSalaryModalProps {
  visible: boolean
  onCancel?: () => void
}

function range(start: number, end: number, step: number) {
  return Array(end / step - start / step)
    .fill(0)
    .map((el, i) => start + i * step)
    .map(el => String(el))
}

export default function JobSalaryModal({
  visible,
  onCancel,
}: JobSalaryModalProps) {
  const [lowSalary, setLowSalary] = useState(5000)
  const [highSalary, setHighSalary] = useState(6000)

  const handleLowValueChange = (value: number) => {
    if (value <= highSalary) {
      setLowSalary(value)
    }
  }

  const handleHighValueChange = (value: number) => {
    if (value >= lowSalary) {
      setHighSalary(value)
    }
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
        <Text style={styles.title}>期望薪资</Text>
        <TextButton
          title="确定"
          style={styles.rightButton}
          textStyle={styles.rightButtonText}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={String(lowSalary)}
          values={range(0, 100000, 1000)}
          onValueChange={value => handleLowValueChange(Number(value))}
        />
        <Picker
          style={styles.picker}
          selectedValue={String(highSalary)}
          values={range(1000, 100000, 1000)}
          onValueChange={value => handleHighValueChange(Number(value))}
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
