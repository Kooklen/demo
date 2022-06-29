<template>
  <div class="user-feedback">
    <div class="fb-left">
      <div class="title">反馈总汇</div>
      <ul class="menu">
        <li v-for="(item, i) in menuList" :key="i" :class="{ active: menuIndex == i }" @click="menuClick(i)">
          <img v-if="item.icon == 'read'" src="~_img/user/fb-edit.png" alt="" />
          <img v-else-if="item.icon == 'del'" src="~_img/user/fb-del.png" alt="" />
          <img src="" v-else />
          <span> {{ item.title }} ({{ item.num }})</span>
        </li>
      </ul>
    </div>

    <div class="fb-cen">
      <div class="title">反馈处理</div>
      <ul class="content">
        <li>
          <div class="label">反馈内容:</div>
          <IviewInput v-model="fbInfo.val" type="textarea" :rows="7" />
        </li>
        <li>
          <div class="label">用户名称:</div>
          <IviewInput v-model="fbInfo.t" />
        </li>
        <li>
          <div class="label">代表公司:</div>
          <IviewInput v-model="fbInfo.t" />
        </li>
        <li>
          <div class="label">联系电话:</div>
          <IviewInput v-model="fbInfo.t" />
        </li>
        <li>
          <div class="label">邮箱:</div>
          <IviewInput v-model="fbInfo.t" />
        </li>
      </ul>
      <div class="up-down">
        <div class="t1">
          <i class="iconfont i-xiangshangjiantou"></i>
        </div>
        <div class="t1">
          <i class="iconfont i-xiangxiajiantou"></i>
        </div>
      </div>
      <div class="cao">
        <div class="line"></div>
        <IviewButton cusType="danger">删除</IviewButton>
        <IviewButton>完成</IviewButton>
      </div>
    </div>

    <div class="fb-right">
      <div class="head">
        <div class="title">
          <i></i>
          <span>{{ menuList[menuIndex].title }}</span>
        </div>
        <IviewSelect v-model="timeArea" :optionList="timeOptions" />
      </div>
      <div class="wrap">
        <ul class="fb-list">
          <li v-for="(item, i) in 7" :key="i">
            <div class="t1">某某公司</div>
            <div class="t2">
              <img src="~_img/user/user.png" alt="" />
              <span class="s1">反馈者:</span>
              <span class="s2">xxx</span>
            </div>
            <div class="t3">
              <img src="~_img/user/time.png" alt="" />
              <span class="s1">反馈时间:</span>
              <span class="s2">2020/11/23 12:11:12</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFeedback",
  data() {
    return {
      menuList: [
        { title: "全部", num: 250 },
        { title: "合作交流", num: 66 },
        { title: "意见反馈", num: 31 },
        { title: "问题投诉", num: 99 },
        { title: "已处理", num: 99, icon: "read" },
        { title: "已删除", num: 99, icon: "del" }
      ],
      timeOptions: [
        { label: "全部", value: 0 },
        { label: "今天", value: 1 },
        { label: "7天内", value: 2 },
        { label: "一个月内", value: 3 },
        { label: "一个月以上", value: 4 }
      ],
      menuIndex: 0,
      timeArea: "",
      fbInfo: {
        val: "姬霓太美",
        t: ""
      }
    }
  },
  methods: {
    menuClick(index) {
      this.menuIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.ivu-input-type-textarea {
  width: 662px !important;
  border-radius: 2px;
}
</style>
<style lang="less" scoped>
.user-feedback {
  padding: 20px 26px;
  display: flex;
  height: 100%;
  .fb-left {
    width: 184px;
    background: linear-gradient(270deg, #3357b8 0%, #5572bf 100%);
    border-radius: 4px;
    .title {
      padding: 20px 0 0 20px;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 1px 1px 1px #0b3196;
    }
    .menu {
      margin-top: 28px;
      li {
        height: 41px;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 0 0 24px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #fff;
        cursor: pointer;
        img {
          margin-right: 8px;
          width: 15px;
        }
      }
      li.active {
        color: #1a45b8;
        background: linear-gradient(270deg, #fdfeff 0%, #e3eeff 100%);
        box-shadow: 0px 2px 5px 0px #284aa8, inset 0px 0px 4px 0px #c5d4fb;
      }
      li:nth-child(5) {
        margin-top: 440px;
      }
    }
  }
  .fb-cen {
    margin: 0 20px;
    width: 1022px;
    background: #ffffff;
    padding: 20px 30px;
    position: relative;
    .title {
      font-size: 24px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #333333;
    }
    .content {
      padding: 88px 110px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        display: flex;
        margin-bottom: 30px;
        .label {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(0, 0, 0, 0.65);
          width: 80px;
          text-align: right;
          margin-top: 4px;
          margin-right: 14px;
        }
      }
    }
    .up-down {
      position: absolute;
      right: 30px;
      bottom: 120px;
      .t1 {
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 20px;
        background: #ebedf4;
        border-radius: 2px;
        border: 1px solid #e2e4eb;
        margin: 6px 0;
      }
    }
    .cao {
      position: absolute;
      left: 50%;
      bottom: 34px;
      transform: translateX(-50%);
      text-align: center;
      .line {
        width: 982px;
        height: 3px;
        background: #f4f6fa;
        margin-bottom: 20px;
      }
    }
  }
  .fb-right {
    width: 364px;
    background: #ffffff;
    box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
    border-radius: 4px;
    .head {
      width: 100%;
      height: 50px;
      background: #edf4fc;
      border: 2px solid #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      .title {
        display: flex;
        align-items: center;
        i {
          width: 3px;
          height: 13px;
          background: linear-gradient(270deg, #97bbef 0%, #5572bf 100%);
          box-shadow: 1px 1px 1px 0px rgba(77, 138, 234, 0.28);
          border-radius: 2px;
          margin-right: 8px;
        }
        span {
          font-size: 14px;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          font-weight: bold;
          color: #333333;
        }
      }
      .i-select {
        width: 112px;
      }
    }
    .wrap {
      height: calc(100vh - 210px);
      overflow: auto;
      .fb-list {
        padding: 0 10px;
        li {
          width: 100%;
          height: 138px;
          background: #ffffff;
          box-shadow: 0px 4px 10px 0px rgba(201, 208, 228, 0.4), 0px 1px 5px 0px #e1e8f0;
          border-radius: 4px;
          padding: 12px 0 0 28px;
          margin-top: 18px;
          .t1 {
            font-size: 14px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            color: #333333;
            border-bottom: 1px dashed #e9e9e9;
            padding-bottom: 16px;
          }

          .t2,
          .t3 {
            margin-top: 8px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #333333;
            line-height: 19px;
            display: flex;
            align-items: center;
            img {
              width: 17px;
              margin-right: 8px;
            }
            .s1 {
              min-width: 74px;
            }
            .s2 {
              margin-right: 10px;
            }
          }
          .t2 {
            margin-top: 16px;
            .s1 {
              letter-spacing: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
