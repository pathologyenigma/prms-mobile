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
  title?: string
  onPress?: () => void
  disabled?: boolean
  colors?: string[]
  hitSlop?: ViewProps['hitSlop']
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  linearGradientStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  renderContent?: () => JSX.Element
}

export default function GradientButton({
  onPress,
  disabled,
  hitSlop,
  colors = ['#57D693', '#83E3AE'],
  style,
  linearGradientStyle,
  title = '',
  titleStyle,
  renderContent,
}: GradientButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      hitSlop={hitSlop}
      style={[styles.container, style]}>
      <View style={{ flex: 1, opacity: disabled ? 0.6 : 1 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colors}
          style={[
            styles.linearGradient,
            linearGradientStyle,
            disabled ? linearGradientStyle : undefined,
          ]}>
          {renderContent ? (
            renderContent()
          ) : (
            <Text style={[styles.text, titleStyle]}>{title}</Text>
          )}
        </LinearGradient>
      </View>
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
