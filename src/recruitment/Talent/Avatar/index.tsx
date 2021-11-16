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

function defaultAvatarForGender(gender: 'male' | 'female') {
  return gender === 'male' ? require('./male.png') : require('./female.png')
}

export default function Avatar({
  gender,
  uri,
  style,
  genderStyle,
}: AvatarProps) {
  return (
    <View style={style}>
      <Image
        style={styles.avatar}
        source={uri ? uri : defaultAvatarForGender(gender)}
        resizeMode="cover"
      />
      <Image
        style={[styles.icon, genderStyle]}
        source={gender === 'male' ? require('./nv.png') : require('./nv.png')}
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
  },
})
