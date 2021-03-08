<template>
  <div class="my-container">
    <div class="my-search bottom-20">
      <div class="my-search-item">
        <a-input v-model="searchForm.id" placeholder="入库编号"></a-input>
      </div>
      <div class="my-search-item">
        <a-button type="primary" @click="search(1)">搜索</a-button>
      </div>
    </div>

    <!-- 搜索 -->
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
        <a-select v-model="searchForm.school_id" style="width: 140px" @change="search(1)">
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item,index) in allSchool"
            :key="index"
            :value="item.id"
          >{{item.full_name}}</a-select-option>
        </a-select>
      </div>
      <div class="my-search-item bottom-20">
        <div class="title">供应商:</div>
        <a-select v-model="searchForm.supplier_id" style="width: 120px" @change="search(1)">
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item,index) in allSuplier"
            :key="index"
            :value="item.supplier_id"
          >{{item.name}}</a-select-option>
        </a-select>
      </div>
      <div class="my-search-item bottom-20">
        <div class="title">入库方式:</div>
        <a-select v-model="searchForm.warehousing_type" style="width: 120px" @change="search(1)">
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item,index) in allMethods"
            :key="index"
            :value="item.warehousing_type"
          >{{item.name}}</a-select-option>
        </a-select>
      </div>
      <div class="my-search-item bottom-20">
        <div class="title">入库日期:</div>
         <a-date-picker valueFormat="YYYY-MM-DD" @change="search(1)" placeholder="选择日期" v-model="searchForm.start_time" />
         <span>—</span>
         <a-date-picker valueFormat="YYYY-MM-DD" @change="search(1)" placeholder="选择日期" v-model="searchForm.end_time" />
      </div>
    </div>

    <!--  -->
    <a-table
      :columns="columns"
      :scroll="{ x: 1500, y: 500 }"
      :data-source="tableData"
      bordered
      :rowKey="(item,index) => index"
      :pagination="pagination"
      :loading="loading"
    >
      <template
        slot="warehousing_type"
        slot-scope="text, record"
      >{{{0:'未入库',1:'配送入库',2:'自购入库',3:'盘盈入库',4:'入库即出库'}[record.warehousing_type]}}</template>
      <div slot="actions" class="actiosn main_color curpoter" slot-scope="text, record">
        <span @click="lookSup(record)" v-if="record.warehousing_type==2">查看供应商</span>
      </div>
    </a-table>
    <a-modal
      v-model="model_show"
      title="查看"
      centered
      width="700px"
      cancelText="关闭"
      @ok="() => (model_show = false)"
    >
     <a-spin :spinning="modelLoading">
      <div class="model_box">
        <div>
          <div>供应商名称:</div>
          <div>{{superInfo.supplier_name}}</div>
        </div>
        <div>
          <div>食品经营许可证编码:</div>
          <div>{{superInfo.food_business_license}}</div>
        </div>
        <div>
          <div>统一社会信用代码:</div>
          <div>{{superInfo.code}}</div>
        </div>
        <div>
          <div>供应商地址:</div>
          <div>{{superInfo.supplier_address}}</div>
        </div>
        <div>
          <div>联系方式:</div>
          <div>{{superInfo.supplier_phone}}</div>
        </div>
        <div></div>
      </div>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model_show:false,
      modelLoading:true,
      columns: [
        { title: "入库编号", dataIndex: "warehousing_sn",fixed: 'left',width:130,align:"center"},
        { title: "学校", dataIndex: "school_name",
          width:"10%",align:"center"
        },
        { title: "产品代码", dataIndex: "product_code",
          width:"7%",align:"center"
        },
        { title: "产品名称", dataIndex: "product_name",
          width:"6%",align:"center"
        },
        { title: "所属订单编号", dataIndex: "order_sn",
          width:"15%",align:"center"
        },
        { title: "供应商", dataIndex: "supplier_name",
          width:"8%",align:"center"
        },
        { title: "生产日期", dataIndex: "production_time",
          width:"7%",align:"center"
        },
        { title: "保质期至", dataIndex: "expiration_time",
          width:"7%",align:"center"
        },
        { title: "计量单位", dataIndex: "unit_meterage",
          width:"5%",align:"center"
        },
        { title: "入库数量", dataIndex: "now_count",
          width:"6%",align:"center"
        },
        { title: "单价（元）", dataIndex: "unit_price",
          width:"6%",align:"center"
        },
        { title: "金额（元）", dataIndex: "total_price",
          width:"6%",align:"center"
        },
        { title: "入库时间", dataIndex: "warehousing_time",
          width:"7%",align:"center"
        },
        {
          title: "入库方式",
          dataIndex: "warehousing_type",
          scopedSlots: { customRender: "warehousing_type" },
          width:"6%",align:"center"
        },
        {
          title: "操作",
          dataIndex: "actions",
          scopedSlots: { customRender: "actions" },
          width:110,align:"center"
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
      loading: false,
      allSchool: [],
      allSuplier: [],
      allMethods:[],
      tableData: [],
      searchForm: {
        page_no: 1,
        page_size: Number(this.$commonJs.PAGE_LINES[0]),
        calendar_id: "",
        supplier_id: "",
        school_id: "",
        warehousing_type:''
      },
      superInfo:{},
      weekList:[]
    };
  },
  mounted() {
    //获取所有学校
    this.$commonJs.getSchool((res) => {
      this.allSchool = res;
    });
    //获取所有供应商
    this.$http.SupplierLists({ cooperation: 1 }).then((res) => {
      this.allSuplier = res.data;
    });
    //获取入库方式
    this.$http.outAndIn_inMethod().then(res=>{
      this.allMethods = res.data.type ||[];
    })

    this.search();
    this.getWeek();
  },
  methods: {
    lookSup(item){
       this.model_show = true;
       this.modelLoading = true;
       this.$http.DistributionSelfPurchaseSupplier({id:item.id}).then((res)=>{
         this.modelLoading = false;
         if(res.code==1){
           this.superInfo = res.data;
         }
         console.log(res)
       })
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
    search(data) {
      this.loading = true;
      if (data) {
        this.searchForm.page_no = data;
        this.pagination.current = data;
      }
      this.$http.outAndIn_inRecord(this.searchForm).then((res) => {
        this.loading = false;
        this.tableData = res.data.list || [];
        this.pagination.total = res.data.total_count;
      });
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
/deep/ .ant-modal-footer{
  >div{
    >button:nth-of-type(2){
      display: none;
    }
  }
}
.model_box{
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 15px;
  color: #333333;
  >div{
    width: 33%;
    margin-bottom: 20px;
    >div:nth-of-type(2){
      margin-top: 7px;
    }
  }
}
.bottom-20{
  margin-bottom: 20px;
}
@import "../../../../assets/css/Procurement/common.scss";
</style>
