import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import { useState } from 'react'

export const EditHrNameDisplayOptions: StackNavigationOptions = {
  title: '名称显示',
}

interface ItemProps {
  avatar?: string
  name: string
  status: 'anonymous' | 'realname'
  checked?: boolean
  onPress?: () => void
}

function Item({ avatar, name, status, checked, onPress }: ItemProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.item}>
        <Image style={styles.avatar} source={require('./anonymous_1.png')} />
        <Text style={styles.name}>
          {name}
          {status === 'anonymous' ? '（匿名展示）' : '（实名展示）'}
        </Text>
        <Image
          style={styles.checkbox}
          source={
            checked ? require('./xuanzhong.png') : require('./weoxuanzhong.png')
          }
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function EditHrNameDisplay() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <View style={styles.container}>
      <Text style={styles.status}>当前为实名展示</Text>
      <Item
        name="李小冉"
        status="realname"
        checked={selectedIndex === 0}
        onPress={() => setSelectedIndex(0)}
      />
      <Item
        name="李小冉"
        status="anonymous"
        checked={selectedIndex === 1}
        onPress={() => setSelectedIndex(1)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  status: {
    color: '#888888',
    fontSize: 13,
    marginLeft: 11,
    marginVertical: 16,
  },
  item: {
    flexDirection: 'row',
    height: 66,
    alignItems: 'center',
    marginHorizontal: 11,
  },
  avatar: {
    width: 42,
    height: 42,
  },
  name: {
    marginLeft: 20,
    flex: 1,
  },
  checkbox: {},
})
