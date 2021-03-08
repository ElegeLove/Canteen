import order from './order.js' //面板左侧路由
import workManagement from './WorkManagement.js' //工作管理
import BrightKitchen from './BrightKitchen.js' //明厨亮灶

import ManagementPanel from '@/pages/managementPanel';
import InspectionPanel from '@/pages/inspectionPanel'; //巡查面板
import SchoolInformation from '@/pages/schoolInformation/SchoolInformation'; //办学信息
import FacultyManagement from '@/pages/schoolInformation/FacultyManagement'; //教职工管理
import StudentNum from '@/pages/schoolInformation/StudentNum'; //学生人数

import SetSchoolInformation from '@/pages/schoolInformation/setSchoolInformation'; //修改学校信息-办学信息
import VillageSchool from '@/pages/schoolInformation/setSchoolInformation/VillageSchool'; //修改学校信息-村校信息
import ChargeInformation from '@/pages/schoolInformation/setSchoolInformation/ChargeInformation'; //修改学校信息-负责人信息
import InfoSuccess from '@/pages/schoolInformation/setSchoolInformation/Success'; //修改学校信息-成功

import Faculty from '@/pages/schoolInformation/Faculty'; //教职工管理-在职教职工
import ResignationRecord from '@/pages/schoolInformation/ResignationRecord'; //教职工管理-离职记录
import AddEmployee from '@/pages/schoolInformation/AddEmployee'; //教职工管理-添加员工
import EmployeeDetails from '@/pages/schoolInformation/EmployeeDetails'; //教职工管理-查看详情

import Feedback from '@/pages/Feedback'; //意见反馈
import ContactUs from '@/pages/ContactUs'; //联系我们

import PersonalCenter from '@/pages/PersonalCenter'; //个人中心
import ChangeMobile from '@/pages/PersonalCenter/ChangeMobile'; //更换绑定手机号码

//食堂基本信息
import CanteenStaff from '@/pages/CanteenInformation/CanteenStaff'; //许可管理
import AddCanteen from '@/pages/CanteenInformation/CanteenStaff/AddCanteen'; //添加食堂
import GoNext from '@/pages/CanteenInformation/CanteenStaff/goNext'; //添加食堂-下一步
import StaffDetails from '@/pages/CanteenInformation/CanteenStaff/StaffDetails'; //食堂详情
import LicenseManagement from '@/pages/CanteenInformation/LicenseManagement'; //食堂员工
import JobEmployees from '@/pages/CanteenInformation/LicenseManagement/JobEmployees'; //食堂员工-在职员工
import JobAddEmployee from '@/pages/CanteenInformation/LicenseManagement/AddEmployee'; //食堂员工-添加员工
import JobAddEmployeeTwo from '@/pages/CanteenInformation/LicenseManagement/AddEmployeeTwo'; //食堂员工-添加员工2
import QuitList from '@/pages/CanteenInformation/LicenseManagement/QuitList'; //食堂员工-离职记录
import JobEmployDetails from '@/pages/CanteenInformation/LicenseManagement/JobEmployDetails'; //食堂员工-查看详情

//供应商管理
import SupplierManagement from '@/pages/SupplierManagement'; //供应商管理
import PartnerSuppliers from '@/pages/SupplierManagement/PartnerSuppliers'; //供应商管理-合作供应商
import SuppliersAudited from '@/pages/SupplierManagement/SuppliersAudited'; //供应商管理-待审核供应商
import PastpartnerSuppliers from '@/pages/SupplierManagement/PastpartnerSuppliers'; //供应商管理-往期合作供应商
import SupplierDetails from '@/pages/SupplierManagement/SupplierDetails'; //供应商管理-供应商详情
import ShopDetails from '@/pages/SupplierManagement/ShopDetails'; //供应商管理-店铺详情
import CommodityDetails from '@/pages/SupplierManagement/CommodityDetails'; //供应商管理-商品详情

