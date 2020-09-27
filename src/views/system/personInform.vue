<template>
  <div class="login-wrap scrollbar">
    <div class="login-header">
      <img class="imgLogo" src="../../assets/images/logo.png" alt="毕节市住房公积金中心">
      <div class="header-right">
        <DateTime></DateTime>
      </div>
    </div>
    <div class="container scrollbar" v-loading="loading">
      <el-row class="inform-row">
        <el-col :span="6" class="inform-col">姓名：{{JBXX.XingMing}}</el-col>
        <el-col :span="9" class="inform-col">个人账号：{{JBXX.GRZH}}</el-col>
        <el-col :span="9" class="inform-col">个人账号状态：{{JBXX.GRZHZT}}</el-col>
      </el-row>
      <el-row class="inform-row">
        <el-col :span="6">证件类型：{{JBXX.ZJLX}}</el-col>
        <el-col :span="9">证件号码：{{JBXX.ZJHM}}</el-col>
        <el-col :span="9">出生年月：{{JBXX.CSNY}}</el-col>
      </el-row>
      <el-row class="inform-row">
        <el-col :span="6">手机号码：{{JBXX.SJHM}}</el-col>
        <el-col :span="9">开户银行名称：{{JBXX.GRCKZHKHYHMC}}</el-col>
        <el-col :span="9">银行账户号码：{{JBXX.GRCKZHHM}}</el-col>
      </el-row>
      <div style="margin-left: 70px;">
        <el-button size="medium" type="primary" class="mr5">缴存信息</el-button>
        <el-button style="margin: 0 80px;" size="medium" type="warning" class="mr5">提取记录</el-button>
        <el-button size="medium" type="danger" class="mr5">贷款信息</el-button>
      </div>
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
  import {getUserInfo} from "../../api/api"
  import {getStore, getDic, dicType, hideIdcard, hidePhoneNum} from "../../utils/mUtils"

  export default {
    name: "personInform",
    components: {
      DateTime, IconText, CountDown
    },
    data() {
      return {
        loading: false,
        countDown: false,
        countText: '',
        JBXX: {
          XingMing: '',
          GRZH: '',
          GRZHZT: '',
          ZJLX: '',
          ZJHM: '',
          CSNY: '',
          SJHM: '',
          GRCKZHKHYHMC: '',
          GRCKZHHM: ''
        }
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
      this.loading = true
      getUserInfo(getStore('GRZH'), res => {
        this.loading = false
        if (res.response !== 'error') {
          console.log(res)
          res.JBXX.GRZHZT = getDic(dicType.个人账户状态, res.JBXX.GRZHZT).name
          res.JBXX.ZJLX = getDic(dicType.证件类型, res.JBXX.ZJLX).name
          res.JBXX.ZJHM = hideIdcard(res.JBXX.ZJHM)
          res.JBXX.SJHM = hidePhoneNum(res.JBXX.SJHM)
          this.JBXX = res.JBXX
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
  .inform-row {
    margin: 10px 10px 40px 70px;
    font-size: 20px;
  }
</style>
