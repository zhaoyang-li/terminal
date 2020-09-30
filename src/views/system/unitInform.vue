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
        <el-button style="margin: 0 80px 0 90px;" size="medium" type="warning" @click="getStaff">职工信息</el-button>
        <el-button size="medium" type="danger" class="mr5" @click="getBusiness">业务明细</el-button>
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
    <!-- 职工列表 -->
    <el-dialog title="职工列表" width="1100px" :visible.sync="staffDialog" :close-on-click-modal="false">
      <el-table class="scrollbar" :data="staffData" border v-loading="staffLoading" height="350">
        <el-table-column prop="XingMing" label="姓名" align="center"></el-table-column>
        <el-table-column prop="GRZH" width="130" label="个人账号" align="center"></el-table-column>
        <el-table-column prop="ZJHM" width="150" label="证件号码" align="center"></el-table-column>
        <el-table-column prop="GRZHZT" label="个人账户状态" align="center"></el-table-column>
        <el-table-column prop="JZNY" label="缴至年月" align="center"></el-table-column>
        <el-table-column prop="GRJCJS" label="个人缴存基数" align="center"></el-table-column>
        <el-table-column prop="GRYJCE" label="个人缴存额" align="center"></el-table-column>
        <el-table-column prop="DWYJCE" label="单位缴存额" align="center"></el-table-column>
        <el-table-column prop="GRZHYE" label="个人账户余额" align="center"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next"
          :current-page="searchForm.pageNo"
          :page-sizes="[30, 50, 100]"
          :page-size="searchForm.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button style="margin-left: 20px;" @click="staffDialog = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 业务明细 -->
    <el-dialog title="业务明细" width="1100px" :visible.sync="businessDialog" :close-on-click-modal="false">
      <el-form ref="searchForm" :model="searchForm" label-width="90px">
        <el-form-item label="汇缴年份:" prop="year">
          <el-date-picker
            :clearable="false"
            v-model="searchForm.yearMonth"
            type="month"
            :picker-options="pickerOptions"
            value-format="yyyy-MM"
            @change="getBusinessData"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-table class="scrollbar" :data="businessData" border v-loading="businessLoading" height="350">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="DWMC" label="单位名称" align="center"></el-table-column>
        <el-table-column prop="YWMXLX" label="业务明细类型" align="center"></el-table-column>
        <el-table-column prop="XingMing" label="姓名" align="center"></el-table-column>
        <el-table-column prop="FSE" label="发生额" align="center"></el-table-column>
        <el-table-column prop="FSLXE" label="发生利息额" align="center"></el-table-column>
        <el-table-column prop="FSRS" label="发生人数" align="center"></el-table-column>
        <el-table-column prop="HBJNY" label="汇补缴年月" align="center"></el-table-column>
        <el-table-column prop="JZRQ" label="记账日期" align="center"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="buttonLoading" @click="getBusinessDataToPDF">打印单位业务明细</el-button>
        <el-button style="margin-left: 20px;" @click="businessDialog = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="打印" fullscreen :visible.sync="pdfShow">
      <PDF :pdfURL="pdf"></PDF>
    </el-dialog>
  </div>
</template>

<script>
  import DateTime from "../../components/dateTime"
  import IconText from "../../components/iconText"
  import CountDown from "../../components/countDown"
  import PDF from "../../components/PDF"
  import bus from "../../utils/bus"
  import {getUnitAcctDetailInfo, getUnitEmployees, getUnitBusiness, getUnitBusinessToPDF} from "../../api/api"
  import {getStore, getDic, dicType, dateFormat, hidePhoneNum, hideIdcard} from "../../utils/mUtils"

  export default {
    name: "unitInform",
    components: {
      DateTime, IconText, CountDown, PDF
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
        },
        staffDialog: false,
        staffLoading: false,
        staffData: [],
        pageTotal: 0,
        searchForm: {
          DWZH: getStore('DWZH'),
          yearMonth: dateFormat(undefined, 'yyyy-MM'),
          pageNo: 1,
          pageSize: 30
        },
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        pdfShow: false,
        pdf: '',
        businessDialog: false,
        businessLoading: false,
        buttonLoading: false,
        businessData: []
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
      getBusiness() {
        this.businessDialog = true
        this.getBusinessData()
      },
      getBusinessData() {
        this.businessLoading = true
        getUnitBusiness(this.searchForm.yearMonth, res => {
          this.businessLoading = false
          if (res.response !== 'error') {
            this.businessData = res
          } else {
            this.$message.error(res.message)
          }
        })
      },
      getBusinessDataToPDF() {
        this.buttonLoading = true
        getUnitBusinessToPDF(this.searchForm.yearMonth, res => {
          this.buttonLoading = false
          if (res.response !== 'error') {
            this.pdfShow = true
            this.pdf = res.Id
          } else {
            this.$message.error(res.message)
          }
        })
      },
      getStaff() {
        this.staffDialog = true
        this.getData()
      },
      getData() {
        this.staffLoading = true
        getUnitEmployees(this.searchForm, res => {
          this.staffLoading = false
          if (res.response !== 'error') {
            this.pageTotal = res.totalCount
            res.results.forEach((item, index) => {
              res.results[index].GRZHZT = getDic(dicType.个人账户状态, item.GRZHZT).name
              res.results[index].ZJHM = hideIdcard(item.ZJHM)
            })
            this.staffData = res.results
          } else {
            this.$message.error(res.message)
          }
        })
      },
      handlePageChange (val) {
        this.$set(this.searchForm, 'pageNo', val)
        this.getData()
      },
      handleSizeChange (size) {
        this.$set(this.searchForm, 'pageSize', size)
        this.getData()
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
  .unit-inform-detail {
    margin: 0 10px 60px 10px;
    font-size: 16px;
  }
  .unit-inform-detail-row {
    margin: 15px 0;
  }
</style>
