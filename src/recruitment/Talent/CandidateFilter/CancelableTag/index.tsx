import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  ImageStyle,
} from 'react-native'
import IconButton from '../../../components/IconButton'

interface CancelableTagProps {
  tag: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  iconStyle?: StyleProp<ImageStyle>
  onClose?: () => void
}

export default function CancelableTag({
  tag,
  style,
  textStyle,
  iconStyle,
  onClose,
}: CancelableTagProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{tag}</Text>
      <IconButton
        style={[styles.icon, iconStyle]}
        icon={require('./cancel.png')}
        onPress={onClose}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7FEF1',
    borderRadius: 4,
    height: 21,
    paddingLeft: 9,
    paddingRight: 3,
  },
  text: {
    color: '#79D398',
    fontSize: 12,
    fontWeight: 'bold',
  },
  icon: {
    width: 21,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
