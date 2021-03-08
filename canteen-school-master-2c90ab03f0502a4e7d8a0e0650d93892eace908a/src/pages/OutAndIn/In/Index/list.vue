<template>
  <div class="my-container">
    <div class="bottom-20">
      <a-button type="primary" @click="$router.push('add')">自购入库</a-button>
    </div>

    <!-- 搜索 -->
    <div class="my-search bottom-20">
      <div class="my-search-item">
        <div class="title">学校:</div>
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
          v-model="searchForm.calendar_id"
          style="width: 120px"
          @change="getWeekData(searchForm.calendar_id)"
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
          :disabled="!searchForm.calendar_id"
          placeholder="选择周"
          style="width: 120px"
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
          :disabled="!searchForm.calendar_id"
          placeholder="选择周"
          style="width: 120px"
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
        <a-select v-model="searchForm.supplier_id" style="width: 120px" @change="search(1)">
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item,index) in allSuplier"
            :key="index"
            :value="item.id"
          >{{item.name}}</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="total_amount">
    	<div>金额合计(元)：</div>
    	<span>{{total_priced}}</span>
    </div>
    <!-- 数据 -->
    <a-table
      :columns="columns"
      :data-source="tableData"
      bordered
      :rowKey="(item,index) => index"
      :pagination="pagination"
      :loading="loading"
    >
      <template slot="weeks" slot-scope="text, record">第{{record.weeks}}周</template>
      <template slot="semester" slot-scope="text, record">{{record.semester}}</template>

      <template slot="confirm_status" slot-scope="text, record">{{record.confirm_status}}</template>
      <template slot="action" slot-scope="text, record">
        <a-button
          v-if="record.confirm_status == '已入库'"
          type="link"
          @click="$router.push(`warrant?id=${record.id}&type=${record.buy_type}`)"
        >查看入库单</a-button>
        <a-button
          v-else
          type="link"
          @click="$router.push(`confirm?id=${record.id}&school_type=${record.school_type}`)"
        >确认入库</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { title: "所属订单编号", dataIndex: "order_sn" },
        { title: "学校", dataIndex: "school_name" },
        {
          title: "学期",
          dataIndex: "semester",
          scopedSlots: { customRender: "semester" },
        },
        { title: "周", dataIndex: "weeks",  scopedSlots: { customRender: "weeks" }, },
        { title: "供应商", dataIndex: "supplier_name" },
        { title: "金额（元）", dataIndex: "price_total" },

        { title: "入库类型", dataIndex: "buy_type_text" },
        {
          title: "状态",
          dataIndex: "confirm_status",
          scopedSlots: { customRender: "confirm_status" },
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
      //数据
      allSchool: [], //所有学校
      allSuplier: [], //所有供应商
      loading: false,
      searchForm: {
        page_no: 1,
        page_size: Number(this.$commonJs.PAGE_LINES[0]),
        supplier_id: "",
        school_id: "",
        calendar_id: "",
      },
      tableData: [],
      yearData: [],
      weekData: [],
      total_priced:0
    };
  },
  mounted() {
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
      console.log(data)
      this.loading = true;
      if (data) {
        this.searchForm.page_no = data;
        this.pagination.current = data;
      }
      this.$http.outAndIn_inList(this.searchForm).then((res) => {
        this.loading = false;
        this.tableData = res.data.list || [];
        this.total_priced = res.data.total_price;
        this.pagination.total = res.data.total_count;
      });
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../../assets/css/Procurement/common.scss";

.in_list_btns {
  padding: 10px;
  button {
    width: 144px;
  }
}
.total_amount{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-right: 15px;
		margin-bottom: 10px;
    margin-top: -10px;
	}
	.total_amount>span{
		color: red;
	}
</style>
