type IuserInfoState = 'userInfo/reset_reducer' | 'userInfo/update_kv'

export interface IUserInfoState {
  userInfo: {
    UserLogIn: {
      username: string,
      token: string,
      createdAt: string,
    },
    birth_date: string,
    current_city: string,
    education: string | null
    email: string | null,
    first_time_working: string
    gender: boolean | null,
    phone_number: string
    username: string,

    id: string,
    avatar: string,
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
    // TODO: 临时代码 , 对应账号 18800001012 /  word_12
    birth_date: '',
    current_city: '',
    education: null,
    email: null,
    first_time_working: '',
    gender: null,
    phone_number: '',
    username: '',

    id: '49',
    avatar: '',
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