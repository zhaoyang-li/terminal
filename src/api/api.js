import {commonPost, commonGet, get} from "../utils/axiosUtils"
import {dealData, judgeObj, handingError} from "../utils/mUtils"

/**
 * 修改密码
 */
export const modifyPassword = (data, callback) => {
  commonPost('/account/resetPersonPwd', data, callback)
}

/**
 * 获取验证码
 */
export const getDynamicCode = (data, callback) => {
  commonPost('/account/common/sendVerificationNumber/dynamicPassword', data, callback)
}

/**
 * 获取网点信息
 * @param data
 * @param callback
 */
export const getNetworkList = (data, callback) => {
  let url = '/account/outlets/network'
  url += data ? dealData(data) : ''
  commonGet(url, '', callback)
}

/**
 * 获取楼盘信息
 * @param data
 * @param callback
 */
export const getBuildList = (data, callback) => {
  let url = '/loan/estateProject/noToken'
  url += data ? dealData(data) : ''
  commonGet(url, '', callback)
}

// 字典
export const getDictionary = (callback) => {
  get('/dictionary', '').then(res => {
    if (judgeObj(res)) {
      callback(res)
    } else {
      callback(handingError(res))
    }
  })
}

// 新提取原因
export const getNewExtractReason = (callback) => {
  get('/withdrawls/withdraw-reason', '').then(res => {
    const result = res.Res
    if (result instanceof Array || judgeObj(result)) {
      callback(result)
    } else {
      callback(handingError(result))
    }
  })
}

/**
 * 获取用户信息
 * string grzh
 * @param data
 * @param callback
 */
export const getUserInfo = (data, callback) => {
  commonGet('/collection/IndiAcctsInfoDetails/' + data, '', callback)
}
