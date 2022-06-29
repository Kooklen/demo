<template>
  <div class="i-page" :class="['align-' + align, { 'back-stage': backStage }]">
    <Page
      v-bind="$attrs"
      v-on="$listeners"
      :show-total="showTotal"
      :show-elevator="showElevator"
      :show-sizer="showSizer"
      @on-change="handleChange"
      @on-page-size-change="handlePageSizeChange"
      :size="size"
    />
  </div>
</template>

<script>
import { debounce } from "_u/tool";

// @group iview
export default {
  name: "IviewPage",
  props: {
    // 说明：是否使用后台样式，不传默认是不使用
    // 用法：<IviewPage back-stage></IviewPage>
    backStage: {
      type: Boolean,
    },
    // 说明：pager的位置，默认右下角
    // 可选：right，center，left
    // 用法：<IviewPage align="right"></IviewPage>
    align: {
      type: String,
      default: "center",
    },
    // iview中show-total，show-elevator，show-sizer默认为false
    // 环保项目默认都设置为true，仍可通过传入props修改，用法与官网API相同（注意：在vue模板中，props传参使用show-total和showTotal效果是一样的）
    showTotal: {
      type: Boolean,
      default: false,
    },
    showElevator: {
      type: Boolean,
      default: true,
    },
    showSizer: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "default",
    },
  },
  data() {
    return {
      selfPage: {
        pageNum: 1,
        pageSize: 10,
      }, // M默认事件
    };
  },
  mounted() {
    console.log(this.$attrs, 'attrs')
  },
  methods: {
    // 劫持 on-change 事件
    handleChange(e) {
      this.selfPage.pageNum = e;
      this.$emit("on-change", e); //
      this.handlePageChange();
    },
    // 劫持 on-page-size-change 事件
    handlePageSizeChange(e) {
      this.selfPage.pageSize = e;
      this.$emit("on-page-size-change", e);
      this.handlePageChange();
    },
    // 添加 on-page-change 事件
    handlePageChange: debounce(function () {
      this.$emit("on-page-change", this.selfPage);
    }, 200),
  },
};
</script>

<style lang="less" scoped>
@import "./config/index";
// item 样式
.item {
  .page-box-view();
  color: @page-text-color;
  min-width: @page-size;
  height: @page-size;
  line-height: @page-size;
  border-radius: 3px;
}
// 这里不使用iview-page的原因是已有全局的iview-page样式
.i-page {
  display: flex;
  align-items: center;
  &.align-center {
    justify-content: center;
  }
  &.align-left {
    justify-content: flex-start;
  }
  &.align-right {
    justify-content: flex-end;
  }
  /deep/.ivu-page {
    color: @page-text-color;
    font-size: @page-font-size;
    // 共xx页
    .ivu-page-total {
    }
    // 上一页、下一页
    .ivu-page-prev,
    .ivu-page-next {
      .item();
      a {
        position: relative;
        top: -3px;
      }
      &:not(.ivu-page-disabled):hover {
        .page-box-view-hover();
        a {
          color: @page-text-color-hover;
        }
      }
    }
    // 页码
    .ivu-page-item {
      .item();
      a {
        color: @page-text-color;
      }
      &:hover {
        .page-box-view-hover();
        a {
          color: @page-text-color-hover;
        }
      }
      &.ivu-page-item-active {
        .page-box-view-active();
        a {
          color: @page-text-color-active;
        }
      }
    }
    // page选项
    .ivu-page-options {
      // xx条/页
      .ivu-page-options-sizer {
        .ivu-select {
          .ivu-select-selection {
            .item();
            .ivu-select-selected-value {
              // font-size: 14px;
            }
          }
          .ivu-select-dropdown {
            .input-drawdown-view();
            left: auto !important; // page下拉框初次显示时会有问题
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
      // 跳至xx页
      .ivu-page-options-elevator {
        input {
          .item();
          text-align: center;
        }
      }
    }
    // 省略号？
    .ivu-page-item-jump-prev:after,
    .ivu-page-item-jump-next:after {
      color: @page-text-color;
    }
    // 禁用
    .ivu-page-disabled {
      .page-box-view-disabled();
      a {
        color: fade(@page-text-color, 20%);
      }
    }
    // 简洁 分页
    &.ivu-page-simple {
      .ivu-page-simple-pager input {
        background: transparent;
        border: none;
        color: @page-text-color;
        margin: 0;
        text-align: right;
        padding: 0;
      }
      .ivu-page-next {
        margin-left: 16px;
      }
    }

    // small 模式
    &.mini {
      .ivu-page-prev,
      .ivu-page-next {
        .page-box-view-mini();
        color: #676f69;
        background: transparent;

        i {
          font-size: 14px;
        }
      }
      .ivu-page-disabled {
        background: transparent;
        color: #000;
      }

      .ivu-page-item {
        min-width: 22px;
        line-height: 22px;
        height: 22px;
        border: none;
        background: transparent;
        box-shadow: none;
        a {
          color: #676f69;
        }

        &:hover {
          .page-box-view-hover-mini();
        }
        &.ivu-page-item-active {
          .page-box-view-active-mini;
        }
      }
    }
  }
}
// 后台样式，基本只有颜色的区别
&.back-stage {
  /deep/.ivu-page {
    .ivu-page-total {
    }
    .ivu-page-prev:not(.ivu-page-disabled),
    .ivu-page-next:not(.ivu-page-disabled),
    .ivu-page-item {
      .page-box-view-b();
      a {
        color: @page-text-color;
      }
      &:hover,
      &.ivu-page-item-active {
      }
    }
    // page选项
    .ivu-page-options {
      // xx条/页
      .ivu-page-options-sizer {
        .ivu-select {
          .ivu-select-selection {
            .page-box-view-b();
            .ivu-select-selected-value {
            }
          }
          .ivu-select-dropdown {
            .input-drawdown-view-b();
          }
        }
      }
      // 跳至xx页
      .ivu-page-options-elevator {
        input {
          .page-box-view-b();
        }
      }
    }
    // 禁用
    .ivu-page-disabled {
      .page-box-view-disabled();
      a {
        color: fade(@page-text-color, 20%);
      }
    }
  }
}
</style>
