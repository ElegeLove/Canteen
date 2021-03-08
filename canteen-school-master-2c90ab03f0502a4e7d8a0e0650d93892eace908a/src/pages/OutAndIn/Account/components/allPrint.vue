<template>
  <!-- 打印 -->
  <div class="printTable" id="printTable">
      <div v-for="(items,indexd) in info" :key="indexd">
        <table class="table top_tabs fg" cellpadding="0" cellspacing="0"  border="1">
            <tbody align="center">
              <tr>
                <th colspan="7" style="min-width: 1300px;">
                  {{items.info.school_name}}学校食堂食品及原辅材料进出库台账
                </th>
              </tr>
              <tr class="toptr">
                <th>产品名称</th>
                <th>产地品牌生产商</th>
                <th>等级规格</th>
                <th>供应商全称</th>
                <th>统一社会信用代码</th>
                <th>系统操作员<br/>（签字）</th>
                <th>库管员<br/>（签字）</th>
              </tr>
            </tbody>
            <tbody>
              <tr class="topssd">
                <td align="center">{{ items.info.title }}</td>
                <td align="center">{{ items.info.manufacturer }}</td>
                <td align="center">{{ items.info.grade }}</td>
                <td align="center">{{ items.info.supplier }}</td>
                <td align="center">{{ items.info.code }}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        <br />
         <div class="seting" v-for="(it,ix) in items.list" :key="ix">
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
                <tr v-for="(item,index) in it" :key="index" class="trbox">
                  <td align="center" width="100" style="white-space: nowrap !important;">{{item.warehousing_time}}</td>
                  <td align="center" width="100" style="white-space: nowrap !important;">{{item.warehousing_sn}}</td>
                  <td align="center" width="100" style="white-space: nowrap !important;">{{item.production_time}}</td>
                  <td align="center" width="100" style="white-space: nowrap !important;">{{item.expiration_time}}</td>
                  <td align="center" width="85">{{item.unit}}</td>
                  <td align="center" width="100">{{item.now_count}}</td>
                  <td align="center" width="100">{{item.unit_price}}</td>
                  <td align="center" width="140">{{item.total_price}}</td>
                  <td align="center" width="100" style="white-space: nowrap !important;">{{item.out_code}}</td>
                  <td align="center" width="100" style="white-space: nowrap !important;">{{item.out_production_time}}</td>
                  <td align="center" width="100">{{item.out_count}}</td>
                  <td align="center" width="140">{{item.out_now_count}}</td>
                  <td align="center" width="100">{{item.stock}}</td>
                  <td align="center" width="120">{{item.period_unit_price}}</td>
                  <td align="center" width="120">{{item.period_total_price}}</td>
                </tr>
              </tbody>
            </table>
            <div class="ass"></div>
         </div>
      </div>
  </div>
</template>

<script>
export default {          ///判断list里面的table第一个的时候高度设置816  然后其余的设置1000多
  props: ["info"],
  mounted(){

  },
  methods:{
  }
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
.seting{
  min-height: 400px !important;
}
.topssd{
   height: 55px !important;
   td{
     white-space: nowrap !important;
   }
}
.toptr{
  th{
    white-space: nowrap !important;
  }
}
.ass{
  page-break-after:always !important;
}
.top_tabs{
  th,td{
    box-sizing: border-box;
    padding: 6px 0;
    border-color: #000000;
  }
}
.bot_tabs{
  td{
    border-color: #000000;
    box-sizing: border-box;
    padding: 6px 10px;
    white-space: pre-wrap !important;
    word-wrap:break-word !important;
    word-break:break-all !important;
  }
  th{
    border-color: #000000;
    box-sizing: border-box;
    padding: 6px 10px;
    white-space: nowrap !important;
  }
}
#printTable{
  position:static !important;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
