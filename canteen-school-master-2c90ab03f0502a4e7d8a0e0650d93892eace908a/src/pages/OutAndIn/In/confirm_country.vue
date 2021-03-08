<template>
  <div>
    <!--村小 - 确认入库 -->
    <a-page-header
      style="border-bottom: 1px solid rgb(235, 237, 240)"
      title="确认入库"
      @back="() => $router.back()"
    >
      <template slot="extra">
        <a-button key="1" type="primary">确认验收</a-button>
      </template>
    </a-page-header>
    <div>
      <div class="hidden info-head top-20">
        <div class="left">供应商: 永辉超市</div>
        <div class="left">学校: 巴蜀小学</div>
        <div class="left">订单号: 1234123456</div>
        <div class="left">批次号: 01</div>
        <div class="left">订货时间: 2020-05-12 12：23</div>
        <div class="right">共3类&nbsp;&nbsp;&nbsp;&nbsp;合计：￥30000.00元</div>
      </div>
      <!-- 数据 start -->
      <a-table
        :columns="columns"
        :data-source="data"
        bordered
        :rowKey="(item,index) => index"
        :pagination="false"
      >
        <template slot="method">入库即出库</template>
        <template slot="action" slot-scoped="row">
          <a-button type="link" @click="$router.push('add')">请填写</a-button>
        </template>
      </a-table>
      <!-- 数据 -end -->
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
        { title: "产地品牌生产商", dataIndex: "pp" },
        { title: "等级规格", dataIndex: "gg" },
        { title: "生产日期", dataIndex: "date" },
        { title: "保质期至", dataIndex: "endTime" },
        { title: "计量单位", dataIndex: "unit" },
        { title: "数量", dataIndex: "num" },
        { title: "单价（元）", dataIndex: "sp" },
        { title: "金额（元）", dataIndex: "tp" },
        {
          title: "选择入库方式",
          dataIndex: "method",
          scopedSlots: { customRender: "method" },
        },
        {
          title: "检验情况",
          dataIndex: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" },
          width: "200px",
        },
      ],
      data: [{ code: "0000.1" }],
      value: 1,
    };
  },
  methods: {
    changeRadio(e) {
      console.log("radio checked", e.target.value);
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

