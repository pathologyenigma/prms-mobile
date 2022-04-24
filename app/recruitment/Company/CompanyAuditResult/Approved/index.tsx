import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'

export default function Approved() {
  return (
    <View style={styles.container}>
      <Image source={require('./approved.png')} />
      <Text style={styles.title}>认证审核通过</Text>
      <Text style={styles.detail}>快去发布招聘信息吧～</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height / 6.0,
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 21,
  },
  detail: {
    color: '#888888',
    fontSize: 13,
    marginTop: 13,
  },
})
