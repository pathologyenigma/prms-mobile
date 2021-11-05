import { get, getWithToken, post, postWithToken } from '../utils/http'
import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'
import RootLoading from '../utils/rootLoading'
import {
  Query
} from "@apollo/client/react/components"
import {
  gql
} from "@apollo/client"
import { apolloClientShare, GET_LOGIN, loginGql } from '../utils/postQuery'

const reset_reducer = () => {
  return {
    type: 'loginInfo/reset_reducer',
  }
}

const update_user_info = (key: string, value: string) => {
  return {
    type: 'userInfo/update_kv',
    payload: {
      key,
      value,
    },
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

const loginMobile = (account: string, password: string, callback: (error: any, result?: any) => void) => {
  console.log('2222222222@@@: ', GET_LOGIN(account, password))
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: GET_LOGIN(account, password),
    })
      .then((res) => {
        console.log('res: ', res)
        if (res && res.data) {
          dispatch(update_user_info('UserLogIn', res.data.UserLogIn))
          if (callback) {
            callback(undefined, res.data)
          }
        }
      })
      .catch((error) => {
        console.log('error: ', error)
        if (callback) {
          callback(error)
        }
      })
  }
}

// 发送重置密码的验证码
const sendResetCode = (mobileNumber?: string, email?: string, callback?: (error: any, result?: any) => void) => {

}

const chooseRole = (role: string, callback?: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    postWithToken('https://www.baidu.com')
      .then((result) => {
        console.log('1111111: ', result)
        const res = {
          id: '1',
          avatar: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
          username: '王经理',
          mobileNumber: '13951840000',
          dateOfBirth: '1994-01',
          gender: '1',
          city: '1',
          lastOnlineAt: '1',
          lastLoginAt: '1',
          updatedAt: '1',
          createdAt: '1',
          currentRole: '人力总监'
        }
        dispatch(update_user_info('userInfo', res))
        if (callback) {
          callback(undefined, res)
        }
      })
      .catch((error) => {
        const res = {
          id: '1',
          avatar: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
          username: '王经理',
          mobileNumber: '13951840000',
          dateOfBirth: '1994-01',
          gender: '1',
          city: '1',
          lastOnlineAt: '1',
          lastLoginAt: '1',
          updatedAt: '1',
          createdAt: '1',
          token: '1',
          currentRole: '1'
        }
        dispatch(update_user_info('userInfo', res))
        if (callback) {
          callback(undefined, res)
        }
        // console.log('22222222: ', error)
        // if (callback) {
        //   callback(error)
        // }
      })
  }
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
  chooseRole,
}