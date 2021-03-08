<template>
  <div class="my-container newsd">
    <!-- 进出库台帐 -->
    <!-- 搜索 -->
    <div class="my-search bottom-20">
      <div class="btn_box">
        <div @click="checkType(1)" :class="{'active':searchForm.buy_type==1}">定点供应商</div>
        <div @click="checkType(2)" :class="{'active':searchForm.buy_type==2}">非定点供应商</div>
      </div>
      <div class="datesd">
        <span>学期：</span>
        <a-select
            style="width: 120px"
            v-model="searchForm.calendar_id"
            @change="search(1)"
            placeholder="请选择"
          >
            <a-select-option :value="item.id" v-for="(item,index) in semester" :key="index">{{item.year}}{{item.semester}}</a-select-option>
        </a-select>
      </div>
      <div class="my-search-item">
        <a-select default-value="产品代号" style="width: 120px">
          <a-select-option value="产品代号">产品代号</a-select-option>
        </a-select>
        <a-input placeholder="请输入" v-model="searchForm.product_code"></a-input>
      </div>
      <div class="my-search-item">
        <a-button type="primary" @click="search(1)">搜索</a-button>
      </div>
      <div class="my-search-item">
        <a-button type="primary" @click="prints">打印</a-button>
      </div>
     <div class="my-search-item">
        <a-button type="primary" @click="exportTab">导出</a-button>
      </div>
    </div>
    <!-- 数据 start -->
    <a-table :columns="columns"
     :loading="loading"
     :scroll="{y: 600 }"
     :data-source="data" bordered :pagination="pagination" :rowKey="(item,index) => index">
      <template slot="action" slot-scope="text,record">
        <a-button type="link" @click="$router.push(`info?id=${record.id}&supplier_product_id=${record.supplier_product_id}&calendar_id=${record.calendar_id}`)">查看</a-button>
      </template>
    </a-table>
    <!-- 数据 -end -->
    <all-print :info='tableData'></all-print>
  </div>
</template>

<script>
  import allPrint from "./components/allPrint.vue"
  export default {
    data() {
      return {
        semester:[],
        columns: [{
            title: "产品类目",
            dataIndex: "pid_name"
          },
          {
            title: "产品代码",
            dataIndex: "code"
          },
          {
            title: "产品名称",
            dataIndex: "name"
          },
          {
            title: "产地品牌生产商",
            dataIndex: "manufacturer"
          },
          {
            title: "等级规格",
            dataIndex: "grade"
          },
          {
            title: "供应商",
            dataIndex: "supplier_name"
          },
          // {
          //   title: "计量单位",
          //   dataIndex: "unit"
          // },
          {
            title: "操作",
            dataIndex: "action",
            scopedSlots: {
              customRender: "action"
            },
          },
        ],
        pagination: {
          current: 1,
          pageSize: 10, //每页中显示数据
          total: 0,
          showSizeChanger: false,
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
        //数据
        data: [],
        searchForm: {
          page: 1,
          buy_type:1,
          calendar_id:undefined,
          pageSize: 10,
        },
        tableData:[]
      };
    },
    components: {
      allPrint,
    },
    mounted() {
      this.getSemester()
    },
    methods: {
      prints(){           //打印
        this.$store.commit("sch_setLoaing",true)
        this.$http.DistributionStandingBookPrint(this.searchForm).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.tableData = res.data;
            setTimeout(() => {
              printJS({
                printable: "printTable",
                type: "html",
                targetStyles: ["*"],
                ignoreElements: ["no-print", "bc", "gb"],
                style:"@media print{@page{size: A4 landscape;margin-left:23mm;margin-right:17mm;margin-bottom:10mm;}.ass{page-break-after:always !important;}}"
              });
            }, 1000);
          }
        })
      },
      exportTab(){              //导出
        var post_data = JSON.parse(JSON.stringify(this.searchForm));
        post_data.school_id = localStorage.getItem("school_id");
        this.$http.ExportStandingBookExport(post_data)
      },
      getSemester(){    //获取日期
        this.$http.weekData({ id: "" }).then((res) => {
          this.semester = res.data;
          this.searchForm.calendar_id = 1;
          this.search()
        });
      },
      checkType(id){           //切换类型
        this.searchForm.buy_type = id;
        this.search(1)
      },
      search(data) {
        this.loading = true;
        if (data) {
          this.searchForm.page = data;
          this.pagination.current = data;
        }
        this.$http.bookList(this.searchForm).then((res) => {
          this.loading = false;
          this.data = res.data.list || [];
          this.pagination.total = res.data.total_count;
        });

      },
    },
  };
</script>
<style scoped="scoped" lang="scss">
  @import "../../../assets/css/Procurement/common.scss";
  .newsd{
    overflow: hidden;
    height: 900px;
  }
  /deep/ .ant-table-wrapper{
    margin-bottom: 900px;
  }
 .btn_box{
   display: flex;
   align-items: center;
   >div{
     height: 32px;
     width: 100px;
     margin-right: 10px;
     border-radius:3px;
     text-align: center;
     line-height: 32px;
     border: 1px solid #ccc;
     font-size: 14px;
     cursor: pointer;
   }
 }
 .active{
   background-color: #02BB72;
   color: #fff;
 }
 .datesd{
   margin-right: 10px;
 }
</style>
