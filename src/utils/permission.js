import router from "@/router"
import store from "@/store"
import { Message } from "iview"
router.beforeEach((to, from, next) => {
  let codes = store.state.tinyweb.treeCode
  // 不存在权限时跳转登录页 
  if (to.path != "/login" && codes.length > 0) {
    if (!codes.includes(to.meta.code)&&typeof to.meta.code!='undefined'&&!to.meta.noCheck) {
      Message.warning("该账号暂无本平台的角色权限，请联系管理员" + to.meta.code)
      sessionStorage.clear()
      next('/login')
      next()
    }
  }
  if (to.path != "/login" && codes.length === 0) {
    console.log("重新获取权限")
    store.dispatch("tinyweb/getTreeCode")
  }
  next()
})
