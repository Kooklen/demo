<!--
  @description: 自定义树状选择器
-->
<template>
  <div
    :class="[
      'i-tree-select',
      disabled && 'disabled',
      value != undefined && 'selected-val',
    ]"
  >
    <InputLabel v-if="label" :text="label" :required="required" />
    <div :class="['ivu-tree-select', showDropdown ? 'ivu-select-visible' : '']">
      <!-- 未开启查询 -->
      <div
        class="ivu-select-selection select-input input-middle"
        @click="handleClickInput"
        v-if="!filterOpen"
      >
        <span class="ivu-select-selected-val" v-if="valueTitle">{{
          valueTitle
        }}</span>
        <span class="ivu-select-placeholder" v-else>{{ placeholder }}</span>
        <i class="ivu-icon ivu-icon-ios-arrow-down ivu-select-arrow"></i>
        <i
          class="ivu-icon ivu-icon-ios-close-circle ivu-cascader-arrow"
          @click.stop="handleClearVal"
        ></i>
      </div>

      <!-- 开启查询 -->
      <div class="input_tree_search" v-else>
        <IviewInput
          v-model="valueTitle"
          icon="ios-search"
          enter-button
          :clearable="false"
        >
          <span slot="append" @click.stop="query1">搜索</span>
        </IviewInput>
        <!-- <Input /> -->
      </div>
      <transition name="dropdown">
        <div
          class="ivu-select-dropdown select-dropdown"
          v-show="showDropdown"
          v-autoHide="{ showDropdown }"
        >
          <Tree
            v-bind="$attrs"
            v-on="$listeners"
            @on-select-change="handleTreeSelect"
            :key="label"
            v-model="this.value"
            :data="treeList"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { inputMixin } from "./mixin/inputMixin";
export default {
  name: "IviewTreeSelect",
  mixins: [inputMixin],
  components: {},
  // 自定义v-model
  model: {
    prop: "value",
    event: "select",
  },
  props: {
    // v-model 值
    value: {
      type: [Number, String],
    },
    // 输入框标签
    label: {
      type: String,
    }, // 是否必填，传入label才有效
    required: {
      type: Boolean,
    },
    placeholder: {
      type: String,
      default: "请输入...",
    },
    // 是否禁用
    disabled: {
      type: Boolean,
    },
    // 是否可以清除选中
    clearable: {
      type: Boolean,
      default: true,
    },
    objInvalue: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
    filterOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 是否显示下拉框
      showDropdown: false,
      inputValue: "",
      treeListInit: [],
      treeList: [],
      valueTitle: "",
    };
  },
  watch: {
    value: {
      handler(n) {
        // console.log(n, "this.value");
      },
    },
    data: {
      handler(n) {
        // console.log(n, "this.data");
        if (n) {
          this.treeListInit = this.$u.deepCopy(n);
          this.treeList = this.treeListInit;
        }
      },
      immediate: true,
    },
  },
  computed: {
    // 数据字典
    treeDict() {
      // let { data: treeData } = this.$attrs;
      // return this.$u.tree.tree2dict(treeData || [], "value");
      return this.$u.tree.tree2dict(this.treeListInit || [], "value");
    },
    // 显示选择的文本
    // valueTitle() {
    //   // let treeDict = this.$u.tree.tree2dict(treeData || [], "value");
    //   // console.log(this.value, 'this.value')
    //   return this.treeDict[this.value] && this.treeDict[this.value].title;
    // },
    // valueTitle: {
    //   get: function() {
    //     return this.treeDict[this.value] && this.treeDict[this.value].title;
    //   },
    //   set: function(e) {
    //     this.valueTitle = e;
    //   }
    // }
  },
  created() {},
  methods: {
    queryAll() {
      this.treeList = this.treeListInit;
      this.handleClickInput();
    },
    query1() {
      this.filterNode(this.valueTitle, this.treeListInit);
    },
    // 清空所选值
    handleClearVal() {
      let node = this.treeDict[this.value];
      node && (node.selected = false);
      this.$emit("select", null);
    },
    // 点击选择框
    handleClickInput() {
      if (!this.disabled) {
        this.showDropdown = !this.showDropdown;
      }
    },
    // 选中节点
    handleTreeSelect(nodeArr) {
      // console.log(this.value, nodeArr);
      this.valueTitle =
        this.treeDict[nodeArr[0].value] &&
        this.treeDict[nodeArr[0].value].title;
      this.showDropdown = false;
      if (nodeArr[0]) {
        let node = nodeArr[0];

        this.$emit("select", node.value || node.id);
        this.$emit("select-node", node);
      } else {
        let node = this.treeDict[this.value];
        node && (node.selected = true);
      }
    },
    filterNode(value) {
      const rebuildData = (value, arr) => {
        // console.log(value, arr);
        let newarr = [];
        arr.forEach((element) => {
          // console.log(element);
          if (element.children && element.children.length) {
            if (element.name.indexOf(value) > -1) {
              element.expand = true;
              newarr.push(element);
            }
            const ab = rebuildData(value, element.children);
            const obj = {
              ...element,
              expand: true,
              children: ab,
            };
            // console.log(ab, obj);
            if (ab && ab.length) {
              newarr.push(obj);
            }
          } else {
            if (element.name.indexOf(value) > -1) {
              newarr.push(element);
            }
          }
        });
        console.log(newarr, "newarr");
        return newarr;
      };

      if (!value) {
        //内容为空时，查询所有
        this.treeList = this.treeListInit;
      } else {
        this.treeList = [];
        this.treeList = rebuildData(value, this.treeListInit);
      }

      this.handleClickInput();
    },
  },
};
</script>

