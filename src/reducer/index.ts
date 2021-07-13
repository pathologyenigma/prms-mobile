import { combineReducers } from 'redux'
import loginInfo, { ILoginInfoState } from './loginInfo'
import registerInfo, { IRegisterInfoState } from './registerInfo'

export interface IStoreState {
  loginInfo: ILoginInfoState,
  registerInfo: IRegisterInfoState,
}

export default combineReducers({
  loginInfo,
  registerInfo,
})
