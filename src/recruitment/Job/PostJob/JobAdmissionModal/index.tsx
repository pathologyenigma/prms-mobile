import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Platform } from 'react-native'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import BottomModal from '../../../components/BottomModal'
import GradientButton from '../../../components/GradientButton'
import Picker from '../../../components/Picker'
import Tab from './Tab'

interface JobAdmissionModalProps {
  visible?: boolean
}

export default function JobAdmissionModal({ visible }: JobAdmissionModalProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  return (
    <BottomModal visible={visible}>
      <View style={styles.tabs}>
        <Tab
          title="经验要求"
          checked={selectedTabIndex === 0}
          onPress={() => setSelectedTabIndex(0)}
        />
        <Tab
          title="学历要求"
          checked={selectedTabIndex === 1}
          onPress={() => setSelectedTabIndex(1)}
        />
        <Tab
          title="薪资范围"
          checked={selectedTabIndex === 2}
          onPress={() => setSelectedTabIndex(2)}
        />
      </View>
      <View style={styles.pannels}>
        {selectedTabIndex === 0 && (
          <View style={styles.pannel}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              values={[
                '经验不限',
                '一年以下',
                '1 到 3 年',
                '3 到 5 年',
                '5 到 10 年',
                '10 年以上',
              ]}
              selectedValue={'经验不限'}
            />
            <GradientButton
              style={styles.button}
              title="下一步"
              onPress={() => setSelectedTabIndex(1)}
            />
          </View>
        )}
        {selectedTabIndex === 1 && (
          <View style={styles.pannel}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              values={[
                '学历不限',
                '初中及以下',
                '高中',
                '大专',
                '本科',
                '研究生',
              ]}
              selectedValue={'学历不限'}
            />
            <GradientButton
              style={styles.button}
              title="下一步"
              onPress={() => setSelectedTabIndex(2)}
            />
          </View>
        )}
        {selectedTabIndex === 2 && (
          <View style={styles.pannel}>
            <View style={styles.row}>
              <Picker
                roundRectType="left"
                style={[
                  styles.picker,
                  { marginRight: Platform.OS === 'ios' ? -9 : 0 },
                ]}
                itemStyle={styles.pickerItem}
                values={['2000', '3000', '4000', '5000', '6000', '7000']}
                selectedValue={'学历不限'}
              />
              <Picker
                roundRectType="none"
                style={[
                  styles.picker,
                  { marginHorizontal: 0, borderRadius: 0, padding: 0 },
                ]}
                itemStyle={styles.pickerItem}
                values={['2000', '3000', '4000', '5000', '6000', '7000']}
                selectedValue={'学历不限'}
              />
              <Picker
                roundRectType="right"
                style={[
                  styles.picker,
                  { marginLeft: Platform.OS === 'ios' ? -9 : 0 },
                ]}
                itemStyle={styles.pickerItem}
                values={['12 薪', '13 薪', '14 薪', '15 薪', '16 薪']}
                selectedValue={'学历不限'}
              />
            </View>
            <GradientButton
              style={styles.button}
              title="完成"
              onPress={() => setSelectedTabIndex(2)}
            />
          </View>
        )}
      </View>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  tabs: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pannels: {
    flex: 1,
    paddingBottom: isIphoneX() ? getBottomSpace() : 0,
  },
  pannel: {
    flex: 1,
    overflow: 'hidden',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  picker: {
    marginHorizontal: Platform.OS === 'ios' ? 12 : 22,
  },
  pickerItem: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    marginHorizontal: 22,
    marginTop: 8,
    marginBottom: 8,
  },
})
