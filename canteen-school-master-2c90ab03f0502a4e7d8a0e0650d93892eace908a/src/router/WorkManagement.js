import InformationReporting from '@/pages/WorkManagement/InformationReporting';
//信息上报
import Disclosure from '@/pages/WorkManagement/InformationReporting/disclosure';           //信息公开
import DisclosureNewInformation from '@/pages/WorkManagement/InformationReporting/disclosure/NewInformation';           //信息公开
import DisclosureLookDetails from '@/pages/WorkManagement/InformationReporting/disclosure/lookDetails';           //信息详情
import t_WorkRecord from '@/pages/WorkManagement/InformationReporting/WorkRecord';           //工作记录
import t_addWork from '@/pages/WorkManagement/InformationReporting/WorkRecord/addWork';           //工作记录-新增修改
import t_workDetails from '@/pages/WorkManagement/InformationReporting/WorkRecord/workDetails';           //工作记录-详情
import t_BusinessPlan from '@/pages/WorkManagement/InformationReporting/BusinessPlan';           //营改计划
import t_ReportForm from '@/pages/WorkManagement/InformationReporting/BusinessPlan/reportForm';           //营改计划-报表
import t_ImprovementPlan from '@/pages/WorkManagement/InformationReporting/BusinessPlan/ImprovementPlan';           //营改计划-改善计划
import t_planOne from '@/pages/WorkManagement/InformationReporting/BusinessPlan/planOne';           //营改计划-添加改善计划步骤1
import t_planTwo from '@/pages/WorkManagement/InformationReporting/BusinessPlan/planTwo';           //营改计划-添加改善计划步骤2
import t_planThree from '@/pages/WorkManagement/InformationReporting/BusinessPlan/planThree';           //营改计划-添加改善计划步骤3
import t_businessReform from '@/pages/WorkManagement/InformationReporting/BusinessPlan/businessReform';           //营改月报表-填写营改报表
import t_businessDetails from '@/pages/WorkManagement/InformationReporting/BusinessPlan/businessDetails';           //营改月报表-查看

import t_BookSubscription from '@/pages/WorkManagement/InformationReporting/BookSubscription';           //作业本征订-新增编辑
import t_BookSubDetails from '@/pages/WorkManagement/InformationReporting/BookSubDetails';           //作业本征订-详情
import t_BookSubIndex from '@/pages/WorkManagement/InformationReporting/BookSubIndex';           //作业本征订

import t_BasicAdd from '@/pages/WorkManagement/InformationReporting/BasicInformation/BasicAdd';           //学校基本情况-填写
import t_BasicInformation from '@/pages/WorkManagement/InformationReporting/BasicInformation';           //学校基本情况
import t_BasicDetails from '@/pages/WorkManagement/InformationReporting/BasicInformation/BasicDetails';           //学校基本情况-查看


import t_CanteenOrganization from '@/pages/WorkManagement/InformationReporting/CanteenOrganization';           //食堂组织机构
import t_FillManager from '@/pages/WorkManagement/InformationReporting/CanteenOrganization/FillManager';           //食堂组织机构--食堂管理人员填写
import t_OtherPersonnel from '@/pages/WorkManagement/InformationReporting/CanteenOrganization/OtherPersonnel';           //食堂组织机构--其他人员填写
import t_CanteenDetails from '@/pages/WorkManagement/InformationReporting/CanteenOrganization/CanteenDetails';           //食堂组织机构--查看

import t_ImprovementDetails from '@/pages/WorkManagement/InformationReporting/BusinessPlan/ImprovementDetails';           //营养改善计划-改善详情
import t_noenjoyList from '@/pages/WorkManagement/InformationReporting/BusinessPlan/ImprovementDetails/noenjoyList';           //营养改善计划-改善详情-不享受列表
import t_enjoyList from '@/pages/WorkManagement/InformationReporting/BusinessPlan/ImprovementDetails/enjoyList';           //营养改善计划-改善详情-享受列表


import t_SystemConstruction from '@/pages/WorkManagement/InformationReporting/SystemConstruction';           //制度建设

import t_LicenseManagement from '@/pages/WorkManagement/InformationReporting/LicenseManagement';           //许可管理
import t_LicenseAdd from '@/pages/WorkManagement/InformationReporting/LicenseManagement/LicenseAdd';           //许可管理-增加编辑

import t_SiteManagement from '@/pages/WorkManagement/InformationReporting/SiteManagement';           //场所管理
import t_SiteManageAdd from '@/pages/WorkManagement/InformationReporting/SiteManagement/SiteManageAdd';           //场所管理-新增编辑
import t_SiteManageDetails from '@/pages/WorkManagement/InformationReporting/SiteManagement/SiteManageDetails';           //场所管理-详情

