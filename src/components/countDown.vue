<template>
  <div class="count-down">
    <div class="count-down-header">
      <span>提示</span>
      <i class="el-icon-close"></i>
    </div>
    <p>{{text}}</p>
  </div>
</template>

<script>
  export default {
    name: "countDown",
    props: ['text']
  }
</script>

<style scoped>
  .count-down {
    position: fixed;
    top: 50px;
    right: 30px;
    z-index: 100000;
    background-color: #fff;
    width: 150px;
    height: 50px;
    padding: 10px;
    border-radius: 5px;
  }
  .count-down p {
    color: #606266;
  }
  .count-down-header {
    margin-bottom: 10px;
  }
  .count-down-header span {
    font-weight: 700;
    font-size: 16px;
    color: #303133;
  }
  .count-down-header i {
    float: right;
    cursor: pointer;
  }
</style>
