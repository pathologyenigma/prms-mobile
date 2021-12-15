import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native'

interface OnlineJobItemProps {}

export default function OnlineJobItem() {
  return (
    <View style={styles.container}>
      <Text style={styles.position}>产品经理</Text>
      <View style={styles.row}>
        <Text style={styles.meta}>深圳市</Text>
        <View style={styles.divider}></View>
        <Text style={styles.meta}>学历不限</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 57,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    paddingHorizontal: 12,
    marginRight: 11,
    marginBottom: 11,
    justifyContent: 'center',
  },
  position: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    color: '#666666',
    fontSize: 13,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: 9,
    backgroundColor: '#888888',
    marginHorizontal: 8,
  },
})
