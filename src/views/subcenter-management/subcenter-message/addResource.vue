<!--
    description： AI服务 - 项目详情 - 数据处理 - 训练设置
-->
<template>
  <IviewModal
    v-model="visible"
    :title="'添加公有资源'"
    @on-ok="save"
    @on-cancel="close"
    size="large"
    class="iviewModal"
  >
    <div class="content">
      <div class="content_header">
        <div class="content_header_left">
          <dialogTitle>
            <img :src="require('_img/common/title-icon-2.png')" alt="" />
            <span>选择公有资源</span>
          </dialogTitle>
          <IviewInput :placeholder="'请输入资源名称搜索'"></IviewInput>
        </div>
        <div class="content_header_right">已选资源<span>1</span>个</div>
      </div>

      <div class="content_list">
        <div v-for="(item, index) in dataList" :key="index">
          <div class="content_list_h">
            <IviewCheckbox v-model="item.isCheck"></IviewCheckbox>
            <span>{{ item.name }}</span>
          </div>
          <div class="content_list_c">
            <div class="clc_left">
              <div class="clc_label">云平台账号:</div>
              <div
                class="clc_list"
                ref="clc_list"
                :class="{ hide: !item.gaidShow }"
              >
                <div v-for="(ele, index) in item.ptzh" :key="index">
                  {{ ele }}
                </div>
              </div>
            </div>
            <div
              class="clc_action"
              @click="showMorePtzh(item)"
              v-if="countListLength(item)"
            >
              {{ !item.gaidShow ? "展开" : "收起" }}
            </div>
          </div>
          <div class="content_list_f">
            <div class="clf_common">
              <p class="p1">100gb</p>
              <p class="p2">及时</p>
            </div>
            <div class="clf_common">
              <p class="p1">100gb</p>
              <p class="p2">及时</p>
            </div>
            <div class="clf_last">
              <div class="clf_last_th">
                <img :src="require('_img/common/icon-sign.png')" alt="" /> 分区
              </div>
              <div class="clf_common">
                <p class="p1">100gb</p>
                <p class="p2">CPU(GB)</p>
              </div>
              <div class="clf_common">
                <p class="p1">2块24GB</p>
                <p class="p2">GPU</p>
              </div>
              <div class="clf_common">
                <p class="p1">32GB</p>
                <p class="p2">内存</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </IviewModal>
</template>

<script>
import dialogTitle from "@/components/common/DialogTitile.vue";

export default {
  name: "addResource",
  components: { dialogTitle },
  data() {
    return {
      visible: true,
      formParams: {},
      dataList: Array(10).fill({
        name: "资源名称",
        ptzh: [
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
          "GYFzhx001",
        ],
        time: 1000,
        isCheck: false,
        gaidShow: false,
      }),
      gaidShow: false,
      arr1: [1, 2, 3],
    };
  },
  props: {
    handleItem: {
      type: Object,
      default: () => {},
    },
    dType: {},
  },
  watch: {},
  created() {},
  methods: {
    save() {
      this.$Message.success('保存成功')
      this.close();
    },
    close() {
      this.$emit("close");
    },
    showMorePtzh(item) {
      item.gaidShow = !item.gaidShow;
    },
    countListLength(item) {
      return Math.ceil(item.ptzh.length / 7) > 1;
    },
  },
};
</script>

<style lang="less" scoped>
.iviewModal {
  .content {
    height: 90%;
    .content_header {
      .flex-center();
      justify-content: space-between;
      margin-bottom: 10px;

      .content_header_left {
        .flex-center();
        align-items: center;
        .content_title {
          margin-bottom: 0px;
          margin-right: 30px;
        }
      }
      .content_header_right {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #333333;
        .flex-center();

        span {
          display: inline-block;
          font-size: 18px;
          font-weight: bold;
          color: #b8321a;
        }
      }
    }

    .content_list {
      height: calc(100% - 46px);
      padding-right: 20px;
      .show-scroll();

      > div {
        min-height: 240px;
        padding-bottom: 20px;
        background: #ffffff;
        box-shadow: 0px 2px 10px 0px rgba(201, 208, 228, 0.58),
          0px 4px 18px 0px rgba(26, 69, 184, 0.12);
        border-radius: 4px;
        border: 2px solid #1a45b8;
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0px;
        }

        /* 标题和选择框 */
        .content_list_h {
          // padding: 20px 0;
          height: 68px;
          .flex-center();
          justify-content: flex-start;
          padding-left: 20px;

          span {
            display: inline-block;
            font-size: 18px;
            font-weight: bold;
            color: #333333;
          }
          > div {
            margin-right: 20px;
          }
        }

        .content_list_c,
        .content_list_f {
          margin-left: 60px;
          margin-right: 40px;
        }

        .content_list_c {
          .flex-center(flex-start, space-between);
          font-size: 14px;
          color: #333333;
          line-height: 22px;
          margin-bottom: 10px;
          .clc_left {
            flex: 1;
            .flex-center(flex-start, flex-start);
            .clc_label {
              margin-right: 15px;
            }
            .clc_list {
              width: calc(100% - 100px);
              height: auto;
              // overflow: hidden;
              .flex-center();
              flex-wrap: wrap;
              justify-content: flex-start;

              > div {
                padding: 0 20px;
                margin-bottom: 10px;
                position: relative;
                height: 22px;
                line-height: 22px;

                &::after {
                  content: "";
                  position: absolute;
                  right: 0;
                  top: 50%;
                  width: 1px;
                  height: 14px;
                  background: #a5b7e0;
                  transform: translate(0, -50%);
                }

                &:last-child,
                &:nth-child(8n) {
                  &::after {
                    display: none;
                  }
                }
              }

              &.hide {
                height: 20px;
                overflow: hidden;
              }
            }
          }
          .clc_action {
            font-size: 14px;
            font-weight: 500;
            color: #1a45b8;
            line-height: 20px;
            text-decoration: underline;
            cursor: pointer;
          }
        }

        .content_list_f {
          height: 103px;
          background: linear-gradient(
            180deg,
            rgba(237, 244, 252, 0.7) 0%,
            #ffffff 19%,
            #ffffff 50%,
            #ffffff 80%,
            rgba(237, 244, 252, 0.69) 100%
          );
          box-shadow: 0px 2px 4px 0px rgba(183, 204, 235, 0.33),
            inset -2px -2px 4px 0px rgba(183, 204, 235, 0.3),
            inset 2px 2px 4px 0px rgba(183, 204, 235, 0.31);
          border-radius: 8px;
          border: 1px solid #ffffff;
          .flex-center(center,flex-start);
          .clf_common {
            padding: 0 40px;
            position: relative;
            min-width: 200px;
            &::after {
              content: "";
              position: absolute;
              right: 0;
              top: 50%;
              height: 54px;
              border: 0.5px dashed rgba(26, 69, 184, 0.3);
              transform: translate(0, -50%);
            }
          }

          .p1 {
            font-size: 18px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: #0d2c91;
            line-height: 22px;
            margin-bottom: 5px;
          }

          .p2 {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #333333;
            line-height: 22px;
          }

          .clf_last {
            flex: 1;
            .flex-center(center,space-between);
            .clf_common {
              &::after {
                display: none;
              }
            }

            .clf_last_th {
              .p2();
              margin-left: 40px;
              padding-top: 40px;
              img {
                width: 15px;
                height: 15px;
              }
            }
          }
        }
      }
    }
  }
}
</style>