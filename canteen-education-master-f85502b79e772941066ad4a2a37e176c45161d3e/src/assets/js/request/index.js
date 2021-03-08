import axios from 'axios';
import QS from 'qs';
// var url = "http://canteen.mx5918.com/"; //测试
var url = 'http://222.180.118.82:7881/index.php/'; //正式
axios.defaults.baseURL = url
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';




axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断store中是否存在token
        const token = localStorage.getItem("sec_token");
        token && (config.headers.Authorization = ('Bearer ' + token));
        // token && (config.headers.Authorization = token);
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
                resolve(res.data);
            })
            .catch(err => {
                reject(err)
            })
    });
}