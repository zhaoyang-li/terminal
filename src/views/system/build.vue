<template>
  <div class="login-wrap scrollbar">
    <div class="login-header">
      <img class="imgLogo" src="../../assets/images/logo.png" alt="毕节市住房公积金中心">
      <div class="header-right">
        <DateTime></DateTime>
      </div>
    </div>
    <div class="container scrollbar" v-loading="loading">
      <div class="handle-search">
        <el-form :model="searchForm" @submit.native.prevent inline>
          <el-form-item label="业务网点:">
            <el-select v-model="searchForm.YWWD" @change="changeNetwork">
              <el-option
                v-for="item in networkList"
                :key="item.id"
                :label="item.MingCheng"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border class="table"  >
        <el-table-column prop="LPMC" label="楼盘名称" align="center"></el-table-column>
        <el-table-column prop="LPDZ" label="楼盘地址" align="center"></el-table-column>
        <el-table-column prop="FKGS" label="房开公司" align="center"></el-table-column>
        <el-table-column prop="YWWD" label="业务网点" width="180" align="center"></el-table-column>
        <el-table-column prop="SLSJ" label="准入时间" width="180" align="center"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="searchForm.pageNo"
          :page-size="searchForm.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
    <div class="login-footer">
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
  import {getNetworkList, getBuildList} from "../../api/api"

  export default {
    name: "build",
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
          id: '',
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
      getNetworkList({pageNo: 1, pageSize: 100}, res => {
        const all = [{id: '', MingCheng: '所有'}]
        this.networkList = all.concat(res.results)
      })
      this.getData()
    },
    methods: {
      goPage(url) {
        if (url === -1) {
          this.$router.go(-1)
        } else {
          this.$router.push(url)
        }
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
