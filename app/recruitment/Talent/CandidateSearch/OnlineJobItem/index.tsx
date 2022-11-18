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

import { stringForEducation } from '~/recruitment/utils/JobHelper'

interface OnlineJobItemProps {}

export default function OnlineJobItem({ item }) {
  return (
    <View style={styles.container}>
      <Text style={styles.position}>{item.category[item.category.length - 1]}</Text>
      <View style={styles.row}>
        <Text style={styles.meta}>{item?.address_description?.[4]}</Text>
        <View style={styles.divider}></View>
        <Text style={styles.meta}>{stringForEducation(item.min_education)}</Text>
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
