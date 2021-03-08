<template>
  <!-- 打印 -->
  <div class="printTable" id="printTable">
      <table class="table top_tabs" cellpadding="0" cellspacing="0"  border="1">
        <thead align="center">
          <tr>
            <th colspan="7" style="min-width: 1300px;">
              {{info.info.school_name}}学校食堂食品及原辅材料进出库台账
            </th>
          </tr>
          <tr>
            <th>产品名称</th>
            <th>产地品牌生产商</th>
            <th>等级规格</th>
            <th>供应商全称</th>
            <th>统一社会信用代码</th>
            <th>系统操作员<br/>（签字）</th>
            <th>库管员<br/>（签字）</th>
          </tr>
        </thead>
        <tbody>
          <tr class="topssd">
            <td align="center">{{ info.info.title }}</td>
            <td align="center">{{ info.info.manufacturer }}</td>
            <td align="center">{{ info.info.grade }}</td>
            <td align="center">{{ info.info.supplier }}</td>
            <td align="center">{{ info.info.code }}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    <br />
     <table class="table bot_tabs" cellpadding="0" cellspacing="0" border="1">
        <thead>
          <tr style="height: 0px;border: 0;">
            <th colspan="15"  style="min-width: 1300px;height: 0px;padding: 0;border: 0;"></th>
          </tr>
          <tr align="center">
            <th rowspan="2">日期</th>
            <th colspan="7" >入库情况</th>
            <th colspan="4" >出库情况</th>
            <th colspan="3" >结存情况</th>
          </tr>
          <tr align="center">
            <th>入库<br/>单号</th>
            <th>生产<br/>日期</th>
            <th>保质<br/>期至</th>
            <th>计量<br/>单位</th>
            <th>入库<br/>数量</th>
            <th>单价(元)</th>
            <th>入库<br/>金额(元)</th>
            <th>出库<br/>单号</th>
            <th>生产<br/>日期</th>
            <th>出库<br/>数量</th>
            <th>出库<br/>金额(元)</th>
            <th>数量</th>
            <th>均价(元)</th>
            <th>金额(元)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in info.list" :key="index" class="trbox">
            <td align="center">{{item.warehousing_time}}</td>
            <td align="center">{{item.warehousing_sn}}</td>
            <td align="center">{{item.production_time}}</td>
            <td align="center">{{item.expiration_time}}</td>
            <td align="center">{{item.unit}}</td>
            <td align="center">{{item.now_count}}</td>
            <td align="center">{{item.unit_price}}</td>
            <td align="center">{{item.total_price}}</td>
            <td align="center">{{item.out_code}}</td>
            <td align="center">{{item.out_production_time}}</td>
            <td align="center">{{item.out_count}}</td>
            <td align="center">{{item.out_now_count}}</td>
            <td align="center">{{item.stock}}</td>
            <td align="center">{{item.period_unit_price}}</td>
            <td align="center">{{item.period_total_price}}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  props: ["info"]
};
</script>

<style lang="scss" scoped>
.table{
  width: 100%;
  // table-layout:fixed;
}
.trbox{
  height: 55px !important;
}
.top_tabs{
  th,td{
    box-sizing: border-box;
    padding: 6px 0;
  }
}
.topssd{
   height: 55px !important;
}
.bot_tabs{
  th,td{
    box-sizing: border-box;
    padding: 6px 10px;
    white-space: pre-wrap !important;
    word-wrap:break-word !important;
    word-break:break-all !important;
  }
}
#printTable{
  position:absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
// @import "~@/assets/css/Procurement/myPrintTable.scss";
</style>
