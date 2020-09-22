<template>
  <div class="login-wrap scrollbar">
    <div class="login-header">
      <img class="imgLogo" src="../../assets/images/logo.png" alt="毕节市住房公积金中心">
      <div class="header-right">
        <DateTime></DateTime>
      </div>
    </div>
    <div class="login-footer">
      <IconText icon="el-icon-s-home" text="返回首页" @click="goPage('/index')"></IconText>
      <IconText icon="el-icon-back" text="返回上一级" @click="goPage(-1)"></IconText>
    </div>
    <el-dialog title="等额本金还款明细" :visible.sync="detailVisible">
      <div style="max-height: 400px; overflow-y: auto;" class="scrollbar">
        <p style="display: flex; margin-left: 20px;" v-for="count in calRes.payList.length / 3">
          <span class="detail-span">{{calRes.payList[3 * (count - 1)].title}}：{{calRes.payList[3 * (count - 1)].value}}元</span>
          <span class="detail-span">{{calRes.payList[3 * count - 2].title}}：{{calRes.payList[3 * count - 2].value}}元</span>
          <span class="detail-span">{{calRes.payList[3 * count - 1].title}}：{{calRes.payList[3 * count - 1].value}}元</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import DateTime from "../../components/dateTime"
  import IconText from "../../components/iconText"
  import {adder} from "../../utils/mUtils"

  export default {
    name: "network",
    components: {
      DateTime, IconText
    },
    data() {
      return {
        detailVisible: false,
        HKFS: '1',
        JSFS: '1',
        FWZJ: '',
        AJCS: '2',
        DKLB: '1',
        GJJBZ: '',
        SYBZ: '',
        AJNS: 360,
        yearList: [],
        DKLL: '1',
        GJJLL: '3.250000',
        SYLL: '4.75',
        calRes: {
          BXtotalPay: '',
          SFK: '',
          DKZE: '',
          DKYS: '',
          GJJLL: '',
          SYLL: '',
          interest: '',
          totalPay: '',
          momthPay: '',
          payList: [],
          BJtotalPay: '',
          BJSYHK: '',
          BJMYHK: '',
          BJZFLXE: '',
          BXYJHK: '',
          BXHKZE: '',
          BXZFLXE: ''
        }
      }
    },
    created() {
      for (let i = 1; i <= 30; i++) {
        this.yearList.push(
          {
            label: i + '年（' + i * 12 + '期）',
            value: i * 12
          }
        )
      }
    },
    methods: {
      goPage(url) {
        if (url === -1) {
          this.$router.go(-1)
        } else {
          this.$router.push(url)
        }
      },
      getRate(val) {
        val <= 60 ? this.GJJLL = '2.7500000' : this.GJJLL = '3.2500000'
      },
      reSet() {
        this.calRes = {
          SFK: '',
          DKZE: '',
          DKYS: '',
          GJJLL: '',
          SYLL: '',
          interest: '',
          totalPay: '',
          momthPay: '',
          payList: [],
          BJtotalPay: '',
          BJSYHK: '',
          BJMYHK: '',
          BJZFLXE: '',
          BXYJHK: '',
          BXHKZE: '',
          BXZFLXE: ''
        }
        this.HKFS = '1'
        this.JSFS = '1'
        this.AJCS = '2'
        this.FWZJ = ''
        this.DKLB = '1'
        this.GJJBZ = ''
        this.SYBZ = ''
        this.AJNS = 360
      },
      calRepayment() {
        this.calculation(this.HKFS, this.DKLL, this.DKLB, this.JSFS, this.FWZJ, this.GJJBZ, this.SYBZ, this.AJCS, this.GJJLL, this.SYLL, this.AJNS)
      },
      calculation(condition, twoHouse, loanClass, clacClass, loanMoney, accMoney, busMoney, loanPer, accRate, busRate, time) {
        let clacRes = {
          BXtotalPay: '',
          payList: [],
          BJtotalPay: '',
          BJSYHK: '',
          BJMYHK: '',
          BJZFLXE: '',
          BXYJHK: '',
          BXHKZE: '',
          BXZFLXE: '',
          SFK: '',
          DKZE: '',
          DKYS: '',
          GJJLL: '',
          SYLL: '',
          BJHKZE: ''
        }
        // 二手房（110%）
        if (twoHouse === '2') {
          accRate = accRate * 1.1
          busRate = busRate * 1.1
        }
        // 按贷款总额，按揭成数为10
        if (clacClass !== '1') {
          loanPer = 10
        }
        //  等额本息计算方法
        if (condition === '1') {
          // 月还款额
          if (loanClass === '1') {
            // 公积金
            clacRes.BXYJHK = adder(loanMoney * 10000 * loanPer / 10 * accRate / 1200 * Math.pow(1 + accRate / 1200, time) / (Math.pow(1 + accRate / 1200, time) - 1))
          } else if (loanClass === '2') {
            // 商业
            clacRes.BXYJHK = adder(loanMoney * 10000 * loanPer / 10 * busRate / 1200 * Math.pow(1 + busRate / 1200, time) / (Math.pow(1 + busRate / 1200, time) - 1))
          } else {
            // 组合
            clacRes.BXYJHK = adder(busMoney * 10000 * busRate / 1200 * Math.pow(1 + busRate / 1200, time) / (Math.pow(1 + busRate / 1200, time) - 1), accMoney * 10000 * accRate / 1200 * Math.pow(1 + accRate / 1200, time) / (Math.pow(1 + accRate / 1200, time) - 1))
          }
          // 总额
          clacRes.BXtotalPay = adder(clacRes.BXYJHK * time) + '元'
          // 利息
          clacRes.BXZFLXE = adder(clacRes.BXYJHK * time - loanMoney * 10000 * loanPer / 10)
        } else {
          if (loanClass === '1') {
            let monPer = loanMoney * 10000 * loanPer / 10 / time
            let BJtotalPay = 0
            for (let i = 1; i <= time; i++) {
              let s = monPer + (loanMoney * 10000 * loanPer / 10 - monPer * (i - 1)) * accRate / 1200
              s = s.toFixed(2)
              let a = {
                title: '第' + i + '月',
                value: s
              }
              BJtotalPay += parseFloat(s)
              clacRes.payList.push(a)
            }
            clacRes.BJSYHK = adder(loanMoney * 10000 * loanPer / 10 / time + loanMoney * 10000 * loanPer / 10 * accRate / 1200)
            clacRes.BJMYHK = adder(loanMoney * 10000 * loanPer / 10 / time + (loanMoney * 10000 * loanPer / 10 - monPer * (time - 1)) * accRate / 1200)
            clacRes.BJHKZE = adder(BJtotalPay)
            clacRes.BJZFLXE = adder(BJtotalPay - loanMoney * 10000 * loanPer / 10)
          } else if (loanClass === '2') {
            let monPer = loanMoney * 10000 * loanPer / 10 / time
            let BJtotalPay = 0
            for (let i = 1; i <= time; i++) {
              let s = monPer + (loanMoney * 10000 * loanPer / 10 - monPer * (i - 1)) * busRate / 1200
              s = s.toFixed(2)
              let a = {
                title: '第' + i + '月',
                value: s
              }
              BJtotalPay += parseFloat(s)
              clacRes.payList.push(a)
            }
            clacRes.BJSYHK = adder(loanMoney * 10000 * loanPer / 10 / time + loanMoney * 10000 * loanPer / 10 * busRate / 1200)
            clacRes.BJMYHK = adder(loanMoney * 10000 * loanPer / 10 / time + (loanMoney * 10000 * loanPer / 10 - monPer * (time - 1)) * busRate / 1200)
            clacRes.BJHKZE = adder(BJtotalPay)
            clacRes.BJZFLXE = adder(BJtotalPay - loanMoney * 10000 * loanPer / 10)
          } else {
            let BJtotalPay = 0
            let monPer = accMoney * 10000 / time + busMoney * 10000 / time
            for (let i = 1; i <= time; i++) {
              let s = monPer + (busMoney * 10000 - monPer * (i - 1)) * busRate / 1200 + (accMoney * 10000 - monPer * (i - 1)) * accRate / 1200
              s = s.toFixed(2)
              let a = {
                title: '第' + i + '月',
                value: s
              }
              BJtotalPay += parseFloat(s)
              clacRes.payList.push(a)
            }
            clacRes.BJSYHK = adder(accMoney * 10000 / time + accMoney * 10000 * accRate / 1200 + busMoney * 10000 / time + busMoney * 10000 * busRate / 1200)
            clacRes.BJMYHK = adder(accMoney * 10000 / time + (accMoney * 10000 - accMoney * 10000 / time * (time - 1)) * accRate / 1200 + busMoney * 10000 / time + (busMoney * 10000 - busMoney * 10000 / time * (time - 1)) * busRate / 1200)
            clacRes.BJHKZE = adder(BJtotalPay)
            clacRes.BJZFLXE = adder(BJtotalPay - busMoney - accMoney)
          }
        }
        clacRes.BXZFLXE = clacRes.BXZFLXE + '元'
        clacRes.BXYJHK = clacRes.BXYJHK + '元'
        clacRes.BJHKZE = clacRes.BJHKZE + '元'
        clacRes.BJZFLXE = clacRes.BJZFLXE + '元'
        clacRes.BJSYHK = clacRes.BJSYHK + '元'
        clacRes.BJMYHK = clacRes.BJMYHK + '元'
        clacRes.SFK = loanMoney * (10 - loanPer) * 1000 + '元'
        clacRes.DKZE = loanMoney * loanPer * 1000 + '元'
        clacRes.DKYS = time + '月'
        clacRes.GJJLL = accRate + '%'
        clacRes.SYLL = busRate + '%'
        this.calRes = clacRes
      },
      getRepaymentDetail() {
        if (this.calRes.payList.length > 0) {
          this.detailVisible = true
        } else {
          this.$message.info('暂无还款明细！')
        }
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
    height: 80px;
    font-size: 22px;
    color: #fff;
  }
  .login-header .imgLogo {
    float: left;
    margin: 20px 40px;
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
  .detail-span {
    display: block;
    width: 200px;
    font-size: 18px;
    margin: 5px 20px;
  }
</style>
