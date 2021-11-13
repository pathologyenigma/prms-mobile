import React from 'react'
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ViewProps,
  StyleProp,
  ImageStyle,
  StyleSheet,
} from 'react-native'

interface IconButtonProps {
  onPress?: () => void
  hitSlop?: ViewProps['hitSlop']
  icon: ImageSourcePropType
  style?: StyleProp<ImageStyle>
}

export default function IconButton({
  onPress,
  hitSlop,
  icon,
  style,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={hitSlop}
      activeOpacity={0.5}
      style={style}>
      <Image source={icon} style={[styles.icon, style]} resizeMode="center" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 36,
    height: 36,
  },
})
