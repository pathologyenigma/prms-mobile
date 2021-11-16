import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Avatar from '../Avatar'

interface ProfileProps {}

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>李小冉</Text>
      <Text style={styles.title}>UI设计师·广东智慧网络</Text>
      <Avatar style={styles.avatar} gender="female" />
      <View style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 97,
    justifyContent: 'center',
  },
  name: { marginLeft: 11, color: '#333333', fontSize: 20, fontWeight: 'bold' },
  title: { marginLeft: 11, color: '#333333', fontSize: 13, marginTop: 5 },
  avatar: {
    position: 'absolute',
    right: 11,
    bottom: 16,
    height: 65,
    width: 65,
  },
  divider: {
    backgroundColor: '#ECECEC',
    height: 0.5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})
