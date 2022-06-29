<!--
    description： 企业服务 - 服务信息 - 资源配额
-->
<template>
  <IviewModal
    v-model="visible"
    :title="'资源配额'"
    @on-ok="save"
    @on-cancel="close"
    size="large"
    class="iviewModal"
  >
    <div class="content">
      <div class="content_header">
        <div class="content_header_left">
          <dialogTitle>
            <img :src="icon_1" alt="" />
            <!-- <img :src="require('_img/common/application-ziy.png')" alt="" /> -->
            <span>数据应用企业名称</span>
          </dialogTitle>
          <div class="chl_sign">事业单位</div>
          <div class="chl_sign green">超算资源: GYFfzhx001</div>
        </div>
      </div>

      <div class="common-bg content_common">
        <CommonTitle>账号信息</CommonTitle>
        <div class="common_header">
          <IviewButton @click="openDialog(1)">选择账号</IviewButton>
          <div class="ch_right">
            <IviewPage
              :total="40"
              size="small"
              :showElevator="false"
              :showSizer="false"
            ></IviewPage>
          </div>
        </div>
        <div class="common_table">
          <IviewTable
            :data="tableData1"
            :columns="tableCol1"
            :multiThboder="true"
          ></IviewTable>
        </div>
      </div>

      <div class="common-bg content_common">
        <CommonTitle>其他信息</CommonTitle>
        <div class="cc_form">
          <div>
            <IviewInput
              :label="'机时配额(核时):'"
              :placeholder="'请输入机时配额'"
            ></IviewInput>
          </div>
          <div>
            <IviewInput
              :label="'存储配额(GB):'"
              :placeholder="'请输入存储配额'"
            ></IviewInput>
          </div>
          <div>
            <IviewSelect
              :label="'分区配额:'"
              :placeholder="'请选择分区'"
              :optionList="optionList"
            ></IviewSelect>
            <IviewInput
              :inputWidth="200"
              :placeholder="'请输入CPU配额'"
            ></IviewInput>
            <IviewInput
              :inputWidth="200"
              :placeholder="'请输入GPU配额'"
            ></IviewInput>
            <IviewInput
              :inputWidth="200"
              :placeholder="'请输入内存配额'"
            ></IviewInput>
          </div>
        </div>
        <div></div>
      </div>

      <!-- S 资源配额 -->
      <div v-if="selectAccount.visible">
        <selectAccount
          @close="(e) => addModalCloseCallBack('selectAccount')"
        ></selectAccount>
      </div>
      <!-- E 资源配额 -->
    </div>
  </IviewModal>
</template>

<script>
import dialogTitle from "@/components/common/DialogTitile.vue";
import CommonTitle from "@/components/common/CommonTitle.vue";
import selectAccount from "@/views/enterprise-serve/serve-information/selectAccount.vue";
import { cols, textBtns } from "_u/table";
import icon_1 from "_img/common/title-icon-1.png";

export default {
  name: "resourceAssign",
  components: { dialogTitle, CommonTitle, selectAccount },
  data() {
    return {
      icon_1,
      visible: true,
      queryParams: {
        account: "",
        pageCurrent: 1,
        pageSize: 4,
        publicResource: "", // 是否公有，1：公有；0：私有
        used: "", // 1：已分配，0：待分配
      },
      formParams: {},

      tableData1: [],
      tableCol1: [
        ...cols([
          ["账号类型", "zhlx"],
          ["云平台账号", "accountName"],
          ["所属资源", "resourceName"],
          [
            "机时(剩余/可用)",
            "sj",
            {
              width: 170,
              render: (h, p) => {
                return h("div", {}, [
                  h("span", {}, "1000核时/"),
                  h("span", { class: "m-text-btn-green" }, p.row.sj),
                ]);
              },
            },
          ],
          [
            "存储(剩余/可用)",
            "cc",
            {
              width: 170,
              render: (h, p) => {
                return h("div", {}, [
                  h("span", {}, "1000核时/"),
                  h("span", { class: "m-text-btn-green" }, p.row.cc),
                ]);
              },
            },
          ],
          [
            "分区",
            "fq",
            {
              children: [
                ...cols([
                  [
                    "CPU(剩余)",
                    "cpu",
                    {
                      render: (h, p) => {
                        return textBtns(h, [
                          {
                            label: p.row.cpu,
                            value: 0,
                            options: { style: { color: "#1AB8A5" } },
                          },
                        ]);
                      },
                    },
                  ],
                  [
                    "GPU(剩余)",
                    "gpu",
                    {
                      render: (h, p) => {
                        return h(
                          "div",
                          {
                            class: "m-text-btn-green",
                          },
                          p.row.gpu
                        );
                      },
                    },
                  ],
                  [
                    "内存(剩余)",
                    "nc",
                    {
                      render: (h, p) => {
                        return h(
                          "div",
                          {
                            class: "m-text-btn-green",
                          },
                          p.row.nc
                        );
                      },
                    },
                  ],
                ]),
              ],
            },
          ],
        ]),
      ],
      optionList: [
        {
          value: 1,
          label: "分区1",
        },
        {
          value: 2,
          label: "分区2",
        },
        {
          value: 3,
          label: "分区3",
        },
      ],
      selectAccount: {
        visible: false,
      },
    };
  },
  props: {
    handleItem: {
      type: Object,
      default: () => {},
    },
  },
  watch: {},
  created() {
    this.query();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {},
    addNewItem(type) {
      console.log(type, "addNewItem");
      this.chooseApplication.visible = true;
    },
    openDialog() {
      this.selectAccount.visible = true;
    },
    addModalCloseCallBack(type) {
      this[type].visible = false;
    },
    query() {
      this.$api.common.getResourceList(this.queryParams).then((res) => {
        console.log(res, "getResourceList");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.iviewModal {
  .content {
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

        .chl_sign {
          padding: 0 10px;
          height: 24px;
          background: rgba(153, 179, 247, 0.5);
          box-shadow: inset 0px 0px 2px 0px #ffffff;
          border-radius: 2px;
          line-height: 24px;
          color: #1a45b8;
          font-size: 14px;
          margin-right: 10px;

          &.green {
            background: rgba(153, 247, 236, 0.5);
            box-shadow: inset 0px 0px 2px 0px #ffffff;
            color: #076f63;
          }
        }
      }
    }

    .content_common {
      // height: 214px;
      padding: 20px;
      margin-bottom: 30px;

      .common_header {
        position: relative;
        .flex-center();
        justify-content: space-between;
        margin-bottom: 10px;
        // .ch_left {
        //   .flex-center();
        //   span {
        //     font-size: 18px;
        //     font-weight: bold;
        //     color: #333333;
        //     line-height: 24px;
        //     margin-right: 20px;
        //   }
        // }
        .ch_right {
        }
      }

      .common_table {
        height: 260px;
        overflow: hidden;
      }

      .cc_form {
        margin-top: 20px;
        > div {
          margin-bottom: 30px;

          /deep/.i-input-label {
            width: 100px;
            text-align: right;
          }

          > div {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>