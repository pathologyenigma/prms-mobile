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
import CollaboratorModal from '../CollaboratorModal'

interface CollaboratorProps {
  coAvatars?: ImageSourcePropType[]
}

// require('../../../assets/avatar_default.png')

export default function Collaborator({ coAvatars = [] }: CollaboratorProps) {
  const [modalVisible, setModalVisible] = useState(false)

  if (coAvatars.length > 0) {
    return (
      <TouchableWithoutFeedback onPress={() => console.log('邀请同事')}>
        <View style={styles.container}>
          {coAvatars.map((avatar, index) => (
            <Image key={index} source={avatar} style={styles.avatar} />
          ))}
          <Text style={styles.title}>已协作给{coAvatars.length}人</Text>
          <Text style={styles.detail}>去查看</Text>
          <Image source={require('./indicator.png')} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          <Text style={styles.title}>邀请同事一起招聘效果更好</Text>
          <Text style={styles.detail}>去邀请</Text>
          <Image source={require('./indicator.png')} />
        </View>
      </TouchableWithoutFeedback>
      <CollaboratorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#F6FFFB',
    borderRadius: 8,
    marginHorizontal: 11,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    color: '#57DE9E',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  detail: {
    color: '#57DE9E',
    fontSize: 12,
    marginRight: 9,
  },
  avatar: {
    width: 35,
    height: 35,
    marginRight: 12,
  },
})
