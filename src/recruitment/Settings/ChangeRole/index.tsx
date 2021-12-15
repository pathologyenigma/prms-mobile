import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'

import NavBar from '../../components/NavBar'
import GradientButton from '../../components/GradientButton'

export default function ChangeRole() {
  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.content}>
        <Text style={styles.title}>当前的状态：我要招人</Text>
        <Image style={styles.image} source={require('./image.png')} />
        <GradientButton style={styles.button} title="切换至我要找工作" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 35,
  },
  image: {
    marginTop: 70,
  },
  button: {
    width: 210,
    marginTop: 29,
  },
})
