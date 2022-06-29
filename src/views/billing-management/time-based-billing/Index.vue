<template>
  <div>
    <div class="operat-platform">
      <div class="common-bg op_table">
        <Tabs value="name1" :animated="false">
          <TabPane label="公有云" name="name1">
            <div class="op_table_box">
              <div class="op_table_box_a">
                <IviewTable
                    :data="tableData"
                    :columns="tableCol"
                ></IviewTable>
                <iview-page class="iview-page"></iview-page>
              </div>
            </div>

          </TabPane>
          <TabPane label="私有云" name="name2">
            <billing-detail></billing-detail>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>

import IviewPage from "_c/iview/IviewPage";
import {textBtns} from "_u/table";
import BillingDetail from "@/views/billing-management/time-based-billing/billingDetail";

export default {
  name: "Index",
  components: {BillingDetail, IviewPage},

  methods: {
    changePageSize() {
    },
    handleClickEdit(type, row) {
      console.log("handleClickEdit", type, row);
      let action = new Map([
        ["详情", {key: "detail"}],
        // ["应用分配", { key: "applicationAssign" }],
        // ["资源配额", { key: "resourceQuota" }],
        // ["恢复服务", { key: "serve" }],
        // ["终止服务", { key: "serve" }],
      ]);
      let actions = action.get(type.label);
      // if (actions.key === 'serve') {
      //   if (type.label === '终止服务') {
      //     this.showCheckModal.visible = true;
      //   }
      // } else {
      //   this[actions.key].visible = true;
      // }
      this.handleItem = row;
    }
  },
  data() {
    return {
      tableData: [
        {
          account: '132112333221',
          name: "张*兰",
          calculate_religion: '通用专区',
          submission: '15',
          nodeNumber: '18',
          runningNumber: '16',
          price: '222.0'
        }
      ],
      tableCol: [
        {
          title: '用户账号',
          key: 'account'
        },
        {
          title: '用户姓名',
          key: 'name'
        },
        {
          title: '计算区',
          key: 'calculate_religion'
        },
        {
          title: '作业提交数',
          key: 'submission'
        },
        {
          title: '作业节点数',
          key: 'nodeNumber'
        }, {
          title: '作业运行数',
          key: 'runningNumber'
        },
        {
          title: "总价",
          key: 'price'
        }, {
          title: '操作',
          render: (h, p) => {
            let {row} = p;
            let arr = ["详情"];
            return textBtns(h, arr, (index, item) => {
              this.handleClickEdit(item, p.row);
            });
          }
        }

      ],
      pager: {
        current: 1,
        total: 0,
        pageSize: 10,
      }, // 表格页码
      // 弹窗对象
      detail: {
        visible: false,
      },
    }
  }
}
</script>

<style lang="less" scoped>
.op_table {
  width: 1610px;
  height: 100%;
  flex: 1;
  padding: 20px;
}

.operat-platform {
  width: 100%;
  height: 100%;
  padding: 20px 30px 30px;
}

.op_table_box {
  width: 100%;
  position: relative;
  flex: 1;

}

.iview-page {
  margin-top: 200px;
}

/deep/ .ivu-tabs-tab {
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
}


</style>