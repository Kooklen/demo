<template>
  <div>即将跳转个人中心....</div>
</template>

<script>
// 因为微前端页面之间切换会奇妙的白屏,所以使用中转页面解决此bug
export default {
  data() {
    return {}
  },
  created() {
    setTimeout(() => {
      this.$router.push(this.$route.query.link)
    }, 10)
  }
}
</script>

<style lang="less" scoped></style>
