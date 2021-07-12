type TRegisterInfoActionType = 'registerInfo/reset_reducer' | 'registerInfo/update_kv'
const initState = {
  userName: '',
  email: '',
  password: '',
  number: '',
}

export interface IRegisterInfoState {
  email: string,
  password: string,
  number: string,
  info_tips: string,
}

export interface IRegisterInfoAction {
  type: TRegisterInfoActionType
  payload: { [key: string]: any }
}

const registerInfo = (state = initState, action: IRegisterInfoAction) => {
  let nextState
  const { type } = action
  switch (type) {
    case 'registerInfo/reset_reducer':
      nextState = {
        ...initState,
      }
      break
    case 'registerInfo/update_kv':
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

export default registerInfo