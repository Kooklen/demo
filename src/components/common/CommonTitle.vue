<template>
  <div class="content_title">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.content_title {
  padding-left: 10px;
  position: relative;
  .flex-center();
  justify-content: space-between;
  margin-bottom: 10px;

  span {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    line-height: 24px;
    margin-right: 20px;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    width: 3px;
    height: 18px;
    background: linear-gradient(270deg, #97bbef 0%, #5572bf 100%);
    box-shadow: 1px 1px 1px 0px rgba(77, 138, 234, 0.28);
    border-radius: 2px;
  }
}
</style>