<!--
    description： 组织架构 - 组织管理 - 角色全新啊 - 设置用户弹窗
-->
<template>
  <IviewModal
    :title="'设置用户'"
    @on-cancel="$emit('input', false)"
    size="middle"
    class="iviewModal"
    v-bind="$attrs"
    @on-ok="save"
  >
<!--     v-on="$listeners"-->
    <div class="content">
      <Transfer
        :data="data1"
        :target-keys="keys"
        @on-change="handleChange1"
        filterable
        :filter-method="filterMethod"
        :operations="[' 撤回用户', '选择用户 ']"
      ></Transfer>
    </div>
    <div>123333</div>
  </IviewModal>
</template>

<script>
export default {
  name: 'setUser',
  data() {
    return {
      formParams: {},
      data1: [],
      keys: []
    }
  },
  // inject: ['config'],
  watch: {},
  mounted() {
    let { orgLevel, id } = this.config
    if (id && orgLevel) {
      this.$api.role.getUserInfo({ orgLevel }, [id]).then(({ data }) => {
        this.data1 = data.records.map((item) => ({
          ...item,
          // key: { id: item.id, displayName: item.userName },
          key: item.id,
          label: item.userName,
          description: item.displayName,
          disabled: false
        }))
      })
    }
    this.$bus.$on('getRoleUset', (params) => {
      this.$api.role.getRoleUser({}, params).then(({ data }) => {
        this.keys = data.records.map((item) => item.id)
      })
    })
  },
  methods: {
    handleChange1(targetKeys, direction, moveKeys) {
      this.keys = targetKeys
    },
    // 搜索函数
    filterMethod(data, query) {
      return data.label.indexOf(query) > -1
    },
    save() {
      let keys = []
      this.keys.map((item) => {
        this.data1.map((item2) => {
          if (item == item2.id) {
            keys.push({ id: item, displayName: item2.userName })
          }
        })
      })
      this.$emit('confirm', keys)
    },
    getRoleUser(params) {
      this.$api.role.getRoleUser({}, params).then(({ data }) => {
        this.keys = data.records.map((item) => item.id)
      })
    }
  }
}
</script>

<!--<style lang="less">-->
<!--.flex-cen(@ai: center,@jc: center ) {-->
<!--  display: flex;-->
<!--  align-items: @ai;-->
<!--  justify-content: @jc;-->
<!--}-->

<!--.flex-col(@ai: flex-start,@jc: flex-start ) {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: @ai;-->
<!--  justify-content: @jc;-->
<!--}-->
<!--</style>-->

<!--<style lang="less" scoped>-->
<!--//@import '~_c/iview/config/index';-->

<!--/deep/.ivu-modal-body {-->
<!--  height: 100%;-->
<!--}-->
<!--.iviewModal {-->
<!--  .content {-->
<!--    height: 100%;-->
<!--    //.flex-cen();-->
<!--    .ivu-transfer {-->
<!--      height: 100%;-->
<!--    }-->
<!--    /deep/.ivu-transfer-list {-->
<!--      width: 200px;-->
<!--      height: 410px;-->
<!--      background: #ffffff;-->
<!--      box-shadow: 0px 2px 10px 0px rgba(201, 208, 228, 0.58);-->
<!--      border-radius: 4px;-->
<!--      border: 1px solid #eceef0;-->
<!--    }-->

<!--    /* 头部标题 */-->
<!--    /deep/.ivu-transfer-list-header {-->
<!--      width: 198px;-->
<!--      height: 38px;-->
<!--      background: #edf4fc;-->
<!--      border-radius: 3px 3px 0px 0px;-->

<!--      .ivu-transfer-list-header-title {-->
<!--        font-size: 14px;-->
<!--        font-weight: bold;-->
<!--        color: #13389a;-->
<!--        line-height: 22px;-->
<!--      }-->

<!--      .ivu-transfer-list-header-count {-->
<!--        display: none;-->
<!--      }-->
<!--    }-->

<!--    /* 筛选框 */-->
<!--    // /deep/.ivu-transfer-list-body-search-wrapper {-->
<!--    // }-->
<!--    /deep/.ivu-input {-->
<!--      //&:hover {-->
<!--      //  .input-view-hover();-->
<!--      //}-->
<!--      //&:focus {-->
<!--      //  .input-view-focus();-->
<!--      //}-->
<!--    }-->

<!--    /deep/.ivu-transfer-list-body-with-search {-->
<!--      .ivu-transfer-list-content {-->
<!--        .show-scroll();-->
<!--        .ivu-transfer-list-content-item {-->
<!--          font-size: 14px !important;-->
<!--          font-weight: 400;-->
<!--          color: rgba(0, 0, 0, 0.65);-->
<!--          line-height: 22px;-->

<!--          > span {-->
<!--            padding-left: 0px;-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->

<!--    /* 中间transfor栏 */-->
<!--    /deep/.ivu-transfer-operation {-->
<!--      .ivu-btn {-->
<!--        // width: 95px;-->
<!--        padding: 0 20px;-->
<!--        height: 24px;-->
<!--        background: #ffffff;-->
<!--        border: 1px solid #456bd1;-->
<!--        font-size: 12px;-->
<!--        font-weight: bold;-->
<!--        color: #456bd1;-->
<!--        line-height: 22px;-->
<!--        .flex-cen();-->
<!--        // span {-->
<!--        //   i {-->
<!--        //     font-size: 12px;-->
<!--        //     font-weight: bold;-->
<!--        //     color: #456bd1;-->
<!--        //     line-height: 22px;-->
<!--        //   }-->
<!--        // }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->

