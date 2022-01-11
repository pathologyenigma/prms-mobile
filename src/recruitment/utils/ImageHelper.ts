import { Platform } from 'react-native'
import {
  ErrorCode,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'

export class PermissionError extends Error {
  constructor(message: string) {
    super(message)
  }
}

type Callback<T> = (() => Promise<T>) | (() => T)

export function withImageLibraryPermission<T>(fn: Callback<T>) {
  if (Platform.OS === 'ios') {
    return withImageLibraryPermissionIOS(fn)
  } else {
    return withImageLibraryPermissionAndroid(fn)
  }
}

function withImageLibraryPermissionAndroid<T>(fn: Callback<T>) {
  return async function () {
    const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      return fn()
    } else if (result === RESULTS.BLOCKED) {
      throw new PermissionError('没有访问手机存储的权限')
    } else if (result === RESULTS.DENIED) {
      const response = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      if (response === RESULTS.GRANTED || response === RESULTS.LIMITED) {
        return fn()
      } else {
        throw new PermissionError('没有访问手机存储的权限')
      }
    } else {
      throw new Error('设备不可用')
    }
  }
}

function withImageLibraryPermissionIOS<T>(fn: Callback<T>) {
  return async function () {
    const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      return fn()
    } else if (result === RESULTS.BLOCKED) {
      throw new PermissionError('没有访问相册的权限')
    } else if (result === RESULTS.DENIED) {
      const response = await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
      if (response === RESULTS.GRANTED || response === RESULTS.LIMITED) {
        return fn()
      } else {
        throw new PermissionError('没有访问相册的权限')
      }
    } else {
      throw new Error('设备不可用')
    }
  }
}

export function withCameraPermission<T>(fn: Callback<T>) {
  if (Platform.OS === 'ios') {
    return withCameraPermissionIOS(fn)
  } else {
    return withCameraPermissionAndroid(fn)
  }
}

function withCameraPermissionAndroid<T>(fn: Callback<T>) {
  return async function () {
    const result = await check(PERMISSIONS.ANDROID.CAMERA)
    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      return fn()
    } else if (result === RESULTS.BLOCKED) {
      throw new PermissionError('没有访问相机的权限')
    } else if (result === RESULTS.DENIED) {
      const response = await request(PERMISSIONS.ANDROID.CAMERA)
      if (response === RESULTS.GRANTED || response === RESULTS.LIMITED) {
        return fn()
      } else {
        throw new PermissionError('没有访问相机的权限')
      }
    } else {
      throw new Error('相机不可用')
    }
  }
}

function withCameraPermissionIOS<T>(fn: Callback<T>) {
  return async function () {
    const result = await check(PERMISSIONS.IOS.CAMERA)
    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      return fn()
    } else if (result === RESULTS.BLOCKED) {
      throw new PermissionError('没有访问相机的权限')
    } else if (result === RESULTS.DENIED) {
      const response = await request(PERMISSIONS.IOS.CAMERA)
      if (response === RESULTS.GRANTED || response === RESULTS.LIMITED) {
        return fn()
      } else {
        throw new PermissionError('没有访问相机的权限')
      }
    } else {
      throw new Error('相机不可用')
    }
  }
}

function pickImageFromImageLibrary(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      },
      response => hanldeResponse(response, resolve, reject, 'library'),
    )
  })
}

function takePhotoFromCamera(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      },
      response => hanldeResponse(response, resolve, reject, 'camera'),
    )
  })
}

function hanldeResponse(
  response: ImagePickerResponse,
  resolve: (uri: string | null) => void,
  reject: (e: any) => void,
  sourceType: 'camera' | 'library',
) {
  const { assets, errorCode, didCancel } = response

  if (errorCode) {
    reject(errorForErrorCode(errorCode, sourceType))
    return
  }

  if (didCancel || !assets || assets.length === 0) {
    resolve(null)
    return
  }

  resolve(assets[0].uri!)
}

function errorForErrorCode(
  errorCode: ErrorCode,
  sourceType: 'camera' | 'library',
) {
  switch (errorCode) {
    case 'camera_unavailable':
      return new Error('相机不可用')
    case 'permission':
      if (sourceType === 'camera') {
        return new PermissionError('没有访问相机的权限')
      }
      return new PermissionError('没有访问相册的权限')
    case 'others':
      return new Error('未知错误')
  }
}

export function alertTitleFromErrorMessage(error: Error | null) {
  if (!error) {
    return ''
  }

  if (error instanceof PermissionError) {
    if (error.message.includes('相机')) {
      return '请打开相机权限'
    } else {
      if (Platform.OS === 'ios') {
        return '请打开相册权限'
      } else {
        return '请打开文件存储权限'
      }
    }
  }

  return error.message
}

export function alertMsgFromErrorMessage(error: Error | null) {
  if (!error) {
    return ''
  }

  if (error instanceof PermissionError) {
    return error.message
  }
  return ''
}

export const pickImage = withImageLibraryPermission(pickImageFromImageLibrary)

export const takePhoto = withCameraPermission(takePhotoFromCamera)
