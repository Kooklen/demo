<template>
  <div class="user-center">
    <Tooltip content="消息提醒">
      <div class="backstage"></div>
    </Tooltip>
    <Tooltip content="随机换肤">
      <div class="backstage" @click="changeSkin"></div>
    </Tooltip>
    <!-- <Tooltip content="查看说明文档">
      <div class="help" @click="handleTo()">
        <span><Icon type="ios-help-circle-outline" size="26" /></span>
      </div>
    </Tooltip> -->
    <div class="user" @mouseleave="isPerson = false" @mouseenter="isPerson = true">
      <Avatar icon="ios-person" />
      {{ username }}
      <transition name="el-zoom-in-top">
        <ul class="drop" v-if="isPerson">
          <li @click="goPersonal">
            <img src="~_img/common/user.png" alt="" />
            <span>个人中心</span>
          </li>
          <li @click="handleLogout">
            <img src="~_img/common/back.png" alt="" />
            <span>退出登录</span>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: "UserCenter",
  data() {
    return {
      username: "",
      isPerson: false
    }
  },
  mounted() {},
  created() {
    // alert('112212')
    this.getUserInfo()
    // let userName = JSON.parse(sessionStorage.getItem("userData"))
    // this.username = userName.displayName
  },
  methods: {
    getUserInfo() {
      this.$api.role.getUserInfo({}).then(res => {
        this.username = res.data.displayName
        sessionStorage.setItem("userData", JSON.stringify(res.data))
      })
    },
    handleTo(path) {
      if (path) {
        this.$router.push(path)
      } else {
        path = this.$route.path.includes("home") ? "/home" : "/backstage"
        this.$route.path !== path + "/documentation" ? this.$router.push(path + "/documentation") : ""
      }
    },
    // 跳转个人中心
    goPersonal(){
      this.$router.push({path:'/usePage',query:{link:'/organization/personal'}})
    },
    handleLogout() {
      this.$auth.logout()
    },
    changeSkin() {
      let newThemeColor = ["#1A45B8", "#1AB8A5", "#FFBD08", "#B8321A"][Math.floor(Math.random() * 4)]
      let oldThemeColor = document.documentElement.style.getPropertyValue("--theme-color")
      if (oldThemeColor !== newThemeColor) {
        document.documentElement.style.setProperty("--theme-color", newThemeColor)
        sessionStorage.setItem("theme-color", newThemeColor)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-center {
  height: 100%;
  .flex-center();
  margin-right: 20px;
  color: #fff;

  .ivu-tooltip {
    width: 20px;
    height: 100%;
    margin-right: 40px;
    .flex-center();
    cursor: pointer;
  }

  .home,
  .help {
    width: 24px;
    height: 100%;
    .flex-center();

    span {
      display: inline-block;
      width: 24px;
      height: 24px;
      /*background: url("~_img/header/icon-help.png") no-repeat;*/
      /*background-color: #fff;*/
      background-size: 100% 100%;
    }
  }

  .user {
    position: relative;
    height: 100%;
    font-size: 16px;
    .flex-center();
    cursor: pointer;

    span {
      margin-right: 10px;
    }

    .drop {
      position: absolute;
      top: 50px;
      background: #fff;
      width: 160px;
      padding: 0 10px 20px;
      .flex-column();
      align-items: center;
      box-shadow: 5px 5px 20px 0px rgba(168, 206, 230, 0.59), 3px 3px 12px 0px #e0e2fa;
      cursor: pointer;
      border-radius: 3px;
      color: #141e25;

      li {
        margin-top: 20px;
        display: flex;
        align-items: center;
        img {
          width: 16px;
          margin-right: 10px;
        }
      }
      li:nth-child(1) {
        &::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 86%;
          height: 1px;
          background: #c9cfff;
        }
      }
    }
  }
}
</style>
