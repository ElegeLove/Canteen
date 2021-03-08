<template>
  <div class="padd">
    <div class="sear_box">
      <div class="flexBox">
        <div>
          <span>学校：</span>
          <a-select
              default-value="全部"
              style="width: 120px"
              v-model="postData.school_id"
              @change="searchs"
            >
              <a-select-option :value="item.id" v-for="(item,index) in schoolData" :key="index">{{item.abbreviation}}</a-select-option>
          </a-select>
        </div>
        <div>
          <span>学期：</span>
          <a-select
              default-value="全部"
              style="width: 120px"
              v-model="postData.calendar_id"
              @change="calenChange('calendar_id')"
            >
              <a-select-option :value="item.id" v-for="(item,index) in semester" :key="index">{{item.year}}{{item.semester}}</a-select-option>
          </a-select>
        </div>
        <div  class="dateBox">
          <span>周：</span>
           <a-select
                placeholder="请选择"
                style="width: 150px"
                v-model="postData.start_weeks"
                :disabled="postData.calendar_id==''?true:false"
                @change="calenChange"
              >
                <a-select-option :value="item.id" v-for="(item,index) in weekData" :key="index">{{item.id==""?item.weeks:"第"+item.weeks+"周"}}</a-select-option>
            </a-select>
          <p>-</p>
          <a-select
               placeholder="请选择"
               style="width: 150px"
               v-model="postData.end_weeks"
               :disabled="postData.calendar_id==''?true:false"
               @change="calenChange"
             >
               <a-select-option :value="item.id" v-for="(item,index) in weekData" :key="index">{{item.id==""?item.weeks:"第"+item.weeks+"周"}}</a-select-option>
           </a-select>
        </div>
        <div>
          <span>结算状态：</span>
          <a-select
              default-value="全部"
              style="width: 120px"
              @change="searchs"
              v-model="postData.status"
            >
              <a-select-option :value="item.id" v-for="(item,index) in statusData" :key="index">{{item.name}}</a-select-option>
          </a-select>
        </div>
        <div>
          <span>供应商：</span>
          <a-select
              default-value="全部"
              style="width: 150px"
              @change="searchs"
              v-model="postData.supplier_id"
            >
              <a-select-option :value="item.id" v-for="(item,index) in allSuplier" :key="index">{{item.name}}</a-select-option>
          </a-select>
        </div>
         <timeSelection title="配送时间" @getTims="getTims"/>
        <div>
          <a-button type="primary" @click="sendSets">发起结算</a-button>
        </div>
      </div>
    </div>
    <div>
    	<div class="checkTis">
    		<div>
    			<span>金额合计（元）：</span>
    			<span>{{tab_objs.total_price}}</span>
    		</div>
    		<div @click="checkTypes" class="main_color">{{typeShow?'收起':'展开'}}分类小计</div>
    	</div>
    	<div class="type_arr" v-show="typeShow">
    		<div v-for="(item,index) in tab_objs.catePrice" :key="index">{{item.product}}：{{item.price}}元</div>
    	</div>
    </div>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange,getCheckboxProps:getCheckboxProps }"
      :columns="columns"
      :data-source="data"
      :rowKey="(record,index)=>{return record.id}"
       bordered
       :loading="loading"
        @change="pageCheck"
       class="tables"
      :pagination="pagination"
      :scroll="{ y: 500 }"
    >
      <div slot="titles" slot-scope="text,row">
        <a-tooltip placement="topLeft" :title="text" arrow-point-at-center>
          <span class="danshen curpoter maxWidtyhs">{{text}}</span>
        </a-tooltip>
      </div>
    </a-table>
    <a-modal
      v-model="model_show"
      title="发起结算"
      centered
      @ok="subModel"
    >
      <p class="conts">确认结算吗?</p>
    </a-modal>
  </div>
</template>

