<!--
  @description: 工作台
  @creator: lwd
  @date: 2021/03/10
-->
<template>
  <div class="operat-platform">
    <div class="common-bg op_from">
      <IviewButton @click="loading">加载</IviewButton>
    </div>
    <div class="common-bg op_table"></div>
  </div>
</template>

<script>
export default {
  name: "operat-platform",
  data() {
    return {
      activeName: "",
      theme2: "",
    };
  },
  created() {
    console.log(this.$auth, "this.$auth");
  },
  methods: {
    loading() {
      this.$api.login.getCode().then(res=>{})
      // this.$loading();
      // setInterval(() => {
      //   this.$hide();
      // }, 3000);
    },
  },
};
</script>

<style lang="less" scoped>
.operat-platform {
  width: 100%;
  height: 100%;
  padding: 20px 30px 30px;
  .flex-column();

  .op_from {
    height: 146px;
    width: 100%;
    margin-bottom: 20px;
  }

  .op_table {
    width: 100%;
    flex: 1;
  }
}
</style>