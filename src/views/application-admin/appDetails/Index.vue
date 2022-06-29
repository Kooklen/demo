<template>
  <div class="main">
    <div class="operat-platform">
      <div class="common-bg bar">

        <div class="barLeft flex-row">
          <div class="logo">
            <!--            <img src="~_img/common/turboBLogo.png" alt="" style="width: 90px;height: 90px;">-->
            <img :src="appData.applicationIcon" alt="" style="width: 90px;height: 90px;">
          </div>
          <div class="content">
            <div class="name">{{ appData.applicationName }}</div>
            <div class="center">
              <span>所属分中心：</span>
              <span>广州超算越秀分中心</span>
            </div>
            <div class="classified">
              <span>应 用 类 别：</span>
              <span>{{ appData.applicationClassifyName }}</span>
            </div>
          </div>
        </div>
        <div class="barRight">
          <iview-button @click="openApp()">开通应用</iview-button>
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
          {{ appData.applicationIntroduce }}
        </div>
      </div>

      <div class="tab-bar">
        <div class="line"></div>
        <div class="tab-bar-word">应用介绍
        </div>
      </div>

      <div class="appIntro">
        <div class="content" v-html="appData.applicationIntroduction">
          <!--          数据中台帮忙用户快速“用好”数据，明确数据有价值。应用数据，发挥数据价值，不但采用传统BI思路实现数据报告服务，还有采用AI建模思路。更好的用好数据。采用智能算法配合规模化数据，充分挖掘数据，实现数据价值。以数据为驱动，形成数据闭环，不断优化模型算法，动态调整模型，提高模型效率和准确度，更好挖掘数据价值。-->
<!--          {{ appData.applicationIntroduce }}-->
        </div>
      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: "appDetails",
  components: {},
  created() {
    this.appData = JSON.parse(sessionStorage.getItem("cardData2"));
    console.log(this.appData)
  },
  methods: {
    openApp() {
      alert("功能完善中，敬请期待！")
    }
  },
  data() {
    return {
      appData: []
    }
  },


}
</script>

<style lang="less" scoped>
.operat-platform {
  width: 100%;
  height: 180px;
  padding: 20px 30px 30px;
}

.bar {
  display: flex;
  justify-content: space-between;

  .barLeft {
    height: 120px;

    .logo {
      width: 120px;
      height: 120px;
    }

    .content {
      margin-top: 18px;
      margin-left: 30px;
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
  width: 1610px;
  height: 715px;
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
    background: linear-gradient(270deg, #97BBEF 0%, #5572BF 100%);
    box-shadow: 1px 1px 1px 0px rgba(77, 138, 234, 0.28);
    border-radius: 2px;
    margin-right: 6px;
  }
}

.appBelif {
  width: 1526px;
  background: #FFFFFF;
  box-shadow: 0px 4px 10px 0px rgba(201, 208, 228, 0.4), 0px 1px 5px 0px #E1E8F0;
  border-radius: 4px;
  margin-top: 18px;

  .introContent {
    width: 1497px;
    height: 60px;
    font-size: 16px;
    font-weight: 400;
    color: #141E25;
    line-height: 30px;
    padding: 19px 25px;
  }
}

.appIntro {
  width: 1526px;
  background: #FFFFFF;
  box-shadow: 0px 4px 10px 0px rgba(201, 208, 228, 0.4), 0px 1px 5px 0px #E1E8F0;
  border-radius: 4px;

  .content {
    padding: 19px 25px;

  }
}


</style>