<template>
  <div class="com-demo" :style="{background: bgColor}">
    <div class="selector-group">
      <IviewButtonGroup :dataList="dataList" :back-stage="backStage" @on-change="handleChange" />
    </div>
    <h1>》》》 输入表单</h1>
    <div class="item">
      <IviewSwitch label="Switch开关" :back-stage="backStage" />
      <IviewSwitch label="禁用开关" :disabled="disabled" :back-stage="backStage" />
    </div>
    <div class="item">
      <IviewInput label="普通输入框" prefix="ios-contact" :back-stage="backStage" />
      <IviewInput label="长输入框" search input-width="long" :back-stage="backStage" />
      <IviewInput label="禁用输入框" :disabled="disabled" :back-stage="backStage" />
    </div>
    <div class="item">
      <IviewInput label="文本输入框" type="textarea" :back-stage="backStage" />
      <IviewInput label="长输入框" type="textarea" input-width="long" :back-stage="backStage" />
      <IviewInput label="禁用输入框" :disabled="disabled" type="textarea" :back-stage="backStage" />
    </div>
    <div class="item">
      <IviewSelect label="下拉选择器" :optionList="optionList" :back-stage="backStage" />
      <IviewSelect
        label="长下拉选择器"
        input-width="long"
        :optionList="optionList"
        :back-stage="backStage"
      />

      <IviewSelect label="暂无数据" :optionList="[]" :back-stage="backStage" />
      <IviewSelect
        label="禁用"
        :disabled="disabled"
        :optionList="optionList"
        :back-stage="backStage"
      />
    </div>
    <div class="item">
      <IviewDatePicker label="日期选择器" :back-stage="backStage" />
      <IviewDatePicker label="datetype" type="datetime" :back-stage="backStage" />
      <IviewDatePicker
        label="datetimerange"
        type="datetimerange"
        input-width="long"
        :back-stage="backStage"
      />
      <IviewDatePicker
        label="disabled"
        type="daterange"
        :disabled="disabled"
        :back-stage="backStage"
      />
    </div>
    <div class="item">
      <IviewTimePicker label="时间选择器" :back-stage="backStage" />
      <IviewTimePicker
        format="HH:mm"
        type="timerange"
        input-width="middle"
        :back-stage="backStage"
      />
      <IviewTimePicker label="时间选择器" confirm :back-stage="backStage" />
    </div>
    <div class="item">
      <IviewCascader label="级联选择器" :data="cascaderData" :back-stage="backStage" />
      <IviewCascader label="选择即改变" change-on-select :data="cascaderData" :back-stage="backStage" />
      <IviewCascader label="搜索" filterable :data="cascaderData" :back-stage="backStage" />
      <IviewCascader label="暂无数据" :data="[]" :back-stage="backStage" />
      <IviewCascader label="禁用" :data="cascaderData" :disabled="disabled" :back-stage="backStage" />
    </div>
    <h1>》》》 按钮 & 按钮组</h1>
    <div class="item">
      <IviewButton cus-type="primary">主要按钮</IviewButton>
      <IviewButton cus-type="secondary">次要按钮</IviewButton>
      <IviewButton cus-type="danger">警告按钮</IviewButton>
      <IviewButton :disabled="disabled" cus-type="disabled">禁用按钮</IviewButton>
    </div>
    <div class="item">
      <IviewButtonGroup label="默认" :dataList="optionList" :back-stage="backStage" />
      <IviewButtonGroup
        label="内发光"
        active-inner-shadow
        :dataList="optionList"
        :back-stage="backStage"
      />
    </div>
    <h1>》》》 单选框 & 多选框</h1>
    <div class="item">
      <IviewRadioGroup :radioList="radioList" />
      <IviewRadioGroup vertical :radioList="radioList" />
    </div>
    <h1>》》》 表格 & 分页</h1>
    <div class="item">
      <IviewTable :data="tableData" :columns="tableColumns" :back-stage="backStage" :page="page" />
    </div>
    <div class="item">
      <IviewTable
        :data="tableData"
        border
        :columns="tableColumns"
        :back-stage="backStage"
        :page="page"
      />
    </div>
  </div>
</template>

<script>
// import IviewButtonGroup from "./IviewButtonGroup";
// import IviewSwitch from "./IviewSwitch";
// import IviewInput from "./IviewInput";
// import IviewSelect from "./IviewSelect";
// import IviewDatePicker from "./IviewDatePicker";
// import IviewTimePicker from "./IviewTimePicker";
// import IviewCascader from "./IviewCascader";
// import IviewTable from "./IviewTable";
// import IviewButton from "./IviewButton";
// import IviewRadioGroup from "./IviewRadioGroup";

let bgColorList = ["#1C1C1C", "#2b6e4c"];
export default {
  name: "ComDemo",
  components: {
    // IviewButtonGroup,
    // IviewSwitch,
    // IviewInput,
    // IviewSelect,
    // IviewDatePicker,
    // IviewTimePicker,
    // IviewCascader,
    // IviewTable,
    // IviewButton,
    // IviewRadioGroup
  },
  data() {
    return {
      index: 0,
      dataList: ["前台样式", "后台样式"],
      disabled: true,
      // select props
      optionList: [
        {
          label: "选择1",
          value: 1
        },
        {
          label: "选择2",
          value: 2
        },
        {
          label: "选择3",
          value: 3,
          disabled: true
        }
      ],
      cascaderData: [
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "gugong",
              label: "故宫"
            },
            {
              value: "tiantan",
              label: "天坛"
            },
            {
              value: "wangfujing",
              label: "王府井"
            }
          ]
        },
        {
          value: "jiangsu",
          label: "江苏",
          children: [
            {
              value: "nanjing",
              label: "南京",
              disabled: true,
              children: [
                {
                  value: "fuzimiao",
                  label: "夫子庙"
                }
              ]
            },
            {
              value: "suzhou",
              label: "苏州",
              children: [
                {
                  value: "zhuozhengyuan",
                  label: "拙政园"
                },
                {
                  value: "shizilin",
                  label: "狮子林"
                }
              ]
            }
          ]
        }
      ],
      // table props
      tableData: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park"
        }
      ],
      tableColumns: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      page: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizeOpts: [10, 20, 30, 50, 100]
      },
      radioList: [
        { value: "3", label: "日数据" },
        { value: "2", label: "1小时" },
        { value: "1", label: "5分钟" }
      ]
    };
  },
  computed: {
    bgColor() {
      return bgColorList[this.index];
    },
    backStage() {
      return !!this.index;
    }
  },
  methods: {
    handleChange(e) {
      this.index = this.dataList.indexOf(e);
    }
  }
};
</script>

<style lang='less' scoped>
@import "../config/index";
.com-demo {
  color: @text-color;
  height: 100vh;
  padding: 20px;
  .show-scroll();
  .selector-group {
    position: fixed;
    right: 40px;
    top: 20px;
  }
  .item {
    padding: 10px 0;
    > div {
      margin-right: 20px;
    }
  }
  h1 {
    margin-top: 30px;
  }
}
</style>