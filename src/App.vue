<template>
  <div id="app">
    <router-view :class="['router-wrapper']"/>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "App",
  data() {
    return {
      swiper: null,
      boxStyle: {width: "1600px"},
      activeIndex: 0,
      // signArr: [{ name: "工作台", path: "/operat-platform" }],
    };
  },
  computed: {
    ...mapState({
      appTabList(state) {
        return state.common.appTabList;
      },
    })
  },
  watch: {},
  created() {

  },
  mounted() {
  },
  methods: {},
  destroyed() {
  },
};
</script>

<style lang="less">
@import 'http://at.alicdn.com/t/font_2610038_jbaeyalz3lo.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f6f7fb;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
