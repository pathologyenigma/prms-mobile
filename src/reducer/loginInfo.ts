const initState = {
  email: '',
  phone: '',
  password: '',
  verifyCode: '',
  loginType: 1,
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
  const { type } = action
  switch (type) {
    case 'loginInfo/reset_reducer':
      nextState = {
        ...initState,
      }
      break
    case 'loginInfo/update_kv':
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