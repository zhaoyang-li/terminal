<template>
  <div class="login-wrap scrollbar">
    <div class="login-header">
      <img class="imgLogo" src="../../assets/images/logo.png" alt="毕节市住房公积金中心">
      <div class="header-right">
        <DateTime></DateTime>
      </div>
    </div>
    <div class="container scrollbar" v-loading="loading">
      <div style="text-align: center; font-size: 22px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: #8cc5ff solid 1px;">基本信息</div>
      <el-row class="inform-row">
        <el-col :span="8">单位名称：{{DWXX.DWGJXX.DWMC}}</el-col>
        <el-col :span="8">单位账号：{{DWXX.DWGJXX.DWZH}}</el-col>
        <el-col :span="8">单位账户状态：{{DWXX.DWGJXX.DWZHZT}}</el-col>
      </el-row>
      <el-row class="inform-row">
        <el-col :span="8">经办人：{{DWXX.JBRXX.JBRXM}}</el-col>
        <el-col :span="8">联系电话：{{DWXX.JBRXX.JBRSJHM}}</el-col>
        <el-col :span="8">业务网点：{{DWXX.YWWD}}</el-col>
      </el-row>
      <el-row class="inform-row">
        <el-col :span="6">缴至年月：{{DWXX.DWDJXX.JZNY}}</el-col>
        <el-col :span="6">应缴年月：{{DWXX.DWDJXX.YJNY}}</el-col>
        <el-col :span="6">单位缴存比例：{{DWXX.DWDJXX.DWJCBL}}%</el-col>
        <el-col :span="6">个人缴存比例：{{DWXX.DWDJXX.GRJCBL}}%</el-col>
      </el-row>
      <div style="margin-right: 100px; float: right;">
        <el-button size="medium" type="primary" class="mr5" @click="detailDialog = true">详细信息</el-button>
        <el-button style="margin: 0 80px;" size="medium" type="warning">职工信息</el-button>
        <el-button size="medium" type="danger" class="mr5">业务明细</el-button>
      </div>
    </div>
    <div class="login-footer">
      <IconText icon="fa fa-sign-out" text="退出" @click="signOut"></IconText>
      <IconText icon="el-icon-s-home" text="返回首页" @click="goPage('/index')"></IconText>
      <IconText icon="fa fa-reply" text="返回上一级" @click="goPage(-1)"></IconText>
    </div>
    <CountDown v-if="countDown" :text="countText"></CountDown>
    <!-- 详细信息 -->
    <el-dialog title="单位详细信息" width="900px" :visible.sync="detailDialog" :close-on-click-modal="false">
      <div class="scrollbar" style="height: 300px; overflow-y: auto;">
        <div class="unit-inform-detail">
          <el-divider>关键信息</el-divider>
          <el-row class="unit-inform-detail-row" :gutter="10">
            <el-col :span="8">单位名称：{{DWXX.DWGJXX.DWMC}}</el-col>
            <el-col :span="8">单位账号：{{DWXX.DWGJXX.DWZH}}</el-col>
            <el-col :span="8">单位账户状态：{{DWXX.DWGJXX.DWZHZT}}</el-col>
          </el-row>
          <el-row class="unit-inform-detail-row" :gutter="10">
            <el-col :span="8">单位地址：{{DWXX.DWGJXX.DWDZ}}</el-col>
            <el-col :span="8">法人：{{DWXX.DWGJXX.DWFRDBXM}}</el-col>
            <el-col :span="8">法人证件类型：{{DWXX.DWGJXX.DWFRDBZJLX}}</el-col>
          </el-row>
          <el-row class="unit-inform-detail-row" :gutter="10">
            <el-col :span="8">法人证件号码：{{DWXX.DWGJXX.DWFRDBZJHM}}</el-col>
            <el-col :span="8">单位隶属关系：{{DWXX.DWGJXX.DWLSGX}}</el-col>
            <el-col :span="8">单位类别：{{DWXX.DWGJXX.DWLB}}</el-col>
          </el-row>
          <el-row class="unit-inform-detail-row" :gutter="10">
            <el-col :span="8">经济类型：{{DWXX.DWGJXX.DWJJLX}}</el-col>
            <el-col :span="8">控股情况：{{DWXX.DWGJXX.KGQK}}</el-col>
            <el-col :span="8">所属行业：{{DWXX.DWGJXX.DWSSHY}}</el-col>
          </el-row>
          <el-row class="unit-inform-detail-row" :gutter="10">
            <el-col :span="8">行政区域：{{DWXX.DWGJXX.DWXZQY}}</el-col>
            <el-col :span="8">批准机关名称：{{DWXX.DWGJXX.PZJGMC}}</el-col>
            <el-col :span="8">批准机关级别：{{DWXX.DWGJXX.PZJGJB}}</el-col>
          </el-row>
          <el-row class="unit-inform-detail-row" :gutter="10">
            <el-col :span="8">登记注册号：{{DWXX.DWGJXX.DJZCH}}</el-col>
            <el-col :span="8">登记使用印章：{{DWXX.DWGJXX.DJSYYZ}}</el-col>
            <el-col :span="8">组织机构代码：{{DWXX.DWGJXX.ZZJGDM}}</el-col>
          </el-row>
        </div>
        <div class="unit-inform-detail">
          <el-divider>联系方式</el-divider>
          <el-row class="unit-inform-detail-row" :gutter="10">
            <el-col :span="6">联系电话：{{DWXX.DWLXFS.DWLXDH}}</el-col>
            <el-col :span="6">邮政编码：{{DWXX.DWLXFS.DWYB}}</el-col>
            <el-col :span="6">传真号码：{{DWXX.DWLXFS.CZHM}}</el-col>
            <el-col :span="6">电子信箱：{{DWXX.DWLXFS.DWDZXX}}</el-col>
          </el-row>
        </div>
        <div class="unit-inform-detail">
          <el-divider>登记信息</el-divider>
          <el-row class="unit-inform-detail-row" :gutter="10">
            <el-col :span="8">单位首次汇缴年月：{{DWXX.DWDJXX.DWSCHJNY}}</el-col>
            <el-col :span="8">单位缴存比例：{{DWXX.DWDJXX.DWJCBL}}%</el-col>
            <el-col :span="8">个人缴存比例：{{DWXX.DWDJXX.GRJCBL}}%</el-col>
          </el-row>
          <el-row class="unit-inform-detail-row" :gutter="10">
            <el-col :span="8">单位设立日期：{{DWXX.DWDJXX.DWSLRQ}}</el-col>
            <el-col :span="8">发薪日：{{DWXX.DWDJXX.DWFXR}}</el-col>
            <el-col :span="8">发薪账号：{{DWXX.DWDJXX.FXZH}}</el-col>
          </el-row>
          <el-row class="unit-inform-detail-row" :gutter="10">
            <el-col :span="12">发薪账户开户银行：{{DWXX.DWDJXX.FXZHKHYH}}</el-col>
            <el-col :span="12">发薪账户户名：{{DWXX.DWDJXX.FXZHHM}}</el-col>
          </el-row>
        </div>
        <div class="unit-inform-detail">
          <el-divider>经办人信息</el-divider>
          <el-row class="unit-inform-detail-row" :gutter="10">
            <el-col :span="8">经办人证件号码：{{DWXX.JBRXX.JBRZJHM}}</el-col>
            <el-col :span="8">经办人姓名：{{DWXX.JBRXX.JBRXM}}</el-col>
            <el-col :span="8">经办人手机号码：{{DWXX.JBRXX.JBRSJHM}}</el-col>
          </el-row>
        </div>
        <div class="unit-inform-detail">
          <el-divider>受托银行信息</el-divider>
          <el-row class="unit-inform-detail-row" :gutter="10">
            <el-col :span="12">受托银行名称：{{DWXX.WTYHXX.STYHMC}}</el-col>
            <el-col :span="12">受托银行代码：{{DWXX.WTYHXX.STYHDM}}</el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button style="margin-left: 20px;" @click="detailDialog = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import DateTime from "../../components/dateTime"
  import IconText from "../../components/iconText"
  import CountDown from "../../components/countDown"
  import bus from "../../utils/bus"
  import {getUnitAcctDetailInfo} from "../../api/api"
  import {getStore, getDic, dicType, dateFormat, hidePhoneNum, hideIdcard} from "../../utils/mUtils"

  export default {
    name: "unitInform",
    components: {
      DateTime, IconText, CountDown
    },
    data() {
      return {
        loading: false,
        detailDialog: false,
        countDown: false,
        countText: '',
        DWXX: {
          DWGJXX: {
            DWMC: '',
            DWZH: '',
            DWZHZT: ''
          },
          DWDJXX: {
            JZNY: '',
            YJNY: '',
            DWJCBL: '',
            GRJCBL: ''
          },
          JBRXX: {
            JBRXM: '',
            JBRZJHM: '',
            JBRSJHM: ''
          },
          DWLXFS: {
            DWYB: '',
            DWLXDH: '',
            CZHM: '',
            DWDZXX: ''
          },
          WTYHXX: {
            STYHMC: '',
            STYHDM: ''
          },
          YWWD: ''
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
      getUnitAcctDetailInfo(getStore('DWZH'), res => {
        this.loading = false
        if (res.response !== 'error') {
          res.DWGJXX.DWZHZT = getDic(dicType.单位账户状态, res.DWGJXX.DWZHZT).name
          res.DWGJXX.DWFRDBZJLX = getDic(dicType.证件类型, res.DWGJXX.DWFRDBZJLX).name
          res.DWGJXX.DWLB = getDic(dicType.单位类别, res.DWGJXX.DWLB).name
          res.DWGJXX.DWJJLX = getDic(dicType.单位经济关系, res.DWGJXX.DWJJLX).name
          res.DWGJXX.KGQK = getDic(dicType.控股情况, res.DWGJXX.KGQK).name
          res.DWGJXX.DWSSHY = getDic(dicType.单位所属行业, res.DWGJXX.DWSSHY).name
          res.DWGJXX.DWXZQY = getDic(dicType.单位行政区域, res.DWGJXX.DWXZQY).name
          res.DWGJXX.PZJGJB = getDic(dicType.批准机关级别, res.DWGJXX.PZJGJB).name
          res.DWGJXX.DWLSGX = getDic(dicType.单位隶属关系, res.DWGJXX.DWLSGX).name
          res.JBRXX.JBRSJHM = hidePhoneNum(res.JBRXX.JBRSJHM)
          res.JBRXX.JBRZJHM = hideIdcard(res.JBRXX.JBRZJHM)
          res.DWGJXX.DWFRDBZJHM = hideIdcard(res.DWGJXX.DWFRDBZJHM)
          res.DWDJXX.YJNY = dateFormat(res.DWDJXX.JZNY.replace(/-/g, "/") + '/01', 'yyyy-MM', 'next_month')
          this.DWXX = res
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
  .unit-inform-detail {
    margin: 0 10px 60px 10px;
    font-size: 16px;
  }
  .unit-inform-detail-row {
    margin: 15px 0;
  }
</style>
