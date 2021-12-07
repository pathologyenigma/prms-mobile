import { get, getWithToken, post, postWithToken } from '../utils/http'
import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'
import RootLoading from '../utils/rootLoading'
import {
  Query
} from "@apollo/client/react/components"
import {
  ApolloError,
  gql
} from "@apollo/client"
import { apolloClientShare, checkUserVerifyCodeConsumeGql, chooseOrSwitchIdentityGql, getENTEditEnterpriseBasicInfoGql, getUserEditPersonalDataGql, initApolloClient, loginGql, numberCheckGql, registerGql, resetPasswordGql, sendMessageGql, sendSMSGql, subscriptionGqlServerGql, testGql, userGetMessagesGql } from '../utils/postQuery'
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

// 获取消息列表
const userGetMessages = (
  targetId: number,
  page: number,
  pageSize: number,
  callback?: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: userGetMessagesGql,
      variables: {
        targetId, page, pageSize
      }
    })
      .then((res) => {
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
  callback?: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.subscribe({
      query: sendMessageGql,
      variables: {
        info,
      }
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
}

export {
  reset_reducer,
  update_kv,
  subscriptionMessage,
  userSendMessage,
  userGetMessages
}