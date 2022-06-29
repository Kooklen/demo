<template>
  <div
    :class="['i-table', { 'back-stage': backStage, 'label-table': label }]"
    ref="iTable"
  >
    <Table
      v-bind="$attrs"
      v-on="tableListeners"
      :border="border"
      :class="[
        'vertical-align-' + verticalAlign,
        'scroll-' + scroll,
        { 'has-border': border },
      ]"
      ref="iviewTable"
    >
      <template v-for="item of slotList" :slot="item.slot" slot-scope="params">
        <slot :name="item.slot" v-bind="params"></slot>
      </template>
    </Table>
    <IviewPage
      v-if="page"
      v-bind="page"
      v-on="pageListeners"
      :back-stage="backStage"
      show-total
    />
  </div>
</template>
<script>
import { createElm, queryElm } from "_u/dom";
import IviewPage from "./IviewPage";
// @group iview
export default {
  name: "IviewTable11",
  components: {
    IviewPage,
  },
  props: {
    backStage: {
      type: Boolean,
    },
    // 设置默认带边框【大多数情况】
    border: {
      type: Boolean,
      default: true,
    },
    // 表格内容垂直方向对齐方式
    // 可选middle（不填也能达到同样效果）、top、bottom
    verticalAlign: {
      type: String,
      default: "middle",
    },
    // 出现滚动条的方向，默认只在y轴出现
    // 可选参数：x/y/xy
    // 使y轴出现滚动条还需要在使用IviewTable组件的文件中设置.ivu-table-table的高度
    scroll: {
      type: String,
      default: "y",
    },
    // 计算高度
    calcHeight: {
      type: String,
    },
    /**
     * 传入该参数时自动引用IviewPage
     * 该参数是IviewPage的props属性对象集合
     */
    page: {
      type: Object,
    },
    label: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 随机属性
      randomAttr: "",
      tableListeners: {},
      pageListeners: {},
      tablePage: {},
    };
  },
  watch: {},
  computed: {
    // 获取slot列表
    slotList() {
      return (
        this.$attrs &&
        this.$attrs.columns.filter((col) => {
          return col.slot;
        })
      );
    },
    // height() {
    //   let ret = "";
    //   if (this.calcHeight) {
    //   }
    //   return ret;
    // }
  },
  methods: {
    // 修复出现滚顶条时表头表体不对齐的bug
    fixBody() {
      this.$nextTick(() => {
        // table body
        let table = queryElm(`[${this.randomAttr}] .ivu-table-body`);
        let tbody = queryElm(
          `[${this.randomAttr}] .ivu-table-body .ivu-table-tbody`
        );

        // 是否显示滚动条
        let showScrollY = false;
        let showScrollX = false;
        if (tbody.offsetHeight && table.offsetHeight) {
          showScrollY = tbody.offsetHeight >= table.offsetHeight;
        }
        if (tbody.offsetWidth && table.offsetWidth) {
          showScrollX = tbody.offsetWidth >= table.offsetWidth;
        }

        // 是否需要添加gutter
        let needGutter = showScrollY && showScrollX;

        // table header
        let headerTr = queryElm(
          `[${this.randomAttr}] .ivu-table-header table tr`
        );
        let gutter = queryElm(
          `[${this.randomAttr}] .ivu-table-header table tr th.gutter`
        );
        if (needGutter && !gutter) {
          let th = createElm("th");
          th.setAttribute("class", "gutter");
          th.width = "17px";
          headerTr.appendChild(th);
        } else if (!needGutter && gutter) {
          headerTr.removeChild(gutter);
        }
      });
    },
    // 初始化事件
    initEvent() {
      // 将IviewPage的事件分离出来
      if (this.page) {
        // console.log(this.$listeners, "listeners");
        let pageEvents = ["on-change", "on-page-size-change", "on-page-change"];
        let tableListeners = { ...this.$listeners };
        let pageListeners = {};
        pageEvents.forEach((key) => {
          if (tableListeners[key]) {
            pageListeners[key] = tableListeners[key];
            delete tableListeners[key];
          }
        });
        this.tableListeners = tableListeners;
        this.pageListeners = pageListeners;
      } else {
        this.tableListeners = this.$listeners;
      }
    },
  },
  created() {
    this.initEvent();
  },
  mounted() {
    /**
     * 给IviewTable根标签添加随机的attr
     * 使得fixBody只作用于本组件内的表格
     */
    this.randomAttr = "i-table-" + String(Math.random()).slice(2);
    this.$refs.iTable.setAttribute(this.randomAttr, "");

    // 监听页面rezise事件
    window.addEventListener("resize", this.fixBody);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", this.fixBody);
    });
  },
  // 数据更新
  updated() {
    this.fixBody();
  },
};
</script>

