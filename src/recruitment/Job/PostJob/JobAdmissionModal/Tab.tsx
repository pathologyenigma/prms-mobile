import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'

interface TabProps {
  title: string
  checked?: boolean
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

export default function Tab({
  style,
  title,
  checked = false,
  onPress,
}: TabProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <View style={checked ? styles.indicator : styles.inactiveIndicator} />
        <View style={styles.title}>
          <Text style={checked ? styles.active : styles.inactive}>{title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  active: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inactive: {
    textAlign: 'center',
    color: '#888888',
    fontSize: 18,
  },
  indicator: {
    backgroundColor: '#57DE9E',
    borderRadius: 1.5,
    width: 40,
    height: 3,
  },
  inactiveIndicator: {
    backgroundColor: '#00000000',
    borderRadius: 1.5,
    width: 40,
    height: 3,
  },
})
