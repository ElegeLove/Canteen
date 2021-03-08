<template>
  <div class="boxs">
     <div>
        <div class="flexBox">
          <div class="disWeek">
            <div class="title">学期：</div>
            <a-select
              v-model="postData.calendar_id"
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
         <div class="selecs">
             <p>就餐学校：</p>
             <a-select
                 style="width: 150px"
                 default-value="全部"
                  v-model="postData.school_id"
                 placeholder="请选择就餐学校"
                  @change="searchs"
               >
                 <a-select-option :value="item.id" v-for="(item,index) in schoolData" :key="index">{{item.full_name}}</a-select-option>
             </a-select>
          </div>
          <!-- <div class="selecs">
            <p>餐次：</p>
            <a-select
                style="width: 150px"
                default-value="全部}"
                placeholder="请选择就餐学校"
                v-model="postData.type"
                 @change="searchs"
              >
                <a-select-option :value="item.id" v-for="(item,index) in scrolls" :key="index">{{item.name}}</a-select-option>
            </a-select>
          </div> -->
          <timeSelection title="用餐日期" @getTims="getTims"/>
        </div>
     </div>
     <a-table :columns="columns" :data-source="data"
      :scroll="{ x: 1500, y: 600 }"
      class="tables"
      bordered
      :rowKey="(record,index)=>{return index}"
      @change="pageCheck"
      :pagination="pagination"
      :loading="loading">
         <div slot="action" slot-scope="text" class="actiosn  main_color but_boxss">
           <div>
             <div @click="update(it)" v-if="text.order_status==0"  v-for="(it,ix) in text.button" :key="it.id">修改{{it.button_name}}预算</div>
             <div v-for="(it,ix) in text.button" :key="it.id+'b'" >
               <span @click="exprotExc(it)">导出{{it.button_name}}预算</span>
             </div>
           </div>
         </div>
      </a-table>
  </div>
</template>

<script>
  import timeSelection from "../../../components/TimeSelection/index.vue"
  export default{
    data(){
      return{
        scrolls:[{id:"",name:"全部"},{id:0,name:"早餐"},{id:1,name:"午餐"},{id:2,name:"晚餐"},{id:3,name:"上午点心"},{id:4,name:"下午点心"}],
        schoolData:[{id:"",full_name:"全部"}],
        columns:[
          { title: '就餐学校', width: 150, dataIndex: 'full_name', key: 'full_name',align:"center" ,fixed: 'left'},
          { title: '学期', width: "20%", dataIndex: 'semester', key: 'semester',align:"center",
            customRender: (value, row, index) => {
              return row.year+"年"+value
            }
          },
          { title: '学周', dataIndex: 'school_week', key: 'school_week', width: "20%",align:"center",
            customRender: (value, row, index) => {
              return "第"+value+"周"
            }
          },
          { title: '星期', dataIndex: 'week', key: 'week', width: "20%",align:"center" },
          { title: '用餐日期', dataIndex: 'day', key: 'day', width: "20%",align:"center" },
          { title: '编制时间', dataIndex: 'preparation_time_text', key: 'preparation_time_text', width: "20%",align:"center" },
          {
            title: '操作按钮',
            key: 'operation',
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
            align:"center",
            width: 250
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
          school_id:"",
          type:"",
          calendar_id:"",
          start_time:null,
          end_time:null,
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0])
        },
        weekList:''
      }
    },
    created(){
      this.getList()
      this.getSchool()
      this.getWeek()
    },
    components:{
       timeSelection
    },
    methods:{
      getWeek(){
        //获取周，年份，学期
        this.$http.weekData({ id: "" }).then((res) => {
          this.weekList = res.data;
        });
      },
      getWeekData(){
        this.postData.page = 1
        this.pagination.current = 1
        this.getList();
      },
      getTims(obj){
        this.postData.start_time = obj.start_time
        this.postData.end_time = obj.end_time
        this.searchs()
      },
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion
        this.postData.page = current
        this.postData.pageSize = pageSize
        this.pagination.pageSize = pageSize
        this.pagination.current = current
        this.getList()
      },
      exprotExc(item){           //导出预算表
        location.href = item.url
      },
      getSchool(){          //获取学校
         this.$commonJs.getSchool((data)=>{
           this.schoolData = this.schoolData.concat(data)
         })
      },
      searchs(){               //筛选
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      getList(){                 //获取列表
        this.loading = true
        this.$http.RecipesCompiledList(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },
      update(item){        //编制预算
        this.$router.push({path:"/ManagementPanel/BudgetTable",query:{id:item.id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/NutritionDiet/ConsumptionBudget.scss';
.disWeek{
  // width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 30px;
}
</style>
