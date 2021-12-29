import * as Auth from '../utils/auth'

const initState = {
  email: '',
  phone: '18800001012',
  password: 'word_12',
  verifyCode: '',
  loginType: 1,
  UserLogIn: '',
}
type TLoginInfoActionType = 'loginInfo/reset_reducer' | 'loginInfo/update_kv'

export interface ILoginInfoState {
  email: string
  phone: string
  password: string
  verifyCode: string
  loginType: number
}

export interface ILoginInfoAction {
  type: TLoginInfoActionType
  payload: { [key: string]: any }
}

const loginInfo = (state = initState, action: ILoginInfoAction) => {
  let nextState
  const { type, payload } = action
  console.log('type: ', action)
  switch (type) {
    case 'loginInfo/reset_reducer':
      nextState = {
        ...initState,
      }
      break
    case 'loginInfo/update_kv':
      console.log('payload: ', payload)
      if (payload.key === 'UserLogIn') {
        Auth.setToken(payload.value.token)
        Auth.setId(payload.value.id)
      } else if (payload.key === 'UpdateToken') {
        Auth.setToken(payload.value)
      }
      nextState = {
        ...state,
        [action.payload.key]: action.payload.value,
      }
      break
    default:
      nextState = state
      break
  }
  return nextState
}

export default loginInfo
