import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import { ApolloError, gql } from '@apollo/client'
import {
  apolloClientShare,
  checkUserVerifyCodeConsumeGql,
  chooseOrSwitchIdentityGql,
  getENTEditEnterpriseBasicInfoGql,
  getUserEditPersonalDataGql,
  loginGql,
  numberCheckGql,
  registerGql,
  resetPasswordGql,
  sendMessageGql,
  sendSMSGql,
  subscriptionGqlServerGql,
  testGql,
  userGetContractListGql,
  userGetMessagesGql,
} from '../utils/postQuery'
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

// 订阅消息
const subscriptionMessage = (callback?: (error: any, result?: any) => void) => {
  console.log('111111111: 22loadData ')
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare
      .subscribe({
        query: subscriptionGqlServerGql,
        fetchPolicy: 'no-cache', // 设置缓存策略
      })
      .subscribe(
        res => {
          // 注意:在浏览器中 debug 的模式中未打印出值.待排查原因
          console.log('subscriptionMessage-res: ', res)
          if (res && callback) {
            callback(undefined, res)
          }
        },
        error => {
          errorHandler(error)
          console.log('error: ', error)
        },
        () => {
          console.log('complete: ')
        },
      )
  }
}

// 获取消息列表
const userGetMessages = (
  targetId: number,
  page: number,
  pageSize: number,
  callback?: (error: any, result?: any) => void,
) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare
      .query({
        query: userGetMessagesGql,
        fetchPolicy: 'no-cache', // 设置缓存策略
        variables: {
          targetId,
          page,
          pageSize,
        },
      })
      .then(res => {
        if (res && res.data) {
          if (callback) {
            callback(undefined, res.data)
          }
        }
      })
      .catch((error: ApolloError) => {
        errorHandler(error)
      })
  }
}

// 发送消息
const userSendMessage = (
  info: any,
  callback?: (error: any, result?: any) => void,
) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare
      .mutate({
        mutation: sendMessageGql,
        fetchPolicy: 'no-cache', // 设置缓存策略
        variables: {
          info,
        },
      })
      .then(res => {
        console.log('subscriptionMessage-res: ', res)
        if (callback) {
          if (res) {
            callback(undefined, res)
          } else {
            callback(res)
          }
        }
      })
      .catch(error => {
        errorHandler(error)
        if (callback) {
          callback(error)
        }
      })
  }
}

const getUserGetContractList = (
  callback?: (error: any, result?: any) => void,
) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare
      .query({
        query: userGetContractListGql,
        fetchPolicy: 'no-cache', // 设置缓存策略
      })
      .then(res => {
        if (res && res.data) {
          if (callback) {
            callback(undefined, res.data)
          }
        }
      })
      .catch((error: ApolloError) => {
        errorHandler(error)
      })
  }
}

export {
  reset_reducer,
  update_kv,
  subscriptionMessage,
  getUserGetContractList,
  userSendMessage,
  userGetMessages,
}