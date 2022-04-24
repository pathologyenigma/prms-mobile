import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  View,
  Image,
} from 'react-native'

export default function Avatar({ url }) {
  return (
    <View style={styles.container}>
      <Image style={styles.back} source={require('./back.png')} />
      <View style={styles.outline}>
        <CacheImage style={styles.avatar} source={ url ? { uri: url } : require('./default.png') } />
      </View>
      <Image style={styles.front} source={require('./front.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 92,
    height: 72,
    alignItems: 'center',
  },
  back: {
    position: 'absolute',
    bottom: 5,
  },
  front: { position: 'absolute', bottom: 0 },
  outline: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2.0
  },
})
