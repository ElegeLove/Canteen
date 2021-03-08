import Vue from 'vue'
import Router from 'vue-router'

import leftside from './leftSide.js' //面板左侧路由
import common from './common.js' //主要路由

Vue.use(Router)
    // const originalPush = Router.prototype.push
    // Router.prototype.push = function push(location) {
    //     return originalPush.call(this, location).catch(err => err)
    // }

// const router = new Router({
//     routes
//   })

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace(to) {
    return VueRouterReplace.call(this, to).catch(err => err)
}

export default new Router({
    routes: [
        ...common,
        ...leftside
    ]
})