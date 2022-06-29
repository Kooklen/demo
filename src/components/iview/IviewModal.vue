<template>
  <div
    :class="['iview-modal', 'modal-' + (type === 'confirm' ? 'small' : size)]"
  >
    <Modal
      v-bind="$attrs"
      v-on="$listeners"
      width="auto"
      :mask-closable="maskClosable"
      :transfer="transfer"
      :closable="closable"
    >
      <slot>
        <div v-if="type === 'confirm'" class="confirm-text-wrap">
          <div class="icon"></div>
          <div class="con">
            <div class="confirm-text-1">
              {{ confirmText1 ? confirmText1 : "确认" }}
            </div>
            <div class="confirm-text-2">{{ confirmText2 }}</div>
          </div>
        </div>
      </slot>
      <slot name="header" slot="header"></slot>
      <!--      <slot name="footer" slot="footer" v-if="type === 'confirm'">-->
      <!--        <IviewButton cus-type="danger" @click="handleConfirm">{{ okText }}</IviewButton>-->
      <!--        <IviewButton cus-type="secondary" @click="handleCancel">{{ cancalText }}</IviewButton>-->
      <!--      </slot>-->
      <slot name="footer" slot="footer">
        <IviewButton cus-type="secondary" @click="handleCancel">{{
          cancalText
        }}</IviewButton>
        <IviewButton cus-type="primary" @click="handleConfirm">{{
          okText
        }}</IviewButton>
      </slot>
      <slot name="close" slot="close">
        <Icon type="ios-close-circle" size="20" />
      </slot>
    </Modal>
  </div>
</template>

<script>
import IviewButton from "./IviewButton";
// @group iview
export default {
  name: "IviewModal",
  components: {
    IviewButton,
  },
  props: {
    // 弹窗大小
    size: {
      type: String,
      default: "middle",
    },
    // 把默认值设置为auto，宽度由内容撑开
    // 不建议直接设置width的值
    width: {
      type: [String, Number],
      default: "auto",
    },
    // 设置默认不允许点击遮罩层关闭
    maskClosable: {
      type: Boolean,
      default: false,
    },
    // 设置loading为true，监听on-ok事件手动关闭弹窗，用于校验表单（iview默认会自动关闭弹窗）
    // loading: {
    //   type: Boolean,
    //   default: true
    // },
    // modal是否置于body标签里，设置false，否则设置样式无效
    transfer: {
      type: Boolean,
      default: false,
    },
    okText: {
      type: String,
      default: "确认",
    },
    cancalText: {
      type: String,
      default: "取消",
    },
    // 自定义类型（目前只有confirm）
    type: {
      type: String,
      default: "default",
    },
    // type为confirm时
    confirmText1: {
      type: String,
      default: "",
    },
    // type为confirm时
    confirmText2: {
      type: String,
      default: "是否继续进行删除操作？",
    },
    // type为confirm时默认关闭
    closable: {
      type: Boolean,
      default: function () {
        // console.log("this", this);
        return this.type !== "confirm";
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 取消按钮
    handleCancel() {
      // 跟Iview原本的on-cancel不一样，需要手动关闭弹窗
      // this.$attrs.value = false;
      this.$emit("on-cancel");
    },
    // 确认按钮
    handleConfirm() {
      // 跟Iview原本的on-ok不一样，需要手动关闭弹窗
      this.$emit("on-ok");
    },
  },
};
</script>

<style lang='less' scoped>
@import "./config/index";
.iview-modal {
  /* 尺寸 */
  &.modal-slarge {
    /deep/.ivu-modal-wrap .ivu-modal {
      width: 1650px;
      height: 800px;

      .ivu-modal-body {
        .border-box();
        margin: 10px 20px;
        height: 770px;
      }
    }
  }

  &.modal-large {
    /deep/.ivu-modal-wrap .ivu-modal {
      width: 1300px;
      height: 900px;

      .ivu-modal-body {
        .border-box();
        margin: 10px 20px;
        height: 770px;
      }
    }
  }

  &.modal-middle {
    /deep/.ivu-modal-wrap .ivu-modal {
      width: 680px;
      height: 600px;
    }
  }

  &.modal-small {
    /deep/.ivu-modal-wrap {
      align-items: flex-start;
      top: 225px;
      .ivu-modal {
        width: 680px;
        height: 340px;
      }
    }
  }

  // 全局修改modal样式
  /deep/.ivu-modal-mask {
    background: rgba(0, 0, 0, 0.3);
  }

  // 全局修改modal样式
  /deep/.ivu-modal-wrap {
    .border-box();
    .flex-center();

    .ivu-modal {
      background: #ffffff;
      box-shadow: 10px 10px 20px 0 rgba(53, 55, 74, 0.3), 0 2px 8px 0 #a8a8d8;
      border-radius: 6px;
      top: 0 !important;

      .ivu-modal-content {
        position: relative;
        height: 100%;

        .ivu-modal-close {
          right: 30px;
          .ivu-icon {
            color: #9a9cbe;
            .flex-center();

            &:hover {
              /*color: rgba(255, 255, 255, 0.5);*/
            }
          }
        }

        /* 内容部分 */
        .ivu-modal-body {
          height: calc(100% - 95px);
          .show-scroll();

          & > div:not(.i-form) {
            width: 100%;
          }
          // type为confirm时
          .confirm-text-wrap {
            padding: 60px 0;
            .flex-center();
            align-items: flex-start;

            .icon {
              width: 51px;
              height: 51px;
              background: url("~_img/common/icon-tip.png") no-repeat;
              background-size: 100% 100%;
              flex-shrink: 0;
            }
            .con {
              width: auto;
              // flex-basis: 430px;
              min-width: 200px;
              max-width: 450px;
              .flex-column();
              margin-left: 15px;
            }
            .confirm-text-1 {
              color: rgba(0, 0, 0, 0.65);
              font-size: 18px;
              font-weight: 600;
            }
            .confirm-text-2 {
              font-weight: 400;
              color: #595b5f;
              font-size: 14px;
            }
          }
        }

        /* 头部 */
        .ivu-modal-header {
          width: auto;
          height: 44px;
          background: linear-gradient(
            180deg,
            #f1f4fa 0%,
            #dfe6f3 91%,
            #d4e2ff 100%
          );
          box-shadow: inset 0px 2px 3px 2px #f1f2fd;
          border-radius: 6px 6px 0px 0px;
          padding: 0 39px 0 31px;
          .flex-center();

          .ivu-modal-header-inner {
            font-size: 16px;
            color: #515cf3;
            .flex-center();
            justify-content: flex-start;

            &::before {
              content: "";
              display: inline-block;
              width: 23px;
              height: 21px;
              margin-right: 9px;
              background: url(~_img/app-left/menu_active.png) no-repeat;
              background-size: contain;
            }
          }
        }

        /* 尾部 */
        .ivu-modal-footer {
          width: calc(100% - 80px);
          margin: 0 40px;
          padding: 20px 0;
          .flex-center();
          position: absolute;
          bottom: 0;
          border-top: 2px solid #f4f6fa;

          &::before {
            content: "";
            display: block;
            width: 100%;
            height: 2px;
            background: #f4f6fa;
            position: absolute;
            top: 0;
          }
        }
      }
    }
  }
}
</style>