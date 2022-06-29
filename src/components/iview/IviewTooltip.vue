<template>
  <div class="i-tooltip">
    <Tooltip v-bind="$attrs" v-on="$listeners">
      <slot></slot>
      <slot name="content" slot="content"></slot>
    </Tooltip>
  </div>
</template>

<script>
// @group iview
export default {
  name: "IviewTooltip",
  data() {
    return {};
  }
};
</script>

<style lang='less' scoped>
.i-tooltip {
  display: inline-block;
  /deep/.ivu-tooltip {
    .ivu-tooltip-rel {
    }
    .ivu-tooltip-popper {
      .ivu-tooltip-content {
        .ivu-tooltip-arrow {
        }
        .ivu-tooltip-inner {
          white-space: normal;
        }
      }
    }
  }
}
</style>