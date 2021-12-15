import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  View,
  Image,
} from 'react-native'

interface AvatarProps {}

export default function Avatar({}: AvatarProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.back} source={require('./back.png')} />
      <View style={styles.outline}>
        <Image style={styles.avatar} source={require('./default.png')} />
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
  },
})
