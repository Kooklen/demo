<template>
  <div class="i-button-group">
    <InputLabel v-if="label" :text="label" :required="required" :backStage="backStage" />
    <ButtonGroup>
      <Button
        v-for="item of optionList"
        :key="item.value"
        @click="handleClick(item)"
        :style="btnStyle"
        :class="{active: activeValue === item.value, 'inner-shadow': activeInnerShadow}"
        :disabled="item.disabled"
      >
        <span v-if="directiveStatus" v-aqi>{{ item.label }}</span>
        <span v-else>{{ item.label }}</span>
      </Button>
    </ButtonGroup>
  </div>
</template>

<script>
import InputLabel from "./InputLabel";
// @group iview
export default {
  name: "IviewButtonGroup",
  components: {
    InputLabel
  },
  props: {
    /**
     * 传入按钮组数据
     * 例子：[{label: 'label', value: 'value', disabled: true}]
     * 或者：['val1', 'val2', 'val3', 'val4']
     */
    dataList: {
      type: Array
    },
    // 是否返回整个对象，默认值返回value
    labelInValue: {
      type: Boolean
    },
    /**
     * 按钮宽度(一般来说，UI要求的按钮宽度一致，即使按钮内文本不一样)
     * 不传该参数的话用padding撑开按钮
     */
    btnWidth: {
      type: [Number, String]
    },
    // 激活按钮是否带内发光，根据UI样式
    activeInnerShadow: {
      type: Boolean
    },
    // 是否为后台样式
    backStage: {
      type: Boolean,
      default: true
    },
    // 是否使用v-aqi指令
    directiveStatus: {
      type: Boolean
    },
    label: {
      type: String
    },
    required: {
      type: Boolean
    }
  },
  data() {
    return {
      activeValue: ""
    };
  },
  computed: {
    btnStyle() {
      let ret = {};
      if (this.btnWidth) {
        ret.width = this.btnWidth / 16 + "rem";
        ret.padding = 0;
      }
      return ret;
    },
    optionList() {
      if (["string", "number", "boolean"].includes(typeof this.dataList[0])) {
        return this.dataList.map(item => {
          return {
            label: item,
            value: item
          };
        });
      }
      return this.dataList;
    }
  },
  watch: {
    optionList: {
      handler(n) {
        if (n && n[0]) {
          this.handleClick(n[0]);
        }
      },
      deep: true
    }
  },
  methods: {
    // @on-click事件
    handleClick(item) {
      // 所选项是否改变
      let hasChanged = this.activeValue !== item.value;
      let value = this.labelInValue ? item : item.value;

      // 所选项改变时会触发on-change事件
      if (hasChanged) {
        this.activeValue = item.value;
        this.$emit("on-change", value);
      }

      // 无论是否改变都会触发on-click事件
      this.$emit("on-click", value);
    }
  },
  mounted() {
    this.activeValue = this.optionList[0] && this.optionList[0].value;
  }
};
</script>

<style lang='less' scoped>
@import "./config/index";
@borderColor: #345160;
@bgColor: #1a9183;
.i-button-group {
  .input-layout();
  .ivu-btn-group {
    display: flex;
    .ivu-btn {
      .input-view();
      .btn-height();
      .btn-text();
      padding: 0 12px;
      &:hover {
        // background: lighten(@inputBgColor, 10%);
        color: lighten(@btn-color, 10%);
        border-color: @text-color-active;
        // border-color: lighten(@borderColor, 10%);
      }
      &:active {
        background: darken(@bg-color, 3%);
        color: darken(@btn-color, 3%);
        border-color: @text-color-active;
        // border-color: darken(@borderColor, 10%);
      }
      &:focus {
        box-shadow: none;
      }
      &.active {
        border-color: @bgColor;
        color: #ffffff;
        background: @bgColor;
        z-index: 2;
        &.inner-shadow {
          box-shadow: 0 0 0.3125rem @bgColor inset;
        }
      }
    }
  }
}
</style>