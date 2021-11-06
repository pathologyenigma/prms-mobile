import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'

interface FilterButtonProps {
  text: string
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  onPress?: () => void
}

export default function FilterButton({
  text,
  style,
  containerStyle,
  labelStyle,
  onPress,
}: FilterButtonProps) {
  return (
    <TouchableOpacity
      hitSlop={{ top: 8, bottom: 8, left: 0, right: 0 }}
      style={[styles.touchable, style]}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.text, labelStyle]}>{text}</Text>
        <Image
          source={require('./filter.png')}
          resizeMode="contain"
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F4F4F4',
    height: 17,
    paddingLeft: 5.5,
    paddingRight: 19.5,
  },
  text: {
    color: '#666666',
    fontSize: 13,
    textAlignVertical: 'center',
    lineHeight: 17,
  },
  icon: {
    position: 'absolute',
    bottom: 2.5,
    right: 2.5,
    width: 3,
    height: 3,
  },
})
