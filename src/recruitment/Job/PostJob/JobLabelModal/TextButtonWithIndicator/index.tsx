import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'

interface TextButtonWithIndicatorProps {
  title: string
  onPress?: () => void
}

export default function TextButtonWithIndicator({
  title,
  onPress,
}: TextButtonWithIndicatorProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.indicator} source={require('./chakan.png')} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#888888',
    fontSize: 13,
    fontWeight: 'bold',
  },
  indicator: {
    marginLeft: 10,
  },
})
