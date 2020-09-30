<template>
  <div class="login-wrap scrollbar">
    <div class="login-header">
      <img class="imgLogo" src="../../assets/images/logo.png" alt="毕节市住房公积金中心">
      <div class="header-right">
        <DateTime></DateTime>
      </div>
    </div>
    <div class="container scrollbar" v-loading="loading">
      <div style="text-align: center; font-size: 22px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: #8cc5ff solid 1px;">贷款信息</div>
      <el-row class="inform-row">
        <el-col :span="8">贷款账号：
          <el-select v-model="loanIndex">
            <el-option
              v-for="(item, index) in loanList"
              :key="item.DKZH"
              :label="item.DKZH"
              :value="index">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">贷款用途：{{loanList[loanIndex].DKYT}}</el-col>
        <el-col :span="8">贷款状态：{{loanList[loanIndex].DKZHZT}}</el-col>
      </el-row>
      <el-row class="inform-row">
        <el-col :span="8">放款日期：{{loanList[loanIndex].FKRQ}}</el-col>
        <el-col :span="8">到期日期：{{loanList[loanIndex].DQRQ}}</el-col>
        <el-col :span="8">借款合同号：{{loanList[loanIndex].JKHTH}}</el-col>
      </el-row>
      <el-row class="inform-row">
        <el-col :span="8">贷款金额：{{loanList[loanIndex].HTDKJE}}元</el-col>
        <el-col :span="8">贷款期数：{{loanList[loanIndex].DKQS}}</el-col>
        <el-col :span="8">借款人姓名：{{loanList[loanIndex].JKRXM}}</el-col>
      </el-row>
      <el-row class="inform-row">
        <el-col :span="8">借款人证件号码：{{loanList[loanIndex].JKRZJHM}}</el-col>
        <el-col :span="8">受委托银行：{{loanList[loanIndex].SWTYH}}</el-col>
        <el-col :span="8" v-if="loanList[loanIndex].GTJKRXM">共同借款人姓名：{{loanList[loanIndex].GTJKRXM}}</el-col>
      </el-row>
      <el-row class="inform-row">
        <el-col :span="8" v-if="loanList[loanIndex].GTJKRZJHM">共同借款人证件号码：{{loanList[loanIndex].GTJKRZJHM}}</el-col>
      </el-row>
      <div style="margin-right: 100px; float: right;">
        <el-button size="medium" type="primary" class="mr5" @click="goRepayment">还款明细</el-button>
        <el-button style="margin: 0 80px 0 90px;" size="medium" type="warning" @click="toSquareReceiptPdf" :loading="buttonLoading">打印结清证明</el-button>
        <el-button size="medium" type="danger" class="mr5" @click="toPlan">还款计划</el-button>
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
    <!-- 还款明细 -->
    <el-dialog title="还款明细" width="1100px" :visible.sync="repaymentDialog" :close-on-click-modal="false">
      <el-form ref="searchForm" :model="searchForm" label-width="90px">
        <el-form-item label="还款年份:" prop="year">
          <el-date-picker
            :clearable="false"
            v-model="searchForm.year"
            type="year"
            :picker-options="pickerOptions"
            value-format="yyyy"
            @change="getRepaymentData"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-table :data="repaymentData.HKJL" border v-loading="repaymentLoading" height="350">
        <el-table-column prop="YWRQ" label="业务日期" align="center"></el-table-column>
        <el-table-column prop="DKYWMXLX" label="贷款业务明细类型" align="center"></el-table-column>
        <el-table-column prop="FSE" label="发生额" align="center"></el-table-column>
        <el-table-column prop="BJJE" label="本金金额" align="center"></el-table-column>
        <el-table-column prop="LXJE" label="利息金额" align="center"></el-table-column>
        <el-table-column prop="FXJE" label="罚息金额" align="center"></el-table-column>
        <el-table-column prop="DKYE" label="贷款余额" align="center"></el-table-column>
        <el-table-column prop="JZRQ" label="记账日期" align="center"></el-table-column>
        <el-table-column prop="YWZT" label="业务状态" align="center"></el-table-column>
        <el-table-column prop="BEIZHU" label="备注" align="center"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="buttonLoading" @click="getRepaymentToPDF">打印还款明细</el-button>
        <el-button style="margin-left: 20px;" @click="repaymentDialog = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 还款计划 -->
    <el-dialog title="还款计划" width="900px" :visible.sync="planDialog" :close-on-click-modal="false">
      <div style="margin-bottom: 20px; font-size: 20px;">贷款账号：{{plan.DKZH}}&nbsp;&nbsp;&nbsp;贷款发放额：{{plan.DKFFE}}元</div>
      <el-table :data="plan.information" border v-loading="planLoading" height="350">
        <el-table-column prop="HKQC" label="期次" align="center"></el-table-column>
        <el-table-column prop="HKRQ" label="还款日期" align="center"></el-table-column>
        <el-table-column prop="FSE" label="发生额" align="center"></el-table-column>
        <el-table-column prop="HKBJJE" label="还款本金金额" align="center"></el-table-column>
        <el-table-column prop="HKLXJE" label="还款利息金额" align="center"></el-table-column>
        <el-table-column prop="DKYE" label="贷款余额" align="center"></el-table-column>
        <el-table-column prop="QMDKYE" label="期末贷款余额" align="center"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="planDialog = false">关闭</el-button>
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
  import {getLoanRecord, getSquareReceiptPdf, getLoanPaymentPlan, getLoanInfoList, getLoanInfoPDF} from "../../api/api"
  import {getStore, getDic, dicType, dateFormat, hideIdcard} from "../../utils/mUtils"

  export default {
    name: "personInform",
    components: {
      DateTime, IconText, CountDown, PDF
    },
    data() {
      return {
        loading: false,
        countDown: false,
        countText: '',
        loanList: [{
          DKZH: '',
          DKYT: '',
          DKZHZT: '',
          FKRQ: '',
          DQRQ: '',
          JKHTH: '',
          HTDKJE: '',
          DKQS: '',
          JKRXM: '',
          JKRZJHM: '',
          SWTYH: '',
          GTJKRXM: '',
          GTJKRZJHM: ''
        }],
        loanIndex: 0,
        pdfShow: false,
        pdf: '',
        buttonLoading: false,
        repaymentDialog: false,
        searchForm: {
          year: dateFormat(undefined, 'yyyy')
        },
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        repaymentData: {
          HKJL: []
        },
        repaymentLoading: false,
        planDialog: false,
        planLoading: false,
        plan: {
          DKZH: '',
          DKFFE: '',
          information: []
        }
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
      const params = {
        JKRZJHM: getStore('ZJHM'),
        Module: 'DK',
        pageNo: 1,
        pageSize: 100
      }
      getLoanRecord(params, res => {
        this.loading = false
        if (res.response !== 'error') {
          res.results.forEach((item, index) => {
            res.results[index].DKYT = getDic(dicType.贷款用途, item.DKYT).name
            res.results[index].DKZHZT = getDic(dicType.贷款账户状态, item.DKZHZT).name
            res.results[index].JKRZJHM = hideIdcard(item.JKRZJHM)
            res.results[index].GTJKRZJHM = hideIdcard(item.GTJKRZJHM)
          })
          this.loanList = res.results
        } else {
          this.$message.error(res.message)
        }
      })
    },
    methods: {
      goRepayment() {
        this.repaymentDialog = true
        this.getRepaymentData()
      },
      getRepaymentData() {
        this.repaymentLoading = true
        getLoanInfoList(this.loanList[this.loanIndex].DKZH, this.searchForm.year, res => {
          this.repaymentLoading = false
          if (res.response !== 'error') {
            res.HKJL.forEach((item, index) => {
              res.HKJL[index].DKYWMXLX = getDic(dicType.贷款业务类型, item.DKYWMXLX).name
            })
            this.repaymentData = res
          } else {
            this.$message(res.message)
          }
        })
      },
      getRepaymentToPDF() {
        this.buttonLoading = true
        getLoanInfoPDF(this.loanList[this.loanIndex].DKZH, this.searchForm.year, res => {
          this.buttonLoading = false
          if (res.response !== 'error') {
            this.pdfShow = true
            this.pdf = res.Id
          } else {
            this.$message.error(res.message)
          }
        })
      },
      toSquareReceiptPdf() {
        this.buttonLoading = true
        getSquareReceiptPdf(this.loanList[this.loanIndex].DKZH, res => {
          this.buttonLoading = false
          if (res.response !== 'error') {
            this.pdfShow = true
            this.pdf = res.Id
          } else {
            this.$message.error(res.message)
          }
        })
      },
      toPlan() {
        this.planDialog = true
        this.planLoading = true
        getLoanPaymentPlan(this.loanList[this.loanIndex].DKZH, res => {
          this.planLoading = false
          if (res.response !== 'error') {
            this.plan = res
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
