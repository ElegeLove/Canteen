<template>
  <div class="printTable" id="printTable" style="position: relative;">
   <table class="table" cellpadding="0" cellspacing="0" border="1">
     <thead>
       <tr>
         <th colspan="21" style="min-width: 1196px;text-align: center;" align="center">{{ title }}</th>
       </tr>
       <tr>
         <th colspan="21">
           <div class="titlsed"><span>&emsp;食堂名称：{{info.full_name}}</span><span>填报日期：{{info.dateTim}}</span><span>金额单位：元</span></div>
         </th>
       </tr>
       <tr>
         <th rowspan="2" align="center">产品<br/>代码</th>
         <th rowspan="2" width="150" align="center">产品<br/>名称</th>
         <th rowspan="2" width="220" align="center">产地品<br/>牌生产商</th>
         <th rowspan="2" align="center">等级<br/>规格</th>
         <th rowspan="2" width="220" align="center">供应商</th>
         <th rowspan="2" align="center">单位</th>
         <th colspan="3" align="center">上月结存</th>
         <th colspan="3" align="center">本月计划采购</th>
         <th colspan="3" align="center">本月入库</th>
         <th colspan="3" align="center">本月出库</th>
         <th colspan="3" align="center">本月结存</th>
       </tr>
       <tr>
         <th align="center">数量</th>
         <th align="center">单价</th>
         <th align="center">金额</th>
         <th align="center">数量</th>
         <th align="center">均价</th>
         <th align="center">金额</th>
         <th align="center">数量</th>
         <th align="center">均价</th>
         <th align="center">金额</th>
         <th align="center">数量</th>
         <th align="center">均价</th>
         <th align="center">金额</th>
         <th align="center">数量</th>
         <th align="center">均价</th>
         <th align="center">金额</th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="(item, index) in list" :key="index">
         <td>{{ item.code }}</td>
         <td>{{ item.product_name }}</td>
         <td>{{ item.manufacturer }}</td>
         <td>{{ item.grade }}</td>
         <td>{{ item.supplier }}</td>
         <td>{{ item.unit }}</td>
         <td>{{ item.last_month_number }}</td>
         <td>{{ item.last_month_unit_price }}</td>
         <td>{{ item.last_month_price }}</td>
         <td>{{ item.procurement_plan_number }}</td>
         <td>{{ item.procurement_plan_unit_price }}</td>
         <td>{{ item.procurement_plan_price }}</td>
         <td>{{ item.warehousing_number }}</td>
         <td>{{ item.warehousing_unit_price }}</td>
         <td>{{ item.warehousing_price }}</td>
         <td>{{ item.out_number }}</td>
         <td>{{ item.out_unit_price }}</td>
         <td>{{ item.out_price }}</td>
         <td>{{ item.month_number }}</td>
         <td>{{ item.month_unit_price }}</td>
         <td>{{ item.month_price }}</td>
       </tr>
     </tbody>
   </table>
    <!-- <br /> -->
    <div style="page-break-after: always;" class="psad" v-if="list.length>4"></div>
    <table border="1" cellpadding="0" cellspacing="0" class="newsda">
        <tbody>
          <tr>
              <td rowspan="3"  class="allTit" width="70">累计数</td>
              <td class="nobor" width="70">本月计划采购</td>
              <td  class="allsTab">
                <table border="0" class="rtys" cellpadding="0" cellspacing="0" v-for="(it,ix) in num.procurement_plan">
                  <tr class="noBorder">
                    <td v-for="(its,itx) in it" width="100">{{its.name}}</td>
                  </tr>
                  <tr>
                    <td v-for="(its,itx) in it" width="100">{{its.sum_amount}}</td>
                  </tr>
                </table>
              </td>
          </tr>
         <tr>
              <td  class="nobor">本月入库</td>
              <td  class="allsTab">
                <table border="0" class="rtys" cellpadding="0" cellspacing="0" v-for="(it,ix) in num.warehousing" >
                  <tr class="noBorder">
                    <td v-for="(its,itx) in it" width="100">{{its.name}}</td>
                  </tr>
                  <tr>
                    <td v-for="(its,itx) in it" width="100">{{its.sum_amount}}</td>
                  </tr>
                </table>
              </td>
          </tr>
          <tr>
              <td class="nobor">本月出库</td>
              <td class="allsTab">
                <table border="0" class="rtys" cellpadding="0" cellspacing="0" v-for="(it,ix) in num.out" >
                  <tr class="noBorder">
                    <td v-for="(its,itx) in it" width="100">{{its.name}}</td>
                  </tr>
                  <tr>
                    <td v-for="(its,itx) in it" width="100">{{its.sum_amount}}</td>
                  </tr>
                </table>
              </td>
          </tr>
        </tbody>
     </table>

    <div class="flex newsfix margs">
      <div style="width: 25%" class="textCenter">
        系统操作员（签字）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div style="width: 25%" class="textCenter">
        库管员（签字）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div style="width: 25%" class="textCenter">
        食堂会计（签字）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div style="width: 25%" class="textCenter">
        食堂负责人（签字）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    num: {
      type: Object,
      default: () => {
        return {
          out: [],
          procurement_plan: [],
          warehousing: [],
        };
      },
    },
    list: {
      type: Array,
      default: ()=>{return []},
    },
    title: {
      type: String,
      default: "",
    }
  },
};
</script>

<style>
@import "../../../../assets/css/Procurement/myPrintTable.scss";
</style>
<style lang="scss" scoped>
.psad{
 height: 1px;
     width: 100%;
     page-break-after: always;
     display: block;
}
.newsfix>div{
  white-space: nowrap;
}
th{
  text-align: center;
}
.allsTab{
  width: 100% !important;
}
  .allsTab{
    >.rtys:nth-of-type(1){
      border-top: 0 !important;
    }
    td{
      white-space: pre-wrap !important;
      text-overflow:ellipsis;
      white-space: nowrap;
      word-break:break-all;
      width:75px!important;
    }
  }
  .rtys{
    border-left: 0;
    width: 100% !important;
    min-width: 1064px !important;
    >tr:nth-of-type(2){
      td{
        border-bottom: 0 !important;
      }
    }
    >tr:nth-of-type(1){
      border-top: 0 !important;
      td{
        border-top: 0 !important;
      }
    }
  }
  .nobor{
    border-right: 0 !important;
    white-space: nowrap;
  }
.box1 {
  width: 800px !important;
  overflow: hidden;
  border-left: 1px solid #000;
  border-right: 0 none;
  border-bottom: 0 none;
  box-sizing: border-box;
}
.title1 {
  width: 100px;
  height: 180px;
  border-bottom: 1px solid #000;
  border-top: 1px solid #000;
  text-align: center;
  line-height: 180px;
  float: left;
  box-sizing: border-box;
}
.con1 {
  width: calc(100% - 100px);
  position: relative;
  float: left;
  border-top: 1px solid #000;
}
.con1Item {
  width: 100%;

  overflow: hidden;
}
.con1Item-item-tt {
  height: 60px;
  width: 100px;
  text-align: center;
  border-right: 1px solid #000000;
  border-bottom: 1px solid #000000;
  float: left;
  box-sizing: border-box;
  border-left: 1px solid #000;
}
.con1Item-item-con {
  width: calc(100% - 100px);
  float: left;
  box-sizing: border-box;
  /* border-left:1px solid #000; */
}
.con1Item-item-con-item {
  width: 99.5px;
  text-align: center;
  height: 60px;
  border-right: 1px solid #000000;
  border-bottom: 1px solid #000000;
  float: left;
  box-sizing: border-box;
}
</style>
