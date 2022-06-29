<template>
  <div class="main">
    <div class="box13 flex-col">
      <div class="block1 flex-col">
        <span class="txt2">{{inputTitle}}</span>
      </div>
      <div class="block2 flex-col">
        <div class="main23 flex-row">
          <span class="word5">主用户</span>
          <div class="line">
            &nbsp;
          </div>
          <span class="word6">子用户</span>
        </div>
      </div>
      <div class="block3 flex-col">
        <div class="group18 flex-row">
          <span class="txt3">VCPU已用 / 配额（核）：</span>
          <span class="word7">0/128</span>
          <div class="line">
            &nbsp;
          </div>
          <span class="info5">0/128</span>
        </div>
      </div>
      <div class="block4 flex-col">
        <div class="main24 flex-row">
          <span class="word8">GPU已用 / 配额（TB）：</span>
          <span class="word9">0/128</span>
          <div class="line">
            &nbsp;
          </div>
          <span class="txt4">0/128</span>
        </div>
      </div>
      <div class="block5 flex-col">
        <div class="layer13 flex-row">
          <span class="word10">内存已用 / 配额（GB）：</span>
          <span class="word11">0/0</span>
          <div class="line">
            &nbsp;
          </div>
          <span class="word12">0/0</span>
        </div>
      </div>

      <div class="block4 flex-col">
        <div class="main24 flex-row">
          <span class="word8">存储已用 / 配额（TB）：</span>
          <span class="word9">0/200</span>
          <div class="line">
            &nbsp;
          </div>
          <span class="txt4">0/200</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "systemCard",
  props:{
    inputTitle:String
  },
  data(){
    return{

    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 735px;
  //height: 302px;
  background: #FFFFFF;
  //background: pink;
  box-shadow: 0px 2px 20px 0px rgba(201, 208, 228, 0.2), 0px 2px 8px 0px rgba(201, 208, 228, 0.4), 0px 2px 2px 0px #EDF4FC;
  border-radius: 4px;
}

.line{
  width: 2px;
  height: 14px;
  margin: 4px 0 0 53px;
  background-color: rgb(215, 223, 238)
}


.box13 {
  width: 735px;
  height: 312px;
}

.block1 {
  height: 86px;
  background: url(~_img/common/cloudBg.png) 100%;
  background-size: cover;
  //background-size: contain;
  width: 735px;
}

.txt2 {
  text-shadow: 0px 2px 0px rgba(255, 255, 255, 1);
  width: 222px;
  height: 31px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 24px;
  font-family: MicrosoftYaHei-Bold;
  text-align: left;
  white-space: nowrap;
  line-height: 31px;
  display: block;
  margin: 28px 0 0 27px;
}

.block2 {
  box-shadow: 0px 2px 8px 0px rgba(201, 208, 228, 0.4);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 1px;
  height: 46px;
  width: 678px;
  margin: 0 0 0 27px;
}

.main23 {
  width: 176px;
  height: 19px;
  margin: 14px 0 0 472px;
}

.word5 {
  width: 39px;
  height: 19px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  font-family: MicrosoftYaHei;
  text-align: left;
  white-space: nowrap;
  line-height: 19px;
  display: block;
}

.icon1 {
  width: 1px;
  height: 14px;
  margin: 2px 0 0 50px;
}

.word6 {
  width: 42px;
  height: 19px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  font-family: MicrosoftYaHei;
  text-align: left;
  white-space: nowrap;
  line-height: 19px;
  margin-left: 41px;
  display: block;
}

.block3 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 1px;
  height: 50px;
  margin-left: 27px;
  width: 678px;
}

.group18 {
  width: 625px;
  height: 22px;
  margin: 14px 0 0 20px;
}

.txt3 {
  width: 84px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  text-align: right;
  white-space: nowrap;
  line-height: 22px;
  display: block;
}

.word7 {
  width: 20px;
  height: 21px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  text-align: left;
  white-space: nowrap;
  line-height: 21px;
  display: block;
  margin: 1px 20px 0 367px;
}

.icon2 {
  width: 1px;
  height: 14px;
  margin: 4px 0 0 53px;
}

.info5 {
  width: 20px;
  height: 21px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  text-align: left;
  white-space: nowrap;
  line-height: 21px;
  display: block;
  margin: 1px 0 0 60px;
}

.block4 {
  background-color: rgba(250, 250, 250, 1);
  border-radius: 1px;
  height: 50px;
  margin-left: 27px;
  width: 678px;
}

.main24 {
  width: 625px;
  height: 22px;
  margin: 14px 0 0 20px;
}

.word8 {
  width: 84px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  text-align: right;
  white-space: nowrap;
  line-height: 22px;
  display: block;
}

.word9 {
  width: 20px;
  height: 21px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  text-align: left;
  white-space: nowrap;
  line-height: 21px;
  display: block;
  margin: 1px 20px 0 367px;
}

.label2 {
  width: 1px;
  height: 14px;
  margin: 4px 0 0 53px;
}

.txt4 {
  width: 20px;
  height: 21px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  text-align: left;
  white-space: nowrap;
  line-height: 21px;
  display: block;
  margin: 1px 0 0 60px;
}

.block5 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 1px;
  height: 50px;
  margin-left: 27px;
  width: 678px;
}

.layer13 {
  width: 625px;
  height: 22px;
  margin: 14px 0 0 20px;
}

.word10 {
  width: 84px;
  height: 22px;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  text-align: right;
  white-space: nowrap;
  line-height: 22px;
  display: block;
}

.word11 {
  width: 20px;
  height: 21px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  text-align: left;
  white-space: nowrap;
  line-height: 21px;
  display: block;
  margin: 1px 0 0 387px;
}

.icon3 {
  width: 1px;
  height: 14px;
  margin: 4px 0 0 53px;
}

.word12 {
  width: 20px;
  height: 21px;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  text-align: left;
  white-space: nowrap;
  line-height: 21px;
  display: block;
  margin: 1px 0 0 60px;
}
</style>