import t_LaborPersonnel from '@/pages/WorkManagement/InformationReporting/LaborPersonnel';           //劳务人员管理
import t_LaborAdd from '@/pages/WorkManagement/InformationReporting/LaborPersonnel/LaborAdd';           //劳务人员管理--新增编辑
import t_LaborDetails from '@/pages/WorkManagement/InformationReporting/LaborPersonnel/LaborDetails';           //劳务人员管理--详情

import t_DesignatedSupplier from '@/pages/WorkManagement/InformationReporting/DesignatedSupplier';           //定点供应商


import t_ChargeManagement from '@/pages/WorkManagement/InformationReporting/ChargeManagement';           //收费管理
import t_ChargeAdd from '@/pages/WorkManagement/InformationReporting/ChargeManagement/chargeAdd';           //收费管理-新增
import t_ChargeDetails from '@/pages/WorkManagement/InformationReporting/ChargeManagement/chargeDetails';           //收费管理-详情

import t_DormitoryManagement from '@/pages/WorkManagement/InformationReporting/DormitoryManagement';           //寝室管理
import t_DormiAdd from '@/pages/WorkManagement/InformationReporting/DormitoryManagement/DormiAdd';           //寝室管理-新增编辑
import t_DormiDetails from '@/pages/WorkManagement/InformationReporting/DormitoryManagement/DormiDetails';           //寝室管理-详情

import t_OvertimeManagement from '@/pages/WorkManagement/InformationReporting/OvertimeManagement';           //超市管理
import t_OverTimeAdd from '@/pages/WorkManagement/InformationReporting/OvertimeManagement/OverTimeAdd';           //超市管理-新增编辑
import t_OverTimeDetails from '@/pages/WorkManagement/InformationReporting/OvertimeManagement/OverTimeDetails';           //超市管理-详情

import t_DrinkingWater from '@/pages/WorkManagement/InformationReporting/DrinkingWater';           //直饮水管理
import t_WaterAdd from '@/pages/WorkManagement/InformationReporting/DrinkingWater/WaterAdd';           //直饮水管理-新增编辑
import t_WaterDetails from '@/pages/WorkManagement/InformationReporting/DrinkingWater/WaterDetails';           //直饮水管理-详情


//预警通知
import t_WarningNotice from '@/pages/WorkManagement/WarningNotice';           //预警通知
import t_Untreated from '@/pages/WorkManagement/WarningNotice/Untreated';           //未处理
import t_WarDetails from '@/pages/WorkManagement/WarningNotice/warDetails';           //详情
import t_ProcessingRecords from '@/pages/WorkManagement/WarningNotice/ProcessingRecords';           //处理记录

//通知公告
import t_NoticeNotice from '@/pages/WorkManagement/NoticeNotice';           //通知公告tab
import t_NotificationCenter from '@/pages/WorkManagement/NoticeNotice/NotificationCenter';           //消息中心
import t_TwoCenter from '@/pages/WorkManagement/NoticeNotice/TwoCenter';           //通知中心
import t_NoticeDetails from '@/pages/WorkManagement/NoticeNotice/NotificationCenter/NoticeDetails';           //通知中心-通知详情
import t_SendRecord from '@/pages/WorkManagement/NoticeNotice/SendRecord';           //发送记录
import t_RecordDetails from '@/pages/WorkManagement/NoticeNotice/SendRecord/RecordDetails';           //发送记录-查看详情
import t_SendNotification from '@/pages/WorkManagement/NoticeNotice/SendNotification';           //发送通知
import t_CationSuccss from '@/pages/WorkManagement/NoticeNotice/SendNotification/cationSuccss';           //发送通知-发送成功

//业务培训
import t_BusinessTraining from '@/pages/WorkManagement/BusinessTraining';           //业务培训
import t_BusineDetails from '@/pages/WorkManagement/BusinessTraining/busineDetails';           //业务培训-详情

//问卷调查
import t_QuestionnaireInvestigation from '@/pages/WorkManagement/QuestionnaireInvestigation';           //问卷调查
import t_InvestigationDetails from '@/pages/WorkManagement/QuestionnaireInvestigation/InvestigationDetails';           //问卷调查-详情

