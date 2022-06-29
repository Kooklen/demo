<!--
  @description: 微服务
  @creator: xh
  @date: 2022/5/13
-->
<template>
  <div class="micro-org">
    <div id="container" class="micro-containr"></div>
  </div>
</template>

<script>
import { start } from "qiankun"; // 引入微前端框架
import action,{startBack} from '@/utils/actions'

export default {
  name: "micro-orgg",
  data() {
    return {
      base: "",
    };
  },
  created() {
  },
  mounted() {
    start();
    startBack(()=>{
      action.setGlobalState({ component: "resourceQuota" });
    })
  },
  methods: {
    catchError(event) {
      console.log(event, "catchError");
    },
  },
  destroyed() {
  },
};
</script>

<style lang="less" scoped>
.micro-org {
  width: 100%;
  height: 100%;

  .micro-containr {
    width: 100%;
    height: 100%;
    /deep/.organization-management {
      padding: 20px 30px 30px;
    }
    /deep/.role {
      top: 20px;
      left: 30px;
      right: 30px;
      bottom: 20px;
    }
  }
}
</style>