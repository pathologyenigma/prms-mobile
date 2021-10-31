import { combineReducers } from 'redux'
import loginInfo, { ILoginInfoState } from './loginInfo'
import registerInfo, { IRegisterInfoState } from './registerInfo'
import userInfo, { IUserInfoState } from './userInfo'

export interface IStoreState {
  loginInfo: ILoginInfoState,
  registerInfo: IRegisterInfoState,
  userInfo: IUserInfoState
}

export default combineReducers({
  loginInfo,
  registerInfo,
  userInfo
})
