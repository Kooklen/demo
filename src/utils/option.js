class Option {
  constructor(option) {
    const fontColor = "#E5F1FF";  //字体颜色
    const fontSize = 12;
    const axisColor='#97A6BA' //坐标轴颜色
    this.title = {
      right: 25,
      top: 10,
      textStyle: {
        color: fontColor,
        fontSize: fontSize,
      },
      ...option.title,
    };
    this.grid = {
      top: "15%",
      left: 32,
      right: 32,
      bottom: "35px",
      containLabel: true,
      ...option.grid,
    };
    this.tooltip = {
      show: true,
      // trigger: 'axis',
      // axisPointer: {
      //   type: ''
      // },
      // formatter: `{name|${20}}`,
      // textStyle: {
      //   rich: {
      //     name: {
      //       color: 'red',
      //       lineHeight: 10
      //     }
      //   }
      // },
      ...option.tooltip,
    };
    this.legend = {
      show: true,
      right:'5%',
      // x: "right",
      y: "top",
      itemWidth: 15,
      itemHeight: 5,
      itemGap: 20,
      // itemStyle:{
      // },
      textStyle: {
        color: fontColor,
        fontSize: 12,
      },
      ...option.legend,
    };
    this.xAxis = Array.isArray(option.xAxis)
      ? [
          {
            type: "category",
            axisLabel: {
              color: fontColor,
              fontSize,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ECECEC",
              },
            },
            axisTick: {
              show: true,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#ECECEC",
              },
            },
            data: ["1月", "2月", "3月", "4月", "5月", "6月"],
            ...option.xAxis[0],
          },
          {
            type: "category",
            axisLabel: {
              color: fontColor,
              fontSize,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ECECEC",
              },
            },
            axisTick: {
              show: true,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#ECECEC",
              },
            },
            data: ["1月", "2月", "3月", "4月", "5月", "6月"],
            ...option.xAxis[1],
          },
        ]
      : {
          type: "category",
          nameTextStyle: {
            color: "#282828",
            padding: [25, 0, 0, 0],
          },
          // 坐标轴从1开始
          boundaryGap: true,
          axisLabel: {
            color: fontColor,
            fontSize,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: axisColor,
              width:2,
              opacity:0.3
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#ECECEC",
            },
          },
          data: ["1月", "2月", "3月", "4月", "5月", "6月"],
          ...option.xAxis,
        };
    this.yAxis = Array.isArray(option.yAxis)
      ? [
          {
            type: "value",
            name: "单位:个",
            nameTextStyle: {
              color: fontColor,
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: fontColor,
                fontSize,
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#27b4c2",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#ECECEC",
              },
            },
            ...option.yAxis[0],
          },
          {
            type: "value",
            name: "单位:个",
            nameTextStyle: {
              color: fontColor
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: fontColor,
                fontSize,
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#27b4c2",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#ECECEC",
              },
            },
            ...option.yAxis[1],
          },
        ]
      : {
          type: "value",
          // name: '单位:个',
          nameTextStyle: {
            color: fontColor,
            padding:[0,0,-5,0]
          },
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: fontColor,
              fontSize,
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: axisColor,
              opacity:0.3,
              width:2
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#ECECEC",
            },
          },
          ...option.yAxis,
        };
    this.color = option.color
      ? [...option.color]
      : [
        '#94F0FB',
        '#2E63E1',
        '#FFF9B7',
        '#24E8A1',
        '#FF9962'
        ];
    this.series = [
      ...option.series.map((item) => ({
        type: "line",
        symbol: "circle",
        symbolSize: 8,
        // itemStyle: {
        //   color: '#0092f6'
        // },
        data: [1, 4, 7, 2, 5, 8],
        ...item,
      })),
    ];
  }
}
export default Option;
export const LineGradientColor = (arr,xy='x') => {
  return {
    type: "linear",
    x: 0,
    y: 0,
    x2: xy=='x'?1:0,
    y2: xy=='y'?1:0,
    colorStops: arr.map((item, i) => {
      let len = arr.length;
      let n1 = 1 - (len - 2) / (len - 1);
      if (i == 0) {
        return { offset: 0, color: arr[i] };
      } else if (i == arr.length - 1) {
        return { offset: 1, color: arr[i] };
      } else {
        return { offset: (i * n1).toFixed(2), color: arr[i] };
      }
    }),
  };
};
