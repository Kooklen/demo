<template>
  <!--
    按钮点击事件
    @event on-click
  -->
  <div
    :class="['i-button', cusType ? 'btn-custom' : '', 'btn-' + cusType]"
    @click="$emit('on-click')"
  >
    <Button
      :class="[{ dis: dis }]"
      v-bind="$attrs"
      v-on="$listeners"
      :style="btnStyle"
      :disabled="dis"
    >
      <i v-if="iconfont" :class="['iconfont', iconfont]"></i>
      <!--
        @slot 按钮文本
      -->
      <slot>按钮</slot>
    </Button>
  </div>
</template>

<script>
import { Button } from "iview";
// 该组件只包含常规按钮，主要有前后台各4种按钮：【主要按钮】、【次要按钮】、【警示按钮】、【禁用按钮】，上传、下载、导出等按钮可用【次要按钮】
// @group iview
export default {
  name: "IviewButton",
  components: { Button },
  props: {
    /**
     * 按钮类型
     * @values primary|secondary
     *  |danger
     */
    cusType: {
      type: String,
      default: "primary",
    },
    // 是否禁用状态
    dis: {
      type: Boolean,
      default: false,
    },
    /**
     * 按钮宽度【新】，不传时按钮由padding撑开
     */
    btnWidth: {
      type: [String, Number],
    },
    /**
     * 自定义icon，
     * 只支持传入iconfont的class字符串，
     * iview button 本身的icon参数仍支持使用
     */
    iconfont: {
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {
    btnStyle() {
      let ret = {};
      if (this.btnWidth) {
        ret.width = this.btnWidth / 16 + "rem";
        ret.padding = 0;
        ret.minWidth = 0;
      }
      return ret;
    },
  },
};
</script>

<style lang='less' scoped>
@import "./config/index";
.i-button {
  display: inline-block;
  // margin: 0 10px;
  // 代替上一行代码的作用
  // 当两个IviewButton相邻时，自动给右侧的加上margin-left
  + .i-button {
    margin-left: 20px;
  }
  .ivu-btn {
    .btn-height();
    padding: 0 24px;
    min-width: 80px;
    border: none;
    .flex-center();
    // button自带的icon
    /deep/.ivu-icon {
      font-size: 20px;
      line-height: unset;
      + span {
        margin-left: 0;
      }
    }
    /deep/i {
      margin-right: 6px;
    }
    // 自定义icon（iconfont）
    .iconfont {
      margin-right: 4px;
    }
  }

  &.btn-primary {
    .ivu-btn {
      .btn-primary-f();
    }
  }
  &.btn-secondary {
    .ivu-btn {
      .btn-secondary-f();
    }
  }
  &.btn-danger {
    .ivu-btn {
      .btn-danger-f();
    }
  }

  .ivu-btn.dis {
    .btn-disabled-f();
  }

  &.btn-custom {
    .ivu-btn {
      .btn-text();
      &:focus {
        box-shadow: none;
      }
    }
  }
  // &.btn-upload {
  //   .ivu-btn {
  //     .btn-upload-f();
  //   }
  // }
}
</style>

<docs>
```vue
<template>
  <div>
    <h3>示例1:前台样式按钮</h3>
    <div style="background: #262b2d; padding: 20px; margin-bottom: 20px">
      <IviewButton>primary</IviewButton>
      <IviewButton cusType="secondary">secondary</IviewButton>
      <IviewButton cusType="disabled">disabled</IviewButton>
      <IviewButton cusType="danger">danger</IviewButton>
    </div>
    <h3>示例2:后台样式按钮</h3>
    <div style="background: #262b2d; padding: 20px">
      <IviewButton back-stage>primary</IviewButton>
      <IviewButton back-stage cusType="secondary">secondary</IviewButton>
      <IviewButton back-stage cusType="disabled">disabled</IviewButton>
      <IviewButton back-stage cusType="danger">danger</IviewButton>
    </div>
  </div>
</template>

<script>
import "iview/dist/styles/iview.css";
export default {};
</script>
```
</docs>