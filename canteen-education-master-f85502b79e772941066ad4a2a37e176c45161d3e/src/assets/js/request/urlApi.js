import { Post } from "./index"

//导入产品目录
const productMune = params => {
    return Post('api/product/import', params)
};
// 导入学校
const schoolMune = params => {
    return Post('api/school/import', params)
};
export default {
    productMune,
    schoolMune
}