import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import Picker from '../../../components/Picker'
import BottomModal from '../../../components/BottomModal'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import TextButton from '../../../components/TextButton'

interface JobNatureModalProps {
  visible?: boolean
  initialValue?: string
  onValueSelected?: (value: string) => void
}

const natures = ['全职', '兼职', '实习', '校园']

export default function JobNatureModal({
  visible,
  initialValue,
  onValueSelected,
}: JobNatureModalProps) {
  const [selectedNature, setSelectedNature] = useState(
    initialValue || natures[0],
  )

  return (
    <BottomModal visible={visible}>
      <View style={styles.header}>
        <Text style={styles.title}>请选择职位性质</Text>
        <TextButton
          title="确定"
          style={styles.button}
          onPress={() => {
            onValueSelected && onValueSelected(selectedNature)
          }}
        />
      </View>

      <View style={styles.wheel}>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          values={natures}
          selectedValue={selectedNature}
          onValueChange={itemValue => {
            setSelectedNature(itemValue)
          }}
        />
      </View>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
