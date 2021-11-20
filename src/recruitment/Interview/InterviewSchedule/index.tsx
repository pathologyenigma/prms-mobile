import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  FlatList,
  ListRenderItem,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import Empty from './Empty'
import TextButton from '../../components/TextButton'
import Item, { ItemProps } from './Item'

export const InterviewScheduleOptions: StackNavigationOptions = {
  title: '面试日程',
  headerRight: () => <TextButton style={styles.rightButton} title="全部" />,
}

const data: ItemProps[] = [
  {
    date: '10月1日',
    time: '17:30',
    name: '谭先生',
    method: '线下面试',
    position: '视觉设计师',
    salary: '10K-15K',
    status: '已面试',
    isFirst: true,
  },
  {
    date: '10月2日',
    time: '10:30',
    name: '谭先生',
    method: '线下面试',
    position: '视觉设计师',
    salary: '10K-15K',
    status: '即将开始',
  },
  {
    date: '10月3日',
    time: '14:00',
    name: '谭先生',
    method: '线下面试',
    position: '视觉设计师',
    salary: '10K-15K',
    status: '待面试',
    isLast: true,
  },
]

export default function InterviewSchedule() {
  const renderItem: ListRenderItem<ItemProps> = ({ item }) => {
    return <Item {...item} />
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.content}
        keyExtractor={item => item.date + item.time}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={Empty}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  rightButton: {
    marginRight: 11,
  },
})
