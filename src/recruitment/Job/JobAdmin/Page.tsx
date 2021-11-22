import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ListRenderItem,
} from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import GradientButton from '../../components/GradientButton'
import Empty from './Empty'
import Item, { ItemProps } from './Item'

interface PageProps {
  tab: string
}

const data: ItemProps[] = [
  {
    title: '项目经理',
    tags: [
      { text: '急聘', color: '#EB3B2B' },
      { text: '全职', color: '#6CD6B3' },
    ],
    status: '停止招聘',
    labels: ['3-4年', '大专及以上', '深圳·宝安区'],
  },
  {
    title: '项目经理',
    tags: [
      { text: '急聘', color: '#EB3B2B' },
      { text: '全职', color: '#6CD6B3' },
    ],
    status: '15K-30K',
    labels: ['3-4年', '大专及以上', '深圳·宝安区'],
  },
]

export default function Page({ tab }: PageProps) {
  const renderItem: ListRenderItem<ItemProps> = ({ item, index }) => {
    return <Item {...item} />
  }

  return (
    <View style={StyleSheet.absoluteFillObject} collapsable={false}>
      <FlatList
        contentContainerStyle={styles.content}
        keyExtractor={(item: ItemProps, index: number) => item.title + index}
        data={tab === '审核中' ? [] : data}
        renderItem={renderItem}
        ListEmptyComponent={Empty}
      />
      {tab !== '审核中' && (
        <GradientButton style={styles.button} title="发布职位" />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    flex: 1,
  },
  button: {
    marginBottom: isIphoneX() ? 37 : 8,
    marginHorizontal: 22,
    marginTop: 8,
  },
})
