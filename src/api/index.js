import axios from './http'
import login from './module/login'
import role from './module/role' // 系统管理-用户权限
import enterpriseServe from './module/enterpriseServe' // 系统管理-用户权限
import common from './module/common' // 公用数据接口
import subcenterManage from './module/subcenterManage' // 分中心管理
import file from './module/file' // 分中心管理
import resource from './module/resource'  // 超算资源
import home from './module/home'
const api = {
  // moduleName
  login,
  common,
  file,
  role,
  enterpriseServe,
  subcenterManage,
  resource,home
}

/** 遍历api处理接口 */
Object.keys(api).forEach(module => {
  let arr = api[module];

  let moduleDict = {};

  arr.forEach(item => {
    let { name, url, method, defaultParams } = item;
    method = (method || 'GET').toLowerCase();

    /**
     * @param {object} params api参数对象，也可以传数组
     * @param {array} pathParams api路径参数，比如配置接口：'/api/aam/v1/mgmt/role-hierachy/{@}/roles/{@}/resources'，需要传入['a', 'b']来替换两个{@}
     * @param {object} config 其他配置项，同axios官方配置config
     * @usage 使用：在Vue组件中直接使用 this.$api.moduleName.apiFunction(params, pathParams, config).then(res => {})
     */
    moduleDict[name] = (params = {}, pathParams = [], config = {}) => {
      let isArray = Array.isArray(params);
      let isFormData = params instanceof FormData;
      if (!isFormData && !isArray && defaultParams) {
        params = Object.assign({}, defaultParams, params);
      }

      // 拷贝一个url
      let _url = url;

      // 替换url中path的'{@}'
      if (_url.includes('{@}') && Array.isArray(pathParams)) {
        let urlStrList = _url.split('{@}');
        _url = '';
        urlStrList.forEach((str, index) => {
          _url += str;
          if (!isNaN(pathParams[index]) || pathParams[index] === 0) {
            _url += pathParams[index];
          } else {
            pathParams[index] && (_url += pathParams[index]);
          }
        });
      }

      return axios[method](_url, params, config)
    }
  })

  api[module] = moduleDict;
})

api.$axios = axios;

/** api直接挂载在Vue.prototype上面 */
export default api