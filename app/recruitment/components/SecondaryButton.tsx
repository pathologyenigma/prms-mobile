import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native'

interface SecondaryButtonProps {
  title: string
  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  onPress?: () => void
}

export default function SecondaryButton({
  style,
  titleStyle,
  title,
  onPress,
}: SecondaryButtonProps) {
  return (
    <Pressable
      activeOpacity={0.5}
      onPress={onPress}
      style={[styles.container, style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#666666',
    fontSize: 13,
  },
})
