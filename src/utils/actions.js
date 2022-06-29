import { initGlobalState, registerMicroApps, setDefaultMountApp, start } from "qiankun"
import { Spin } from "iview"
import store from "@/store"

const initialState = store.state.tinyweb
const actions = initGlobalState(initialState)
// actions.onGlobalStateChange((state, prev) => {
//     //监听公共状态的变化
//     console.log("主应用: 变更前", prev)
//     console.log("主应用: 变更后", state)
//     // store.commit("tinyweb/setState", state)
// })

// 注册子应用
registerMicroApps([
  {
    name: "qiankun2", // 子应用名称
    // entry: "//localhost:8081", // 子应用入口
    entry: "https://microfrontend.yx-nscc-sub.cn/",

    container: "#container", // 子应用所在容器
    activeRule: () => {
      if (
        location.hash.startsWith("#/organization/micro-org")||
        location.hash.startsWith("#/organization/personal")
      ) {
        return true
      }
    }, // 子应用触发规则（路径）
    props: {
        permissionTree: [
            {
              title: "工作台",
              code: "application-admin",
              expand: true,
              children: [
                { title: "应用中心", code: "application-center" },
                { title: "应用资源使用趋势", code: "app-resource", childrens: [{ title: "添加应用", code: "app-resource-add" }] },
                { title: "公告", code: "app-tip" },
                { title: "常用应用", code: "app-normal" }
              ]
            },
            {
              title: "运营平台",
              code: "operateM",
              expand: true,
              children: [
                {
                  title: "用户管理",
                  code: "organization",
                  children: [
                    {
                      title: "分中心管理",
                      code: "subcenter-message",
                      childrens: [
                        { title: "查看", code: "subcenter-message" },
                        { title: "添加分中心", code: "subcenter-add" },
                        { title: "编辑分中心信息", code: "subcenter-put" },
                        { title: "终止服务", code: "subcenter-stop" },
                        { title: "恢复服务", code: "subcenter-start" }
                      ]
                    },
                    {
                      title: "企业客户管理",
                      code: "serve-information",
                      childrens: [
                        { title: "查看", code: "serve-information" },
                        { title: "添加企业", code: "company-add" },
                        { title: "编辑企业信息", code: "company-put" },
                        { title: "终止服务", code: "company-stop" },
                        { title: "恢复服务", code: "company-start" }
                      ]
                    },
                    {
                      title: "组织机构",
                      code: "micro-org",
                      childrens: [
                        { title: "查看", code: "micro-org" },
                        { title: "新增", code: "userM-add" },
                        { title: "删除", code: "userM-del" },
                        { title: "修改", code: "userM-put" },
                        { title: "角色设置", code: "userM-role" },
                        { title: "添加部门", code: "userM-addDep" },
                        { title: "编辑部门", code: "userM-putDep" },
                        { title: "删除部门", code: "userM-delDep" },
                        { title: "添加用户", code: "userM-addUser" },
                        { title: "编辑用户", code: "userM-putUser" },
                        { title: "删除用户", code: "userM-delUser" },
                        { title: "用户状态修改", code: "userM-putUserStatus" },
                        { title: "分享登录信息", code: "userM-shareInfo" },
                        { title: "重置密码", code: "userM-resetPass" }
                      ]
                    }
                  ]
                },
                {
                  title: "应用管理",
                  code: "application",
                  children: [
                    {
                      title: "应用信息",
                      code: "application-information",
                      childrens: [
                        { title: "查看", code: "appinfo-look" },
                        { title: "创建应用", code: "appinfo-add" },
                        { title: "启用应用", code: "appinfo-start" },
                        { title: "停用应用", code: "appinfo-stop" },
                        { title: "修改应用信息", code: "appinfo-put" },
                        { title: "设置可视范围", code: "appinfo-1" }
                      ]
                    },
                    {
                      title: "应用分类",
                      code: "userM-look",
                      childrens: [
                        { title: "查看", code: "userM-look" },
                        { title: "新增一级分类", code: "userM-firstClass" },
                        { title: "新增二级分类", code: "userM-seconClass" },
                        { title: "新增三级分类", code: "userM-thirdClass" },
                        { title: "拖动分类位置", code: "userM-drapClass" },
                        { title: "修改分类信息", code: "userM-modClass" },
                        { title: "删除分类", code: "userM-deleteClass" }
                      ]
                    }
                  ]
                },
                {
                  title: "门户管理",
                  code: "portalM",
                  children: [
                    {
                      title: "门户页面管理",
                      code: "portal-pageM",
                      childrens: [
                        { title: "查看", code: "portal-page-look" },
                        { title: "添加页面", code: "portal-page-add" },
                        { title: "装修页面", code: "portal-page-temp" },
                        { title: "修改页面信息", code: "portal-page-put" },
                        { title: "复制页面", code: "portal-page-copy" },
                        { title: "删除", code: "portal-page-del" }
                      ]
                    }
                  ]
                },
                {
                  title: "用户内容管理",
                  code: "user-content",
                  children: [
                    {
                      title: "应用对接管理",
                      code: "app-dock"
                    },
                    {
                      title: "用户反馈管理",
                      code: "user-feedback"
                    },
                  ]
                },
                {
                  title: "资源编排",
                  code: "resource-arrangement",
                  children: [
                    {
                      title: "资源配额",
                      code: "resource-quota",
                      childrens: [
                        { title: "查看", code: "resource-quota-look" },
                        { title: "申请调整资源", code: "resource-quota-1" }
                      ]
                    }
                  ]
                },
                { title: "账单管理", code: "billing-management", children: [{ title: "计时计费", code: "time-micro" }] }
              ]
            }
          ]
    }
  }
])

// 启动默认应用
// setDefaultMountApp('/vue')

// 开启服务 等需要加载的页面再开启
// start()

export function startBack(callback) {
  Spin.show()
  let time = setInterval(() => {
    let bool = document.querySelector("#app2")
    if (bool) {
      clearInterval(time)
      Spin.hide()
      callback && callback()
    }
  }, 50)
}

export default actions
