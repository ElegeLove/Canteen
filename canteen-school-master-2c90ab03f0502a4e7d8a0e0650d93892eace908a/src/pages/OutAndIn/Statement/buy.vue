<template>
  <div>
    <!-- 定点采购汇总 -->
    <!-- 搜索 -->
    <div class="my-search bottom-20">
      <div class="my-search-item">
        <div class="title">供应商:</div>
        <a-select
          v-model="searchForm.supplier_id"
          style="width: 160px"
          @change="search(1)"
        >
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item, index) in allSuplier"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </div>
      <div class="my-search-item">
        <div class="title">学期:</div>
        <a-select
          v-model="searchForm.calendar_id"
          style="width: 160px"
          @change="getWeekData(searchForm.calendar_id)"
        >
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item, index) in yearData"
            :key="index"
            :value="item.id"
            >{{ item.year }}年{{ item.semester }}</a-select-option
          >
        </a-select>
      </div>
      <!--      <div class="my-search-item">
        <div class="title">周:</div>
        <a-select allowClear v-model="searchForm.start_week" :disabled="!searchForm.semester" placeholder="选择周" style="width: 160px"
          @change="search(1)">
          <a-select-option v-for="(item,index) in weekData" :key="index" :value="item.id">第{{item.weeks}}周</a-select-option>
        </a-select>
        <span class="left-10 right-10">——</span>
        <a-select allowClear v-model="searchForm.end_week" placeholder="选择周" :disabled="!searchForm.semester" style="width: 160px"
          @change="search(1)">
          <a-select-option v-for="(item,index) in weekData" :key="index" :value="item.id">第{{item.weeks}}周</a-select-option>
        </a-select>
      </div> -->
      <!-- <div class="my-search-item">
        <a-button type="primary" @click='handleMade()'>生成报表</a-button>
      </div> -->
    </div>

    <!-- 数据 start -->
    <a-table
      :columns="columns"
      :data-source="tableData"
      bordered
      :rowKey="(item, index) => index"
      :pagination="pagination"
      :loading="loading"
    >
      <template slot="index" slot-scope="text, record, index">{{
        index + 1
      }}</template>
      <template slot="action" slot-scope="text, record">
        <a-button type="link" @click="exportTable(record)">导出表格</a-button>
        <a-button type="link" @click="printFun(record, 'printTable')"
          >打印表格</a-button
        >
        <a-button
          type="link"
          @click="
            $router.push(
              `info?central_id=${record.central_id}&supplier_id=${record.supplier_id}&week_id=${record.week_id}&supplier_name=${record.name}&calendar_id=${record.calendar_id}&month=${record.month}`
            )
          "
          >查看</a-button
        >
      </template>
    </a-table>
    <!-- 数据 -end -->
    <buy-table :info="printData.list"  :base-info="printData.info"></buy-table>
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
          title: "序号",
          dataIndex: "index",
          scopedSlots: {
            customRender: "index",
          },
        },
        {
          title: "年份",
          dataIndex: "year",
        },
        {
          title: "学期",
          dataIndex: "semester",
        },
        {
          title: "月",
          dataIndex: "month",
        },
        {
          title: "供应商",
          dataIndex: "name",
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            customRender: "action",
          },
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
      allSuplier: [],
      weekData: [],
      yearData: [],
      searchForm: {
        supplier_id: "",
        calendar_id: "",
        start_week: "",
        end_week: "",
        page_no: 1,
        page_size: Number(this.$commonJs.PAGE_LINES[0]),
      },
      tableData: [],
      loading: false,
      printData: {},
    };
  },
  mounted() {
    //获取所有供应商
    this.$http.procurement_supplierList().then((res) => {
      this.allSuplier = res.data;
    });
    this.getWeekData("", (res) => {
      this.yearData = res.data;
      // this.getWeekData(res.data[0].id, (response) => {
      //   this.weekData = response.data;
      // });
    });

    this.search(1);
  },
  methods: {
    printFun(obj, id) {
      this.$http
        .fixedPurchaseDetails({
          central_id: obj.central_id,
          supplier_id: obj.supplier_id,
          week_id: obj.week_id,
          calendar_id :obj.calendar_id,
          month:obj.month
        })
        .then((res) => {
          this.printData = res.data;
          setTimeout(() => {
            printJS({
              printable: id,
              type: "html",
              // targetStyles: ["*"],
              ignoreElements: ["no-print", "bc", "gb"],
            });
          }, 1500);
        });
    },
    exportTable(obj) {
      location.href = obj.export_url;
      // this.$http.fixedPurchase_export({
      //   supplier_id: obj.supplier_id,
      //   central_id: obj.central_id,
      //   month: obj.month,
      //   year: obj.year,
      //   semester: obj.semester,
      // });
    },
    getWeekData(id, callback) {
      this.searchForm.start_week = undefined;
      this.searchForm.end_week = undefined;
      this.$http
        .weekData({
          id: id,
        })
        .then((res) => {
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
        this.searchForm.page_no = data;
        this.pagination.current = data;
      }
      this.$http.fixedPurchase(this.searchForm).then((res) => {
        this.tableData = res.data.data || [];
        this.loading = false;
        this.pagination.total = res.data.total;
      });
    },
    // handleMade() {
    //   if (!this.searchForm.start_week || !this.searchForm.end_week) {
    //     this.$message.warning('请选择时间范围，再点击生成报表')
    //     return
    //   }
    // }
  },
};
</script>


<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
</style>
