<template>
  <div :class="['i-date-picker', { 'back-stage': backStage }]">
    <InputLabel
      v-if="label"
      :text="label"
      :required="required"
      :backStage="backStage"
    />
    <DatePicker
      v-bind="$attrs"
      v-on="$listeners"
      :class="[cls]"
      :style="style"
      :placeholder="placeholder"
    >
    </DatePicker>
  </div>
</template>

<script>
import { inputMixin } from "./mixin/inputMixin";
import { DatePicker } from "iview";
// Iview DatePicker组件使用v-model时，绑定的是Date对象
// 建议使用@on-change将返回的值（字符串形式）绑定
// v-model用于回显，或者使用:value回显
// @group iview
export default {
  name: "IviewDatePicker",
  components: { DatePicker },
  mixins: [inputMixin],
  // components: { InputLabel },
  props: {
    backStage: {
      type: Boolean,
    },
    placeholder: {
      type: String,
      default: "选择日期",
    },
    // 输入框标签
    label: {
      type: String,
    },
    // 是否必填，传入label时才有效
    required: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
@import "./config/index";
.i-date-picker {
  .input-layout();
  /deep/.ivu-date-picker {
    .input-width();
    // 输入框
    .ivu-date-picker-rel {
      .ivu-input-prefix i,
      .ivu-input-suffix i {
        line-height: @input-height;
        color: @input-icon-color;
      }
      .ivu-input {
        .input-view();
        .input-text();
        width: 100%;
        height: @input-height;
        &.ivu-input-disabled {
          .input-view-disabled();
        }
        &:focus {
          .input-view-focus();
        }
        &:hover {
          .input-view-hover();
        }
        // &.input::-webkit-input-placeholder {
        //   .placeholder();
        // }

        // &.input::-moz-placeholder {
        //   /* Mozilla Firefox 19+ */
        //   .placeholder();
        // }

        // &.input:-ms-input-placeholder {
        //   /* Internet Explorer 10-11 */
        //   .placeholder();
        // }
      }

      input {
        &::-webkit-input-placeholder {
          .placeholder();
        }
        &::-moz-placeholder {
          .placeholder();
          /* Mozilla Firefox 19+ */
        }
        &:-ms-input-placeholder {
          .placeholder();
          /* Internet Explorer 10-11 */
        }
      }
    }
    // 下拉框
    .ivu-select-dropdown {
      color: @text-color;
      .input-drawdown-view();
      .ivu-picker-panel-body-wrapper {
        // 顶部
        .ivu-date-picker-header {
          border-bottom: @input-drawdown-inner-border;
        }
        // 底部确认按钮
        .ivu-picker-confirm {
          border-top: @input-drawdown-inner-border;
          .ivu-btn-text {
            color: @text-color;
            background: transparent;
            &:active,
            &:hover {
              background: transparent;
              color: @text-color-active;
            }
          }
          .ivu-btn-default {
            font-weight: bold;
            .btn-secondary-f();
            margin-right: 5px;
          }
          .ivu-btn-primary {
            font-weight: bold;
            .btn-primary-f();
          }
        }
        .ivu-picker-panel-content {
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
            // 悬浮、范围
            .ivu-date-picker-cells-cell:hover em,
            .ivu-date-picker-cells-cell-range::before {
              background: @datepicker-cell-hover-bg;
            }
            /*当天*/
            .ivu-date-picker-cells-cell-today.ivu-date-picker-cells-focused
              em::after {
              background: #fff;
            }
            .ivu-date-picker-cells-cell-today.ivu-date-picker-cells-focused:hover
              em {
              border: none;
              color: rgba(0, 0, 0, 0.65);
              &::after {
                background: @datepicker-cell-selected-bg;
              }
            }
            // 选中状态
            .ivu-date-picker-cells-cell-selected em,
            .ivu-date-picker-cells-cell-selected:hover em {
              color: #fff !important;
              background: @datepicker-cell-selected-bg;
            }
            .ivu-date-picker-cells-focused em {
              color: #fff;
              border: 0 0 0 1px @datepicker-cell-selected-bg inset;
              background: @datepicker-cell-focus-bg;
            }
            .ivu-date-picker-cells-cell-disabled {
              background: @datepicker-cell-disabled-bg;
              &:hover em,
              &::before {
                background: @datepicker-cell-disabled-bg;
              }
            }
          }
        }
        // 时间点选择
        .ivu-picker-panel-body {
          .ivu-time-picker-cells-list {
            .show-scroll();
            .ivu-time-picker-cells-ul {
              .ivu-time-picker-cells-cell {
                &:hover {
                  background: @datepicker-cell-hover-bg;
                  color: @datepicker-hover-text;
                }
                &.ivu-time-picker-cells-cell-selected {
                  background: @datepicker-cell-focus-bg;
                  color: @datepicker-active-text;
                }
              }
            }
          }
        }
      }
      .ivu-picker-panel-sidebar {
        color: @text-color;
        background: transparent;
        .ivu-picker-panel-shortcut:hover {
          background-color: @datepicker-cell-hover-bg;
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
          .ivu-date-picker-cells-cell {
            // color: fade(#fff, 65%);
            // &.ivu-date-picker-cells-cell-prev-month em,
            // &.ivu-date-picker-cells-cell-next-month em {
            //   color: fade(#fff, 30%);
            // }
          }
          // 悬浮，选中状态
          .ivu-date-picker-cells-cell:hover em,
          .ivu-date-picker-cells-cell-selected em,
          .ivu-date-picker-cells-cell-selected:hover em {
            color: @datepicker-hover-text;
            background-color: @datepicker-cell-selected-bg;
          }
          .ivu-date-picker-cells-cell-range::before {
            // background: @datepicker-cell-focus-bg !important;
          }
        }

        // 时间点选择
        .ivu-picker-panel-body {
          .ivu-time-picker-cells-list {
            .admin-scroll-mini();
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
  }
}
</style>


<docs>
```vue
<template>
  <div style="background: #262b2d; padding: 20px">
    <IviewDatePicker />
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
</style>
```
</docs>