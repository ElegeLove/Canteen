import {
    Post,
    ExportFile
} from "./index"
import {
    data
} from "autoprefixer";


// 供应商查询
export function procurement_supplierList(data) {
    return Post('school/product/supplierData', data)
}

//获取周列表搜索参数
export function weekData(data) {
    return Post('school/recipes/getSearch', data)
}

/***
 *
 * 采购管理
 *
 */

// *************************** 采购管理 - 产品目录

//产品目录 -- 列表
export function procurement_proMenu_list(data) {
    return Post('api/product/productList', data);
}
//产品目录 -- 二级分类
export function procurement_proMenu_second(data) {
    return Post('api/product/productSonList', data);
}




//**************************** 采购管理 - 采购计划
//采购计划列表
export function procurement_plan_list(data) {
    return Post('school/procurement/procurementList', data)
}
//采购计划详情 -- 编写采购计划
export function procurement_plan_detail(type, data) {
    if (type == 'day') {
        return Post('school/procurement/purchaseByDayDetail', data)
    } else {
        return Post('school/procurement/procurementDetail', data)
    }
}
//编写采购计划
export function procurement_plan_update(data) {
    return Post('school/procurement/procurementUpdate', data)
}

//采购计划详情 -- 修改
export function procurement_plan_updateDetail(type, data) {
    if (type == 'day') {
        //采购管理 - 按天采购 - 详情列表
        return Post('school/procurement/purchaseByDayEditDetail', data)
            // return Post('school/procurement/purchaseByDayList', data)

    } else if (type == 'week') {
        //采购管理 - 按周采购 - 详情列表
        return Post('school/procurement/procurementEditDetail', data)
    }
}


//采购计划详情 -- 查看）
export function procurement_plan_detailInfo(type, data) {
    if (type == 'day') {
        //采购管理 - 按天采购 - 详情列表
        return Post('school/procurement/purchaseByDayEditDetail', data)
            // return Post('school/procurement/purchaseByDayDetail', data)

    } else if (type == 'week') {
        //采购管理 - 按周采购 - 详情列表
        return Post('school/procurement/procurementEditDetail', data)
    }
}

// 修改采购计划 -- 保存
export function procurement_plan_updateDetai_save(data) {
    return Post('school/procurement/procurementEdit', data)
}


//采购管理 - 按天采购 - 列表
export function procurement_plan_byDay(data) {
    return Post('school/procurement/purchaseByDayList', data)
}



//采购计划 --导出
export function procurement_plan_export(data) {
    return ExportFile('school/export/budgetExport', data)
}

export function procurement_plan_day_export(data) {
    return ExportFile('school/export/purchaseByDayList', data)
}


// *************************** 采购管理 - 订货下单

// ************* 订货下单 - 自选采购

//自选采购 -- 根据供应商获取所有类目
export function procurement_orderPro_bySelf_menu(data) {
    return Post('school/product/supplierProduct', data)
}

//自选采购 -- 供应商查询
export function procurement_orderPro_bySelf_supplierList(data) {
    return Post('school/product/supplierData', data)
}

//自选采购 -- 产品信息(列表)
export function procurement_orderPro_bySelf_list(data) {
    return Post('school/product/productList', data)
}

// --产品信息（详情）
export function production_detail(data) {
    return Post('supplier/product/productDetail', data)
}

// --产品详情 立即下单
export function production_detail_deal(data) {
    return Post('school/cart/settlementSingleInfo', data)
}
// --产品详情 立即下单 - 确认订单
export function production_detail_confirmOrder(data) {
    return Post('school/cart/settlementSingleOrder', data)
}





//加入购物车
export function addProToCart(data) {
    return Post('school/cart/cartAdd', data)
}
//从购物车里移除
export function deleteProFromCart(data) {
    return Post('school/cart/cartDel', data)
}
//购物车商品列表
export function cartProList() {
    return Post('school/cart/cartList')
}

//结算列表
export function bySelf_settlementList(data) {
    return Post('school/cart/settlementList', data)
}

//下单
export function makeDealFromSettlement(data) {
    return Post('school/cart/settlementOrder', data)
}


// ****************订货下单 - 按计划采购
// 列表
export function procurement_orderPro_byPlan_list(data) {
    return Post('school/procurement/procurementOrderList', data)
}
//按计划采购下单列表
export function procurement_orderPro_byPlan_deal_list(type, data) {
    if (type == 'day') {
        //日计划下单
        return Post('school/procurement/dailyPlanDetailList', { ids: data })
    } else {
        return Post('school/procurement/procurementSettlementList', { id: data })
    }
}
//按计划采购结算下单
export function procurement_orderPro_byPlan_make_deal(data) {
    return Post('school/procurement/procurementSettlementOrder', data)
}


//日计划下单  * 列表
export function procurement_orderPro_byPlan_deal_day_list(data) {
    return Post('school/procurement/dailyPlanList', data)
}

//日计划 --撤回
export function procurement_orderPro_byPlan_deal_day_cancel(data) {
    return Post('school/procurement/dailyPlanRevoke', data)
}





//******************** 订货单管理

//订货单列表
export function procurement_orderList(data) {
    return Post('school/procurement/orderList', data)
}
//订货单详情
export function procurement_orderDetail(data) {
    return Post('school/procurement/orderDetail', data)
}
//订货单撤回
export function procurement_orderCancel(data) {
    return Post('school/procurement/orderCancel', data)
}









/**
 *
 * 出入库管理
 *
 */
