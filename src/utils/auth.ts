import AsyncStorage from '@react-native-community/async-storage'
import { DeviceEventEmitter } from 'react-native'
import { Login_Token, Login_Identity, Log_Out, Login_User_Id } from './constant'

export type Identity =
  | 'PersonalUser'
  | 'EnterpriseUser'
  | 'Administrator'
  | 'Counselor'

let _token: string | null = null
let _identity: string | null = null
let _id: string | null = null

export async function logout() {
  _token = null
  _identity = null
  await AsyncStorage.multiRemove([Login_Token, Login_Identity])
  DeviceEventEmitter.emit(Log_Out)
}

export async function isLogin() {
  const token = await getToken()
  return token !== null
}

export function setToken(token: string) {
  _token = token
  return AsyncStorage.setItem(Login_Token, token)
}

export async function getToken() {
  if (_token) {
    return _token
  }
  const token = await AsyncStorage.getItem(Login_Token)
  _token = token
  return token
}

// 登录用户 id (该id现在只有在登录接口中会有返回)
export function setId(id: string) {
  _id = id
  return AsyncStorage.setItem(Login_User_Id, id.toString())
}

export async function getId() {
  if (_id) {
    return _id
  }
  const id = await AsyncStorage.getItem(Login_User_Id)
  _id = id
  return id
}

export async function setTargetIdentity(identity: Identity) {
  _identity = identity
  await AsyncStorage.setItem(Login_Identity, identity)
  DeviceEventEmitter.emit(Login_Identity)
}

export async function getTargetIdentity() {
  if (_identity) {
    return _identity
  }
  const identity = await AsyncStorage.getItem(Login_Identity)
  _identity = identity
  return identity
}

export function setRole() {}

export function getRole() {}
