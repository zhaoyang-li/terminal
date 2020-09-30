<template>
  <div class="login-wrap scrollbar">
    <div class="login-header">
      <img class="imgLogo" src="../../assets/images/logo.png" alt="毕节市住房公积金中心">
      <div class="header-right">
        <DateTime></DateTime>
      </div>
    </div>
    <div class="container scrollbar" v-loading="loading">
      <div
        style="text-align: center; font-size: 22px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: #8cc5ff solid 1px;">
        投诉建议
      </div>
      <el-row class="inform-row" justify="space-around">
        <el-col :span="10" :offset="2" style="text-align: center;">建议人员：
          <el-radio-group v-model="loginType">
            <el-radio label="GR">个人</el-radio>
            <el-radio label="DW">单位</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="10" style="text-align: center;">业务类型：
          <el-select v-model="selectGRType" v-if="loginType === 'GR'">
            <el-option
              v-for="(item, index) in complaintType[loginType]"
              :key="index"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model="selectDWType" v-if="loginType === 'DW'">
            <el-option
              v-for="(item, index) in complaintType[loginType]"
              :key="index"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="inform-row" justify="space-around">
        <el-col :span="3" :offset="4" style="text-align: center;">&nbsp;建议详情：</el-col>
        <el-col :span="10">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="content"></el-input>
        </el-col>
      </el-row>
      <div style="margin-right: 100px; float: right;">
        <el-button size="medium" type="primary" class="mr5" @click="goPage('/collection')">提交</el-button>
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
  import {getStore} from "../../utils/mUtils"

  export default {
    name: "complaint",
    components: {
      DateTime, IconText, CountDown
    },
    data() {
      return {
        loading: false,
        countDown: false,
        countText: '',
        loginType: getStore('GRZH') ? 'GR' : 'DW',
        selectGRType: 'JC',
        selectDWType: 'KH',
        complaintType: {
          GR: [{
            name: '缴存类',
            code: 'JC'
          }, {
            name: '提取类',
            code: 'TQ'
          }, {
            name: '贷款类',
            code: 'DK'
          }, {
            name: '其他',
            code: 'QT'
          }],
          DW: [{
            name: '开户',
            code: 'KH'
          }, {
            name: '汇缴',
            code: 'HJ'
          }, {
            name: '调基调比',
            code: 'TJTB'
          }, {
            name: '其他',
            code: 'QT'
          }]
        },
        content: ''
      }
    },
    created() {
      bus.$on('countDown', data => {
        if (data > 0) {
          this.countDown = true
          this.countText = data + '秒后退出登录'
        }
      })
      bus.$on('closeCountDown', () => {
        this.countDown = false
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
    margin: 10px auto 40px auto;
    font-size: 20px;
  }
</style>
