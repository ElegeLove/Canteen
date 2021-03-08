<template>
  <div>
    <!-- 定点采购详情 -->
    <a-page-header
      style="border-bottom: 1px solid rgb(235, 237, 240)"
      title="确认入库"
      @back="() => $router.back()"
    >
      <template slot="extra">
        <a-button key="1" type="primary" @click="confirmSubmit()"
          >确认验收</a-button
        >
      </template>
    </a-page-header>
    <div>
      <div class="hidden info-head top-20">
        <div class="left">供应商: {{ data.main_info.supplier_name }}</div>
        <div class="left">学校: {{ data.main_info.school_name }}</div>
        <div class="left">订单号: {{ data.main_info.order_sn }}</div>
        <!-- <div class="left">批次号: {{ data.main_info.batch_number }}</div> -->
        <div class="left">确认交接单时间:{{ data.main_info.order_time }}</div>
        <div class="right">
          共{{ data.main_info.type_num }}类&nbsp;&nbsp;&nbsp;&nbsp;合计：￥
          <span class="mark_span">{{ data.main_info.price_total }}</span> 元
        </div>
      </div>
      <!-- 数据 start -->
      <a-table
        :columns="columns"
        :data-source="data.list"
        bordered
        :rowKey="(item, index) => index"
        :pagination="false"
      >
        <template slot="method" slot-scope="text, record">
          <div v-if="school_type == '1'">入库即出库</div>
          <a-radio-group v-model="record.warehousing_type" v-else>
            <a-radio :value="1">配送入库</a-radio>
            <a-radio :value="4">入库即出库</a-radio>
          </a-radio-group>
        </template>
        <template slot="action" slot-scope="text, record">
          <!-- <a-input v-if="record.isInput" placeholder="请填写" v-model="record.check_detail"></a-input>
          <a-button v-if="!record.isInput" @click="record.isInput=true" type="link">请填写</a-button> -->
          <a-select v-model="record.check_detail" style="width: 100px">
            <a-select-option value="合格"> 合格 </a-select-option>
            <a-select-option value="不合格"> 不合格 </a-select-option>
          </a-select>
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
        {
          title: "选择入库方式",
          dataIndex: "method",
          scopedSlots: { customRender: "method" },
        },
        {
          title: "查验情况",
          dataIndex: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" },
          width: "200px",
        },
      ],
      school_type: this.$route.query.school_type,
      data: {
        list: [],
        main_info: {},
      },
      value: 1,
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http
        .outAndIn_inConfirm({ id: this.$route.query.id })
        .then((res) => {
          this.data = res.data;
          this._.forEach(this.data.list, (item) => {
            this.$set(item, "warehousing_type", "");
            this.$set(item, "check_detail", "合格");
            this.$set(item, "isInput", false);
            this.$set(item, "warehousing_type", 1);
          });
        });
    },
    changeRadio(e) {

    },
    //确认验收
    confirmSubmit() {
      let submitForm = [];
      this._.forEach(this.data.list, (item) => {
        submitForm.push({
          id: item.id,
          check_detail: item.check_detail || "",
          warehousing_type:
            this.$route.query.school_type == 1 ? 4 : item.warehousing_type,
        });
      });
      let submitData = {
        distribution_id: this.data.main_info.distribution_id,
        list: submitForm,
      };
      this.$store.commit("sch_setLoaing",true)
      this.$http.outAndIn_confirmSubmit(submitData).then((res) => {
        this.$store.commit("sch_setLoaing",false)
        if (res.code == 1) {
          history.back();
        }
      });
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
