import {baseURL} from "../config/config"
import {judgeObj, handingError} from '../utils/mUtils'

const baseOptions = (params, method = 'GET') => {
  method = method.toLowerCase()
  return new Promise((resolve) => {
    global.axiosNew[method](baseURL + params.url, params.data).then(res => {
      resolve(res.data)
    }).catch(() => {
      resolve({Res: {Code: '10000', Msg: '网络错误！'}})
    })
  })
}

const get = (url, data = '') => {
  const params = {url, data}
  return baseOptions(params)
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
