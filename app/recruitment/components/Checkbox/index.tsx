import React from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  StyleProp,
  Image,
  ImageStyle,
} from 'react-native'

interface CheckboxProps {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  style?: StyleProp<ImageStyle>
}

export default function Checkbox({
  checked,
  onCheckedChange,
  style,
}: CheckboxProps) {
  // 使用 IconButton 重构
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onCheckedChange && onCheckedChange(!checked)
      }}>
      <Image
        source={checked ? require('./xuanzhong.png') : require('./weixuan.png')}
        style={[styles.image, style]}
        resizeMode="center"
      />
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  image: {},
})
