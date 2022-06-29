<!--
  @description: 微服务
  @creator: lwd
  @date: 2021/03/10
-->
<template>
  <div class="micro-org">
    <div id="container" class="micro-containr"></div>
  </div>
</template>

<script>
import { start } from "qiankun";
export default {
  name: "micro-org",
  data() {
    return {
      base: "",
    };
  },
  created() {
  },
  mounted() {
    start();
  },
  methods: {
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
      z-index: 99;
    }
  }
}
</style>