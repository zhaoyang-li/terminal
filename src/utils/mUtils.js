import qs from 'qs'
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 验证邮箱
 **/
export const validateEmail = value => {
  return /^[\w.]+\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(value)
}

/**
 * 验证手机
 **/
export const validatePhone = value => {
  return (/^1((3[0-9])|(4[5-9])|(5([0-3]|[5-9]))|(6[6-7])|(7[1-8])|(8[0-9])|(9([0-3]|[6-9])))\d{8}$/.test(value))
}

/**
 * 验证密码
 **/
export const validatePassword = value => {
  return (/^[\S]{8,30}$/.test(value))
}

/**
 * 时间格式化
 * time string 时间
 * fmt string 输出格式 默认年月日时分 例： yyyy-MM-dd hh:mm
 * last string 上一年 'year' 上一月 'month'
 * future string 明天 'day'
 */
export function dateFormat (time, fmt, last, future) {
  let date
  if (time) {
    date = new Date(time)
  } else {
    date = new Date()
  }
  if (future === 'day') {
    date = date.getTime() + 86400000
    date = new Date(date)
  }

  let o = {
    "M+": date.getMonth() + 1,                     // 月份
    "d+": date.getDate(),                        // 日
    "h+": date.getHours(),                       // 小时
    "m+": date.getMinutes(),                     // 分
    "s+": date.getSeconds(),                     // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    "S": date.getMilliseconds()                  // 毫秒
  }
  let year = date.getFullYear()
  if (last === 'year') {
    year--
  } else if (last === 'month') {
    if (o['M+'] === 1) {
      year--
      o['M+'] = 12
    } else {
      o['M+']--
    }
  }

  if (fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (year + "").substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
      }
    }
    return fmt
  } else {
    return year + "年" + o["M+"] + "月" + o["d+"] + "日 " + o["h+"] + "时" + o["m+"] + "分"
  }
}

/** n个月后的日期 **/
export function addMonthsDate(nowDate, n) {
  let dateArr = nowDate.split("-")
  let yy = parseInt(dateArr[0])
  let mm = parseInt(dateArr[1])
  let dd = parseInt(dateArr[2])
  let dt = new Date(yy, mm, dd)
  let num = dt.getMonth() + parseInt(n)

  if (num / 12 > 1) {
    yy += Math.floor(num / 12)
    mm = num % 12
  } else {
    mm += parseInt(n)
  }

  return dateFormat(yy + "/" + mm + "/" + dd, 'yyyy-MM-dd')
}

/**
 * 处理请求error
 **/
export function handleError(error) {
  let res = {
    response: 'error',
    message: '网络错误'
  }
  if (error.response) {
    res = error.response.data ? error.response.data : res
    return res
  } else {
    return res
  }
}

/**
 * 判断对象中是否存在数据 存在 true 不存在 false
 */
export const isEmptyObject = function (e) {
  if (typeof e === 'object' && e != null) {
    return true
  } else {
    return false
  }
}

/**
 * 判断data参数
 */
export function judgeObj (data) {
  if (typeof data === 'object') {
    if (typeof data.Code !== 'undefined') {
      return false
    } else if (typeof data.errorCode !== 'undefined') {
      return false
    } else if (data.Status === 'fail' || data.Status === 'error' || data.State === 'error' || data.State === 'fail' || data.V === false) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}

/**
 * 处理错误
 * info 错误信息
 */
export function handingError(info) {
  let data = {}
  let deal
  /* eslint-disable */
  outerloop: for (let key in info) {
    if (isEmptyObject(info[key])) {
      for (let keys in info[key]) {
        deal = info[key][keys]
        break outerloop
      }
    } else {
      deal = info
      break
    }
  }
  data = {
    status: 0,
    response: 'error'
  }
  if (deal['Msg']) {
    data.message = deal['Msg']
  } else if (deal['errorMessage']) {
    data.message = deal['errorMessage']
  } else if (deal['K']) {
    data.message = deal['K']
  } else if (deal['Id']) {
    data.message = deal['Id']
  } else {
    data.message = '失败'
  }
  if (deal['Code']) {
    data['code'] = deal['Code']
  } else {
    data['code'] = '404'
  }
  if (deal['Code'] === '1101') {
    window.localStorage.clear()
    window.location.href = "/index"
  } else {
    return data
  }
}

/**
 * 隐藏身份证号码
 * @param idcard
 * @returns {string}
 */
export const hideIdcard = (idcard) => {
  if (idcard === undefined) {
    return ''
  }
  return idcard.substr(0, 4) + (idcard.length === 15 ? '*******' : '**********') + idcard.substr(idcard.length - 4)
}

/**
 * 处理get数据
 */
export const dealData = (params) => {
  const keys = Object.keys(params)
  let URL = ''
  if (keys.length > 0) {
    URL =  '?' + qs.stringify(params)
  }
  return URL
}

/**
 * 精度丢失
 */
export function adder (...args) {
  let sum = 0
  args.forEach(item => {
    if (item) {
      if (typeof item === 'string') {
        item = item.replace(/,/g, '')
      }
      sum += Number(item)
    }
  })
  return Math.round(sum * 100) / 100
}
