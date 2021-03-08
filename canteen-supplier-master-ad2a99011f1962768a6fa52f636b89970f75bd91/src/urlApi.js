import { Post, ExportFile } from "./https"

//登录
const login = params => {
    return Post('supplier/handle/login', params)
};

//主页
const Home = params => {
    return Post('supplier/index/index', params)
};
//上传配置信息
const CommonUpload = params => {
    return Post('api/common/upload', params)
};

//供应商基础信息
const supplierInfo = params => {
    return Post('supplier/supplier/supplierInfo', params)
};

//供应商修改
const supplier = params => {
    return Post('supplier/supplier/supplier', params)
};

//更换手机号
const updatePhone = params => {
    return Post('supplier/supplier/updatePhone', params)
};
//发送短信
const sendSms = params => {
    return Post('api/common/sendSms', params)
};
//验证短信
const checkSms = params => {
    return Post('api/common/checkSms', params)
};


//注册
const register = params => {
    return Post('supplier/handle/register', params)
};

// 新增产品获取产品类目
const getProductList = params => {
    return Post('supplier/product/getProductList', params)
};




// 学校列表查询
const schoollist = params => {
    return Post('supplier/school/schoollist', params)
};
const removecooperation = params => {
    return Post('supplier/school/removecooperation', params)
};
// 新增学校查询 第一步
const schoolData = params => {
    return Post('supplier/school/schoolData', params)
};
// 新增学校查询 第二步 关联学校详情
const schooldetail = params => {
    return Post('supplier/school/schooldetail', params)
};
// 历史关联学校详情
const hisSchooldetail = params => {
    return Post('supplier/history/schoolSupplierHistoryDetail', params)
};
// 新增学校查询 第二步 关联学校 
const schoolAdd = params => {
    return Post('supplier/school/schoolAdd', params)
};
//编辑学校
const schoolInfo = params => {
    return Post('supplier/school/schoolInfo', params)
};
//查看申请信息
const schoolDetailInfo = params => {
    return Post('supplier/school/schoolDetailInfo', params)
};
// 新增学校查询 第二步 关联学校详情
const schoolDataDetail = params => {
    return Post('supplier/school/schoolDataDetail', params)
};
// 新增学校查询 第二步 产品目录
const productList = params => {
    return Post('supplier/school/productList', params)
};

// 编辑关联学校信息
const schoolUpdate = params => {
    return Post('supplier/school/schoolUpdate', params)
};


// 学校列表查询
// 产品管理列表和仓库管理列表
const productCangku = params => {
    return Post('supplier/product/productList', params)
};
const productDetail = params => {
    return Post('supplier/product/productDetail', params)
};
const productDel = params => {
    return Post('supplier/product/productdel', params)
};

const productOnOff = params => {
    return Post('supplier/product/productOnOff', params)
};
const productAddUpdate = params => {
    return Post('supplier/product/productAddUpdate', params)
};
const schoolProductSecondary = params => {
    return Post('supplier/product/secondary', params)
};
// ***************************公共
const apiProductMenuList = params => {
    return Post('api/product/productList', params)
};
const productSonList = params => {
    return Post('api/product/productSonList', params)
};


const timeList = params => {
    return Post('api/common/getDisassociate', params)
};
const HistoryList = params => {
    return Post('supplier/history/schoolSupplierHistoryList', params)
};
const HistoryListInfo = params => {
    return Post('supplier/history/schoolSupplierHistoryDetail', params)
};
// 订单
const orderList = params => {
    return Post('supplier/order/orderList', params)
};
//查看配总汇总
const deliveryTotal = params => {
    return Post('supplier/order/deliveryTotal', params)
};
//订单的配送的详细信息
const deliveryRecord = params => {
    return Post('supplier/order/deliveryRecord', params)
};
//订单的配送的详细信息
const deliveryRecordDetail = params => {
    return Post('supplier/order/deliveryRecordDetail', params)
};
//订单的配送的详细信息
const orderProductList = params => {
    return Post('supplier/order/orderProductList', params)
};
//打印订单的配送的详细信息
const orderProductListPrinting = params => {
    return Post('supplier/order/orderProductListPrinting', params)
};


