<template>
  <div class="operat-platform">
    <div class="content">
      <Tabs v-model="tabName" :animated="false">
        <TabPane label="应用信息" name="1" class="applicationInformation" v-if="$permission('appinfo-look')">
          <div class="filter">
            <IviewInput placeholder="请输入名称" v-model="form.applicationName"></IviewInput>
            <IviewSelect
              transfer
              clearable
              v-model="form.applicationSource"
              :optionList="option1"
              placeholder="请选择接入类型"
            />
            <IviewSelect
              transfer
              clearable
              v-model="form.createrType"
              :optionList="option2"
              placeholder="请选择应用来源"
            />
            <IviewSelect transfer clearable v-model="form.usage" :optionList="option3" placeholder="请选择使用方式" />
            <IviewButton @click="openDialog('createApp')" style="margin: 10px">创建应用</IviewButton>
          </div>
        </TabPane>

        <TabPane label="应用分类" name="2" v-if="$permission('userM-look')" class="tree-list">
          <!-- <Tree
                    default-expand-all=false
                    draggable
                    disabled-cross-level
                    :show-level="[1,2,3]"
                    :data="treeData.lists"
                    @edit-click="handleEditClick"
                    @delete-click="handleDeleteClick"
                    @add-click="handleAddClick"
                    @node-drag-end="handleDragEnd"
                /> -->
          <el-tree
            :default-expand-all="true"
            draggable
            disabled-cross-level
            :show-level="[1, 2, 3]"
            :props="{
              label: 'applicationClassifyName',
              children: 'classifyChild'
            }"
            :data="treeData.lists"
            @node-drag-end="handleDragEnd"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <div class="tree-title">{{ node.label }}</div>
              <div class="tree-cao">
                <i class="el-icon-edit-outline" @click.stop="handleEditClick(node.data)" />
                <i class="el-icon-delete" @click.stop="handleDeleteClick(node.data)" />
                <i class="el-icon-plus" @click.stop="handleAddClick(node.data)" />
              </div>
            </span>
          </el-tree>
          <!--                    这是爆改了element的树，draggable表示拖动，lastlevel表示最大层级数，show-level表示显示CRUD的层级数-->
        </TabPane>
      </Tabs>
      <div class="bottom flex-row" v-show="tabName == 1">
        <div class="left">
          <div
            class="subject"
            v-for="(key, index) in applicationClassifyName"
            :key="index"
            :class="{ subjectClick: index == select }"
          >
            <div class="title" @click="clickFather(index, key)" style="cursor: pointer">
              {{ key.applicationClassifyName }}
            </div>

            <!--一级分类-->
            <div v-if="index == select" class="classifiedTwoList flex-row" style="cursor: pointer">
              <div
                v-for="(key, index) in classifiedTwo"
                :key="index"
                class="classifiedTwo"
                :class="{ classifiedTwoClick: index == selectTwo }"
                @click="clickSon(index, key)"
              >
                {{ key.applicationClassifyName }}
                <!--                二级分类-->
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right_bar flex-row">
            <div
              v-for="(key, index) in classifiedThree"
              :key="index"
              @click="clickGrandSon(index, key)"
              :class="{ grandSonClick: index == selectThree }"
            >
              {{ key.applicationClassifyName }}
            </div>
          </div>
          <div class="right_card" style="margin: 0 auto">
            <app-card :classifyID="classifyId" dataType="3" :form="form" ref="appCard"></app-card>
          </div>
        </div>
      </div>
    </div>
    <div v-if="createApp.visible">
      <create-app @close="e => addModalCloseCallBack('createApp')" :handleItem="handleItem"></create-app>
    </div>
    <IviewModal type="confirm" v-model="modal" title="设置分类新的名称" @on-ok="ok" @on-cancel="cancel">
      <Input v-model="newName" placeholder="新的分类名称" style="width: 100%" />
    </IviewModal>
    <IviewModal type="confirm" v-model="modal2" title="添加新的分类名称" @on-ok="okk" @on-cancel="cancel">
      <div style="margin-bottom: 20px">
        上级分类：
        <el-input v-model="cpname" :disabled="true" style="width: 80%"> </el-input>
      </div>

      <div>
        新的分类：
        <Input v-model="newName" placeholder="新的分类名称" style="width: 80%" />
      </div>
    </IviewModal>
    <IviewModal type="confirm" v-model="modal3" title="确定要删除该分类吗" @on-ok="okkk" @on-cancel="cancel">
      确定要删除该分类吗
    </IviewModal>
  </div>
</template>

<script>
import IviewInput from "_c/iview/IviewInput"
import AppCard from "@/views/application-admin/application-information/appCard"
import createApp from "@/views/application-admin/application-information/createApp"
import Tree from "@/components/tree/tree"

