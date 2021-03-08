<template>
  <div class="my-container">
    <!-- 进出台账详情 -->
    <a-row
      class="my-container bottom-20"
      style="border: 1px solid rgb(235, 237, 240)"
    >
      <a-col :span="20">
        <a-row :span="24" class="my-container">
          <a-col :span="8">产品名称：{{ tableData.info.title }}</a-col>
          <a-col :span="8"
            >产地品牌生产商：{{ tableData.info.manufacturer }}</a-col
          >
          <a-col :span="8">等级规格: {{ tableData.info.grade }}</a-col>
        </a-row>
        <a-row :span="24" class="my-container">
          <a-col :span="8">供应商：{{ tableData.info.supplier }}</a-col>
          <a-col :span="8">统一社会信用代码：{{ tableData.info.code }}</a-col>
        </a-row>
      </a-col>
      <a-col :span="4" class="my-container">
        <a-button icon="printer" @click="printFun('printTable')"
          >打印</a-button
        >
        <a-button icon="download" type="primary" @click="exportTable"
          >导出</a-button
        >
      </a-col>
    </a-row>
    <!-- 数据 start -->
    <a-table
    :scroll="{ x: 1500, y: 500 }"
      :columns="columns"
      :data-source="tableData.list"
      bordered
      :rowKey="(item, index) => index"
      :pagination="false"
    ></a-table>
    <!-- 数据 -end -->

    <print-table :info='tableData'></print-table>
  </div>
</template>

<script>
import printTable from "./components/printTable";
export default {
  components: {
    printTable,
  },
  data() {
    return {
      columns: [
        { title: "日期", dataIndex: "warehousing_time" },
        {
          title: "入库情况",
          children: [
            { title: "入库单号", dataIndex: "warehousing_sn" },
            { title: "生产日期", dataIndex: "production_time" },
            { title: "保质期至", dataIndex: "expiration_time" },
            { title: "计量单位", dataIndex: "unit" },
            { title: "入库数量", dataIndex: "now_count" },
            { title: "单价(元)", dataIndex: "unit_price" },
            { title: "入库金额(元)", dataIndex: "total_price" },
          ],
        },
        {
          title: "出库情况",
          children: [
            { title: "出库单号", dataIndex: "out_code" },
             { title: "生产日期", dataIndex: "out_production_time" },
            { title: "出库数量", dataIndex: "out_count" },
            { title: "出库金额(元)", dataIndex: "out_now_count" },
          ],
        },
        {
          title: "结存情况",
          children: [
            { title: "数量", dataIndex: "stock" },
            { title: "均价(元)", dataIndex: "period_unit_price" },
            { title: "金额(元)", dataIndex: "period_total_price" },
          ],
        },
      ],
      tableData: {
        list: [{year:''}],
        info: {
          list:[{year:''}]
        },
      },
    };
  },
  mounted() {
    this.$http
      .bookListDetail({
        id: this.$route.query.id,
        supplier_product_id: this.$route.query.supplier_product_id,
        calendar_id:this.$route.query.calendar_id
      })
      .then((res) => {
        this.tableData = res.data;
      });
  },
  methods: {
    //打印
    printFun(tableId) {
      setTimeout(() => {
        printJS({
          printable: tableId,
          type: "html",
          // targetStyles: ["*"],
          ignoreElements: ["no-print", "bc", "gb"],
          style:"@media print{@page{size: A4 landscape;margin-left:23mm;margin-right:17mm;}}"
        });
      }, 1000);
    },
    exportTable() {
      this.$http.bookListDetail_export({
        id: this.$route.query.id,
        supplier_product_id: this.$route.query.supplier_product_id,
        school_id: localStorage.getItem("school_id"),
      });
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
</style>