<style lang="less" scoped>
@import "./config/index";
.i-table {
  height: calc(100vh - 266px);
  /*height: calc(100% - 46px);*/
  position: relative;
  /deep/.ivu-table-wrapper {
    // height: 100%;
    border: none;
    min-width: 0px;

    // 不带边框的表格
    .ivu-table {
      font-size: @t-body-text-size;
      color: @t-body-text-color;
      background: none;
      &:before {
        background: transparent;
      }
      &:after {
        background: transparent;
      }
      // 表头
      .ivu-table-header {
        th {
          background: @t-header-bg;
          border: none;
          color: @t-header-text-color;
          height: 46px;
          padding: 8px 0;
        }
      }
      // .ivu-table-body 表格内容
      .ivu-table-body {
        max-height: calc(100vh - 360px);
        /*max-height: 586px;*/
        /*max-height: 686px;*/
        .show-scroll-table-xy();
        td {
          background: transparent;
          border-color: transparent;
          color: @t-body-text-color;
          height: 58px;
          padding: 12px 0;
        }
        // td背景设置透明后，再设置tr
        tr:nth-child(odd) {
          background: @t-bg-odd;
        }
        tr:nth-child(even) {
          background: @t-bg-even;
        }
      }
      // 多选checkoutbox
      .ivu-table-cell {
        /*display: inline-block;*/
        &.ivu-table-cell-with-selection {
          .ivu-checkbox {
            width: 16px;
            height: 16px;
            border-radius: 4px;
            overflow: hidden;
            .flex-center();

            &:hover .ivu-checkbox-inner {
              border-color: @color-primary;
            }

            .ivu-checkbox-inner {
              border: 1px solid #d9d9d9;
              width: 16px;
              height: 16px;
              border-radius: 4px;
              .flex-center();

              &::after {
                /*content: none;*/
                top: 2px;
                left: 5px;
              }
            }

            &.ivu-checkbox-checked {
              .ivu-checkbox-inner {
                border-color: @color-primary;
                background: @color-primary;
              }
            }
          }
        }
      }
      // 数据为空时
      .ivu-table-tip {
        display: flex;
        align-items: center;
        overflow: hidden;
        td {
          color: @t-header-text-color;
          border: none;
          background: transparent;
        }
      }

      .dataVersionModal_progress {
        /*padding: 0 10px;*/
        .flex-center();
        .ivu-progress {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          .ivu-progress-outer {
            margin-right: 0px;
            padding-right: 10px;
            .ivu-progress-inner {
              border-radius: 4px;
              .ivu-progress-bg {
                background: rgba(81, 92, 243, 1);
              }
            }
          }
        }
        .d_p_text {
          flex-basis: 40%;
          flex-shrink: 0;
          text-align: left;
          font-size: 14px;
          font-weight: 400;
          color: #2c3542;
          // line-height: 22px;
        }
      }

      .i-status {
        /*display: inline-block;*/
        height: 20px;
        padding: 0 8px;
        border-radius: 2px;
        cursor: pointer;
        //.flex-center();
        width: max-content;
        font-size: 12px;
        margin-right: 6px;

        &.i-status-ing,
        &.i-status-training {
          color: #515cf3;
          background: #eff0ff;
          border: 1px solid #d1d4ff;
        }

        &.i-status-building {
          background: #eff5ff;
          color: #3882fa;
          border: 1px solid #ccdffc;
        }

        &.i-status-success {
          background: #e7fbfa;
          color: #0abbad;
          border: 1px solid #afe6e2;
        }

        &.i-status-fail {
          background: #ffeaea;
          color: #cf4848;
          border: 1px solid #fec6c6;
        }
      }
      .i-state {
        .flex-center();

        &::before {
          content: "";
          width: 14px;
          background-size: 100% !important;
          background-repeat: no-repeat !important;
          margin-right: 5px;
        }

        // &.i-status-be-release::before {
        //   height: 16px;
        //   background: url("~_img/common/be-release.png");
        // }

        // &.i-status-published::before {
        //   height: 14px;
        //   background: url("~_img/common/published.png");
        // }
      }
      .ivu-tooltip {
        &:not(:first-child) {
          margin-left: 18px;
        }
      }
      .node {
        color: #2c46b5;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .i-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-size: 100% 100% !important;
        background-repeat: no-repeat !important;
        cursor: pointer;

        // &.i-close {
        //   width: 17px;
        //   height: 17px;
        //   background: url("~_img/annotation/close.png") no-repeat;
        // }

      }
      // .ivu-table 带边框的表格
      &.ivu-table-border {
        &:before,
        &:after {
          background: @t-border-color;
          &:before {
            width: 0;
            height: 0;
          }
        }
        th {
          border-color: @t-border-color;
        }
        td {
          border-width: 0;
          border-right: 1px solid;
          border-color: @t-body-border-color;
        }
      }
    }
    // .ivu-table-wrapper 带边框的
    &.has-border {
      border: 1px solid @t-border-color;
      border-right: 0;
      /*border-bottom: 0;*/
      .ivu-table-header {
        th {
          border-bottom: 1px solid @t-border-color;
        }
      }
    }
    // 表格内容垂直方向的对齐方式（默认是middle，无需设置）
    &.vertical-align-top {
      .ivu-table-body {
        td {
          vertical-align: top;
        }
      }
    }
    &.vertical-align-bottom {
      .ivu-table-body {
        td {
          vertical-align: bottom;
        }
      }
    }
    // 滚动条方向
    &.scroll-x {
      /deep/.ivu-table-body,
      /deep/.ivu-table-tip {
        .show-scroll-table-x;
      }
    }
    &.scroll-y {
      /deep/.ivu-table-body,
      /deep/.ivu-table-tip {
        .show-scroll-table-y;
      }
    }
    &.scroll-xy {
      /deep/.ivu-table-body,
      /deep/.ivu-table-tip {
        .show-scroll-table-xy;
      }
    }
  }
  .i-page {
    /*margin-top: 30px;*/
    position: absolute;
    bottom: 0;
    right: 0;
    .flex-center();
    justify-content: flex-end;
  }
}
&.label-table {
  /deep/.ivu-table-wrapper {
    .ivu-table {
      .ivu-table-row-highlight {
        border-color: #515cf3 !important;
        /*position: relative;*/
        /*background: linear-gradient(180deg, #F4F4F7 0%, #FFFFFF 100%);*/
        /*box-shadow: 0px 4px 8px 0px rgba(54, 61, 163, 0.49);*/
        box-shadow: 0 0 1px 1px #515cf3 inset;
        border-radius: 2px;

        td {
          border-color: #515cf3 !important;
        }

        /*&::after {*/
        /*  content: '';*/
        /*  width: 100%;*/
        /*  height: 1px;*/
        /*  background: #515CF3;*/
        /*  position: absolute;*/
        /*  bottom: -1px;*/
        /*  left: 0px;*/
        /*}*/

        /*td:last-child {*/
        /*  border-right: 1px solid #515CF3;*/
        /*}*/
      }
      .ivu-table-header {
        position: relative;
        th {
          height: 42px;
          background: transparent;
          border-bottom: 1px solid #c9cfff;
        }

        &::after {
          content: "";
          display: inline-block;
          width: 100%;
          height: 1px;
          background: #a1beff;
          position: absolute;
          bottom: 1px;
        }
      }

      .ivu-table-body {
        padding: 5px 0;
        tr.ivu-table-row {
          height: 36px;
          /*background: #F5F7FF !important;*/
          border-radius: 2px;
          border: 1px solid #d8e1f7;
          margin: 5px 0;

          td {
            padding: 0;
            height: 100%;
            background: #f5f7ff;
            border-color: #d8e1f7;
            margin: 5px 0;

            .ivu-table-cell {
              height: 100%;
            }
          }
        }
      }
    }
  }
}
&.back-stage {
  /deep/.ivu-table-wrapper {
    // 不带边框的表格
    .ivu-table {
      // 表头
      .ivu-table-header {
        th {
          background: @t-header-bg-b;
        }
      }
      // .ivu-table-body 表格内容
      .ivu-table-body {
        .admin-scroll-table-xy();
        // td背景设置透明后，再设置tr
        tr:nth-child(odd) {
          background: @t-bg-odd-b;
        }
        tr:nth-child(even) {
          background: @t-bg-even-b;
        }
      }
      .ivu-table-tip {
        td {
          color: #fff;
        }
      }
      // .ivu-table 带边框的表格
      &.ivu-table-border {
        &:before {
          background: @t-border-color-b;
        }
        &:after {
          background: @t-border-color-b;
        }
        th {
          border-color: @t-border-color-b;
        }
        td {
          border-color: @t-border-color-b;
        }
      }
    }
    // .ivu-table-wrapper 带边框的
    &.has-border {
      border: 1px solid @t-border-color-b;
      border-bottom: 0;
      border-right: 0;
    }
    // 滚动条方向
    &.scroll-x {
      /deep/.ivu-table-body,
      /deep/.ivu-table-tip {
        .admin-scroll-table-x;
      }
    }
    &.scroll-y {
      /deep/.ivu-table-body,
      /deep/.ivu-table-tip {
        .admin-scroll-table-y;
      }
    }
    &.scroll-xy {
      /deep/.ivu-table-body,
      /deep/.ivu-table-tip {
        .admin-scroll-table-xy;
      }
    }
  }
}
</style>
