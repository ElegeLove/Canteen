import {Post,ExportFile} from "./index"

//工作管理模块
//工作管理——获取月列表搜素参数
const RecipesGetSearchMonth = params => {
    return Post('school/recipes/getSearchMonth',params)
};
//工作管理——工作记录列表
const InfoRecordList = params => {
    return Post('school/info/recordList',params)
};
//工作管理——工作记录的添加或编辑
const InfoRecordAddUpdate = params => {
    return Post('school/info/recordAddUpdate',params)
};
//工作管理——工作记录的详情
const InfoRecordDetail = params => {
    return Post('school/info/recordDetail',params)
};
//工作记录——删除工作记录
const InfoRecordDel = params => {
    return Post('school/info/recordDel',params)
};
//工作管理——信息公告列表
const InfoInformationList = params => {
    return Post('school/info/informationList',params)
};
//工作管理——信息公告的添加或编辑
const InfoInformationAddUpdate = params => {
    return Post('school/info/informationAddUpdate',params)
};
//工作管理——信息公告的详情
const InfoInformationDetail = params => {
    return Post('school/info/informationDetail',params)
};
//工作管理——信息公告-删除
const InfoInformationDel = params => {
    return Post('school/info/informationDel',params)
};
//工作管理——学校基本情况报表列表
const InfoSchoolList = params => {
    return Post('school/info/schoolList',params)
};
//工作管理——学校基本情况报表详情
const InfoCanteenGroupDetail = params => {
    return Post('school/info/canteenGroupDetail',params)
};
//工作管理——定点供应商列表
const InfoSupplierinfo = params => {
    return Post('school/info/supplierinfo',params)
};
//工作管理——超市管理列表
const infoSupermarketlist = params => {
    return Post('school/info/supermarketlist',params)
};
//工作管理——更新超市信息
const InfoSupermarketupdate = params => {
    return Post('school/info/supermarketupdate',params)
};
//工作管理——超市管理详情
const InfoSupermarketInfo = params => {
    return Post('school/info/supermarketInfo',params)
};
//工作管理——直饮水管理列表
const InfoWaterList = params => {
    return Post('school/info/waterList',params)
};
//工作管理——更新直饮水信息
const InfoWaterUpdate = params => {
    return Post('school/info/waterUpdate',params)
};
//工作管理——直饮水管理详情
const InfoWaterInfo = params => {
    return Post('school/info/waterInfo',params)
};
//工作管理——寝室管理列表
const InfoRoomList = params => {
    return Post('school/info/roomList',params)
};
//工作管理——更新寝室管理信息
const InfoRoomupdate = params => {
    return Post('school/info/roomupdate',params)
};
//工作管理——寝室管理信息详情
const InfoRoominfo = params => {
    return Post('school/info/roominfo',params)
};
//工作管理——作业本征订列表
const InfoBookList = params => {
    return Post('school/info/bookList',params)
};
//工作管理——更新作业本征订信息
const InfoBookUpdate = params => {
    return Post('school/info/bookUpdate',params)
};
//工作管理——作业本征订信息详情
const InfoBookInfo = params => {
    return Post('school/info/bookInfo',params)
};
//工作管理——场所管理列表
const InfoPlaceList = params => {
    return Post('school/info/placeList',params)
};
//工作管理——更新场所管理信息
const InfoPlaceUpdate = params => {
    return Post('school/info/placeUpdate',params)
};
//工作管理——场所管理详情
const InfoPlaceInfo = params => {
    return Post('school/info/placeInfo',params)
};
//工作管理——劳务人员管理列表
const InfoLabourList = params => {
    return Post('school/info/labourList',params)
};
//工作管理——劳务人员管理信息
const InfoLabourInfo = params => {
    return Post('school/info/labourInfo',params)
};
//工作管理——更新劳务人员信息
const InfoLabourUpdate = params => {
    return Post('school/info/labourUpdate',params)
};
//工作管理——许可管理列表
const InfoCanteenList = params => {
    return Post('school/info/canteenList',params)
};
//工作管理 - 信息上报首页
const InformationIndex = params => {
    return Post('school/information/index',params)
};
//工作管理 - 收费管理 - 列表
const InformationChargeList = params => {
    return Post('school/information/chargeList',params)
};
//获取下载模板
const CommonDownloadTemplate = params => {
    return Post('school/common/downloadTemplate',params)
};
//工作管理 - 收费管理 - 填写
const InformationChargeAdd = params => {
    return Post('school/information/chargeAdd',params)
};
//工作管理 - 收费管理 - 查看
const InformationChargeDetails = params => {
    return Post('school/information/chargeDetails',params)
};

