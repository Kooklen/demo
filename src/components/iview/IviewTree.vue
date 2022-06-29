<template>
  <div class="i-tree">
    <Tree
      ref="tree"
      v-bind="$attrs"
      :render="renderContent"
      :data="treeData"
      @on-check-change="getCheckedNodes"
      show-checkbox
      multiple
    ></Tree>
    <!-- <div style="background:red;">点击</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData:[
            {
              title: "前台",
              expand: true,
              children: [
                {
                  title: "首页",
                  expand: true,
                  code: "home"
                },
                {
                  title: "AI服务",
                  childrens: [
                    { title: "查看", code: "aiServe-look" },
                    { title: "新增", code: "aiServe-add" },
                    { title: "删除", code: "aiServe-del" },
                    { title: "修改", code: "aiServe-put" }
                  ]
                },
                {
                  title: "数据管理",
                  expand: true,
                  children: [
                    { title: "数据概况", expand: true, code: "data-ill" },
                    {
                      title: "数据集管理",
                      expand: true,
                      childrens: [
                        { title: "查看", code: "dataM-look" },
                        { title: "新增", code: "dataM-add" },
                        { title: "删除", code: "dataM-del" },
                        { title: "修改", code: "dataM-put" },
                        { title: "导入", code: "dataM-enter" },
                        { title: "个人标注", code: "dataM-1" },
                        { title: "团队标注", code: "dataM-2" },
                        { title: "发布数据集", code: "dataM-3" },
                        { title: "查看版本记录", code: "dataM-4" }
                      ]
                    },
                    { title: "数据标注", expand: true, code: "data-label" },
                    {
                      title: "标签组管理",
                      expand: true,
                      childrens: [
                        { title: "查看", code: "labelM-look" },
                        { title: "新增", code: "labelM-add" },
                        { title: "删除", code: "labelM-del" },
                        { title: "修改", code: "labelM-put" },
                        { title: "导入", code: "labelM-enter" }
                      ]
                    },
                    {
                      title: "标注团队管理",
                      expand: true,
                      childrens: [
                        { title: "查看", code: "label-look" },
                        { title: "新增", code: "label-add" },
                        { title: "删除", code: "label-del" },
                        { title: "修改", code: "label-put" }
                      ]
                    },
                    {
                      title: "团队任务管理",
                      expand: true,
                      code:'taskM',
                      children: [
                        { title: "任务概况", expand: true,code:'task-ill' },
                        {
                          title: "团队任务",
                          expand: true,code:'task-team'
                        },
                        {
                          title: "我的任务",
                          expand: true,code:'task-my'
                        }
                      ]
                    }
                  ]
                },
                {
                  title: "模型管理",
                  expand: true,
                  children: [
                    { title: "模型概览", expand: true,code:'model-ill' },
                    {
                      title: "算法管理",
                      expand: true,
                      childrens: [
                        { title: "查看", code: "calcM-look" },
                        { title: "新增", code: "calcM-add" },
                        { title: "删除", code: "calcM-del" },
                        { title: "修改", code: "calcM-put" },
                        { title: "导入", code: "calcM-enter" },
                        { title: "构建算法", code: "calcM-create" }
                      ]
                    },
                    {
                      title: "训练任务",
                      expand: true,
                      childrens: [
                        { title: "查看", code: "tiTask-look" },
                        { title: "新增", code: "tiTask-add" },
                        { title: "删除", code: "tiTask-del" },
                        { title: "修改", code: "tiTask-put" },
                        { title: "开始训练", code: "tiTask-1" },
                        { title: "查看版本记录", code: "tiTask-2" }
                      ]
                    },
                    { title: "模型管理", expand: true,code:'modelM' }
                  ]
                },
                {
                  title: "服务管理",
                  expand: true,
                  children: [
                    { title: "服务概览", expand: true,code:'serve-ill' },
                    {
                      title: "服务管理",
                      expand: true,
                      childrens: [
                        { title: "查看", code: "serve-look" },
                        { title: "新增", code: "serve-add" },
                        { title: "删除", code: "serve-del" },
                        { title: "修改", code: "serve-put" },
                        { title: "服务状态修改", code: "serve-status" },
                        { title: "分配token", code: "serve-token" }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              title: "后台",
              expand: true,
              children: [
                {
                  title: "系统管理",
                  expand: true,
                  code:'system-manage',
                  children: [
                    { title: "系统概览", expand: true,code:'system-ill' },
                    { title: "日志管理", expand: true,code:'log' },
                    { title: "会话管理", expand: true,code:'session' }
                  ]
                },
                {
                  title: "组织机构管理",
                  expand: true,
                  code:'organ-manage',
                  children: [
                    {
                      title: "企业管理",
                      expand: true,
                      childrens: [
                        { title: "查看", code: "company-look" },
                        { title: "新增", code: "company-add" },
                        { title: "删除", code: "company-del" },
                        { title: "修改", code: "company-put" }
                      ]
                    },
                    {
                      title: "用户管理",
                      expand: true,
                      childrens: [
                        { title: "查看", code: "userM-look" },
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
                }
              ]
            }
          ]
    }
  },
  created() {},
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        'div',
        {
          on: {
            click: () => {}
          },
          style: {
            display: 'flex',
            width: '100%'
          }
        },
        [
          h(
            'span',
            {
              on: {
                click: () => {}
              },
              style: {
                // 'min-width': '40px'
              }
            },
            data.title
          ),
          h(
            'CheckboxGroup',
            {
              props: {
                value: data.codes
              },
              on: {
                'on-change': (val) => {
                  data.codes = val
                  // if (data.childrens.length === val.length) {
                  if (val.length > 0) {
                    this.$set(data, 'checked', true)
                    this.$set(data, 'selected', true)
                  } else {
                    // data.selected = false
                    // data.checked = false
                  }
                }
              },
              style: {
                marginLeft: '20px',
                display: 'flex',
                'flex-wrap': 'wrap'
              }
            },
            (data.childrens || []).map((item) =>
              h(
                'Checkbox',
                {
                  props: {
                    label: item.code
                  },
                  style: {
                    color: '#2c3542!important',
                    minWidth: '50px'
                  }
                },
                item.title
              )
            )
          )
        ]
      )
    },
    getCheckedNodes(all, data) {
      if (data.checked) {
        data.codes = check(data.children || data.childrens || [])
      } else {
        data.codes = close(data.children || data.childrens || [])
      }
      // 遍历选中复选框
      function check(list) {
        return list.map((item) => {
          if (item.children) item.codes = check(item.children)
          if (item.childrens) item.codes = check(item.childrens)
          return item.code
        })
      }
      // 遍历取消复选框
      function close(list) {
        list.map((item) => {
          if (item.children) item.codes = close(item.children)
          if (item.childrens) item.codes = close(item.childrens)
        })
        return []
      }
    },
    getNodes() {
      let data = this.$refs.tree.getCheckedAndIndeterminateNodes()
      let params = data.map((item) => item.code)
      data.map((item) => {
        if (item.childrens) {
          params.push(...item.codes)
        }
      })
      
      return params.filter(item=>item)
      // this.$api.account
      //   .addRoleAction(params, [this.TabData.id], {
      //     headers: { 'Content-Type': 'application/json' }
      //   })
      //   .then((res) => {
      //     this.$Message.success('添加成功')
      //   })
    }
  }
}
</script>
 
<style lang="less" scoped>
</style>