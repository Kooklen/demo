<template>
  <div class="main">
    <div class="bar flex-row">
      <img src="~_img/common/trend.webp" alt="" />
      <span class="word">常用应用</span>
    </div>
    <div class="card-container flex-row">
      <!--    <div class="outside">-->
      <!--      <div class="inside"></div>-->
      <!--    </div>-->
      <div v-for="(item,index) in cardData2" :key="index" class="card" @click="appClick(item)">
        <!--      <img :src=(index.picUrl) alt="">-->
        <div class="card-content">
          <img :src="item.applicationIcon" alt="" class="cardImg" />
          <div>{{ item.applicationName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commonApp",
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$api.enterpriseServe.getCommonApp({}).then(res => {
        console.log(res)
        this.cardData2 = res.data.splice(0, 6)
      })
    },
     appClick(item){
       console.log(item)
      sessionStorage.setItem('cardData2',JSON.stringify(item))
      this.$router.push({path:'/application/app-detail'})
    }
  },
  data() {
    return {
      cardData2: []
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 439px;
  background: #ffffff;
  box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
  border-radius: 4px;
  padding: 20px;
  height: 100%;
  margin-left: 24px;
  /*background-color: pink;*/

  .bar {
    display: flex;
    justify-content: left;
    height: auto!important;
    .word {
      height: 36px;
      font-size: 20px;
      font-weight: bold;
      color: #333333;
      line-height: 36px;
    }
    img{
      width: 32px;
    }
  }

  .card {
    width: 100px;
    height: 120px;
    background: #ffffff;
    box-shadow: 0px 4px 10px 0px rgba(201, 208, 228, 0.4), 0px 1px 5px 0px #edf4fc,
      inset 0px -2px 3px 0px rgba(150, 159, 188, 0.5);
    border: 2px solid #ffffff;
    border-top: 4px #6289d9 solid;
    border-radius: 6px;
    margin-right: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .card-content {
      width: 73px;
      vertical-align: middle;
      display: table-cell;
      text-align: center;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3; /*显示几行*/
      overflow: hidden;
    }

    .cardImg {
      width: 44px;
      height: 42px;
      margin: 12px;
    }
    span {
      width: 73px;
      height: 19px;
      font-size: 14px;
      color: #333333;
      line-height: 19px;
      margin: 0 auto;
    }
  }

  .card-container {
    height: 258px;
    flex-wrap: wrap;
    margin-top: 20px;
    //margin: 0 auto;
    margin-left: 35px;
  }
}

.inside {
  width: 100px;
  height: 100px;
  border: 2px white solid;
  border-radius: 20%;
  background-color: pink;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.outside {
  width: 120px;
  height: 120px;
  border-top: 2px blue solid;
  border-radius: 20%;
  background-color: pink;
}
</style>
