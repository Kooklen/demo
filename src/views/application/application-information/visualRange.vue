<template>
  <div>
    <IviewModal
        v-model="visible"
        title="设置可视范围`"
        @on-ok="save"
        @on-cancel="close"
        size="large"
        class="iviewModal"
        okText="提交"
    >
      <div class="container">
        <div class="appName">
          所属分中心：越秀分中心
        </div>

        <div class="flex-row">
          <span style="line-height: 80px">应用图标:</span>
          <img :src="logo" style="width: 80px;height: 80px;"></div>


        <div class="appName flex-row">

          <span>应用名称：</span> <Input v-model="appName" disabled />

        </div>

        <div class="appName flex-row">
          <span>应用分类：</span> <Input v-model="applicationClassifyName" disabled />
        </div>

        <div class="appName flex-row">
          <span>应用简介：</span> <Input v-model="applicationIntroduce" disabled />
        </div>

        <div class="appName">
          <span class="important">*</span>
          <span>可视范围:</span>
          <span>
            <RadioGroup v-model="selected" vertical>
              <Radio label="all" style="margin-left: 20px">全部用户</Radio>
                 <span @click="setVisible=true"> <!-- 使用span包裹下才有效果 -->
              <Radio label="some" style="margin-left: 20px">指定用户</Radio>
                 </span>
            </RadioGroup></span>
          {{ selected }}
        </div>

      </div>


    </IviewModal>

    <div v-if="setVisible">
      <IviewModal
          v-model="setVisible"
          :title="'设置用户'"
          size="middle"
          @on-ok="save1"
          @on-cancel="close1"
      >

        <Transfer
            :data="data1"
            :target-keys="keys"
            @on-change="handleChange1"
            filterable
            :filter-method="filterMethod"
            :operations="[' 撤回用户', '选择用户 ']"
        ></Transfer>

      </IviewModal>

    </div>
  </div>
</template>

<script>

export default {
  name: "visualRange",

  data() {
    return {
      formParams: {},
      data1: [],
      keys: [],

      setVisible: true,
      visible: true,
      id: "",
      logo: "",
      appName: "",
      applicationClassifyName: "",
      applicationIntroduce: "",
      selected: ""
    }
  },
  created() {
    let app = JSON.parse(sessionStorage.getItem("app"))
    console.log(app);
    this.id = app.id
    this.logo = app.applicationIcon
    this.appName = app.applicationName
    this.applicationClassifyName = app.applicationClassifyName
    this.applicationIntroduce = app.applicationIntroduce
  },
  methods: {
    save() {
      this.close()
    },
    save1() {
      this.close1()
    },
    close() {
      this.$emit("close", 'close');
      this.visible = false

    },
    close1() {
      this.setVisible = false

    },
    handleChange1(targetKeys, direction, moveKeys) {
      this.keys = targetKeys
    },
    filterMethod(data, query) {
      return data.label.indexOf(query) > -1
    },
  }
}
</script>


<style lang="less" scoped>

/deep/ .ivu-input-wrapper-large {
  width: 400px;
}

/deep/ .ivu-input {
  width: 500px!important;
}

.mb80 {
  margin-bottom: 105px;
}

.container {
  font-size: 18px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  margin: 21px 47px;
}

.important {
  width: 8px;
  height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #B8321A;
  line-height: 22px;
}

.icon {
  height: 130px;
  margin-top: 25px;

  .word {
    padding-top: 30px;
  }
}

.appName {
  width: 90%;
  margin-top: 40px;
  span{
    width:100px;
    line-height: 30px;
  }
}



.editor {
  height: 130px;
}
</style>

<style lang="less">

/deep/.ivu-modal-body {
  height: 100%;
}
.iviewModal {
  .content {
    height: 100%;
    .ivu-transfer {
      height: 100%;
    }
    /deep/.ivu-transfer-list {
      width: 200px;
      height: 410px;
      background: #ffffff;
      box-shadow: 0px 2px 10px 0px rgba(201, 208, 228, 0.58);
      border-radius: 4px;
      border: 1px solid #eceef0;
    }

    /* 头部标题 */
    /deep/.ivu-transfer-list-header {
      width: 198px;
      height: 38px;
      background: #edf4fc;
      border-radius: 3px 3px 0px 0px;

      .ivu-transfer-list-header-title {
        font-size: 14px;
        font-weight: bold;
        color: #13389a;
        line-height: 22px;
      }

      .ivu-transfer-list-header-count {
        display: none;
      }
    }

    /* 筛选框 */

    /deep/.ivu-transfer-list-body-with-search {
      .ivu-transfer-list-content {
        .show-scroll();
        .ivu-transfer-list-content-item {
          font-size: 14px !important;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          line-height: 22px;

          > span {
            padding-left: 0px;
          }
        }
      }
    }

    /* 中间transfor栏 */
    /deep/.ivu-transfer-operation {
      .ivu-btn {
        padding: 0 20px;
        height: 24px;
        background: #ffffff;
        border: 1px solid #456bd1;
        font-size: 12px;
        font-weight: bold;
        color: #456bd1;
        line-height: 22px;
      }
    }
  }
}
</style>