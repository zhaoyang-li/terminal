import {baseURL, channel} from "../config/config"
import router from '../router/index'
import {Message} from 'element-ui'
import {judgeObj, handingError, getStore} from '../utils/mUtils'
import {JSEncrypt} from 'jsencrypt'

let publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkZbnWeHTj3EnqSSgj+bz8GBY0R9oSJqT\n' +
  'GlhrNrQY7CmBSJGUUJdFVk3CYLsSKALx7F790pEUEZFm31sJNRoOGGYHGegidpAkMrvRaMYeUAf+\n' +
  '1Oai4nbVXuaizCn/Jd8C4i92MdXrRGSvnLHtohZTAUYbcXECmtdlQLLONWpUY3IuTtZ6pQ0I+zZc\n' +
  'cU8cZNPGnu93XYUnCuWsJS6/A9R1mmt6Krl+in8FsUZLbEBaKDRj31wAgjILtpEtaHDNK5ofxuuR\n' +
  'Hp2OLCLZXUnsdNVUg3/UOoWZdgkskqQ5n3ZQzZZHCgI7yBXEgGtksOShbgQBLliNa7fgsq5Rg61G\n' +
  'EuZWUwIDAQAB'

const encrypt = new JSEncrypt()
encrypt.setPublicKey(publicKey)

const handle401Error = res => {
  if (res.status === 401) {
    Message.info('令牌已过期，请重新登录！')
    window.localStorage.clear()
    router.push('/index')
    return false
  } else {
    return {Res: {Code: '10000', Msg: '网络错误！'}}
  }
}

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
    }).catch((error) => {
      if (error.response) {
        if (handle401Error(error.response)) {
          resolve(handle401Error(error.response))
        }
      } else {
        resolve({Res: {Code: '10000', Msg: '网络错误！'}})
      }
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
  handle401Error,
  commonGet,
  commonPost,
  commonPut,
  commonDelete,
  get
}
