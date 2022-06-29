<!--
  @description: 页面面包屑
-->
<template>
  <div class="app-breadcrumb-wrap">
    <Breadcrumb separator="<span class='breadcrumb-separator'>/</span>">
      <BreadcrumbItem
        v-for="(item, index) in breadcrumb"
        :key="item + index"
        @click.native="handleClick(index)"
        :class="{ clickable: canClick(index) }"
        >{{ item }}</BreadcrumbItem
      >
    </Breadcrumb>
  </div>
</template>

<script>
import menu from "@/datadict/menu";
export default {
  name: "AppBreadcrumb",
  components: {},
  data() {
    return {
      // 页面内的面包屑
      innerPageBreadcrumb: null,
    };
  },
  computed: {
    // 面包屑（从路由中取）
    breadcrumb() {
      let menuDict = this.$u.tree.tree2dict(menu, "path");
      console.log(menuDict, "menuDict");
      let pathList = this.$route.path
        .split("/")
        .slice(1)
        .filter((item) => item !== "home");
      let ret = pathList.map((item) => menuDict[item].title);
      if (this.innerPageBreadcrumb) {
        ret.push(this.innerPageBreadcrumb);
      }
      return ret;
    },
  },
  watch: {
    // 监听路由，路由变化将最后一级面包屑清除
    $route() {
      this.innerPageBreadcrumb = null;
    },
  },
  methods: {
    // 是否可点击
    canClick(index) {
      return index === 1 || (index === 2 && this.breadcrumb.length > 3);
    },
    // 点击面包屑
    handleClick(index) {
      // 点击退出页面（即第3块面包屑对应的页面）
      if (this.breadcrumb.length > 3 && index === 2) {
        this.$bus.$emit("home-back");
        this.innerPageBreadcrumb = null;
      } else if (index === 1) {
        // 打开左侧菜单
        this.$bus.$emit("open-left-sidebar-menu", this.breadcrumb[1]);
      }
    },
  },
  created() {
    // 添加最后一级面包屑
    this.$bus.$on("push-nav", (text) => {
      this.innerPageBreadcrumb = text;
    });

    // 清除最后一级面包屑
    this.$bus.$on("pop-nav", () => {
      this.innerPageBreadcrumb = null;
    });
  },
};
</script>

<style lang="less" scoped>
.app-breadcrumb-wrap {
  height: 40px;
  border-radius: 3px;
  filter: blur(0px);
  align-items: center;
  padding-left: 20px;
  user-select: none;
  border-radius: 5px;
  /deep/.ivu-breadcrumb {
    .clickable {
      cursor: pointer;
      &:hover {
        .ivu-breadcrumb-item-link {
          //   color: @main-color;
        }
      }
    }
    > span:last-child {
      .ivu-breadcrumb-item-link {
        font-weight: bold;
        color: rgba(44, 70, 181, 1);
        line-height: 40px;
      }
    }
    .ivu-breadcrumb-item-link {
      font-size: 14px;
      //   color: @nav-text-color;
    }
    .breadcrumb-separator {
      display: inline-block;
      width: 8px;
      height: 9px;
      //   background: url("~_img/breadcrumb/arrows.png") no-repeat;
      background-size: 100%;
    }
  }
}
</style>
