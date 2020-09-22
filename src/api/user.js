import axios from 'axios'
import {baseURL} from '../config/config'
import router from '../router/index'
import {setStore, getStore, judgeObj, handingError, handleError} from '../utils/mUtils'

export function getJdk () {
  return new Promise(resolve => {
    if (getStore('token')) {
      global.axiosNew = axios.create({
        timeout: 1000 * 60 * 5,
        headers: {
          'H-Token': getStore('token'),
          'Cache-control': 'no-cache',
          'Pragma': 'no-cache',
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      resolve(1)
    } else {
      let url = document.location.toString()
      if (url.lastIndexOf('/index') === -1) {
        window.localStorage.clear()
        router.push({
          path: '/index'
        })
      }
      resolve(0)
    }
  })
}

/**
 * 登录
 */
export function unitLogins(data, type, callback) {
  let url = baseURL + 'account/loginUnit'
  let req = {
    Req: {
      username: data.dwzh,
      pwd: data.password,
      dynamicPassword: data.dynamicPassword
    }
  }
  axios({ method: 'post', url: url, data: req }).then(result => {
    const response = result.data
    if (judgeObj(response.Res)) {
      window.localStorage.clear()
      setStore('token', response.Res.token)
      setStore('DWZH', result.Res.userInfo.dwzh)
      setStore('DWMC', result.Res.userInfo.dwmc)
      getJdk().then(() => {
        callback(response.Res)
      })
    } else {
      callback(handingError(response.Res))
    }
  }).catch(error => {
    callback(handleError(error))
  })
}

export function readlLogin(data, callback) {
  let url = baseURL + 'account/loginPerson'
  let req = {
    Req: {
      username: data
    }
  }
  axios({ method: 'post', url: url, data: req }).then(result => {
    const response = result.data
    if (judgeObj(response.Res)) {
      window.localStorage.clear()
      setStore('token', response.Res.token)
      setStore('GRMC', response.Res.userInfo.grxm)
      setStore('GRZH', response.Res.userInfo.grzh)
      setStore('ZJHM', response.Res.userInfo.zjhm)
      setStore('GRSTATE', 0)
      getJdk().then(() => {
        callback(response.Res)
      })
    } else {
      callback(handingError(response.Res))
    }
  }).catch(error => {
    callback(handleError(error))
  })
}

export function getDynamicCode(data, callback) {
  const url = baseURL + 'account/common/sendVerificationNumber/dynamicPassword'
  const req = {
    Req: data
  }
  axios({ method: 'post', url: url, data: req }).then(result => {
    const response = result.data
    if (judgeObj(response.Res)) {
      callback(response.Res)
    } else {
      callback(handingError(response.Res))
    }
  }).catch(error => {
    callback(handleError(error))
  })
}
