<!--
    description： 分中心 - 分中心信息 - 应用分配
-->
<template>
  <IviewModal
    v-model="visible"
    :title="'应用分配'"
    @on-ok="save"
    @on-cancel="close"
    size="large"
    class="iviewModal"
  >
    <div class="content">
      <div class="content_header">
        <div class="content_header_left">
          <dialogTitle>
            <img :src="require('_img/common/title-icon-1.png')" alt="" />
            <span>选择公有资源</span>
          </dialogTitle>
          <div class="chl_sign">事业单位</div>
        </div>
      </div>

      <div class="common-bg content_common">
        <CommonTitle>星光应用</CommonTitle>
        <div class="cc_list">
          <div
            v-for="(item, index) in xgDataList"
            :key="index"
            class="bg_xingg"
          >
            <img :src="require('_img/common/application-xingg.png')" alt="" />
            <span>{{ item.name }}</span>

            <div class="item_close"></div>
          </div>
          <div class="cc_list_add" @click="addNewItem('星光')">
            <Icon type="md-add" />添加应用
          </div>
        </div>
      </div>

      <div class="common-bg content_common">
        <CommonTitle>自有应用</CommonTitle>
        <div class="cc_list">
          <div v-for="(item, index) in xgDataList" :key="index" class="bg_ziy">
            <img :src="require('_img/common/application-ziy.png')" alt="" />
            <span>{{ item.name }}</span>

            <div class="item_close"></div>
          </div>
          <div class="cc_list_add" @click="addNewItem('自有')">
            <Icon type="md-add" />添加应用
          </div>
        </div>
      </div>

      <div class="common-bg content_common">
        <CommonTitle>第三方对接应用</CommonTitle>
        <div class="cc_list">
          <div v-for="(item, index) in xgDataList" :key="index" class="bg_disf">
            <img :src="require('_img/common/application-disf.png')" alt="" />
            <span>{{ item.name }}</span>

            <div class="item_close"></div>
          </div>
          <div class="cc_list_add" @click="addNewItem('第三方')">
            <Icon type="md-add" />添加应用
          </div>
        </div>
      </div>

      <!-- S 应用分配 -->
      <div v-if="chooseApplication.visible">
        <chooseApplication
          @close="(e) => addModalCloseCallBack('chooseApplication')"
        ></chooseApplication>
      </div>
      <!-- E 应用分配 -->
    </div>
  </IviewModal>
</template>

<script>
import dialogTitle from "@/components/common/DialogTitile.vue";
import CommonTitle from "@/components/common/CommonTitle.vue";
import chooseApplication from "@/views/subcenter-management/subcenter-message/chooseApplication.vue";
export default {
  name: "applicationAssign",
  components: { dialogTitle, CommonTitle, chooseApplication },
  data() {
    return {
      visible: true,
      formParams: {},
      xgDataList: Array(0).fill({
        name: "星光应用1星光应用1星光应用1",
      }),
      zyDataList: [],
      dsfDataList: [],
      chooseApplication: {
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
  created() {},
  methods: {
    close() {
      this.$emit("close");
    },
    save() {},
    addNewItem(type) {
      console.log(type, "addNewItem");
      this.chooseApplication.visible = true;
    },
    addModalCloseCallBack(type) {
      this[type].visible = false;
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
        }
      }
    }

    .content_common {
      height: 214px;
      padding: 20px;
      margin-bottom: 20px;
      .cc_list {
        .flex-center(center, flex-start);
        flex-wrap: wrap;
        padding-top: 10px;
        max-height: calc(100% - 30px);
        .show-scroll();
        > div {
          position: relative;
          .flex-center(center, flex-start);
          width: 200px;
          height: 50px;
          background: rgba(26, 184, 165, 0.06);
          // box-shadow: 0px 2px 4px 0px rgba(26, 184, 165, 0.4);
          border-radius: 4px;
          margin-right: 35px;
          margin-bottom: 20px;

          padding-left: 20px;

          .item_close {
            position: absolute;
            top: -8px;
            right: -8px;
            width: 16px;
            height: 16px;
            background: linear-gradient(180deg, #fa7e68 0%, #b8321a 100%);
            border-radius: 50%;
            cursor: pointer;

            &::after {
              content: "";
              .position-absolute-center();
              width: 8px;
              height: 2px;
              background: #ffffff;
              border-radius: 1px;
            }
          }

          img {
            margin-right: 15px;
          }

          span {
            display: inline-block;
            width: 112px;
            font-size: 14px;
            font-weight: bold;
            color: #333333;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .bg_xingg {
          background: url(~_img/common/application-xingg-bg.png) no-repeat
            center center;
        }
        .bg_ziy {
          background: url(~_img/common/application-ziy-bg.png) no-repeat center
            center;
        }
        .bg_disf {
          background: url(~_img/common/application-disf-bg.png) no-repeat center
            center;
        }

        .cc_list_add {
          .flex-center();
          background: #ffffff;
          box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 0.3);
          border-radius: 4px;
          border: 1px dashed #bbbbbb;
          font-weight: bold;
          font-size: 16px;
          color: #333333;
          cursor: pointer;

          i {
            margin-right: 10px;
            font-weight: bold;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>