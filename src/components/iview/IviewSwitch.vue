<template>
  <div :class="['i-switch', {'back-stage': backStage}]">
    <InputLabel v-if="label" :text="label" :required="required" :backStage="backStage" />
    <i-switch v-bind="$attrs" v-on="$listeners" :size="size" :value="value" :before-change="beforeChange">
      <slot slot="open" name="open"></slot>
      <slot slot="close" name="close"></slot>
    </i-switch>
    <IviewModal
      title="提示"
      type="confirm"
      v-model="showModal"
      :confirmText2="confirmText"
      @on-ok="checkOk"
      @on-cancel="checkCancel"></IviewModal>
  </div>
</template>

<script>
import InputLabel from "./InputLabel";
// @group iview
export default {
  name: "IviewSwitch",
  components: { InputLabel },
  props: {
    // 是否为后台管理样式
    backStage: {
      type: Boolean
    },
    // 解决在table render中使用是无法传props的bug
    value: {
      type: [Boolean, Number, String]
    },
    // 改写size
    size: {
      type: String,
      default: "default"
    },
    // 输入框标签
    label: {
      type: String
    },
    // 是否必填，传入label时才有效
    required: {
      type: Boolean
    },
    before: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: '确认切换状态吗？'
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    beforeChange(ok) {
      if (this.before && isNaN(ok)) {
        this.showModal = true;
      }
      if (isNaN(ok)) return;
      this.$emit('before-change', ok);
    },
    checkOk() {
      this.showModal = false;
      this.beforeChange(1);
    },
    checkCancel() {
      this.showModal = false;
      this.beforeChange(0);
    }
  }
};
</script>

<style lang='less' scoped>
@import "./config/index";
.i-switch {
  //.input-layout();
  /deep/.ivu-switch {
    .input-view();
    .input-text();
    background: #DFDFE8;
    border: 1px solid #DFDFE8;
    border-radius: 10px; //kooklen改动
    overflow: hidden;
    &.ivu-switch-checked {
      border-color: @switch-bg-active;
      background-color: @switch-bg-active;
      .ivu-switch-inner {
        position: relative;
        display: block;
        text-align: center;
        left: -6px;
        /*top: 1px;*/
      }
      &::after {
        /*left: 40px;*/
      }
    }
    &.ivu-switch-disabled {
      opacity: 1;
      background: @switch-bg-disabled;
    }
  }
}
&.back-stage {
  /deep/.ivu-switch {
    .input-view-b();
  }
}
</style>