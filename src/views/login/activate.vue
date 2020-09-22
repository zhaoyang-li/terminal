<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">毕节市住房公积金中心</div>
      <el-form :model="param" :rules="rules" ref="resetPassword" label-width="80px" class="ms-content">
        <el-form-item label="证件号码" prop="zjhm">
          <el-input v-model="param.zjhm"></el-input>
        </el-form-item>
        <el-form-item label="职工姓名" prop="name">
          <el-input v-model="param.name"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="param.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="param.confirmPassword"></el-input>
        </el-form-item>
        <div class="warning-text">密码必须包含数字、字母或特殊字符</div>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()" :loading="buttonLoading">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {modifyPassword} from "../../api/api"
  import {getStore, hideIdcard} from "../../utils/mUtils"

  export default {
    data () {
      let vPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认新密码'))
        } else if (value !== this.param.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        buttonLoading: false,
        param: {
          zjhm: hideIdcard(getStore('ZJHM')),
          name: '',
          newPassword: '',
          confirmPassword: ''
        },
        rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
          confirmPassword: [{ required: true, validator: vPassword, trigger: 'blur' }]
        }
      }
    },

    methods: {
      submitForm() {
        this.$refs.resetPassword.validate(valid => {
          if (valid) {
            this.buttonLoading = true
            const req = {
              username: getStore('ZJHM'), name: this.param.name, pwd: this.param.confirmPassword
            }
            modifyPassword(req, result => {
              this.buttonLoading = false
              if (result.response !== 'error') {
                this.$message.success('修改成功，请重新登录！')
                window.localStorage.clear()
                this.$router.push('/index')
              } else {
                this.$message.error(result.message)
              }
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/login_bg_lignt.png');
    background-size: 100%;
  }
  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #b0ddce;
  }
  .ms-login {
    position: absolute;
    left: 70%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(157, 161, 255, 0.3);
    overflow: hidden;
  }
  .ms-content {
    padding: 30px 30px;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 90%;
    height: 36px;
    margin-bottom: 10px;
  }
  .warning-text {
    text-align: center;
    margin-bottom: 10px;
    color: #606266;
  }
</style>
