import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import { ApolloError, gql } from '@apollo/client'
import {
  apolloClientShare,
  userGetRecruitmentListGql,
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

// 获取招聘会列表
const getUserGetRecruitmentList = (
  keyword: string,
  appointment: boolean,
  page: number,
  pageSize: number,
  callback?: (error: any, result?: any) => void,
) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare
      .query({
        query: userGetRecruitmentListGql,
        fetchPolicy: 'no-cache', // 设置缓存策略
        variables: {
          keyword,
          appointment,
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
        if (callback) {
          callback(error)
        }
        errorHandler(error)
      })
  }
}

export {
  reset_reducer,
  update_kv,
  getUserGetRecruitmentList,
}
