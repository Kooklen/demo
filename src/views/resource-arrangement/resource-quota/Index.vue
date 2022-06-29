<template>
  <div class="operat-platform">
  <div class="common-bg op_table">
    <Tabs value="name1" :animated="false">
      <TabPane label="公有云" name="name1">
        <div>
          <div class="tab-bar">
            <div class="line"></div>
            <div class="tab-bar-word">应用资源</div>
          </div>
          <div class="flex-row">
            <system-card inputTitle="pytorch 21.11-py3" style="margin-right: 82px"></system-card>
            <system-card inputTitle="Alpha Fold 2.1.2"></system-card>
          </div>

          <div class="tab-bar">
            <div class="line"></div>
            <div class="tab-bar-word">计算资源</div>
          </div>
          <div class="flex-row">
            <common-card inputTitle="通用专区" style="margin-right: 82px"></common-card>
            <common-card input-title="GPU专区"></common-card>
          </div>

        </div>
      </TabPane>
      <TabPane label="私有云" name="name2">
        <div>
          <div>
            <div class="tab-bar">
              <div class="line"></div>
              <div class="tab-bar-word">应用资源</div>
            </div>
            <div class="flex-row">
              <system-card inputTitle="pytorch 21.11-py3" style="margin-right: 82px"></system-card>
              <system-card inputTitle="Alpha Fold 2.1.2"></system-card>
            </div>

            <div class="tab-bar">
              <div class="line"></div>
              <div class="tab-bar-word">计算资源</div>
            </div>
            <div class="flex-row">
              <common-card inputTitle="通用专区" style="margin-right: 82px"></common-card>
              <common-card input-title="GPU专区"></common-card>
            </div>

          </div>
        </div>
      </TabPane>
    </Tabs>

  </div>
</div>
</template>

<script>
import systemCard from "@/views/resource-arrangement/resource-quota/systemCard";
import commonCard from "@/views/resource-arrangement/resource-quota/commonCard";
export default {
  name: "resource-quota",
  components: {systemCard,commonCard},

}
</script>

<style lang="less" scoped>
.op_table{
  width: 100%;
  //height: 800px;
  flex: 1;
  padding: 20px;
  //background-color: pink;
  height: 83vh;
  //overflow: auto;

}

.operat-platform {
  //width: 100%;
  height: 800px;
  padding: 20px 30px 30px;
  //background-color: pink;
}

.line{
  width: 3px;
  height: 24px;
  background: linear-gradient(270deg, #97BBEF 0%, #5572BF 100%);
  box-shadow: 1px 1px 1px 0px rgba(77, 138, 234, 0.28);
  border-radius: 2px;
  margin-right: 6px;
}

.tab-bar{
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
.tab-bar-word{
  width: 72px;
  height: 24px;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  line-height: 24px;

}
}



/deep/ .ivu-tabs-tab{
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
}
</style>