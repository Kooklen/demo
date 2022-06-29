<template>
  <div class="home">
    <div class="app_nav">
      <!-- S 左边 -->
      <div class="app_nav_left">
        <div class="apl_logo_box">
          <img :src="require('_img/logo.png')" alt="" />
          <div class="left-logo">
            <span>超算云平台</span>
          </div>
        </div>
        <!-- / logo -->

        <div class="apl_center">
          <Select v-model="value2" placeholder="请选择" style="margin-right: 20px">
            <Option v-for="item in subcenterList" :key="item.value" :label="item.label" :value="item.value"> </Option>
          </Select>

          <Select v-model="value" placeholder="请选择" @on-change="changetab($event)">
            <Option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value"> </Option>
          </Select>
        </div>
        <!-- / 中心选择框 -->
      </div>
      <!-- S 左边 -->

      <UserCenter></UserCenter>
    </div>
    <div class="app_content">
      <!-- S 导航菜单栏 -->
      <div class="app_content_menu">
        <AppLeftSidebar @openMenu="openMenu"></AppLeftSidebar>
      </div>
      <!-- E 导航菜单栏 -->

      <!-- S 内容 -->
      <div class="app_content_box">
        <!-- S 页签栏 存储跳转后的页签 -->
        <div class="app_content_box_sign" ref="acbs">
          <div class="box" :style="boxStyle" v-if="true" ref="box">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide swiper-slide-item"
                  v-for="(item, index) in appTabList"
                  :key="index"
                  @click="slideToSome(item, index)"
                  @mouseenter="slideMouseenter(item, index)"
                  @mouseleave="slideMouseleave"
                >
                  {{ item.name }}
                  <Icon
                    type="ios-close-circle"
                    v-show="activeIndex === index || (hoverIndex && hoverIndex === index)"
                    @click.stop="closePageSign(index)"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- / 页签的swiper栏 -->

          <!-- S 页签的前后按钮 -->
          <div class="swiper-prev" @click="prev">
            <Icon type="md-arrow-dropleft" />
          </div>
          <div class="swiper-next" @click="next">
            <Icon type="md-arrow-dropright" />
          </div>
          <!-- E 页签的前后按钮 -->
        </div>
        <!-- E 页签栏  存储跳转后的页签 -->

        <router-view :class="['router-wrapper']" />
        <!-- / 路由跳转后的内容展示 -->
      </div>
      <!-- S 内容 -->
    </div>
  </div>
</template>

<script>
import AppLeftSidebar from "_c/app/AppLeftSidebar"
import UserCenter from "_c/common/UserCenter"
import Swiper from "swiper"
import "swiper/css/swiper.min.css"
import { mapActions, mapState } from "vuex"
import auth from "_u/auth"
// import { start } from "qiankun"; // 引入微前端框架

