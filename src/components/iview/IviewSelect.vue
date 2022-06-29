<template>
  <div :class="['i-select', { 'back-stage': backStage }]">
    <InputLabel
      v-if="label"
      :text="label"
      :required="required"
      :backStage="backStage"
    />
    <Select
      v-bind="$attrs"
      v-on="$listeners"
      :class="[fz]"
      :style="selectStyle"
    >
      <Option
        v-for="(item, index) in optionList"
        :value="item.value"
        :key="index"
        :disabled="item.disabled"
        >{{ item.label }}</Option
      >
      <slot name="prefix" slot="prefix"></slot>
    </Select>
  </div>
</template>

<script>
import { inputMixin } from "./mixin/inputMixin";
// Iview Select组件使用v-model时，绑定的是value
// 需要同时拿到label和value时，需要使用label-in-value和@on-change事件
// @group iview
export default {
  name: "IviewSelect",
  mixins: [inputMixin],
  // components: { InputLabel },
  // 自定义props，其余props和iview官方API保持一致
  props: {
    // 下拉选项
    optionList: {
      type: Array,
    },
    // 是否为后台管理样式
    backStage: {
      type: Boolean,
    },
    // 输入框标签
    label: {
      type: String,
    },
    // 是否必填，传入label才有效
    required: {
      type: Boolean,
    },
    // 输入框的宽度：
    // 字符串：long：400px，middle：240px，short：120px
    // 数字：单位px，自动转化为rem
    inputWidth: {
      type: [String, Number],
      default: "middle",
    },
  },
  data() {
    return {
      fz: "",
      selectStyle: {},
    };
  },
  created() {
    // console.log(this.$attrs, "$attrs");
  },
  methods: {},
  mounted() {
    if (["long", "middle", "short"].includes(this.inputWidth)) {
      this.fz = "input-" + this.inputWidth;
    } else {
      let width = parseInt(this.inputWidth);
      this.selectStyle = width ? { width: width / 16 + "rem" } : {};
    }
  },
};
</script>

<style lang="less" scoped>
@import "./config/index";
.i-select {
  .input-layout();
  /deep/.ivu-select {
    .input-text();
    .input-width();
    .ivu-select-placeholder {
      .placeholder();
    }
    &.ivu-select-disabled .ivu-select-selection {
      .ivu-select-view-disabled();
    }
    // 显示下拉时
    &.ivu-select-visible .ivu-select-selection {
      box-shadow: none;
    }
    .ivu-select-selection {
      .input-view();
      .input-height();
      span {
        line-height: @input-height;
        font-size: @base-font-size;
      }
      .ivu-select-input {
        .input-height();
        color: @text-color;
        font-size: @base-font-size;
      }

      &:hover {
        .input-view-hover();
      }

      &:focus {
        .input-view-focus();
      }
    }
    // 下拉内容
    .ivu-select-dropdown {
      .input-drawdown-view();
      .show-scroll();
      .ivu-select-item {
        height: 29px;
        line-height: 29px;
        padding-top: 0px;
        padding-bottom: 0px;

        .ivu-select-item-text ();
        &.ivu-select-item-selected {
          position: relative;
          color: @input-drawdown-item-text-active;
          background: @input-drawdown-item-bg-active;
          font-weight: bold;

          &:hover {
            color: @input-drawdown-item-text-active;
          }

          // &::after {
          //   content: "\F177";
          //   position: absolute;
          //   right: 10px;
          //   top: 50%;
          //   transform: translate(0, -50%);
          //   // width: 10px;
          //   // height: 8px;
          // }
        }

        &.ivu-select-item-disabled {
          color: @input-drawdown-item-text-disabled;
        }

        &:hover {
          background: @input-drawdown-item-bg-hover;
        }
      }
    }

    // 多选
    &.ivu-select-multiple {
      .ivu-tag {
        margin: 0px;
        margin-right: 10px;
        margin-bottom: 3px;
        padding: 0px 20px 0 10px;
        height: 24px;
        // max-width: 100px;
      }
      .ivu-tag.ivu-tag-checked {
        // border: 1px solid rgba(200, 200, 200, 0.2);
        // background: rgba(100, 100, 100, 0.2);
        background: #ffffff;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        .ivu-tag-text {
          color: #333333;
          line-height: 24px;
          font-size: 14px;
          margin-right: 5px;
        }

        .ivu-icon {
          color: rgba(27, 69, 183, .49);
          font-size: 12px;
          right: 4px;
          top: 50%;
          transform: translate(0, -50%);
        }
        .ivu-icon-ios-close:before {
          content: "\f177";
        }
        // // 除了第一个，其他隐藏
        // &:not(:first-child) {
        //   display: none;
        // }
        // // 第一个
        // &:first-child::after {
        //   // content: attr();
        //   position: absolute;
        //   right: -24px;
        //   .circle(20px);
        //   .bg(red);
        // }
      }
      .ivu-select-input {
        line-height: 32px;
        height: 32px;
        top: 0;
      }
    }
  }
}
// 后台样式，前后台尺寸基本一致，只有颜色区别
&.back-stage {
  /deep/.ivu-select {
    .ivu-select-selection {
      .input-view-b();
    }
    .ivu-select-dropdown {
      .input-drawdown-view-b();
    }
  }
}
</style>