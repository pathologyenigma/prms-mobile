import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import { ApolloError, gql } from '@apollo/client'
import {
  apolloClientShare,
  candidateEditWorkExprienceGql,
  candidateGetOnlineResumeBasicInfoGql,
  candidateGetWorkExpsGql,
  personalAdvantageGql,
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

// 编辑简历-获取 工作经验 列表
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

// 编辑简历-编辑/新增 工作经验
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

// 编辑简历-编辑个人优势
const editPersonalAdvantage = (info: any, callback?: (error: any, result?: any) => void) => {
  apolloClientShare
    .mutate({
      mutation: personalAdvantageGql,
      variables: { advantage: info },
    })
    .then(res => {
      console.log('res: ', res)
      if (res && res.data && res.data.CandidateEditPersonalAdvantage === null) {
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

// 编辑简历-获取技能标签和个人优势
const getCandidateGetOnlineResumeBasicInfo = (callback?: (error: any, result?: any) => void) => {
  apolloClientShare
    .query({
      query: candidateGetOnlineResumeBasicInfoGql,
    })
    .then(res => {
      console.log('res: ', res)
      if (res && res.data && res.data.CandidateGetOnlineResumeBasicInfo === null) {
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
  editPersonalAdvantage,
  getCandidateGetOnlineResumeBasicInfo,
}
