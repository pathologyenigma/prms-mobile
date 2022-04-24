import React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import SecondaryButton from '../../components/SecondaryButton'
import { isIphoneX } from 'react-native-iphone-x-helper'
import AvatarPickerModal from './AvatarPickerMomal'
import { useState } from 'react'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import { statusBarHeight } from '../../theme'
import { HrParamList } from '../typings'
import {
  alertMsgFromErrorMessage,
  alertTitleFromErrorMessage,
  PermissionError,
  pickImage,
  takePhoto,
} from '../../utils/ImageHelper'
import AlertModal from '../../components/AlertModal'
import { openSettings } from 'react-native-permissions'

export default function AvatarViewer({
  navigation,
  route,
}: StackScreenProps<HrParamList, 'AvatarViewer'>) {
  const [modalVisible, setModalVisible] = useState(false)
  const { avatar, targetRouteName } = route.params || {}

  const [error, setError] = useState<Error | null>(null)

  const hanleResult = (uri: string | null) => {
    if (uri !== null) {
      navigation.navigate('AvatarCropper', { uri, targetRouteName })
    }
  }

  const hanldeError = (e: Error) => {
    setError(e)
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <CacheImage
        style={styles.viewer}
        source={{
          uri: avatar,
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
            onPress: async () => {
              try {
                const uri = await takePhoto()
                hanleResult(uri)
              } catch (e) {
                hanldeError(e)
              }
            },
          },
          {
            title: '从相册上传',
            onPress: async () => {
              try {
                const uri = await pickImage()
                hanleResult(uri)
              } catch (e) {
                hanldeError(e)
              }
            },
          },
        ]}
        onDismiss={() => setModalVisible(false)}
      />
      <AlertModal
        visible={!!error}
        title={alertTitleFromErrorMessage(error)}
        msg={alertMsgFromErrorMessage(error)}
        onNegativePress={() => setError(null)}
        onPositivePress={() => {
          setError(null)
          if (error instanceof PermissionError) {
            openSettings()
          }
        }}
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
  close: {
    position: 'absolute',
    left: 0,
    top: statusBarHeight(),
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
