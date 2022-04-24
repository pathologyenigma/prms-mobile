import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function Hint() {
  return (
    <View style={styles.container}>
      <Text style={styles.hint}>
        你所提供的信息将得到绝对保护，仅限审核使用
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    marginLeft: 11,
    marginTop: 20,
    width: 300,
    justifyContent: 'center',
  },
  hint: {
    color: '#888888',
    fontSize: 13,
    lineHeight: 17,
  },
})
