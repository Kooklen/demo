<template>
  <div class="personal">
    <div id="container"></div>
  </div>
</template>

<script>
import { start } from "qiankun"
import action, { startBack } from "@/utils/actions.js"
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {
    // 设置启动的页面为个人中心
    start()
    // 加载完成
    // 当微前端启动成功,立即切换页面
    startBack(() => {
        // action.setGlobalState({ component: "personal" })
      let timer = setInterval(() => {
        let dom = document.querySelector("#personal")
        if (!dom) {
          action.setGlobalState({ component: "personal" })
        } else {
          clearInterval(timer)
        }
      }, 50)
    })
  }
}
</script>

<style lang="less" scoped>
.personal {
  position: relative;
   width: 100%;
  height: 100%;

  #container {
    position: absolute;
    left: 30px;
    right: 30px;
    top: 20px;
    bottom: 40px;
    // height: 100%;
    background: #fff;
  }
}
</style>
