import { get, getWithToken, post, postWithToken } from '../utils/http'
import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'
import { apolloClientShare, candidateGetEnterpriseDetail_EntInfoGql, candidateGetEnterpriseDetail_HRListGql, candidateGetEnterpriseDetail_InterviewRecommentGql, candidateGetEnterpriseDetail_QAGql, getAllRegionGql, getCandidateGetAllJobExpectationsGql, getCandidateGetJobListGql, getHrBasicInfoGql, getHrMatchJobListGql, getHrMoreJobListGql, getJobDetailGql, loginGql } from '../utils/postQuery'
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
    // 临时使用json形式获取数据后进行逻辑展示


    get('https://be.chenzaozhao.com/preludeDatas/regions.json')
      .then((res) => {
        console.log('res: ', res)
        if (res) {
          if (callback) {
            callback(undefined, res)
          }
        }
      })
      .catch((error) => {
        // TODO:此处由于登录接口错误,会返回错误的结果,实际参数是正确的.注意后续流程复测
        console.log('error: ', error)
        errorHandler(error)
      })

    // apolloClientShare.query({
    //   query: getAllRegionGql,
    // })
    //   .then((res) => {
    //     console.log('res: ', res)
    //     if (res && res.data) {
    //       if (callback) {
    //         callback(undefined, res.data)
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     // TODO:此处由于登录接口错误,会返回错误的结果,实际参数是正确的.注意后续流程复测
    //     console.log('error: ', error)
    //     errorHandler(error)
    //   })
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
const getCandidateGetJobList = (filter: any, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: getCandidateGetJobListGql,
      variables: {
        filter,
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

const getJobDetail = (jobid: number, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: getJobDetailGql,
      variables: {
        jobid,
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
        errorHandler(error)
      })
  }
}

const getHrBasicInfo = (hrId: number, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: getHrBasicInfoGql,
      variables: {
        hrId,
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
        errorHandler(error)
      })
  }
}

const getHrMatchJobList = (hrId: number, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: getHrMatchJobListGql,
      variables: {
        hrId,
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
        errorHandler(error)
      })
  }
}

const getHrMoreJobList = (hrId: number, page: number, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: getHrMoreJobListGql,
      variables: {
        hrId,
        pageSize: 10,
        page,
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
        errorHandler(error)
      })
  }
}

// 获取公司信息
const getCandidateGetEnterpriseDetail_EntInfo = (entId: number, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: candidateGetEnterpriseDetail_EntInfoGql,
      variables: {
        entId,
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
        errorHandler(error)
      })
  }
}

// 获取公司详情界面hr list
const getCandidateGetEnterpriseDetail_HRList = (entId: number, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: candidateGetEnterpriseDetail_HRListGql,
      variables: {
        entId,
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
        errorHandler(error)
      })
  }
}

// 获取公司详情面试评价(注意:和面试评价详情页数据不同)
const getCandidateGetEnterpriseDetail_InterviewRecomment = (entId: number, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: candidateGetEnterpriseDetail_InterviewRecommentGql,
      variables: {
        entId,
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
        errorHandler(error)
      })
  }
}

// 获取公司详情问答数据
const getCandidateGetEnterpriseDetail_QA = (entId: number, callback: (error: any, result?: any) => void) => {
  return (dispatch: Dispatch<AnyAction>) => {
    apolloClientShare.query({
      query: candidateGetEnterpriseDetail_QAGql,
      variables: {
        entId,
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
  getCandidateGetJobList,
  getJobDetail,
  getHrBasicInfo,
  getHrMatchJobList,
  getHrMoreJobList,
  getCandidateGetEnterpriseDetail_EntInfo,
  getCandidateGetEnterpriseDetail_HRList,
  getCandidateGetEnterpriseDetail_InterviewRecomment,
  getCandidateGetEnterpriseDetail_QA,
}