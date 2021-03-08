import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index.js"
import "./assets/css/public.css"
import {
  message
} from 'ant-design-vue';
import Common from "./assets/js/common.js" //公共js
Vue.prototype.$commonJs = Common //公共js放原型上
Vue.prototype.$store = store //公共js放原型上

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
Vue.use(Antd);

//图片预览轮播插件
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)

import urlApi from "./assets/js/request/apiIndex" //请求Api
Vue.prototype.$http = urlApi

import "./assets/js/directive.js" ////全局自定义指令

import uploadCompont from "@/components/upload/index.vue" //上传组件
Vue.component("up-file", uploadCompont)
import dragUpload from "@/components/dragUpload/index.vue" //拖拽及点击上传组件
Vue.component("drg-file", dragUpload)

//富文本
import VueQuillEditor from 'vue-quill-editor'
import * as Quill from 'quill' //引入编辑器
import resizeImage from 'quill-image-resize-module' // 图片缩放组件。
Quill.register('modules/resizeImage ', resizeImage)
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);

import VueLazyload from "vue-lazyload"
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/image/defaults.svg'),
  loading: require('./assets/image/loading.gif'),
  attempt: 1
})


import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.config.productionTip = false


import lodash from "lodash"
Vue.prototype._ = lodash


import * as _filters from "./assets/js/filters"
let $_filters = { ..._filters
}
for (let key in $_filters) {
  Vue.filter(key, $_filters[key]);
}

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.sch_token) {
      if (store.state.sch_menuList.length !== 0) {
        var menuLists = store.state.sch_menuList;
        var relations = to.meta.relation;
        var arr = []
        menuLists.forEach((item)=>{
          if(item.children.length==0){
            arr.push(item.relation)
          }else{
            item.children.forEach((it)=>{
              arr.push(it.relation)
            })
          }
        })
        let result = arr.indexOf(relations);       //根据relations来判断是否相等   子路由跟模块路由做关联
        if (result>-1) {
          next()
        }else{
          if(relations == 'noSide'){            //此处是指像意见反馈这种没有选中左边的路由
            next()
          }else{
            message.error("无权限访问");
            next(false);
          }
        }
      } else {
        next();
      }
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next();
  }
})
if (!store.state.sch_token) {
  router.push({
    path: '/'
  })
}
