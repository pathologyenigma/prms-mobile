import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native'

interface AdmissionPickerProps {
  title: string
  detail?: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

export default function AdmissionPicker({
  title,
  detail,
  onPress,
  style,
}: AdmissionPickerProps) {
  return (
    <TouchableWithoutFeedback
      hitSlop={{ top: 12, bottom: 12 }}
      style={[styles.touchable, style]}
      onPress={onPress}>
      <View style={styles.picker}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={[
            styles.detail,
            detail === undefined ? styles.empty : undefined,
          ]}>
          {detail ?? '请选择'}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  touchable: {},
  picker: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    color: '#666666',
    fontSize: 15,
  },
  detail: {
    marginTop: 13,
    color: '#333333',
    fontSize: 15,
  },
  empty: {
    color: '#CCCCCC',
  },
})
