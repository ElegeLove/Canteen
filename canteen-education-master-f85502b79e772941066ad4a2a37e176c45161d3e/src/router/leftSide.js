import ManagementPanel from '@/pages/managementPanel';
import ProductCatalog from '@/pages/NameLibrary/ProductCatalog'; //产品(用户)名称库--产品目录
import ProductCatalogInfo from '@/pages/NameLibrary/ProductCatalogInfo'; //产品(用户)名称库--产品目录--详情
import SupplierCode from '@/pages/NameLibrary/SupplierCode'; //产品(用户)名称库--供应商代码
import ExamineList from '@/pages/NameLibrary/ExamineList'; //产品(用户)名称库--供应商代码--审核列表
import ExamineListHis from '@/pages/NameLibrary/ExamineListHis'; //产品(用户)名称库--历史关联信息--关联学校列表
import SupplierCodeInfo from '@/pages/NameLibrary/SupplierCodeInfo'; //产品(用户)名称库--供应商代码--详情
import HistoricalInfoInfo from '@/pages/NameLibrary/HistoricalInfoInfo'; //产品(用户)名称库--历史关联信息--关联学校列表--详情
import SchoolCode from '@/pages/NameLibrary/SchoolCode'; //产品(用户)名称库--学校代码
import AddSchoolCode from '@/pages/NameLibrary/AddSchoolCode'; //产品(用户)名称库--学校代码--新增学校
import SchoolCodeInfo from '@/pages/NameLibrary/SchoolCodeInfo'; //产品(用户)名称库--学校代码--学校详情
import HistoricalInfo from '@/pages/NameLibrary/HistoricalInfo'; //产品(用户)名称库--历史关联信息
import RecipeQuery from '@/pages/Information/RecipeQuery'; //信息查询--食谱查询
import PriceInquiry from '@/pages/Information/PriceInquiry'; //信息查询--价格查询
import DesignatedSupplierInfo from '@/pages/Information/DesignatedSupplierInfo'; //信息查询--定点供应商信息
import ShopDetails from '@/pages/Information/ShopDetails'; //信息查询--定点供应商信息--店铺详情
import CommodityInfo from '@/pages/Information/CommodityInfo'; //信息查询--定点供应商信息--店铺详情--商品详情
import DesignatedSupplierStatistics from '@/pages/Information/DesignatedSupplierStatistics'; //信息查询--定点供应商分类统计
import PurchasePlanAnalysis from '@/pages/Information/PurchasePlanAnalysis'; //信息查询--采购计划分析
import ExpenditureStructureAnalysis from '@/pages/Information/ExpenditureStructureAnalysis'; //信息查询--支出结构分析
import FoodConsumeStructureStatistics from '@/pages/Information/FoodConsumeStructureStatistics'; //信息查询--食材消耗结构统计
import InfoAggregation from '@/pages/InfoStatistics/InfoAggregation'; //信息统计--学校基本信息汇总
import ShowVillageSchool from '@/pages/InfoStatistics/ShowVillageSchool'; //信息统计--学校基本信息汇总--查看村校
import WorkersList from '@/pages/InfoStatistics/WorkersList'; //信息统计--学校基本信息汇总--职工列表
import StaffInfo from '@/pages/InfoStatistics/StaffInfo'; //信息统计--学校基本信息汇总--职工列表--职工详情
import Organization from '@/pages/InfoStatistics/Organization'; //信息统计--组织机构
import ChargeManagement from '@/pages/InfoStatistics/ChargeManagement'; //信息统计--收费管理
import SiteManagement from '@/pages/InfoStatistics/SiteManagement'; //信息统计--场所管理
import PlaceShowVillageSchool from '@/pages/InfoStatistics/PlaceShowVillageSchool'; //信息统计--场所管理--查看村校
import LicenseManagement from '@/pages/InfoStatistics/LicenseManagement'; //信息统计--许可管理
import PermitShowVillageSchool from '@/pages/InfoStatistics/PermitShowVillageSchool'; //信息统计--许可管理--查看村校
import LaborInformation from '@/pages/InfoStatistics/LaborInformation'; //信息统计--劳务信息
import DrinkingWater from '@/pages/InfoStatistics/DrinkingWater'; //信息统计--直饮水
import WaterShowVillageSchool from '@/pages/InfoStatistics/WaterShowVillageSchool'; //信息统计--直饮水--查看村校
import CampusSupermarket from '@/pages/InfoStatistics/CampusSupermarket'; //信息统计--校园超市
import StudentDormitory from '@/pages/InfoStatistics/StudentDormitory'; //信息统计--学生寝室
import SystemConstruction from '@/pages/InfoStatistics/SystemConstruction'; //信息统计--制度建设
import ConstructionInfo from '@/pages/InfoStatistics/ConstructionInfo'; //信息统计--制度建设--查看
import BusinessReportEducation from '@/pages/InfoStatistics/BusinessReportEducation'; //信息统计--营改报表（教委/教育局）
import BusinessReportEducationAdd from '@/pages/InfoStatistics/BusinessReportEducationAdd'; //信息统计--营改报表（教委/教育局）--填写、编辑
import BusinessReportEducationInfo from '@/pages/InfoStatistics/BusinessReportEducationInfo'; //信息统计--营改报表（教委/教育局）--详情
import BusinessReportUnit from '@/pages/InfoStatistics/BusinessReportUnit'; //信息统计--营改报表（单位）
import RosterNutrition from '@/pages/InfoStatistics/RosterNutrition'; //信息统计--营改报表（单位）--营养改善花名册
import EnjoyRoster from '@/pages/InfoStatistics/EnjoyRoster'; //信息统计--营改报表（单位）--享受花名册
import NoEnjoyRoster from '@/pages/InfoStatistics/NoEnjoyRoster'; //信息统计--营改报表（单位）--未享受花名册
import BookSubscription from '@/pages/InfoStatistics/BookSubscription'; //信息统计--作业本征订
import InformationDisclosure from '@/pages/WorkManagement/InformationDisclosure'; //工作管理--信息公开
import WorkRecord from '@/pages/WorkManagement/WorkRecord'; //工作管理--工作记录
import RecommendedRecipes from '@/pages/WorkManagement/RecommendedRecipes'; //工作管理--推荐食谱
import NewDishes from '@/pages/WorkManagement/NewDishes'; //工作管理--推荐食谱--创建新菜品
import RecommendedRecipesInfo from '@/pages/WorkManagement/RecommendedRecipesInfo'; //工作管理--推荐食谱--查看
import BusinessTraining from '@/pages/WorkManagement/BusinessTraining'; //工作管理--业务培训
import BusinessTrainingInfo from '@/pages/WorkManagement/BusinessTrainingInfo'; //工作管理--业务培训--查看详情
import BusinessTrainingInfoAdd from '@/pages/WorkManagement/BusinessTrainingInfoAdd'; //工作管理--业务培训--新增、编辑
import SurveyQuestionnaire from '@/pages/WorkManagement/SurveyQuestionnaire'; //工作管理--问卷调查
import SurveyQuestionnaireAdd from '@/pages/WorkManagement/SurveyQuestionnaireAdd'; //工作管理--问卷调查--添加
import SurveyQuestionnaireInfo from '@/pages/WorkManagement/SurveyQuestionnaireInfo'; //工作管理--问卷调查--详情
import NotificationManagement from '@/pages/WorkManagement/NotificationManagement'; //工作管理--通知管理
import NotificationManagementInfo from '@/pages/WorkManagement/NotificationManagementInfo'; //工作管理--通知管理--详情
import SchoolCalendarSetting from '@/pages/WorkManagement/SchoolCalendarSetting'; //工作管理--校历设置
import WeeksSetting from '@/pages/WorkManagement/WeeksSetting'; //工作管理--校历设置--周数设置
import EarlyWarningSetting from '@/pages/WorkManagement/EarlyWarningSetting'; //工作管理--预警设置
import UserManagement from '@/pages/AccountManagement/UserManagement'; //账户管理--用户管理
import AddUser from '@/pages/AccountManagement/AddUser'; //账户管理--用户管理--添加用户
import UserInfo from '@/pages/AccountManagement/UserInfo'; //账户管理--用户管理--用户详情
import RoleManagement from '@/pages/AccountManagement/RoleManagement'; //账户管理--角色管理
import AddRole from '@/pages/AccountManagement/AddRole'; //账户管理--角色管理--添加角色
import RoleInfo from '@/pages/AccountManagement/RoleInfo'; //账户管理--角色管理--角色详情
import BigDataAnalysis from '@/pages/BigDataAnalysis/BigDataAnalysis'; //大数据分析
import EarlyWarningList from '@/pages/BigDataAnalysis/EarlyWarningList'; //大数据分析--预警列表
import EarlyWarningListInjfo from '@/pages/BigDataAnalysis/EarlyWarningListInjfo'; //大数据分析--预警列表--详情
import Personal from '@/pages/login/Personal'; //个人中心
import ChangePhone from '@/pages/login/ChangePhone'; //修改手机号
import SystemSettings from '@/pages/SystemSettings/SystemSettings'; //系统设置--操作手册
export default [{
    path: '/ManagementPanel',
    name: 'ManagementPanel',
    component: ManagementPanel,
    redirect: "/ManagementPanel/BigDataAnalysis",
    children: [{
            path: 'BigDataAnalysis',
            name: 'BigDataAnalysis',
            meta: { requireAuth: true, munuVal: 'BigDataAnalysis' }, //大数据分析
            component: BigDataAnalysis
        },
        {
            path: 'EarlyWarningList',
            name: 'EarlyWarningList',
            meta: { requireAuth: true, munuVal: 'BigDataAnalysis' }, //大数据分析--预警列表
            component: EarlyWarningList
        },
        {
            path: 'EarlyWarningListInjfo',
            name: 'EarlyWarningListInjfo',
            meta: { requireAuth: true, munuVal: 'BigDataAnalysis' }, //大数据分析--预警列表
            component: EarlyWarningListInjfo
        },
        {
            path: 'ProductCatalog',
            name: 'ProductCatalog',
            meta: { requireAuth: true, munuVal: 'ProductCatalog' }, //产品(用户)名称库--产品目录
            component: ProductCatalog
        },
        {
            path: 'ProductCatalogInfo',
            name: 'ProductCatalogInfo',
            meta: { requireAuth: true, munuVal: 'ProductCatalog' }, //产品(用户)名称库--产品目录--详情
            component: ProductCatalogInfo
        },
        {
            path: 'SupplierCode',
            name: 'SupplierCode',
            meta: { requireAuth: true, munuVal: 'SupplierCode' }, //产品(用户)名称库--供应商代码
            component: SupplierCode
        },
        {
            path: 'SupplierCodeInfo',
            name: 'SupplierCodeInfo',
            meta: { requireAuth: true, munuVal: 'SupplierCode' }, //产品(用户)名称库--供应商代码--详情
            component: SupplierCodeInfo
        },
        {
            path: 'HistoricalInfoInfo',
            name: 'HistoricalInfoInfo',
            meta: { requireAuth: true, munuVal: 'HistoricalInfo' }, //产品(用户)名称库--供应商代码--详情
            component: HistoricalInfoInfo
        },
        {
            path: 'ExamineList',
            name: 'ExamineList',
            meta: { requireAuth: true, munuVal: 'SupplierCode' }, //产品(用户)名称库--供应商代码--审核列表
            component: ExamineList
        },
        {
            path: 'ExamineListHis',
            name: 'ExamineListHis',
            meta: { requireAuth: true, munuVal: 'HistoricalInfo' }, //产品(用户)名称库--供应商代码--审核列表
            component: ExamineListHis
        },
        {
            path: 'SchoolCode',
            name: 'SchoolCode',
            meta: { requireAuth: true, munuVal: 'SchoolCode' }, //产品(用户)名称库--学校代码
            component: SchoolCode
        },
        {
            path: 'AddSchoolCode',
            name: 'AddSchoolCode',
            meta: { requireAuth: true, munuVal: 'SchoolCode' }, //产品(用户)名称库--学校代码--新增学校
            component: AddSchoolCode
        },
        {
            path: 'SchoolCodeInfo',
            name: 'SchoolCodeInfo',
            meta: { requireAuth: true, munuVal: 'SchoolCode' }, //产品(用户)名称库--学校代码--学校详情
            component: SchoolCodeInfo
        },
        {
            path: 'HistoricalInfo',
            name: 'HistoricalInfo',
            meta: { requireAuth: true, munuVal: 'HistoricalInfo' }, //产品(用户)名称库--历史关联信息
            component: HistoricalInfo
        },
        {
            path: 'RecipeQuery',
            name: 'RecipeQuery',
            meta: { requireAuth: true, munuVal: 'RecipeQuery' }, //信息查询--食谱查询
            component: RecipeQuery
        },
        {
            path: 'PriceInquiry',
            name: 'PriceInquiry',
            meta: { requireAuth: true, munuVal: 'PriceInquiry' }, //信息查询--价格查询
            component: PriceInquiry
        },
        {
            path: 'DesignatedSupplierInfo',
            name: 'DesignatedSupplierInfo',
            meta: { requireAuth: true, munuVal: 'DesignatedSupplierInfo', keepAlive: true }, //信息查询--定点供应商信息
            component: DesignatedSupplierInfo
        },
        {
            path: 'ShopDetails',
            name: 'ShopDetails',
            meta: { requireAuth: true, munuVal: 'DesignatedSupplierInfo' }, //信息查询--定点供应商信息--店铺详情
            component: ShopDetails
        },
        {
            path: 'CommodityInfo',
            name: 'CommodityInfo',
            meta: { requireAuth: true, munuVal: 'DesignatedSupplierInfo' }, //信息查询--定点供应商信息--店铺详情--商品详情
            component: CommodityInfo
        },
        {
            path: 'DesignatedSupplierStatistics',
            name: 'DesignatedSupplierStatistics',
            meta: { requireAuth: true, munuVal: 'DesignatedSupplierStatistics' }, //信息查询--定点供应商分类统计
            component: DesignatedSupplierStatistics
        },
        {
            path: 'PurchasePlanAnalysis',
            name: 'PurchasePlanAnalysis',
            meta: { requireAuth: true, munuVal: 'PurchasePlanAnalysis' }, //信息查询--采购计划分析
            component: PurchasePlanAnalysis
        },
        {
            path: 'ExpenditureStructureAnalysis',
            name: 'ExpenditureStructureAnalysis',
            meta: { requireAuth: true, munuVal: 'ExpenditureStructureAnalysis' }, //信息查询--支出结构分析
            component: ExpenditureStructureAnalysis
        },
        {
            path: 'FoodConsumeStructureStatistics',
            name: 'FoodConsumeStructureStatistics',
            meta: { requireAuth: true, munuVal: 'FoodConsumeStructureStatistics' }, //信息查询--食材消耗结构统计
            component: FoodConsumeStructureStatistics
        },
        {
            path: 'InfoAggregation',
            name: 'InfoAggregation',
            meta: { requireAuth: true, munuVal: 'InfoAggregation', keepAlive: true }, //信息统计--学校基本信息汇总
            component: InfoAggregation
        },
        {
            path: 'ShowVillageSchool',
            name: 'ShowVillageSchool',
            meta: { requireAuth: true, munuVal: 'InfoAggregation' }, //信息统计--学校基本信息汇总--查看村校
            component: ShowVillageSchool
        },
        {
            path: 'WorkersList',
            name: 'WorkersList',
            meta: { requireAuth: true, munuVal: 'InfoAggregation' }, //信息统计--学校基本信息汇总--职工列表
            component: WorkersList
        },
        {
            path: 'StaffInfo',
            name: 'StaffInfo',
            meta: { requireAuth: true, munuVal: 'InfoAggregation' }, //信息统计--学校基本信息汇总--职工列表--职工详情
            component: StaffInfo
        },
        {
            path: 'Organization',
            name: 'Organization',
            meta: { requireAuth: true, munuVal: 'Organization' }, //信息统计--组织机构
            component: Organization
        },
        {
            path: 'ChargeManagement',
            name: 'ChargeManagement',
            meta: { requireAuth: true, munuVal: 'ChargeManagement' }, //信息统计--收费管理
            component: ChargeManagement
        },
        {
            path: 'SiteManagement',
            name: 'SiteManagement',
            meta: { requireAuth: true, munuVal: 'SiteManagement', keepAlive: true }, //信息统计--场所管理
            component: SiteManagement
        },
        {
            path: 'PlaceShowVillageSchool',
            name: 'PlaceShowVillageSchool',
            meta: { requireAuth: true, munuVal: 'SiteManagement' }, //信息统计--场所管理--查看村校
            component: PlaceShowVillageSchool
        },
        {
            path: 'LicenseManagement',
            name: 'LicenseManagement',
            meta: { requireAuth: true, munuVal: 'LicenseManagement', keepAlive: true }, //信息统计--许可管理
            component: LicenseManagement
        },
        {
            path: 'PermitShowVillageSchool',
            name: 'PermitShowVillageSchool',
            meta: { requireAuth: true, munuVal: 'LicenseManagement' }, //信息统计--许可管理--查看村校
            component: PermitShowVillageSchool
        },
        {
            path: 'LaborInformation',
            name: 'LaborInformation',
            meta: { requireAuth: true, munuVal: 'LaborInformation' }, //信息统计--劳务信息
            component: LaborInformation
        },
        {
            path: 'DrinkingWater',
            name: 'DrinkingWater',
            meta: { requireAuth: true, munuVal: 'DrinkingWater', keepAlive: true }, //信息统计--直饮水
            component: DrinkingWater
        },
        {
            path: 'WaterShowVillageSchool',
            name: 'WaterShowVillageSchool',
            meta: { requireAuth: true, munuVal: 'DrinkingWater' }, //信息统计--直饮水--查看村校
            component: WaterShowVillageSchool
        },
        {
            path: 'CampusSupermarket',
            name: 'CampusSupermarket',
            meta: { requireAuth: true, munuVal: 'CampusSupermarket' }, //信息统计--校园超市
            component: CampusSupermarket
        },
        {
            path: 'StudentDormitory',
            name: 'StudentDormitory',
            meta: { requireAuth: true, munuVal: 'StudentDormitory' }, //信息统计--学生寝室
            component: StudentDormitory
        },
        {
            path: 'SystemConstruction',
            name: 'SystemConstruction',
            meta: { requireAuth: true, munuVal: 'SystemConstruction' }, //信息统计--制度建设
            component: SystemConstruction
        },
        {
            path: 'ConstructionInfo',
            name: 'ConstructionInfo',
            meta: { requireAuth: true, munuVal: 'SystemConstruction' }, //信息统计--制度建设--查看
            component: ConstructionInfo
        },
        {
            path: 'BusinessReportEducation',
            name: 'BusinessReportEducation',
            meta: { requireAuth: true, munuVal: 'BusinessReportEducation' }, //信息统计--营改报表（教委/教育局）
            component: BusinessReportEducation
        },
        {
            path: 'BusinessReportEducationAdd',
            name: 'BusinessReportEducationAdd',
            meta: { requireAuth: true, munuVal: 'BusinessReportEducation' }, //信息统计--营改报表（教委/教育局）--填写、编辑
            component: BusinessReportEducationAdd
        },
        {
            path: 'BusinessReportEducationInfo',
            name: 'BusinessReportEducationInfo',
            meta: { requireAuth: true, munuVal: 'BusinessReportEducation' }, //信息统计--营改报表（教委/教育局）--详情
            component: BusinessReportEducationInfo
        },
        {
            path: 'RosterNutrition',
            name: 'RosterNutrition',
            meta: { requireAuth: true, munuVal: 'RosterNutrition' }, //信息统计--营改报表（教委/教育局）-- 花名册
            component: RosterNutrition
        },
        {
            path: 'EnjoyRoster',
            name: 'EnjoyRoster',
            meta: { requireAuth: true, munuVal: 'RosterNutrition' }, //信息统计--营改报表（单位）--享受花名册
            component: EnjoyRoster
        },
        {
            path: 'NoEnjoyRoster',
            name: 'NoEnjoyRoster',
            meta: { requireAuth: true, munuVal: 'RosterNutrition' }, //信息统计--营改报表（单位）--未享受花名册
            component: NoEnjoyRoster
        },
        {
            path: 'BusinessReportUnit',
            name: 'BusinessReportUnit',
            meta: { requireAuth: true, munuVal: 'BusinessReportUnit' }, //信息统计--营改报表（单位）
            component: BusinessReportUnit
        },

        {
            path: 'BookSubscription',
            name: 'BookSubscription',
            meta: { requireAuth: true, munuVal: 'BookSubscription' }, //信息统计--作业本征订
            component: BookSubscription
        },
        {
            path: 'InformationDisclosure',
            name: 'InformationDisclosure',
            meta: { requireAuth: true, munuVal: 'InformationDisclosure' }, //工作管理--信息公开
            component: InformationDisclosure
        },
        {
            path: 'WorkRecord',
            name: 'WorkRecord',
            meta: { requireAuth: true, munuVal: 'WorkRecord' }, //工作管理--工作记录
            component: WorkRecord
        },
        {
            path: 'RecommendedRecipes',
            name: 'RecommendedRecipes',
            meta: { requireAuth: true, munuVal: 'RecommendedRecipes' }, //工作管理--推荐食谱
            component: RecommendedRecipes
        },
        {
            path: 'NewDishes',
            name: 'NewDishes',
            meta: { requireAuth: true, munuVal: 'RecommendedRecipes' }, //工作管理--推荐食谱--创建新菜品
            component: NewDishes
        },
        {
            path: 'RecommendedRecipesInfo',
            name: 'RecommendedRecipesInfo',
            meta: { requireAuth: true, munuVal: 'RecommendedRecipes' }, //工作管理--推荐食谱--查看
            component: RecommendedRecipesInfo
        },
        {
            path: 'BusinessTraining',
            name: 'BusinessTraining',
            meta: { requireAuth: true, munuVal: 'BusinessTraining' }, //工作管理--业务培训
            component: BusinessTraining
        },
        {
            path: 'BusinessTrainingInfo',
            name: 'BusinessTrainingInfo',
            meta: { requireAuth: true, munuVal: 'BusinessTraining' }, //工作管理--业务培训--查看
            component: BusinessTrainingInfo
        },
        {
            path: 'BusinessTrainingInfoAdd',
            name: 'BusinessTrainingInfoAdd',
            meta: { requireAuth: true, munuVal: 'BusinessTraining' }, //工作管理--业务培训--新增-编辑
            component: BusinessTrainingInfoAdd
        },
        {
            path: 'SurveyQuestionnaire',
            name: 'SurveyQuestionnaire',
            meta: { requireAuth: true, munuVal: 'SurveyQuestionnaire' }, //工作管理--问卷调查
            component: SurveyQuestionnaire
        },
        {
            path: 'SurveyQuestionnaireAdd',
            name: 'SurveyQuestionnaireAdd',
            meta: { requireAuth: true, munuVal: 'SurveyQuestionnaire' }, //工作管理--问卷调查
            component: SurveyQuestionnaireAdd
        },
        {
            path: 'SurveyQuestionnaireInfo',
            name: 'SurveyQuestionnaireInfo',
            meta: { requireAuth: true, munuVal: 'SurveyQuestionnaire' }, //工作管理--问卷调查
            component: SurveyQuestionnaireInfo
        },
        {
            path: 'NotificationManagement',
            name: 'NotificationManagement',
            meta: { requireAuth: true, munuVal: 'NotificationManagement' }, //工作管理--通知管理
            component: NotificationManagement
        },
        {
            path: 'NotificationManagementInfo',
            name: 'NotificationManagementInfo',
            meta: { requireAuth: true, munuVal: 'NotificationManagement' }, //工作管理--通知管理--详情
            component: NotificationManagementInfo
        },
        {
            path: 'SchoolCalendarSetting',
            name: 'SchoolCalendarSetting',
            meta: { requireAuth: true, munuVal: 'SchoolCalendarSetting' }, //工作管理--校历设置
            component: SchoolCalendarSetting
        },
        {
            path: 'WeeksSetting',
            name: 'WeeksSetting',
            meta: { requireAuth: true, munuVal: 'SchoolCalendarSetting' }, //工作管理--校历设置--周数设置
            component: WeeksSetting
        },
        {
            path: 'EarlyWarningSetting',
            name: 'EarlyWarningSetting',
            meta: { requireAuth: true, munuVal: 'EarlyWarningSetting' }, //工作管理--预警设置
            component: EarlyWarningSetting
        },
        {
            path: 'UserManagement',
            name: 'UserManagement',
            meta: { requireAuth: true, munuVal: 'UserManagement' }, //账户管理--用户管理
            component: UserManagement
        },
        {
            path: 'AddUser',
            name: 'AddUser',
            meta: { requireAuth: true, munuVal: 'UserManagement' }, //账户管理--用户管理--添加用户
            component: AddUser
        },
        {
            path: 'UserInfo',
            name: 'UserInfo',
            meta: { requireAuth: true, munuVal: 'UserManagement' }, //账户管理--用户管理--用户详情
            component: UserInfo
        },
        {
            path: 'RoleManagement',
            name: 'RoleManagement',
            meta: { requireAuth: true, munuVal: 'RoleManagement' }, //账户管理--角色管理
            component: RoleManagement
        },

        {
            path: 'AddRole',
            name: 'AddRole',
            meta: { requireAuth: true, munuVal: 'RoleManagement' }, //账户管理--角色管理--添加角色
            component: AddRole
        },
        {
            path: 'RoleInfo',
            name: 'RoleInfo',
            meta: { requireAuth: true, munuVal: 'RoleManagement' }, //账户管理--角色管理--角色详情
            component: RoleInfo
        },
        {
            path: 'Personal',
            name: 'Personal',
            meta: { requireAuth: false, munuVal: 'noSide' }, //个人中心
            component: Personal
        },
        {
            path: 'ChangePhone',
            name: 'ChangePhone',
            meta: { requireAuth: false, munuVal: 'noSide' }, //修改手机号
            component: ChangePhone
        },
        {
            path: 'SystemSettings',
            name: 'SystemSettings',
            meta: { requireAuth: true, munuVal: 'SystemSettings' }, //账户管理--角色管理--角色详情
            component: SystemSettings
        },
    ]
}]