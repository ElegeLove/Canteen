<template>
  <div>
    <goback title="返回"/>
     <div class="printTable" id="printTable" style="position: relative;z-index: 2;" v-if="info!==''">
      <table class="table" cellpadding="0" cellspacing="0" border="1">
        <thead>
          <tr>
            <th rowspan="2">产品代码</th>
            <th rowspan="2">产品名称</th>
            <th rowspan="2">产地品牌生产商</th>
            <th rowspan="2">等级规格</th>
            <th rowspan="2">供应商</th>
            <th rowspan="2">单位</th>
            <th colspan="3">上月结存</th>
            <th colspan="3">本月计划采购</th>
            <th colspan="3">本月入库</th>
            <th colspan="3">本月出库</th>
            <th colspan="3">本月结存</th>
          </tr>
          <tr>
            <th>数量</th>
            <th>单价</th>
            <th>金额</th>
            <th>数量</th>
            <th>均价</th>
            <th>金额</th>
            <th>数量</th>
            <th>均价</th>
            <th>金额</th>
            <th>数量</th>
            <th>均价</th>
            <th>金额</th>
            <th>数量</th>
            <th>均价</th>
            <th>金额</th>
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
       <br />

       <table border="1" cellpadding="0" cellspacing="0">
           <tbody>
             <tr>
                 <td rowspan="3"  style="padding: 0 10px;" width="100">累计数</td>
                 <td class="nobor" width="160">本月计划采购</td>
                 <td  class="allsTab">
                   <table border="0" class="rtys" cellpadding="0" cellspacing="0" v-for="(it,ix) in num.procurement_plan" :key="ix">
                     <tr style="border: 0;">
                       <td v-for="(its,itx) in it" width="100" :key="itx">{{its.name}}</td>
                     </tr>
                     <tr>
                       <td v-for="(its,itx) in it" width="100" :key="itx">{{its.sum_amount}}</td>
                     </tr>
                   </table>
                 </td>
             </tr>
            <tr>
                 <td  class="nobor" width="160">本月入库</td>
                 <td  class="allsTab">
                   <table border="0" class="rtys" cellpadding="0" cellspacing="0" v-for="(it,ix) in num.warehousing" :key="ix">
                     <tr style="border: 0;">
                       <td v-for="(its,itx) in it" width="100" :key="itx">{{its.name}}</td>
                     </tr>
                     <tr>
                       <td v-for="(its,itx) in it" width="100" :key="itx">{{its.sum_amount}}</td>
                     </tr>
                   </table>
                 </td>
             </tr>
             <tr>
                 <td class="nobor" width="160">本月出库</td>
                 <td class="allsTab">
                   <table border="0" class="rtys" cellpadding="0" cellspacing="0" v-for="(it,ix) in num.out" :key="ix" >
                     <tr style="border: 0;">
                       <td v-for="(its,itx) in it" width="100" :key="itx">{{its.name}}</td>
                     </tr>
                     <tr>
                       <td v-for="(its,itx) in it" width="100" :key="itx">{{its.sum_amount}}</td>
                     </tr>
                   </table>
                 </td>
             </tr>
           </tbody>
        </table>
     </div>
  </div>
</template>

<script>
  import goback from "../../../components/goBack/index.vue"
export default {
  data(){
    return{
      info:"",
      num:"",
      list:""
    }
  },
  components:{
    goback
  },
  created(){
    this.getDetails()
  },
  methods:{
    getDetails(){
      this.$store.commit("sch_setLoaing",true)
      var querys = this.$route.query;
      this.$http
      .cashHandAndFixedPurchase_Print({
        central_id: querys.central_id,
        month: querys.month,
        bpps_id:querys.id
      })
      .then((res) => {
        this.$store.commit("sch_setLoaing",false)
         if(res.code==1){
           this.info = res.data;
           this.num = res.data.cumulative_number;
           this.list = res.data.list;
         }
      });
    }
  }
};
</script>

<style>
@import "../../../assets/css/Procurement/myPrintTable.scss";
</style>
<style lang="scss" scoped>
.headers{
  padding: 0px 0 20px 0 !important;
  height: auto !important;
  border: 0 !important;
}
  .allsTab{
    >.rtys:nth-of-type(1){
      border-top: 0 !important;
    }
  }
  .rtys{
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
