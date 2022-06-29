<template>
  <div class="tab-cut">
    <div>
      <button
        v-for="(item, i) in arr"
        :key="i"
        :class="['tab-item', { active: spNum == i }]"
        @click="spFn(i)"
      >
        {{ item }}
      </button>
    </div>
    <IviewButton v-if="btnBool" @click="btn">代码仓库</IviewButton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spNum: 0,
    };
  },
  props: {
    arr: {
      type: Array,
      default: null,
    },
    btnBool: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    spFn(i) {
      this.spNum = i;
      this.$emit("click", i);
    },
    btn() {
      this.$emit("btnFn");
    },
  },
};
</script>

<style lang = "less" scoped>
.tab-cut {
  width: 100%;
  margin-bottom: 23px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  .tab-item {
    background-color: transparent;
    border: none;
    height: 42px;
    margin: 0 20px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333;
    line-height: 42px;
    position: relative;
    cursor: pointer;
  }
  .active {
    color: #2C46B5;
    &::before {
      content: "";
      width: 100%;
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: linear-gradient(360deg, #0c30b0 0%, #5d60f4 100%);
      box-shadow: 1px 3px 196px 0 #a8afff,
        0 2px 24px 0 rgba(29, 66, 188, 0.28),
        1px 1px 3px 0 rgba(45, 71, 181, 0.36);
      border-radius: 1px;
    }
  }
}
</style>