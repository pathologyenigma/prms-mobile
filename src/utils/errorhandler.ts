import { DeviceEventEmitter } from "react-native"
import { Log_Out } from "./constant"
import RootLoading from "./rootLoading"

function errorHandler(error: any) {
  console.log('errorMsg: ', error)
  console.log('errorMsg1: ', error.errors)
  let errorMsg = '请求失败'
  switch (error.toString()) {
    case 'Error: user not found':
      errorMsg = '用户名不存在'
      break
    case 'Error: password is incorrect':
      errorMsg = '用户名和密码不匹配'
      break
    case 'Error: missing authorization':
      errorMsg = '没权限操作,请重新登录'
      setTimeout(() => {
        DeviceEventEmitter.emit(Log_Out)
      }, 1000);
      break
    case 'Error: token expired':
      errorMsg = '登录已过期,请重新登录'
      setTimeout(() => {
        DeviceEventEmitter.emit(Log_Out)
      }, 1000);
      break
    case 'Error: token invalid':
      errorMsg = '您还没有该身份信息,无法切换'
      break
    case 'Error: bad input':
      // 切换角色,当没有该角色时会报错,具体错误暂不处理
      errorMsg = '您还没有该身份信息,无法切换'
      break
    default:

  }
  RootLoading.fail(errorMsg)
}

export default errorHandler
