<!--
  @description: 企业服务 - 服务信息
  @creator: lwd
  @date: 2021/03/10
-->
<template>
  <div class="operat-platform">
    <div class="common-bg op_form filter-group">
      <div class="op_form_line filter-group-item">
        <IviewInput
          v-model="form.companyName"
          :label="'企业名称:'"
        ></IviewInput>
        <IviewSelect
          v-model="form.companyType"
          :optionList="optionList"
          :label="'企业类型:'"
        ></IviewSelect>
        <IviewInput v-model="form.contactName" :label="'联系人:'"></IviewInput>
      </div>
      <div class="op_form_line filter-group-item">
        <IviewDatePicker
          v-model="form.timeArr"
          :label="'操作时间:'"
          :inputWidth="'long'"
          type="daterange"
        ></IviewDatePicker>
        <div class="filter-group-item-btn">
          <IviewButton @click="query">搜索</IviewButton>
          <IviewButton @click="reset">重置</IviewButton>
        </div>
      </div>
    </div>
    <div class="common-bg op_table">
      <div class="op_table_action">
        <IviewButton @click="openDialog('addCenter')" v-if="$permission('company-add')">添加</IviewButton>
      </div>
      <div class="op_table_box">
        <IviewTable
          :data="tableData"
          :columns="tableCol"
          :page="pager"
          @on-page-change="changePageSize"
        ></IviewTable>
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
    <div v-if="resourceAssign.visible">
      <resourceAssign
        @close="(e) => addModalCloseCallBack('resourceAssign')"
        :handleItem="handleItem"
      ></resourceAssign>
    </div>
    <!-- E 资源配额 -->
  </div>
</template>

<script>
import { cols, textBtns } from "_u/table";
import addCenter from "@/views/enterprise-serve/serve-information/addCenter.vue";
import resourceAssign from "@/views/enterprise-serve/serve-information/resourceAssign.vue";
import getWant from "@/datadict/baseData.js";
export default {
  name: "operat-platform",
  components: { addCenter, resourceAssign },
  data() {
    return {
      form: {
        companyName: "",
        companyType: "",
        contactName: "",
        timeArr: ["", ""],
      },
      queryParams: {
        companyName: "",
        companyType: "",
        contactName: "",
        startDate: "",
        endDate: "",
        pageCurrent: 1,
        pageSize: 10,
      },
      // 企业类型
      optionList: [],
      tableData: [],
      tableCol: [
        ...cols([
          ["所属分中心", "subCenterName"],
          ["企业名称", "companyName"],
          [
            "企业类型",
            "companyType",
            {
              render: (h, p) => {
                let text = this.companyTypeDict[p.row.companyType]
                  ? this.companyTypeDict[p.row.companyType].label
                  : "-";
                return h("div", {}, text);
              },
            },
          ],
          [
            "所在区域",
            "county",
            {
              render: (h, p) => {
                let { city, county } = p.row;
                let cityArr = city.split(",");
                let countyArr = county.split(",");
                let text = "";
                text += cityArr.length > 1 ? cityArr[1] : cityArr[0];
                text =
                  text +
                  "-" +
                  (countyArr.length > 1 ? countyArr[1] : countyArr[0]);
                return h("div", {}, text);
              },
            },
          ],
          ["联系人", "contactName"],
          ["联系人电话", "contactTel"],
          [
            "合作类型",
            "cooperationType",
            {
              render: (h, p) => {
                return h(
                  "div",
                  {},
                  getWant("cooperationType", p.row.cooperationType)
                );
              },
            },
          ],
          [
            "服务状态",
            "status",
            {
              width: 100,
              render: (h, p) => {
                return h("div", {}, getWant("serveStatus", p.row.status));
              },
            },
          ],
          ["操作时间", "updateDate"],
          ["操作人", "updateUserName"],
          ["开始日期", "cooperationStartDate"],
          ["结束日期", "cooperationEndDate"],
          [
            "操作",
            "action",
            {
              width: 160,
              render: (h, p) => {
                let { row } = p;
                let arr = []; //['完善信息', '编辑','资源配额']
                // if (row._index === 1) {
                //   console.log(row);
                //   arr.push("完善信息");
                // } else {
                arr.push("编辑", "资源配额");
                // }
                return textBtns(h, arr, (index, item) => {
                  this.handleClickEdit(item, p.row);
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

      //
      addCenter: {
        visible: false,
      },
      resourceAssign: {
        visible: false,
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
  computed: {
    companyTypeDict() { // 企业类型字典
      return this.$u.array.arrToObj(this.optionList, "value");
    },
  },
  created() {
    this.optionInit();
    this.query();
  },
  methods: {
    // 查询
    query() {
      this.$loading();
      // 重置页码
      if (this.queryResetPage) {
        Object.assign(this.queryParams, {
          pageCurrent: 1,
          pageSize: 1,
        });

        Object.assign(this.pager, {
          current: 1,
          pageSize: 1,
        });
      }

      // 处理查询条件
      let { current, pageSize } = this.pager;
      let { companyName, contactName, timeArr, companyLicensesType } =
        this.form;
      Object.assign(this.queryParams, {
        startDate: timeArr[0]
          ? this.$u.getDate(timeArr[0], "yyyymmdd", "-")
          : "",
        endDate: timeArr[1]
          ? this.$u.getDate(timeArr[1], "yyyymmdd")
          : timeArr[1],
        pageCurrent: current,
        pageSize,
        companyName,
        contactName,
        companyLicensesType,
      });

      this.$api.enterpriseServe
        .sfGetCompanyList({
          ...this.queryParams,
        })
        .then((res) => {
          let { records, total } = res.data.data;
          this.tableData = records;
          this.pager.total = total;
          this.queryResetPage = false;

          this.$hide();
        });
    },
    reset() {
      this.form = {
        companyName: "",
        companyLicensesType: "",
        contactName: "",
        timeArr: [],
      };
      this.queryParams = {
        companyName: "",
        contactName: "",
        startDate: "",
        endDate: "",
      };
    },
    changePageSize(e) {
      console.log(e, "changePageSize");
      let { pageNum, pageSize } = e;
      pageNum && (this.pager.current = pageNum);
      pageSize && (this.pager.pageSize = 1);
      console.log(this.pager, "changePageSize");

      this.queryResetPage = false;

      this.query();
    },
    handleClickEdit(type, row) {
      console.log("handleClickEdit", type, row);
      let action = new Map([
        ["编辑", { key: "addCenter" }],
        ["完善信息", { key: "complete" }],
        ["资源配额", { key: "resourceAssign" }],
      ]);
      let actions = action.get(type.label);
      this[actions.key].visible = true;
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
    async optionInit() {
      let res = await this.$api.common.dictGetConfigs({ configType: 4 });
      this.optionList = this.$u.array.arrToSelect(
        res.data.data,
        "configName",
        "id"
      );
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
      flex: 1;
    }
  }
}
</style>