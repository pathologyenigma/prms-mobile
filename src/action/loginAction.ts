import { get, getWithToken, post, postWithToken } from '../utils/http'
import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'
import RootLoading from '../utils/rootLoading'

const reset_reducer = () => {
  return {
    type: 'loginInfo/reset_reducer',
  }
}

const update_kv = (key: string, value: string) => {
  return {
    type: 'loginInfo/update_kv',
    payload: {
      key,
      value,
    },
  }
}

const loginMobile = (mobileNumber: string, email: string, password: string, callback: (error: any, result?: any) => void) => {

}

// 发送重置密码的验证码
const sendResetCode = (mobileNumber?: string, email?: string, callback?: (error: any, result?: any) => void) => {

}

/**
 * 校验验证码模式
 * @param resetType 
 * @param verificationCode 
 * @param mobileNumber 
 * @param password 
 * @param email 
 * @param callback 
 * @returns 
 */
const verificationResetCode = (
  resetType: number,
  verificationCode: string,
  mobileNumber?: string,
  password?: string,
  email?: string,
  callback?: (error: any, result?: any) => void
) => {

}

export {
  reset_reducer,
  update_kv,
  loginMobile,
  sendResetCode,
  verificationResetCode,
}