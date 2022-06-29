<!--
    description： 分中心信息 - 资源配额 - 添加资源
-->
<template>
  <IviewModal
    title="资源配额"
    @on-ok="save"
    @on-cancel="close"
    size="large"
    class="iviewModal"
    v-model="visible"
  >
    <div class="content">
      <dialogTitle>
        <img :src="require('_img/common/title-icon-1.png')" alt="" />
        <span>超算分中心</span>
      </dialogTitle>

      <!-- S 超算公有资源 -->
      <div class="common-bg content_gong">
        <div class="common_header">
          <div class="ch_left">
            <span>超算公有资源</span>
            <IviewButton @click="openDialog(1)">添加资源</IviewButton>
          </div>
          <div class="ch_right">
            <IviewPage
              :total="publicCount.pager.total"
              :size="'small'"
              :showElevator="false"
              :showSizer="false"
            ></IviewPage>
          </div>
        </div>
        <div class="common_table">
          <IviewTable
            :data="publicCount.tableData"
            :columns="tableCol1"
          ></IviewTable>
        </div>
      </div>
      <!-- E 超算公有资源 -->

      <!-- S 超算私有资源 -->
      <div class="common-bg content_si">
        <div class="common_header">
          <div class="ch_left">
            <span>超算私有资源</span>
            <IviewButton @click="openDialog(1)">添加资源</IviewButton>
          </div>
          <div class="ch_right">
            <IviewPage
              :total="privateCount.pager.total"
              :size="'small'"
              :showElevator="false"
              :showSizer="false"
            ></IviewPage>
          </div>
        </div>
        <div class="common_table">
          <IviewTable
            :data="privateCount.tableData"
            :columns="tableCol2"
          ></IviewTable>
        </div>
      </div>
      <!-- E 超算私有资源 -->

      <!-- S 添加资源 -->
      <div v-if="addResource.visible">
        <addResource
          :dType="addResource.type"
          @close="(e) => addModalCloseCallBack('addResource')"
        ></addResource>
      </div>
      <!-- E 添加资源 -->
    </div>
  </IviewModal>
</template>

<script>
import { cols } from "_u/table";
import addResource from "@/views/subcenter-management/subcenter-message/addResource.vue";
import dialogTitle from "@/components/common/DialogTitile.vue";
export default {
  name: "resourceQuota",
  components: { addResource, dialogTitle },
  data() {
    return {
      visible: true,
      tableData1: Array(3).fill({
        name: "分中心",
        count: "xxxxxxxx",
      }),
      tableCol1: [
        ...cols([
          ["企业名称", "centerName"],
          ["企业类型", "centerName"],
        ]),
      ],
      tableData2: Array(3).fill({
        name: "分中心",
        count: "xxxxxxxx",
      }),
      tableCol2: [
        ...cols([
          ["企业名称", "centerName"],
          ["企业类型", "centerName"],
        ]),
      ],
      addResource: {
        visible: false,
        type: 1,
      },
      publicCount: {
        pager: {
          current: 1,
          pageSize: 4,
          total: 0,
        },
        tableData: [],
      },
      privateCount: {
        pager: {
          current: 1,
          pageSize: 4,
          total: 0,
        },
        tableData: [],
      },
    };
  },
  created() {
    this.queryPublic();
    this.queryPrivate();
  },
  methods: {
    save() {
      this.$refs["form_container"].validate(async (valid) => {
        console.log(valid, "valid");
        if (valid) {
          this.close();
        }
      });
    },
    close() {
      this.$emit("close");
    },
    openDialog(e) {
      console.log(e);
      Object.assign(this.addResource, {
        type: e,
        visible: true,
      });
    },
    addModalCloseCallBack(type) {
      this[type].visible = false;

      this.query();
    },
    queryPublic() {
      this.$api.resource
        .getResourceList({
          account: "",
          pageCurrent: 1,
          pageSize: 10,
          publicResource: 1,
        })
        .then((res) => {
          console.log(res, "queryPublic");
          let { records, total } = res.data.data;
          this.publicCount.tableData = records;
          this.publicCount.pager.total = total;
        });
    },
    queryPrivate() {
      this.$api.resource
        .getResourceList({
          account: "",
          pageCurrent: 1,
          pageSize: 10,
          publicResource: 0,
        })
        .then((res) => {
          console.log(res, "queryPrivate");
          console.log(res, "queryPublic");
          let { records, total } = res.data.data;
          this.privateCount.tableData = records;
          this.privateCount.pager.total = total;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.iviewModal {
  .content {
    .content_title {
      margin-bottom: 20px;
      .flex-center();
      justify-content: flex-start;
      > span {
        font-size: 20px;
        font-weight: bold;
        color: #333333;
        line-height: 26px;
      }

      img {
        margin-right: 10px;
      }
    }
    .content_gong,
    .content_si {
      height: 330px;
      margin-bottom: 30px;
      box-shadow: 0px 2px 10px 0px rgba(201, 208, 228, 0.58);
      padding: 20px;

      .common_header {
        padding-left: 10px;
        position: relative;
        .flex-center();
        justify-content: space-between;
        margin-bottom: 10px;
        .ch_left {
          .flex-center();
          span {
            font-size: 18px;
            font-weight: bold;
            color: #333333;
            line-height: 24px;
            margin-right: 20px;
          }
        }
        .ch_right {
        }

        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
          width: 3px;
          height: 18px;
          background: linear-gradient(270deg, #97bbef 0%, #5572bf 100%);
          box-shadow: 1px 1px 1px 0px rgba(77, 138, 234, 0.28);
          border-radius: 2px;
        }
      }

      .common_table {
        height: 260px;
        overflow: hidden;
      }
    }
  }
}
</style>