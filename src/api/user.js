import axios from 'axios'
import {commonPost} from "../utils/axiosUtils"

export function getJdk () {
  global.axiosNew = axios.create({
    timeout: 1000 * 60 * 5,
    headers: {
      'Cache-control': 'no-cache',
      'Pragma': 'no-cache',
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': "application/json;charset=utf-8"
    }
  })
}

/**
 * 登录
 */
export function unitLogins(data, callback) {
  const req = {
    username: data.dwzh,
    pwd: data.password,
    dynamicPassword: data.dynamicPassword
  }
  commonPost('/account/loginUnit', req, callback)
}

export function readlLogin(zjhm, callback) {
  const req = {
    username: zjhm
  }
  commonPost('/account/loginPerson', req, callback)
}

export function getDynamicCode(data, callback) {
  commonPost('/account/common/sendVerificationNumber/dynamicPassword', data, callback)
}
