import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ViewProps,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

interface GradientButtonProps {
  title: string
  onPress?: () => void
  colors?: string[]
  hitSlop?: ViewProps['hitSlop']
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  linearGradientStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
}

export default function GradientButton({
  onPress,
  hitSlop,
  colors = ['#57D693', '#83E3AE'],
  style,
  linearGradientStyle,
  title,
  titleStyle,
}: GradientButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      hitSlop={hitSlop}
      style={[styles.container, style]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors}
        style={[styles.linearGradient, linearGradientStyle]}>
        <Text style={[styles.text, titleStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
})
