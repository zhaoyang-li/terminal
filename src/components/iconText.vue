<template>
  <div class="icon-text" @click="goPage">
    <i :class="icon" style="font-size: 35px; "></i>
    <p style="font-size: 15px;">{{text}}</p>
  </div>
</template>

<script>
  export default {
    name: "icon-text",
    props: ['icon', 'text'],
    methods: {
      goPage() {
        this.$emit('click')
      }
    }
  }
</script>

<style scoped>
  .icon-text {
    float: right;
    height: 80px;
    width: 80px;
    cursor: pointer;
    text-align: center;
    padding-top: 20px;
    color: #fff;
    margin: 0 20px;
  }
</style>
