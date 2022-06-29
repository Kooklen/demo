<template>
  <div :class="['i-select', {'back-stage': backStage}]">
    <InputLabel v-if="label" :text="label" :required="required" :backStage="backStage"/>
    <Select v-bind="$attrs" v-on="$listeners" :class="[fz]" :style="selectStyle">
      <Tag src="" slot="prefix">
        GPU
      </Tag>
      <Option
        v-for="(item,index) in optionList"
        :value="item.value"
        :key="index"
        :prefix="item.type"
        :label="item.label"
        :disabled="item.disabled"
      >
        <div>
          <div class="tag type">{{ item.type }}</div>
          {{ item.label }}
        </div>
        <div class="tag-list">
          <div class="tag" v-for="(child, j) in item.data" :key="j">
            {{ child.name }} {{ child.val }}
          </div>
        </div>
      </Option>
    </Select>
  </div>
</template>

<script>
  import {inputMixin} from "./mixin/inputMixin";
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
        type: Array
      },
      // 是否为后台管理样式
      backStage: {
        type: Boolean
      },
      // 输入框标签
      label: {
        type: String
      },
      // 是否必填，传入label才有效
      required: {
        type: Boolean
      },
      // 输入框的宽度：
      // 字符串：long：400px，middle：240px，short：120px
      // 数字：单位px，自动转化为rem
      inputWidth: {
        type: [String, Number],
        default: "middle"
      }
    },
    data() {
      return {
        fz: "",
        selectStyle: {}
      };
    },
    computed: {},
    methods: {},
    mounted() {
      if (["long", "middle", "short"].includes(this.inputWidth)) {
        this.fz = "input-" + this.inputWidth;
      } else {
        let width = parseInt(this.inputWidth);
        this.selectStyle = width ? {width: width / 16 + "rem"} : {};
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "./config/index";

  .i-select {
    .input-layout();

    /deep/ .ivu-select {
      .input-text();
      .input-width();

      .ivu-select-placeholder {
        .placeholder();
      }

      .ivu-tag {
        height: 20px;
        border-radius: 2px;
        padding: 0 8px;
        margin-right: 4px;
        background: #76B900;
        overflow: hidden;
        .flex-center();

        .ivu-tag-text {
          color: #fff;
        }
      }

      .ivu-select-item {
        .flex-column();
        width: 100%;

        & > div {
          .flex-center();
          margin-top: 2px;

          &.tag-list {
            width: 100%;
            .flex-center();
            flex-wrap: wrap;
            justify-content: flex-start;

            .tag {
              margin-top: 4px;
            }
          }

          .tag {
            height: 20px;
            border-radius: 1px;
            color: #fff;
            padding: 0 8px;
            margin-right: 4px;
            border: 1px solid #CEE2FE;
            .flex-center();

            &.type:nth-child(1) {
              background: #76B900;
              border-color: #76B900;
              color: #fff;
            }

            &:nth-child(1) {
              background: #EBF3FE;
              color: #2E81FE;
            }

            &:nth-child(2) {
              color: #722ed1;
              background: #f9f0ff;
              border-color: #d3adf7;
            }

            &:nth-child(3) {
              background: #F4FCF6;
              border-color: #D3F5DB;
              color: #37A14F;
            }

            &:nth-child(4) {
              color: #2f54eb;
              background: #f0f5ff;
              border-color: #adc6ff;
            }

            &:nth-child(5) {
              color: #2f54eb;
              background: #f0f5ff;
              border-color: #adc6ff;
            }
          }
        }
      }

      &.ivu-select-disabled .ivu-select-selection {
        .input-view-disabled();
      }

      // 显示下拉时
      &.ivu-select-visible .ivu-select-selection {
        box-shadow: none;
      }

      .ivu-select-selection {
        .input-view();
        .input-height();
        .flex-center();
        justify-content: flex-start;

        span {
          line-height: @input-height;
          font-size: @base-font-size;
        }

        .ivu-select-input {
          .input-height();
          color: @text-color;
          font-size: @base-font-size;
        }
      }

      // 下拉内容
      .ivu-select-dropdown {
        min-width: 320px;
        .input-drawdown-view();
        .show-scroll();

        .ivu-select-item {
          .input-text();

          &.ivu-select-item-selected {
            color: @input-drawdown-item-text-active;
            background: @input-drawdown-item-bg-active;
          }

          &:hover {
            color: @input-drawdown-item-text-hover;
            background: @input-drawdown-item-bg-hover;
          }

          &.ivu-select-item-disabled {
            color: @input-drawdown-item-text-disabled;
          }
        }
      }
    }
  }

  // 后台样式，前后台尺寸基本一致，只有颜色区别
  &.back-stage {
    /deep/ .ivu-select {
      .ivu-select-selection {
        .input-view-b();
      }

      .ivu-select-dropdown {
        .input-drawdown-view-b();
      }
    }
  }
</style>