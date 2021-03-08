<template>
  <div class="orderListIndex">
    <!-- 订货单列表 -->
    <div class="my-search">
      <a-form layout="inline">
        <a-form-item label="订单号:">
          <a-input v-model="searchForm.keyword" placeholder="订单号" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="search(1)">搜索</a-button>
        </a-form-item>
      </a-form>
    </div>
    <!-- 搜索 -->
    <div class="my-search bottom-20">
      <div class="my-search-item">
        <div class="title">订货学校:</div>
        <a-select v-model="searchForm.school_id" style="width: 140px" @change="search(1)">
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item,index) in allSchool"
            :key="index"
            :value="item.id"
          >{{item.full_name}}</a-select-option>
        </a-select>
      </div>
      <div class="my-search-item">
        <div class="title">学期:</div>
        <a-select
          v-model="searchForm.semester"
          style="width: 160px"
          @change="getWeekData(searchForm.semester)"
        >
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item,index) in yearData"
            :key="index"
            :value="item.id"
          >{{item.year}}{{item.semester}}</a-select-option>
        </a-select>
      </div>
      <div class="my-search-item">
        <div class="title">周:</div>
        <a-select
          allowClear
          v-model="searchForm.start_week"
          :disabled="!searchForm.semester"
          placeholder="选择周"
          style="width: 160px"
          @change="search(1)"
        >
          <a-select-option
            v-for="(item,index) in weekData"
            :key="index"
            :value="item.id"
          >第{{item.weeks}}周</a-select-option>
        </a-select>
        <span class="left-10 right-10">——</span>
        <a-select
          allowClear
          v-model="searchForm.end_week"
          placeholder="选择周"
          :disabled="!searchForm.semester"
          style="width: 160px"
          @change="search(1)"
        >
          <a-select-option
            v-for="(item,index) in weekData"
            :key="index"
            :value="item.id"
          >第{{item.weeks}}周</a-select-option>
        </a-select>
      </div>
      <div class="my-search-item">
        <div class="title">供应商:</div>
        <a-select v-model="searchForm.supplier_id" style="width: 160px" @change="search(1)">
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item,index) in allSuplier"
            :key="index"
            :value="item.id"
          >{{item.name}}</a-select-option>
        </a-select>
      </div>
    </div>

    <a-table
      :columns="columns"
      :data-source="tableData"
      bordered
      :rowKey="(item,index) => index"
      :pagination="pagination"
      :loading="loading"
    >
      <template slot="week" slot-scope="row">第{{ row }}周</template>
      <template slot="action" slot-scope="text,record" class="actiosn main_color">
        <a-button type="link" @click="$router.push(`info/${record.id}`)">查看</a-button>
        <a-button type="link" v-if="record.status == '未接单'" @click="cancelOrder(record.id)">撤回</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
      columns: [
        { title: "订单编号", dataIndex: "order_sn" },
        { title: "下单时间", dataIndex: "create_time" },
        {
          title: "学期",
          dataIndex: "semester",
          scopedSlots: { customRender: "semester" },
        },
        {
          title: "周",
          dataIndex: "weeks",
          scopedSlots: { customRender: "week" },
        },
        { title: "订货学校", dataIndex: "full_name" },
        { title: "供应商", dataIndex: "name" },
        { title: "总金额（元）", dataIndex: "total_amount" },
        { title: "总类数", dataIndex: "species" },
        { title: "状态", dataIndex: "status" },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 200,
          scopedSlots: { customRender: "action" },
          align: "center",
        },
      ],
      pagination: {
        current: 1,
        pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: (e) => this.search(e),
        onShowSizeChange: (current, size) => {
          //分页触发
          this.searchForm.pageSize = size;
          this.pagination.pageSize = size;
          this.search(1);
        },
        pageSizeOptions: this.$commonJs.PAGE_LINES,
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
      //数据
      tableData: [],
      loading: false,
      searchForm: {
        page: 1,
        pageSize: Number(this.$commonJs.PAGE_LINES[0]),
        semester: "",
        school_id: "",
        supplier_id: "",
        status: "",
        keyword: "",
      },
      allSchool: [],
      allSuplier: [],
      yearData: [],
      weekData: [],
    };
  },
  mounted() {
    this.search();
    //获取所有学校
    this.$commonJs.getSchool((res) => {
      this.allSchool = res;
    });
    //获取所有供应商
    this.$http.procurement_supplierList().then((res) => {
      this.allSuplier = res.data;
    });

    this.getWeekData("", (res) => {
      this.yearData = res.data;
      this.getWeekData(res.data[0].id, (response) => {
        this.weekData = response.data;
      });
    });
  },
  methods: {
    getWeekData(id, callback) {
      this.searchForm.start_week = undefined;
      this.searchForm.end_week = undefined;
      this.$http.weekData({ id: id }).then((res) => {
        if (callback) {
          callback(res);
        } else {
          this.weekData = res.data;
        }
      });
      this.search(1);
    },
    search(data) {
      this.loading = true;
      if (data) {
        this.searchForm.page = data;
        this.pagination.current = data;
      }
      this.$http.procurement_orderList(this.searchForm).then((res) => {
        this.tableData = res.data.data || [];
        this.pagination.total = res.data.total;
        this.loading = false;
      });
    },
    cancelOrder(id) {
      this.$confirm({
        title: "提示",
        content: "是否确定撤回该订单",
        onOk: () => {
          this.$http
            .procurement_orderCancel({ procurement_id: id })
            .then((res) => {
              this.search();
            });
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";

.orderListIndex {
  padding: 40px;
  .my-search {
    margin-bottom: 30px;
  }
  .gy-pagination {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
