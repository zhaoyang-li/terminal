/**
 * Created by Arthur on 2020/12/7.
 */
import axios from 'axios'
import {platformURL} from "../config/config"
import {dealData, getStore} from '../utils/mUtils'
import router from "../router"
import {Message} from 'element-ui'

const platformAxios = axios.create({
  timeout: 1000 * 60 * 5,
  headers: {
    'H-TOKEN': getStore('token') || '',
    'Cache-control': 'no-cache',
    'Pragma': 'no-cache',
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': "application/json;charset=utf-8"
  }
})

const baseOptions = (params, method = 'get') => {
  return new Promise((resolve) => {
    platformAxios[method](platformURL + params.url, params.data ? params.data : '').then(res => {
      resolve(res.data)
    }).catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          Message.info('令牌已过期，请重新登录！')
          window.localStorage.clear()
          router.push('/index')
          return false
        } else {
          resolve({code: '10000', message: '网络错误！'})
        }
      } else {
        resolve({code: '10000', message: '网络错误！'})
      }
    })
  })
}

export function submitComplaint(addForm, callback) {
  baseOptions({
    url: '/platform/interact/message/add',
    data: addForm
  }, 'post').then(res => {
    callback(res)
  })
}

export function getPublishArticle(searchForm, callback) {
  baseOptions({
    url: '/platform/publish/article' + (searchForm ? dealData(searchForm) : '')
  }, 'get').then(res => {
    callback(res)
  })
}

export function getPublishArticleDetail(id, callback) {
  baseOptions({
    url: '/platform/publish/article/detail?id=' + id
  }, 'get').then(res => {
    callback(res)
  })
}

