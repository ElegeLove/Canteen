<template>
  <div>
    <goback title="返回"/>
    <div class="box_padd">
       <div class="flexBox">
         <div>
           <span>年份：</span>
           <a-select
               default-value="全部"
               style="width: 120px"
               v-model="postData.calendar_id"
               @change="searchs('mounth')"
             >
               <a-select-option :value="item.id" v-for="(item,index) in yearData" :key="index">{{item.year}}</a-select-option>
           </a-select>
         </div>
         <div>
           <span>月份：</span>
           <a-select
               default-value="全部"
               style="width: 120px"
               placeholder="请选择"
               v-model="postData.month"
               :disabled="postData.calendar_id==''?true:false"
                @change="searchs"
             >
               <a-select-option :value="item.month" v-for="(item,index) in mounths" :key="index">{{item.month_name}}</a-select-option>
           </a-select>
         </div>
         <div>
           <span>学校：</span>
           <a-select
               default-value="全部"
               style="width: 120px"
               placeholder="请选择"
               @change="searchs"
               v-model="postData.school_id"
             >
               <a-select-option :value="item.id" v-for="(item,index) in schoolData" :key="index">{{item.full_name}}</a-select-option>
           </a-select>
         </div>
         <div>
           <span>状态：</span>
           <a-select
               default-value="全部"
               style="width: 120px"
               placeholder="请选择"
               @change="searchs"
               v-model="postData.status"
             >
               <a-select-option :value="item.id" v-for="(item,index) in statusData" :key="index">{{item.name}}</a-select-option>
           </a-select>
         </div>
       </div>
       <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 500 }"
          :pagination="pagination"
           bordered
           :rowKey="(record,index)=>{return index}"
           @change="pageCheck"
          :loading="loading">
           <div slot="action" slot-scope="text,row,index" class="actiosn main_color">
              <span @click="editPage(row)" v-if="row.status==2">填写</span>
              <span v-else @click="lookDetails(row)">查看</span>
           </div>
        </a-table>
    </div>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        semester:["全部","1学期"],
        yearData:[{id:"",year:"全部"}],
        mounths:[],
        schoolData:[{id:"",full_name:"全部"}],
        statusData:[{id:"",name:"全部"},{id:2,name:"未填写"},{id:1,name:"已填写"}],
        columns:[
          { title: '学校', width: 280, dataIndex: 'full_name', key: 'full_name', fixed: 'left',align:"center" },
          { title: '年份', width: "40%", dataIndex: 'year', key: 'year',align:"center",
            customRender: (value, row, index) => {
              return value+"年"
            }
          },
          { title: '月份', dataIndex: 'month', key: 'month', width: "30%",align:"center",
            customRender: (value, row, index) => {
              return value+"月"
            }
          },
          { title: '状态', dataIndex: 'status_text', key: 'status_text', width: "30%",align:"center" },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            align:"center",
            scopedSlots: { customRender: 'action' },
          },
        ],
        data:[],
        loading:true,
        pagination:{
          total: 0,
          current:1,
          pageSize: Number(this.$commonJs.PAGE_LINES[0]),//每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper:true,
          pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
        postData:{
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
          calendar_id:"",
          month:undefined,
          school_id:"",
          status:""
        },
      }
    },
    components:{
      goback
    },
    created(){
      this.getSearchs("year");
      this.getSchool();
      this.getList()
    },
    methods:{
      getSchool(){          //获取学校
        this.$commonJs.getSchool((data)=>{
          this.schoolData = this.schoolData.concat(data)
        })
      },
      getSearchs(type,id){           //获取搜索条件
         this.$http.RecipesGetSearchMonth({id}).then((res)=>{
            if(res.code==1){
              if(type=='year'){
                 this.yearData = this.yearData.concat(res.data);
              }else{
                var mounths = [{month:"",month_name:"全部"}]
                var newsd = JSON.parse(JSON.stringify(res.data))
                newsd.forEach((item)=>{
                  item.month_name = item.month
                })
                this.mounths = mounths.concat(newsd)
              }
            }
         })
      },
      searchs(type){            //搜索
        if(type=="mounth"){
          this.getSearchs('mounth',this.postData.calendar_id)
          this.postData.month = undefined
        }
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      getList(){                 //获取列表
        this.loading = true
        this.$http.InformationChargeList(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion;
        this.postData.page = current;
        this.postData.pageSize = pageSize;
        this.pagination.pageSize = pageSize;
        this.pagination.current = current;
        this.getList()
      },
      editPage(item){         //填写
        var objs = {
          school_id:item.school_id,
          week_id:item.week_id,
          full_name:item.full_name,
          year:item.year,
          month:item.month
        }
        localStorage.setItem("localInfo",JSON.stringify(objs))
        this.$router.push({path:"/ManagementPanel/t_ChargeAdd"})
      },
      lookDetails(item){          //查看
        var objs = {
          full_name:item.full_name,
          year:item.year,
          month:item.month
        }
        localStorage.setItem("localInfo",JSON.stringify(objs))
        this.$router.push({path:'/ManagementPanel/t_ChargeDetails',query:{id:item.id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
.flexBox{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  >div{
    margin-right: 20px;
    margin-bottom: 30px;
    >span{
      color: #333333;
    }
  }
}
.box_padd{
  box-sizing: border-box;
  padding: 10px 40px;
}
.actiosn{
  cursor: pointer;
}
</style>
