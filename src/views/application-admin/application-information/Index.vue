<template>
  <div>
    <div class="operat-platform">
      <div class="common-bg ">
        <Tabs :animated="false">
          <TabPane label="应用信息" class="applicationInformation">
            <iview-input placeholder="请输入名称" class="input"></iview-input>
            <IviewButton @click="openDialog('createApp')">创建应用</IviewButton>
          </TabPane>
          <TabPane label="应用分类">应用分类</TabPane>
        </Tabs>
      </div>

      <div class=" bottom flex-row">
        <div class="left common-bg">
          <div class="subject" v-for="(key,index) in applicationClassifyName" :key="index"
               :class="{'subjectClick':index==select}">

            <div class="title" @click="clickFather(index, key)">
              {{ key.applicationClassifyName }}
            </div>

            <!--一级分类-->
            <div v-if="index==select" class="classifiedTwoList flex-row">

              <div v-for="(key,index) in classifiedTwo" :key="index" class="classifiedTwo"
                   :class="{'classifiedTwoClick':index==selectTwo}"
                   @click="clickSon(index,key)">
                {{ key.applicationClassifyName }}
                <!--                二级分类-->
              </div>

            </div>
          </div>

        </div>
        <div class="right common-bg">

          <div class="right_bar flex-row">

            <div v-for="(key,index) in classifiedThree" :key="index" @click="clickGrandSon(index,key)"
                 :class="{'grandSonClick':index==selectThree}">
              {{ key.applicationClassifyName }}
            </div>

          </div>

          <div class="right_card ">
            <app-card :classifyID="classifyId" dataType="2"></app-card>
          </div>

        </div>
      </div>

    </div>
    <div v-if="createApp.visible">
      <create-app @close="(e) => addModalCloseCallBack('createApp')"
                  :handleItem="handleItem"></create-app>
    </div>
  </div>
</template>

<script>
import IviewInput from "_c/iview/IviewInput";
import AppCard from "@/views/application-admin/application-information/appCard";
import createApp from "@/views/application-admin/application-information/createApp";

export default {
  name: "application-information",
  components: {AppCard, IviewInput, createApp},
  created() {
    this.getAppClassifyName()
    this.clickFather(0)
    this.clickSon(0)

  },
  mounted() {
  },
  computed: {

  },
  methods: {
    clickFather(e, event) {
      this.select = e
      var choose = e
      this.classifiedTwo = this.applicationClassifyName[choose].classifyChild;
      // console.log(this.classifiedTwo)
      // console.log(event.id + "" + event.applicationClassifyName); //打印了一级分类
      this.clickSon(0, event)
    },
    clickSon(e, event) {
      var select = e;
      this.selectTwo = select;
      this.classifiedThree = this.classifiedTwo[select].classifyChild
      // console.log(event.id + "" + event.applicationClassifyName); //打印了2级分类
      this.classifyId = event.id;
      console.log(this.classifyId)
      // console.log(this.classifiedThree[0].id)
    },
    clickGrandSon(e, event) {
      var select = e;
      this.selectThree = select
      // console.log(event.id + "" + event.applicationClassifyName); //打印了3级分类
      this.classifyId = event.id;
      console.log(this.classifyId)


    },
    openDialog(type) {
      this[type].visible = true;
    },
    addModalCloseCallBack(type) {
      this[type].visible = false;
      this.handleItem = {};
      this.query();
      this.getAppClassifyName()
    },
    getAppClassifyName() {
      this.$api.common
          .classifytree({})
          .then((res) => {
            this.applicationClassifyName = res.data.classifyChild
            this.clickFather(0)
            // console.log(this.applicationClassifyName[0].applicationClassifyName);
          });

    },

  },
  data() {
    return {
      classifyChild:"",
      classifyId:"5",
      select: "0",
      selectTwo: "0",
      selectThree: "0",
      classifiedTwo: [],
      classifiedThree: [],
      handleItem: {},
      createApp: {
        visible: false
      },
      applicationClassifyName: []
    }
  }
}
</script>

