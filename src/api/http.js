import axios from 'axios'
import { Message } from 'iview';
import { Base64 } from 'js-base64';
import Auth from '_u/auth';
import { showFullScreenLoading, tryHideFullScreenLoading } from "_u/loading"
import Vue from "vue";

const base64token = Base64.encode('token');
const auth = new Auth();
/**
 * 提示消息
 * @param {string} text 提示信息
 * @param {string} key 默认提示类型，根据不同组件传入对象key
 * @param {object} com 组件，从不同组件库导入不同的组件，如iview、element-ui的Message组件，vant的Taost组件
 */
const msg = (text, key = 'error', com = Message) => {
  com[key](text)
}

axios.defaults.timeout = 30 * 1000;

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = '';
}

// 请求拦截
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem(base64token);
    token && (config.headers.Authorization = 'Bearer ' + token);

    if (config.showLoading) {
      showFullScreenLoading()
    }

    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

// let typeStr = ''

// 响应拦截
axios.interceptors.response.use(
  response => {
    // showLoading
    // let { hideLoading } = response.config

    // if (!hideLoading) {
    //   tryHideFullScreenLoading();
    // }

    return response
  },
  error => {
    Vue.prototype.$hide();
    if (error && error.response) {
      // let errprData = error.response.data;
      switch (error.response.status) {
        case 400:
          if (error.response.data.message.includes(': ')) {
            let str
            if(error.response.data.message=="Internal error: %s: 新增组失败."){
              str="该用户已存在，创建失败！"
            }else{
              str=error.response.data.message
            }
            msg(str);
          } else {
            msg('请求错误，请检查操作是否有误');
          }
          break;
        case 401:
          // 登录失败与未登录时不提示该错误
          auth.isLogin && sessionStorage.getItem(base64token) ? Message.warning('登录失效，请重新登录！') : '';
          auth.logout();
          break;
        case 403:
          msg('拒绝访问');
          break;
        case 404:
          msg('请求地址无效')
          break;
        case 405:
          msg('请求无效');
          break;
        case 408:
          msg('请求超时');
          break;
        case 409:

          if (error.response.data.message.includes('This record already exists')) {
            let str = "该分类已绑定下级或应用，不可删除。";
            msg(str);
          } else {
            msg('409');
          }
          break;
          // msg('该分类已绑定下级或应用，不可删除。');
          // break;
        case 500:
          msg('服务器繁忙，请稍后重试');
          break;
        case 501:
          msg('网络未实现');
          break;
        case 502:
          msg('网络错误');
          break;
        case 503:
          msg('服务不可用');
          break;
        case 504:
          msg('网络超时');
          break;
        case 505:
          msg('http版本不支持该请求');
          break;
        default:
          msg(`连接错误${error.response.status}`)
      }
    } else {
      let msg = error.message;
      if (msg === `timeout of ${axios.defaults.timeout}ms exceeded`) {
        msg('请求超时！');
      } else {
        console.error('前端捕获未知错误：', msg);
      }
    }
    return Promise.reject(error.response);
  }
)

/** 二次封装 */
let methods = ['get', 'delete', 'head', 'options', 'post', 'put', 'patch']
let paramsInConfig = ['get', 'delete', 'head', 'options']

methods.forEach(method => {
  let fn = axios[method];
  axios[method] = (url, params = {}, config = {}) => {
    if (config.loading) {
      this.$Message.loading({
        message: '数据加载中...',
        forbidClick: true
      });
    }

    let promise = null;
    if (paramsInConfig.includes(method)) {
      config = Object.assign({}, { params }, config);
      promise = fn.call(axios, url, config);
    } else {
      promise = fn.call(axios, url, params, config);
    }

    return new Promise((resolve, reject) => {
      promise.then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      }).finally(() => {
        // Message.clear();
      })
    });
  }
})

export default axios
