<!--
  @description: 系统左侧栏
  @creator: lwd
  @date: 2021/03/09
-->
<template>
  <div class="app-left-sidebar">
    <Menu
      ref="menu"
      :accordion="true"
      @on-select="handleSelect"
      @on-open-change="handleOpenChange"
      :open-names="openNames"
      :active-name="activeName"
    >
      <div v-for="level1 of menus" :key="level1.path">
        <template>
          <!-- v-if="level1.children.length > 0" -->
          <Submenu
            :name="level1.path"
            :class="{
              'no-child': !level1.children || (level1.children && level1.children.length === 0)
            }"
            v-if="$permission(level1.code)"
          >
            <template slot="title">
              <i :class="['menu-icon', 'menu-icon-' + level1.icon]"></i>
              <span>{{ level1.title }}</span>
            </template>
            <MenuItem
              @click.native="level2.disabled && $Message.info('该模块正在开发中，暂未开放！')"
              :disabled="level2.disabled"
              :title="level2.title"
              :name="level1.path + '/' + level2.path"
              v-for="level2 of level1.children"
              :key="level2.path"
              v-show="level1.children && level1.children.length && $permission(level2.code)"
              ><span class="circular"></span><span>{{ level2.title }}</span>
            </MenuItem>
          </Submenu>
        </template>
      </div>
      <img src="~_img/app-left/sidebarBg.png" class="bgc" alt="" />
    </Menu>
  </div>
</template>

<script>
import getMenu from "@/datadict/menu"

export default {
  name: "AppLeftSidebar",
  components: {},
  props: {},
  data() {
    return {
      openNames: [],
      menus: [],
      // activeName: "enterprise-serve/serve-information",
      activeName: ""
    }
  },
  computed: {
    // 第一层的菜单字典
    firstLevelMenuDict() {
      let Amenu = this.$store.state.tinyweb.treeCode
      for (let i = 0; i < Amenu.length; i++) {
        // if (Amenu[i]==)
      }

      return this.$u.array.arrToObj(this.menus, "title")
    },
    menusRef() {
      return this.$refs.menu
    }
  },
  watch: {
    "$route.path": {
      handler() {
        this.updateMenu()
      },
      immediate: true
    }
  },
  methods: {
    // 更新菜单
    updateMenu() {
      let [path1, path2] = this.$route.path.split("/").slice(1)
      this.activeName = path1 + "/" + path2
      this.openNames = [path1]
      this.$nextTick(() => {
        this.$refs.menu.updateActiveName()
        this.$refs.menu.updateOpened()
      })
    },
    // 初始化菜单
    initMenu() {
      /** 组装菜单 */
      let iconList = ["menu"]
      // let copyMenu = this.$u.object.deepCopy(menu);
      // 获取权限码
      // let codeList = (this.$auth && this.$auth.permissionList) || [];
      // let menu = getMenu(codeList);
      this.menus = getMenu().map(item => {
        item.icon = iconList[0] //一级菜单图标
        return item
      })
    },
    // 打开 & 关闭 菜单
    handleOpenChange(e) {
      this.openNames = e
      let arr = this.menus.filter(item => {
        return item.code === e[0]
      })
      if (arr.length > 0 && !arr[0].children) {
        this.activeName = ""
        this.$refs.menu.currentActiveName = ""
        this.$router.push(arr[0].fullPath)
      }
    },
    // 选中菜单
    handleSelect(menuItemName) {
      if (menuItemName == "organization/micro-org") {
        this.$router.push({ path: "usePage", query: { link: "/" + menuItemName } })
      } else {
        this.$router.push(`/${menuItemName}`)
      }
      let [path1, path2] = menuItemName.split("/")
      let arr1 = this.menus.filter(item => {
        return item.code === path1
      })
      let arr2 = []
      if (arr1.length > 0) {
        arr2 =
          arr1[0].children &&
          arr1[0].children.filter(item => {
            return item.code === path2
          })
      }

      this.$emit("openMenu", {
        path: `/${menuItemName}`,
        cps: "appLeftSide",
        name: arr2.length > 0 ? arr2[0].fullPathName : arr1[0].fullPathName
      })
    }
  },
  created() {
    this.initMenu()
    // this.$bus.$on("open-left-sidebar-menu", menuTitle => {
    //   let openName = this.firstLevelMenuDict[menuTitle].path;
    //   this.openNames = openName === this.openNames[0] ? [] : [openName];
    //   this.$nextTick(() => {
    //     this.$refs.menu.updateOpened();
    //   });
    // });
  }
}
</script>

<style lang="less" scoped>
.bgc {
  width: 100%;
  height: 25%;
  margin-top: 390px;
  position: absolute;
  bottom: 0;
  left: 0;
}

@left-main-color: #1a45b8;
.menu-icon() {
  width: 23px;
  height: 20px;
  margin-right: 5px;
  background-size: contain;
  &.menu-icon-menu {
    background-image: url("~_img/app-left/menu.png") !important;
  }
}

