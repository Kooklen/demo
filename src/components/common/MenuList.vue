<template>
  <div class="menu-list">
    <Menu mode="horizontal" :active-name="active" @on-select="selectMenu">
      <div v-for="(item, i) in menu" :key="i">
        <MenuItem :name="item.path" v-if="!item.children || !item.children.length">
          <span class="title">
            <span :class="'icon ' + item.icon"></span>
            {{ item.title }}
          </span>
        </MenuItem>
        <Submenu :name="item.path" v-else>
          <template slot="title">
            <span :class="'icon ' + item.icon"></span>
            {{ item.title }}
          </template>
          <MenuItem :name="child.path" v-for="(child, j) in item.children" :key="j">
            {{ child.title }}
          </MenuItem>
        </Submenu>
      </div>
    </Menu>
  </div>
</template>

<script>
  import {Menu, MenuItem} from "iview";
  // import menu from '_d/menu'

  export default {
    name: "MenuList",
    components: {Menu, MenuItem},
    props: {
      menu: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        // menu,
        active: '/home/home-page',
        // showMenu: true
      }
    },
    watch: {
      '$route.path'(n) {
        this.active = n;
        this.init(n);
      }
    },
    methods: {
      selectMenu(path) {
        let len = this.$route.path.split('/').length > 3;
        if (path == this.$route.path || len && this.$route.path.includes(path)) return;
        this.$router.push(path);
      },
      init(route) {
        let len = route.split('/').length > 3;
        this.active = !len ? route : '/' + route.split('/').slice(1, 3).join('/');
        console.log(route, this.active, len, 'aa')
        // if (route == '/demonstration') {
        //   this.showMenu = false;
        // } else {
        //   this.showMenu = true;
        // }
      }
    },
    mounted() {
      this.init(this.$route.path);
    }
  }
</script>

<style lang="less" scoped>
  .menu-list {
    width: 1274px;

    /deep/ .ivu-menu {
      width: 100%;
      height: 100%;
      /*height: 34px;*/
      .flex-center();
      justify-content: flex-start;
      background: transparent;

      & > div {
        height: 100%;

        & > li {
          width: auto;
          /*padding: 0;*/
          /*padding-right: 10px;*/
          padding: 0 20px;
          margin-right: 10px;
          font-size: 16px;
          min-width: 100px;
          word-break: keep-all;

          &.ivu-menu-item {
            color: rgba(255, 255, 255, 0.8);
          }

          .title {
            .flex-center();
            position: relative;
          }

          &.ivu-menu-item-active,
          &.ivu-menu-submenu-active,
          &.ivu-menu-item-selected {
            color: #fff;
            /*color: #515CF3;*/
            border-color: transparent;

            .title {
              &::after {
                content: '';
                display: inline-block;
                width: 100%;
                height: 4px;
                border-radius: 2px;
                background: #515CF3;
                position: absolute;
                bottom: 8px;
                left: 0;
              }
            }


            &.ivu-menu-item:hover,
            &.ivu-menu-submenu:hover {
              background: transparent;
            }

            &:not(.ivu-menu-item-active.ivu-menu-item-selected):hover {
              border-bottom-color: transparent;
            }
          }

          &.ivu-menu-item:hover,
          &.ivu-menu-submenu:hover {
            color: #fff;
            background: #474A51;
            border-color: transparent;
          }

          .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item:hover {
            background: #474A51;
          }

          .icon {
            width: 16px;
            height: 16px;
            background-size: 100% 100% !important;
            background-repeat: no-repeat !important;
            margin-right: 10px;
            opacity: .8;

            &.home-page {
              background: url("~_img/header/home-page.png");
            }

            &.automatic-learning {
              background: url("~_img/header/automatic-learning.png");
            }

            &.dataset-management {
              background: url("~_img/header/dataset-management.png");
            }

            &.training-tasks {
              background: url("~_img/header/training-tasks.png");
            }

            &.model-management {
              background: url("~_img/header/model-management.png");
            }

            &.capability-release {
              background: url("~_img/header/capability-release.png");
            }

            &.online-development {
              background: url("~_img/header/online-development.png");
            }

            &.service-management {
              background: url("~_img/header/service-management.png");
            }

            &.system-management {
              background: url("~_img/header/system-management.png");
            }
          }

          &.ivu-menu-item-active,
          &.ivu-menu-item-selected,
          &.ivu-menu-submenu-active,
          &.ivu-menu-submenu:hover,
          &.ivu-menu-item:hover {
            .icon {
              opacity: 1;
            }
          }
        }

      }

      .ivu-menu-submenu-title {
        .flex-center();
      }

      &.ivu-menu-horizontal.ivu-menu-light:after {
        width: 0;
      }
    }
  }
</style>