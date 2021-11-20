import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'

export const AllInterviewOptions: StackNavigationOptions = {
  title: '全部面试',
}

const data = ['1', '2', '3']

export default function AllInterview() {
  const renderItem = () => {
    return (
      <View style={styles.item}>
        <Text style={styles.date}>07月15日</Text>
        <View style={styles.row}>
          <Image
            style={styles.avatar}
            source={require('../../assets/avatar_default.png')}
          />
          <View style={styles.info}>
            <Text style={styles.name}>谭先生</Text>
            <Text style={styles.meta}>UI设计师 12K-16K·13月</Text>
          </View>
          <Text style={styles.time}>11:30</Text>
        </View>
      </View>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.content}
      keyExtractor={item => item}
      data={data}
      renderItem={renderItem}
      style={styles.container}></FlatList>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  item: {
    height: 114,
    paddingHorizontal: 11,
  },
  row: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
  },
  date: {
    color: '#333333',
    fontSize: 17,
    fontWeight: 'bold',
  },
  time: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    color: '#888888',
    fontSize: 12,
  },
  info: { marginLeft: 19, justifyContent: 'center' },
  name: {
    marginTop: 2,
    color: '#333333',
    fontSize: 17,
    fontWeight: 'bold',
  },
  meta: {
    marginTop: 6,
    color: '#666666',
    fontSize: 14,
  },
})
