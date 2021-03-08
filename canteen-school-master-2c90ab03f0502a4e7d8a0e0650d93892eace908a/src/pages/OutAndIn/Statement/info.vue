<template>
  <div>
    <!-- 定点采购详情 -->

    <a-page-header
      style="border-bottom: 1px solid rgb(235, 237, 240)"
      title="定点采购详情"
      @back="() => $router.back()"
    >
      <template slot="extra">
        <a-button icon="printer" @click="printFun('printTable')">打印</a-button>
        <a-button icon="download" @click="exportTable" type="primary"
          >导出</a-button
        >
      </template>
    </a-page-header>
    <div class="my-container">
      <div class="hidden info-head justs">
        <div class="left">供应商: {{ $route.query.supplier_name }}</div>
        <div>合计金额：{{all_total}}元</div>
      </div>
      <!-- 数据 start -->
      <a-table
        :columns="columns"
        :data-source="data.list"
        bordered
        :rowKey="(item, index) => index"
        :pagination="false"
      >
      </a-table>
      <!-- 数据 -end -->
    </div>
    <buy-table :info="data.list" :base-info="data.info"></buy-table>
  </div>
</template>

<script>
import buyTable from "./components/buyTable";

export default {
  components: {
    buyTable,
  },
  data() {
    return {
      columns: [
        {
          title: "产品代码",
          dataIndex: "product_code",
        },
        {
          title: "产品名称",
          dataIndex: "product_name",
        },
        {
          title: "产地品牌生产商",
          dataIndex: "manufacturer",
        },
        {
          title: "等级规格",
          dataIndex: "grade",
        },
        {
          title: "计量单位",
          dataIndex: "unit",
        },
        {
          title: "数量",
          dataIndex: "now_count",
        },
        {
          title: "单价（元）",
          dataIndex: "unit_price",
        },
        {
          title: "金额（元）",
          dataIndex: "total_price",
        },
      ],
      data: {
        info: {},
        list: [],
      },
      all_total:0
    };
  },
  mounted() {
    this.$http
      .fixedPurchaseDetails({
        central_id: this.$route.query.central_id,
        supplier_id: this.$route.query.supplier_id,
        week_id:this.$route.query.week_id,
        calendar_id:this.$route.query.calendar_id,
        month:this.$route.query.month
      })
      .then((res) => {
        this.data = res.data;
        var datas = JSON.parse(JSON.stringify(res.data.list));
        var sum = 0;
        datas.forEach((item,index)=>{
          sum=sum + Number(item.total_price)
        })

        // let numSun = Number(datas[5].total_price) + Number(datas[6].total_price)
        // console.log(Number(datas[5].total_price))
        // console.log(Number(datas[6].total_price))
        // console.log(numSun)
        // console.log(sum)
        this.all_total = this.$commonJs.rounds(sum,2);
      });
  },
  methods: {
    exportTable() {
      location.href = this.data.info.export_url;
    },
    printFun(id) {
      setTimeout(() => {
        printJS({
          printable: id,
          type: "html",
          // targetStyles: ["*"],
          ignoreElements: ["no-print", "bc", "gb"],
        });
      }, 1500);
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
.justs{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
