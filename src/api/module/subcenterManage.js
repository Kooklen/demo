/**
 * 表单模块接口
 * name：企业服务 - subcenterManage
 * url：接口api
 * method：接口请求方法，默认GET
 * defaultParams：默认参数
 */

// 分中心管理
let subCneter = [
  {
    // 企业新增
    name: 'scAddSubCenter',
    url: '/api/operation-management/v1/sub-center-info/sub-center',
    method: 'POST',
  },
  {
    // 企业修改
    name: 'scEditSubCenter',
    url: '/api/operation-management/v1/sub-center-info/sub-center',
    method: 'PUT',
  },
  {
    // 根据ID获取分中心信息 @: id
    name: 'scGetSubCenterById',
    url: '/api/operation-management/v1/sub-center-info/sub-center/{@}',
    method: 'GET',
  },
  {
    // 获取列表信息
    name: 'scGetSubCenterList',
    url: '/api/operation-management/v1/sub-center-info/sub-centers',
    method: 'GET',
  },
  {
    //获取应用列表
    name: 'scGetSubCenterAppList',
    url: '/api/operation-management/v1/application/manage/list',
    method: 'GET',
  },
  {
    //开关APP
    name: 'scSetSubCenterAppController',
    url: '/api/operation-management/v1/application/manage/status/{@}/{@}',
    method: 'PUT',
  },
  {
    //创建APP
    name:'SubCenterAppCreateApp',
    url:'/api/operation-management/v1/application/manage/info',
    method: 'POST'
  },{
  // 修改APP
    name:'SubCenterModifiedAPP',
    url:'/api/operation-management/v1/application/manage/info',
    method: 'PUT'
  }
]


export default [
  ...subCneter
]