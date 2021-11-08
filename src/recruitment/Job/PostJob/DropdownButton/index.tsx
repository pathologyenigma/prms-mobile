import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'

interface DropdownButtonProps {
  title: string
  onPress?: () => void
}

export default function DropdownButton({
  title,
  onPress,
}: DropdownButtonProps) {
  return (
    <TouchableWithoutFeedback style={styles.touchable} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Image
          style={styles.icon}
          source={require('./icon.png')}
          resizeMode="contain"
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  touchable: {},
  container: {
    backgroundColor: '#F4F4F4',
    borderRadius: 4,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 9,
  },
  text: {
    color: '#666666',
    fontSize: 13,
  },
  icon: {
    marginLeft: 7.5,
  },
})
