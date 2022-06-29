import Vue from "vue";
import Vuex from "vuex";
import common from './modules/common'
import tinyweb from './modules/tinyweb'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    common,tinyweb
  },
  // plugins: [createPersistedState()],//没有任何参数的配置写法
  plugins: [createPersistedState({//带参数的写法
    key: 'persistedstate-store',
    storage: window.sessionStorage, //
    paths: ['common']//要存的数据模块，如果不配置，就是所有模块的数据都保存
  }),
    // 选择cookie存储
    // createPersistedState({
    //   key: 'cookie-store',
    //   paths: ['common'],
    //   storage: {
    //     getItem: key => Cookies.get(key),
    //     setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
    //     removeItem: key => Cookies.remove(key)
    //   }
    // })
  ]
});
