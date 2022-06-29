<!--
  @description: 分中心管理 - 分中心信息
  @creator: lwd
  @date: 2021/03/10
-->
<template>
  <div class="operat-platform">
    <div class="common-bg op_form filter-group">
      <div class="op_form_line filter-group-item">
        <IviewInput
          v-model="form.subCenterName"
          :label="'分中心名称:'"
        ></IviewInput>
        <IviewInput v-model="form.contactName" :label="'联系人:'"></IviewInput>
        <div class="filter-group-item-btn">
          <IviewButton @click="query">搜索</IviewButton>
          <IviewButton @click="reset">重置</IviewButton>
        </div>
      </div>
    </div>
    <div class="common-bg op_table">
      <div class="op_table_action">
        <IviewButton @click="openDialog('addCenter')">添加</IviewButton>
      </div>
      <div class="op_table_box">
        <div class="op_table_box_a">
          <IviewTable
            :data="tableData"
            :columns="tableCol"
            :page="pager"
            @on-page-change="changePageSize"
          ></IviewTable>
        </div>
      </div>
    </div>

    <!-- S 添加 -->
    <div v-if="addCenter.visible">
      <addCenter
        @close="(e) => addModalCloseCallBack('addCenter')"
        :handleItem="handleItem"
      ></addCenter>
    </div>
    <!-- E 添加 -->

    <!-- S 资源配额 -->
    <div v-if="resourceQuota.visible">
      <resourceQuota
        @close="(e) => addModalCloseCallBack('resourceQuota')"
        :handleItem="handleItem"
      ></resourceQuota>
    </div>
    <!-- E 资源配额 -->

    <!-- S 应用分配 -->
    <div v-if="applicationAssign.visible">
      <applicationAssign
        @close="(e) => addModalCloseCallBack('applicationAssign')"
        :handleItem="handleItem"
      ></applicationAssign>
    </div>
    <!-- E 应用分配 -->

    <!-- 确认框 -->
    <IviewModal
      title="提示"
      type="confirm"
      v-model="showCheckModal.visible"
      :confirmText2="showCheckModal.confirmText2"
      @on-ok="checkOk"
      @on-cancel="showCheckModal.visible = false"
    >
    </IviewModal>
    <!--  -->
  </div>
</template>

<script>
import { cols, textBtns } from "_u/table";
import addCenter from "@/views/subcenter-management/subcenter-message/addCenter.vue";
import resourceQuota from "@/views/subcenter-management/subcenter-message/resourceQuota.vue";
import applicationAssign from "@/views/subcenter-management/subcenter-message/applicationAssign.vue";

