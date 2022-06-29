<template>
  <div :class="['i-input-label', backStage ? 'back-stage' : '']">
    <label :class="['label-text', required ? 'required' : '']">{{ text }}</label>
  </div>
</template>

<script>
// @group iview
export default {
  name: "InputLabel",
  props: {
    // 标签文本
    text: {
      type: String
    },
    // 后台样式
    backStage: {
      type: Boolean
    },
    // 是否必填
    required: {
      type: Boolean
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang='less' scoped>
@import "./config/index";
.i-input-label {
  display: inline-block;
  font-size: @label-size;
  color: rgba(0, 0, 0, 0.65);
  margin-right: @label-mr;
}
&.back-stage {
  color: @label-color-b;
}
</style>