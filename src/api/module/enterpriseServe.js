/**
 * 表单模块接口
 * name：企业服务 - enterpriseServe
 * url：接口api
 * method：接口请求方法，默认GET
 * defaultParams：默认参数
 */

// 服务信息
let serviceInformation = [
    {
        // 企业新增
        name: 'sfAddCompany',
        url: '/api/operation-management/v1/company-info/company',
        method: 'POST',
    },
    {
        // 企业修改
        name: 'sfEditCompany',
        url: '/api/operation-management/v1/company-info/company',
        method: 'PUT',
    },
    {
        // 根据ID获取企业信息 @: id
        name: 'sfGetCompanyById',
        url: '/api/operation-management/v1/company-info/company/{@}',
        method: 'GET',
    },
    {
        // 根据ID获取企业信息 @: id
        name: 'sfGetCompanyList',
        url: '/api/operation-management/v1/company-info/companys',
        method: 'GET',
    }, {
    // 常用APP
        name: 'getCommonApp',
        url: '/api/operation-management/v1/application/manage/common',
        method: 'GET'
    },
     // 修改企业信息
  {
    name:'putCompany',
    url:'/api/operation-management/v1/company-info/company',
    method:'PUT'
  },
]


export default [
    ...serviceInformation
]