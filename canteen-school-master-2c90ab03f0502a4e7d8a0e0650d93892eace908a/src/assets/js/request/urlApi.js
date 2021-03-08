import { Post, ExportFile } from "./index"

//登录
const login = params => {
    return Post('school/handle/login', params)
};
//学校信息
const IndexSchoolInfo = params => {
    return Post('school/index/schoolInfo', params)
};
//办学信息修改
const IndexCentralSchool = params => {
    return Post('school/index/centralSchool', params)
};
//村校信息修改
const indexVillage = params => {
    return Post('school/index/village', params)
};
//负责人信息修改
const IndexLegal = params => {
    return Post('school/index/legal', params)
};
//个人信息
const IndexInfo = params => {
    return Post('school/index/info', params)
};
//发送短信
const SendCode = params => {
    return Post('api/common/sendSms', params)
};
//验证短信
const CommonCheckSms = params => {
    return Post('api/common/checkSms', params)
};
//修改手机号码
const IndexUpdateMobile = params => {
    return Post('school/index/updateMobile', params)
};
//修改密码
const IndexChangePassword = params => {
    return Post('school/index/changePassword', params)
};
//获取所有学校
const CommonGetSchool = params => {
    return Post('school/common/getSchool', params)
};
//获取学校配置
const CommonSchoolSet = params => {
    return Post('api/common/schoolSet', params)
};
//教职工 - 列表
const FacultyLists = params => {
    return Post('school/faculty/lists', params)
};
//教职工 - 添加/修改
const FacultyDataManipulation = params => {
    return Post('school/faculty/dataManipulation', params)
};
//教职工 - 离职
const FacultyQuit = params => {
    return Post('school/faculty/quit', params)
};
//教职工 - 导入教职工
const FacultyImport = params => {
    return Post('school/faculty/import', params)
};
//教职工 - 导入模板
const FcultyExcelMoban = params => {
    return ExportFile('school/faculty/excelMoban', params)
};
//教职工 - 详情
const schoolFacultyInfo = params => {
    return Post('school/faculty/info', params)
};
//学生人数列表
const IndexStudentList = params => {
    return Post('school/index/studentList', params)
};
//修改学生人数
const IndexStudent = params => {
    return Post('school/index/student', params)
};
//食堂 - 列表
const CanteenLists = params => {
    return Post('school/canteen/lists', params)
};
//食堂 - 添加/修改
const CnteenDataManipulation = params => {
    return Post('school/canteen/dataManipulation', params)
};
//食堂 - 详情
const CanteenInfo = params => {
    return Post('school/canteen/info', params)
};
//食堂员工 - 列表
const CanteenFacultyList = params => {
    return Post('school/canteen/facultyList', params)
};
//食堂员工 - 添加/修改
const CanteenFacultyDataManipulation = params => {
    return Post('school/canteen/facultyDataManipulation', params)
};
//食堂员工 - 详情
const CanteenFacultyInfo = params => {
    return Post('school/canteen/facultyInfo', params)
};
//食堂员工 - 离职
const CanteenQuit = params => {
    return Post('school/canteen/quit', params)
};
//供应商 - 列表
const SupplierLists = params => {
    return Post('school/supplier/lists', params)
};
//往期供应商 - 列表
const PastSupplierLists = params => {
    return Post('school/supplier/history', params)
};
//往期供应商时间节点
const GetTimeList = params => {
    return Post('api/common/getDisassociate', params)
};
//获取所有食堂
const CommonGetCanteen = params => {
    return Post('school/common/getCanteen', params)
};
//供应商 - 启用/禁用
const SupplierState = params => {
    return Post('school/supplier/state', params)
};
//供应商 - 详情
const SupplierInfo = params => {
    return Post('school/supplier/info', params)
};
//往期供应商 - 详情
const PastSupplierInfo = params => {
    return Post('school/supplier/infoHistory', params)
};
//供应商 - 店铺
const SupplierShop = params => {
    return Post('school/supplier/shop', params)
};
//供应商 - 店铺 - 商品
const SupplierProduct = params => {
    return Post('school/supplier/product', params)
};
//供应商 - 解除合作
const SupplierCancellationCooperation = params => {
    return Post('school/supplier/cancellationCooperation', params)
};
//供应商 - 学校审核
const SupplierSchoolStatus = params => {
    return Post('school/supplier/schoolStatus', params)
};
//店铺 - 商品 - 详情
const SupplierProductInfo = params => {
    return Post('school/supplier/productInfo', params)
};
//忘记密码---重新设置新密码
const HandleSetpassword = params => {
    return Post('school/handle/setpassword', params)
};
//上传配置信息
const CommonUpload = params => {
    return Post('api/common/upload', params)
};
//首次登录 - 设置密码
const IndexSetPassword = params => {
    return Post('school/index/setPassword', params)
};
//食堂 - 删除
const CanteenDeleteCanteen = params => {
    return Post('school/canteen/deleteCanteen', params)
};
//营养食谱 - 获取食材
const RecipesProduct = params => {
    return Post('school/recipes/product', params)
};
//营养食谱 - 菜品库 - 添加/修改
const RecipesDataManipulation = params => {
    return Post('school/recipes/dataManipulation', params)
};
//营养食谱 - 菜品库列表
const RecipesMenu = params => {
    return Post('school/recipes/menu', params)
};
//营养食谱 - 菜品库 - 详情
const RecipesInfo = params => {
    return Post('school/recipes/info', params)
};
//营养食谱 - 教委推荐食谱列表
const RecipesRecommendedRecipes = params => {
    return Post('school/recipes/recommendedRecipes', params)
};
//营养食谱 - 教委推荐食谱详情
const RecipesRecommendedRecipesInfo = params => {
    return Post('school/recipes/recommendedRecipesInfo', params)
};
//营养食谱 - 获取周
const RecipesGetWeek = params => {
    return Post('school/recipes/getWeek', params)
};
//营养营养食谱 - 周食谱列表
const RecipesWeekRecipesList = params => {
    return Post('school/recipes/weekRecipesList', params)
};
//营养食谱 - 每餐菜品 - 添加/编辑
const RecipesEveryMeal = params => {
    return Post('school/recipes/everyMeal', params)
};
//营养食谱 - 清除食谱
const RecipesClearRecipes = params => {
    return Post('school/recipes/clearRecipes', params)
};
//删除某个菜
const RecipesDeleteRecipesMenu = params => {
    return Post('school/recipes/deleteRecipesMenu', params)
};
//营养食谱 - 获取周列表搜素参数
const RecipesGetSearch = params => {
    return Post('school/recipes/getSearch', params)
};
//营养食谱 - 周列表
const RecipesWeekList = params => {
    return Post('school/recipes/weekList', params)
};
//营养食谱 - 生成周食谱总表
const RecipesWeeklyMenu = params => {
    return Post('school/recipes/weeklyMenu', params)
};
//营养食谱 - 复制食谱
const RecipesCopyRecipes = params => {
    return Post('school/recipes/copyRecipes', params)
};
//营养食谱 - 未编制列表
const RecipesNotPrepared = params => {
    return Post('school/recipes/notPrepared', params)
};
//营养食谱 - 删除菜品库
const RecipesDeleteMenu = params => {
    return Post('school/recipes/deleteMenu', params)
};
//营养食谱 - 编制详情
const RecipesCompiledInfo = params => {
    return Post('school/recipes/compiledInfo', params)
};
//营养食谱 - 保存编制
const RecipesCompiled = params => {
    return Post('school/recipes/compiled', params)
};
//营养食谱 - 已编制列表
const RecipesCompiledList = params => {
    return Post('school/recipes/compiledList', params)
};
//营养食谱 - 已编制详情
const RecipesBudgetInfo = params => {
    return Post('school/recipes/budgetInfo', params)
};
//导出周食谱总表
const ExportRecipesWeeklyMenu = params => {
    return ExportFile('school/export/recipesWeeklyMenu', params)
};
//营养食谱 - 周带量食谱公示表
const RecipesTableWeeklyRecipes = params => {
    return Post('school/recipes/tableWeeklyRecipes', params)
};
//营养食谱 - 周食材用量总表
const RecipesTableWeeklyConsumption = params => {
    return Post('school/recipes/tableWeeklyConsumption', params)
};
//营养食谱 - 周食材用量总表 - 打印
const RecipesTableWeeklyConsumptionPrinting = params => {
    return Post('school/recipes/tableWeeklyConsumptionPrinting', params)
};
//营养食谱 - 周食材用量总表 - 导出
const ExportTableWeeklyConsumptionPrinting = params => {
    return ExportFile('school/export/tableWeeklyConsumptionPrinting', params)
};
//周带量食谱公示表 - 打印
const RecipesTableWeeklyRecipesPrinting = params => {
    return Post('school/recipes/tableWeeklyRecipesPrinting', params)
};
//周带量食谱公示表 - 导出
const ExportTableWeeklyRecipesExport = params => {
    return ExportFile('school/export/tableWeeklyRecipesExport', params)
};
//权限 - 用户列表
const RoleUser = params => {
    return Post('school/role/user', params)
};
//权限 - 用户添加/编辑
const RoleUserDataManipulation = params => {
    return Post('school/role/userDataManipulation', params)
};
//权限 - 用户详情
const RoleUserDetails = params => {
    return Post('school/role/userDetails', params)
};
//权限 - 用户角色列表
const RoleUserRole = params => {
    return Post('school/role/userRole', params)
};
//权限 - 用户 - 单个/批量删除
const RoleUserDelete = params => {
    return Post('school/role/userDelete', params)
};
//权限 - 用户 - 单个/批量启用
const RoleUserEnable = params => {
    return Post('school/role/userEnable', params)
};
//权限 - 用户 - 单个/批量禁用
const RoleUserDisable = params => {
    return Post('school/role/userDisable', params)
};
//权限 - 角色列表
const RoleLists = params => {
    return Post('school/role/lists', params)
};
//权限 - 菜单列表
const RoleModule = params => {
    return Post('school/role/module', params)
};
//权限 - 添加/编辑
const RoleDataManipulation = params => {
    return Post('school/role/dataManipulation', params)
};
//权限 - 角色详情
const RoleDetails = params => {
    return Post('school/role/details', params)
};
//权限 - 权限角色 - 单个/批量删除
const RoleRoleDelete = params => {
    return Post('school/role/roleDelete', params)
};
//权限 - 权限角色- 单个/批量禁用
const RoleRoleDisable = params => {
    return Post('school/role/roleDisable', params)
};
//权限 - 权限角色 - 单个/批量启用
const RoleRoleEnable = params => {
    return Post('school/role/roleEnable', params)
};
//权限 - 获取当前用户可以显示的菜单列表
const RoleSidebarMenu = params => {
    return Post('school/role/sidebarMenu', params)
};
//巡查面板
const IndexInspectionPanel = params => {
    return Post('school/index/inspectionPanel', params)
};
//编制预算——供应商查询
const ProductSupplierData = params => {
    return Post('school/product/supplierData', params)
};
//编制预算 - 产品信息
const ProductOptionalBrand = params => {
    return Post('school/product/optionalBrand', params)
};
//教职工 - 导出
const FacultyExport = params => {
    return ExportFile('school/faculty/export', params)
};


