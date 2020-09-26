import {commonPost, commonGet} from "../utils/axiosUtils"
import {dealData} from "../utils/mUtils"

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
