const initState = {
  email: '',
  password: '',
  number: '',
  info_tips: 'none',
}
type TLoginInfoActionType = 'loginInfo/reset_reducer' | 'loginInfo/update_kv'

export interface ILoginInfoState {
  email: string,
  password: string,
  number: string,
  info_tips: string,
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
        info_tips: state.info_tips,
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