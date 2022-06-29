/** 
 * 文件微接口
 * name：接口名称
 * url：接口api
 * method：接口请求方法，默认GET 
 * defaultParams：默认参数
 */

export default [
  {
    // 获取多文件信息 {application}/{entityType}/{entityId}/{category} {@}/{@}/{@}/{@}
    name: 'getMultipleFile',
    url: '/api/file-manager/v1/file-item/{@}/{@}/{@}/{@}/all',
  },
  {
    // 根据文件票据获取文件内容（主要是content）
    name: 'getFileByTicket',
    url: '/api/file-manager/v1/file-item/{@}'
  },
  {
    // 根据文件票删除文件
    name: 'delFileByTicket',
    url: '/api/file-manager/v1/file-item/deleteByTicket',
    method: 'POST'
  }
]