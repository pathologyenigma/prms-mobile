import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import { ApolloError, gql } from '@apollo/client'
import {
  apolloClientShare,
  candidateEditEduExpGql,
  candidateEditOnlineResumeGradeGql,
  candidateEditProExpGql,
  candidateEditWorkExprienceGql,
  candidateGetEduExpsGql,
  candidateGetOnlineResumeBasicInfoGql,
  candidateGetOnlineResumeGradeGql,
  candidateGetProjectExpsGql,
  candidateGetWorkExpsGql,
  candidateRemoveEduExpGql,
  candidateRemoveProExpGql,
  candidateRemoveWorkExpGql,
  getSkillsGql,
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

const removeWorkExperience = (id: any, callback: (error: any, result?: any) => void) => {
  apolloClientShare
    .query({
      query: candidateRemoveWorkExpGql,
      variables: { id },
      fetchPolicy: 'no-cache', // 设置缓存策略
    })
    .then(res => {
      console.log('res: ', res)
      if (res && res.data && res.data.CandidateRemoveWorkExp === null) {
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
      errorHandler(error)
    })
}

const getProjectExperience = (callback: (error: any, result?: any) => void) => {
  apolloClientShare
    .query({
      query: candidateGetProjectExpsGql,
      fetchPolicy: 'no-cache', // 设置缓存策略
    })
    .then(res => {
      console.log('res: ', res)
      if (res && res.data && res.data.CandidateGetProjectExps && res.data.CandidateGetProjectExps.data) {
        if (callback) {
          callback(undefined, res.data.CandidateGetProjectExps.data)
        }
      } else {
        if (callback) {
          callback(res.data.CandidateGetProjectExps.data)
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

// 编辑简历-编辑/新增 教育经历
const editEduExperience = (info: any, callback?: (error: any, result?: any) => void) => {
  apolloClientShare
    .mutate({
      mutation: candidateEditEduExpGql,
      variables: { info },
    })
    .then(res => {
      console.log('res: ', res)
      if (res && res.data && res.data.CandidateEditEduExp === null) {
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

// 编辑简历-编辑/新增 项目经历
const editCandidateEditProExp = (info: any, callback?: (error: any, result?: any) => void) => {
  apolloClientShare
    .mutate({
      mutation: candidateEditProExpGql,
      variables: { info },
    })
    .then(res => {
      console.log('res: ', res)
      if (res && res.data && res.data.CandidateEditProExp === null) {
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

// 编辑简历-删除项目经历
const removeCandidateEditProExp = (id: any, callback?: (error: any, result?: any) => void) => {
  apolloClientShare
    .mutate({
      mutation: candidateRemoveProExpGql,
      variables: { id },
    })
    .then(res => {
      console.log('res: ', res)
      if (res && res.data && res.data.CandidateRemoveProExp === null) {
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

// 编辑简历-获取教育经历
const getEduExperience = (callback?: (error: any, result?: any) => void) => {
  apolloClientShare
    .query({
      query: candidateGetEduExpsGql,
    })
    .then(res => {
      console.log('res123: ', res)
      if (res && res.data && res.data.CandidateGetEduExps) {
        if (callback) {
          callback(undefined, res.data.CandidateGetEduExps.data)
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

// 编辑简历-删除教育经历
const removeCandidateEditEduExp = (id: any, callback?: (error: any, result?: any) => void) => {
  apolloClientShare
    .mutate({
      mutation: candidateRemoveEduExpGql,
      variables: { id },
    })
    .then(res => {
      console.log('res: ', res)
      if (res && res.data && res.data.CandidateRemoveEduExp === null) {
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

// 编辑简历-编辑技能
const editSkills = (skills: any, callback?: (error: any, result?: any) => void) => {
  apolloClientShare
    .mutate({
      mutation: getSkillsGql,
      variables: {
        skills
      }
    })
    .then(res => {
      console.log('res123: ', res)
      if (res && res.data && res.data.CandidateEditSkills === null) {
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

// 编辑简历-获取经历进度
const getCandidateGetOnlineResumeGrade = (callback?: (error: any, result?: any) => void) => {
  apolloClientShare
    .query({
      query: candidateGetOnlineResumeGradeGql,
    })
    .then(res => {
      console.log('CandidateGetOnlineResumeGrade-result: ', res)
      if (res && res.data && res.data.CandidateGetOnlineResumeGrade) {
        if (callback) {
          callback(undefined, res.data.CandidateGetOnlineResumeGrade)
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

// 编辑简历-编辑经历进度
const editCandidateGetOnlineResumeGrade = (grade: any, callback?: (error: any, result?: any) => void) => {
  apolloClientShare
    .mutate({
      mutation: candidateEditOnlineResumeGradeGql,
      variables: {
        grade
      }
    })
    .then(res => {
      console.log('CandidateGetOnlineResumeGrade-result: ', res)
      if (res && res.data && res.data.CandidateEditOnlineResumeGrade) {
        if (callback) {
          callback(undefined, res.data.CandidateEditOnlineResumeGrade.data)
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
  editSkills,                           //  编辑技能标签
  getWorkExperience,                    //  获取工作经历
  removeWorkExperience,                 //  删除工作经历
  getCandidateGetOnlineResumeBasicInfoExperience,
  getProjectExperience,                 //  项目经历-获取
  editCandidateEditProExp,              //  项目经历-编辑/新增
  removeCandidateEditProExp,            //  项目经历-删除
  editEduExperience,                //  编辑/新增教育经历
  getEduExperience,                      //  获取教育经历
  removeCandidateEditEduExp,              // 删除教育经历
  getCandidateGetOnlineResumeGrade,
  editCandidateGetOnlineResumeGrade,
}
