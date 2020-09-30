import Vue from 'vue'
import Router from 'vue-router'
import Page404 from '@/components/error-page/404'
import Index from '@/views/login/index'
import Activate from '@/views/login/activate'
import Repayment from '@/views/system/repayment'
import Network from '@/views/system/network'
import Build from '@/views/system/build'
import PersonInform from '@/views/system/personInform'
import Collection from '@/views/system/collection'
import Loan from '@/views/system/loan'
import UnitInform from '@/views/system/unitInform'
import Complaint from '@/views/system/complaint'

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
    },
    {
      path: '/build',
      component: Build,
      meta: {
        requireAuth: false,
        title: '合作楼盘'
      }
    },
    {
      path: '/personInform',
      component: PersonInform,
      meta: {
        requireAuth: true,
        title: '个人信息查询'
      }
    },
    {
      path: '/collection',
      component: Collection,
      meta: {
        requireAuth: true,
        title: '缴存信息'
      }
    },
    {
      path: '/loan',
      component: Loan,
      meta: {
        requireAuth: true,
        title: '贷款信息'
      }
    },
    {
      path: '/unitInform',
      component: UnitInform,
      meta: {
        requireAuth: true,
        title: '单位信息'
      }
    },
    {
      path: '/complaint',
      component: Complaint,
      meta: {
        requireAuth: true,
        title: '投诉建议'
      }
    }
  ]
})