<style lang="less" scoped>
.common-bg {
  height: 128px;
}

.operat-platform {
  width: 100%;
  height: 128px;
  padding: 20px 30px 30px;

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
}

/deep/ .ivu-tabs-tab-active {
  font-size: 16px;
  font-weight: bold;
  color: #456BD1;
  line-height: 22px;
}

.bottom {
  width: 1610px;
  height: 707px;
  margin: 21px 0;
}

.left {
  width: 311px;
  height: 707px;
  background: #FFFFFF;
  box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
  border-radius: 4px;
  padding-top: 0;
  padding: 0;
}


.subject {
  width: 308px;
  height: 66px;
  font-size: 18px;
  font-weight: bold;
  color: #949494;
  line-height: 66px;
  border-bottom: 1px dashed #D7DFEE;
  //background-color: #0abbad;

  .title {
    padding-left: 19px;
  }

  span {
    width: 88px;
    height: 24px;
    //background: #456BD1;
    box-shadow: inset 0px 0px 5px 0px #EDF4FC;
    border-radius: 4px;
    border: 1px solid #3064F2;
  }
}

.subjectClick {
  color: #333333;
  width: 311px;
  height: 152px;
  //background-color: pink;
  background: url("~_img/common/subject_bg.png") center no-repeat;
  z-index: 999;
  //border: 3px solid;
  border-bottom: none;
  //box-shadow: 0px 2px 20px 0px #FFFFFF, 0px 2px 15px 0px rgba(123, 136, 146, 0.18), 0px 2px 4px 0px rgba(123, 136, 146, 0.07), inset 0px 4px 4px 0px rgba(230, 236, 241, 0.81), inset 0px -4px 1px 0px #FFFFFF;
  border-radius: 6px 6px 2px 2px;
}

.right {
  width: 1279px;
  height: 707px;
  background: #FFFFFF;
  box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
  border-radius: 4px;
  margin: 0 0 0 20px;
  //padding: ;
}

.right_bar {
  //height: 32px;
  //width: auto;
  //border: 1px solid;
  //border-radius: 8px;
  //box-shadow: 3px 4px 4px -1px #D3D3D3;
  //border-radius: 4px 0px 0px 4px;

  div {
    width: 84px;
    height: 32px;
    line-height: 32px;
    //background: #456BD1;
    color: #676F69;
    font-size: 14px;
    text-align: center;
    //box-shadow: inset 0px 0px 1px 0px #A2BAFA;
    border-radius: 4px;
    box-shadow: 3px 4px 4px -1px #D3D3D3;
  }

  .grandSonClick {
    color: #FFFFFF;
    font-weight: bold;
    font-size: 14px;
    background: #456BD1;
    box-shadow: 3px 4px 4px -1px #D3D3D3;

  }

  div:first-child {
    border-radius: 4px 0px 0px 4px;
  }

  div:last-child {
    //border-radius: 0px 4px 4px 0px;
    border-radius: 4px;
  }
}

.right_card {
  width: 1190px;
  height: 95%;
  //background-color: pink;
  margin-top: 15px;
  overflow: auto;
}

/deep/ .ivu-tabs-nav {
  font-size: 16px;
  color: #333333;
  font-weight: bold;
}

.applicationInformation {
  display: flex;
  justify-content: space-between;
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
  //background-color: #1D65F5;
  margin: 0 auto;
  border-top: 1px dashed;
  padding-top: 13px;
}

.classifiedTwo {
  //width: 56px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: #333333;
  margin-right: 16px;

}

.classifiedTwoClick {
  //width: 88px;
  text-align: center;
  color: white;
  height: 24px;
  line-height: 24px;
  background: #456BD1;
  box-shadow: inset 0px 0px 5px 0px #EDF4FC;
  border-radius: 4px;
  border: 1px solid #3064F2;
}


</style>