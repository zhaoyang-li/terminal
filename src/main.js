import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import store from './vuex/index'
import Vuex from 'vuex'
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import 'babel-polyfill'
import {getJdk} from './api/user'
import {getStore} from './utils/mUtils'
import bus from './utils/bus'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'medium' })
Vue.use(Vuex)

getJdk()

global.countDown = new Date().getTime()
global.timeOut = 1800000

const timeoutExit = () => {
  window.localStorage.clear()
  const url = document.location.toString()
  if (url.lastIndexOf('/index') === -1) {
    ElementUI.Message.warning('超过2分钟未操作，已回到首页！')
    router.push({path: '/index'})
  }
}

const timeoutCountDown = () => {
  const nowTime = new Date().getTime() - global.countDown
  if (nowTime > (global.timeOut - 20000)) {
    bus.$emit('countDown', parseInt((global.timeOut - nowTime) / 1000))
  } else {
    bus.$emit('closeCountDown')
  }
  if (nowTime > global.timeOut) {
    bus.$emit('closeCountDown')
    window.clearInterval(myDownTime)
    myDownTime = null
  }
}

// 超时跳转
let myTime = window.setTimeout(timeoutExit, global.timeOut)
let myDownTime = window.setInterval(timeoutCountDown, 1000)
function resetTime() {
  window.clearTimeout(myTime)
  global.countDown = new Date().getTime()
  myTime = window.setTimeout(timeoutExit, global.timeOut)
  if (myDownTime === null) {
    myDownTime = window.setInterval(timeoutCountDown, 1000)
  }
}
document.body.onkeydown = resetTime
document.body.onkeypress = resetTime
document.body.onclick = resetTime
document.body.onmousedown = resetTime

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = getStore('token')
    if (token) {
      next()
    } else {
      ElementUI.Message.warning('无登录信息，请重新登录！')
      window.localStorage.clear()
      next({ path: '/index' })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
