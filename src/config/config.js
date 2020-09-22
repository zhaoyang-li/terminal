/**
 * 配置文件
 */
const URL = {
  development: {
    baseUrl: 'http://172.16.10.104:81/housingfund-social/'
  },
  test: {
    baseUrl: 'https://api.dowell.cn'
  },
  rc: {
    baseUrl: 'https://api.dowell.cn'
  },
  production: {
    baseUrl: 'https://api.dowell.cn'
  }
}

const nodeEnv = process.env.NODE_ENV || 'development'
const baseURL = URL[nodeEnv].baseUrl

export {
  baseURL
}
