<template>
  <div>
    <!-- 搜索 start -->
    <div class="my-search bottom-20">
      <div class="my-search-item">
        <div class="title">就餐学校:</div>
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
        <div class="title">状态:</div>
        <a-select
          allowClear
          v-model="searchForm.order_status"
          placeholder="选择状态"
          style="width: 160px"
          @change="search(1)"
        >
          <a-select-option value>全部</a-select-option>
          <a-select-option :value="0">未下单</a-select-option>
          <a-select-option :value="1">待确认</a-select-option>
          <a-select-option :value="2">已确认</a-select-option>
          <a-select-option :value="3">已撤回</a-select-option>
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
        <span class="left-10 right-10">——</span>
        <a-select
          allowClear
          v-model="searchForm.end_week"
          placeholder="选择周"
          style="width: 160px"
          :disabled="!searchForm.semester"
          @change="search(1)"
        >
          <a-select-option
            v-for="(item,index) in weekData"
            :key="index"
            :value="item.id"
          >第{{item.weeks}}周</a-select-option>
        </a-select>
      </div>
    </div>
    <!-- 搜索 end -->

    <a-table
      :columns="columns"
      :data-source="tableData"
      bordered
      :rowKey="(item,index) => index"
      :pagination="pagination"
    >
      <template slot="semester" slot-scope="text,record">{{record.year}}年{{record.semester}}季</template>
      <template slot="week" slot-scope="text,record">第{{record.school_week}}周</template>
      <template
        slot="order_status"
        slot-scope="text,record"
      >{{{0:'未下单',1:'待确认',2:'已确认',3:'已撤回'}[record.order_status]}}</template>
      <template slot="action" slot-scope="text,record">
        <template v-if="record.order_status == 1">
          <a-button type="link" @click="$router.push(`dealInfo/${record.id}`)">查看</a-button>
           <a-button v-if="record.order_status!=2" type="link" @click="cancelOrder(record.id)">撤回</a-button>
        </template>
        <template v-else-if="record.order_status == 2">
          <a-button type="link" @click="$router.push(`dealInfo/${record.id}`)">查看</a-button>
        </template>
        <template v-else>
          <a-button type="link" @click="$router.push(`deal/${record.id}`)">下单</a-button>
        </template>

        <!-- <a-button
          v-if="record.order_status == 2 || record.order_status == 1"
          type="link"
          @click="$router.push(`dealInfo/${record.id}`)"
        >查看</a-button>
        <a-button v-if="record.order_status!=2" type="link" @click="cancelOrder(record.id)">撤回</a-button>
        <a-button
          type="link"
          v-if="record.order_status == 3 && record.order_status == 0"
          @click="$router.push(`deal/${record.id}`)"
        >下单</a-button> -->
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "学期",
          dataIndex: "semester",
          scopedSlots: { customRender: "semester" },
        },
        {
          title: "周",
          dataIndex: "week",
          scopedSlots: { customRender: "week" },
        },
        { title: "时间", dataIndex: "time" },
        { title: "就餐学校", dataIndex: "school_name" },
        { title: "种类数量", dataIndex: "species" },
        { title: "下单时间", dataIndex: "create_time" },
        {
          title: "状态",
          dataIndex: "order_status",
          scopedSlots: { customRender: "order_status" },
        },
        {
          title: "操作按钮",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
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
          this.searchForm.page_size = size;
          this.pagination.pageSize = size;
          this.search(1);
        },
        pageSizeOptions: this.$commonJs.PAGE_LINES,
        showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
      },
      searchForm: {
        page_no: 1,
        page_size: Number(this.$commonJs.PAGE_LINES[0]),
        supplier_id: "",
        school_id: "",
        order_status: "",
        semester: "",
      },
      //数据
      loading: false,
      tableData: [],
      allSchool: [],
      yearData: [],
      weekData: [],
    };
  },
  mounted() {
    this.search(1);
    //获取所有学校
    this.$commonJs.getSchool((res) => {
      this.allSchool = res;
    });
    //获取周，年份，学期
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
        this.search(1);
      });
    },
    search(data) {
      this.loading = true;
      if (data) {
        this.searchForm.page_no = data;
        this.pagination.current = data;
      }
      this.$http
        .procurement_orderPro_byPlan_list(this.searchForm)
        .then((res) => {
          this.loading = false;
          this.tableData = res.data.data || [];
          this.pagination.total = res.data.total;
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
@import "../../../../assets/css/Procurement/common.scss";
</style>