//营养食谱
import NutritionDiet from '@/pages/NutritionDiet'; //营养食谱-菜品库
import CreateDishes from '@/pages/NutritionDiet/CreateDishes'; //营养食谱-周食谱-创建菜品
import WeeklyRecipes from '@/pages/NutritionDiet/WeeklyRecipes'; //营养食谱-周食谱
import RecommendedRecipes from '@/pages/NutritionDiet/WeeklyRecipes/RecommendedRecipes'; //营养食谱-周食谱-推荐食谱
import RecipeDetails from '@/pages/NutritionDiet/WeeklyRecipes/RecipeDetails'; //营养食谱-周食谱-推荐食谱详情
import ViewRecipes from '@/pages/NutritionDiet/ViewRecipes'; //营养食谱-周食谱-查看食谱
import CreateRecipes from '@/pages/NutritionDiet/WeeklyRecipes/CreateRecipes'; //营养食谱-周食谱-创建食谱
import AddDishes from '@/pages/NutritionDiet/WeeklyRecipes/AddDishes'; //营养食谱-周食谱-添加菜品
import FoodConsumption from '@/pages/NutritionDiet/FoodConsumption'; //营养食谱-用量预算
import BePrepared from '@/pages/NutritionDiet/FoodConsumption/BePrepared'; //营养食谱-用量预算   未编制
import Compiled from '@/pages/NutritionDiet/FoodConsumption/Compiled'; //营养食谱-用量预算   已编制
import BudgetTable from '@/pages/NutritionDiet/BudgetTable'; //营养食谱-用量预算-预算表

import RecipeBox from '@/pages/NutritionDiet/RecipeBox'; //营养食谱-带量食谱公示
import RecipePublicity from '@/pages/NutritionDiet/RecipeBox/RecipePublicity'; //营养食谱-周带量
import ZhouCuisine from '@/pages/NutritionDiet/RecipeBox/ZhouCuisine'; //营养食谱-周食材

//配置管理
import UserManagement from '@/pages/ConfigurationManagement/UserManagement'; //用户管理
import AddUser from '@/pages/ConfigurationManagement/UserManagement/AddUser'; //用户管理-添加用户
import lookDetails from '@/pages/ConfigurationManagement/UserManagement/lookDetails'; //用户管理-查看详情
import AuthorityManagement from '@/pages/ConfigurationManagement/AuthorityManagement'; //权限管理
import AddPosition from '@/pages/ConfigurationManagement/AuthorityManagement/AddPosition'; //权限管理-添加职位
import AuthDetails from '@/pages/ConfigurationManagement/AuthorityManagement/AuthDetails'; //权限管理-查看详情

//首次登录
import FirstLogin from '@/pages/FirstLogin'; //首次登录

