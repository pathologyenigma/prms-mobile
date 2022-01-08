import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import Avatar from '../../components/Avatar'

interface ItemProps {
  gender: 'male' | 'female'
  onPress?: () => void
}

export default function Item({ gender, onPress }: ItemProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.jobContainer}>
          <Text style={styles.job}>职位：项目经理</Text>
          <Text style={styles.time}>今天 09:30</Text>
        </View>
        <Text style={styles.name}>谭先生</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.meta}>29岁</Text>
          <View style={styles.divider} />
          <Text style={styles.meta}>工作6年</Text>
          <View style={styles.divider} />
          <Text style={styles.meta}>本科·211</Text>
          <View style={styles.divider} />
          <Text style={styles.meta}>期望2.5万-3万</Text>
        </View>
        <Text style={styles.title}>医药销售代表</Text>
        <Text style={styles.experience}>医疗销售(1年4个月)</Text>
        <Avatar style={styles.avatar} gender={gender} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 136,
    flex: 1,
    paddingHorizontal: 11,
  },
  avatar: {
    width: 48,
    height: 48,
    position: 'absolute',
    top: 38,
    right: 11,
  },
  jobContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  job: {
    color: '#888888',
    fontSize: 12,
  },
  time: {
    color: '#888888',
    fontSize: 12,
  },
  name: {
    marginTop: 10,
    color: '#333333',
    fontSize: 13,
    fontWeight: 'bold',
  },
  metaContainer: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    color: '#666666',
    fontSize: 12,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: 9,
    backgroundColor: '#666666',
    marginHorizontal: 8,
  },
  title: {
    marginTop: 10,
    color: '#333333',
    fontSize: 13,
    fontWeight: 'bold',
  },
  experience: {
    marginTop: 6,
    color: '#888888',
    fontSize: 12,
  },
})
