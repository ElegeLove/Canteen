<template>
  <div class="my-container">
    <!-- 搜索 start -->
    <div class="my-search bottom-20">
      <div class="my-search-item">
        <div class="title">出库编号:</div>
        <a-input
          v-model="searchForm.code"
          placeholder="出库编号"
          class="right-10"
        ></a-input>
        <a-button type="primary" @click="search(1)">搜索</a-button>
      </div>
      <div class="my-search-item">
        <!-- <div class="title">导出日期:</div>
        <a-date-picker class="right-10" @change="search('date')" /> -->
        <a-button
          icon="printer"
          class="right-10"
          @click="printFun('printTable')"
          >打印</a-button>
        <!-- <a-button icon="download" type="primary" @click="expotTable()"
          >导出</a-button -->
      </div>
    </div>
    <div class="my-search bottom-20">
      <div class="my-search-item bottom-20">
        <div class="title">学期:</div>
        <a-select
          v-model="searchForm.calendar_id"
          default-value
          style="width: 120px"
          @change="getWeekData"
        >
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item,index) in weekList"
            :key="index"
            :value="item.id"
          >{{item.year}}{{item.semester}}</a-select-option>
        </a-select>
      </div>
      <div class="my-search-item bottom-20">
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
      <div class="my-search-item bottom-20">
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
      <div class="my-search-item bottom-20">
        <div class="title">出库类型:</div>
        <a-select
          v-model="searchForm.type"
          style="width: 120px"
          @change="search(1)"
        >
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item, index) in outMethods"
            :key="index"
            :value="item.type"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </div>
      <div class="my-search-item bottom-20">
        <div class="title">出库日期:</div>
        <a-date-picker
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          v-model="searchForm.start_time"
          @change="search(1)"
        />
        <span class="left-10 right-10">——</span>
        <a-date-picker
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          v-model="searchForm.end_time"
          @change="search(1)"
        />
      </div>
    </div>
    <!-- 搜索 -end -->
    <div class="total_amount">
    	<div>金额合计(元)：</div>
    	<span>{{total_priced}}</span>
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
      <template slot="action" slot-scope="text, record">
        <a-button type="link" @click="$router.push(`info/${record.id}`)"
          >查看</a-button
        >
      </template>
    </a-table>
    <!-- 数据 -end -->
    <outtable :info="printData"></outtable>
  </div>
</template>

