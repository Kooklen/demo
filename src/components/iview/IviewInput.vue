<template>
  <div :class="['i-input', {'back-stage': backStage, 'large': large, 'small': type == 'number'}]" :style="{'align-items': verticalAlign}">
    <InputLabel v-if="label" :text="label" :required="required" :backStage="backStage" />
    <template>
      <Input
        v-bind="$attrs"
        v-on="$listeners"
        :type="type"
        :class="[cls]"
        :style="style"
        :placeholder="placeholder"
      >
        <span slot="prepend" v-if="prepend">{{ prepend }}</span>
        <span slot="append" v-if="append">{{ append }}</span>
        <slot name="prepend" slot="prepend"></slot>
        <slot name="append" slot="append"></slot>
        <slot name="prefix" slot="prefix"></slot>
        <slot name="suffix" slot="suffix"></slot>
      </Input>
    </template>
  </div>
</template>

<script>
import { inputMixin } from "./mixin/inputMixin";
// @group iview
export default {
  name: "IviewInput",
  mixins: [inputMixin],
  // components: { InputLabel },
  props: {
    backStage: {
      type: Boolean
    },
    placeholder: {
      type: String,
      default: "请输入..."
    },
    // iview官方api没有该props，可代替 slot prepend 使用
    prepend: {
      type: String
    },
    // iview官方api没有该props，可代替 slot append 使用
    append: {
      type: String
    },
    // 输入框标签，不传时没有标签
    label: {
      type: String
    },
    /**
     * 标签垂直对齐方式，通常是textarea输入框时标签需要置于输入框顶部
     * 可选：top、bottom、center（默认）
     */
    labelVerticalAlign: {
      type: String
    },
    // 是否必填，传入label时才有效
    required: {
      type: Boolean
    },
    type: {
      type: String,
      default: "text"
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    // label垂直对齐方式，默认是center
    verticalAlign() {
      switch (this.labelVerticalAlign) {
        case "top":
          return "flex-start";
        case "bottom":
          return "flex-end";
        case "center":
          return "center";
        default:
          return this.type === "textarea" ? "flex-start" : "center";
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "./config/index";
.i-input {
  .input-layout();
  &.small {
    width: 120px;
  }
  /deep/.ivu-input-wrapper {
    .input-width();
    // 修复输入框图标垂直不居中问题
    .ivu-input-suffix i {
      line-height: @input-height;
    }
    .ivu-input {
      .input-view();
      .input-text();
      .input-height();
      
      &.ivu-input-disabled {
        .input-view-disabled();
      }
      &:hover {
        .input-view-hover();
      }
      &:focus {
        .input-view-focus();
      }
      .ivu-icon {
        color: #BBBBBB;
      }
    }
    textarea.ivu-input {
      height: auto;
      max-height: 300px;
      .show-scroll();
    }
    .ivu-input-group-prepend,
    .ivu-input-group-append {
      font-size: @base-font-size;
      height: @input-height;
      border: none;
      color: @input-pend-color;
      background: @input-pend-bg;
    }
    textarea,
    input {
      &::-webkit-input-placeholder {
        .placeholder();
      }
    }

    textarea,
    input {
      ::-moz-placeholder {
        .placeholder();
        /* Mozilla Firefox 19+ */
      }
    }

    textarea,
    input {
      :-ms-input-placeholder {
        .placeholder();
        /* Internet Explorer 10-11 */
      }
    }
    .ivu-input-icon {
      height: @input-height;
      line-height: @input-height;
    }
  }
}
</style>
