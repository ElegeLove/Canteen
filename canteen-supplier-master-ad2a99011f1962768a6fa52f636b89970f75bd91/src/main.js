import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index.js"
import "./assets/css/public.css"
import Common from "./assets/js/common.js"         //公共js
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/display.css';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$commonJs = Common                    //公共js放原型上
Vue.prototype.$store = store //公共js放原型上

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);
// Vue.prototype.$qs = qs;

import urlApi from "./urlApi.js";
Vue.prototype.$http = urlApi;

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');



//导入
import XLSX from 'xlsx'
Vue.use(XLSX)

import uploadCompont from "@/components/upload/index.vue"         //上传组件
Vue.component("up-file",uploadCompont)


// 打印
import Print from './pint/index.js'
Vue.use(Print)

//导出
import Blob from './outExcel/Blob'
import Export2Excel from './outExcel/Export2Excel.js'

import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}


//富文本
// import VueQuillEditor from 'vue-quill-editor'
// import * as Quill from 'quill' //引入编辑器
// import resizeImage from 'quill-image-resize-module' // 图片缩放组件。
// Quill.register('modules/resizeImage ', resizeImage)
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// Vue.use(VueQuillEditor);



Vue.config.productionTip = false
// Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


router.beforeEach((to, from, next) => { 
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/'
      })
    }
  }
  else {
    next();
  }
})
if (!store.state.token) {
  router.push({ path: '/' })
}
