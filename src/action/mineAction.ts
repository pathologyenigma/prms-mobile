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

const getWorkExperience = (callback: (error: any, result?: any) => void) => {
  apolloClientShare
    .query({
      query: candidateGetWorkExpsGql,
      fetchPolicy: 'no-cache', // 设置缓存策略
    })
    .then(res => {
      console.log('res: ', res)
      if (res && res.data && res.data.CandidateGetWorkExps && res.data.CandidateGetWorkExps.data) {
        if (callback) {
          callback(undefined, res.data.CandidateGetWorkExps.data)
        }
      } else {
        if (callback) {
          callback(res.data.CandidateGetWorkExps.data)
        }
      }
    })
    .catch(error => {
      console.log('error: ', error)
      if (callback) {
        callback(error)
      }
      errorHandler(error)
    })
}

// 编辑简历-获取技能标签和个人优势
const getCandidateGetOnlineResumeBasicInfoExperience = (
  callback: (error: any, result?: any) => void
) => {
  apolloClientShare
    .query({
      query: candidateGetOnlineResumeBasicInfoGql,
      fetchPolicy: 'no-cache', // 设置缓存策略
    })
    .then(res => {
      console.log('res: ', res)
      if (res && res.data && res.data.CandidateGetOnlineResumeBasicInfo && res.data.CandidateGetOnlineResumeBasicInfo) {
        if (callback) {
          callback(undefined, res.data.CandidateGetOnlineResumeBasicInfo)
        }
      } else {
        if (callback) {
          callback(res.data.CandidateGetOnlineResumeBasicInfo.data)
        }
      }
    })
    .catch(error => {
      if (callback) {
        callback(error)
      }
      errorHandler(error)
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
const editPersonalAdvantage = (detail: any, callback?: (error: any, result?: any) => void) => {
  apolloClientShare
    .mutate({
      mutation: personalAdvantageGql,
      variables: {
        advantage: detail
      },
    })
    .then(res => {
      console.log('editPersonalAdvantage-res: ', res)
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
      console.log('res123: ', res)
      if (res && res.data && res.data.CandidateGetOnlineResumeBasicInfo) {
        if (callback) {
          callback(undefined, res.data.CandidateGetOnlineResumeBasicInfo)
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
  // getOnlineResumeInfo,                  //  获取在线简历所有信息
  editOnlineResumeInfo,                 //  编辑/新增 工作经验
  editPersonalAdvantage,                //  编辑个人优势
  getCandidateGetOnlineResumeBasicInfo, //  获取技能标签、个人优势
  getWorkExperience,
  getCandidateGetOnlineResumeBasicInfoExperience,
}
