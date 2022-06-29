<template>
  <div class="operat-platform">
    <div class="common-bg op_table">
      <Tabs value="name1" :animated="false">
        <TabPane label="公有云" name="name1">
          <div class="op_table_box">
            <IviewTable :data="tableData" :columns="tableCol" :page="pager"></IviewTable>
          </div>
        </TabPane>
        <TabPane label="私有云" name="name2">
          <div class="op_table_box">
            <IviewTable :data="tableData1" :columns="tableCol" :page="pager"></IviewTable>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <IviewModal v-model="showModal" title="账单明细" @on-ok="ok" cancalText="" size="slarge">
      <billing-detail></billing-detail>
      <div slot="footer">
        <iview-button @click="ok">确认</iview-button>
      </div>
    </IviewModal>
  </div>
</template>

<script>
import { textBtns } from "_u/table"
import BillingDetail from "@/views/billing-management/time-based-billing/billingDetail"

export default {
  name: "Index",
  components: { BillingDetail },
  data() {
    return {
      showModal: false,
      page: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizeOpts: [10, 20, 30, 50, 100]
      },
      tableData1: [
        {
          account: "132112333221",
          name: "吴*兰",
          calculate_religion: "通用专区",
          submission: "25",
          nodeNumber: "18",
          runningNumber: "16",
          price: "222.0"
        },
        {
          account: "13555433220",
          name: "陈*深",
          calculate_religion: "通用专区",
          submission: "15",
          nodeNumber: "18",
          runningNumber: "16",
          price: "347.0"
        },
        {
          account: "13712385667",
          name: "张*辉",
          calculate_religion: "GPU专区\n" + "\n",
          submission: "15",
          nodeNumber: "43",
          runningNumber: "66",
          price: "664.0"
        },
        {
          account: "15677288998",
          name: "王*明",
          calculate_religion: "GPU专区\n" + "\n",
          submission: "15",
          nodeNumber: "70",
          runningNumber: "16",
          price: "1222.0"
        }
      ],
      tableData: [
        {
          account: "132112333221",
          name: "光*兰",
          calculate_religion: "通用专区",
          submission: "15",
          nodeNumber: "18",
          runningNumber: "16",
          price: "222.0"
        },
        {
          account: "13977220002",
          name: "陈*冬",
          calculate_religion: "通用专区",
          submission: "15",
          nodeNumber: "18",
          runningNumber: "16",
          price: "347.0"
        },
        {
          account: "13800138000",
          name: "谢*",
          calculate_religion: "GPU专区\n" + "\n",
          submission: "15",
          nodeNumber: "43",
          runningNumber: "66",
          price: "664.0"
        },
        {
          account: "15677288998",
          name: "王*明",
          calculate_religion: "GPU专区\n" + "\n",
          submission: "15",
          nodeNumber: "70",
          runningNumber: "16",
          price: "1222.0"
        }
      ],
      tableCol: [
        {
          title: "用户账号",
          key: "account"
        },
        {
          title: "用户姓名",
          key: "name"
        },
        {
          title: "计算区",
          key: "calculate_religion"
        },
        {
          title: "作业提交数",
          key: "submission"
        },
        {
          title: "作业节点数",
          key: "nodeNumber"
        },
        {
          title: "作业运行数",
          key: "runningNumber"
        },
        {
          title: "总价",
          key: "price"
        },
        {
          title: "操作",
          render: (h, p) => {
            let { row } = p
            let arr = ["明细"]
            return textBtns(h, arr, (index, item) => {
              this.handleClickEdit(item, p.row)
            })
          }
        }
      ],
      pager: {
        current: 1,
        total: 0,
        pageSize: 10
      }, // 表格页码
      // 弹窗对象
      detail: {
        visible: false
      }
    }
  },
  methods: {
    ok() {
      this.showModal = false
    },
    changePageSize() {},
    handleClickEdit(type, row) {
      console.log("handleClickEdit", type, row)
      this.showModal = true

      let action = new Map([["明细", { key: "detail" }]])
      let actions = action.get(type.label)

      this.handleItem = row
    }
  }
}
</script>

<style lang="less" scoped>
.op_table {
  width: 1610px;
  height: 83vh;
  padding: 20px;
}

.operat-platform {
  width: 100%;
  height: 100%;
  padding: 20px 30px 30px;
}

.op_table_box {
  height: calc(100vh - 260px);
  width: 100%;
  position: relative;
}

/deep/ .ivu-tabs-tab {
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
}
</style>
