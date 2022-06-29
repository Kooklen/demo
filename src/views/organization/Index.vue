<!--
  @description: 组织管理
  @creator: lwd
  @date: 2021/03/10
-->
<template>
  <div class="organization">
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
export default {
  name: "organization",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.organization {
  width: 100%;
  height: 100%;

  .microOrg {
    width: 100%;
    height: 100%;
  }
}
</style>