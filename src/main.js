import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import iView from 'view-design';
import ViewDesign from '_u/iview'; // 'view-design';
import "@/directive" // 注册全局自定义指令
// import { registerMicroApps } from 'qiankun' // 引入微前端框架
import '@/utils/actions';

import '_a/style/reset.css'
import '_a/style/test.less'
import '_c/iview/config/iview.less' // 覆盖 iview 默认样式
// import '_a/font/iconfont.css'
import '_u/rem'
import utils from '_u'
import "_u/global"
// import axios from './api/http'
import api from './api'
import Auth from "_u/auth";



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/utils/permission'
Vue.use(ElementUI);

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


// mount with global
Vue.use(VueQuillEditor)



Vue.use(ViewDesign);
// 全局加载样式
Vue.prototype.$loading = ViewDesign.Spin.loading; /** 加载中 */
Vue.prototype.$hide = ViewDesign.Spin.hide; /** 取消加载中 */

Vue.config.productionTip = false;
Vue.prototype.$u = utils;
// Vue.prototype.$axios = axioRs;
Vue.prototype.$api = api;
Vue.prototype.$bus = new Vue(); /** Event Bus */

// 判断是否有权限
Vue.prototype.$permission = (code) => {
  let codeList = store.state.tinyweb.treeCode;
  if (typeof code == 'undefined' || code == '') return true;
  return codeList.includes(code);
};

Vue.use(Auth); // 登录权限



// start();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
