<template>
  <div>
    <div class="heads">
      <a-button type="primary" icon="form" @click="creatMenu">新建食谱</a-button>
      <a-button type="primary" @click="lookList">查看推荐食谱</a-button>
    </div>
    <div class="boxs">
       <div class="flexBox">
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
                 style="width: 220px"
                 v-model="postData.start_week"
                 :disabled="postData.calendar_id==''?true:false"
                 @change="calenChange"
               >
                 <a-select-option :value="item.id" v-for="(item,index) in weekData" :key="index">{{item.id==""?item.weeks:"第"+item.weeks+"周"}}</a-select-option>
             </a-select>
           <p>-</p>
           <a-select
                placeholder="请选择"
                style="width: 220px"
                v-model="postData.end_week"
                :disabled="postData.calendar_id==''?true:false"
                @change="calenChange"
              >
                <a-select-option :value="item.id" v-for="(item,index) in weekData" :key="index">{{item.id==""?item.weeks:"第"+item.weeks+"周"}}</a-select-option>
            </a-select>
         </div>
       </div>
       <a-table :columns="columns" :data-source="data"
        :scroll="{ y: 500 }"
        class="tables"
        bordered
        :rowKey="(record,index)=>{return index}"
        @change="pageCheck"
        :pagination="pagination"
        :loading="loading">
           <div slot="action" slot-scope="text," class="actiosn main_color">
             <span @click="update(text)" v-if="text.order_status==0">修改</span>
             <span v-else class="noClick">修改</span>
             <span @click="copy(text)">复制食谱</span>
             <span @click="looks(text)">查看</span>
           </div>
        </a-table>
        <a-modal
           v-model="modalShow"
           title="选择"
           centered
           cancelText="取消"
           okText="确认"
           @ok="subWeek"
         >
           <div class="quitSele">
             <span>周：</span>
             <a-select
                 placeholder="请选择"
                 style="width: 220px"
                 v-model="week_id"
               >
                 <a-select-option :value="item.id" v-for="(item,index) in quitData" :key="index">第{{item.weeks}}周</a-select-option>
               </a-select>
           </div>
         </a-modal>
    </div>
  </div>
</template>

<script>
	import { mapMutations,mapState} from 'vuex';
  export default{
    data(){
      return{
        quitData:[],
        modalShow:false,
        semester:[{id:"",year:"全",semester:"部"}],
        weekData:[],
        columns:[
          { title: '年份', width: 100, dataIndex: 'year', key: 'year',align:"center",
           customRender: (value, row, index) => {
             return value+'年'
           }
          },
          { title: '学期', width: "40%", dataIndex: 'semester', key: 'semester',align:"center",
            customRender: (value, row, index) => {
              return value+'学期'
            }
          },
          { title: '学周', dataIndex: 'weeks', key: 'weeks', width: "30%",align:"center",
            customRender: (value, row, index) => {
              return "第"+value+"周"
            }
          },
          { title: '时间段', dataIndex: 'name', key: 'name', width: "30%",align:"center",
              customRender: (value, row, index) => {
                return row.start_time_text+"—"+row.end_time_text
              }
          },
          {
            title: '操作按钮',
            key: 'operation',
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
            align:"center",
            width: 200
          },
        ],
        data:[],
        loading:false,
        pagination:{
          total: 0,
          current:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),//每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper:true,
          pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
        postData:{
          calendar_id:"",
          start_week:undefined,
          end_week:undefined,
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0])
        },
        week_id:undefined,
        recipes_week_id:"",
        clickType:"",              //当前点击得是新增食谱  还是修改   还是复制    copy是复制
      }
    },
    created(){
      this.getWeek()
      this.getSemester("semester")
      this.getList()
    },
    methods:{
      ...mapMutations(['setWeekData']),
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion
        this.postData.page = current
        this.postData.pageSize = pageSize
        this.pagination.pageSize = pageSize
        this.pagination.current = current
        this.getList()
      },
      getList(){                 //获取列表
        this.loading = true
        this.$http.RecipesWeekList(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },
      getWeek(){            //获取周
         this.$http.RecipesGetWeek().then((res)=>{
           if(res.code==1){
             this.setWeekData(res.data)
             this.quitData = res.data.week
           }
         })
      },
      calenChange(type){          //选择学期回调
        this.getSemester('week',this.postData.calendar_id);
        if(type=="calendar_id"){
          this.postData.start_week = undefined
          this.postData.end_week = undefined
        }
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
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
      copy(item){         //复制食谱
        this.clickType = "copy"
        this.recipes_week_id = item.id
        this.modalShow = true
      },
      lookList(){          //查看推荐食谱
        this.$router.push({name:"RecommendedRecipes"})
      },
      looks(item){       //查看
        this.$router.push({path:"/ManagementPanel/ViewRecipes",query:{week_id:item.week_id,school_id:item.school_id}})
      },
      creatMenu(){    //创建食谱
        this.clickType = "add"
        this.modalShow = true
      },
      update(item){       //修改食谱
        this.clickType = "update"
        this.$router.push({path:"/ManagementPanel/CreateRecipes",query:{week_id:item.week_id,type:"update"}});
      },
      subWeek(){        //确定选择周
        if(this.week_id==undefined){
          return this.$message.error('请选择周');
        }
        if(this.clickType=="copy"){
          this.$http.RecipesCopyRecipes({week_id:this.week_id,recipes_week_id:this.recipes_week_id}).then((res)=>{
             if(res.code==1){
                this.goNext()
             }
          })
        }else{
          this.goNext()
        }
      },
      goNext(){           //进入食谱表
        this.modalShow = false;
        this.$router.push({path:"/ManagementPanel/CreateRecipes",query:{week_id:this.week_id,type:this.clickType}});
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/NutritionDiet/WeeklyRecipes/index.scss';
</style>
