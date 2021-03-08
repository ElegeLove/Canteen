import {Post} from "./index"

//发送验证码
// export const sendCode = params => {
//     return Post('api/land/verificationCode',params)
// };
//上传配置信息
const CommonUpload = params => {
    return Post('api/common/upload',params)
};
export default{
    CommonUpload
}