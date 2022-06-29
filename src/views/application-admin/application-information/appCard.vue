<template>
  <div class="main flex-row">
    <div class="card flex-row" v-for="(item, index) in appData" :key="index" @click="clickCard(item)">
      <div class="logo">
        <img :src="item.applicationIcon" alt="" style="width: 48px; height: 42px; cursor: pointer" />
      </div>
      <div class="content">
        <div class="cardName" style="cursor: pointer">
          <span>{{ item.applicationName }}</span>
          <i
            class="el-icon-s-custom"
            style="margin-right: 15px"
            @click.stop="openVisual(item)"
            v-if="$permission('appinfo-1')"
          ></i>
          <i @click.stop="openDialog(item)" class="el-icon-edit" v-if="$permission('appinfo-put')"></i>
        </div>
        <div class="cardIntroduction" style="cursor: pointer">{{ item.applicationIntroduce }}</div>
        <div class="cardControll">
          <div class="origin flex-row" style="padding-top: 1px">
            <img src="~_img/common/shiled.png" v-show="item.applicationSource == 1" />
            <img src="~_img/common/appStore.png" v-show="item.applicationSource == 2 || item.applicationSource == 3" />
            <span v-show="item.applicationSource == 1">自建</span>
            <span v-show="item.applicationSource == 2">外部平台</span>
            <span v-show="item.applicationSource == 3">第三方</span>
          </div>

          <div class="flex-row" @click.stop>
            <span class="state" v-if="item.applicationStatus == 1">状态: 使用中</span>
            <span class="state" v-else-if="item.applicationStatus == 0">状态: 已停用</span>
            <iview-switch
              v-model="item.applicationStatus"
              :true-value="1"
              :false-value="0"
              class="switch"
              @on-change="change(item.applicationStatus, item)"
            ></iview-switch>
          </div>
        </div>
      </div>
    </div>
    <div class="no-data" v-if="appData.length == 0">暂无数据</div>

    <IviewModal v-model="visible" title="提示" @on-ok="save" @on-cancel="close" size="small" class="iviewModal">
      <div class="viewmodal">
        <div class="content flex-row">
          <img src="~_img/common/alert.png" alt="" class="img" />
          <div class="word" v-if="status == 0">
            <div class="word_confirm">确认停用{{ appName }}？</div>
            <div class="word_alert">停用后所属企业用户将不能再使用该应用！</div>
          </div>

          <div class="word" v-if="status == 1">
            <div class="word_confirm">确认启用{{ appName }}？</div>
            <div class="word_alert">启用后所属企业用户将可正常使用该应用！</div>
          </div>
        </div>
      </div>

      <template #footer v-if="status == 0">
        <Button @click="close" class="cancel" v-if="status == 0">取消</Button>
        <Button @click="save" class="disable" v-if="status == 0">停用</Button>

        <Button @click="close" class="cancel" v-if="status == 1">取消</Button>
        <Button @click="save" class="enable" v-if="status == 1">启用</Button>
      </template>
    </IviewModal>

    <div v-if="editeApp.visible">
      <EditeAPP @close="e => addModalCloseCallBack('editeAPP')" :handleItem="handleItem"></EditeAPP>
    </div>

    <div v-if="visual.visible">
      <visual-range @close="e => visualRange('editeAPP')" :handleItem="handleItem"></visual-range>
    </div>
  </div>
</template>

<script>
import IviewSwitch from "_c/iview/IviewSwitch"
import EditeAPP from "@/views/application-admin/application-information/editeAPP"
import VisualRange from "@/views/application/application-information/visualRange"
import AppDetail from "./AppDetail.vue"

