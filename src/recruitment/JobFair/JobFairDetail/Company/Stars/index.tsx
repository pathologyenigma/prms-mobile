import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'

interface StarsProps {
  limit?: number
  score?: number
  style?: StyleProp<ViewStyle>
}

export default function Stars({ style, limit = 5, score = 1 }: StarsProps) {
  const stars = Array(limit)
    .fill('')
    .map((_, index) => index)
  return (
    <View style={[styles.container, style]}>
      {stars.map(index => (
        <Image
          key={index}
          style={{ marginRight: index < limit - 1 ? 5 : 0 }}
          source={
            index < score ? require('./star_active.png') : require('./star.png')
          }
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {},
})
