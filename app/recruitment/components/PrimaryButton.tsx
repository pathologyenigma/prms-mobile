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

interface PrimaryButtonProps {
  title: string
  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  onPress?: () => void
  disabled?: boolean
}

export default function PrimaryButton({
  style,
  titleStyle,
  title,
  onPress,
  disabled,
}: PrimaryButtonProps) {
  return (
    <Pressable
      activeOpacity={0.75}
      onPress={onPress}
      disabled={disabled}>
      <View style={[styles.container, { opacity: disabled ? 0.6 : 1 }, style]}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    borderRadius: 8,
    backgroundColor: '#57D693',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
})
