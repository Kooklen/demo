<template>
  <div class="box">
    <div class="left-btn-box">
      <div v-for="(ele, eleIndex) in btnList" :key="eleIndex">
        <IviewButton
          v-if="ele.tagType === 'add'"
          @click="doChildEvent(ele.click)"
          :data-index="eleIndex"
        >
          <Icon :type="ele.icon" size="14" v-if="ele.icon" />
          {{ ele.label }}
        </IviewButton>
        <IviewButton
          v-else-if="ele.tagType === 'del'"
          cusType="secondary"
          @click="doChildEvent(ele.click)"
          :data-index="eleIndex"
        >
          批量删除
        </IviewButton>
      </div>
    </div>
    <div class="right-filter-box">
      <div v-for="(item, index) in formList" :key="index">
        <IviewSelect
          v-if="item.tagType === 'select'"
          @on-change="(e) => doChildEvent(item.onChange, e)"
          :optionList="item.optionList"
          :placeholder="item.placeholder || ''"
          v-model="renderListData[item.code]"
          :data-index="index"
          clearable
        />
        <IviewInput
          v-if="item.tagType === 'input'"
          @on-change="(e) => doChildEvent(item.onChange, e)"
          :placeholder="item.placeholder || ''"
          v-model="renderListData[item.code]"
          :data-index="index"
        >
          <Icon type="ios-search" slot="prefix" />
        </IviewInput>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IviewForm",
  props: {
    renderList: {
      type: Array,
      default: () => [],
    },
    renderListData: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    renderList: {
      handler(n) {
        if (n) {
          this.btnList = n.filter((ele) => {
            return ele.type === "btn";
          });

          this.formList = n.filter((ele) => {
            return ele.type === "from";
          });
          console.log(this.btnList, this.formList);
        }
      },
      immediate: true,
      deep: true,
    },
    renderListData: {
      handler(n) {
        this.formData = n;
      },
      immediate: true,
    },
  },
  data() {
    return {
      search: "",
      btnList: [],
      formList: [],
      formData: {},
    };
  },
  methods: {
    handleClickAdd() {
      this.$emit("add");
    },
    handleClickDel() {
      this.$emit("del");
    },
    searchChange() {
      this.$emit("change", this.search);
    },
    doChildEvent(clickEvent, args) {
      console.log(clickEvent, args, "doChildEvent");
      args = args || {};
      if (typeof clickEvent === "function") {
        clickEvent(args);
      } else {
        if (clickEvent) {
          let t = this.$parent;
          while (!t[clickEvent]) {
            t = t.$parent;
          }
          t[clickEvent](args);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  justify-content: space-between;

  .right-filter-box {
    display: flex;

    & > div {
      margin-left: 10px;
    }
  }

  margin-bottom: 15px;
  .flex-center();
  justify-content: space-between;

  /* .right-filter-box {
      .flex-center();
    } */
}
</style>