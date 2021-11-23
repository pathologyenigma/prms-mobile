import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'

export default function JobMeta() {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>项目经理</Text>
        <Text style={styles.salary}>15K-30K</Text>
      </View>
      <View style={styles.conditionRow}>
        <Text style={styles.condition}>全职</Text>
        <Text style={styles.condition}>招2人</Text>
        <Text style={styles.condition}>5-10年</Text>
        <Text style={styles.condition}>5-10年</Text>
      </View>
      <View style={styles.addressRow}>
        <Image style={styles.addressIcon} source={require('./dizhi.png')} />
        <Text style={styles.address}>深圳·南山区·大学城</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    marginHorizontal: 11,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 11,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
  },
  title: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  salary: {
    color: '#57DE9E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  conditionRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  condition: {
    color: '#666666',
    fontSize: 13,
    marginRight: 22,
  },
  addressRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIcon: {
    marginRight: 8,
  },
  address: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 13,
  },
})
