<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="订货单详情"
      @back="() => $router.back()"
    >
      <div class="top-20" v-for="(item,pindex) in tableData" :key="pindex">
        <a-card>
          <div slot="title" class="hidden">
            <div class="left right-20">订货学校：{{item.info.school_name}}</div>
            <div class="left right-20">供应商：{{item.info.supplier ||'--'}}</div>
            <div class="left right-20">订单编号：{{item.info.order_sn }}</div>
            <div class="left right-20">订货时间：{{item.info.create_time }}</div>
            <div class="left">期望配送时间：{{item.info.distribution_time }}</div>
          </div>
          <a-table
            :columns="columns"
            :data-source="item.procurement"
            bordered
            :rowKey="(node,index) => index"
            :pagination="false"
          ></a-table>
          <div class="top-20 hidden">
            <div class="left">
              <span
                class="left"
                style="margin-right:10px;line-height:32px"
              >买家留言:{{item.info.remark || '--'}}</span>
            </div>
            <div class="right">
              <span>共&nbsp;{{item.procurement.length}}&nbsp;类</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                小计&nbsp;&nbsp;
                <em style="color:red;font-weight:bold">{{item.info.total_money || 0}}</em>&nbsp;&nbsp;元
              </span>
            </div>
          </div>
        </a-card>
      </div>
    </a-page-header>
    <a-row class="top-20 page-footer" type="flex" justify="end">
      <a-col :span="4" style="text-align:right">
        共计
        <span style="color:red;font-weight:bold">&yen;&nbsp;{{total_money}}</span>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
       { title: "产品代码", dataIndex: "code" },
        { title: "产品名称", dataIndex: "name" },
        { title: "计量单位", dataIndex: "unit" },
        { title: "数量", dataIndex: "real_quantity" },
        {
          title: "产地品牌生产商",
          dataIndex: "supplier_product_name",
          scopedSlots: { customRender: "supplier_product_name" },
        },
        { title: "单价（元）", dataIndex: "price" },
        { title: "金额（元）", dataIndex: "total_price" },
      ],
      tableData: [],
    };
  },
  mounted() {
    console.log('info')
    this.getData();
  },
  computed: {
    total_money() {
      let money = 0;
      this._.forEach(this.tableData, (item) => {
        money = (money * 100 + item.info.total_money * 100) / 100;
      });
      return this.$commonJs.rounds(money,2);
    },
  },
  methods: {
    getData() {
      let type = this.$route.query.type;
      let id;
      if (type == "day") {
        id = this.$route.params.id.split(",");
      } else {
        id = this.$route.params.id;
      }
      this.$http
        .procurement_orderPro_byPlan_deal_list(type, id)
        .then((res) => {
          this.tableData = res.data;
        });
    },
  },
};
</script>


<style scoped="scoped" lang="scss">
@import "../../../../assets/css/Procurement/common.scss";
</style>