export default {
  name: "Home",
  components: { UserCenter, AppLeftSidebar },
  data() {
    return {
      auth: "",
      value: "",
      model: "test",
      isLogin: false,
      swiper: null,
      boxStyle: { width: "1600px" },
      activeIndex: 0,
      hoverIndex: null,
      value2: "越秀分中心",
      signArr: [
        { name: "工作台", path: "/operat-platform" }
        // {name: "平台门户", path: "/operat-platform"}
      ],

      //
      centerOption: [],
      subcenterList: [
        {
          value: "越秀分中心",
          label: "越秀分中心"
        },
        {
          value: "梅州分中心",
          label: "梅州分中心"
        }
      ],
      cityList: [
        {
          value: "运维管理",
          label: "运维管理"
        },
        {
          value: "运营管理",
          label: "运营管理"
        },
        {
          value: "平台门户",
          label: "平台门户"
        },
        {
          value: "门户管理",
          label: "门户管理"
        },
        {
          value: "工作台",
          label: "工作台"
        }
      ]
    }
  },
  computed: {
    ...mapState({
      appTabList(state) {
        return state.common.appTabList //tab
      }
    }),
    hideHeader() {
      const hideRouteList = ["/login"]
      return hideRouteList.includes(this.$route.path)
    },
    // 当前路由在页签数组中的下标签
    nowPathIndexInAppTabList() {
      return this.appTabList.findIndex(item => {
        return item.path === this.$route.path
      })
    }
  },
  watch: {
    "$route.path": {
      handler(n, o) {
        // 路由初始化的时候
        if (o === "/") {
          this.activeIndexInit()
        }
      }
    }
  },
  created() {
    this.auth = localStorage.getItem("auth")
    if (this.auth == "corporateStaffAcc") {
      this.value = "工作台"
    } else {
      this.value = "运营管理"
    }
    // if(this.auth=="'cloudPlatformAcc'||'subcenterAcc'"){
    //   this.value="运营管理"
    // }
    this.themeColorInit()

    this.$bus.$on("app-slideToSome", data => {
      this.$nextTick(() => {
        this.swiper.updateSlides()
        this.slideToSome(data, this.appTabList.length - 1)
      })
    })
  },
  mounted() {
    let _that = this
    this.swiper = new Swiper(".swiper-container", {
      // direction: 'vertical', // 垂直切换选项
      // loop: true, // 循环模式选项
      // autoplay: true,
      // 如果需要分页器
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true
      // },
      normalizeSlideIndex: false,
      activeIndex: 15,
      slidesPerView: "auto",
      // centeredSlides: true,
      // centeredSlidesBounds: true,
      // slidesPerGroup: 10,
      // 如果需要前进后退按钮
      // navigation: {
      //   nextEl: ".swiper-button-next",
      //   prevEl: ".swiper-button-prev",
      // },

      on: {
        slideChange: function () {
          _that.activeIndex = this.activeIndex
        }
      }
    })
  },
  methods: {
    changetab(a) {
      if (a == "门户管理") {
        window.open("https://yx-nscc-sub.cn/#/template/cloud", "_blank")
      }
      if (a == "平台门户") {
        let token = sessionStorage.getItem("dG9rZW4=")
        window.open("https://yx-nscc-sub.cn/#/home", token)
      }
    },
    ...mapActions("common", ["common_A_setAppTabList", "common_A_deleteAt"]),
    // 左边菜单栏 - 联系顶部tab栏
    openMenu(data) {
      let { path, name } = data
      let obj = {
        name: name.replace(new RegExp(" ", "g"), "").split("-")[1],
        path
      }
      let repeatIndex = null

      repeatIndex = this.appTabList.findIndex(item => {
        return item.path === path
      })
      if (repeatIndex !== null && repeatIndex < 0) {
        this.common_A_setAppTabList(obj)
        this.$nextTick(() => {
          this.swiper.updateSlides()
          this.slideToSome(obj, this.appTabList.length - 1)
        })
      } else {
        this.slideToSome(obj, repeatIndex)
      }
    },
    GetWindowInfo() {
      this.$nextTick(() => {
        this.boxStyle.width = this.$refs.acbs.offsetWidth - 60 + "px"
      })
    },
    // 上一个
    prev() {
      if (this.appTabList.length === 0) return
      if (this.activeIndex > 0) {
        this.swiper.slideTo(this.activeIndex - 1)
      } else {
        this.$Message.warning("已经是第一个")
      }
    },
    // 下一个
    next() {
      if (this.appTabList.length === 0) return
      if (this.activeIndex < this.appTabList.length - 1) {
        this.swiper.slideTo(this.activeIndex + 1)
      } else {
        this.$Message.warning("已经是最后一个")
      }
    },
    // 选择到某个
    slideToSome(item, index) {
      this.swiper.slideTo(index)
      if (item.id) {
        this.$router.push({ path: item.path, query: { id: item.id, orgLevel: item.orgLevel } })
      } else {
        this.$router.push(item.path)
      }
    },
    // 关闭
    closePageSign(index) {
      // 1.先删除
      this.common_A_deleteAt(index)

      // 2.重新定位
      if (this.activeIndex === index) {
        this.slideToSome(this.appTabList[index - 1], index - 1)
      } else {
        this.slideToSome(this.appTabList[this.nowPathIndexInAppTabList], this.nowPathIndexInAppTabList)
      }
      this.$nextTick(() => {
        this.swiper.updateSlides()
      })
    },
    // 主题初始化
    themeColorInit() {
      let themeColor = sessionStorage.getItem("theme-color")
      if (!themeColor) {
        themeColor = "#1A45B8"
        sessionStorage.setItem("theme-color", themeColor)
      }
      document.documentElement.style.setProperty("--theme-color", themeColor)
    },
    // swiper的ActiveIndex初始化
    activeIndexInit() {
      let { path } = this.$route
      let repeatIndex = null

      this.appTabList.some((item, index) => {
        repeatIndex = index
        return item.path === path
      })

      if (repeatIndex) {
        this.slideToSome(this.appTabList[repeatIndex], repeatIndex)
      }
    },

    slideMouseenter(item, index) {
      this.hoverIndex = index
    },
    slideMouseleave(item, index) {
      this.hoverIndex = null
    }
  },
  destroyed() {
    this.$bus.$off("app-slideToSome")
  }
}
</script>

