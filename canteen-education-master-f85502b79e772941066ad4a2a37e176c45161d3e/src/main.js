import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index.js"
import "./assets/css/public.css"
import Common from "./assets/js/common.js" //公共js
import VueLazyload from 'vue-lazyload'
import http from "./assets/js/request/urlApi"
import { message } from 'ant-design-vue'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
    // import ElementUI from 'element-ui';
    // import 'element-ui/lib/theme-chalk/display.css';
    // import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$commonJs = Common //公共js放原型上
Vue.prototype.$store = store //公共js放原型上
Vue.prototype.$http = http //公共js放原型上

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn')
Vue.prototype.$moment = moment;
Vue.use(Antd);
// Vue.use(VueLazyload);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require("./assets/image/loaderr.png"),
    loading: require("./assets/image/loading.gif"),
    attempt: 1
})
import uploads from '@/components/index.vue'
Vue.component('uploads', uploads)
import uploadFile from '@/components/uploadFile.vue'
Vue.component('uploadFile', uploadFile)
import uploadFilesVal from '@/components/uploadFilesVal.vue'
Vue.component('uploadFilesVal', uploadFilesVal)
    // Vue.use(uploads)

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer)
    // Vue.use(uploads)

Viewer.setDefaults({

        Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }

    })
    //导入
import XLSX from 'xlsx'
Vue.use(XLSX)

//导出
import Blob from './outExcel/Blob'
import Export2Excel from './outExcel/Export2Excel.js'

// import quillEditor from 'vue-quill-editor' // 调用富文本编辑器
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
// import "quill/dist/quill.bubble.css";
// import Quill from 'quill'
// import ImageResize from 'quill-image-resize-module' //添加
// Quill.register('modules/imageResize', ImageResize) //添加
//     // import "quill/dist/imageResize.js";
// Vue.use(quillEditor)

import quillEditor from 'vue-quill-editor'
// import * as Quill from 'quill' //引入编辑器
// import resizeImage from 'quill-image-resize-module' // 图片缩放组件。
// Quill.register('modules/resizeImage ', resizeImage)
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(quillEditor);



import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const preventReClick = Vue.directive('preventReClick', {
    inserted: function(el, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                }, binding.value || 3000)
            }
        })
    }
});
Vue.use(preventReClick);

import axios from 'axios';
import qs from 'qs';
// let HTTP = 'http://canteen.mx5918.com/api'; //测试
// let HTTPs = 'http://canteen.mx5918.com'; //测试
let HTTP = 'http://222.180.118.82:7881/index.php/api'; //正式
let HTTPs = 'http://222.180.118.82:7881/index.php'; //正式

Vue.prototype.$globalApi = HTTPs //公共js放原型上
    // 接口请求1
Vue.prototype.$apiAxiox = (opt) => {
    // console.log(qs.stringify(opt.data));
    return new Promise((resolve, reject) => {
        axios({
                method: opt.method || "post",
                url: HTTP + opt.url,
                data: qs.stringify(opt.data),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('sec_token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((res) => {
                if (res.data.code == 100) {
                    localStorage.removeItem("sec_openKey");
                    localStorage.removeItem("sec_cheakKey");
                    localStorage.removeItem("cheakKeyItem");
                    localStorage.removeItem("sec_token");
                    store.commit("setMenuList", []);
                    // this.$store.commit("vuex", "");
                    sessionStorage.removeItem("store");
                    message.error(res.data.msg);
                    router.replace({
                        path: '/'
                    })
                    return
                } else {
                    resolve(res)
                }

            })
            .catch(function(err) {
                store.commit("setLoaing", false)
                reject(err)
            });
    })
};
Vue.prototype.$apiAxioxs = (opt) => {
    return new Promise((resolve, reject) => {
        axios({
                method: opt.method || "post",
                url: HTTPs + opt.url,
                data: qs.stringify(opt.data),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('sec_token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((res) => {
                if (res.data.code == 100) {
                    localStorage.removeItem("sec_openKey");
                    localStorage.removeItem("sec_cheakKey");
                    localStorage.removeItem("cheakKeyItem");
                    localStorage.removeItem("sec_token");
                    store.commit("setMenuList", []);
                    // this.$store.commit("vuex", "");
                    sessionStorage.removeItem("store");
                    message.error(res.data.msg);
                    router.replace({
                        path: '/'
                    })
                    return
                } else {
                    resolve(res)
                }
            })
            .catch(function(err) {
                reject(err)
            });
    })
};

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        if (localStorage.getItem('sec_token') != undefined && localStorage.getItem('sec_token') != '') { // 判断缓存里面是否有 token  //在登录的时候设置它的值
            if (store.state.menuBar.length > 0) {
                var menuLists = store.state.menuBar;
                var relations = to.meta.munuVal;
                var arr = []
                menuLists.forEach((item) => {
                    if (item.children.length == 0) {
                        arr.push(item.relation)
                    } else {
                        item.children.forEach((it) => {
                            arr.push(it.relation)
                        })
                    }
                })
                let result = arr.indexOf(relations); //根据relations来判断是否相等   子路由跟模块路由做关联
                if (result > -1) {
                    next()
                } else {
                    if (relations == 'noSide') { //此处是指像意见反馈这种没有选中左边的路由
                        next()
                    } else {
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
});


new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})