/**
 * 全局使用一个$auth.isLogin来控制用户是否登录，watch该变量来控制跳回登录页或首页 √
 * 场景：
 * 初次打开页面、刷新页面（获取token，userinfo，修改isLogin的值）
 * 接口拦截（http.js，401即过期，清除用户信息，修改isLogin）===
 * 登出（清除用户信息，修改isLogin）√
 * 登入（保存用户信息，修改isLogin）√
 */
// import iview from '_u/iview'
import { Message, Spin } from "iview"
import qs from "qs"
import { Base64 } from "js-base64"
import api from "../api"
import router from "../router"
import store from '@/store';
/** 'token' 转码 base64 */
const base64token = Base64.encode("token")

/** 配置项 */
const config = {
  client_id: "operation_front_back",
  grant_type: "password"
}

class Auth {
  /** 构造函数 */
  constructor() {
    this.userInfo = null // 用户信息
    this.token = null // token
    this.isLogin = true // 用户是否已登录
    this.Vue = null // Vue构造函数
  }

  /** 获取token，刷新token */
  getToken(username, pwd) {
    return new Promise((resolve, reject) => {
      api.login
        .getToken(
          qs.stringify({
            username: username,
            password: pwd,
            client_id: config.client_id,
            client_secret: "7a330d74-e783-41b2-b595-ebfd2238ff8a",
            grant_type: config.grant_type
          })
        )
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.error("token获取失败", err)
          Message.error("账号或密码错误")
          reject(err)
        })
    })
  }

  /** 刷新token */
  refreshToken() {}

  /** 获取用户信息 */
  getUserInfo() {
    // console.log("getuserinfo")
    return new Promise((resolve, reject) => {
      api.role
        .getUserInfo()
        .then(res => {
          sessionStorage.setItem("userData", JSON.stringify(res.data))
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /** 用户登录页登录 */
  login(username, pwd) {
    if (!username || !pwd) {
      Message.error("账号或密码不能为空！")
    } else {
      Spin.show()
      this.getToken(username, pwd)
        .then(async res => {
          let { access_token, refresh_token, expires_in } = res.data
          this.token = access_token // token
          // 登录成功之后，在sessionStorage上保存用户登录信息
          sessionStorage.setItem(base64token, this.token)
          sessionStorage.setItem("refreshToken", refresh_token)
          sessionStorage.setItem("expiresIn", expires_in)
          store.dispatch("tinyweb/getTreeCode")
          router.push("/application-admin/application-center") //登陆后跳转
          Spin.hide()
          Message.success("登录成功")
          // 获取用户信息存储groupId
          api.role.getUserInfo().then(res => {
            localStorage.setItem("groupId", res.data.groupInfo[0].id)
            sessionStorage.setItem("userInfo", JSON.stringify(res.data))
            this.userInfo = res.data
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          Spin.hide()
        })
    }
  }

  /** 用户登出，清除用户信息，并跳转登录页 */
  logout() {
    this.userInfo = null // 用户信息
    this.token = null // token
    sessionStorage.clear()
    sessionStorage.removeItem(base64token)
    sessionStorage.removeItem("refreshToken")
    sessionStorage.removeItem("expiresIn")
    sessionStorage.removeItem("userInfo")
    sessionStorage.setItem("islogout", "1")
    sessionStorage.removeItem("userData")
    localStorage.removeItem("auth")
    router.push("/login")
  }

  /** 重定向 */
  handleRedirect() {
    // console.log(location.hash, this.isLogin, 'this.isLogin - location ====================================>')
    /** 延迟跳转，否则登录页刷新会跳转到首页 */
    setTimeout(() => {
      if (!this.isLogin && (location.hash.includes("official") || location.hash.length <= 2)) {
        // router.push("/official")
      } else if (!this.isLogin && (!location.hash.includes("/login") || !location.hash.includes("/official"))) {
        // location.hash = "/login"
        // router.push("/login")
      } else if (this.isLogin && location.hash.includes("/login")) {
        /** 控制登陆后跳转的页面 */
        // for (let item of router.options.routes) {
        //   if (item.meta) {
        //     let { path, meta: { code } } = item;
        //     if (this.hasPermission(code)) {
        //       router.push(path)
        //       return;
        //     }
        //   }
        // }
        // Message.error('用户暂无权限！');
        // this.isLogin = false;
        /** 未对接权限，临时跳转 */
        // router.push('/application-admin/application-center')
        // let group = this.userInfo && this.userInfo.groupInfo && this.userInfo.groupInfo[0] || {};
        // if (group.groupType === 1) {
        //   router.push('/')
        // } else {
        //   router.push('/dataset-management')
        // }
      }
    }, 200)
  }

  /** 初始化监听事件 */
  initEvent() {
    if (!this.Vue) return

    const vm = new this.Vue()
    /** immediate: true */
    // this.handleRedirect();

    /** watch auth.isLogin */
    vm.$watch("$auth.isLogin", () => {
      // this.handleRedirect()
    })

    /** watch hash or route.path */
    window.addEventListener("hashchange", () => {
      // this.handleRedirect();
    })
  }

  /** 是否有权限 */
  hasPermission(code, needOnlyOne) {
    /** 未设置权限码 */
    if (!code) {
      return true
    }

    let permissionList = this.userInfo && this.userInfo.resource
    if (!permissionList) {
      return false
    }

    let hasPermission = false

    // code 为数组时
    if (Array.isArray(code)) {
      if (needOnlyOne) {
        for (let item of code) {
          if (this.hasPermission(item)) {
            hasPermission = true
            break
          }
        }
      } else {
        hasPermission = true
        for (let item of code) {
          if (!this.hasPermission(item)) {
            hasPermission = false
            break
          }
        }
      }
    }

    /** 有权限码 */
    hasPermission = permissionList.includes(code)

    return hasPermission
  }
}

/** 注册Auth */
Auth.install = function (Vue) {
  let auth = Vue.observable(new Auth())

  auth.Vue = Vue

  /** 将$auth变成响应式 */
  Vue.prototype.$auth = auth

  /** 初始化监听事件 */
  auth.initEvent()

  /** 先用sessionStorage中拿token */
  let token = sessionStorage.getItem(base64token)

  if (token) {
    auth.token = token
  } else {
    // auth.logout();
  }
}

export default Auth