//工作管理部分
//工作管理——食堂组织机构列表
const InfoCanteengrouplist = params => {
    return Post('school/info/canteengrouplist', params)
};
//工作管理——食堂组织信息添加和编辑
const InfoCanteenGroupAddUpdate = params => {
    return Post('school/info/canteenGroupAddUpdate', params)
};
//工作管理——获取学校
const InfoVillageInfo = params => {
    return Post('school/info/villageInfo', params)
};
//工作管理——学校基本信息
const InfoSchoolinfo = params => {
    return Post('school/info/schoolinfo', params)
};
//工作管理——伙食支出
const InfoFoodExpenditure = params => {
    return Post('school/info/foodExpenditure', params)
};
//台账列表打印
const DistributionStandingBookPrint = params => {
    return Post('school/Distribution/standingBookPrint', params)
};
//台账列表导出
const ExportStandingBookExport = params => {
    return ExportFile('school/Export/standingBookExport', params)
};
export default {
    ExportStandingBookExport,
    DistributionStandingBookPrint,
    login,
    IndexSchoolInfo,
    IndexInfo,
    CommonUpload,
    IndexCentralSchool,
    indexVillage,
    IndexLegal,
    SendCode,
    IndexUpdateMobile,
    FacultyDataManipulation,
    CommonGetSchool,
    IndexChangePassword,
    CommonSchoolSet,
    FacultyLists,
    schoolFacultyInfo,
    FacultyQuit,
    IndexStudentList,
    IndexStudent,
    CanteenLists,
    CnteenDataManipulation,
    CanteenInfo,
    CanteenFacultyList,
    CommonGetCanteen,
    CanteenFacultyDataManipulation,
    CommonCheckSms,
    CanteenFacultyInfo,
    CanteenQuit,
    SupplierLists,
    PastSupplierLists,
    GetTimeList,
    PastSupplierInfo,
    SupplierState,
    SupplierInfo,
    SupplierShop,
    SupplierProduct,
    SupplierCancellationCooperation,
    SupplierSchoolStatus,
    SupplierProductInfo,
    HandleSetpassword,
    FacultyExport,
    IndexSetPassword,
    CanteenDeleteCanteen,
    RecipesProduct,
    RecipesDataManipulation,
    RecipesMenu,
    RecipesInfo,
    RecipesRecommendedRecipes,
    FacultyImport,
    FcultyExcelMoban,
    RecipesRecommendedRecipesInfo,
    RecipesGetWeek,
    RecipesWeekRecipesList,
    RecipesEveryMeal,
    RecipesClearRecipes,
    RecipesDeleteRecipesMenu,
    RecipesGetSearch,
    RecipesWeekList,
    RecipesWeeklyMenu,
    RecipesCopyRecipes,
    RecipesNotPrepared,
    RecipesDeleteMenu,
    RecipesCompiledInfo,
    RecipesCompiled,
    RecipesCompiledList,
    RecipesBudgetInfo,
    ExportRecipesWeeklyMenu,
    RecipesTableWeeklyRecipes,
    RecipesTableWeeklyConsumption,
    RecipesTableWeeklyConsumptionPrinting,
    ExportTableWeeklyConsumptionPrinting,
    RecipesTableWeeklyRecipesPrinting,
    ExportTableWeeklyRecipesExport,
    RoleUser,
    RoleLists,
    RoleUserDataManipulation,
    RoleUserDetails,
    RoleUserRole,
    RoleUserDelete,
    RoleUserEnable,
    RoleUserDisable,
    RoleModule,
    RoleDataManipulation,
    RoleDetails,
    RoleRoleDelete,
    RoleRoleDisable,
    RoleRoleEnable,
    RoleSidebarMenu,
    IndexInspectionPanel,
    ProductSupplierData,
    ProductOptionalBrand,
    InfoCanteengrouplist,
    InfoCanteenGroupAddUpdate,
    InfoVillageInfo,
    InfoSchoolinfo,
    InfoFoodExpenditure
}