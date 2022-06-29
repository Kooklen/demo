/**
 * 通用数据下拉接口
 * name：通用 - common
 * url：接口api
 * method：接口请求方法，默认GET
 * defaultParams：默认参数
 */

// 服务信息
let dict = [
    {
        // 系统字典  configType : 4=企业类型   5=系统类型
        name: 'dictGetConfigs',
        url: '/api/operation-management/v1/system-config/configs',
        method: 'GET',
    },
    {
        // 省份字典
        name: 'dictGetAreaTree',
        url: '/api/operation-management/v1/system-config/area-tree',
        method: 'GET',
    },
    {
        // 县区字典 cityId  areaName
        name: 'dictGetAreas',
        url: '/api/operation-management/v1/system-config/areas',
        method: 'GET',
    },
    {
        // 城市字典 provinceId cityName
        name: 'dictGetCities',
        url: '/api/operation-management/v1/system-config/cities',
        method: 'GET',
    },
    {
        // 省份字典 参数 provinceName
        name: 'dictGetProvinces',
        url: '/api/operation-management/v1/system-config/provinces',
        method: 'GET',
    },

    {
        // 获取超算资源列表
        name: 'getResourceList',
        url: '/api/operation-management/v1/resource-info/list-account-page',
        method: 'GET',
    },
    {
        name: 'classifytree',
        url: '/api/operation-management/v1/application/classify/tree',
        method: 'GET'
    },
    {
        name: 'updateTree',
        url: '/api/operation-management/v1/application/classify/info',
        method: 'PUT'
    },
    {
        name: 'deleteTree',
        url: '/api/operation-management/v1/application/classify/info/{@}',
        method: 'DELETE'
    },
    {
        name: 'addTree',
        url: '/api/operation-management/v1/application/classify/info',
        method: 'POST'
    },

    {
        name: 'getIdByParentId',
        url: '/api/operation-management/v1/application/classify/child',
        method: 'GET'
    },

    {
        name: "adjustClassifyTree",
        url: '/api/operation-management/v1/application/classify/order-index',
        method: 'PUT'
    },
    {
        name: "getAppVisualRange",
        url: '/api/operation-management/v1/application/relation/visual-range',
        method: 'GET'
    }

]

export default [
    ...dict
]