<style lang="less" scoped>
@import "./config/input";

.i-tree-select {
  .input-layout();
  .ivu-tree-select {
    // position: relative; /** 加了这个会有问题？？！！ */
    .ivu-icon-ios-close-circle {
      display: none;
    }
    /*这个ivu-select-visible是iview里关联的样式*/
    &.ivu-select-visible {
      .select-input {
        position: relative;
        // .border(@border-active);
      }

      .ivu-select-selection {
        .input-view-focus();
        box-shadow: none;
      }
    }

    // 输入框样式
    .select-input {
      .input-view();
      .input-width();
      .input-text;
      font-size: @base-font-size;
      line-height: @input-height;
      // width: 266px;
      padding: 0 8px;
      transition: all 0.3s;
      cursor: pointer;
      .ivu-select-placeholder {
        .placeholder();
      }
      &:hover {
        .input-view-hover();
      }
      &:focus {
        .input-view-focus();
      }
    }

    // 下拉样式
    .select-dropdown {
      min-width: 266px;
      position: absolute;
      z-index: 900;
      .show-scroll();
      /deep/.ivu-tree {
        padding: 0 10px 0 10px;
        li {
          // margin: 0;
          .ivu-tree-arrow {
            display: inline-block;
            line-height: 34px;
            height: 34px;
            .ivu-icon {
              color: #d3d6d9;
            }
          }
          .ivu-tree-title {
            padding: 0 40px 0 10px;
            display: inline-block;
            font-size: 16px;
            width: 100%;
            line-height: 30px;
            height: 30px;
            color: #2c3542;
            user-select: none;
            transition: all 0.3s;
            &:hover {
              color: #1a45b8;
            }
            &.ivu-tree-title-selected {
              background: linear-gradient(
                90deg,
                rgba(217, 226, 249, 0) 0%,
                rgba(217, 226, 249, 0.6) 14%,
                rgba(217, 226, 249, 0.2) 100%
              );
              color: #1a45b8;
              font-weight: 500;
            }
          }

          .ivu-tree-arrow {
            height: 30px;
            display: inline-flex !important;
            align-items: center;
            i {
              background: #ffffff;
              box-shadow: inset 0px 0px 3px 1px #cad7fa;
              border-radius: 4px;
            }
          }
          .ivu-tree-arrow-open {
            // f330
            .ivu-icon-ios-arrow-forward:before {
              content: "\F418";
              width: 16px;
              height: 16px;
              font-size: 16px;
            }
          }

          .ivu-icon-ios-arrow-forward:before {
            content: "\f330";
            width: 16px;
            height: 16px;
            font-size: 16px;
            color: #1b3f9b;
          }

          .ivu-icon {
            transform: rotate(0);
            width: 16px;
            height: 16px;
          }
        }
      }
    }

    .input_tree_search {
      /deep/.ivu-input-wrapper {
        .ivu-input {
          border: none;
          border-radius: 0px;
          box-shadow: none;
        }
        .ivu-input-group-prepend,
        .ivu-input-group-append {
          background: #282828;
          border: 1px solid transparent;
          cursor: pointer;
        }
        .ivu-input-group-prepend {
          border-right-color: black;
        }
        .ivu-input-group-append {
          border-left-color: black;
        }
      }
    }
  }
  &.disabled {
    .ivu-tree-select {
      .select-input,
      .select-input:hover {
        cursor: not-allowed;
        opacity: 0.5;
        border: 1px solid #4e4e4f;
        box-shadow: inset 0 0 8px 0 rgba(0, 0, 0, 0.48);
      }
    }
  }
  // 清空值
  &.selected-val:not(.disabled) {
    &:hover {
      .ivu-icon-ios-arrow-down {
        display: none;
      }
      .ivu-icon-ios-close-circle {
        display: inline-block;
      }
    }
  }
}
</style>
