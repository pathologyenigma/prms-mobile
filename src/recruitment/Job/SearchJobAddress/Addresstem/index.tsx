import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

interface AddressItemProps {
  name: string
  address: string
  onPress?: () => void
}

export default function AddressItem({
  name,
  address,
  onPress,
}: AddressItemProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('./daohangdizhi.png')}
          resizeMode="center"
        />
        <View style={styles.column}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.detail}>{address}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    paddingLeft: 47,
    paddingRight: 29,
    flex: 1,
  },
  image: {
    position: 'absolute',
    left: 11,
    bottom: 32,
  },
  title: {
    color: '#333333',
    fontSize: 16,
  },
  detail: {
    color: '#888888',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
})
