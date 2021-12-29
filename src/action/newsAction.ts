import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import { ApolloError, gql } from '@apollo/client'
import {
  apolloClientShare,
  sendMessageGql,
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
        console.log('userSendMessage-res: ', res)
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
  getUserGetContractList,
  userSendMessage,
  userGetMessages,
}