export default {
  name: "application-information",
  components: { AppCard, IviewInput, createApp, Tree },
  data() {
    return {
      cpname: "",
      tabName: "1",
      modal3: false,
      modal2: false,
      modal: false,
      newName: "",
      cid: "",
      cintro: "",
      cpid: "",
      dialogTableVisible: true,
      classifyChild: "",
      classifyId: "",
      select: "0",
      selectTwo: "0",
      selectThree: "0",
      classifiedTwo: [],
      classifiedThree: [],
      option1: [
        { label: "直接跳转", value: 1 },
        { label: "单点登录", value: 2 },
        { label: "DOCKER应用", value: 3 },
        { label: "HPC应用", value: 4 }
      ],
      option2: [
        { label: "分中心建立应用", value: 1 },
        { label: "企业自建应用", value: 2 }
      ],
      option3: [
        { label: "桌面操作", value: 1 },
        { label: "Web操作", value: 2 },
        { label: "接口调用", value: 3 },
        { label: "命令行操作", value: 4 }
      ],
      form: {
        applicationName: "",
        applicationSource: "",
        createrType: "",
        usage: ""
      },
      handleItem: {},
      createApp: {
        visible: false
      },

      applicationClassifyName: [],
      treeData: {
        custom_field: {
          id: "id",
          lists: "classifyChild",
          parent_id: "parentId"
        },
        columns: [
          {
            type: "selection",
            title: "菜单名称",
            field: "name",
            formatter: item => {
              return "<a>" + item.name + "</a>"
            }
          },
          {
            title: "操作",
            type: "action",
            align: "center",
            actions: [
              {
                text: "编辑",
                onclick: item => {
                  this.modal = true
                  this.cid = item.id
                  this.cpid = item.parentId
                },
                formatter: item => {
                  return '<i class="el-icon-edit"></i>'
                }
              },
              {
                text: "删除",
                onclick: item => {
                  this.cid = item.id
                  this.modal3 = true
                },
                formatter: item => {
                  return '<i class="el-icon-delete"></i>'
                }
              },
              {
                text: "添加",
                onclick: item => {
                  this.cid = item.id
                  this.modal2 = true
                },
                formatter: item => {
                  return '<i class="el-icon-plus"></i>'
                }
              }
            ]
          }
        ],
        lists: []
      }
    }
  },
  watch: {
    classifyId(n) {
      console.log(n)
    }
  },
  created() {
    this.getAppClassifyName()
  },
  computed: {},
  methods: {
    handleDragEnd(_, dropNode) {
      const arr = dropNode.parent.childNodes.map(({ data: { id } }, index) => ({
        id,
        orderIndex: index
      }))

      this.$api.common.adjustClassifyTree(arr).then(res => {})

      this.getAppClassifyName()
      this.refreshData()
    },
    handleEditClick(data) {
      this.cid = data.id
      this.cpid = data.parentId
      this.cintro = data.classifyIntroduction
      this.modal = true
      this.newName = data.applicationClassifyName
    },
    handleDeleteClick(data) {
      this.cid = data.id
      this.modal3 = true
    },
    handleAddClick(data) {
      this.cid = data.id
      this.cpname = data.applicationClassifyName
      this.modal2 = true
    },
    ok() {
      let name = this.newName
      let id = this.cid
      let pid = this.cpid
      let intro = this.cintro
      this.updateTree(name, id, pid, intro)
      this.refreshData()
      this.modal = false
    },

    okk() {
      let id = this.cid
      this.addTree(id)
      this.refreshData()

      this.modal2 = false
    },
    okkk() {
      let id = this.cid
      this.deleteTree(id)
      this.refreshData()
      this.modal3 = false
    },
    cancel() {
      this.modal = false
      this.modal2 = false
      this.modal3 = false
      this.newName = ""
      this.id = ""
      this.pid = ""
      this.cid = ""
      this.cintro = ""
    },

    updateTree(name, id, parentId, intro) {
      this.$api.common
        .updateTree({
          applicationClassifyName: name,
          id: id,
          parentId: parentId,
          classifyIntroduction: intro
        })
        .then(res => {})
      this.newName = ""
      this.cid = ""
      this.cpid = ""
      setTimeout(this.refreshData(), 200)
      this.refreshData()
    },

    deleteTree(id) {
      this.$api.common.deleteTree({}, [id]).then(res => {})
      this.newName = ""
      this.cid = ""
      this.cpid = ""
      setTimeout(this.refreshData(), 200)
      this.refreshData()
    },

    addTree(id) {
      this.$api.common
        .addTree({
          parentId: this.cid,
          applicationClassifyName: this.newName
        })
        .then(res => {})
      this.newName = ""
      this.cid = ""
      this.cpid = ""
      setTimeout(this.refreshData(), 200)
      this.refreshData()
    },

    onTreeDataChange(list) {
      this.treeData.lists = list
    },

    clickFather(e, event) {
      this.select = e
      var choose = e
      this.classifiedTwo = this.applicationClassifyName[choose].classifyChild
      this.classifyId = event.id
      this.clickSon(0, event)
    },
    clickSon(e, event) {
      var select = e
      this.selectTwo = select
      this.classifiedThree = this.classifiedTwo[select].classifyChild
      this.classifyId = event.id
    },
    clickGrandSon(e, event) {
      var select = e
      this.selectThree = select
      this.classifyId = event.id
    },
    openDialog(type) {
      this[type].visible = true
    },
    addModalCloseCallBack(type) {
      this[type].visible = false
      this.handleItem = {}
      this.getAppClassifyName()
    },
    getAppClassifyName() {
      this.$api.common.classifytree({}).then(res => {
        let firstSelected = res.data.classifyChild[0].id
        this.classifyId = firstSelected
        this.treeData.lists = [res.data]
        this.applicationClassifyName = res.data.classifyChild
        this.clickFather(0)
      })
    },
    refreshData() {
      this.$api.common.classifytree({}).then(res => {
        this.treeData.lists = [res.data]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.operat-platform {
  height: 100%;
  width: 100%;
  padding: 20px 30px 30px;
  position: relative;
  .op_table {
    width: 100%;
    flex: 1;
    padding: 20px;

    .op_table_action {
      margin-bottom: 10px;
    }

    .op_table_box {
      width: 100%;
      position: relative;
      flex: 1;

      .op_table_box_a {
        position: absolute;
        width: 100%;
        overflow: hidden;
        height: 100%;
      }
    }
  }
  .content {
    .ivu-tabs {
      background: #fff;
      padding: 16px 30px;
    }
    .filter {
    }
    .bottom {
      width: 100%;
      height: calc(100vh - 310px);
      margin: 21px 0;
      .left {
        width: 311px;
        background: #ffffff;
        box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
        border-radius: 4px;
        padding-top: 0;
        padding: 0;
        overflow: auto;
      }
      .right {
        width: 1279px;
        background: #ffffff;
        box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
        border-radius: 4px;
        overflow: auto;
        margin: 0 0 0 20px;
      }
    }
  }
  .tree-list {
    height: calc(100vh - 240px);
    background: #fff;
    overflow: auto;
    .el-tree {
    }
  }
}
.custom-tree-node {
  display: flex;
  align-items: center;

  .tree-title {
    min-width: 110px;
  }
  .tree-cao {
    display: flex;
    align-items: center;
    i {
      color: #409eff !important;
    }
  }
}

/deep/ .ivu-tabs-nav-wrap {
  height: 40px;
}

/deep/ .ivu-tabs-context-menu {
  height: 0;
}

/deep/ .ivu-tabs-tab-active {
  font-size: 16px;
  font-weight: bold;
  color: #456bd1;
  line-height: 22px;
}

.subject {
  width: 308px;
  height: 66px;
  font-size: 18px;
  font-weight: bold;
  color: #949494;
  line-height: 66px;
  border-bottom: 1px dashed #d7dfee;

  .title {
    padding-left: 19px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  span {
    width: 88px;
    height: 24px;
    box-shadow: inset 0px 0px 5px 0px #edf4fc;
    border-radius: 4px;
    border: 1px solid #3064f2;
  }
}

.subjectClick {
  color: #333333;
  width: 311px;
  height: 152px;
  background: url("~_img/common/subject_bg.png") center no-repeat;

  z-index: 999;
  border-bottom: none;
  border-radius: 6px 6px 2px 2px;
}

.right_bar {
  div {
    width: 84px;
    height: 32px;
    line-height: 32px;
    color: #676f69;
    font-size: 14px;
    text-align: center;
    border-radius: 4px;
    box-shadow: 3px 4px 4px -1px #d3d3d3;
  }

  .grandSonClick {
    color: #ffffff;
    font-weight: bold;
    font-size: 14px;
    background: #456bd1;
    box-shadow: 3px 4px 4px -1px #d3d3d3;
  }

  div:first-child {
    border-radius: 4px 0px 0px 4px;
  }

  div:last-child {
    border-radius: 4px;
  }
}

.right_card {
  width: 1190px;
  height: 95%;
  overflow: auto;
}

/deep/ .ivu-tabs-nav {
  font-size: 16px;
  color: #333333;
  font-weight: bold;
}

.applicationInformation {
  .filter {
    display: flex;
    .i-select {
      margin: 0 10px;
      width: 266px;
    }
    .i-input {
      margin: 0 10px 0 0;
    }
  }
}

.classifyTwo {
  display: none;
}

.classifyTwo_show {
  display: block;
}

.classifiedTwoList {
  width: 273px;
  height: 82px;
  margin: 0 auto;
  border-top: 1px dashed;
  padding-top: 13px;
}

.classifiedTwo {
  width: 100px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: #333333;
  margin: 0 1px;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.classifiedTwoClick {
  color: white;
  height: 24px;
  line-height: 24px;
  background: #456bd1;
  box-shadow: inset 0px 0px 5px 0px #edf4fc;
  border-radius: 4px;
  border: 1px solid #3064f2;
}

i {
  margin-right: 4px;
}

/deep/ .el-tree-node__content {
  height: 35px;
  font-size: 20px;

  i {
    margin-right: 20px;
  }
}

/deep/ .el-tree-node__content {
}

/deep/ .el-tree-node__children {
}
</style>