<script>
import {getLodop} from '../../../../assets/js/LodopFuncs'
import outtable from "../../components/outTable.vue";
export default {
  components: {
    outtable,
  },
  data() {
    return {
      columns: [
        {
          title: "出库编号",
          dataIndex: "code",
        },
        {
          title: "学校",
          dataIndex: "school_name",
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
          title: "所属订单编号",
          dataIndex: "order_sn",
        },
        {
          title: "供应商",
          dataIndex: "supplier_name",
        },
        {
          title: "计量单位",
          dataIndex: "unit_meterage",
        },
        {
          title: "出库数量",
          dataIndex: "out_count",
        },
        {
          title: "单价（元）",
          dataIndex: "unit_price",
        },
        {
          title: "金额（元）",
          dataIndex: "now_count",
        },
        {
          title: "出库时间",
          dataIndex: "out_time",
        },
        {
          title: "出库方式",
          dataIndex: "type_name",
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: {
            customRender: "action",
          },
          fixed: "right",
          width: "100px",
        },
      ],
      //数据
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
      loading: false,
      tableData: [],
      searchForm: {
        page_no: 1,
        page_size: Number(this.$commonJs.PAGE_LINES[0]),
        calendar_id: "",
        supplier_id: "",
        school_id: "",
        type: "",
      },
      total_priced:0,
      allSchool: [],
      allSuplier: [],
      outMethods: [],
      printData: {},
      weekList:[],
      styles:`
        td{
          text-align: center;
          color: #000000;
        }
        .titles{
          text-align: center;
          font-weight: bold;
          font-size: 24px;
          color: #000000;
          margin-bottom: 15px;
          transform: scale(1.2);
          box-sizing: border-box;
          padding-left: 60px;
          font-family:'微软雅黑';
        }
        .peersons{
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0 40px 0 15px;
          font-size: 15px;
          color: #000000;
          font-family:'微软雅黑';
          margin-bottom: 10px;
        }
        .peersons>span{
          font-family:'微软雅黑';
          transform-origin:20% 50% !important;
          display: inline-block;
          transform: scale(0.9);
          white-space: nowrap;
          letter-spacing: 5px;
        }
        .foots{
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          flex-wrap: wrap;
          padding: 0 60px 0 15px;
          font-size: 15px;
          margin-top:10px;
          color: #000000;
        }
        .foots>span{
          font-family:'微软雅黑' !important;
          transform-origin:20% 50% !important;
          display: inline-block;
          transform: scale(0.8);
          white-space: nowrap;
          letter-spacing: 5px;
        }
        tbody>tr{
          height: 47.5px !important;
        }
        tbody>tr>td{
          height: 47.5px !important;
          font-size: 15px;
         position: relative !important;
        }
        tbody>tr>td>span{
          font-family:'微软雅黑' !important;
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center;
          height: 47.5px !important;
          letter-spacing: 5px;
          word-break:break-all !important;
          transform: scale(0.7);
        }
        thead>tr{
         height: 56px !important;
        }
        .headers>tr>td{
          height: 56px !important;
          font-size: 15px;
          box-sizing: border-box;
          padding: 0px 0;
        }
        .headers>tr>td>span{
          letter-spacing: 5px;
          font-family:'微软雅黑';
          transform-origin:20% 50% !important;
          white-space: nowrap;
          display: inline-block;
          transform: scale(0.8);
        }
        #printTable{
          position:absolute;
          width: 100%;
          z-index: -1;
          top: 0;
          left: 0;
        }
        .lists{
          height: 646px !important;
        }
      `
    };
  },
  mounted() {
    this.search(1);
    //获取所有学校
    this.$commonJs.getSchool((res) => {
      this.allSchool = res;
    });
    //获取所有供应商
    this.$http.procurement_supplierList().then((res) => {
      this.allSuplier = res.data;
    });
    //出库类型
    this.$http.outAndIn_outMethod().then((res) => {
      this.outMethods = res.data.type || [];
    });
     this.getWeek();
  },
  methods: {
    printFun(id) {
      let printForm = JSON.parse(JSON.stringify(this.searchForm));
      printForm.printing = 1;
      this.$http.outAndIn_outRecord(printForm).then((res) => {
        this.printData = res.data;
         setTimeout(()=>{
            var LODOP=getLodop();
            LODOP.PRINT_INIT("test");
            LODOP.SET_PRINT_PAGESIZE (1,'210.6mm','140mm',2);//设置纸张大小
            LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width");//设置页面缩放
            var strBodyStyle = strBodyStyle = "<style>" + this.styles + "</style>";
            var strFormHtml = strBodyStyle + "<body>" + document.getElementById(id).innerHTML + "</body>";
            LODOP.ADD_PRINT_HTM(10,3,"100%","100%",strFormHtml);//设置页面填充内容
            LODOP.PREVIEW();
          },400)
      });
    },
    getWeek(){
        //获取周，年份，学期
        this.$http.weekData({ id: "" }).then((res) => {
          this.weekList = res.data;
        });
      },
    getWeekData(){
      this.searchForm.page_no = 1;
      this.search();
    },
    expotTable() {
      let form = JSON.parse(JSON.stringify(this.searchForm));
      form.central_id = localStorage.getItem("school_id");
      this.$http.outAndIn_outRecord_export(form);
    },
    search(data) {
      this.loading = true;
      if (data!=="date") {
        this.searchForm.page_no = data;
        this.pagination.current = data;
      }
      this.$http.outAndIn_outRecord(this.searchForm).then((res) => {
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
