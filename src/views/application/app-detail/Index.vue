<template>
  <!-- 应用详情 -->
  <div class="main app-data">
    <div class="operat-platform">
      <div class="common-bg bar">
        <div class="barLeft flex-row">
          <div class="logo">
            <!--            <img src="~_img/common/turboBLogo.png" alt="" style="width: 90px;height: 90px;">-->
            <img :src="appdata.applicationIcon" alt="" style="width: 90px; height: 90px" />
          </div>
          <div class="content">
            <div class="name">{{ appdata.applicationName }}</div>
            <div class="center">
              <span>所属分中心：</span>
              <span>广州超算越秀分中心</span>
            </div>
            <div class="classified">
              <span>应用分类：</span>
              <span>{{ appdata.applicationClassifyName }}</span>
            </div>
            <div class="classified">
              <span>接入类型：</span>
              <span v-if="appdata.applicationSource == 1 || appdata.applicationSource == 2">第三方系统应用</span>
              <span v-else-if="appdata.applicationSource == 3">DOCKER应用</span>
              <span v-else-if="appdata.applicationSource == 4">HPC应用</span>
              <span v-else>-</span>
            </div>
            <div class="classified">
              <span>应用来源：</span>
              <span v-if="appdata.createrType == 1">分中心建立应用</span>
              <span v-else-if="appdata.createrType == 2">企业自建应用</span>
              <span v-else>-</span>
            </div>
            <div class="classified">
              <span>使用方式：</span>
              <span v-if="appdata.usage == 1">桌面操作</span>
              <span v-else-if="appdata.usage == 2">Web操作</span>
              <span v-else-if="appdata.usage == 3">接口调用</span>
              <span v-else-if="appdata.usage == 4">命令行操作</span>
              <span v-else>-</span>
            </div>
          </div>
        </div>
        <div class="barRight">
          <iview-button @click="openApp">启动应用</iview-button>
        </div>
      </div>
    </div>

    <div class="common-bg appContent">
      <div class="tab-bar">
        <div class="line"></div>
        <div class="tab-bar-word">应用简介</div>
      </div>
      <div class="appBelif">
        <div class="introContent">
          <!--          数据中台帮忙用户快速“用好”数据，明确数据有价值。应用数据，发挥数据价值，不但采用传统BI思路实现数据报告服务，还有采用AI建模思路。更好的用好数据。采用智能算法配合规模化数据，充分挖掘数据，实现数据价值。以数据为驱动，形成数据闭环，不断优化模型算法，动态调整模型，提高模型效率和准确度，更好挖掘数据价值。-->
          {{ appdata.applicationIntroduce }}
        </div>
      </div>

      <div class="tab-bar">
        <div class="line"></div>
        <div class="tab-bar-word">应用介绍</div>
      </div>

      <div class="appIntro">
        <div class="content" v-html="appdata.applicationIntroduction"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appdata: {}
    }
  },
  created() {
    this.appdata = JSON.parse(sessionStorage.getItem("cardData2"))
  },
  methods: {
    openApp() {
      this.$api.home.getToLink({ applicationId: this.appdata.id }).then(res => {
        window.open(res.data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.app-data {
  background: #fff;
  padding: 20px 30px;
  height: 100vh;
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
