<template>
  <div :class="['i-time-picker', {'back-stage': backStage}]">
    <InputLabel v-if="label" :text="label" :required="required" :backStage="backStage" />
    <TimePicker
      v-bind="$attrs"
      v-on="$listeners"
      :class="[cls]"
      :style="style"
      :placeholder="placeholder"
    ></TimePicker>
  </div>
</template>

<script>
import { inputMixin } from "./mixin/inputMixin";
// @group iview
export default {
  name: "IviewTimePicker",
  mixins: [inputMixin],
  // components: { InputLabel },
  props: {
    // 是否启用后台样式
    backStage: {
      type: Boolean
    },
    inputWidth: {
      type: [String, Number],
      default: "short"
    },
    placeholder: {
      type: String,
      default: "选择时间"
    },
    // 输入框标签
    label: {
      type: String
    },
    // 是否必填，传入label时才有效
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
.i-time-picker {
  color: @text-color;
  .input-layout();
  /deep/.ivu-date-picker {
    .input-width();
    // 输入框
    .ivu-date-picker-rel {
      .ivu-input-prefix i,
      .ivu-input-suffix i {
        color: @input-icon-color;
      }
      .ivu-input {
        .input-view();
        .input-text();
        height: @input-height;
        width: 100%;
        &.ivu-input-disabled {
          .input-view-disabled();
        }
        &:focus {
          box-shadow: none;
        }
        &.input::-webkit-input-placeholder,
        &.input::-moz-placeholder,
        &.input:-ms-input-placeholder {
          .placeholder();
        }
      }
    }
    // 下拉框
    .ivu-select-dropdown {
      .input-drawdown-view();
      .ivu-picker-panel-body-wrapper {
        // 顶部
        .ivu-date-picker-header {
          border-bottom: @input-drawdown-inner-border;
        }
        // 底部确认按钮
        .ivu-picker-confirm {
          border-top: @input-drawdown-inner-border;
          .ivu-btn-default {
            .btn-secondary-f();
          }
          .ivu-btn-primary {
            .btn-primary-f();
          }
        }
        // 日期格子
        .ivu-date-picker-cells {
          // 星期一至星期日
          .ivu-date-picker-cells-header {
            span {
              color: @datepicker-weekday-color;
            }
          }
          .ivu-date-picker-cells-cell {
            color: @datepicker-cell-color;
            &.ivu-date-picker-cells-cell-prev-month em,
            &.ivu-date-picker-cells-cell-next-month em {
              color: @datepicker-cell-not-this-month;
            }
          }
          // 悬浮，选中状态
          .ivu-date-picker-cells-cell:hover em,
          .ivu-date-picker-cells-cell-selected em,
          .ivu-date-picker-cells-cell-selected:hover em {
            color: @datepicker-hover-text;
            background: @datepicker-cell-selected-bg;
          }
          // .ivu-date-picker-cells-cell-range::before {
          //   background: rgba(17, 29, 44, 1);
          // }
        }

        // 时间点选择
        .ivu-picker-panel-body {
          .ivu-time-picker-cells-list {
            .show-scroll();
            .ivu-time-picker-cells-ul {
              .ivu-time-picker-cells-cell {
                &:hover,
                &.ivu-time-picker-cells-cell-selected {
                  background: @datepicker-cell-selected-bg;
                  color: @datepicker-hover-text;
                }
              }
            }
          }
        }
      }
    }
    &.ivu-date-picker-focused input {
      box-shadow: none;
    }
  }
}
&.back-stage {
  /deep/.ivu-date-picker {
    // 输入框
    .ivu-date-picker-rel {
      .ivu-input {
        .input-view-b();
        &:focus {
          // background: @adminInputBgColorActive;
        }
      }
    }
    // 下拉框
    .ivu-select-dropdown {
      .input-drawdown-view-b();
      .ivu-picker-panel-body-wrapper {
        // 顶部
        .ivu-date-picker-header {
          border-bottom: @input-drawdown-inner-border-b;
        }
        // 底部确认按钮
        .ivu-picker-confirm {
          border-top: @input-drawdown-inner-border-b;
          .ivu-btn {
            border: 1px solid rgba(201, 229, 224, 0.2);
            &:hover {
              background: #13283d;
            }
          }
        }
        // 日期格子
        .ivu-date-picker-cells {
        }

        // 时间点选择
        .ivu-picker-panel-body {
        }
      }
    }
  }
}
</style>