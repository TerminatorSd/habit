/**
 * @file 路由主入口，定义路由规则
 * @author wangyisheng@baidu.com (wangyisheng)
 */

import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/Index.vue'
import Recent from '@/pages/Recent.vue'
import Detail from '@/pages/Detail.vue'
import BottomNav from '@/components/common/BottomNav'
import CreateRecent from '@/components/recent/CreateRecent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'recent',
      components: {
        default: Recent,
        bNav: BottomNav
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/create/recent',
      name: 'createRecent',
      meta: {
        title: "创建Recent"
      },
      components: {
        default: CreateRecent
      }
    }
  ]
})
