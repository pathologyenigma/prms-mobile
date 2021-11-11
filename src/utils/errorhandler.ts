import RootLoading from "./rootLoading"

function errorHandler(error: any) {
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
      break
    default:
  }
  RootLoading.fail(errorMsg)
}

export default errorHandler
