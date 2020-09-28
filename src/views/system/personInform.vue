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
        <el-col :span="6">姓名：{{JBXX.XingMing}}</el-col>
        <el-col :span="9">个人账号：{{JBXX.GRZH}}</el-col>
        <el-col :span="9">个人账号状态：{{JBXX.GRZHZT}}</el-col>
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
      <div style="margin-right: 100px; float: right;">
        <el-button size="medium" type="primary" class="mr5" @click="goPage('/collection')">缴存信息</el-button>
        <el-button style="margin: 0 80px;" size="medium" type="warning" @click="goExtract">提取记录</el-button>
        <el-button :disabled="DKXX.length === 0" size="medium" type="danger" class="mr5" @click="goPage('/loan')">贷款信息</el-button>
      </div>
    </div>
    <div class="login-footer">
      <IconText icon="fa fa-sign-out" text="退出" @click="signOut"></IconText>
      <IconText icon="el-icon-s-home" text="返回首页" @click="goPage('/index')"></IconText>
      <IconText icon="fa fa-reply" text="返回上一级" @click="goPage(-1)"></IconText>
    </div>
    <CountDown v-if="countDown" :text="countText"></CountDown>
    <el-dialog title="打印" fullscreen :visible.sync="pdfShow">
      <PDF :pdfURL="pdf"></PDF>
    </el-dialog>
    <!-- 提取记录 -->
    <el-dialog title="提取记录" width="900px" :visible.sync="extractVisible" :close-on-click-modal="false">
      <el-form ref="searchForm" :model="searchForm" label-width="90px">
        <el-form-item label="汇缴年份:" prop="year">
          <el-date-picker
            :clearable="false"
            v-model="searchForm.year"
            type="year"
            :picker-options="pickerOptions"
            value-format="yyyy"
            @change="getExtractData"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-table class="scrollbar" :data="extractData" border v-loading="dialogLoading" height="350">
        <el-table-column prop="dwmc" label="单位名称" align="center"></el-table-column>
        <el-table-column prop="fse" label="发生额" align="center"></el-table-column>
        <el-table-column prop="tqyy" label="提取原因" align="center"></el-table-column>
        <el-table-column prop="tqrq" label="提取日期" align="center"></el-table-column>
        <el-table-column prop="ljtqje" label="累计提取金额" align="center"></el-table-column>
        <el-table-column prop="ywwd" label="业务网点" align="center"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="buttonLoading" @click="getExtractToPDF">打印提取记录</el-button>
        <el-button style="margin-left: 20px;" @click="extractVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import DateTime from "../../components/dateTime"
  import IconText from "../../components/iconText"
  import CountDown from "../../components/countDown"
  import PDF from "../../components/PDF"
  import bus from "../../utils/bus"
  import {getUserInfo, getWithdrawlList, getWithdrawlPDF} from "../../api/api"
  import {getStore, getDic, dicType, hideIdcard, hidePhoneNum, dateFormat} from "../../utils/mUtils"

  export default {
    name: "personInform",
    components: {
      DateTime, IconText, CountDown, PDF
    },
    data() {
      return {
        pdfShow: false,
        pdf: '',
        buttonLoading: false,
        extractVisible: false,
        searchForm: {
          year: dateFormat(undefined, 'yyyy')
        },
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        extractData: [],
        dialogLoading: false,
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
        },
        DKXX: []
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
      this.loading = true
      getUserInfo(getStore('GRZH'), res => {
        this.loading = false
        if (res.response !== 'error') {
          res.JBXX.GRZHZT = getDic(dicType.个人账户状态, res.JBXX.GRZHZT).name
          res.JBXX.ZJLX = getDic(dicType.证件类型, res.JBXX.ZJLX).name
          res.JBXX.ZJHM = hideIdcard(res.JBXX.ZJHM)
          res.JBXX.SJHM = hidePhoneNum(res.JBXX.SJHM)
          this.JBXX = res.JBXX
          this.DKXX = res.DKXX
        } else {
          this.$message.error(res.message)
        }
      })
    },
    methods: {
      goExtract() {
        this.extractVisible = true
        this.getExtractData()
      },
      getExtractData() {
        this.dialogLoading = true
        getWithdrawlList({year: this.searchForm.year, grzh: getStore('GRZH')}, res => {
          this.dialogLoading = false
          if (res.response !== 'error') {
            this.extractData = res
          } else {
            this.$message(res.message)
          }
        })
      },
      getExtractToPDF() {
        this.buttonLoading = true
        getWithdrawlPDF({year: this.searchForm.year, grzh: getStore('GRZH')}, res => {
          this.buttonLoading = false
          if (res.response !== 'error') {
            this.pdfShow = true
            this.pdf = res.Id
          } else {
            this.$message.error(res.message)
          }
        })
      },
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
