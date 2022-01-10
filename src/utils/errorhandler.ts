import RootLoading from './rootLoading'

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
      break
    case 'Error: token expired':
    case `'Error: Cannot read properties of undefined (reading 'user_id')'`:
    case 'Error: need resume and job expectation for this operation':
      errorMsg = '登录已过期,请重新登录'

      break
    case 'Error: token invalid':
      errorMsg = '您还没有该身份信息,无法切换'
      break
    case 'Error: bad input':
      // 切换角色,当没有该角色时会报错,具体错误暂不处理
      errorMsg = '您还没有该身份信息,无法切换'
      break
    case 'Error: Validation error: Validation len on username failed':
      errorMsg = '姓名长度不合法,请重新输入'
      break
    default:
  }
  if (
    encodeURIComponent(error) ===
    `Error%3A%20Cannot%20read%20properties%20of%20undefined%20(reading%20'user_id')`
  ) {
    errorMsg = '登录已过期,请重新登录'
  }
  RootLoading.fail(errorMsg)
}

export default errorHandler