export default {
  name: "appCard",
  components: { VisualRange, EditeAPP, IviewSwitch, AppDetail },
  created() {},
  mounted() {
    this.getAppData()
  },
  props: {
    dataType: String,
    classifyID: String | Number,
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      editeApp: {
        visible: false
      },
      visual: {
        visible: false
      },
      modalDetail: false,
      value: true,
      disabled: true,
      appData: [],
      classId: "",
      appid: [],
      id: "",
      status: "",
      appName: "",
      visible: false,
      appdata: []
    }
  },
  watch: {
    classifyID: function (newVal, oldVal) {
      this.classId = newVal
      this.getAppData()
    },
    form: {
      handler(n) {
        this.getAppData(n)
      },
      deep: true
    }
  },
  methods: {
    addModalCloseCallBack(type) {
      this.editeApp.visible = false
      this.getAppData()
    },
    visualRange(type) {
      this.visual.visible = false
      this.getAppData()
    },
    handleItem(data) {
      console.log(data)
    },
    ok() {
      this.cancel()
    },
    cancel() {
      this.modalDetail = false
    },
    openDialog(item) {
      this.editeApp.visible = true
      let app = JSON.stringify(item)
      sessionStorage.setItem("app", app)
    },
    openVisual(item) {
      this.visual.visible = true
      let app = JSON.stringify(item)
      sessionStorage.setItem("app", app)
    },
    close() {
      this.visible = false
      this.getAppData()
    },
    save() {
      this.visible = false
      this.changeStatus()
    },
    clickCard(cardInfor) {
      let data = JSON.stringify(cardInfor)
      sessionStorage.setItem("cardData2", data)
      this.appdata = JSON.parse(sessionStorage.getItem("cardData2"))
      this.$router.push("/application/app-detail")
    },
    getAppData(params = {}) {
      if (this.classId != "") {
        this.$api.subcenterManage
          .scGetSubCenterAppList({
            ...params,
            pageSize: -1,
            classifyId: this.classId,
            dataType: this.dataType //应用入口区分，1应用市场，2应用中心（企业使用），3应用信息（分中心视图），4应用信息（企业视图）
          })
          .then(res => {
            if (res.data.records.length == 0) {
              // fater无app
              // this.$api.common
              //   .getIdByParentId({
              //     parentId: this.classId
              //   })
              //   .then(res => {
              //     this.classId = res.data[0].id
              //     //父分类没有数据的话就找子分类的第一个
              //     this.getAppData()
              //   })
            }

            this.appData = res.data.records
          })
      } else {
      }
    },
    change(appstatus, appId) {
      this.id = appId.id
      this.status = appstatus
      this.visible = true
    },
    changeStatus() {
      this.$api.subcenterManage.scSetSubCenterAppController({}, [this.id, this.status]).then(res => {
        this.getAppData()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 15px 0 0 5px;
  flex-wrap: wrap;
  position: relative;
  .no-data {
    font-size: 16px;
    position: absolute;
    left: 50%;
    top: 300px;
    transform: translateX(-50%);
  }
}
/deep/ .ivu-modal-footer {
  height: 0 !important;
}

.card {
  width: 373px;
  height: 173px;
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(201, 208, 228, 0.4), 0px 1px 5px 0px #e1e8f0;
  border-radius: 4px;
  padding: 30px 20px 0 24px;
  margin-right: 13px; //应该要20的
  margin-bottom: 30px;

  .logo {
    width: 73px;
    height: 100%;
  }

  .content {
    //width: 256px;
    //height: 128px;
    //background-color: pink;

    .cardName {
      width: 250px;
      height: 22px;
      font-size: 14px;
      font-weight: bold;
      color: #333333;
      line-height: 22px;
      margin-bottom: 11px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: flex;
      justify-content: space-between;

      span {
        width: 230px;
      }

      i {
        color: #618bd9;
        //width: 10px;
        //height: 15px;
        //font-size: 15px;
        //margin-left: 150px;
      }

      .el-icon-edit {
        font-size: 15px;
      }
    }

    .cardIntroduction {
      width: 256px;
      height: 56px;
      font-size: 14px;
      font-weight: 400;
      color: #141e25;
      line-height: 20px;
      border-bottom: 1px dashed #e9e9e9;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .cardControll {
      font-size: 14px;
      height: 19px;
      line-height: 19px;
      width: 256px;
      height: 21px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      img {
        width: 19px;
        height: 19px;
      }
    }
  }
}

.switch {
  margin-left: 4px;
  margin-bottom: 3px;
}

.state {
  padding-top: 1px;
}
</style>

<style lang="less" scoped>
.viewmodal {
  .content {
    width: 300px;
    height: 74px;
    margin: 0 auto;
    margin-top: 50px;
    //background-color: #0abbad;
    .img {
      height: 51px;
      width: 51px;
      margin-right: 15px;
      margin-top: 10px;
    }

    .word {
      height: 74px;
      width: 234px;

      .word_confirm {
        width: 234px;
        height: 22px;
        font-size: 18px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.65);
        line-height: 22px;
      }

      .word_alert {
        width: 214px;
        height: 44px;
        font-size: 14px;
        font-weight: 400;
        color: #595b5f;
        line-height: 22px;
        margin: 8px 0;
      }
    }
  }

  // .i-button.btn-primary{
  //  font-size: 20px;
  //  //background: #0abbad;
  //  box-shadow: none;
  //}
}

.cancel {
  //text-shadow: 1px 1px 1px #872320;
  font-weight: bold;
  line-height: 20px;
  width: 80px;
  height: 30px;
  background: linear-gradient(180deg, #f5f9ff 0%, #dce6f5 100%);
  box-shadow: 1px 1px 4px 0px #b6c2de, inset 0px 2px 4px 0px #c4d6ef;
  border: 1px solid #f2f6ff;
}

.disable {
  text-shadow: 1px 1px 1px #872320;
  font-weight: bold;
  line-height: 20px;
  width: 80px;
  height: 30px;
  color: white;
  background: #bf5b58;
  box-shadow: 1px 1px 2px 0px rgba(222, 166, 164, 0.51), inset 2px 2px 6px 0px #f08582, inset -1px -1px 6px 0px #983431;
  border: 1px solid #f2f6ff;
}

.enable {
  text-shadow: 1px 1px 1px #872320;
  font-weight: bold;
  line-height: 20px;
  width: 80px;
  height: 30px;
  background: linear-gradient(180deg, #f5f9ff 0%, #dce6f5 100%);
  box-shadow: 1px 1px 4px 0px #b6c2de, inset 0px 2px 4px 0px #c4d6ef;
  border: 1px solid #f2f6ff;
}
</style>

<style lang="less">
.operat-platform {
  width: 100%;
  height: 240px;
  //padding: 20px 30px 30px;
}

.bar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .barLeft {
    //width: 361px;
    height: 120px;
    //background-color: #0abbad;

    .logo {
      //background-color: #0D2C91;
      width: 120px;
      height: 120px;
      //background-image: url("~_img/common/turboBLogo.png");
      //background-size: cover;
    }

    .content {
      margin-top: 18px;
      margin-left: 30px;
      //内容
    }

    .name {
      height: 31px;
      font-size: 24px;
      font-weight: bold;
      color: #333333;
      line-height: 31px;
    }

    .center {
      font-size: 14px;
      margin-top: 14px;
    }

    .center span:first-child {
      color: #949494;
    }

    .center span:last-child {
      color: rgba(0, 0, 0, 0.65);
    }

    .classified {
      font-size: 14px;
      margin-top: 4px;
    }

    .classified span:first-child {
      color: #949494;
    }

    .classified span:last-child {
      color: rgba(0, 0, 0, 0.65);
    }
  }

  .barRight {
    margin: auto 0;
  }

  /deep/ .ivu-btn {
    width: 96px;
    height: 30px;
  }
}

.appContent {
  //width: 1610px;
  //height: 715px;
  margin: 0 auto;
  margin-top: 41px;

  .tab-bar {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 20px;

    .tab-bar-word {
      width: 72px;
      height: 24px;
      font-size: 18px;
      font-weight: bold;
      color: #333333;
      line-height: 24px;
    }
  }

  .line {
    width: 3px;
    height: 24px;
    background: linear-gradient(270deg, #97bbef 0%, #5572bf 100%);
    box-shadow: 1px 1px 1px 0px rgba(77, 138, 234, 0.28);
    border-radius: 2px;
    margin-right: 6px;
  }
}

.appBelif {
  //应用简介
  //width: 1526px;
  //height: auto;
  //width: 900px;
  background: #ffffff;
  //background-color: pink;

  box-shadow: 0px 4px 10px 0px rgba(201, 208, 228, 0.4), 0px 1px 5px 0px #e1e8f0;
  border-radius: 4px;
  margin-top: 18px;

  .introContent {
    //width: 1497px;
    //width: 600px;
    //height: 60px;
    font-size: 16px;
    font-weight: 400;
    color: #141e25;
    line-height: 30px;
    padding: 19px 25px;
  }
}

.appIntro {
  //width: 1526px;
  //height: 469px;
  background: #ffffff;
  box-shadow: 0px 4px 10px 0px rgba(201, 208, 228, 0.4), 0px 1px 5px 0px #e1e8f0;
  border-radius: 4px;

  .content {
    padding: 19px 25px;
  }
}
</style>
