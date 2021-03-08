import axios from 'axios';
import {
    message
} from 'ant-design-vue';
import store from "../../../store/index.js"
import router from "../../../router/index.js"
var url = "http://canteen.mx5918.com/"
    // var url = "http://222.180.118.82:7881/index.php"


axios.defaults.baseURL = url
axios.defaults.timeout = 15000;
axios.defaults.retry = 3; //请求次数
axios.defaults.retryDelay = 1000; //请求间隙
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断store中是否存在token
        const sch_token = store.state.sch_token;
        sch_token && (config.headers.Authorization = sch_token);
        return config;
    },
    error => {
        return Promise.error(error);
    })
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        return Promise.reject(error)
    }
);
export function Post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                if (res.data.code == 1) {
                    if (res.data.msg !== '') {
                        message.success(res.data.msg);
                    }
                } else {
                    message.error(res.data.msg);
                }
                if (res.data.code == 100 || res.data.code == 1001) { //请登录
                    store.commit("sch_setToken", "")
                    router.replace({
                        path: '/'
                    })
                }
                resolve(res.data);
            })
            .catch(err => {
                store.commit("sch_setLoaing", false)
                    // setTimeout(() => {
                    //     message.error("网络开小差了");
                    // })
                reject(err)
            })
    });
}
export function ExportFile(urls, params) { //导出
    var keys = parseParam(params)
        // location.href = url + urls + "?" + keys
    window.open(url + urls + "?" + keys)
}

function parseParam(obj) {
    var ary = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) { //&& obj[p]这个隐藏了
            ary.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    return ary.join('&');
}