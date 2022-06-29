<template>
<div class="main">
 <div class="word">
   + &nbsp;从应用市场添加
 </div>
</div>
</template>

<script>
export default {
  name: "addCard"
}
</script>

<style lang="less" scoped>
.main{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 358px;
  height: 124px;
  background: #FFFFFF;
  box-shadow: 0px 4px 10px 0px rgba(201, 208, 228, 0.4), 0px 1px 5px 0px #E1E8F0;
  border-radius: 4px;
  .word{
    //margin: 0 auto;
    //width: 119px;
    height: 22px;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    line-height: 22px;
  }
}
</style>