//工作管理-支出结构报表
import t_ExpenditureStructure from '@/pages/WorkManagement/InformationReporting/ExpenditureStructure';           //支出结构报表
import t_ExpendiyureAdd from '@/pages/WorkManagement/InformationReporting/ExpenditureStructure/ExpendiyureAdd';           //支出结构报表-填写
import t_ExpenditruDetails from '@/pages/WorkManagement/InformationReporting/ExpenditureStructure/ExpenditruDetails';           //支出结构报表-查看
export default [
  {
    path: 'InformationReporting',
    name: 'InformationReporting',
    component: InformationReporting,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 'Disclosure',
    name: 'Disclosure',
    component: Disclosure,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 'DisclosureNewInformation',
    name: 'DisclosureNewInformation',
    component: DisclosureNewInformation,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 'DisclosureLookDetails',
    name: 'DisclosureLookDetails',
    component: DisclosureLookDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_WorkRecord',
    name: 't_WorkRecord',
    component: t_WorkRecord,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_addWork',
    name: 't_addWork',
    component: t_addWork,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_workDetails',
    name: 't_workDetails',
    component: t_workDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_BusinessPlan',
    name: 't_BusinessPlan',
    component: t_BusinessPlan,
    redirect: "/ManagementPanel/t_BusinessPlan/t_ImprovementPlan",
    children:[
      {
        path: 't_ImprovementPlan',
        name: 't_ImprovementPlan',
        component: t_ImprovementPlan,
        meta: {
          requireAuth: true,
          relation:"InformationReporting"
        }
      },
      {
        path: 't_ReportForm',
        name: 't_ReportForm',
        component: t_ReportForm,
        meta: {
          requireAuth: true,
          relation:"InformationReporting"
        }
      },
    ]
  },
  {       //改善详情
    path: 't_ImprovementDetails',
    name: 't_ImprovementDetails',
    component: t_ImprovementDetails,
    redirect: "/ManagementPanel/t_ImprovementDetails/t_enjoyList",
    children:[
      {
        path: 't_enjoyList',
        name: 't_enjoyList',
        component: t_enjoyList,
        meta: {
          requireAuth: true,
          relation:"InformationReporting"
        }
      },
      {
        path: 't_noenjoyList',
        name: 't_noenjoyList',
        component: t_noenjoyList,
        meta: {
          requireAuth: true,
          relation:"InformationReporting"
        }
      },
    ]
  },
  {
    path: 't_planOne',
    name: 't_planOne',
    component: t_planOne,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_planTwo',
    name: 't_planTwo',
    component: t_planTwo,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_planThree',
    name: 't_planThree',
    component: t_planThree,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_businessReform',
    name: 't_businessReform',
    component: t_businessReform,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_businessDetails',
    name: 't_businessDetails',
    component: t_businessDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_BookSubscription',
    name: 't_BookSubscription',
    component: t_BookSubscription,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_BookSubIndex',
    name: 't_BookSubIndex',
    component: t_BookSubIndex,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_BookSubDetails',
    name: 't_BookSubDetails',
    component: t_BookSubDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_BasicAdd',
    name: 't_BasicAdd',
    component: t_BasicAdd,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_BasicInformation',
    name: 't_BasicInformation',
    component: t_BasicInformation,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_BasicDetails',
    name: 't_BasicDetails',
    component: t_BasicDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_SystemConstruction',
    name: 't_SystemConstruction',
    component: t_SystemConstruction,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_LicenseManagement',
    name: 't_LicenseManagement',
    component: t_LicenseManagement,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_LicenseAdd',
    name: 't_LicenseAdd',
    component: t_LicenseAdd,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_SiteManagement',
    name: 't_SiteManagement',
    component: t_SiteManagement,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_SiteManageAdd',
    name: 't_SiteManageAdd',
    component: t_SiteManageAdd,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_SiteManageDetails',
    name: 't_SiteManageDetails',
    component: t_SiteManageDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_DesignatedSupplier',
    name: 't_DesignatedSupplier',
    component: t_DesignatedSupplier,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_ChargeManagement',
    name: 't_ChargeManagement',
    component: t_ChargeManagement,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_ChargeAdd',
    name: 't_ChargeAdd',
    component: t_ChargeAdd,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_ChargeDetails',
    name: 't_ChargeDetails',
    component: t_ChargeDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_DormitoryManagement',
    name: 't_DormitoryManagement',
    component: t_DormitoryManagement,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_DormiAdd',
    name: 't_DormiAdd',
    component: t_DormiAdd,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_DormiDetails',
    name: 't_DormiDetails',
    component: t_DormiDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_FillManager',
    name: 't_FillManager',
    component: t_FillManager,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_OtherPersonnel',
    name: 't_OtherPersonnel',
    component: t_OtherPersonnel,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_CanteenDetails',
    name: 't_CanteenDetails',
    component: t_CanteenDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_CanteenOrganization',
    name: 't_CanteenOrganization',
    component: t_CanteenOrganization,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_LaborPersonnel',
    name: 't_LaborPersonnel',
    component: t_LaborPersonnel,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_LaborAdd',
    name: 't_LaborAdd',
    component: t_LaborAdd,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_LaborDetails',
    name: 't_LaborDetails',
    component: t_LaborDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_OvertimeManagement',
    name: 't_OvertimeManagement',
    component: t_OvertimeManagement,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_OverTimeAdd',
    name: 't_OverTimeAdd',
    component: t_OverTimeAdd,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_OverTimeDetails',
    name: 't_OverTimeDetails',
    component: t_OverTimeDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_DrinkingWater',
    name: 't_DrinkingWater',
    component: t_DrinkingWater,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_WaterAdd',
    name: 't_WaterAdd',
    component: t_WaterAdd,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_WaterDetails',
    name: 't_WaterDetails',
    component: t_WaterDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_WarningNotice',
    name: 't_WarningNotice',
    component: t_WarningNotice,
    redirect: "/ManagementPanel/t_WarningNotice/t_Untreated",
    children:[
      {
        path: 't_Untreated',
        name: 't_Untreated',
        component: t_Untreated,
        meta: {
          requireAuth: true,
          relation:"t_WarningNotice"
        }
      },
      {
        path: 't_ProcessingRecords',
        name: 't_ProcessingRecords',
        component: t_ProcessingRecords,
        meta: {
          requireAuth: true,
          relation:"t_WarningNotice"
        }
      },
    ]
  },
  {
    path: 't_WarDetails',
    name: 't_WarDetails',
    component: t_WarDetails,
    meta: {
      requireAuth: true,
      relation:"t_WarningNotice"
    },
  },
  {
    path: 't_NoticeDetails',
    name: 't_NoticeDetails',
    component: t_NoticeDetails,
    meta: {
      requireAuth: true,
      relation:"t_NoticeNotice"
    }
  },
  {
    path: 't_RecordDetails',
    name: 't_RecordDetails',
    component: t_RecordDetails,
    meta: {
      requireAuth: true,
      relation:"t_NoticeNotice"
    }
  },
  {
    path: 't_CationSuccss',
    name: 't_CationSuccss',
    component: t_CationSuccss,
    meta: {
      requireAuth: true,
      relation:"t_NoticeNotice"
    }
  },
  {
    path: 't_NoticeNotice',
    name: 't_NoticeNotice',
    component: t_NoticeNotice,
    redirect: "/ManagementPanel/t_NoticeNotice/t_NotificationCenter",
    children:[
      {
        path: 't_NotificationCenter',
        name: 't_NotificationCenter',
        component: t_NotificationCenter,
        meta: {
          requireAuth: true,
          relation:"t_NoticeNotice"
        }
      },
      {
        path: 't_TwoCenter',
        name: 't_TwoCenter',
        component: t_TwoCenter,
        meta: {
          requireAuth: true,
          relation:"t_NoticeNotice"
        }
      },
      {
        path: 't_SendRecord',
        name: 't_SendRecord',
        component: t_SendRecord,
        meta: {
          requireAuth: true,
          relation:"t_NoticeNotice"
        }
      },
      {
        path: 't_SendNotification',
        name: 't_SendNotification',
        component: t_SendNotification,
        meta: {
          requireAuth: true,
          relation:"t_NoticeNotice"
        }
      }
    ]
  },
  {
    path: 't_BusinessTraining',
    name: 't_BusinessTraining',
    component: t_BusinessTraining,
    meta: {
      requireAuth: true,
      relation:"t_BusinessTraining"
    }
  },
  {
    path: 't_BusineDetails',
    name: 't_BusineDetails',
    component: t_BusineDetails,
    meta: {
      requireAuth: true,
      relation:"t_BusinessTraining"
    }
  },
  {
    path: 't_QuestionnaireInvestigation',
    name: 't_QuestionnaireInvestigation',
    component: t_QuestionnaireInvestigation,
    meta: {
      requireAuth: true,
      relation:"t_QuestionnaireInvestigation"
    }
  },
  {
    path: 't_InvestigationDetails',
    name: 't_InvestigationDetails',
    component: t_InvestigationDetails,
    meta: {
      requireAuth: true,
      relation:"t_QuestionnaireInvestigation"
    }
  },
  {
    path: 't_ExpenditureStructure',
    name: 't_ExpenditureStructure',
    component: t_ExpenditureStructure,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_ExpendiyureAdd',
    name: 't_ExpendiyureAdd',
    component: t_ExpendiyureAdd,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
  {
    path: 't_ExpenditruDetails',
    name: 't_ExpenditruDetails',
    component: t_ExpenditruDetails,
    meta: {
      requireAuth: true,
      relation:"InformationReporting"
    }
  },
]
