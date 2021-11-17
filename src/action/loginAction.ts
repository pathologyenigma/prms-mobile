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
import { apolloClientShare, checkUserVerifyCodeConsumeGql, chooseOrSwitchIdentityGql, getENTEditEnterpriseBasicInfoGql, getUserEditPersonalDataGql, initApolloClient, loginGql, numberCheckGql, registerGql, resetPasswordGql, sendSMSGql, subscriptionGqlServerGql, testGql } from '../utils/postQuery'
import errorHandler from '../utils/errorhandler'

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

const loginMobile1 = (account: string, password: string, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: testGql,
      variables: {
        currency: 'CNY'
      }
    })
      .then((res) => {
        console.log('res: ', res)
        // if (res && res.data) {
        //   // dispatch(update_user_info('UserLogIn', res.data.UserLogIn))
        //   if (callback) {
        //     callback(undefined, res.data)
        //   }
        // }
      })
      .catch((error) => {
        // TODO:此处由于登录接口错误,会返回错误的结果,实际参数是正确的.注意后续流程复测
        console.log('error: ', error)
        // if (callback) {
        //   callback(error)
        // }
      })
  }
}

const loginMobile = (account: string, password: string, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: loginGql,
      variables: {
        info: {
          account,
          password,
          deviceId: 'deviceId',
        }
      }
    })
      .then((res) => {
        console.log('res: ', res)
        if (res && res.data) {
          dispatch(update_kv('UserLogIn', res.data.UserLogIn))
          if (callback) {
            callback(undefined, res.data)
          }
        }
      })
      .catch((error) => {
        // TODO:此处由于登录接口错误,会返回错误的结果,实际参数是正确的.注意后续流程复测
        console.log('error: ', error)
        errorHandler(error)
      })
  }
}

const userNumberCheck = (num: string, callback: (error: any, result?: any) => void) => {
  console.log('num: ', num)
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: numberCheckGql,
      variables: {
        num,
      }
    })
      .then((res) => {
        console.log('res: ', res)
        if (res && res.data) {
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

// 发送验证码
const sendSMS = (phoneNumber: string, callback: (error: any, result?: any) => void) => {
  console.log('phoneNumber: ', phoneNumber)
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: sendSMSGql,
      variables: {
        phoneNumber: phoneNumber,
      }
    })
      .then((res) => {
        console.log('res: ', res)
        if (res && res.data) {
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

const registerAccount = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  phoneNumber: string,
  verifyCode: string, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: registerGql,
      variables: {
        username,
        email,
        password,
        confirmPassword,
        phoneNumber,
        verifyCode,
      }
    })
      .then((res) => {
        console.log('res: ', res)
        if (res && res.data) {
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

// 编辑企业信息
const getENTEditEnterpriseBasicInfo = (info: any, callback: (error: any, result?: any) => void) => {
  const { enterpriseName, abbreviation, enterpriseLocation, enterprisecCoordinate,
    enterpriseNature, enterpriseIndustry, enterpriseFinancing, enterpriseSize, enterpriseProfile,
    logo, establishedDate, homepage, tel
  } = info
  apolloClientShare.mutate({
    mutation: getENTEditEnterpriseBasicInfoGql,
    variables: {
      info: {
        enterpriseName,
        abbreviation,
        enterpriseLocation,
        enterprisecCoordinate: [1],
        enterpriseNature,
        enterpriseIndustry,
        enterpriseFinancing,
        enterpriseSize,
        enterpriseProfile,
        logo,
        establishedDate,
        homepage,
        tel,
      }
    }
  })
    .then((res) => {
      console.log('res: ', res)
      if (res && res.data) {
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

// 发送验证码
const sendResetCode = (mobileNumber?: string, email?: string, callback?: (error: any, result?: any) => void) => {

}

// 检查验证码(operation 中不同参数对应不同接口功能)
const checkUserVerifyCodeConsume = (
  phoneNumber: string,
  verifyCode: string,
  operation: string,
  callback: (error: any, result?: any) => void) => {
  console.log('checkUserVerifyCodeConsume: ', phoneNumber, verifyCode, operation)
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: checkUserVerifyCodeConsumeGql,
      variables: {
        info: {
          phoneNumber: "13951848647",
          verifyCode: "tested",
          operation: "UserResetPassword"
        }
      }
    })
      .then((res) => {
        console.log('res1: ', res)
        if (res && res.data) {
          if (callback) {
            callback(undefined, res.data)
          }
        }
      })
      .catch((error) => {
        console.log('error1: ', error)
        if (callback) {
          callback(error)
        }
      })
  }
}

// 切换角色
const chooseRole = (
  targetIdentity: string,
  role: string,
  callback: (error: any, result?: any) => void) => {
  console.log('chooseRole: ', targetIdentity, role)
  console.log('apolloClientShare: ', apolloClientShare)
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.mutate({
      mutation: chooseOrSwitchIdentityGql,
      variables: {
        targetIdentity: "EnterpriseUser",
        role: "HR"
      }
    })
      .then((res) => {
        console.log('res: ', res)
        if (res && res.data) {
          if (callback) {
            callback(undefined, res.data)
          }
        }
      })
      .catch((error) => {
        errorHandler(error)
      })
  }
}

// 重置密码
const resetPassword = (
  phone: string,
  password: string,
  confirmPassword: string,
  callback: (error: any, result?: any) => void) => {
  console.log('resetPassword: ', password, confirmPassword)
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.mutate({
      mutation: resetPasswordGql,
      variables: {
        info: {
          phoneNumber: phone,
          password,
          confirmPassword,
        }
      }
    })
      .then((res) => {
        console.log('res: ', res)
        if (res && res.data) {
          if (callback) {
            callback(undefined, res.data)
          }
        }
      })
      .catch((error) => {
        errorHandler(error)
      })
  }
}

// 订阅消息
const subscriptionMessage = ((callback?: (error: any, result?: any) => void) => {
  console.log('111111111: 22loadData ')
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.subscribe({
      query: subscriptionGqlServerGql,
    })
      .subscribe((res) => {
        // 注意:在浏览器中 debug 的模式中未打印出值.待排查原因
        console.log('subscriptionMessage-res: ', res)
        if (res && callback) {
          callback(undefined, res)
        }
      }, (error) => {
        errorHandler(error)
        console.log('error: ', error)
      }, () => {
        console.log('complete: ')
      })
  }
})

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
  userNumberCheck,
  sendSMS,
  registerAccount,
  getENTEditEnterpriseBasicInfo,
  checkUserVerifyCodeConsume,
  resetPassword,
  subscriptionMessage,
  chooseRole
}