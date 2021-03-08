import ManagementPanel from '@/pages/managementPanel';
import InspectionPanel from '@/pages/inspectionPanel'; //巡查面板
import SchoolInformation from '@/pages/schoolInformation'; //供应商信息
import ScoolInfosss from '@/pages/ScoolInfosss'; //关联学校
import HistoricalInfo from '@/pages/ScoolInfosss/HistoricalInfo'; //历史关联信息
import ChangePhone from '@/pages/schoolInformation/changePhone'; //更换绑定手机
import OtherInformation from '@/pages/schoolInformation/OtherInformation'; //其他信息
import RelatedSchoolDetails from '@/pages/ScoolInfosss/relatedSchoolDetails'; //关联学校 

import AddAssociatedSchool from '@/pages/ScoolInfosss/addAssociatedSchool'; //关联学校
import BasicInformation from '@/pages/schoolInformation/BasicInformation'; // 基本信息
import ApplicationOne from '@/pages/scoolInfosss/ApplicationOne'; // 新增学校第一步
import ApplicationTwo from '@/pages/scoolInfosss/ApplicationTwo'; // 新增学校第二步
import ApplicationThere from '@/pages/scoolInfosss/ApplicationThere'; // 新增学校第三步


// 用户中心
import PersonalCenter from '@/pages/PersonalCenter/index'; //添加用户
import PersonalCenterChangeMobile from '@/pages/PersonalCenter/ChangeMobile'; //添加用户



// 产品管理
import ProductManagement from '@/pages/productManagement'; //产品管理
import ProductManagementList from '@/pages/ProductManagement/List'; //产品管理列表
import ProductManagementAdd from '@/pages/ProductManagement/Add'; //产品管理 新增==编辑
import ProductManagementDetails from '@/pages/ProductManagement/Details'; //产品管理 查看详情
import WarehouseManagement from '@/pages/ProductManagement/WarehouseManagement'; //产品管理 库房管理
import productList from '@/pages/ProductManagement/productList'; //产品目录
import productListDetails from '@/pages/ProductManagement/productListDetails'; //产品目录详情



// 订单管理 
import OrderManagement from '@/pages/OrderManagement';
import OrderManagementList from '@/pages/OrderManagement/List'; //订单管理列表
import OrderManagementDetails from '@/pages/OrderManagement/Details'; //详情
import OrderManagementFillDelivery from '@/pages/OrderManagement/FillDelivery'; //详情
import OrderSummary from '@/pages/OrderManagement/OrderSummary'; //订单汇总
import DeliveryRecord from '@/pages/OrderManagement/DeliveryRecord'; //配送记录


// 工作事项
import BusinessTraining from '@/pages/businessTraining'; //工作事项模块视图
import BusinessTrainingList from '@/pages/businessTraining/BusinessTrainingList'; //业务培训列表
import BusinessTrainingDetails from '@/pages/businessTraining/BusinessTrainingDetails'; //业务培训详情
import Announcement from '@/pages/businessTraining/Announcement'; //业务培训详情
import AnnouncementDetails from '@/pages/businessTraining/AnnouncementDetails'; //业务培训详情


// 权限管理
import AuthorityManagement from '@/pages/authorityManagement'; //权限管理 视图
import UserManagement from '@/pages/authorityManagement/UserManagement'; //用户管理 
import UserDetails from '@/pages/authorityManagement/userDetails'; //用户详情
import RoleManagement from '@/pages/authorityManagement/RoleManagement'; //角色权限
import UserRoleDetails from '@/pages/authorityManagement/UserRoleDetails'; //角色详情
import AddRole from '@/pages/authorityManagement/AddRole'; //添加角色
import AddUser from '@/pages/authorityManagement/AddUser'; //添加用户




