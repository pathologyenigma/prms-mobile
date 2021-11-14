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
  iconStyle?: StyleProp<ImageStyle>
}

export default function IconButton({
  onPress,
  hitSlop = { top: 8, right: 8, bottom: 8, left: 8 },
  icon,
  style = { width: 36, height: 36 },
  iconStyle,
}: IconButtonProps) {
  return (
    <TouchableOpacity style={style} onPress={onPress} hitSlop={hitSlop}>
      <Image source={icon} style={iconStyle} resizeMode="center" />
    </TouchableOpacity>
  )
}
