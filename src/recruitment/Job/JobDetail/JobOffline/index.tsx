import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function JobOffline() {
  return (
    <View style={styles.container}>
      <Image style={styles.badge} source={require('./badge.png')} />
      <Text style={styles.detail}>普通职位·已关闭</Text>
      <Text style={styles.hint}>开放职位即可与牛人沟通</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 11,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    marginLeft: 11,
  },
  detail: {
    marginHorizontal: 11,
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  hint: {
    color: '#666666',
    fontSize: 13,
    position: 'absolute',
    right: 11,
  },
})
