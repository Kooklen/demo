<template>
  <div :class="['i-cascader', {'back-stage': backStage}]">
    <InputLabel v-if="label" :text="label" :required="required" :backStage="backStage" />
    <Cascader v-bind="$attrs" v-on="$listeners" :class="cls" :style="style" />
  </div>
</template>

<script>
import { inputMixin } from "./mixin/inputMixin";
// @group iview
export default {
  name: "IviewCascader",
  mixins: [inputMixin],
  props: {
    // 标签
    label: {
      type: String
    },
    // 是否使用后台样式
    backStage: {
      type: Boolean
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
.i-cascader {
  .input-layout();
  /deep/.ivu-cascader {
    position: relative;
    .input-width();
    // 输入框
    .ivu-cascader-rel {
      .ivu-input-wrapper {
        .ivu-input {
          .input-view();
          .input-height();
          .input-text();
          &.ivu-input-disabled {
            .input-view-disabled();
          }
        }
      }
    }
    // 下拉框
    .ivu-select-dropdown {
      .input-drawdown-view();
      // 级联菜单
      .ivu-cascader-menu {
        border-right: @input-drawdown-inner-border;
        .show-scroll();
        .ivu-cascader-menu-item {
          color: @input-drawdown-item-text;
          .ivu-icon {
            top: 55%;
          }
          &:hover {
            color: @input-drawdown-item-text-hover;
            background: @input-drawdown-item-bg-hover;
          }
          &.ivu-cascader-menu-item-active {
            color: @input-drawdown-item-text-active;
            background: @input-drawdown-item-bg-active;
          }
          &.ivu-cascader-menu-item-disabled {
            color: @input-drawdown-item-text-disabled;
          }
        }
      }
      // 暂无匹配数据
      .ivu-cascader-not-found-tip {
        padding: 5px 10px;
      }
    }
  }
}
&.back-stage {
  /deep/.ivu-cascader {
    // 输入框
    .ivu-cascader-rel {
      .ivu-input-wrapper {
        .ivu-input {
          .input-view-b();
        }
      }
    }
    // 下拉框
    .ivu-select-dropdown {
      .input-drawdown-view-b();
      // 级联菜单
      .ivu-cascader-menu {
      }
      // 暂无匹配数据
      .ivu-cascader-not-found-tip {
      }
    }
  }
}
</style>