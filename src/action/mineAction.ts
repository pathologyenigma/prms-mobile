import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import { ApolloError, gql } from '@apollo/client'
import {
  apolloClientShare,
  candidateEditWorkExprienceGql,
  candidateGetWorkExpsGql,
  userGetRecruitmentListGql,
} from '../utils/postQuery'
import errorHandler from '../utils/errorhandler'

// 预留方法,暂未使用
const reset_reducer = () => {
  return {
    type: 'loginInfo/reset_reducer',
  }
}

// 预留方法,暂未使用
const update_kv = (key: string, value: string) => {
  return {
    type: 'loginInfo/update_kv',
    payload: {
      key,
      value,
    },
  }
}

// 获取用户在线简历信息
const getOnlineResumeInfo = (callback?: (error: any, result?: any) => void) => {
  const getWorkExps = new Promise((resolve, regect) => {
    apolloClientShare
      .query({ query: candidateGetWorkExpsGql })
      .then(res => {
        console.log('res: ', res)
        if (res && res.data && res.data.CandidateGetWorkExps && res.data.CandidateGetWorkExps.data) {
          resolve(res.data.CandidateGetWorkExps.data)
        } else {
          regect(res || Error)
        }
      })
      .catch(error => {
        console.log('error: ', error)
        regect(error)
      })
  })
  Promise.all([getWorkExps])
    .then((workExps) => {
      console.log('workExps: ', workExps)
      if (callback) {
        if (workExps) {
          callback(undefined, { workExps })
        }
      }
    })
    .catch((error) => {
      if (callback) {
        callback(error)
      }
    })
}

// 编辑用户在线简历
const editOnlineResumeInfo = (info: any, callback?: (error: any, result?: any) => void) => {
  apolloClientShare
    .mutate({
      mutation: candidateEditWorkExprienceGql,
      variables: { info },
    })
    .then(res => {
      console.log('res: ', res)
      if (res && res.data && res.data.CandidateEditWorkExprience === null) {
        if (callback) {
          callback(undefined)
        }
      } else {
        if (callback) {
          callback(res)
        }
      }
    })
    .catch(error => {
      console.log('error: ', error)
      if (callback) {
        callback(error)
      }
    })
}

export {
  reset_reducer,
  update_kv,
  getOnlineResumeInfo,
  editOnlineResumeInfo,
}
