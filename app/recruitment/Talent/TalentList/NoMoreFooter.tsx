import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function NoMoreFooter() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>没有更多啦，去搜索试试～</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    color: '#888888',
  },
})
