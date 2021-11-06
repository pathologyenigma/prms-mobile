import React from 'react'
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ViewProps,
  ViewStyle,
  StyleProp,
  ImageStyle,
  StyleSheet,
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
  hitSlop,
  icon,
  style,
  iconStyle,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={hitSlop}
      style={[styles.touchable, style]}>
      <Image
        source={icon}
        style={[styles.icon, iconStyle]}
        resizeMode="center"
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchable: {},
  icon: {
    width: 36,
    height: 36,
  },
})
