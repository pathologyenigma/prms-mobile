import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'
import BottomModal from '../../../components/BottomModal'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import GradientButton from '../../../components/GradientButton'
import TextButtonWithIndicator from './TextButtonWithIndicator'

interface JobLabelModalProps {
  visible?: boolean
}

interface Item {
  color: string
  label: string
  price: number
}

const items: Item[] = [
  {
    color: '#EB3A2B',
    label: '急聘',
    price: 10,
  },
  {
    color: '#F6BE4E',
    label: '热门',
    price: 8,
  },
  {
    color: '#6DE1A7',
    label: '优质',
    price: 6,
  },
]

export default function JobLabelModal({ visible }: JobLabelModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const renderItem = (item: Item, index: number) => {
    const { label, color, price } = item
    const checked = index === selectedIndex
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => setSelectedIndex(index)}>
        <View style={[styles.item, checked ? styles.checked : undefined]}>
          <View style={styles.row}>
            <Text style={[styles.label, { color, borderColor: color }]}>
              {label}
            </Text>
            <Text style={styles.price}>{`${price} 金币`}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <BottomModal visible={visible}>
      <View style={styles.header}>
        <Text style={styles.title}>职位标签</Text>
      </View>
      <ScrollView style={styles.content}>{items.map(renderItem)}</ScrollView>
      <View style={styles.bottomBar}>
        <TextButtonWithIndicator title="马上充值" />
        <GradientButton style={styles.buy} title="购买" />
      </View>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
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
  content: {},
  item: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 22,
  },
  row: {
    width: 96,
    marginLeft: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#F7F7F7',
    borderRadius: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 21,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    overflow: 'hidden',
  },
  price: {
    color: '#888888',
    fontSize: 12,
    marginLeft: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 22,
    marginBottom: isIphoneX() ? getBottomSpace() + 4 : 4,
    justifyContent: 'space-between',
  },
  buy: {
    width: 150,
  },
})
