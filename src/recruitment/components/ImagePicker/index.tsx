import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ImageStyle,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native'
import {
  launchImageLibrary,
  launchCamera,
  ErrorCode,
  ImagePickerResponse,
} from 'react-native-image-picker'
import { withImageLibraryPermission } from './permission'
import AlertModal from '../AlertModal'
import { openSettings } from 'react-native-permissions'

function pickImageFromImageLibrary(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      },
      response => hanldeResponse(response, resolve, reject),
    )
  })
}

function hanldeResponse(
  response: ImagePickerResponse,
  resolve: (uri: string | null) => void,
  reject: (e: any) => void,
) {
  const { assets, errorCode, didCancel } = response

  if (errorCode) {
    reject(new Error(messageForErrorCode(errorCode)))
    return
  }

  if (didCancel || !assets || assets.length === 0) {
    resolve(null)
    return
  }

  resolve(assets[0].uri!)
}

function messageForErrorCode(errorCode: ErrorCode) {
  switch (errorCode) {
    case 'camera_unavailable':
      return '设备不可用'
    case 'permission':
      return '没有访问相册的权限'
    case 'others':
      return '选择图片失败'
  }
}

type ImagePickerSourceType = 'camera' | 'library' | 'both'

interface ImagePickerProps {
  style?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ImageStyle>
  sourceType?: ImagePickerSourceType
  placeholder?: ImageSourcePropType
  uri?: string
  onImageUriChange?: (uri: string) => void
}

const defaultImage = require('./add_pic.png')

export default function ImagePicker({
  style,
  imageStyle,
  sourceType = 'both',
  placeholder = defaultImage,
  uri,
  onImageUriChange,
}: ImagePickerProps) {
  const [error, setError] = useState('')

  const handlePress = async () => {
    try {
      const uri = await withImageLibraryPermission(pickImageFromImageLibrary)()
      if (uri !== null) {
        onImageUriChange && onImageUriChange(uri)
      }
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.75}
      style={[styles.container, style]}>
      <View style={styles.content}>
        <AlertModal
          visible={!!error}
          title="请打开相册权限"
          msg={error}
          onNegativePress={() => setError('')}
          onPositivePress={() => {
            setError('')
            openSettings()
          }}
        />
        <Image
          style={[styles.image, imageStyle]}
          source={uri ? { uri } : placeholder}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  image: { width: '100%', height: '100%' },
})
