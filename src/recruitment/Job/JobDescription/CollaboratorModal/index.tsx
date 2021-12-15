import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableWithoutFeedback,
} from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import BottomModal from '../../../components/BottomModal'
import IconButton from '../../../components/IconButton'

interface CollaboratorModalProps {
  visible: boolean
  onClose?: () => void
}
interface Colleague {
  avatar: ImageSourcePropType
  name: string
}

const colleagues: Array<Colleague> = [
  {
    avatar: require('./1.png'),
    name: '李小冉',
  },
  {
    avatar: require('./2.png'),
    name: '陈晓波',
  },
  {
    avatar: require('./7.png'),
    name: '姜文',
  },
]

export default function CollaboratorModal({
  visible,
  onClose,
}: CollaboratorModalProps) {
  const renderColleague = (c: Colleague, index: number) => {
    return (
      <TouchableWithoutFeedback key={index}>
        <View style={styles.colleague}>
          <Image style={styles.avatar} source={c.avatar} />
          <Text style={styles.name}>{c.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <BottomModal
      visible={visible}
      contentStyle={{ minHeight: isIphoneX() ? 220 : 190 }}>
      <View style={styles.bar}>
        <Text style={styles.title}>转发给同事一起招聘</Text>
        <IconButton
          style={styles.close}
          icon={require('./close.png')}
          onPress={onClose}
        />
      </View>
      <View style={styles.colleagues}>{colleagues.map(renderColleague)}</View>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 39,
    alignItems: 'center',
    marginTop: 19,
    marginLeft: 10,
    marginRight: 5,
  },
  title: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  close: {},
  avatar: {
    width: 53,
    height: 53,
  },
  name: {
    marginTop: 5,
    color: '#333333',
    fontSize: 13,
  },
  colleague: {
    alignItems: 'center',
    marginRight: 22,
  },
  colleagues: {
    marginTop: 14,
    marginHorizontal: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
