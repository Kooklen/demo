<template>
  <div>
    <div class="bg">
      <div class="app">
        <div>
          <!--          应用中心-->
          <IviewInput v-model="form.applicationName" placeholder="请输入名称" @input="searchApp" />
          <div class="wrap">
            <div class="app-container">
              <div class="app-card flex-row" v-for="item in appList" :key="item.id" @click="appClick(item)">
                <div class="logo_img">
                  <img :src="item.applicationIcon" alt="" />
                </div>
                <div>
                  <div class="wd1">{{ item.applicationName }}</div>
                  <div class="wd2" v-html="item.applicationIntroduction"></div>
                </div>
              </div>
              <add-card class="appCard" @click.native="toAppStore"></add-card>
            </div>
          </div>
        </div>
      </div>

      <announcement-part />
    </div>

    <div class="bg2">
      <div class="trend">
        <div class="flex-row">
          <img src="~_img/common/trend.webp" alt="" />
          <span>应用资源使用趋势</span>
        </div>
        <DatePicker
          type="datetimerange"
          placeholder="请选择日期和时间"
          style="width: 362px"
          class="datepiker"
        ></DatePicker>
        <div class="line-w">
          <Echart :option="lineOption"></Echart>
        </div>
      </div>

      <common-app></common-app>
    </div>
  </div>
</template>

<script>
import AddCard from "@/views/application-admin/application-center/addCard"
import AnnouncementPart from "@/views/application-admin/application-center/announcementPart"
import CommonApp from "@/views/application-admin/application-center/commonApp"
import Echart from "_cc/Echart"
import { LineGradientColor } from "@/utils/option.js"
export default {
  name: "Index",
  components: { Echart, CommonApp, AnnouncementPart, AddCard },
  data() {
    return {
      appList: [],
      form: {
        applicationName: ""
      }
    }
  },
  computed: {
    lineOption() {
      return {
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          splitLine: {
            //网格线
            lineStyle: {
              type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 50,
          right: 50,
          bottom: 35,
          top: 35
        },
        series: [
          {
            type: "line",
            smooth: 0.6,
            symbol: "none",
            lineStyle: {
              color: "#5470C6",
              width: 3
            },
            areaStyle: {
              color: LineGradientColor(["rgba(98, 137, 217, .6)", "rgba(98, 137, 217, 0)"], "y")
            },
            data: [
              ["2019-10-10", 200],
              ["2019-10-11", 560],
              ["2019-10-12", 750],
              ["2019-10-13", 580],
              ["2019-10-14", 250],
              ["2019-10-15", 300],
              ["2019-10-16", 450],
              ["2019-10-17", 300],
              ["2019-10-18", 100]
            ]
          }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(params = {}) {
      this.$api.subcenterManage.scGetSubCenterAppList({ ...params, dataType: 2, pageSize: 8 }).then(res => {
        this.appList = res.data.records
      })
    },
    toAppStore(){
      window.location.replace('https://yx-nscc-sub.cn/#/appStore')
    },
    searchApp(val) {
      this.getList(this.form)
    },
    appClick(item){
      sessionStorage.setItem('cardData2',JSON.stringify(item))
      this.$router.push({path:'/application/app-detail'})
    }
  }
}
</script>

<style lang="less" scoped>
.line-w {
  width: 100%;
  height: calc(100vh - 670px);
}

.bg {
  width: 1610px;
  height: 420px;
  margin: 18px 31px 0px 31px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  //background-color: #0abbad;
}

.bg2 {
  width: 1610px;
  height: calc(100vh - 580px);
  margin: 0px 0px 0px 31px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.app {
  width: 1151px;
  box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
  border-radius: 4px;
  height: 392px;
  background: #fff;
  .i-input {
    padding: 20px 0 0 24px;
  }
  .wrap {
    height: 320px;
    overflow: auto;
    margin-top: 20px;
    padding: 0 0 0 24px;
  }
  .app-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;

    .appCard {
      margin-right: 10px;
      margin-bottom: 22px;
    }
  }
  .app-card {
    width: 358px;
    height: 124px;
    background: #ffffff;
    box-shadow: 0px 4px 10px 0px rgba(201, 208, 228, 0.4), 0px 1px 5px 0px #e1e8f0;
    border-radius: 4px;
    background: url("~_img/common/TurboBrainBG.png") no-repeat 40%;
    margin-right: 10px;
    margin-bottom: 22px;
    display: flex;
    cursor: pointer;
    .logo_img {
      margin: 0 10px 0;
      width: 70px;
      height: 100%;
      position: relative;
      img {
        width: 70px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .wd1 {
      margin: 16px 0 10px 0;
      height: 22px;
      font-size: 14px;
      font-weight: bold;
      color: #333333;
      line-height: 22px;
    }
    .wd2 {
      width: 238px;
      height: 66px;
      font-size: 14px;
      font-weight: 400;
      color: #141e25;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }
}

.common-app {
  width: 439px;
  height: 421px;
  background: #ffffff;
  box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
  border-radius: 4px;
}

.trend {
  width: 1151px;
  background: #ffffff;
  box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
  border-radius: 4px;
  padding: 21px;
  //overflow: auto;
  position: relative;
  height: 100%;
  span {
    //margin: 5px;
    //width: 160px;
    margin: auto 0;
    text-align: center;
    height: 36px;
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    line-height: 36px;
  }
}

.datepiker {
}
</style>