export default [{
        path: "*",
        redirect: "/error"
    },
    {
        path: '/ManagementPanel',
        name: 'ManagementPanel',
        component: ManagementPanel,
        redirect: "/ManagementPanel/InspectionPanel",
        children: [{
                path: 'InspectionPanel',
                name: 'InspectionPanel',
                component: InspectionPanel,
                meta: {
                    requireAuth: true,
                    relation: "InspectionPanel"
                }
            },
            {
                path: 'SchoolInformation',
                name: 'SchoolInformation',
                component: SchoolInformation,
                meta: {
                    requireAuth: true,
                    relation: "SchoolInformation"
                }
            },
            {
                path: 'FacultyManagement',
                name: 'FacultyManagement',
                component: FacultyManagement,
                redirect: "/ManagementPanel/FacultyManagement/Faculty",
                children: [{
                        path: 'Faculty',
                        name: 'Faculty',
                        component: Faculty,
                        meta: {
                            requireAuth: true,
                            relation: "FacultyManagement"
                        }
                    },
                    {
                        path: 'ResignationRecord',
                        name: 'ResignationRecord',
                        component: ResignationRecord,
                        meta: {
                            requireAuth: true,
                            relation: "FacultyManagement"
                        }
                    },
                ]
            },
            {
                path: '/AddEmployee',
                name: 'AddEmployee',
                component: AddEmployee,
                meta: {
                    requireAuth: true,
                    relation: "FacultyManagement"
                }
            },
            {
                path: 'EmployeeDetails',
                name: 'EmployeeDetails',
                component: EmployeeDetails,
                meta: {
                    requireAuth: true,
                    relation: "FacultyManagement"
                }
            },
            {
                path: 'StudentNum',
                name: 'StudentNum',
                component: StudentNum,
                meta: {
                    requireAuth: true,
                    relation: "StudentNum"
                }
            },
            {
                path: 'SetSchoolInformation',
                name: 'SetSchoolInformation',
                component: SetSchoolInformation,
                meta: {
                    requireAuth: true,
                    relation: "SchoolInformation"
                }
            },
            {
                path: 'VillageSchool',
                name: 'VillageSchool',
                component: VillageSchool,
                meta: {
                    requireAuth: true,
                    relation: "SchoolInformation"
                }
            },
            {
                path: 'ChargeInformation',
                name: 'ChargeInformation',
                component: ChargeInformation,
                meta: {
                    requireAuth: true,
                    relation: "SchoolInformation"
                }
            },
            {
                path: 'InfoSuccess',
                name: 'InfoSuccess',
                component: InfoSuccess,
                meta: {
                    requireAuth: true,
                    relation: "SchoolInformation"
                }
            },
            {
                path: 'Feedback',
                name: 'Feedback',
                component: Feedback,
                meta: {
                    requireAuth: true,
                    relation: "noSide"
                }
            },
            {
                path: 'ContactUs',
                name: 'ContactUs',
                component: ContactUs,
                meta: {
                    requireAuth: true,
                    relation: "noSide"
                }
            },
            {
                path: 'PersonalCenter',
                name: 'PersonalCenter',
                component: PersonalCenter,
                meta: {
                    requireAuth: true,
                    relation: "noSide"
                }
            },
            {
                path: 'ChangeMobile',
                name: 'ChangeMobile',
                component: ChangeMobile,
                meta: {
                    requireAuth: true,
                    relation: "noSide"
                }
            },
            {
                path: 'CanteenStaff',
                name: 'CanteenStaff',
                component: CanteenStaff,
                meta: {
                    requireAuth: true,
                    relation: "CanteenStaff"
                }
            },
            {
                path: 'AddCanteen',
                name: 'AddCanteen',
                component: AddCanteen,
                meta: {
                    requireAuth: true,
                    relation: "CanteenStaff"
                }
            },
            {
                path: 'GoNext',
                name: 'GoNext',
                component: GoNext,
                meta: {
                    requireAuth: true,
                    relation: "CanteenStaff"
                }
            },
            {
                path: 'StaffDetails',
                name: 'StaffDetails',
                component: StaffDetails,
                meta: {
                    requireAuth: true,
                    relation: "CanteenStaff"
                }
            },
            {
                path: 'LicenseManagement',
                name: 'LicenseManagement',
                component: LicenseManagement,
                redirect: "/ManagementPanel/LicenseManagement/JobEmployees",
                children: [{
                        path: 'JobEmployees',
                        name: 'JobEmployees',
                        component: JobEmployees,
                        meta: {
                            requireAuth: true,
                            relation: "LicenseManagement"
                        }
                    },
                    {
                        path: 'QuitList',
                        name: 'QuitList',
                        component: QuitList,
                        meta: {
                            requireAuth: true,
                            relation: "LicenseManagement"
                        }
                    },
                ]
            },
            {
                path: 'SupplierManagement',
                name: 'SupplierManagement',
                component: SupplierManagement,
                redirect: "/ManagementPanel/SupplierManagement/PartnerSuppliers",
                children: [{
                        path: 'PartnerSuppliers',
                        name: 'PartnerSuppliers',
                        component: PartnerSuppliers,
                        meta: {
                            requireAuth: true,
                            relation: "SupplierManagement"
                        }
                    },
                    {
                        path: 'SuppliersAudited',
                        name: 'SuppliersAudited',
                        component: SuppliersAudited,
                        meta: {
                            requireAuth: true,
                            relation: "SupplierManagement"
                        }
                    },
                    {
                        path: 'PastpartnerSuppliers',
                        name: 'PastpartnerSuppliers',
                        component: PastpartnerSuppliers,
                        meta: {
                            requireAuth: true,
                            relation: "SupplierManagement"
                        }
                    },
                ]
            },
            {
                path: 'RecipeBox',
                name: 'RecipeBox',
                component: RecipeBox,
                redirect: "/ManagementPanel/RecipeBox/RecipePublicity",
                children: [{
                        path: 'RecipePublicity',
                        name: 'RecipePublicity',
                        component: RecipePublicity,
                        meta: {
                            requireAuth: true,
                            relation: "RecipeBox"
                        }
                    },
                    {
                        path: 'ZhouCuisine',
                        name: 'ZhouCuisine',
                        component: ZhouCuisine,
                        meta: {
                            requireAuth: true,
                            relation: "RecipeBox"
                        }
                    },
                ]
            },
            {
                path: 'JobAddEmployee',
                name: 'JobAddEmployee',
                component: JobAddEmployee,
                meta: {
                    requireAuth: true,
                    relation: "LicenseManagement"
                }
            },
            {
                path: 'JobAddEmployeeTwo',
                name: 'JobAddEmployeeTwo',
                component: JobAddEmployeeTwo,
                meta: {
                    requireAuth: true,
                    relation: "LicenseManagement"
                }
            },
            {
                path: 'JobEmployDetails',
                name: 'JobEmployDetails',
                component: JobEmployDetails,
                meta: {
                    requireAuth: true,
                    relation: "LicenseManagement"
                }
            },
            {
                path: 'SupplierDetails',
                name: 'SupplierDetails',
                component: SupplierDetails,
                meta: {
                    requireAuth: true,
                    relation: "SupplierManagement"
                }
            },
            {
                path: 'ShopDetails',
                name: 'ShopDetails',
                component: ShopDetails,
                meta: {
                    requireAuth: true,
                    relation: "SupplierManagement"
                }
            },
            {
                path: 'CommodityDetails',
                name: 'CommodityDetails',
                component: CommodityDetails,
                meta: {
                    requireAuth: true,
                    relation: "SupplierManagement"
                }
            },
            {
                path: 'NutritionDiet',
                name: 'NutritionDiet',
                component: NutritionDiet,
                meta: {
                    requireAuth: true,
                    relation: "NutritionDiet"
                }
            },
            {
                path: 'WeeklyRecipes',
                name: 'WeeklyRecipes',
                component: WeeklyRecipes,
                meta: {
                    requireAuth: true,
                    relation: "WeeklyRecipes"
                }
            },
            {
                path: 'RecommendedRecipes',
                name: 'RecommendedRecipes',
                component: RecommendedRecipes,
                meta: {
                    requireAuth: true,
                    relation: "WeeklyRecipes"
                }
            },
            {
                path: 'RecipeDetails',
                name: 'RecipeDetails',
                component: RecipeDetails,
                meta: {
                    requireAuth: true,
                    relation: "WeeklyRecipes"
                }
            },
            {
                path: 'ViewRecipes',
                name: 'ViewRecipes',
                component: ViewRecipes,
                meta: {
                    requireAuth: true,
                    relation: "WeeklyRecipes"
                }
            },
            {
                path: 'CreateDishes',
                name: 'CreateDishes',
                component: CreateDishes,
                meta: {
                    requireAuth: true,
                    relation: "NutritionDiet"
                }
            },
            {
                path: 'CreateRecipes',
                name: 'CreateRecipes',
                component: CreateRecipes,
                meta: {
                    requireAuth: true,
                    relation: "WeeklyRecipes"
                }
            },
            {
                path: 'AddDishes',
                name: 'AddDishes',
                component: AddDishes,
                meta: {
                    requireAuth: true,
                    relation: "WeeklyRecipes"
                }
            },
            {
                path: 'FoodConsumption',
                name: 'FoodConsumption',
                component: FoodConsumption,
                redirect: "/ManagementPanel/FoodConsumption/BePrepared",
                children: [{
                        path: 'BePrepared',
                        name: 'BePrepared',
                        component: BePrepared,
                        meta: {
                            requireAuth: true,
                            relation: "FoodConsumption"
                        }
                    },
                    {
                        path: 'Compiled',
                        name: 'Compiled',
                        component: Compiled,
                        meta: {
                            requireAuth: true,
                            relation: "FoodConsumption"
                        }
                    },
                ]
            },
            {
                path: 'BudgetTable',
                name: 'BudgetTable',
                component: BudgetTable,
                meta: {
                    requireAuth: true,
                    relation: "FoodConsumption"
                }
            },
            {
                path: 'UserManagement',
                name: 'UserManagement',
                component: UserManagement,
                meta: {
                    requireAuth: true,
                    relation: "UserManagement"
                }
            },
            {
                path: 'AuthorityManagement',
                name: 'AuthorityManagement',
                component: AuthorityManagement,
                meta: {
                    requireAuth: true,
                    relation: "AuthorityManagement"
                }
            },
            {
                path: 'AddUser',
                name: 'AddUser',
                component: AddUser,
                meta: {
                    requireAuth: true,
                    relation: "UserManagement"
                }
            },
            {
                path: 'lookDetails',
                name: 'lookDetails',
                component: lookDetails,
                meta: {
                    requireAuth: true,
                    relation: "UserManagement"
                }
            },
            {
                path: 'AddPosition',
                name: 'AddPosition',
                component: AddPosition,
                meta: {
                    requireAuth: true,
                    relation: "AuthorityManagement"
                }
            },
            {
                path: 'AuthDetails',
                name: 'AuthDetails',
                component: AuthDetails,
                meta: {
                    requireAuth: true,
                    relation: "AuthorityManagement"
                }
            },
            {
                path: '/FirstLogin',
                name: 'FirstLogin',
                component: FirstLogin,
                meta: {
                    requireAuth: true,
                    relation: "noSide"
                }
            },
            //采购管理和出入库管理
            ...order,
            //工作管理模块
            ...workManagement,
            //明厨亮灶模块
            ...BrightKitchen
        ]
    }
]