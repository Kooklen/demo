<!--
  对echart进行封装，只需要传入option即可。
  对option进行监听，图表根据数据动态变化。
 -->
<template>
  <div class="echart" ref="echart" />
</template>

<script>
const echarts = require("echarts");
import "echarts-liquidfill";
import { debounce } from "_u/modules/tool.js";
const animationDuration = 6000;
// @group common
/**
 * 对echart进行封装，实现页面尺寸变化时自动执行resize方法和组件销毁时自动执行dispose方法。
 * 传参时有两种方法，一种是传递响应式数据，数据改变时会自动重绘；
 * 另一种是传递非响应式数据，需要手动调用echart实例的setOption方法。
 * 建议使用非响应式数据，这样性能会更好。
 */

export default {
  name: "Echart",
  props: {
    /**
     * echart配置项
     */
    option: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    /**
     * watch option 当数据变化时自动重绘图表
     * （注意传入的option必须为响应式数据才起效，否则需要手动执行setOption方法）
     */
    option: {
      handler() {
        if (this.chart) {
          this.setOption();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.echart);
      this.setOption(this.option, animationDuration);
      // this.chart.on("click", params => this.$emit("chartClick", params));
    },
    /**
     * @public
     * echart重绘方法
     */
    setOption(option) {
      option = option || this.option;
      option && this.chart.setOption(option, animationDuration);
    },
  },
  mounted() {
    setTimeout(()=> {
      this.initChart();
    })
    this.resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 500);
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    if (this.chart) {
      window.removeEventListener("resize", this.resizeHandler);
      this.chart.dispose();
      this.chart = null;
    }
  },
};
</script>

<style lang="less" scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>