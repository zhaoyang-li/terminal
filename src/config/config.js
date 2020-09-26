/**
 * 配置文件
 */
const URL = {
  development: {
    baseUrl: 'https://apitest.bjzfgjj.gov.cn/outer/exchange'
  },
  test: {
    baseUrl: 'https://apitest.bjzfgjj.gov.cn/outer/exchange'
  },
  rc: {
    baseUrl: 'https://apitest.bjzfgjj.gov.cn/outer/exchange'
  },
  production: {
    baseUrl: 'https://api.bjzfgjj.gov.cn/outer/exchange'
  }
}

const channel = '05'

const nodeEnv = process.env.NODE_ENV || 'development'
const baseURL = URL[nodeEnv].baseUrl

export {
  baseURL,
  channel
}
