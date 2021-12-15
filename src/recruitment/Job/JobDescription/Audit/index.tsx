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
  TouchableWithoutFeedback,
} from 'react-native'

interface AuditProps {
  status: '审核中' | '已拒绝' | '已通过'
}

export default function Audit({ status }: AuditProps) {
  if (status === '审核中') {
    return (
      <View style={styles.container}>
        <Text style={styles.pendding}>工作人员急速审核中...</Text>
      </View>
    )
  }

  if (status === '已拒绝') {
    return (
      <View style={styles.container}>
        <Image style={styles.waring} source={require('./warning.png')} />
        <Text style={styles.rejected}>
          发布的职位信息带有敏感字眼，未通过审核
        </Text>
        <TouchableWithoutFeedback>
          <Image style={styles.contact} source={require('./contact.png')} />
        </TouchableWithoutFeedback>
      </View>
    )
  }

  return null
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#FFF6F6',
    alignItems: 'center',
    marginBottom: 12,
  },
  pendding: {
    color: '#FF6868',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    marginHorizontal: 11,
  },
  rejected: {
    color: '#FF6868',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    flex: 1,
  },
  waring: {
    marginLeft: 11,
    marginRight: 3,
  },
  contact: {
    marginHorizontal: 11,
  },
})
