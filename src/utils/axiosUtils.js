import {baseURL, channel} from "../config/config"
import {judgeObj, handingError, getStore} from '../utils/mUtils'
import {JSEncrypt} from 'jsencrypt'

let publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhVNCUrDBppyHXh6/k6yZ1jdjLleQIOn5\n' +
  'kohpVJwS/yWYsJCqpQWADEIAtWoLRoxZN6vVOb+PWeuHGh045GmbcXc7NbrRbM1WE3gN+1uQsLmR\n' +
  'Hq8YAoBHkzd1JaliUrBsOwE0MQEr/SCvXjQ8z2EWLf7t5h58iCi8aTvbPRlJC3Fy1LvTInCH/akH\n' +
  'os3e9qQsZpFCEcKfdrpwnuKWHqwmkdcyqzAWGtq7mGIoOn+03c7T2R8aPAKyZEhe/IF46kKsiFEp\n' +
  'QXKh3J8P63EYin/AgmaINrWz+THxMHCwapPovxjUU2W0WgHR/2Epma5Q/UZLVNpmIzlE3dMMyUyW\n' +
  'ePLqBwIDAQAB'

const encrypt = new JSEncrypt()
encrypt.setPublicKey(publicKey)
const baseOptions = (params, method = 'GET') => {
  return new Promise((resolve) => {
    if (params.data) {
      if (params.url === '/account/loginByCa') {
        params.data.Req.username = encrypt.encrypt(params.data.Req.username)
      }
      params.data = JSON.stringify(params.data)
      if (params.url === '/account/loginPersonFast') {
        params.data = encrypt.encrypt(params.data)
      }
    } else {
      params.data = ''
    }
    const req = {
      path: params.url,
      method: method,
      token: getStore('token') || '',
      requestBody: params.data,
      remoteAddr: '',
      channel: channel,
      contentType: 'application/json'
    }
    global.axiosNew['post'](baseURL, req).then(res => {
      if (res.data.code === '0') {
        if (typeof res.data.data === 'object') {
          resolve(res.data.data)
        } else {
          resolve(JSON.parse(res.data.data))
        }
      } else {
        resolve({Res: {Code: res.data.code, Msg: res.data.message}})
      }
    }).catch(() => {
      resolve({Res: {Code: '10000', Msg: '网络错误！'}})
    })
  })
}

const get = (url, data = '') => {
  const params = {url, data}
  return baseOptions(params, 'GET')
}

const post = (url, data, contentType) => {
  const params = {url, data, contentType}
  return baseOptions(params, 'POST')
}

const put = (url, data = '') => {
  const params = {url, data}
  return baseOptions(params, 'PUT')
}

const deleteUtil = (url, data = '') => {
  const params = {url, data}
  return baseOptions(params, 'DELETE')
}

const commonPost = (url, data, callback) => {
  if (callback !== undefined) {
    post(url, {Req: data}).then(res => {
      if (judgeObj(res.Res)) {
        callback(res.Res)
      } else {
        callback(handingError(res.Res))
      }
    })
  }
}

const commonGet = (url, data, callback) => {
  if (callback !== undefined) {
    get(url, data ? {Req: data} : '').then(res => {
      if (judgeObj(res.Res)) {
        callback(res.Res)
      } else {
        callback(handingError(res.Res))
      }
    })
  }
}

const commonPut = (url, data, callback) => {
  if (callback !== undefined) {
    put(url, {Req: data}).then(res => {
      if (judgeObj(res.Res)) {
        callback(res.Res)
      } else {
        callback(handingError(res.Res))
      }
    })
  }
}

const commonDelete = (url, data, callback) => {
  if (callback !== undefined) {
    deleteUtil(url, {Req: data}).then(res => {
      if (judgeObj(res.Res)) {
        callback(res.Res)
      } else {
        callback(handingError(res.Res))
      }
    })
  }
}

export {
  commonGet,
  commonPost,
  commonPut,
  commonDelete,
  get
}