.menu-icon-active() {
  width: 23px;
  height: 20px;
  margin-right: 5px;
  background-size: contain;
  &.menu-icon-menu {
    background-image: url("~_img/app-left/menu_active.png") !important;
  }
}

.app-left-sidebar {
  width: 100%;
  height: 100%;
  position: relative;
  // 一级菜单
  /deep/ .ivu-menu.ivu-menu-vertical {
    background: linear-gradient(180deg, #dee8f7 0%, #becfe8 100%);
    //background-image: url("~_img/app-left/sidebarBg.png");
    //background-repeat: no-repeat;
    box-shadow: 0px 2px 19px 0px rgba(201, 208, 228, 0.58);
    border: 2px solid #ffffff;
    padding: 20px;
    height: 100%;

    &::after {
      display: none;
    }

    width: 100% !important;
    user-select: none;
    // 一级菜单 item
    .ivu-menu-submenu {
      // 展开样式
      &.ivu-menu-opened {
        .ivu-menu-submenu-title {
          font-size: 16px;
          font-weight: bold;
          color: @left-main-color;
          // line-height: 21px;

          > i {
            &.ivu-icon-ios-arrow-down {
              &::before {
                content: "\F33D";
                color: @left-main-color;
              }
            }
          }

          // 菜单图标 active
          .menu-icon {
            .menu-icon-active();
          }
        }
      }

      // 标题
      .ivu-menu-submenu-title {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #000000;
        height: 48px;
        line-height: 48px;
        display: flex;
        align-items: center;
        padding: 0 10px 0 20px !important;

        &:hover {
          font-weight: bold;
          color: @left-main-color;

          > i {
            &.ivu-icon-ios-arrow-down {
              &::before {
                content: "\F33D";
                color: @left-main-color;
              }
            }
          }

          // 菜单图标 active
          .menu-icon {
            .menu-icon-active();
          }
        }

        > i {
          margin: 0;

          &.menu-icon {
            .menu-icon();
          }

          &.ivu-icon-ios-arrow-down {
            right: 14px;

            &::before {
              content: "\F33D";
              color: #969fbc;
            }
          }
        }
      }

      // 二级菜单
      > .ivu-menu {
        background: #ffffff;
        box-shadow: 0px 2px 10px 0px rgba(201, 208, 228, 0.58);
        border-radius: 4px;
        // padding: 2px 0;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 3px;
          left: 3px;
          width: 3px;
          height: calc(100% - 6px);
          border-radius: 3px;
        }

        &:empty {
          padding: 0;
        }

        // 二级菜单 item
        .ivu-menu-item {
          // display: flex;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #333333;
          line-height: 40px;
          height: 40px;
          padding: 0 20px !important;
          padding-left: 50px !important;
          .ellipsis;
          width: 100%;

          .circular {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #edeef3;
            box-shadow: 0px 0px 1px 0px #ffffff;
            margin-right: 10px;
            border-radius: 50%;
            position: relative;

            &::after {
              content: "";
              width: 5px;
              height: 5px;
              background: #949dbc;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-radius: 50%;
            }
          }

          &.ivu-menu-item-active:not(.ivu-menu-submenu) {
            border-radius: 1px;
            background: #fff;
            // filter: blur(0px);
            color: @left-main-color;
            position: relative;

            .circular {
              box-shadow: 0px 0px 1px 0px #ffffff, inset 0px 0px 2px 0px rgba(26, 69, 184, 0.4);

              &::after {
                background: @left-main-color;
              }
            }

            &::after {
              display: none;
            }
          }

          &:hover:not(.ivu-menu-item-disabled) {
            // color: @main-color;
          }

          &.ivu-menu-item-disabled {
            cursor: default;
            opacity: 0.5;
          }
        }
      }

      &.no-child {
        > .ivu-menu {
          display: none;
        }

        .ivu-icon {
          display: none;
        }
      }
    }

    // 只是一级菜单
    .menu-item-no-child {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: #000000;
      height: 48px;
      line-height: 48px;
      display: flex;
      align-items: center;
      padding: 0 10px 0 20px !important;
      cursor: pointer;

      &:hover {
        font-weight: bold;
        color: @left-main-color;
        // text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.38),
        //   0px 2px 4px rgba(0, 0, 0, 0.5);
        // 菜单图标 hover
        // .menu-icon {
        //   &.menu-icon-menu {
        //     background-image: url("~_img/app-left/menu.png") !important;
        //   }
        // }
        // .menu-icon();
      }

      > i {
        margin: 0;
        // 菜单图标 normal
        // &.menu-icon {
        //   // margin-right: 28px;
        //   width: 34px;
        //   height: 34px;
        //   display: inline-block;
        //   background-repeat: no-repeat;
        //   background-size: 34px 34px;
        //   &.menu-icon-menu {
        //     background-image: url("~_img/app-left/menu.png") !important;
        //   }
        // }
        .menu-icon();

        &.ivu-icon-ios-arrow-down {
          right: 14px;

          &::before {
            content: "\F33D";
          }
        }
      }
    }
  }
}
</style>
