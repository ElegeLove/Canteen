import axios from 'axios';
import QS from 'qs';


import {
    message
} from 'ant-design-vue';
import store from "../../../store/index.js"
import router from "../../../router/index.js"
// let url = 'http://canteen.mx5918.com/'
let url = 'http://222.180.118.82:7881/index.php/'
axios.defaults.baseURL = url
axios.defaults.timeout = 15000;
axios.defaults.retry = 3; //请求次数
axios.defaults.retryDelay = 1000; //请求间隙
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断store中是否存在token
        const token = localStorage.getItem("token");
        token && (config.headers.Authorization = token);
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
                if (res.data.code == 100) { //请登录
                    store.commit("setToken", "")
                    router.replace({
                        path: '/'
                    })
                }
                resolve(res.data);
            })
            .catch(err => {
                store.commit("setLoaing", false)
                setTimeout(() => {
                    message.error("请求出错");
                })
                reject(err)
            })
    });
}