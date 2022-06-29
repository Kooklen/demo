/**
 * 在此文件配置系统菜单
 * 注意两点：
 *  要求组件文件目录路径跟菜单的path字段保持一致
 *  路由的数据从这个文件读取
 * 此外：
 *  后续如需要添加菜单权限配置或快速导航菜单，也可以从此文件读取数据，code字段为预留权限码字段
 */
import { handleTreeNode, filterTree } from "_u/tree"

// 路由权限（权限码为path）
const route = (title, path, children, option) => {
  let ret = { title, path }

  // 没有children，但需要传option时，第三个参数就是option
  if (children && !Array.isArray(children)) {
    option = children
    children = null
  }

  children && children.length && (ret.children = children)
  ret = Object.assign(ret, option || {})
  return ret
}

let menuListTest = []
let cloudPlatformAcc = [
  route("工作台", "application-admin", [
    route("应用中心", "application-center")
  ]),
  route("应用管理", "application", [
    route("应用信息", "application-information"),
    route("应用详情", "app-detail",{noCheck:true}),
  ]),
  route("用户管理", "organization", [
    route("分中心管理", "subcenter-message"),
    route("企业管理", "serve-information"),
    route("组织架构", "micro-org"),
    route("个人中心", "personal",{noCheck:true}),
  ]),
  route("用户内容管理", "user-content-manage", [
    route("用户反馈管理", "user-feedback"),
    // route("应用对接管理", "app-dock"),
  ]),
  // route('审批管理', 'approval-management',  [
  //   route('审批信息', 'approval-information'),
  //   route('审批流管理', 'process-management'),
  // ]),
  route("资源编排", "resource-arrangement", [
    // route('资源与分区', 'resources-zoning'),
    route("资源配额", "resource-quota")
    // route('资源配额', 'micro-orgg'),
  ]),
  route("账单管理", "billing-management", [
    // route('计时计费', 'time-based-billing'),
    route("计时计费", "time-micro"),
      // route("计费详情","detail")
  ])
  // route('告警管理', 'alarm-management',[
  //   route('告警规则', 'resources-zoning'),
  //   route('告警信息', 'resource-quota'),
  // ]),
  // route('云平台模板管理', 'cloud-platform',[
  //   route('平台菜单管理', 'resources-zoning'),
  //   route('平台页面管理', 'resource-quota'),
  // ]),
]

let corporateStaffAcc = [
  // 企业员工
  route("工作台", "application-admin", [
    route("应用中心", "application-center")
    // route('应用信息', 'application-information'),
    // route('应用详情', 'appDetails'),
  ])
]

// if(localStorage.getItem("auth")=="cloudPlatformAcc"){
//     menuListTest = cloudPlatformAcc //云平台
//
// }
//
//
// if(localStorage.getItem("auth")=="corporateStaffAcc"){
//     menuListTest = corporateStaffAcc //企业员工
// }
// http://localhost:8090/#/application-admin/application-center
menuListTest = cloudPlatformAcc


let getMenu = codeList => {
  let allCodeList = [] // 总的权限列表（权限码根据）

  const getCode = code => {
    let temp = code.split("-")
    if (temp.length > 2) {
      code = `${temp[0]}-${temp[1]}`
    }

    if (allCodeList.includes(code)) {
      return getCode(code + "+")
    } else {
      return code
    }

    // console.log(allCodeList);
  }
  handleTreeNode(menuListTest, (node, parent) => {
    let { path, code } = node
    if (path) {
      node.code = getCode(path)
      allCodeList.push(getCode(path))
    } else if (code) {
      node.code = `${parent.code}-${code}`
      allCodeList.push(`${parent.code}-${code}`)
    }
  })

  if (Array.isArray(codeList)) {
    return filterTree(menuListTest, node => {
      return codeList.includes(node.code)
    })
  } else {
    return menuListTest
  }
}
// let menuTest = getMenu();

export default getMenu
