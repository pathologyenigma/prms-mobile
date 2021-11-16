import React from 'react'
import { ViewStyle, StyleProp, ImageStyle } from 'react-native'
import IconButton from '../../../components/IconButton'

interface FavoriteButtonProps {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

export default function FavoriteButton({
  checked,
  onCheckedChange,
}: FavoriteButtonProps) {
  return (
    <IconButton
      icon={checked ? require('./yishoucang.png') : require('./shoucang.png')}
      onPress={() => onCheckedChange && onCheckedChange(!checked)}
    />
  )
}
