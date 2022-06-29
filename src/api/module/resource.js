/**
 * 超算资源信息接口 resource
 * name：接口名称
 * url：接口api
 * method：接口请求方法，默认GET
 * defaultParams：默认参数
 */

export default [
    {
        /*
            获取列表信息
            account 账号
            pageCurrent
            pageSize
            publicResource  是否公有，1：公有；0：私有
            used  1：已分配，0：待分配
        */ 
        name: 'getResourceList',
        url: '/api/operation-management/v1/resource-info/list-account-page',
        method: 'GET',
    }
]