export default [{
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
                path: 'PersonalCenter',
                name: 'PersonalCenter',
                component: PersonalCenter,
                meta: {
                    requireAuth: true,
                    relation: "PersonalCenter"
                }
            },
            {
                path: 'PersonalCenterChangeMobile',
                name: 'PersonalCenterChangeMobile',
                component: PersonalCenterChangeMobile,
                meta: {
                    requireAuth: true,
                    relation: "PersonalCenterChangeMobile"
                }
            },
            {
                path: 'RelatedSchoolDetails',
                name: 'RelatedSchoolDetails',
                component: RelatedSchoolDetails,
                meta: {
                    requireAuth: true,
                    relation: "RelatedSchoolDetails"
                }
            },
            {
                path: 'SchoolInformation',
                name: 'SchoolInformation',
                component: SchoolInformation,
                redirect: "/ManagementPanel/SchoolInformation/BasicInformation",
                children: [{
                        path: 'BasicInformation',
                        name: 'BasicInformation',
                        component: BasicInformation,
                        meta: {
                            requireAuth: true,
                            relation: "BasicInformation"
                        }
                    },
                    {
                        path: 'OtherInformation',
                        name: 'OtherInformation',
                        component: OtherInformation,
                        meta: {
                            requireAuth: true,
                            relation: "OtherInformation"
                        }
                    }
                ]
            },
            {
                path: 'ScoolInfosss',
                name: 'ScoolInfosss',
                component: ScoolInfosss,
                meta: {
                    requireAuth: true,
                    relation: "ScoolInfosss"
                }
            },
            {
                path: 'HistoricalInfo',
                name: 'HistoricalInfo',
                component: HistoricalInfo,
                meta: {
                    requireAuth: true,
                    relation: "HistoricalInfo"
                }
            },
            {
                path: 'ChangePhone',
                name: 'ChangePhone',
                component: ChangePhone,
                meta: {
                    requireAuth: true,
                    relation: "ChangePhone"
                }
            },
            {
                path: 'AddAssociatedSchool',
                name: 'AddAssociatedSchool',
                component: AddAssociatedSchool,
                redirect: "/ManagementPanel/AddAssociatedSchool/ApplicationOne",
                children: [{
                        path: 'ApplicationOne',
                        name: 'ApplicationOne',
                        component: ApplicationOne,
                        meta: {
                            requireAuth: true,
                            relation: "ApplicationOne"
                        }
                    },
                    {
                        path: 'ApplicationTwo',
                        name: 'ApplicationTwo',
                        component: ApplicationTwo,
                        meta: {
                            requireAuth: true,
                            relation: "ApplicationTwo"
                        }
                    },
                    {
                        path: 'ApplicationThere',
                        name: 'ApplicationThere',
                        component: ApplicationThere,
                        meta: {
                            requireAuth: true,
                            relation: "ApplicationThere"
                        }
                    }
                ]
            }
        ]
    },

    {
        path: '/ProductManagement',
        name: 'ProductManagement',
        component: ProductManagement,
        redirect: "/ManagementPanel/InspectionPanel",
        children: [{
                path: 'ProductManagementList',
                name: 'ProductManagementList',
                component: ProductManagementList,
                meta: {
                    requireAuth: true,
                    relation: "ProductManagementList"
                }
            },
            {
                path: 'productList',
                name: 'productList',
                component: productList,
                meta: {
                    requireAuth: true,
                    relation: "productList"
                }
            },
            {
                path: 'productListDetails',
                name: 'productListDetails',
                component: productListDetails,
                meta: {
                    requireAuth: true,
                    relation: "productListDetails"
                }
            },
            {
                path: 'ProductManagementAdd',
                name: 'ProductManagementAdd',
                component: ProductManagementAdd,
                meta: {
                    requireAuth: true,
                    relation: "ProductManagementAdd"
                }
            },
            {
                path: 'ProductManagementDetails',
                name: 'ProductManagementDetails',
                component: ProductManagementDetails,
                meta: {
                    requireAuth: true,
                    relation: "ProductManagementDetails"
                }
            },
            {
                path: 'WarehouseManagement',
                name: 'WarehouseManagement',
                component: WarehouseManagement,
                meta: {
                    requireAuth: true,
                    relation: "WarehouseManagement"
                }
            }
        ]
    },
    {
        path: '/OrderManagement',
        name: 'OrderManagement',
        component: OrderManagement,
        redirect: "/OrderManagement/index",
        children: [{
                path: 'OrderManagementList',
                name: 'OrderManagementList',
                component: OrderManagementList,
                meta: {
                    requireAuth: true,
                    relation: "OrderManagementList"
                }
            },
            {
                path: 'OrderManagementDetails',
                name: 'OrderManagementDetails',
                component: OrderManagementDetails,
                meta: {
                    requireAuth: true,
                    relation: "OrderManagementDetails"
                }
            },
            {
                path: 'OrderManagementFillDelivery',
                name: 'OrderManagementFillDelivery',
                component: OrderManagementFillDelivery,
                meta: {
                    requireAuth: true,
                    relation: "OrderManagementFillDelivery"
                }
            },
            {
                path: 'OrderSummary',
                name: 'OrderSummary',
                component: OrderSummary,
                meta: {
                    requireAuth: true,
                    relation: "OrderSummary"
                }
            },
            {
                path: 'DeliveryRecord',
                name: 'DeliveryRecord',
                component: DeliveryRecord,
                meta: {
                    requireAuth: true,
                    relation: "DeliveryRecord"
                }
            }
        ]
    },
    {
        path: '/BusinessTraining',
        name: 'BusinessTraining',
        component: BusinessTraining,
        redirect: "/BusinessTraining/index",
        children: [{
                path: 'BusinessTrainingList',
                name: 'BusinessTrainingList',
                component: BusinessTrainingList,
                meta: {
                    requireAuth: true,
                    relation: "BusinessTrainingList"
                }
            },
            {
                path: 'BusinessTrainingDetails',
                name: 'BusinessTrainingDetails',
                component: BusinessTrainingDetails,
                meta: {
                    requireAuth: true,
                    relation: "BusinessTrainingDetails"
                }
            },
            {
                path: 'Announcement',
                name: 'Announcement',
                component: Announcement,
                meta: {
                    requireAuth: true,
                    relation: "Announcement"
                }
            },
            {
                path: 'AnnouncementDetails',
                name: 'AnnouncementDetails',
                component: AnnouncementDetails,
                meta: {
                    requireAuth: true,
                    relation: "AnnouncementDetails"
                }
            }
        ]
    },
    {
        path: '/AuthorityManagement',
        name: 'AuthorityManagement',
        component: AuthorityManagement,
        redirect: "/AuthorityManagement/index",
        children: [{
                path: 'UserManagement',
                name: 'UserManagement',
                component: UserManagement,
                meta: {
                    requireAuth: true,
                    relation: "UserManagement"
                }
            },
            {
                path: 'UserDetails',
                name: 'UserDetails',
                component: UserDetails,
                meta: {
                    requireAuth: true,
                    relation: "UserDetails"
                }
            },
            {
                path: 'RoleManagement',
                name: 'RoleManagement',
                component: RoleManagement,
                meta: {
                    requireAuth: true,
                    relation: "RoleManagement"
                }
            },
            {
                path: 'UserRoleDetails',
                name: 'UserRoleDetails',
                component: UserRoleDetails,
                meta: {
                    requireAuth: true,
                    relation: "UserRoleDetails"
                }
            },
            {
                path: 'AddRole',
                name: 'AddRole',
                component: AddRole,
                meta: {
                    requireAuth: true,
                    relation: "AddRole"
                }
            },
            {
                path: 'AddUser',
                name: 'AddUser',
                component: AddUser,
                meta: {
                    requireAuth: true,
                    relation: "AddUser"
                }
            }
        ]
    },
]