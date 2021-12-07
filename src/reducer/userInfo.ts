type IuserInfoState = 'userInfo/reset_reducer' | 'userInfo/update_kv'

export interface IUserInfoState {
  userInfo: {
    UserLogIn: {
      username: string,
      token: string,
      createdAt: string,
    },
    id: string,
    avatar: string,
    username: string,
    mobileNumber: string,
    dateOfBirth: string,
    gender: string,
    city: string,
    lastOnlineAt: string,
    lastLoginAt: string,
    updatedAt: string,
    createdAt: string,
    currentRole: string
  },
  token: string,
}

const initState: IUserInfoState = {
  userInfo: {
    UserLogIn: {
      username: '',
      token: '',
      createdAt: ''
    },
    // TODO: 临时代码
    id: '48',
    avatar: '',
    username: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: '',
    city: '',
    lastOnlineAt: '',
    lastLoginAt: '',
    updatedAt: '',
    createdAt: '',
    currentRole: ''
  },
  token: '',
}

export interface IUserInfoAction {
  type: IuserInfoState
  payload: { [key: string]: any }
}

// const saveUserinfo = (userInfo: IUserInfoState) = > {

// }

const userInfo = (state = initState, action: IUserInfoAction) => {
  console.log('userInfo_reducer111: ', action)
  let nextState
  const { type, payload } = action
  switch (type) {
    case 'userInfo/reset_reducer':
      nextState = {
        ...initState,
      }
      break
    case 'userInfo/update_kv':
      // saveUserinfo(payload.userInfo)
      if (payload.key === 'token') { global.token = payload.value }
      nextState = {
        ...state,
        [payload.key]: payload.value,
      }
      break
    default:
      nextState = state
      break
  }
  return nextState
}

export default userInfo