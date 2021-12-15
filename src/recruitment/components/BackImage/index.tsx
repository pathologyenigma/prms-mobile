import React from 'react'
import { StatusBarProps, Image, Platform, StyleSheet, View } from 'react-native'

interface BackImageProps {
  barStyle: StatusBarProps['barStyle']
}

export default function BackImage({ barStyle }: BackImageProps) {
  return (
    <View style={styles.button}>
      <Image
        source={
          barStyle === 'dark-content'
            ? require('./back.png')
            : require('./back_white.png')
        }
        resizeMode="contain"
        style={styles.icon}
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
  icon: {},
})