<script>
  import timeSelection from "../../../components/TimeSelection/index.vue"
  export default{
    data(){
      return{
        allSuplier:[{id:"",name:"全部"}],
        typeShow:false,
        model_show:false,
        schoolData:[{id:"",abbreviation:"全部"}],
        semester:[{id:"",year:"全",semester:"部"}],
        statusData:[{id:"",name:"全部"},{id:0,name:"待结算"},{id:1,name:"结算中"},{id:2,name:"已结算"}],
        weekData:[],
        columns:[
          {
            title: '期望配送时间',
            dataIndex: 'distribution_time',
            align:"center",
            key:"distribution_time",
            width: "10%"
          },
          {
            title: '所属订单编号',
            dataIndex: 'order_sn',
            align:"center",
            key:"order_sn",
            width: "15%",
            scopedSlots: { customRender: 'titles' },
          },
          {
            title: '学校',
            dataIndex: 'school_name',
            key:"school_name",
            align:"center",
            width: "15%"
          },
          {
            title: '学期',
            dataIndex: 'semester',
            key:"semester",
            align:"center",
            width: "10%"
          },
          {
            title: '周',
            dataIndex: 'weeks',
            key:"weeks",
            align:"center",
            width: "10%",
            customRender: (value, row, index) => {
              return "第"+value+"周"
            }
          },
          {
            title: '供应商',
            dataIndex: 'supplier',
            key:"supplier",
            align:"center",
            width: "15%"
          },
          {
            title: '金额（元）',
            dataIndex: 'price_total',
            key:"price_total",
            align:"center",
            width: "10%"
          },
          {
            title: '入库时间',
            dataIndex: 'warehousing_time_text',
            key:"warehousing_time_text",
            align:"center",
            width: "15%"
          },
          {
            title: '结算状态',
            key: 'status_text',
            dataIndex: 'status_text',
            fixed: 'right',
            width: 150,
            align:"center"
          },
        ],
        postData:{
          school_id:"",
          calendar_id:"",
          start_weeks:undefined,
          end_weeks:undefined,
          page:1,
          status:"",
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
          supplier_id:"",
          start_time:"",
          end_time:""
        },
        data:[],
        selectedRowKeys: [],
        pagination:{
          total: 0,
           current:1,
          pageSize: Number(this.$commonJs.PAGE_LINES[0]),//每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper:true,
          pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
        loading:true,
        actionIds:{              //批量删除的数据
          ids:[]
        },
        tab_objs:{}
      }
    },
    created(){
      this.getSchool()
      this.getSemester("semester");
      this.getList()
      this.getSupplier()
    },
    components:{
       timeSelection
    },
    methods:{
      getSupplier(){         //获取供应商
         this.$http.procurement_supplierList().then((res) => {
           this.allSuplier = this.allSuplier.concat(res.data);
         });
      },
      getTims(obj){    //获取配送时间
         this.postData.start_time = obj.start_time
         this.postData.end_time = obj.end_time
         this.searchs()
      },
      checkTypes(){        //切换分类小计
      	this.typeShow = !this.typeShow
      },
      getCheckboxProps(record){
        return {
           props: {
            disabled: record.status ==1|| record.status ==2,
            status: record.status,
          }
        }
      },
      sendSets(){          //发起结算
        if(this.actionIds.ids.length==0){
          return this.$message.error("请选择订单");
        }
        this.model_show = true;
      },
      subModel(){        //确认结算
        this.model_show = false;
        this.$store.commit("sch_setLoaing",true)
        this.$http.SettlementInitiate(this.actionIds).then((res)=>{
          this.$store.commit("sch_setLoaing",false);
          if(res.code==1){
            this.getList()
          }
        })
      },
      getSchool(){          //获取学校
        this.$commonJs.getSchool((data)=>{
          this.schoolData = this.schoolData.concat(data)
        })
      },
      getSemester(type,id){            //获取搜索条件
         this.$http.RecipesGetSearch({id:id}).then((res)=>{
           if(res.code==1){
             if(type=='semester'){
                this.semester = this.semester.concat(res.data)
             }else{
               var weekData = [{id:"",weeks:"全部"}]
               this.weekData = weekData.concat(res.data)
             }
           }
         })
      },
      emptyCheck(){        //清空选中
        this.selectedRowKeys = []
        this.actionIds.ids = []
      },
      onSelectChange(selectedRowKeys,item) {
         this.selectedRowKeys = selectedRowKeys;
         var arr = []
         item.forEach((item)=>{
           arr.push(item.id)
         })
         this.actionIds.ids = arr;
      },
      getList(){                 //获取列表
        this.emptyCheck()
        this.loading = true
        this.$http.SettlementLists(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.tab_objs = res.data.list
            this.data = res.data.data.data
            this.pagination.total = res.data.data.total
          }
        })
      },
      calenChange(type){          //选择学期回调
        this.getSemester('week',this.postData.calendar_id);
        if(type=="calendar_id"){
          this.postData.start_weeks = undefined
          this.postData.end_weeks = undefined
        }
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      searchs(){          //搜索
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion;
        this.postData.page = current;
        this.postData.pageSize = pageSize;
        this.pagination.pageSize = pageSize;
        this.pagination.current = current;
        this.getList()
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
.flexBox{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  >div{
    margin-right: 20px;
    margin-bottom: 30px;
  }
}
.dateBox{
  display: flex;
  align-items: center;
  >p{
    margin-bottom: 0;
    font-size: 18px;
    color: #000;
    width: 30px !important;
    text-align: center;
  }
}
.sear_box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  >button{
    margin-bottom: 30px;
  }
}
.conts{
  text-align: center;
  font-size: 16px;
  color: #333333;
  margin: 20px 0;
}
.checkTis{
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-bottom: 10px;
  margin-right: 10px;
}
.checkTis>div:nth-of-type(1){
	margin-right: 30px;
}
.checkTis>div:nth-of-type(1)>span:nth-of-type(2){
	color: red;
}
.checkTis>div:nth-of-type(2){
	cursor: pointer;
	color: #1890ff;
}
.type_arr{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 10px;
}
.type_arr>div{
  min-width: 200px;
  margin-right: 10px;
  white-space: nowrap;
  margin-bottom: 15px;
}

</style>
