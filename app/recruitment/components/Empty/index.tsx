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

export default function Empty() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./404.png')} />
      <Text style={styles.text}>空空如也～</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
  },
  text: {
    color: '#333333',
    fontSize: 15,
  },
  image: {
    marginTop: 90,
  },
})
