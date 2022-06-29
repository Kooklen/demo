//autoLearn.js



const state = {   //要设置的全局访问的state对象
    handleItem: {}, // 当前操作的项目对象
    appTabList: [{ name: "应用信息", path: "/application/application-information" }], // app的页签list 设置默认的跳转标签！！！
    // headSelect
};
const getters = {   //实时监听state值的变化(最新状态)
    // handleItem(state) {
    //     return state.handleItem
    // },
};
const mutations = {
    common_M_setAppTabList(state, val) {
        state.appTabList.push(val);
        console.log('common_M_setAppTabList', state.appTabList)
    },
    common_M_deleteAt(state, val) {
        state.appTabList.splice(val, 1);
    },
};
const actions = {
    common_A_setAppTabList(context, val) {
        console.log('common_M_setAppTabList', context, val)
        let { state, commit } = context;
        let isRepeat = state.appTabList.findIndex((item) => {
            return item.path === val.path
        })

        if (isRepeat < 0) {
            commit('common_M_setAppTabList', val)
        }
    },
    common_A_deleteAt(context, val) {
        context.commit('common_M_deleteAt', val)
    },
};
export default {
    namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}