<template>
  <div class="http404-container">
    <div class="http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="../../assets/images/404.png" alt="404">
        <img class="pic-404__child left" src="../../assets/images/404_cloud.png" alt="404">
        <img class="pic-404__child mid" src="../../assets/images/404_cloud.png" alt="404">
        <img class="pic-404__child right" src="../../assets/images/404_cloud.png" alt="404">
      </div>
      <div class="text-404">
        <div class="text-404__oops">404!</div>
        <div class="text-404__headline">抱歉，您访问的页面不存在或没有权限.</div>
        <div class="text-404__info">请检查您输入的地址是否正确，或点击下方按钮返回首页.</div>
        <router-link :to="url" class="text-404__return-home">
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        url: '/index'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '404.scss';
</style>
