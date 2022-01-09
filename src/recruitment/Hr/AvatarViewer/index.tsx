import React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import SecondaryButton from '../../components/SecondaryButton'
import { isIphoneX } from 'react-native-iphone-x-helper'
import AvatarPickerModal from '../AvatarPickerMomal'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'

export const AvatarViewerOptions: StackNavigationOptions = {
  title: '页面模版',
  headerShown: false,
}

export default function AvatarViewer() {
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <Image
        style={styles.viewer}
        source={{
          uri: 'https://img95.699pic.com/photo/50034/7165.jpg_wh300.jpg',
        }}
      />
      <SecondaryButton
        style={styles.button}
        titleStyle={styles.buttonText}
        title="更换头像"
        onPress={() => {
          setModalVisible(true)
        }}
      />
      <AvatarPickerModal
        visible={modalVisible}
        actions={[
          {
            title: '拍照',
            onPress: () => navigation.navigate('AvatarCropper'),
          },
          {
            title: '从相册上传',
            onPress: () => navigation.navigate('AvatarCropper'),
          },
        ]}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#000000',
  },
  viewer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  button: {
    width: 130,
    height: 35,
    backgroundColor: '#202020',
    position: 'absolute',
    bottom: isIphoneX() ? 49 : 20,
  },
  buttonText: {
    color: '#FFFEFE',
    fontSize: 14,
    fontWeight: 'bold',
  },
})
