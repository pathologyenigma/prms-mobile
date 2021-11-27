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
  containerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  activated?: boolean
  onPress?: () => void
}

export default function FilterButton({
  text,
  style,
  containerStyle,
  labelStyle,
  activated,
  onPress,
}: FilterButtonProps) {
  return (
    <TouchableOpacity
      hitSlop={{ top: 8, bottom: 8, left: 0, right: 0 }}
      style={[styles.touchable, style]}
      activeOpacity={0.8}
      onPress={onPress}>
      <View
        style={[
          styles.container,
          { backgroundColor: activated ? '#E7FEF1' : '#F4F4F4' },
          containerStyle,
        ]}>
        <Text
          style={[
            styles.text,
            { color: activated ? '#7DDBA3' : '#666666' },
            labelStyle,
          ]}>
          {text}
        </Text>
        <Image
          source={require('./filter.png')}
          resizeMode="contain"
          style={[
            styles.icon,
            { tintColor: activated ? '#7DDBA3' : '#666666' },
          ]}
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
    height: 17,
    width: 50,
    paddingLeft: 5.5,
  },
  text: {
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