//入库方式
export function outAndIn_inMethod(data) {
    return Post('school/distribution/warehousingtype', data)
}
// 食材入库列表
export function outAndIn_inList(data) {
    return Post("school/distribution/warehousing", data)
}
// 非定点供应商--供应商列表
export function nonFixedList_supplier(data) {
    return Post("school/designated/search", data)
}
// 非定点供应商--列表
export function nonFixedList(data) {
    return Post("school/designated/lists", data)
}
// 非定点供应商--修改
export function updataNonFixedList(data) {
    return Post("school/designated/operation", data)
}
// 非定点供应商--删除
export function delNonFixedList(data) {
    return Post("school/designated/delete", data)
}

//食材入库记录
export function outAndIn_inRecord(data) {
    return Post('school/distribution/warehousingrecord', data)
}

//确认入库
export function outAndIn_inConfirm(data) {
    return Post('school/distribution/warehousingproduct', data)
}
//确认验收
export function outAndIn_confirmSubmit(data) {
    return Post('school/distribution/checkaccept', data)
}
//入库单
export function outAndIn_warrant(data) {
    return Post('school/distribution/warehousereceipt', data)
}
//导出入库单
export function outAndIn_warrant_export(data) {
    return ExportFile('school/distribution/warehousereceiptexportexcel', data)
}

//填写自购入库
export function outAndIn_addForm(data) {
    return Post('school/distribution/selfpurchase', data)
}
//自购入库--导出入库单
export function outAndIn_exportInForm(data) {
    return ExportFile('school/distribution/selfwarehousexportexcel', data)
}






//出库列表
export function outAndIn_outList(data) {
    return Post('school/distribution/warehouseOutProduct', data)
}
//按食谱出库
export function outAndIn_outByRecipe(data) {
    return Post('school/distribution/recipesOutProduct', data)
}
//需要出库的数据
export function outAndIn_outData(data) {
    return Post('school/Distribution/warehouseOut', data);
}

//按食材出库
export function outAndIn_outByTemporary(data) {
    return Post('school/distribution/warehouseOutProduct', data)
}
//盘存修正
export function inventoryCorrection(data) {
    return Post('school/Distribution/inventoryCorrection', data)
}
//出库(批量 / 单个)
export function outAndIn_outSingleItem(data, type) {
    //1:食谱出库  2：临时出库  3：入库即出库  4：盘亏出库
    return Post('school/Distribution/temporaryDelivery', {
        param: data,
        type: type
    })
}

//出库 - 导出盘存表
export function exportOutData(data) {
    return ExportFile('school/export/inventoryStatement', data)
}


//出库方式
export function outAndIn_outMethod(data) {
    return Post('school/distribution/warehouse_out_type', data)
}
//出库记录
export function outAndIn_outRecord(data) {
    return Post('school/distribution/warehouseoutrecord', data)
}
//出库记录详情
export function outAndIn_outRecord_detail(data) {
    return Post('school/distribution/warehouseoutrecorddetails', data)
}
//出库导出
export function outAndIn_outRecord_export(data) {
    return ExportFile('school/export/outboundOrder', data)
}



//进出库台账
export function bookList(data) {
    return Post('school/Distribution/standingBook', data)
}
//进出库台账详情
export function bookListDetail(data) {
    return Post('school/Distribution/accountDetails', data)
}
//进出库台账详情 -- 导出
export function bookListDetail_export(data) {
    console.log(data)
    return ExportFile('school/distribution/exportStandingBook', data)
}



//报表
//定点采购汇总
export function fixedPurchase(data) {
    return Post('school/Distribution/fixedPurchase', data)
}
//定点采购汇总 -- 打印单挑数据
export function fixedPurchase_export(data) {
    return ExportFile('school/distribution/exprotFixedPurchase', data)
}

//详情
export function fixedPurchaseDetails(data) {
    return Post('school/Distribution/fixedPurchaseDetails', data)
}

// 结存及采购计划统计
export function cashHandAndFixedPurchase(data) {
    return Post('school/Distribution/cashHandAndFixedPurchase', data)
}
//导出
export function cashHandAndFixedPurchase_export(data) {
    return ExportFile('school/distribution/exprotCashHandAndFixedPurchase', data)
}
//打印数据
export function cashHandAndFixedPurchase_Print(data) {
    return Post('school/distribution/cashHandAndFixedPurchasePrinting', data)
}
//进出库管理 - 自购入库供应商信息
export function DistributionSelfPurchaseSupplier(data) {
    return Post('school/distribution/selfPurchaseSupplier', data)
}
//结算管理 - 列表
export function SettlementLists(data) {
    return Post('school/settlement/lists', data)
}
//结算管理 - 发起结算
export function SettlementInitiate(data) {
    return Post('school/settlement/initiate', data)
}
//盘存 - 盘存列表数据
export function DistributionTakeInventoryList(data) {
    return Post('school/distribution/takeInventoryList', data)
}
//盘存 - 点击打印空盘存表
export function DstributionTakeInventory(data) {
    return Post('school/distribution/takeInventory', data)
}
//盘存 - 需要盘存修正的列表数据
export function DistributionTakeInventoryDataList(data) {
    return Post('school/distribution/takeInventoryDataList', data)
}
//盘存 - 批量盘存修正
export function DistributionBatchCorrectionInventory(data) {
    return Post('school/distribution/batchCorrectionInventory', data)
}
//盘存 - 删除盘存数据
export function DistributionTakeInventoryDelete(data) {
    return Post('school/distribution/takeInventoryDelete', data)
}
//盘存 - 打印盘存
export function DistributionTakeInventoryPrinting(data) {
    return Post('school/distribution/takeInventoryPrinting', data)
}