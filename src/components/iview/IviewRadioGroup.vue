<template>
  <div class="i-radio-group">
    <InputLabel
      v-if="label"
      :text="label"
      :name="label"
      :required="required"
      :backStage="backStage"
    />
    <RadioGroup v-bind="$attrs" v-on="$listeners">
      <Radio
        size="large"
        v-for="item in radioList"
        :key="item.value"
        :label="item.value"
        :disabled="item.disabled"
        >{{ item.label }}
      </Radio>
    </RadioGroup>
  </div>
</template>

<script>
import InputLabel from "./InputLabel"; // 标签组件

// @group iview
export default {
  name: "IviewRadioGroup",
  components: { InputLabel },
  props: {
    /**
     * 使用RadioGroup实现一组互斥的选项组
     * 格式 {label: label, value: value}
     * 某个选项需要禁选，可以传入disabled，{label: label, value: value, disabled: true}
     */
    radioList: {
      type: Array,
    },
    // 后台样式
    backStage: {
      type: Boolean,
    },
    // 输入框标签，不传时没有标签
    label: {
      type: String,
    },
    // 是否必填，传入label时才有效
    required: {
      type: Boolean,
    },
  },
};
</script>

<style lang="less" scoped>
@import "./config/index";

.i-radio-group {
  .input-layout();
  /deep/ .ivu-radio-group {
    font-size: 14px;
    font-weight: 400;
    color: #110d3c;
    .flex-center();
    justify-content: flex-start;

    &.ivu-radio-group-button {
      .ivu-radio-wrapper.ivu-radio-wrapper-checked {
        background: #515cf3;
        color: #fff !important;
      }

      .ivu-radio-focus {
        box-shadow: none;
        transition: none;

        &::before {
          opacity: 1;
        }

        &::after {
          opacity: 0;
          /*height: 100%;*/
          /*left: 0;*/
          /*top: 0;*/
        }
      }
    }

    .ivu-radio-wrapper.ivu-radio-group-item {
      min-width: 100px;
      .flex-center();
      justify-content: flex-start;

      .ivu-radio {
        .ivu-radio-inner {
          // width: 17px;
          // height: 17px;
          background: transparent;
          border: 1px solid @iview-primary-color;
          margin-right: 8px;
          position: relative;
          .flex-center();
          // left: 50%;
          // top: 50%;
          // transform: translate(-50%, -50%);

          &::after {
            border-radius: 50%;
          }
        }

        // &.ivu-radio-checked {}
      }

      /* 未选悬浮 */
      &:hover {
        color: @iview-primary-color;
      }

      /* 选中 */
      &.ivu-radio-wrapper-checked {
        font-weight: 800;
        color: @iview-primary-color;

        .ivu-radio {
          .ivu-radio-inner {
            border-color: @iview-primary-color;

            &::after {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              position: relative;
              top: 0;
              left: 0;
            }
          }
        }
      }

      /* 禁止状态 */
      &.ivu-radio-wrapper-disabled {
        color: rgba(0, 0, 0, 0.25);

        .ivu-radio {
          .ivu-radio-inner {
            background: #f2f2f2;
            border: 1px solid #e6e6e6;
          }
        }

        /* 未选悬浮 */
        &:hover {
          color: rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
}
</style>