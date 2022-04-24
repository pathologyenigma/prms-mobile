import React from 'react'
import {
  ViewStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native'

interface LabelWithIconProps {
  title: string
  icon: ImageSourcePropType
  style?: StyleProp<ViewStyle>
}

export default function LabelWithIcon({
  title,
  icon,
  style,
}: LabelWithIconProps) {
  return (
    <View style={[styles.container, style]}>
      <Image source={icon} />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  title: {
    marginLeft: 9,
    color: '#333333',
    fontSize: 14,
  },
})
