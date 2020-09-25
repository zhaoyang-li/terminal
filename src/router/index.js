import Vue from 'vue'
import Router from 'vue-router'
import Page404 from '@/components/error-page/404'
import Index from '@/views/login/index'
import Activate from '@/views/login/activate'
import Repayment from '@/views/system/repayment'
import Network from '@/views/system/network'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index',
      meta: {
        requireAuth: false,
        title: '首页'
      }
    },
    {
      path: '/index',
      component: Index,
      meta: {
        requireAuth: false,
        title: '首页'
      }
    },
    {
      path: '/activate',
      component: Activate,
      meta: {
        requireAuth: true,
        title: '激活'
      }
    },
    {
      path: '*',
      component: Page404,
      meta: {
        requireAuth: false,
        title: '404'
      }
    },
    {
      path: '/repayment',
      component: Repayment,
      meta: {
        requireAuth: false,
        title: '还款试算'
      }
    },
    {
      path: '/network',
      component: Network,
      meta: {
        requireAuth: false,
        title: '服务网点'
      }
    }
  ]
})
