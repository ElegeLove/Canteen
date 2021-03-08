<template>
  <div>
    <!-- 入库单 -->
    <a-page-header
      style="border-bottom: 1px solid rgb(235, 237, 240)"
      title="确认入库"
      @back="() => $router.back()"
    >
      <template slot="extra">
        <a-button icon="printer" @click="printFun()">打印</a-button>
        <!-- <a-button icon="download" type="primary" @click="exportData">导出入库单</a-button> -->
      </template>
    </a-page-header>
    <div>
      <div class="hidden info-head top-20">
        <div class="left">供应商: {{tableInfo.main_info.supplier_name}}</div>
        <div class="left">学校: {{tableInfo.main_info.school_name}}</div>
        <div class="left">订单号: {{tableInfo.main_info.order_sn}}</div>
        <div class="left">入库时间: {{tableInfo.main_info.order_time}}</div>
        <div
          class="right"
        >共{{tableInfo.main_info.type_num}}类&nbsp;&nbsp;&nbsp;&nbsp;合计：￥{{tableInfo.main_info.price_total}}元</div>
      </div>
      <!-- 数据 start -->
      <a-table
        :columns="columns"
        :data-source="tableInfo.list"
        bordered
        :rowKey="(item,index) => index"
        :pagination="false"
      ></a-table>
      <!-- 数据 -end -->
    </div>
    <warrant-table :info="printInfo"></warrant-table>
    <warrant-table-self :info="printInfo"></warrant-table-self>
  </div>
</template>

<script>
  import {getLodop} from '../../../assets/js/LodopFuncs'
import print from "print-js";
import warrantTable from "../components/warrantTable";
import warrantTableSelf from "../components/warrantTableSelf";
export default {
  components: {
    warrantTable,
    warrantTableSelf
  },
  data() {
    return {
      columns: [
        { title: "产品代码", dataIndex: "product_code" },
        { title: "产品名称", dataIndex: "product_name" },
        { title: "产地品牌生产商", dataIndex: "manufacturer" },
        { title: "等级规格", dataIndex: "grade" },
        { title: "生产日期", dataIndex: "production_time" },
        { title: "保质期至", dataIndex: "expiration_time" },
        { title: "计量单位", dataIndex: "unit_meterage" },
        { title: "数量", dataIndex: "now_count" },
        { title: "单价（元）", dataIndex: "unit_price" },
        { title: "金额（元）", dataIndex: "total_price" },
        { title: "查验情况", dataIndex: "check_detail" },
      ],
      tableInfo: {
        main_info: {},
        list: [],
      },
      printInfo:"",
      styles:`
      .titles{
        text-align: center;
        font-weight: bold;
        font-size: 24px;
        color: #000000;
        margin-bottom: 9px;
        transform: scale(1.2);
        box-sizing: border-box;
        padding-left: 80px;
        font-family:'微软雅黑';
      }
      .peersons{
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 40px 0 15px;
        font-size: 15px;
        color: #000000;
        font-family:'微软雅黑';
        margin-bottom:10px !important;
      }
      .peersons>span{
          transform-origin:20% 50% !important;
          display: inline-block;
          transform: scale(0.9);
          white-space: nowrap;
       }
      .foots{
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        flex-wrap: wrap;
        padding: 0 60px 0 15px;
        font-size: 15px;
        margin-top:10px;
        color: #000000;
      }
      .foots>span{
        font-family:'微软雅黑' !important;
        white-space: nowrap !important;
        transform-origin:20% 50% !important;
        display: inline-block;
        transform: scale(0.8);
        letter-spacing: 5px;
      }
      tbody>tr{
        height: 47.5px !important;
      }
      tbody>tr>td{
        height: 47.5px !important;
        font-size: 15px;
        position: relative !important;
      }
      tbody>tr>td>span{
        font-size: 15px;
        font-family:'微软雅黑' !important;
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center;
        height: 47.5px !important;
        word-break:break-all !important;
        transform: scale(0.7);
        letter-spacing: 5px;
      }
      thead>tr{
        height: 56px !important;
      }
      .headers{
        font-family:'微软雅黑';
      }
      .headers>tr>td{
        height: 56px !important;
        font-size: 15px;
        box-sizing: border-box;
        padding: 0px 0;
      }
      .headers>tr>td>span{
        transform-origin:20% 50% !important;
        white-space: nowrap;
        display: inline-block;
        letter-spacing: 5px;
        transform: scale(0.8);
      }
      td{
        color: #000000;
        text-align: center;
      }
      #warrantTableSelf{
        position:absolute;
        width: 100%;
        z-index: -1;
        top: 0;
        left: 0;
      }
      .lists{
        height:640px !important;
      }
      `
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$store.commit("sch_setLoaing",true);
      this.$http.outAndIn_warrant({ id: this.$route.query.id }).then((res) => {
        this.$store.commit("sch_setLoaing",false);
        if(res.code==1){
         this.tableInfo = res.data;
        }
      });
      this.$http.outAndIn_warrant({ id: this.$route.query.id,print:1}).then((res) => {
        this.printInfo = res.data;
      });
    },
    exportData() {
      this.$http.outAndIn_warrant_export({ id: this.$route.query.id });
    },
    printFun() {
      let id = '';
      if(this.$route.query.type == '2'){
        id = 'warrantTableSelf';
      }else{
        id = 'warrantTable';
      }
      var LODOP=getLodop();
          LODOP.PRINT_INIT("test");
          LODOP.SET_PRINT_PAGESIZE (1,'210.6mm','140mm',2);//设置纸张大小
          LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width");//设置页面缩放
          var strBodyStyle = ""
          if(id=="warrantTableSelf"){
            strBodyStyle = "<style>" + this.styles + "</style>";
          }else{
            strBodyStyle = "<style></style>";
          }
          var strFormHtml = strBodyStyle + "<body>" + document.getElementById(id).innerHTML + "</body>";
          LODOP.ADD_PRINT_HTM(25,10,"100%","100%",strFormHtml);//设置页面填充内容
          LODOP.PREVIEW();
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
.info-head {
  padding: 20px 20px;
  margin-bottom: 20px;
  width: 100%;
  background: #f2f2f2;
  .left {
    margin-right: 40px;
  }
}
</style>
