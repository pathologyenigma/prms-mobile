import AsyncStorage from "@react-native-community/async-storage"
import { Login_Account, Login_Password, Login_Token } from "../utils/constant"
import { initApolloClient } from "../utils/postQuery"

const initState = {
  email: '',
  phone: '18800001011',
  password: 'word_11',
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
      console.log('payload: ', payload)
      if (payload.key === 'UserLogIn') {
        initApolloClient(payload.value.token)
        AsyncStorage.multiSet([
          [Login_Account, state.phone],
          [Login_Password, state.password],
          [Login_Token, payload.value.token]
        ])
      } else if (payload.key === 'UpdateToken') {
        initApolloClient(payload.value)
        AsyncStorage.setItem(Login_Token, payload.value)
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