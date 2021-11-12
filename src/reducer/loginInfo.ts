import AsyncStorage from "@react-native-community/async-storage"
import { initApolloClient } from "../utils/postQuery"

const initState = {
  email: '',
  phone: '13951848647',
  password: 'ccb123456',
  verifyCode: '',
  loginType: 1,
  UserLogIn: ''
}
type TLoginInfoActionType = 'loginInfo/reset_reducer' | 'loginInfo/update_kv'

export interface ILoginInfoState {
  email: string,
  phone: string,
  password: string,
  verifyCode: string,
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
      if (payload.key === 'UserLogIn') {
        initApolloClient(payload.value.token)
        AsyncStorage.multiSet([
          ['phoneNumber', state.phone],
          ['password', state.password],
          ['UserLogIn', JSON.stringify(payload.value)]
        ])
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