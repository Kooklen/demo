export default {
    namespaced: true,
    state: {
        name: "老王",
        age: 20,
        component: 'App',
        codes: [],
        appData: [],
        number: 0,
    },
    getters: {},
    mutations: {
        // 修改微前端公用数据
        setState(state, obj) {
            for (let i in obj) {
                state[i] = obj[i]
            }
        },
        // modifyAppData(appData, number) {
        //     appData = number
        // },
        setNumberIsWhat(state, payload) { // 增加一个带参数的mutations方法，并且官方建议payload为一个对象
            state.appData = payload;
        },
    },
    actions: {}
}