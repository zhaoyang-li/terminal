<template>
  <div class="login-wrap scrollbar">
    <div class="login-header">
      <img class="imgLogo" src="../../assets/images/logo.png" alt="毕节市住房公积金中心">
      <div class="header-right">
        <DateTime></DateTime>
      </div>
    </div>
    <div class="container scrollbar">
      <div>个人信息</div>
    </div>
    <div class="login-footer">
      <IconText icon="fa fa-sign-out" text="退出" @click="signOut"></IconText>
      <IconText icon="el-icon-s-home" text="返回首页" @click="goPage('/index')"></IconText>
      <IconText icon="fa fa-reply" text="返回上一级" @click="goPage(-1)"></IconText>
    </div>
    <CountDown v-if="countDown" :text="countText"></CountDown>
  </div>
</template>

<script>
  import DateTime from "../../components/dateTime"
  import IconText from "../../components/iconText"
  import CountDown from "../../components/countDown"
  import bus from "../../utils/bus"
  import {getBuildList, getUserInfo} from "../../api/api"
  import {getStore} from "../../utils/mUtils"

  export default {
    name: "personInform",
    components: {
      DateTime, IconText, CountDown
    },
    data() {
      return {
        loading: false,
        searchForm: {
          YWWD: undefined,
          pageNo: 1,
          pageSize: 6
        },
        pageTotal: 0,
        tableData: [],
        networkList: [{
          id: undefined,
          MingCheng: '所有'
        }],
        countDown: false,
        countText: ''
      }
    },
    created() {
      bus.$on('countDown', data => {
        if (data > 0) {
          this.countDown = true
          this.countText = data + '秒后回到首页'
        }
      })
      bus.$on('closeCountDown', () => {
        this.countDown = false
      })
      getUserInfo(getStore('GRZH'), res => {
        if (res.response !== 'error') {
          console.log(res)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    methods: {
      goPage(url) {
        if (url === -1) {
          this.$router.go(-1)
        } else {
          this.$router.push(url)
        }
      },
      signOut() {
        window.localStorage.clear()
        this.$router.push('/index')
      },
      getData() {
        this.loading = true
        getBuildList({SFQY: '1', YWWD: this.searchForm.YWWD, pageNo: this.searchForm.pageNo, pageSize: this.searchForm.pageSize}, res => {
          this.loading = false
          if (res.response !== 'error') {
            this.tableData = res.results
            this.pageTotal = res.totalCount
          } else {
            this.$message.error(res.message)
          }
        })
      },
      changeNetwork () {
        this.$set(this.searchForm, 'pageNo', 1)
        this.getData()
      },
      handlePageChange (val) {
        this.$set(this.searchForm, 'pageNo', val)
        this.getData()
      }
    }
  }
</script>
<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/bg_loginbox.png');
    background-size: 100%;
    overflow: auto;
  }
  .login-header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 125px;
    font-size: 22px;
    color: #fff;
  }
  .login-header .imgLogo {
    float: left;
    margin: 10px 40px;
    width: 500px;
  }
  .header-right {
    float: right;
    width: 150px;
    padding-right: 50px;
  }
  .login-footer {
    position: fixed;
    z-index: 1000;
    height: 80px;
    width: 100%;
    bottom: 10px;
    background-color: rgba(22, 152, 228, 0.4);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  }
</style>
