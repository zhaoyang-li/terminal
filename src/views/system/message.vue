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
          <el-form-item label="信息分类:">
            <el-select v-model="searchForm.tag" @change="changeTag">
              <el-option
                v-for="(item, index) in tagsList"
                :key="index"
                :label="item || '所有'"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-card class="inform-card" v-for="(item, index) in tableData" :key="index">
          <el-row>
            <el-col :span="3">
              <el-image
                style="width: 100px; height: 100px"
                :src="item.cover || 'https://fw.bjzfgjj.gov.cn/public/image/weapp/icon.png'"
                fit="fit">
              </el-image>
            </el-col>
            <el-col :span="20">
              <div @click="handleClick(item)" style="cursor: pointer;">
                <div style="font-size: 25px; font-weight: bold;">{{'【' + item.tags + '】' + item.title}}</div>
                <div style="font-size: 20px; margin-top: 15px;">{{item.brief}}</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
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
    <!-- 弹出框 -->
    <el-dialog title="详情" :visible.sync="detailVisible" :close-on-click-modal="false" fullscreen>
      <div style="padding: 0 50px;">
        <div style="text-align: center; font-size: 25px; font-weight: bold;">{{'【' + detailForm.tags + '】' + detailForm.title}}</div>
        <div style="font-size: 20px; margin: 20px;">简介：{{detailForm.brief}}</div>
        <div style="color: #999; margin: 10px 20px;">{{'发布时间：' + detailForm.publishDate + '&nbsp;&nbsp;&nbsp;&nbsp;阅读量：' + detailForm.readCount}}</div>
        <div
          style="background-color: #f8f8f8; margin: 20px; border: #f5f5f5 solid 1px; border-radius: 2px; padding: 10px; line-height: 25px;"
          v-html="detailForm.htmlContent"
        ></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import DateTime from "../../components/dateTime"
  import IconText from "../../components/iconText"
  import CountDown from "../../components/countDown"
  import bus from "../../utils/bus"
  import {getPublishArticle, getPublishArticleDetail} from "../../api/glptApi"

  export default {
    name: "message",
    components: {
      DateTime, IconText, CountDown
    },
    data() {
      return {
        loading: false,
        detailVisible: false,
        searchForm: {
          tag: '',
          client: 'terminal',
          pageNo: 1,
          pageSize: 5
        },
        pageTotal: 0,
        tableData: [],
        detailForm: {
          createdAt: '',
          title: '',
          brief: '',
          tags: '',
          cover: '',
          markdownContent: '',
          htmlContent: '',
          remark: '',
          state: true
        },
        tagsList: ['', '政策', '基层', '动态'],
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
      handleClick(row) {
        this.detailVisible = true
        this.detailForm = row
        getPublishArticleDetail(row.id, () => {})
      },
      getData() {
        this.loading = true
        getPublishArticle(this.searchForm, res => {
          this.loading = false
          const {code, data, message} = res
          if (code && code === '0') {
            this.tableData = data.results
            this.pageTotal = data.countRecord
          } else {
            this.$message.error(message)
          }
        })
      },
      changeTag () {
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
  .handle-search {
    margin-left: 30px;
  }
  .inform-card {
    margin: 0 30px 20px 30px;
  }
</style>
