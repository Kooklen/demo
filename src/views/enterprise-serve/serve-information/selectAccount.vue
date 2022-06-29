
<!--
    description： 分中心 - 分中心信息 - 应用分配
-->
<template>
  <IviewModal
    v-model="visible"
    :title="'添加分中心信息'"
    @on-ok="save"
    @on-cancel="close"
    size="large"
    class="iviewModal"
  >
    <div class="content">
      <div class="content_header">
        <IviewRadioGroup
          :label="'资源属性:'"
          :radioList="radioList"
        ></IviewRadioGroup>
        <IviewInput :placeholder="'请输入账号搜索'"></IviewInput>
      </div>
      <div class="common_table">
        <IviewTable
          ref="iviewTable"
          :data="tableData1"
          :columns="tableCol1"
          :multiThboder="true"
          :page="pager"
          @on-selection-change="onSelectionChange"
        ></IviewTable>
        <div class="common_table_selected">已选： <span>{{selectedNum}}</span> 项</div>
      </div>
    </div>
  </IviewModal>
</template>

<script>
import { cols } from "_u/table";

export default {
  name: "selectAccount",
  data() {
    return {
      visible: true,
      formParams: {},
      radioList: [
        {
          value: "1",
          label: "私有",
        },
        {
          value: "2",
          label: "公有",
        },
      ],
      // tableData1: Array(3).fill({
      //   name: "分中心",
      //   zhlx: "私有",
      //   yptzh: "GYFfzhx001",
      //   sszy: "GYFfzhx001",
      //   sj: "1000核时",
      //   cc: "1000GB",
      //   cpu: "8GB",
      //   gpu: "2块24GB",
      //   nc: "32GB",
      // }),
      tableData1: [
        {
          zhlx: "私有",
          yptzh: "GYFfzhx0011",
          sszy: "GYFfzhx001",
          sj: "1000核时",
          cc: "1000GB",
          cpu: "8GB",
          gpu: "2块24GB",
          nc: "32GB",
        },
        {
          zhlx: "私有",
          yptzh: "GYFfzhx0012",
          sszy: "GYFfzhx001",
          sj: "1000核时",
          cc: "1000GB",
          cpu: "8GB",
          gpu: "2块24GB",
          nc: "32GB",
        },
      ],
      tableCol1: [
        {
          type: "selection",
          width: 60,
        },
        ...cols([
          ["账号类型", "zhlx"],
          ["云平台账号", "yptzh"],
          ["所属资源", "sszy"],
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
                        return h(
                          "div",
                          {
                            class: "m-text-btn-green",
                          },
                          p.row.cpu
                        );
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
          [
            "状态",
            "status",
            {
              render: (h, p) => {
                let { _index } = p.row;
                let flag = _index % 2 === 0;
                return h(
                  "div",
                  {
                    class: flag ? "" : "m-text-btn-bule",
                  },
                  flag ? "已分配" : "待分配"
                );
              },
            },
          ],
        ]),
      ],
      pager: {
        current: 1,
        total: 0,
        pageSize: 10,
      }, // 表格页码
      selectArr: [],
    };
  },
  watch: {},
  computed: {
    selectedNum() {
      return this.selectArr.length;
    },
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      // this.close();
      console.log(this.$refs.iviewTable);
    },
    onSelectionChange(e) {
      console.log(e, "onSelectionChange");
      this.selectArr = e;
    },
  },
};
</script>

<style lang="less" scoped>
.iviewModal {
  .content {
    .content_header {
      .flex-center(center,flex-start);
      margin-bottom: 20px;
    }
    .common_table {
      position: relative;
      height: 680px;
      // height: calc(100% - 60px);
      overflow: hidden;

      .common_table_selected {
        position: absolute;
        left: 0px;
        bottom: 4px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 22px;
        .flex-center();

        span {
          font-size: 16px;
          color: #b8321a;
        }
      }
    }
  }
}
</style>