<style lang="less" scoped>
.apl_center {
  /deep/ .ivu-select-selection {
    width: 160px;
    height: 30px;
    background: #515c79;
    border-radius: 4px;
    color: #ffffff;
    border: none;
  }
}

.home {
  height: 100%;
  width: 100%;

  .app_nav {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 64px;
    padding: 0 40px 0 0;
    background: #374159;
    box-shadow: 0px 4px 20px 0px rgba(116, 122, 138, 0.83);
    .flex-center();
    justify-content: space-between;

    .app_nav_left {
      min-width: 600px;
      height: 64px;
      background-size: 192px 100%;
      text-wrap: inherit;
      .flex-center(center, flex-start);
      font-size: 26px;
      color: #fff;
      font-family: PingFangSC-Medium, PingFang SC;

      .apl_logo_box {
        position: relative;
        .flex-center(center, flex-start);
        height: 64px;
        padding: 0 30px;

        img {
          margin-right: 20px;
        }

        &::after {
          content: "";
          width: 1px;
          height: 24px;
          background: #fff;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(0, -40%);
        }
      }

      .apl_center {
        .flex-center(center, flex-start);
        width: 300px;
        height: 64px;
        padding: 0 30px;

        /deep/ .i-select {
          .ivu-select {
            .ivu-select-selection {
              // width: 240px !important;
              height: 30px !important;
              background: #374159 !important;
              border-radius: 4px;
              border-color: #374159;
            }
          }
        }
      }

      // span {
      //   font-size: 24px;
      //   /*font-weight: bold;*/
      //   opacity: 0.85;
      // }
    }

    /*&.doc-bg {*/
    /*  background: transparent;*/
    /*  box-shadow: none;*/
    /*}*/
  }

  .app_content {
    height: calc(100% - 64px);
    display: flex;

    .app_content_menu {
      flex-basis: 250px;
      height: 100%;
      background: linear-gradient(180deg, #ffffff 0%, #e6eef8 100%);
    }

    .app_content_box {
      flex: 1;

      .app_content_box_sign {
        // width: 1000px;
        height: 42px;
        // background: yellow;
        box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
        padding: 0 30px;
        position: relative;

        .box {
          position: absolute;
          height: 42px;
        }

        .swiper-container {
          height: 42px;
          padding: 0 20px;

          .swiper-wrapper {
            align-items: center;

            .swiper-slide-item {
              text-align: center;
              width: 140px;
              background: #ebeff4;
              border-radius: 4px;
              line-height: 32px;
              height: 32px;
              // width: 83px !important;
              padding: 0 10px;
              margin-right: 10px;
              cursor: pointer;
              //.flex-center();
              justify-content: center;

              i {
                //叉叉XX
                color: #1b45b7;
                font-size: 16px;
                opacity: 0.5;
                width: 3px;
                padding-left: 10px;
                //margin-left: auto;
              }

              &:hover {
                background: rgba(26, 69, 184, 0.1);
              }
            }

            .swiper-slide-active {
              background: rgba(26, 69, 184, 0.2);
              box-shadow: inset 0px 0px 4px 0px #3e72f8;
              border-radius: 4px;
            }
          }
        }

        .swiper-prev,
        .swiper-next {
          width: 30px;
          height: 42px;
          background: #ffffff;
          box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
          position: absolute;
          font-size: 24px;
          color: #969fbc;
          .flex-center();
          cursor: pointer;
        }

        .swiper-prev {
          left: 0px;
        }

        .swiper-next {
          right: 0px;
        }

        .acbs_common {
          // display: flex;
          width: 1600px;
          height: 42px;
          overflow: hidden;

          .flex-center();

          > div {
            flex-basis: 83px;
            flex-shrink: 0;
            height: 24px;
            background: #ebeff4;
            border-radius: 4px;
            text-align: center;
            line-height: 24px;
            margin-right: 20px;
          }
        }
      }

      .router-wrapper {
        background: #f6f7fb;
        height: calc(100% - 42px);
      }
    }
  }
}
</style>
