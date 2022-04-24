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

interface LabelAndDetailProps {
  label: string
  detail: string
  onPress?: () => void
}

export default function LabelAndDetail({
  label,
  detail,
  onPress,
}: LabelAndDetailProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.detail}>{detail}</Text>
        <Image style={styles.indicator} source={require('./indicator.png')} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  label: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 12,
  },
  detail: {
    color: '#888888',
    fontSize: 12,
    marginRight: 14,
    flex: 1,
    textAlign: 'right',
  },
  indicator: {},
})