//确认并打印交接单
const printingHandover = params => {
    return Post('supplier/order/printingHandover', params)
};
//
const orderTotal = params => {
    return Post('supplier/order/orderTotal', params)
};
//
const weekRecipes = params => {
    return Post('supplier/order/weekRecipes', params)
};
//获取周列表的搜素参数
const getSearch = params => {
    return Post('school/recipes/getSearch', params)
};
//导出周列表的搜素参数
const exportExcel = params => {
    return ExportFile('supplier/order/exportExcel', params)
};




//导出待确认汇总
const exportUnconfirmedOrder = params => {
    return ExportFile('supplier/order/exportUnconfirmedOrder', params)
};



//单日配送 生产交接表
const printingData = params => {
    return Post('supplier/order/printingData', params)
};

//确认配送
const delivery = params => {
    return Post('supplier/order/delivery', params)
};

//确认结算接
const trueSettlement = params => {
    return Post('supplier/order/trueSettlement', params)
};

//查看周食谱 td 详情
const mainRecipes = params => {
    return Post('supplier/order/mainRecipes', params)
};
//发送短信
const SendCode = params => {
    return Post('api/common/sendSms', params)
};
//验证短信
const CommonCheckSms = params => {
    return Post('api/common/checkSms', params)
};
//首次登录 - 设置密码
const IndexSetPassword = params => {
    return Post('school/index/setPassword', params)
};
//忘记密码---重新设置新密码 
const HandleSetpassword = params => {
    return Post('school/handle/setpassword', params)
};

const userInfo = params => {
    return Post('supplier/handle/userInfo', params)
};

const updatePasswrod = params => {
    return Post('supplier/handle/updatePassword', params)
};


//---------------------------公共end


//---------------------------业务培训 
const businessList = params => {
    return Post('supplier/business/businessList', params)
}
const businessDetail = params => {
    return Post('supplier/business/businessDetail', params)
}
const noticeList = params => {
    return Post('supplier/notice/noticeList', params)
}
const noticeDel = params => {
    return Post('supplier/notice/noticeDel', params)
}
const noticeDetail = params => { //通知公告——通知公告详情
    return Post('supplier/notice/noticeDetail', params)
}

const messageList = params => { //通知公告——消息中心列表
    return Post('supplier/notice/messageList', params)
}

const messageDel = params => { //通知公告——消息中心列表
    return Post('supplier/notice/messageDel', params)
}
const messageDetail = params => { //通知公告——消息中心列表
    return Post('supplier/notice/messageDetail', params)
}
const messageRead = params => { //通知公告——标记为已读
    return Post('supplier/notice/messageRead', params)
}

const noticeIndex = params => { //首页顶部通告
    return Post('supplier/notice/index', params)
}


const unconfirmedOrderList = params => { //首页顶部通告
    return Post('supplier/order/unconfirmedOrderList', params)
}



//---------------------------业务培训end	


//---------------------------权限 
const user = params => {
    return Post('supplier/role/user', params)
}
const roleLists = params => {
    return Post('supplier/role/lists', params)
}
const userDataManipulation = params => {
    return Post('supplier/role/userDataManipulation', params)
}
const userRole = params => {
    return Post('supplier/role/userRole', params)
}
const dataManipulation = params => {
    return Post('supplier/role/dataManipulation', params)
}

//权限 - 菜单列表
const RoleModule = params => {
    return Post('supplier/role/module', params)
};
//权限 - 添加/编辑
const RoleDataManipulation = params => {
    return Post('supplier/role/dataManipulation', params)
};
//权限 - 角色详情
const RoleDetails = params => {
    return Post('supplier/role/details', params)
};

