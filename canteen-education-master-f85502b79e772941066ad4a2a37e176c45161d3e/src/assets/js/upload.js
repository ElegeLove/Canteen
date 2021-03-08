import OSS from 'ali-oss'
// var url = "http://canteen.mx5918.com/"; //测试
var url = 'http://222.180.118.82:7881/index.php/'; //正式
// import commons from "./request/urlApi.js"
import { Post } from "./request/index"
let stsInfo = {
    AccessKeyId: null,
    AccessKeySecret: null,
    SecurityToken: null,
    bucket: null
}
setInterval(() => {
    // commons.CommonUpload().then(result => {
    //     stsInfo = result.data
    // })
    Post(url + '/api/common/upload').then(result => {
        stsInfo = result.data
            // resolve(stsInfo)
    });
}, 1199000)
export function put(name, File) {
    try {
        return new Promise((resolve, reject) => {
            if (!stsInfo.AccessKeyId) {
                return Post(url + '/api/common/upload').then(result => {
                    stsInfo = result.data
                    resolve(stsInfo)
                });
                // commons.CommonUpload().then(result => {
                //   stsInfo = result.data
                //   resolve(stsInfo)
                // })
            } else {
                resolve(stsInfo)
            }
        }).then(stsInfo => {
            const client = new OSS({
                    region: 'oss-cn-hangzhou',
                    accessKeyId: stsInfo.AccessKeyId,
                    accessKeySecret: stsInfo.AccessKeySecret,
                    bucket: stsInfo.bucket,
                    stsToken: stsInfo.SecurityToken,
                    // endpoint: stsInfo.endpoint
                })
                // console.log(client)
            return client.put(name, File)
        })
    } catch (e) {
        console.log(e)
    }
}