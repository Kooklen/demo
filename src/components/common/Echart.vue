<!--
  对echart进行封装，只需要传入option即可。
  对option进行监听，图表根据数据动态变化。
 -->
<template>
  <div class="echart" ref="echart" />
</template>

<script>
const echarts = require("echarts");
// import "echarts-liquidfill";
import { debounce } from "_u/tool.js";
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
      default: () => ({})
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    /**
     * watch option 当数据变化时自动重绘图表
     * （注意传入的option必须为响应式数据才起效，否则需要手动执行setOption方法）
     */
    option: {
      handler() {
        let style = {
          color: ['#F36B52', '#525DF3']
        }
        if (this.chart) {
          this.setOption(style);
        }
      },
      deep: true,
      immediate: true
    }
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
      option = {
        ...option,
        ...this.option
      };
      option && this.chart.setOption(option, animationDuration);
    }
  },
  mounted() {
    this.initChart();
    this.resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 200);
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    if (this.chart) {
      window.removeEventListener("resize", this.resizeHandler);
      this.chart.dispose();
      this.chart = null;
    }
  }
};
</script>

<style lang="less" scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>


<docs>
```vue
<template>
  <div>
    <div style="float: left; width: 50%;">
      <Echart :option="option1" style="height:200px" />
      <IviewButton @on-click="handleClick1">重绘</IviewButton>
    </div>
    <div style="float: left; width: 50%; height:200px;">
      <Echart :option="option2" style="height:200px" ref="option2" />
      <IviewButton @on-click="handleClick2">重绘</IviewButton>
    </div>
  </div>
</template>

<script>
// option2 是非响应式数据
const option2 = {
  color: ["#3398DB"],
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  grid: {
    left: "3%",
    right: "3%",
    bottom: "3%",
    top: "3%",
    containLabel: true
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(220, 220, 220, 0.8)"
      }
    }
  ]
};
export default {
  data() {
    return {
      // option1为响应式数据
      option1: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      }
    };
  },
  methods: {
    handleClick1() {
      // 响应式数据只需要改变数据，echart自动重绘
      this.option1.series[0].data[0].value = Math.ceil(Math.random() * 10000);
      this.option1.series[0].data[1].value = Math.ceil(Math.random() * 10000);
      this.option1.series[0].data[2].value = Math.ceil(Math.random() * 10000);
      this.option1.series[0].data[3].value = Math.ceil(Math.random() * 10000);
      this.option1.series[0].data[4].value = Math.ceil(Math.random() * 10000);
    },
    handleClick2() {
      this.option2.series[0].data = Array(7)
        .fill(1)
        .map(item => {
          return Math.ceil(Math.random() * 500);
        });

      // 非响应式数据修改后，需要手动调用echart实例的setOption方法来重绘
      this.$refs.option2.setOption(this.option2);
    }
  },
  created() {
    this.option2 = option2;
    console.log(this.option1, this.option2);
  }
};
</script>

```
</docs>