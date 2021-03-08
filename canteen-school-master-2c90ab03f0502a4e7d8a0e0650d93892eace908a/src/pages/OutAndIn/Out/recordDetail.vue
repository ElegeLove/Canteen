<template>
  <div>
    <!-- 出库详情 -->
    <a-page-header title="查看详情" @back="() => $router.back()" />
    <a-card>
      <template slot="title" class="hidden">
        <div class="left">
          <span class="right-20">学校：{{tableData.main_info.school_name}}</span>
          <span class="right-20">供应商：{{tableData.main_info.supplier_name}}</span>
          <span class="right-20">订单号：{{tableData.main_info.order_sn}}</span>
        </div>
        <div class="right">订货时间：{{tableData.main_info.order_time}}</div>
      </template>
      <div>
        <a-row>
          <a-col :span="4">
            <img :src="tableData.product_info.image" style="width:160px;height:160px" alt />
          </a-col>
          <a-col :span="6">名称：&nbsp;&nbsp;{{tableData.product_info.title}}</a-col>
          <a-col
            :span="4"
          >单价(元)：&yen;{{tableData.product_info.unit_price}}/{{tableData.product_info.unit}}</a-col>
          <a-col
            :span="4"
          >入库数量：{{tableData.get_info.now_count}}</a-col>
          <a-col :span="4">总价(元)：&yen;{{tableData.get_info.total_price}}</a-col>
        </a-row>
        <a-row class>
          <a-row  v-if="tableData.product_info.type==0">
          <a-col class="proInfo-info-item" :span="8">产地品牌生厂商：{{tableData.product_info.manufacturer}}</a-col>
          <a-col class="proInfo-info-item" :span="8">等级规格：{{tableData.product_info.grade}},{{tableData.product_info.net_content}}{{tableData.product_info.unit}}/{{tableData.product_info.small_unit}}</a-col>
          <a-col class="proInfo-info-item" :span="8">生产日期：{{tableData.product_info.production_time}}</a-col>
          <a-col class="proInfo-info-item" :span="8">保质期至：{{tableData.product_info.expiration_time}}</a-col>
          <a-col class="proInfo-info-item" :span="8">类型：{{tableData.product_info.type==0?'预包装食品':tableData.product_info.type==1?'农产品':'小作坊食品'}}</a-col>
          <a-col class="proInfo-info-item" :span="8">计量单位价：￥{{tableData.product_info.unit_price}}/{{tableData.product_info.unit}}</a-col>
        </a-row>
        <a-row  v-if="tableData.product_info.type==1">
          <a-col class="proInfo-info-item" :span="8">产地：{{tableData.product_info.manufacturer}}</a-col>
          <a-col class="proInfo-info-item" :span="8">类型：{{tableData.product_info.type==0?'预包装食品':tableData.product_info.type==1?'农产品':'小作坊食品'}}</a-col>
        </a-row>
        <a-row  v-if="tableData.product_info.type==2">
          <a-col class="proInfo-info-item" :span="8">小作坊名称：{{tableData.product_info.workshop_name}}</a-col>
          <a-col class="proInfo-info-item" :span="8">生产日期：{{tableData.product_info.production_time}}</a-col>
        </a-row>

        </a-row>
      </div>
    </a-card>

    <div class="top-20 item">
      <div class="top-10 bottom-10">
        {{tableData.get_info.warehousing_time}}
        <span class="em">入库</span>
      </div>
      <a-row>
        <a-col :span="6">入库编号：{{tableData.get_info.warehousing_sn}}</a-col>
        <a-col :span="6">入库方式：{{tableData.get_info.warehousing_type_name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="6">入库时间：{{tableData.get_info.warehousing_time}}</a-col>
        <a-col :span="6">检验情况：{{tableData.get_info.check_detail}}</a-col>
      </a-row>
    </div>
    <div class="top-20 item">
      <div class="top-10 bottom-10">
        {{tableData.out_info.out_time}}
        <span class="em">出库</span>
      </div>

      <a-row>
        <a-col :span="6">出库编号：{{tableData.out_info.code}}</a-col>
        <a-col :span="6">出库方式：{{tableData.out_info.type_name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="6">出库量：{{tableData.out_info.out_count}}</a-col>
        <a-col :span="6">余量：{{tableData.out_info.allowance}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="6">出库时间：{{tableData.out_info.out_time}}</a-col>
        <a-col :span="24">备注：{{tableData.out_info.remarks}}</a-col>
      </a-row>
      <a-row>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: {
        main_info: {},
        product_info: {},
        get_info: {},
        out_info: {},
      },
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http
        .outAndIn_outRecord_detail({ id: this.$route.params.id })
        .then((res) => {
          this.tableData = res.data;
        });
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
.ant-col {
  padding: 10px;
}
.item {
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
}
</style>
