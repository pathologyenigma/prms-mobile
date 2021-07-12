import { combineReducers } from 'redux'
import system, { ISystemState } from '../reducer/system'
import loginInfo, { ILoginInfoState } from './loginInfo'
import userInfo, { IUserInfoState } from './userInfo'
import userProperty, { IUserPropertyState } from './userProperty'
import registerInfo, { IRegisterInfoState } from './registerInfo'

export interface IStoreState {
  system: ISystemState,
  loginInfo: ILoginInfoState,
  userInfo: IUserInfoState,
  registerInfo: IRegisterInfoState,
  userProperty: IUserPropertyState,
}

export default combineReducers({
  system,
  loginInfo,
  userInfo,
  registerInfo,
  userProperty,
})
