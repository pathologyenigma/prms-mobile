import React from 'react'
import { Image, Platform, StyleSheet, View } from 'react-native'

export default function BackImage() {
  return (
    <View style={styles.button}>
      <Image
        source={require('./back.png')}
        resizeMode="center"
        style={Platform.OS === 'ios' ? styles.icon : undefined}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 11,
  },
})
