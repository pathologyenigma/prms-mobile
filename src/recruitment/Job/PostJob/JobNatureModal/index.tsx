import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import Picker from '../../../components/Picker'
import BottomModal from '../../../components/BottomModal'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import TextButton from '../../../components/TextButton'
import { FullTime } from '../../typings'
import { stringForFullTime } from '../../JobHelper'

interface JobNatureModalProps {
  visible?: boolean
  onDismiss?: () => void
  initialValue?: FullTime
  onValueSelected?: (value: FullTime) => void
}

const labels = ['全职', '兼职', '实习']
const values: FullTime[] = ['Full', 'Part', 'InternShip']

export default function JobNatureModal({
  visible,
  initialValue,
  onValueSelected,
  onDismiss,
}: JobNatureModalProps) {
  const [selectedNature, setSelectedNature] = useState(
    initialValue || values[0],
  )

  return (
    <BottomModal
      contentStyle={styles.model}
      visible={visible}
      onDismiss={onDismiss}
      onRequestClose={onDismiss}>
      <View style={styles.header}>
        <Text style={styles.title}>请选择职位性质</Text>
        <TextButton
          title="确定"
          style={styles.button}
          onPress={() => {
            onValueSelected && onValueSelected(selectedNature)
            onDismiss && onDismiss()
          }}
        />
      </View>

      <View style={styles.wheel}>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          values={labels}
          selectedValue={stringForFullTime(selectedNature)}
          onValueChange={(itemValue, index) => {
            setSelectedNature(values[index])
          }}
        />
      </View>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  model: {
    height: 200 + getBottomSpace(),
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  wheel: {
    flex: 1,
    marginHorizontal: 22,
    padding: 0,
    paddingBottom: getBottomSpace(),
  },
  button: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 16,
  },
  picker: {
    flex: 1,
  },
  pickerItem: {
    fontSize: 15,
    lineHeight: 48,
    color: '#333333',
  },
})