export default {
  name: "subcenter-message",
  components: { addCenter, resourceQuota, applicationAssign },
  data() {
    return {
      form: {
        contactName: "",
        contactTel: "",
        subCenterName: "",
      },
      tableData: [],
      tableCol: [
        ...cols([
          ["分中心名称", "subCenterName", { width: 150 }],
          [
            "所在区域",
            "centerName",
            {
              render: (h, p) => {
                let { city, county } = p.row;
                let cityArr = city.split(",");
                let countyArr = county.split(",");
                let text = "";
                text += cityArr.length > 1 ? cityArr[1] + "市" : cityArr[0];
                text =
                  text +
                  "-" +
                  (countyArr.length > 1 ? countyArr[1] + "区" : countyArr[0]);
                return h("div", {}, text);
              },
            },
          ],
          ["联系人", "contactName", { width: 150 }],
          ["联系人电话", "contactTel"],
          ["操作时间", "updateDate"],
          [
            "服务状态",
            "status",
            {
              render: (h, p) => {
                let { status } = p.row;
                let flag = status === 1;
                return h("div", {}, [
                  h(
                    "div",
                    {
                      class: "table_tr_status",
                    },
                    [
                      h("div", {
                        class: `tts_box ${flag ? "start" : "stop"}`,
                      }),
                      h(
                        "div",
                        { class: `${flag ? "text_start" : "text_stop"}` },
                        flag ? `使用中` : "已停用"
                      ),
                    ]
                  ),
                ]);
              },
            },
          ],
          [
            "操作",
            "action",
            {
              width: 300,
              render: (h, p) => {
                let { row } = p;
                let arr = ["编辑", "资源配额", "应用分配"]; //[ "编辑", "资源配额", "应用分配"]
                if (row.status === 1) {
                  arr.push({
                    label: "终止服务",
                    value: 3,
                    options: { style: { color: "#B8321A" } },
                  });
                } else {
                  arr.push({
                    label: "恢复服务",
                    value: 3,
                    options: { style: { color: "#1AB8A5" } },
                  });
                }
                return textBtns(h, arr, (index, item) => {
                  this.handleClickEdit(item, row);
                });
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

      // 弹窗对象
      addCenter: {
        visible: false,
      },
      resourceQuota: {
        visible: false,
      },
      applicationAssign: {
        visible: false,
      },
      showCheckModal: {
        visible: false,
        confirmText2: "是否继续进行终止服务操作？",
        type: "",
      },
      handleItem: {},
      queryReset: false,
    };
  },
  watch: {
    form: {
      handler() {
        this.queryResetPage = true;
      },
      deep: true,
    },
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      this.$loading();
      // 重置页码
      if (this.queryResetPage) {
        Object.assign(this.form, {
          pageCurrent: 1,
          pageSize: 10,
        });

        Object.assign(this.pager, {
          current: 1,
          pageSize: 10,
        });
      }
      let { current, pageSize } = this.pager;

      this.$api.subcenterManage
        .scGetSubCenterList({
          ...this.form,
          pageCurrent: current,
          pageSize,
        })
        .then((res) => {
          // console.log(res, "sfGetCompanyList");

          let { records, total } = res.data.data;
          this.tableData = records;
          this.pager.total = total;
          this.queryResetPage = false;

          this.$hide();
        });
    },
    reset() {
      Object.assign(this.form, {
        contactName: "",
        contactTel: "",
        subCenterName: "",
      });
    },
    changePageSize(e) {
      let { pageNum, pageSize } = e;
      pageNum && (this.pager.current = pageNum);
      pageSize && (this.pager.pageSize = 1);
      this.queryResetPage = false;

      this.query();
    },
    handleClickEdit(type, row) {
      let action = new Map([
        ["编辑", { key: "addCenter" }],
        ["应用分配", { key: "applicationAssign" }],
        ["资源配额", { key: "resourceQuota" }],
        ["恢复服务", { key: "serve" }],
        ["终止服务", { key: "serve" }],
      ]);
      let actions = action.get(type.label);
      if (actions.key === "serve") {
        // if (type.label === "终止服务") {
        this.showCheckModal.visible = true;
        Object.assign(this.showCheckModal, {
          visible: true,
          confirmText2: `是否继续进行${type.label}操作？`,
        });
        // }
      } else {
        this[actions.key].visible = true;
      }
      this.handleItem = row;
    },
    addModalCloseCallBack(type) {
      this[type].visible = false;
      this.handleItem = {};
      this.query();
    },
    openDialog(type) {
      this[type].visible = true;
    },
    async checkOk() {
      let { status, id } = this.handleItem;
      let editRes = await this.$api.subcenterManage.scEditSubCenter({
        status: status == 1 ? 2 : 1,
        id,
      });

      if (editRes.status === 200) {
        this.$Message.success("操作成功");
        this.showCheckModal.visible = false;
        this.query();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.operat-platform {
  width: 100%;
  height: 100%;
  padding: 20px 30px 30px;
  .flex-column();

  .op_form {
    height: 146px;
    width: 100%;
    margin-bottom: 20px;
  }

  .op_table {
    width: 100%;
    flex: 1;
    padding: 20px;
    .flex-column();

    .op_table_action {
      margin-bottom: 10px;
    }

    .op_table_box {
      width: 100%;
      position: relative;
      flex: 1;
      .op_table_box_a {
        position: absolute;
        width: 100%;
        overflow: hidden;
        height: 100%;
      }
    }
  }
}
</style>