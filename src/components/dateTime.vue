<template>
  <div class="date-time">
    <p style="height: 65px; line-height: 65px; font-size: 25px; text-align: left;">{{timeText[0]}}</p>
    <p style="height: 15px; line-height: 15px; font-size: 20px; text-align: left;">
      {{timeWeek}}
      <span style="margin-left: 10px;">{{timeText[1]}}</span>
    </p>
  </div>
</template>

<script>
  import {dateFormat} from "../utils/mUtils"

  export default {
    name: "date-time",
    data() {
      return {
        timeText: [],
        timeWeek: ''
      }
    },

    created () {
      this.getDateTime()
      setInterval(() => {
        this.getDateTime()
      }, 10000)
    },

    methods: {
      getDateTime() {
        this.timeText = dateFormat(undefined, 'yyyy/MM/dd hh:mm').split(' ')
        const week = ['日', '一', '二', '三', '四', '五', '六']
        this.timeWeek = '星期' + week[new Date().getDay()]
      }
    }
  }
</script>

<style scoped>
  .date-time {
    float: right;
    height: 80px;
    width: 150px;
  }
</style>
