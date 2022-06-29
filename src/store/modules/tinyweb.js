
import api from "@/api"
import {Message} from 'iview'
import Auth from '@/utils/auth'
export default {
    namespaced: true,
    state: {
        treeCode: [],
        component: "app",
        // 用户管理-组织管理 - 查看角色权限页面时显示返回按钮
        showBackBtn: false,
        backBtnCall: false,
    },
    getters: {},
    computed:{
    },
    mutations: {
        // 修改微前端公用数据
        setState(state, obj) {
            for (let i in obj) {
                i !== 'treeCode' ? state[i] = obj[i] : '';
            }
        },
        setTreeCode(state, payload) {
            state.treeCode = payload;
        },
    },
    actions: {

        getTreeCode({ commit }) {
            api.role.getPermissionCodes().then(res => {
                if (res.data.length === 0) {
                    Message.warning("该账号暂无本平台的角色权限，请联系管理员");
                    //   退出登录
                   new Auth().logout()
                } else {
                    commit("setTreeCode", res.data);
                }
                // import('@/utils/actions.js').then(({default:{setGlobalState}})=>{
                //   setGlobalState({treeCode:res.data})
                // })
            })
        },
    }
}
