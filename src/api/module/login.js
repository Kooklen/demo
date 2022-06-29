/**
 * 表单模块接口
 * name：接口名称
 * url：接口api
 * method：接口请求方法，默认GET
 * defaultParams：默认参数
 */
//  http://192.168.0.230:8180/auth/realms/operation_management/protocol/openid-connect/token
export default [
  {
    name: 'getToken',
    url: '/auth/realms/operation_management/protocol/openid-connect/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, 
]