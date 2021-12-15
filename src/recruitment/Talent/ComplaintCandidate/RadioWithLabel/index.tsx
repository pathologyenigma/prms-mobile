import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'

interface RadioWithLabelProps {
  checked: boolean
  title: string
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export default function RadioWithLabel({
  checked,
  title,
  style,
  onPress,
}: RadioWithLabelProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <Image
          source={
            checked ? require('./xuanzhong.png') : require('./weixuanzhong.png')
          }
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 17,
  },
})
