import Vue from 'vue'
import Router from 'vue-router'

import leftside from './leftSide.js'           //面板左侧路由
import common from './common.js'           //主要路由
import order from './order.js'           //采购、出入口路由
Vue.use(Router)

export default new Router({
  routes: [
    ...common,
    ...leftside,
    ...order
  ]
})
