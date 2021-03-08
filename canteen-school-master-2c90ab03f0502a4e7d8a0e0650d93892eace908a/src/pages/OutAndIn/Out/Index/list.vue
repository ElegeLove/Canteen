<template>
  <div class="my-container">
    <!-- 搜索 start -->
    <div class="my-search bottom-20">
      <div class="my-search-item">
        <div class="title">出库:</div>
        <a-button type="primary" @click="goOut" class="right-20"
          >选择食材出库</a-button
        >
        <a-button type="primary" @click="$router.push('recipe')"
          >按食谱出库</a-button
        >
      </div>
    </div>
    <div class="my-search bottom-20">
      <div class="my-search-item">
        <div class="title">产品:</div>
        <a-select
          v-model="searchType"
          class="right-10"
          style="width: 120px"
          @change="changeSearchType()"
        >
          <a-select-option :value="1">产品代码</a-select-option>
          <a-select-option :value="2">产品名称</a-select-option>
        </a-select>
        <a-input
          v-if="searchType == 2"
          v-model="searchForm.product_name"
          placeholder="请输入产品名称"
        ></a-input>
        <a-input
          v-else
          v-model="searchForm.product_code"
          placeholder="请输入产品代码"
        ></a-input>
        <a-button type="primary" class="right-10" @click="search(1)"
          >搜索</a-button
        >
      </div>
   <!--   <div class="my-search-item">
        <a-button
          icon="printer"
          class="right-10"
          @click="printTable('indexTable')"
          >打印盘存表</a-button
        >
        <a-button
          icon="download"
          type="primary"
          @click="exportTable()"
          class="right-10"
          >导出盘存表</a-button
        >
      </div> -->
    </div>
    <div class="my-search bottom-20">
      <div class="my-search-item">
        <div class="title">学校:</div>
        <a-select
          v-model="searchForm.school_id"
          style="width: 140px"
          @change="search(1)"
        >
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item, index) in allSchool"
            :key="index"
            :value="item.id"
            >{{ item.full_name }}</a-select-option
          >
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
            v-for="(item, index) in yearData"
            :key="index"
            :value="item.id"
            >{{ item.year }}{{ item.semester }}</a-select-option
          >
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
            v-for="(item, index) in weekData"
            :key="index"
            :value="item.id"
            >第{{ item.weeks }}周</a-select-option
          >
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
            v-for="(item, index) in weekData"
            :key="index"
            :value="item.id"
            >第{{ item.weeks }}周</a-select-option
          >
        </a-select>
      </div>
      <div class="my-search-item">
        <div class="title">供应商:</div>
        <a-select
          v-model="searchForm.supplier_id"
          style="width: 120px"
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
    </div>
    <!-- 搜索 -end -->
    <!-- 数据 start -->
    <a-table
      :columns="columns"
      :data-source="tableData"
      bordered
      :rowKey="(item, index) => item.id"
      :pagination="pagination"
      :loading="loading"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <template slot="semester_name" slot-scope="text, record"
        >{{ record.year }}年{{ record.semester_name }}</template
      >
      <template slot="weeks" slot-scope="text, record"
        >第{{ record.weeks }}周</template
      >
      <template slot="expiration" slot-scope="text, record">
        <span v-if="record.expiration == 0">正常</span>
        <span v-if="record.expiration == 1">即将过期</span>
        <span v-if="record.expiration == 2">已过期</span>
      </template>
      <template slot="action" slot-scope="text, record">
        <a-button type="link" @click="openOutData(record)">出库</a-button>
        <!-- <a-button type="link" @click="openPCXZ(record.id)">盘存修正</a-button> -->
      </template>
    </a-table>
    <!-- 数据 -end -->
    <index-table :list='printData'></index-table>

    <!-- 盘存修正 -弹窗 -->
    <a-modal
      title="盘存修正"
      :visible="visiblePCXZ"
      :confirm-loading="confirmLoading"
      @ok="submitPCXZ"
      @cancel="cancelPCXZ"
    >
      <div>
        <a-radio-group name="radioGroup" v-model="pcxzData.type">
          <a-radio :value="1">盘盈</a-radio>
          <a-radio :value="2">盘亏</a-radio>
        </a-radio-group>
        <div class="top-20">
          数量
          <a-input
            style="width: 160px"
            v-model="pcxzData.number"
            placeholder="请输入数量"
          ></a-input>
        </div>
      </div>
    </a-modal>
    <!-- 出库弹窗 -->
    <a-modal
    :zIndex="80"
      title="出库"
      :visible="visibleOutData"
      :confirm-loading="confirmOutDataLoading"
      @ok="submitOutData"
      @cancel="cancelOutData"
    >
      <div>
        <div class="top-20">
          出入库量：
          <a-input class="inps"
           @change="iptReg"
           v-model="outData.number" :min="0" />
          {{ checkOutObj.unit_meterage }}
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import indexTable from "../../components/indexTable.vue";
export default {
  components: {
    indexTable,
  },
  data() {
    return {
      columns: [
        {
          title: "订单编号",
          dataIndex: "order_sn",
        },
        {
          title: "学期",
          dataIndex: "semester_name",
          scopedSlots: {
            customRender: "semester_name",
          },
        },
        {
          title: "周",
          dataIndex: "weeks",
          scopedSlots: {
            customRender: "weeks",
          },
        },
        {
          title: "产品代码",
          dataIndex: "product_code",
        },
        {
          title: "产品名称",
          dataIndex: "product_name",
        },
        {
          title: "供应商",
          dataIndex: "supplier_name",
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
          title: "生产日期",
          dataIndex: "production_time",
        },
        {
          title: "保质期至",
          dataIndex: "expiration_time",
        },
        {
          title: "计量单位",
          dataIndex: "unit_meterage",
          width: "70px",
        },
        {
          title: "库存量",
          dataIndex: "stock",
        },
        {
          title: "食材状态",
          dataIndex: "expiration",
          scopedSlots: {
            customRender: "expiration",
          },
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            customRender: "action",
          },
          fixed: "right",
          width: "150px",
        },
      ],
      selectedRowKeys: [],
      // 数据
      tableData: [],
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
      yearData: [],
      weekData: [],
      allSuplier: [], //所有供应商
      allSchool: [],
      searchType: 1,
      searchForm: {
        page_no: 1,
        page_size: Number(this.$commonJs.PAGE_LINES[0]),
        product_code: "",
        product_name: "",
        calendar_id: "",
        school_id: "",
        supplier_id: "",
        start_week: "",
        end_week: "",
      },
      //盘存修正
      visiblePCXZ: false,
      pcxzData: {
        id: [],
        type: 1,
        number: "",
      },
      confirmLoading: false,
      //出库
      outData: {
        number: 1,
        id: [],
      },
      confirmOutDataLoading: false,
      checkOutObj: {},
      visibleOutData: false,
      printData:[],
      loading:false
    };
  },
  mounted() {
    // this.search(1);
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
        this.search(1);
      });
    });
  },
  methods: {
    iptReg(e){         //输入验证
      var vals = e.target.value;
      var newVal = this.$commonJs.regMoneyOnes(vals);
      e.target.value = newVal;
      this.outData.number = newVal;
    },
    printTable(id) {
      let printForm = JSON.parse(JSON.stringify(this.searchForm));
      printForm.printing = 1;
      this.$http.outAndIn_outList(printForm).then((res) => {
        this.printData = res.data;
        setTimeout(() => {
          printJS({
            printable: id,
            type: "html",
            // targetStyles: ["*"],
            ignoreElements: ["no-print", "bc", "gb"],
            // style: "@media print{@page {size:landscape}}",
          });
        }, 1500);
      });
    },
    changeSearchType() {
      this.searchForm.product_code = "";
      this.searchForm.product_name = "";
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
            this.search(1);
          }
        });
    },
    search(data) {
      this.loading = true;
      if (data) {
        this.searchForm.page_no = data;
        this.pagination.current = data;
      }
      this.$http.outAndIn_outList(this.searchForm).then((res) => {
        this.tableData = res.data.list || [];
        this.pagination.total = res.data.total_count;
        this.loading = false;
      });
    },
    openPCXZ(id) {
      this.pcxzData.id.push(id);
      this.visiblePCXZ = true;
    },
    submitPCXZ() {
      if (!this.pcxzData.number) {
        this.$message.error("请输入数量");
        return;
      }
      this.confirmLoading = true;
      this.$http.inventoryCorrection(this.pcxzData).then((res) => {
        this.confirmLoading = false;
        if (res.code == 1) {
          this.search();
          this.cancelPCXZ();
        }
      });
    },
    cancelPCXZ() {
      (this.pcxzData = {
        id: [],
        type: 1,
        number: "",
      }),
        (this.visiblePCXZ = false);
    },
    //出库
    openOutData(obj) {
      this.checkOutObj = obj;
      this.visibleOutData = true;
      this.outData.id = obj.id;
    },
    submitOutData() {
      this.confirmOutDataLoading = true;
      let array = [];
      var newsData = JSON.parse(JSON.stringify(this.outData));
      newsData.number = Number(newsData.number)
      array.push(newsData);
      this.$store.commit("sch_setLoaing",true)
      this.$http.outAndIn_outSingleItem(array, 2).then((res) => {
        this.confirmOutDataLoading = false;
        if (res.code == 1) {
          this.search();
          this.cancelOutData();
        }
        this.$store.commit("sch_setLoaing",false)
      });
    },
    cancelOutData() {
      this.checkOutObj = {};
      this.visibleOutData = false;
      this.outData = {
        number: 1,
        id: [],
      };
    },
    //批量按食材出库
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    //按食材出库
    goOut() {
      if (this.selectedRowKeys.length == 0) {
        this.$message.warning("请选择产品");
        return;
      }
      this.$router.push(`temporary?ids=${this.selectedRowKeys.join(",")}`);
    },
    //导出
    exportTable() {
      let form = JSON.parse(JSON.stringify(this.searchForm));
      form.school_id = localStorage.getItem("school_id");
      this.$http.exportOutData(form);
    },
  },
};
</script>


<style scoped="scoped" lang="scss">
@import "../../../../assets/css/Procurement/common.scss";
.inps{
  width: 200px;
}
</style>
