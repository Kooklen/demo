<!--
    description： 分中心 - 分中心信息 - 应用分配 - 选择应用
-->
<template>
  <IviewModal
    v-model="visible"
    :title="'选择应用'"
    @on-ok="save"
    @on-cancel="close"
    size="middle"
    class="iviewModal"
  >
    <div class="content">
      <div class="content_header">
        <div class="content_header_left">
          <dialogTitle>
            <img :src="require('_img/common/application-ziy.png')" alt="" />
            <span>云平台全部自有应用</span>
          </dialogTitle>
        </div>
        <div class="content_header_right">
          已选资源<span>{{ chooseArrIndex.length }}</span
          >个
        </div>
      </div>

      <div class="c_appliction_list">
        <div v-for="(item, index) in applicateDataList" :key="index">
          <div class="cal_item_left">
            <p>{{ item.name }}</p>
            <p>{{ item.jianjie }}</p>
          </div>
          <div>
            <IviewButton
              cusType="secondary"
              @click="addNewItem(index)"
              v-if="jude(index) !== index"
            >
              <Icon type="md-add" />
              添加应用</IviewButton
            >
            <div class="cancel" v-else @click="cancel(index)">取消添加</div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <IviewButton cus-type="primary" @click="close">关闭</IviewButton>
    </template>
  </IviewModal>
</template>

<script>
import dialogTitle from "@/components/common/DialogTitile.vue";
// import CommonTitle from "@/components/common/CommonTitle.vue";

export default {
  name: "applicationAssign",
  components: { dialogTitle },
  data() {
    return {
      visible: true,
      formParams: {},
      applicateDataList: Array(10).fill({
        name: "星光应用1星",
        jianjie: "应用简介应用简介应用简介应用简介应用简介",
      }),
      chooseArrIndex: [],
    };
  },
  props: {
    handleItem: {
      type: Object,
      default: () => {},
    },
  },
  watch: {},
  created() {},
  methods: {
    close() {
      this.$emit("close");
    },
    save() {},
    addNewItem(index) {
      console.log(index, "addNewItem");
      this.chooseArrIndex.push(index);
    },
    cancel(index) {
      console.log(index, "cancel");
      let _index = this.chooseArrIndex.findIndex((item) => {
        return item === index;
      });
      this.chooseArrIndex.splice(_index, 1);
    },
    jude(index) {
      return this.chooseArrIndex.find((item) => {
        return item === index;
      });
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

    .c_appliction_list {
      height: calc(100% - 60px);
      padding: 0 30px;
      .show-scroll();
      .flex-column();
      > div {
        width: 516px;
        flex-basis: 88px;
        flex-shrink: 0;
        background: #ffffff;
        border-bottom: 1px solid #eceef0;
        .flex-center(center, space-between);

        &:last-child {
          border: none;
        }

        .cal_item_left {
          p:first-child {
            height: 22px;
            font-size: 14px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: #333333;
            line-height: 22px;
          }

          p:last-child {
            height: 22px;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: #949494;
            line-height: 22px;
          }
        }

        .cancel {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #b8321a;
          line-height: 20px;
          text-decoration: underline;
          padding: 0 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>