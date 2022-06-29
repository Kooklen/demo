<template>
  <div class="left-nav">
    <div class="nav-name">
      {{ navName }}
    </div>
    <div :class="['list-item', {'act': item.path == path}]" v-for="(item, i) in list" :key="i" @click="toPath(item)">
      <div class="title">
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LeftNav",
    props: {
      navName: {
        type: String,
        default: '管理'
      },
      list: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        path: this.list[0].path,
        routeArr: []
      }
    },
    watch: {
      '$route.path'(n) {
        this.routeArr = n.split('/');
        this.path = this.routeArr[this.routeArr.length - 1];
      }
    },
    methods: {
      toPath(item) {
        this.path = item.path;
        this.routeArr[this.routeArr.length - 1] = item.path;
        this.$router.push(this.routeArr.join('/'));
        this.$emit('change', item.title)
      }
    },
    mounted() {
      let routeArr = this.$route.path.split('/');
      this.routeArr = routeArr;
      this.path = routeArr[routeArr.length - 1];
    }
  }
</script>

<style lang="less" scoped>
  .left-nav {
    width: 202px;
    height: 100%;
    box-shadow: 0 0 15px 0 rgba(218, 218, 218, 0.5);
    border-radius: 8px;
    margin-right: 30px;
    background: #fff;
    .flex-column();
    padding: 0 20px;

    .nav-name {
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px solid rgba(190, 199, 220, 0.5);
      font-size: 20px;
      font-family: MicrosoftYaHei;
      color: #2C3542;
      line-height: 26px;
      position: relative;
      /*margin-bottom: 20px;*/

      &::after {
        content: '';
        width: 100%;
        height: 1px;
        background: #BEC7DC;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }

    .list-item {
      width: 100%;
      /*height: 35px;*/
      font-size: 16px;
      cursor: pointer;
      border-bottom: 1px dashed #BEC7DC;
      color: #2C3542;
      padding: 11px 0;

      .title {
        width: calc(100% + 40px);
        height: 40px;
        .flex-center();
        justify-content: flex-start;
        margin: 0 -20px;
        padding: 0 20px;

        &:hover {
          color: #515CF3;
          background: #F6F7FF;
        }

        &::before {
          content: '';
          width: 4px;
          height: 14px;
          border-radius: 2px;
          margin-right: 9px;
          overflow: hidden;
        }
      }

      &.act {
        color: #515CF3;

        .title {
          &::before {
            background: #515CF3;
            box-shadow: 1px 1px 2px 0px rgba(81, 92, 243, 0.37), 1px 1px 2px 0px #B6BBFF inset;
          }
        }
      }
    }
  }
</style>