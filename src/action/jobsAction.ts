import { get, getWithToken, post, postWithToken } from '../utils/http'
import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'
import { apolloClientShare, getAllRegionGql, getCandidateGetAllJobExpectationsGql, getCandidateGetJobListByExpectationGql, loginGql } from '../utils/postQuery'
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
        console.log('error: ', error)
        errorHandler(error)
      })
  }
}

const getAllRegion = (callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: getAllRegionGql,
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
        // TODO:此处由于登录接口错误,会返回错误的结果,实际参数是正确的.注意后续流程复测
        console.log('error: ', error)
        errorHandler(error)
      })
  }
}

/**
 * 获取预测职位标签
 * @param callback 
 * @returns 
 */
const getCandidateGetAllJobExpectations = (callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: getCandidateGetAllJobExpectationsGql,
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
        // TODO:此处由于登录接口错误,会返回错误的结果,实际参数是正确的.注意后续流程复测
        console.log('error: ', error)
        errorHandler(error)
      })
  }
}

/**
 * 获取预测职位
 * @param callback 
 * @returns 
 */
const getCandidateGetJobListByExpectation = (jobCategory: any, page: number, pagesize: number, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: getCandidateGetJobListByExpectationGql,
      variables: {
        jobCategory,
        page,
        pagesize
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
        // TODO:此处由于登录接口错误,会返回错误的结果,实际参数是正确的.注意后续流程复测
        console.log('error: ', error)
        errorHandler(error)
      })
  }
}

export {
  reset_reducer,
  update_kv,
  loginMobile,
  getAllRegion,
  getCandidateGetAllJobExpectations,
  getCandidateGetJobListByExpectation,
}