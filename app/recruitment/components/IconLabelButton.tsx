import React, { useState } from 'react'
import { ImageSourcePropType, ImageStyle, TouchableOpacity } from 'react-native'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'

interface IconLabelButtonProps {
  icon: ImageSourcePropType
  label: string
  style?: StyleProp<ViewStyle>
  iconStyle?: StyleProp<ImageStyle>
  labelStyle?: StyleProp<TextStyle>
  onPress?: () => void
}

export default function IconLabelButton({
  icon,
  label,
  style,
  iconStyle,
  labelStyle,
  onPress,
}: IconLabelButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={[styles.container, style]}>
        <Image source={icon} style={[styles.icon, iconStyle]} />
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {},
  label: {
    marginLeft: 7,
    color: '#666666',
    fontSize: 15,
  },
})
