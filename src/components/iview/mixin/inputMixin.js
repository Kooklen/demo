import InputLabel from "../InputLabel"; // 标签组件
export let inputMixin = {
  components: {
    InputLabel
  },
  props: {
    /**
     * 输入框的宽度
     * 字符串：long：400px，middle：240px，short：120px
     * 数字：单位px，自动转化为rem（不需要写单位）
     * */
    inputWidth: {
      type: [String, Number],
      default: "middle"
    }
  },
  data() {
    return {};
  },
  computed: {
    cls() {
      let ret = null;
      if (["long", "middle", "short"].includes(this.inputWidth)) {
        ret = "input-" + this.inputWidth;
      }
      return ret;
    },
    style() {
      let ret = null;
      if (!["long", "middle", "short"].includes(this.inputWidth)) {
        let width = parseInt(this.inputWidth);
        ret = width ? { width: width / 16 + "rem" } : null;
      }
      return ret;
    }
  }
};
