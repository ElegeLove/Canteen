<template>
  <div class="my-container">
    <!-- 搜索 start -->
    <div class="my-search bottom-20">
      <div class="my-search-item">
        <div class="title">学期:</div>
        <a-select
          v-model="searchForm.semester"
          default-value
          style="width: 120px"
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
          v-model="searchForm.status"
          placeholder="选择状态"
          style="width: 120px"
          @change="search(1)"
        >
          <a-select-option value>全部</a-select-option>
          <a-select-option :value="0">待编制</a-select-option>
          <a-select-option :value="1">已编制</a-select-option>
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
      :loading="loading"
    >
      <template slot="school_week" slot-scope="text, record">第{{record.school_week}}周</template>

      <template slot="action" slot-scope="text, record">
        <!-- 周预算表状态  budget_status  编制情况 0 待编制(未完成) 1 已编制(已完成) -->
        <!-- status   采购计划状态  0 未完成  1 已完成  2 编写中     -->
        <template v-if="record.budget_status==1&&record.status==1">
          <a-button type="link" @click="updateData(record)" :disabled="record.order_status==1 || record.order_status==2">修改</a-button>
          <a-button type="link" @click="exportData(record.id)" v-if="record.procurement_type!==1">导出</a-button>
          <a-button @click="printFun('printTable',record)" type="link" v-if="record.procurement_type!==1">打印</a-button>
          <a-button type="link" @click="goDetail(record)">查看</a-button>
        </template>
        <template v-if="record.budget_status==1&&record.status==0">
          <a-button type="link" @click="$router.push(`edit/${record.id}?type=week`)">按周编写</a-button>
          <a-button type="link" @click="$router.push(`byDay/${record.id}`)">按天编写</a-button>
        </template>

        <template v-if="record.budget_status==0&&record.status==0">
          <a-tooltip placement="topLeft" title="请先完成周食材预算表的编制">
            <a-button type="link" disabled>按周编写</a-button>
            <a-button type="link" disabled>按天编写</a-button>
          </a-tooltip>
        </template>
        <template v-if="record.budget_status==1&&record.status==2">
          <a-button type="link" @click="goDetail(record)">查看</a-button>
        </template>
      </template>
    </a-table>

    <print-table :info="prinTableInfo"></print-table>
  </div>
</template>

<script>
import print from "print-js";
import printTable from "@/pages/Procurement/Plan/components/printTable";
export default {
  components: {
    printTable,
  },
  data() {
    return {
      columns: [
        { title: "就餐学校", dataIndex: "school_name" },
        {
          title: "学期",
          dataIndex: "semester",
          scopedSlots: { customRender: "semester" },
        },
        {
          title: "周",
          dataIndex: "school_week",
          scopedSlots: { customRender: "school_week" },
        },
        { title: "时间", dataIndex: "time" },
        { title: "种类数量", dataIndex: "species" },
        { title: "周食材预算表", dataIndex: "budget_status_text" },
        { title: "本表状态", dataIndex: "status_text" },
        { title: "编制时间", dataIndex: "compile_time" },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          fixed: "right",
          align: "center",
          width: 300,
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
      loading: false,
      tableData: [],
      searchForm: {
        page: 1,
        pageSize: Number(this.$commonJs.PAGE_LINES[0]),
        semester: "",
        school_id: "",
        status: "",
        start_week: "",
        end_week: "",
      },
      allSchool: [],
      yearData: [],
      weekData: [],
      prinTableInfo: {},
    };
  },
  mounted() {
    //获取所有学校
    this.$commonJs.getSchool((res) => {
      this.allSchool = res;
    });
    //获取周，年份，学期
    this.$http.weekData({ id: "" }).then((res) => {
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
      this.$http.procurement_plan_list(this.searchForm).then((res) => {
        this.tableData = res.data.data || [];
        this.loading = false;
        this.pagination.total = res.data.total;
      });
    },
    exportData(id) {
      this.$http.procurement_plan_export({ id: id });
    },
    //打印
    printFun(tableId, obj) {
      let type = "";
      if (obj.procurement_type == 1) {
        type = "day";
      }else{
        type = "week";

      }
      this.$http.procurement_plan_updateDetail(type, { id: obj.id }).then((res) => {
        this.prinTableInfo = res.data;
        setTimeout(() => {
          printJS({
            printable: tableId,
            type: "html",
            // targetStyles: ["*"],
            ignoreElements: ["no-print", "bc", "gb"],
          });
        }, 1000);
      });
    },
    //详情
    updateData(obj) {
      //0 按周编写 1 按天编写
      if (obj.procurement_type == 1) {
        this.$router.push(`byDay/${obj.id}`);
      } else {
        this.$router.push(`update/${obj.id}?type=week`);
      }
    },
    goDetail(obj) {
      //0 按周编写 1 按天编写
      if (obj.procurement_type == 1) {
        this.$router.push(`byDay/${obj.id}`);
      } else {
        this.$router.push(`info/${obj.id}?type=week`);
      }
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
</style>
