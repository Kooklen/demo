<template>
  <div class="i-checkbox-group">
    <CheckboxGroup v-bind="$attrs" v-on="$listeners">
      <Checkbox
        v-for="(item, i) in optionList"
        :key="i"
        :label="item.value"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </Checkbox>
    </CheckboxGroup>
  </div>
</template>

<script>
// @group iview
export default {
  name: "IviewCheckBoxGroup",
  props: {
    optionList: {
      type: Array,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
@import "./config/index";

.i-checkbox-group {
  /deep/ .ivu-checkbox-group {
    font-size: 14px;
    font-weight: 400;
    color: #110d3c;
    .flex-center();
    justify-content: flex-start;

    .ivu-checkbox-wrapper.ivu-checkbox-group-item {
      min-width: 100px;
      .flex-center();
      justify-content: flex-start;

      .ivu-checkbox {
        .ivu-checkbox-inner {
          border: 1px solid @iview-primary-color;
          margin-right: 8px;
          position: relative;
          .flex-center();
          // left: 50%;
          // top: 50%;
          // transform: translate(-50%, -50%);

          &::after {
          }
        }

        // &.ivu-checkbox-checked {}
      }

      /* 未选悬浮 */
      &:hover {
        color: @iview-primary-color;
      }

      /* 选中 */
      &.ivu-checkbox-wrapper-checked {
        font-weight: 800;
        color: @iview-primary-color;

        .ivu-checkbox {
          .ivu-checkbox-inner {
            border-color: @iview-primary-color;
            border-radius: 4px;

            // &::after {
            //   width: 8px;
            //   height: 8px;
            //   border-radius: 50%;
            //   position: relative;
            //   top: 0;
            //   left: 0;
            // }
          }
        }
      }

      /* 禁止状态 */
      &.ivu-checkbox-wrapper-disabled {
        color: rgba(0, 0, 0, 0.25);

        .ivu-checkbox {
          .ivu-checkbox-inner {
            background: #f2f2f2;
            border: 1px solid #e6e6e6;
          }
        }

        /* 未选悬浮 */
        &:hover {
          color: rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
}
</style>