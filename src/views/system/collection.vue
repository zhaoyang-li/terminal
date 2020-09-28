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
        <el-col :span="12" class="inform-col">个人缴存比例：{{JCXX.GRJCBL}}% </el-col>
        <el-col :span="12" class="inform-col">单位缴存比例：{{JCXX.DWJCBL}}%</el-col>
      </el-row>
      <el-row class="inform-row">
        <el-col :span="12" class="inform-col">个人月缴存额：{{JCXX.GRYJCE}}元</el-col>
        <el-col :span="12" class="inform-col">单位月缴存额：{{JCXX.DWYJCE}}元</el-col>
      </el-row>
      <el-row class="inform-row">
        <el-col :span="8" class="inform-col">个人账户余额：{{JCXX.GRZHYE}}元</el-col>
        <el-col :span="8" class="inform-col">个人缴存基数：{{JCXX.GRJCJS}}元</el-col>
        <el-col :span="8" class="inform-col">缴至年月：{{JCXX.JZNY}}</el-col>
      </el-row>
      <el-row class="inform-row">
        <el-col :span="8" class="inform-col">单位名称：{{JCXX.DWMC}}</el-col>
        <el-col :span="8" class="inform-col">单位账号：{{JCXX.DWZH}}</el-col>
        <el-col :span="8" class="inform-col">单位账户状态：{{JCXX.DWZHZT}}</el-col>
      </el-row>
      <div style="margin-right: 50px; float: right;">
        <el-button
          type="warning"
          class="mr5"
          :loading="buttonLoading"
          @click="getLoadProvePdf"
        >
          打印《异地贷款缴存证明》
        </el-button>
        <el-button style="margin: 0 80px;" type="primary" class="mr5" @click="getDeposit">汇缴记录</el-button>
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
    <!-- 汇缴记录 -->
    <el-dialog title="汇缴记录" width="900px" :visible.sync="collectionVisible" :close-on-click-modal="false">
      <el-form ref="searchForm" :model="searchForm" label-width="90px">
        <el-form-item label="汇缴年份:" prop="year">
          <el-date-picker
            :clearable="false"
            v-model="searchForm.year"
            type="year"
            :picker-options="pickerOptions"
            value-format="yyyy"
            @change="getCollectionData"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-table class="scrollbar" :data="collectionData" border v-loading="dialogLoading" height="350">
        <el-table-column prop="YWLX" label="业务类型" align="center"></el-table-column>
        <el-table-column prop="DWMC" label="单位名称" align="center"></el-table-column>
        <el-table-column prop="FSE" label="发生额" align="center"></el-table-column>
        <el-table-column prop="GRZHYE" label="个人账户余额" align="center"></el-table-column>
        <el-table-column prop="HJNY" label="汇缴年月" align="center">
          <template slot-scope="scope">{{scope.row.HJNY ? scope.row.HJNY : '——'}}</template>
        </el-table-column>
        <el-table-column prop="JZRQ" label="记账日期" align="center"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="buttonLoading" @click="getDepositToPDF">打印汇缴记录</el-button>
        <el-button style="margin-left: 20px;" @click="collectionVisible = false">关闭</el-button>
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
  import {getUserInfo, getLoadProvePdf, getPersonDeposit, getPersonDepositPdf} from "../../api/api"
  import {getStore, getDic, dicType, dateFormat} from "../../utils/mUtils"

  export default {
    name: "collection",
    components: {
      DateTime, IconText, CountDown, PDF
    },
    data() {
      return {
        pdfShow: false,
        pdf: '',
        buttonLoading: false,
        collectionVisible: false,
        loading: false,
        countDown: false,
        countText: '',
        JCXX: {
          GRJCBL: '',
          DWJCBL: '',
          GRYJCE: '',
          DWYJCE: '',
          GRZHYE: '',
          GRJCJS: '',
          DWMC: '',
          DWZH: '',
          DWZHZT: '',
          JZNY: ''
        },
        searchForm: {
          year: dateFormat(undefined, 'yyyy')
        },
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        collectionData: [],
        dialogLoading: false
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
          res.JCXX[0].DWZHZT = getDic(dicType.单位账户状态, res.JCXX[0].DWZHZT).name
          this.JCXX = res.JCXX[0]
        } else {
          this.$message.error(res.message)
        }
      })
    },
    methods: {
      getLoadProvePdf() {
        this.buttonLoading = true
        getLoadProvePdf(getStore('GRZH'), res => {
          this.pdfShow = true
          this.buttonLoading = false
          if (res.response !== 'error') {
            this.pdf = res.Id
          } else {
            this.$message.error(res.message)
          }
        })
      },
      getDeposit() {
        this.collectionVisible = true
        this.getCollectionData()
      },
      getCollectionData() {
        this.dialogLoading = true
        getPersonDeposit({year: this.searchForm.year, grzh: getStore('GRZH')}, res => {
          this.dialogLoading = false
          if (res.response !== 'error') {
            this.collectionData = res
          } else {
            this.$message(res.message)
          }
        })
      },
      getDepositToPDF() {
        this.buttonLoading = true
        getPersonDepositPdf({year: this.searchForm.year, grzh: getStore('GRZH')}, res => {
          this.pdfShow = true
          this.buttonLoading = false
          if (res.response !== 'error') {
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
    text-align: center;
  }
</style>
