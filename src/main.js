import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import store from './vuex/index'
import Vuex from 'vuex'
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import { getJdk } from './api/user'
import { getStore } from './utils/mUtils'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'medium' })
Vue.use(Vuex)

getJdk()

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = getStore('token')
    if (token) {
      next()
    } else {
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
