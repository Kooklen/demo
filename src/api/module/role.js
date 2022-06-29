/**
 * 角色用户模块接口
 * name：接口名称
 * url：接口api
 * method：接口请求方法，默认GET
 * defaultParams：默认参数
 */

export default [
  // 获取当前用户权限码
  {
    name: "getPermissionCodes",
    url: "/api/aam/v1/portal/user/resource",
  },
  //  查询用户信息
  {
    name: "getUserInfo",
    url: "/api/aam/v1/portal/user/info"
  },
]
