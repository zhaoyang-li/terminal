/**
 * 配置文件
 */
const URL = {
  development: {
    baseUrl: 'https://apitest.bjzfgjj.gov.cn/outer/exchange',
    platformUrl: 'http://172.16.10.87:8070'
  },
  test: {
    baseUrl: 'https://apitest.bjzfgjj.gov.cn/outer/exchange',
    platformUrl: 'http://172.16.10.152:8070'
  },
  rc: {
    baseUrl: 'https://apitest.bjzfgjj.gov.cn/outer/exchange',
    platformUrl: 'http://172.16.10.152:8070'
  },
  production: {
    baseUrl: 'https://api.bjzfgjj.gov.cn/outer/exchange',
    platformUrl: 'http://172.16.10.152:8070'
  }
}

const channel = '08'

const nodeEnv = process.env.NODE_ENV || 'development'
const baseURL = URL[nodeEnv].baseUrl
const platformURL = URL[nodeEnv].platformUrl

export {
  baseURL,
  channel,
  platformURL
}
