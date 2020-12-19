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
        留言建议
      </div>
      <el-form ref="addForm" :model="addForm" :rules="rules" @submit.native.prevent inline class="inform-form">
        <el-form-item label="名称:">
          <el-input v-model="addForm.subUserName" class="form-input mr5" disabled></el-input>
        </el-form-item>
        <el-form-item label="类型:">
          <el-select v-model="addForm.type" class="form-input mr5">
            <el-option
              v-for="(item, index) in complaintType"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机:">
          <el-input v-model="addForm.subUserPhone" class="form-input mr5" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="标题:" prop="title">
          <el-input v-model="addForm.title" class="form-input mr5" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容:" prop="content">
          <el-input type="textarea" :rows="4" v-model="addForm.content" class="form-input mr5" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-right: 100px; float: right;">
        <el-button size="medium" type="primary" class="mr5" @click="submitData">提交</el-button>
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
  import {submitComplaint} from "../../api/glptApi"

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
        addForm: {
          subUserCode: getStore('GRZH') || getStore('DWZH'),
          subUserIdcard: getStore('ZJHM') || '',
          subUserName: getStore('GRMC') || getStore('DWMC'),
          subUserPhone: '',
          subUserType: getStore('GRZH') ? 'person' : 'unit',
          title: '',
          content: '',
          type: '01'
        },
        complaintType: [
          {
            code: '01',
            name: '业务咨询'
          }, {
            code: '02',
            name: '意见建议'
          }, {
            code: '03',
            name: '监督投诉'
          }
        ],
        rules: {
          title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
          content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
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
    },
    methods: {
      goPage(url) {
        if (url === -1) {
          this.$router.go(-1)
        } else {
          this.$router.push(url)
        }
      },
      submitData() {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.loading = true
            submitComplaint(this.addForm, res => {
              this.loading = false
              const {code, message} = res
              if (code && code === '0') {
                this.$message.success('提交成功！')
                this.$router.go(-1)
              } else {
                this.$message.error(message)
              }
            })
          } else {
            return false
          }
        })
      },
      signOut() {
        window.localStorage.clear()
        this.$router.push('/index')
      }
    }
  }
</script>
<style>
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

  .inform-form {
    margin: 0 150px;
  }
  .inform-form .el-form-item__label {
    font-size: 20px;
  }

  .form-input {
    width: 450px !important;
  }
</style>
