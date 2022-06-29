<template>
  <div class="page-breadcrumb">
    <div class="back-btn" v-if="back">
      <div class="btn" @click="linkTo()"><Icon type="ios-arrow-back" />{{ backBtn.name }}</div>
    </div>
    <div class="icon"></div>
    <Breadcrumb>
      <BreadcrumbItem :to="item.path"
                      v-for="(item, i) in list"
                      :key="i">
        {{item.title}}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "PageBreadcrumb",
    props: {
      // 返回按钮
      back: {
        type: Boolean,
        default: false
      },
      // 是否路由返回
      pathBack: {
        type: Boolean,
        default: false
      },
      // 返回数据
      backBtn: {
        type: Object,
        default: () => {
          return {
            name: '',
            // path: '',
          }
        }
      },
      list: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      linkTo() {
        if (this.pathBack) {
          this.$router.back();
        } else {
          this.$bus.$emit('pageBack');
        }
        this.$emit('back');
        // if (this.backBtn.path) {
        //   this.$route.push(this.backBtn.path);
        // }
      }
    }
  }
</script>

<style lang="less" scoped>
.page-breadcrumb {
  width: 100%;
  height: 46px;
  background: #fff;
  border-radius: 8px;
  padding: 0 30px;
  margin-bottom: 10px;
  box-shadow: 0 0 15px 0 rgba(218, 218, 218, 0.5);
  display: flex;
  align-items: center;

  .back-btn {
    margin-right: 20px;

    .btn {
      height: 30px;
      background: #515CF3;
      box-shadow: 0px 2px 2px 0px rgba(57, 68, 230, 0.95), 0px 0px 1px 0px #C4CEFF;
      font-size: 14px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 22px;
      text-shadow: 0px 1px 1px #2935CF, 0px 0px 10px #758DFF;
      padding: 0 20px;
      border-radius: 4px;
      .flex-center();
      cursor: pointer;

      i {
        margin-right: 10px;
        font-size: 16px;
      }
    }
  }

  .icon {
    width: 18px;
    height: 16px;
    background: url("~_img/common/breadcrumb-icon.png") no-repeat;
    background-size: 100% 100%;
    margin-right: 10px;
  }

  .ivu-breadcrumb {
    height: 100%;
    .flex-center();
    color: #2C3542;
    justify-content: flex-start;
    font-weight: 400;

    span:last-child {
      font-weight: 400;
      color: #2C3542;
    }
  }
}
</style>