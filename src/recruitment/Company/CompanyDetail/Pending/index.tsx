import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native'

export default function Pending() {
  return (
    <View
      pointerEvents="box-only"
      style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Image style={styles.image} source={require('./shenhezhong.png')} />
      <Text style={styles.title}>认证审核中</Text>
      <Text style={styles.detail}>预计两个工作日内完成</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
  },
  image: {
    marginTop: Dimensions.get('window').height * 0.3,
  },
  title: {
    color: '#CCCCCC',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
  },
  detail: {
    color: '#AAAAAA',
    fontSize: 12,
    marginTop: 12,
  },
})
