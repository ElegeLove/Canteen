import OSS from 'ali-oss'
import commons from "@/urlApi.js"
let stsInfo = {
  AccessKeyId: null,
  AccessKeySecret: null,
  SecurityToken: null,
  bucket: null 
} 
export function put (name, File) {
  try {
    return new Promise((resolve, reject) => {
      if (!stsInfo.AccessKeyId) {
        return commons.CommonUpload().then(result => { 
          stsInfo = result.data
          resolve(stsInfo)
        })
      } else {
        resolve(stsInfo)
      }
    }).then(stsInfo => {
      const client = new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: stsInfo.AccessKeyId,
        accessKeySecret: stsInfo.AccessKeySecret,
        bucket: stsInfo.bucket,
        stsToken: stsInfo.SecurityToken
      })
      return client.put(name, File)
    })
  } catch (e) {
    console.log(e)
  }
}