//权限 - 权限角色 - 单个/批量启用
const RoleRoleEnable = params => {
    return Post('supplier/role/roleEnable', params)
};
//权限 - 获取当前用户可以显示的菜单列表
const RoleSidebarMenu = params => {
    return Post('supplier/role/sidebarMenu', params)
};
//权限 - 权限角色 - 单个/批量删除
const RoleRoleDelete = params => {
    return Post('supplier/role/roleDelete', params)
};
//权限 - 用户 - 单个/批量删除
const RoleUserDelete = params => {
    return Post('supplier/role/userDelete', params)
};

//权限 - 权限角色- 单个/批量禁用
const RoleRoleDisable = params => {
    return Post('supplier/role/roleDisable', params)
};

//权限 - 用户添加/编辑
const RoleUserDataManipulation = params => {
    return Post('supplier/role/userDataManipulation', params)
};
//权限 - 用户详情
const RoleUserDetails = params => {
    return Post('supplier/role/userDetails', params)
};
//权限 - 用户列表
const RoleUser = params => {
    return Post('supplier/role/user', params)
};
//权限 - 用户角色列表
const RoleUserRole = params => {
    return Post('supplier/role/userRole', params)
};

//权限 - 用户 - 单个/批量禁用
const RoleUserDisable = params => {
    return Post('supplier/role/userDisable', params)
};
//权限 - 用户 - 单个/批量启用
const RoleUserEnable = params => {
    return Post('supplier/role/userEnable', params)
};
//last
const orderIs_printing = params => {
    return Post('supplier/order/is_printing', params)
};
//学校筛选
const roleRelationSchool = params => {
    return Post('supplier/role/relationSchool', params)
};
//配送记录 - 结算管理 - 批量结算
const orderBatchSettlement = params => {
    return Post('supplier/order/batchSettlement', params)
};
//---------------------------权限end


export default {
    orderBatchSettlement,
    login,
    supplierInfo,
    schoollist,
    schoolData,
    schooldetail,
    hisSchooldetail,
    schoolAdd,
    productList,
    supplier,
    sendSms,
    checkSms,
    updatePhone,
    productCangku,
    productDetail,
    apiProductMenuList,
    productSonList,
    productOnOff,
    productAddUpdate,
    orderList,
    timeList,
    HistoryList,
    HistoryListInfo,
    deliveryTotal,
    deliveryRecordDetail,
    orderProductList,
    printingHandover,
    orderTotal,
    removecooperation,
    weekRecipes,
    deliveryRecord,
    getSearch,
    exportExcel,
    schoolDataDetail,
    printingData,
    schoolUpdate,
    register,
    getProductList,
    Home,
    delivery,
    mainRecipes,
    schoolInfo,
    CommonUpload,
    businessList,
    businessDetail,
    noticeList,
    noticeDel,
    noticeDetail,
    user,
    roleLists,
    userDataManipulation,
    userRole,
    dataManipulation,
    trueSettlement,
    exportUnconfirmedOrder,
    orderIs_printing,
    roleRelationSchool,
    RoleModule,
    RoleDataManipulation,
    RoleDetails,
    RoleRoleEnable,
    RoleRoleDelete,
    RoleRoleDisable,
    RoleUserDataManipulation,
    RoleUserDetails,
    RoleUser,
    RoleUserRole,
    RoleUserDelete,
    noticeIndex,
    userInfo,
    updatePhone,
    schoolDetailInfo,
    RoleSidebarMenu,
    RoleUserDisable,
    RoleUserEnable,
    SendCode,
    CommonCheckSms,
    IndexSetPassword,
    HandleSetpassword,
    schoolProductSecondary,
    productDel,
    messageList,
    messageDel,
    messageDetail,
    messageRead,
    updatePasswrod,
    unconfirmedOrderList,
    orderProductListPrinting
}