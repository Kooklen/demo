<template>
  <div class="content_title">
      <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.content_title {
  margin-bottom: 20px;
  .flex-center();
  justify-content: flex-start;
  > span {
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    line-height: 26px;
  }

  img {
    margin-right: 10px;
  }
}
</style>