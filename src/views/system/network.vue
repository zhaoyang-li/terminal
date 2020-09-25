<template>
  <div class="login-wrap scrollbar">
    <div class="login-header">
      <img class="imgLogo" src="../../assets/images/logo.png" alt="毕节市住房公积金中心">
      <div class="header-right">
        <DateTime></DateTime>
      </div>
    </div>
    <div style="max-height: 530px; overflow-y: auto;" class="scrollbar">
      <div style="margin: 0 auto; padding: 10px; background-color: rgba(255, 255, 255, 1); width: 90%; border-radius: 5px;">
        <el-table :data="networkList" stripe style="width: 99%; margin: 0 auto;">
          <el-table-column prop="MingCheng" label="网点" width="240" align="center"></el-table-column>
          <el-table-column prop="LXDH" label="联系方式" width="210" align="center"></el-table-column>
          <el-table-column :formatter="formatWorkTime" label="工作时间" align="center"></el-table-column>
          <el-table-column prop="XXDZ" label="地址" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="login-footer">
      <IconText icon="el-icon-s-home" text="返回首页" @click="goPage('/index')"></IconText>
      <IconText icon="el-icon-back" text="返回上一级" @click="goPage(-1)"></IconText>
    </div>
  </div>
</template>

<script>
  import DateTime from "../../components/dateTime"
  import IconText from "../../components/iconText"
  import {getNetworkList} from "../../api/api"

  export default {
    name: "network",
    components: {
      DateTime, IconText
    },
    data() {
      return {
        networkList: []
      }
    },
    created() {
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
        getNetworkList({pageNo: 1, pageSize: 100}, res => {
          this.networkList = res.results
        })
      },
      formatWorkTime(row) {
        return JSON.parse(row.BLSJ).totalTime
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
