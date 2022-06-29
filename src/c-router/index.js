// import { h } from "vue";

let _Vue = null
export default class VueRouter {
    static install(Vue) {
        // 1.判断该插件是否注册过，如果未注册，那我们就继续走注册逻辑
        //2/用一个变量存储一下Vue, 方便后面在其他函数中使用
        //3.在vue实例上挂载$router，以后vue中可以直接通过this.$router访问router实例对象

        if (VueRouter.install.installed) {
            return;
        }
        VueRouter.install.installed = true

        _Vue = Vue;

        // 因为在js中不能通过this访问到vue实例，所以只能通过mixin的形式拿到vue实例，添加$router

        // Vue.prototype.$router = this.$options.router
        // 为什么不能直接在vue的原型对象上挂载$router，因为在当前函数中，this指向的并不是vue实例，故this.$options是不存在的
        // 故通过混入的形式，在vue实例beforeCreate生命周期中去给vue原型添加$router
        Vue.mixin({
            beforeCreate() {
                if (_Vue.prototype.$router) {
                    return;
                }
                _Vue.prototype.$router = this.$options.router
            }
        })
    }

    constructor(options) {
        this.mode = options.mode || 'history'

        // 实现routerMap（用于存储路由与组件的映射关系）
        this.routerMap = {};
        this.createRouteMap(options.routes || []);

        // 定义一个响应式对象，当后续current的值发生变化时，vue可以监测到
        this.data = _Vue.observable({
            current: this.mode === 'history' ? '/' : '#'  // 存放当前url地址
        })
    }

    // 解析路由表，得到路由与组件的映射关系
    createRouteMap(routes, parentPath) {
        if (routes && routes.length && routes.length > 0) {
            routes.forEach((item) => {
                let cPath = '';
                if (parentPath) {
                    cPath = `${parentPath}/${item.path}`
                } else {
                    cPath = item.path
                }

                this.routerMap[cPtah] = item.component;
                if (item.children && item.children.length > 0) {
                    this.createRouteMap(item.children, item.path)
                }
            })
        }
    }

    initEvent() {
        if (this.mode === 'history') {
            window.addEventListener('load', () => {
                const path = location.pathname ? location.pathname : '/'

                this.data.current = path;
                history.pushState({}, '', path)
            })

            window.addEventListener('popstate', () => {
                this.data.current = location.pathname;
            })
        } else {
            // 页面首次加载时，加载当前路由对应的组件
            window.addEventListener('load', () => {
                // 页面加载时，如果没有hash符，添加hash符
                location.hash = location.hash || '/'
                this.data.current = location.hash
            })

            window.addEventListener('hashchange', () => {
                this.data.current = location.hash;
            })
        }
    }

    initComponents() {
        // 初始化router-link组件
        this.initLink();

        // 初始化router-view组件
        this.initView();
    }
    // 注册router-link组件
    initLink() {
        _Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                return h('a', {
                    attrs: { href: this.to },
                    on: {
                        click: this.locationHref
                    }
                }, [this.$slots.default])
            },
            methods: {
                locationHref() {
                    if (this.$outer.mode === 'history') {
                        /**
                            * @description pushState用于改变浏览器跳转地址
                            * 参数有3个 第一个参数：一个对象，后续触发popState事件时，传给popState的事件的事件对象
                            * 第二个参数：是title，网页标题
                            * 第三个参数：需要跳转的url地址
                        */
                        history.pushState({}, '', this.to)


                        // 更新data下的current变量的值（该变量用于记录当前url地址，当url发生变化时，需要改变这个变量的值）
                        // 因current是响应式数据，故当值发生变化时，会触发对应组件的重新渲染，从而当url发生变化时，页面也会发生变化
                        this.$router.data.current = this.to
                    } else {
                        window, location.hash = `#${this.to}`
                        this.$router.data.current = `#${this.to}`
                    }

                    // 阻止a标签默认事件，这里需要阻止a标签的href跳转，因为a标签的href跳转是会让浏览器直接向服务器去发送请求的
                    e.preventDefault()
                }
            }
        })
    }
    // 注册router-view组件
    initView() {
        const self = this;
        _Vue.component('router-view', {
            render(h) {
                let component = null;
                if (this.$outer.mode === "history") {
                    // 找到跳转的路由地址对应的路由组件，这里依赖了data.current。故当current的值发生变化时，会触发router-view的重新渲染
                    component = self.routerMap[self.data.current]
                } else {
                    // hash模式下时，截图#后面的地址作为path路径，然后再去路由表中匹配对应的组件
                    const path = self.data.current.slice(1, self.data.current.length)
                    component = self.routerMap[path];
                }
                return h(component)
            }
        })
    }
}