//制度建设列表
const InfoConstructionList = params => {
    return Post('school/info/constructionList',params)
};
//工作管理——制度建设管理信息
const InfoConstructionInfo = params => {
    return Post('school/info/constructionInfo',params)
};
//工作管理——更新制度建设管理信息
const InfoConstructionUpdate = params => {
    return Post('school/info/constructionUpdate',params)
};
//工作管理 - 营改月报表 - 列表
const InformationNutritionMonthList = params => {
    return Post('school/information/nutritionMonthList',params)
};
//工作管理 - 营改月报表 - 上报
const InformationNutritionMonth = params => {
    return Post('school/information/nutritionMonth',params)
};
//工作管理 - 营改花名册 - 列表
const InformationBusinessReformUserList = params => {
    return Post('school/information/businessReformUserList',params)
};
//工作管理 - 营改花名册 - 保存上传文件
const InformationBusinessReformUser = params => {
    return Post('school/information/businessReformUser',params)
};
//工作管理 - 营改花名册 - 享受营改计划名单列表
const InformationBusinessReformEnjoyUser = params => {
    return Post('school/information/businessReformEnjoyUser',params)
};
//工作管理 - 营改花名册 - 不享受营改计划名单列表
const InformationBusinessReformNotEnjoyUser = params => {
    return Post('school/information/businessReformNotEnjoyUser',params)
};
//工作管理 - 营改花名册 - 上传自愿申请书
const InformationBusinessReformVoluntaryApplication = params => {
    return Post('school/information/businessReformVoluntaryApplication',params)
};
//工作管理 - 预警通知 - 获取类型
const WarningGetType = params => {
    return Post('school/warning/getType',params)
};
//工作管理 - 预警通知 - 列表
const WarningLists = params => {
    return Post('school/warning/lists',params)
};
//工作管理 - 预警通知 - 查看详情
const WarningDetails = params => {
    return Post('school/warning/details',params)
};
//工作管理 - 预警通知 - 处理预警
const WarningHandle = params => {
    return Post('school/warning/handle',params)
};
//工作管理——业务培训列表
const BusinessBusinessList = params => {
    return Post('school/business/businessList',params)
};
//工作管理——业务培训详情
const BusinessBusinessDetail = params => {
    return Post('school/business/businessDetail',params)
};
//工作管理——问卷调查列表
const QuestionnaireQuestionnaireList = params => {
    return Post('school/questionnaire/questionnaireList',params)
};
//工作管理——问卷调查详情
const QuestionnaireQuestionnaireDetail = params => {
    return Post('school/questionnaire/questionnaireDetail',params)
};
//工作管理——上传已经填写好的问卷
const QuestionnaireQuestionnaireFeedback = params => {
    return Post('school/questionnaire/questionnaireFeedback',params)
};
//工作管理——通知中心-列表
const MessageNoticeCenterList = params => {
    return Post('school/message/noticeCenterList',params)
};
//工作管理 - 消息中心 - 批量已读
const MessageReadAll = params => {
    return Post('school/message/readAll',params)
};
//工作管理 - 消息中心 - 批量删除
const MessageDeleteAll = params => {
    return Post('school/message/deleteAll',params)
};
//工作管理 - 消息中心 - 详情
const MessageDetails = params => {
    return Post('school/message/details',params)
};
//工作管理 - 通知中心 - 列表
const NoticeNoticeCenterList = params => {
    return Post('school/notice/noticeCenterList',params)
};
//工作管理 - 发送通知 - 批量删除
const NoticeNoticeDelete = params => {
    return Post('school/notice/noticeDelete',params)
};
//工作管理 - 通知中心/发送记录 - 详情
const NoticeDetails = params => {
    return Post('school/notice/details',params)
};
//工作管理——发送通知（添加和编辑）
const NoticeNoticeSend = params => {
    return Post('school/notice/noticeSend',params)
};
//工作管理——发送记录列表
const NoticeNoticeRecordList = params => {
    return Post('school/notice/noticeRecordList',params)
};

//头部消息列表
const MessageIndex = params => {
    return Post('school/message/index',params)
};
//头部预警列表
const WarningIndex = params => {
    return Post('school/warning/index',params)
};
//工作管理 - 支出结构分析表 - 列表
const InformationExpenditureList = params => {
    return Post('school/information/expenditureList',params)
};
//工作管理 - 支出结构分析表 - 添加
const InformationExpenditure = params => {
    return Post('school/information/expenditure',params)
};
//工作管理 - 支出结构分析表 - 详情
const InformationExpenditureDetails = params => {
    return Post('school/information/expenditureDetails',params)
};

//工作记录类型
const CommonWorkType = params => {
    return Post('api/common/workType',params)
};
export default{
  InfoRecordList,
  RecipesGetSearchMonth,
  InfoRecordAddUpdate,
  InfoRecordDetail,
  InfoRecordDel,
  InfoInformationList,
  InfoInformationAddUpdate,
  InfoInformationDetail,
  InfoInformationDel,
  InfoSchoolList,
  InfoCanteenGroupDetail,
  InfoSupplierinfo,
  infoSupermarketlist,
  InfoSupermarketupdate,
  InfoSupermarketInfo,
  InfoWaterList,
  InfoWaterUpdate,
  InfoWaterInfo,
  InfoRoomList,
  InfoRoomupdate,
  InfoRoominfo,
  InfoBookList,
  InfoBookUpdate,
  InfoBookInfo,
  InfoPlaceList,
  InfoPlaceUpdate,
  InfoPlaceInfo,
  InfoLabourList,
  InfoLabourInfo,
  InfoLabourUpdate,
  InfoCanteenList,
  InfoConstructionList,
  InfoConstructionInfo,
  InfoConstructionUpdate,
  InformationIndex,
  InformationChargeList,
  CommonDownloadTemplate,
  InformationChargeAdd,
  InformationChargeDetails,
  InformationNutritionMonthList,
  InformationNutritionMonth,
  InformationBusinessReformUserList,
  InformationBusinessReformUser,
  InformationBusinessReformNotEnjoyUser,
  InformationBusinessReformEnjoyUser,
  BusinessBusinessList,
  BusinessBusinessDetail,
  WarningLists,
  QuestionnaireQuestionnaireList,
  QuestionnaireQuestionnaireDetail,
  QuestionnaireQuestionnaireFeedback,
  InformationBusinessReformVoluntaryApplication,
  WarningGetType,
  WarningDetails,
  MessageNoticeCenterList,
  NoticeNoticeRecordList,
  WarningHandle,
  MessageReadAll,
  MessageDeleteAll,
  MessageDetails,
  NoticeNoticeSend,
  NoticeNoticeCenterList,
  NoticeNoticeDelete,
  NoticeDetails,
  MessageIndex,
  WarningIndex,
  InformationExpenditureList,
  InformationExpenditure,
  InformationExpenditureDetails,
  CommonWorkType
}
