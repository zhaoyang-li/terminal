import {baseURL, channel} from "../config/config"
import {judgeObj, handingError, getStore} from '../utils/mUtils'

const baseOptions = (params, method = 'GET') => {
  return new Promise((resolve) => {
    const req = {
      path: params.url,
      method: method,
      token: getStore('token') || '',
      requestBody: params.data ? JSON.stringify(params.data) : '',
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
  commonDelete
}
