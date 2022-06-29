<template>
  <div class="i-checkbox">
    <!-- <InputLabel
      v-if="label"
      :text="label"
      :required="required"
      :backStage="backStage"
    /> -->
    <Checkbox v-bind="$attrs" v-on="$listeners">
      <!-- <span :title="showTitle ? showTitle : ''">{{ label }}</span> -->
      <slot></slot>
    </Checkbox>
  </div>
</template>

<script>
export default {
  name: "IviewCheckbox",
  props: {
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
    // 禁用
    disabled: {
      type: Boolean,
    },
    // 显示悬浮标题
    showTitle: {
      type: Boolean,
    },
  },
};
</script>

<style lang="less" scoped>
@import "./config/input";

.i-checkbox {
  display: inline-block;

  /deep/.ivu-checkbox-wrapper {
    // &:hover {
    //   .ivu-checkbox {
    //     .ivu-checkbox-inner {
    //       border: 10px solid #515CF3;
    //       // border: 1px solid #515CF3;
    //     }
    //   }
    // }
    // .ivu-checkbox {
    //   .ivu-checkbox-inner {
    //     width: 120px;
    //     height: 120px;
    //     border: 1px solid #979797;
    //     background: #585f5f;
    //     &::after {
    //     }
    //   }
    // }
    // ivu-checkbox-wrapper ivu-checkbox-group-item ivu-checkbox-wrapper-checked ivu-checkbox-default
    &.ivu-checkbox-default {
      &:hover {
        .ivu-checkbox {
          .ivu-checkbox-inner {
            border: 1px solid #515cf3;
            // border: 1px solid #515CF3;
          }
        }
      }
    }

    &.ivu-checkbox-wrapper-checked {
      font-weight: 800;
      color: @iview-primary-color;
      .ivu-checkbox {
        .ivu-checkbox-inner {
          border-color: rgba(81, 92, 243, 1);
          box-shadow: 0px 0px 6px 0px rgba(133, 247, 220, 0.3),
            0px 0px 8px 0px rgba(0, 0, 0, 0.48);
          &::after {
            content: "";
            border: 0.125rem solid #fff;
            // border: 0.125rem solid rgba(81, 92, 243, 1);
            border-top: 0;
            border-left: 0;
          }
        }
      }
    }
    &.ivu-checkbox-wrapper-disabled {
      opacity: 0.5;
      // color: fade(@text-color, 20%);
      .ivu-checkbox {
        .ivu-checkbox-inner {
        }
      }
    }
  }
}
</style>
