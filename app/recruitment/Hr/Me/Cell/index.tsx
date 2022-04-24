import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableWithoutFeedback,
} from 'react-native'

interface CellProps {
  icon: ImageSourcePropType
  title: string
  onPress?: () => void
}

export default function Cell({ icon, title, onPress }: CellProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.icon}>
          <Image source={icon} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Image source={require('./indicator.png')} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    marginHorizontal: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'bold',
    flexGrow: 1,
  },
  icon: {
    width: 35,
  },
})
