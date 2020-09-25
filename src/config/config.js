/**
 * 配置文件
 */
const URL = {
  development: {
    baseUrl: 'https://weapptest.bjzfgjj.gov.cn/outer/exchange'
  },
  test: {
    baseUrl: 'https://weapptest.bjzfgjj.gov.cn/outer/exchange'
  },
  rc: {
    baseUrl: 'https://api.dowell.cn'
  },
  production: {
    baseUrl: 'https://api.dowell.cn'
  }
}

const channel = '08'

const nodeEnv = process.env.NODE_ENV || 'development'
const baseURL = URL[nodeEnv].baseUrl

export {
  baseURL,
  channel
}
