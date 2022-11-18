import React from 'react'
import {
  Pressable,
  Image,
  ImageSourcePropType,
  ViewProps,
  StyleProp,
  ImageStyle,
  ViewStyle,
} from 'react-native'

interface IconButtonProps {
  onPress?: () => void
  hitSlop?: ViewProps['hitSlop']
  icon: ImageSourcePropType
  style?: StyleProp<ViewStyle>
  iconStyle?: StyleProp<ImageStyle>
}

export default function IconButton({
  onPress,
  hitSlop = { top: 8, right: 8, bottom: 8, left: 8 },
  icon,
  style = {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle,
}: IconButtonProps) {
  return (
    <Pressable
      style={style}
      onPress={onPress}
      hitSlop={hitSlop}
      activeOpacity={0.5}>
      <Image source={icon} style={iconStyle} resizeMode="center" />
    </Pressable>
  )
}
