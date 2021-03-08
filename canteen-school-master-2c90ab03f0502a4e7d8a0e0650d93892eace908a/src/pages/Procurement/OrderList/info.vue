<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="订货单详情"
      @back="() => $router.back()"
    />
    <div class="my-container">
      <div class="hidden info-head">
        <div class="left">订货学校: {{tableData.full_name}}</div>
        <div class="left">供应商: {{tableData.name}}</div>
        <div class="left">订单编号: {{tableData.order_sn}}</div>
        <div class="left">订货时间: {{tableData.create_time}}</div>
        <div class="right">{{tableData.year}}{{tableData.semester}}第{{tableData.weeks}}周</div>
      </div>
      <a-table
        :columns="columns"
        :data-source="tableData.productDetail"
        bordered
        :rowKey="(item,index) => index"
        :pagination="false"
      >
        <div slot="moenrys" slot-scope="text,row">
           <span>{{row.change_price==null?row.unit_price:row.change_price}}</span>
        </div>
      </a-table>
      <div class="info-other">
        <div style="margin-bottom: 10px;">
          共{{tableData.species}}类&nbsp;&nbsp;&nbsp;&nbsp;合计
          <em
            style="color: red;font-weight: bold;margin: 0 6px;"
          >&yen;{{tableData.total_amount}}</em>元
        </div>
        <div>给卖家留言：{{tableData.remark || '--'}}</div>
        <div>配送时间：{{tableData.distribution_time || '--'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { title: "产品代码", dataIndex: "code" },
        { title: "产品名称", dataIndex: "name" },
        { title: "产地品牌生产商", dataIndex: "manufacturer" },
        { title: "等级规格", dataIndex: "grade" },
        { title: "计量单位", dataIndex: "unit" },
        { title: "数量", dataIndex: "number" },
        { title: "单价（元）", dataIndex: "change_price",scopedSlots: { customRender: 'moenrys' },},
        { title: "金额（元）", dataIndex: "total_price" },
      ],
      // 数据
      tableData: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .procurement_orderDetail({ id: this.$route.params.id })
        .then((res) => {
          this.tableData = res.data;
        });
    },
  },
};
</script>
<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
</style>
<style scoped="scoped" lang="scss">
.info-head {
  padding: 20px 20px;
  margin-bottom: 20px;
  width: 100%;
  background: #f2f2f2;
  .left {
    margin-right: 40px;
  }
}
.info-other {
  margin-top: 20px;
}
</style>
