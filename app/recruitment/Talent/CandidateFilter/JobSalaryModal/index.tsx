import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import BottomModal from '../../../components/BottomModal'
import Picker from '../../../components/Picker'
import TextButton from '../../../components/TextButton'
import {
  maxSalaryLabels,
  maxSalaryValues,
  minSalaryLabels,
  minSalaryValues,
} from '../../../utils/JobHelper'

interface JobSalaryModalProps {
  visible: boolean
  salary?: number[]
  onPickSalary?: (salary: number[]) => void
  onDismiss?: () => void
}

export default function JobSalaryModal({
  visible,
  onDismiss,
  salary,
  onPickSalary,
}: JobSalaryModalProps) {
  // 最低薪资
  const [selectedMinSalary, setSelectedMinSalary] = useState(15 * 1000)
  useEffect(() => {
    if (salary !== undefined) {
      setSelectedMinSalary(salary[0])
    }
  }, [salary])

  // 最高薪资
  const [selectedMaxSalary, setSelectedMaxSalary] = useState(30 * 1000)
  useEffect(() => {
    if (salary !== undefined) {
      setSelectedMaxSalary(salary[1])
    }
  }, [salary])

  return (
    <BottomModal
      visible={visible}
      contentStyle={styles.content}
      onDismiss={onDismiss}
      onRequestClose={onDismiss}>
      <View style={styles.header}>
        <TextButton
          title="取消"
          onPress={onDismiss}
          style={styles.leftButton}
          textStyle={styles.leftButtonText}
        />
        <Text style={styles.title}>期望薪资</Text>
        <TextButton
          title="确定"
          onPress={() => {
            onPickSalary?.([selectedMinSalary, selectedMaxSalary])
            onDismiss?.()
          }}
          style={styles.rightButton}
          textStyle={styles.rightButtonText}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          roundRectType="left"
          style={[
            styles.picker,
            { marginRight: Platform.OS === 'ios' ? -9 : 0 },
          ]}
          values={minSalaryLabels}
          selectedValue={`${selectedMinSalary / 1000}k`}
          onValueChange={(_, index) =>
            setSelectedMinSalary(minSalaryValues[index])
          }
        />
        <Picker
          roundRectType="right"
          style={[
            styles.picker,
            { marginLeft: Platform.OS === 'ios' ? -9 : 0 },
          ]}
          values={maxSalaryLabels}
          selectedValue={`${selectedMaxSalary / 1000}k`}
          onValueChange={(_, index) =>
            setSelectedMaxSalary(maxSalaryValues[index])
          }
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
