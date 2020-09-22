import {commonPost} from "../utils/axiosUtils"

/**
 * 修改密码
 */
export const modifyPassword = (data, callback) => {
  commonPost('account/resetPersonPwd', data, callback)
}

export const getDynamicCode = (data, callback) => {
  commonPost('account/common/sendVerificationNumber/dynamicPassword', data, callback)
}
