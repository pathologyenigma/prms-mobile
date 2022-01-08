import React from 'react'
import {
  ViewStyle,
  StyleProp,
  StyleSheet,
  View,
  Image,
  ImageStyle,
} from 'react-native'

interface AvatarProps {
  gender: 'male' | 'female'
  uri?: string
  style?: StyleProp<ViewStyle>
  genderStyle?: StyleProp<ImageStyle>
}

export default function Avatar({
  gender,
  uri,
  style = { width: 48, height: 48 },
  genderStyle,
}: AvatarProps) {
  return (
    <View style={style}>
      <Image
        style={styles.avatar}
        source={uri ? uri : require('../../../assets/avatar_default.png')}
        resizeMode="cover"
      />
      <Image
        style={[styles.icon, genderStyle]}
        source={gender === 'male' ? require('./nan.png') : require('./nv.png')}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: '100%',
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 13,
    height: 13,
  },
})
