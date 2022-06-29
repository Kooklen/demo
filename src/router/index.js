import Vue from "vue";
import VueRouter from "vue-router";
import getMenu from '_d/menu'
import { handleTreeNode } from '_u/tree';

Vue.use(VueRouter);

// 系统主菜单路由
let menuTree = getMenu();
let mainRoutes = [];
// console.log(menuTree, 'menuTree')

handleTreeNode(menuTree, (node, parentNode) => {
  node.fullPath = (parentNode ? parentNode.fullPath : '') + '/' + node.path;
  node.fullPathName = (parentNode ? parentNode.fullPathName + ' - ' + node.title : node.title)
  let { path, title, code, fullPath, fullPathName } = node;
  // console.log(node, 'node')
  if (!path) return;
  /** 一级路由 */
  if (!parentNode) {
    node.fullPath = '/' + node.path;
    let routeItem = {
      path: '/' + path,
      meta: {
        ...node,
        componentSrc: `@/views${fullPath}/Index`
      },
      title,
      component: () => import(`@/views${fullPath}/Index`),
    };
    mainRoutes.push(routeItem);
  } else if (!node.children || !node.children[0].path) {
    // let { fullPathName } = parentNode;
    /** 二级路由 */
    let comSrc = fullPath.split('/:') // 辨别动态路由
    let routeItem = {
      path: node.path,
      meta: {
        ...node,
        children: node.children,
        componentSrc: `@/views${comSrc[0]}/Index`
      },
      title,
      component: () => import(`@/views${comSrc[0]}/Index`)
    };

    for (let item of mainRoutes) {
      if (fullPath.includes(item.path)) {
        if (!item.children) {
          item.children = [];
        }
        item.children.push(routeItem)
        // if (item.children.length >= 1) {
        //   item.redirect = fullPath;
        // }
      }
    }
  }

})
  // noCheck代表该页面无需验证权限

const defaultRoutes = [
  // {
  //   path:'/blank',
  //   title: '跳转中',
  //   component:() => import('@/views/blank/Index')
  // },

  {
    path: '/login',
    title: '登录页',
    component: () => import('@/views/login/Index')
  },
  {
    path: '/register',
    title: '注册页',
    component: () => import('@/views/register/Index')
  },
  {
    path: '/usePage',
    title: '微前端中转页',
    component: () => import('@/views/tool/usePage.vue'),
    meta:{
      noCheck:true
    }
  },
  // {
  //   path:'/application-admin/appDetails',
  //   title:'应用详情',
  //   component:() => import('@/views/application-admin/appDetails/Index')
  // },

  {
    path: '/',
    title: '首页',
    redirect: "/application/application-information",
    component: () => import('@/views/home/Index'),
    children:[
      ...mainRoutes
    ],
  },
];


const router = new VueRouter({
  // mode: 'history',
  routes: [
    ...defaultRoutes,
  ]
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  let noNeedVerify = ['/login', '/register'];

  if (noNeedVerify.includes(to.path)) {
    next()
  } else if (!Vue.prototype.$auth.token && !Vue.prototype.$token) {
    // console.log(Vue.prototype, 'Vue.prototype')
    // next({ path: '/login' })
    //临时免权限
    next();

  } else {
    next();
  }
})

// console.log(router, 'router')
export default router;
