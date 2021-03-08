<template>
  <div class="boxs">
    <div>
       <div class="flexBox">
         <div class="selecs">
            <p>就餐学校：</p>
            <a-select
                style="width: 150px"
                default-value="全部"
                placeholder="请选择就餐学校"
                v-model="postData.school_id"
                 @change="searchs"
              >
                <a-select-option :value="item.id" v-for="(item,index) in schoolData" :key="index">{{item.full_name}}</a-select-option>
            </a-select>
         </div>
         <div class="selecs">
           <p>学期：</p>
           <a-select
               style="width: 150px"
               default-value="全部"
               placeholder="请选择年份"
               v-model="postData.calendar_id"
               @change="searchs('calendar_id')"
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
                @change="searchs"
              >
                <a-select-option :value="item.id" v-for="(item,index) in weekData" :key="index">{{item.id==""?item.weeks:"第"+item.weeks+"周"}}</a-select-option>
            </a-select>
          <p>-</p>
          <a-select
               placeholder="请选择"
               style="width: 220px"
               v-model="postData.end_week"
               :disabled="postData.calendar_id==''?true:false"
               @change="searchs"
             >
               <a-select-option :value="item.id" v-for="(item,index) in weekData" :key="index">{{item.id==""?item.weeks:"第"+item.weeks+"周"}}</a-select-option>
           </a-select>
        </div>
       </div>
       <a-table :columns="columns" :data-source="data"
        :scroll="{ x:1500,y: 600 }"
        class="tables"
        bordered
        :rowKey="(record,index)=>{return index}"
        @change="pageCheck"
        :pagination="pagination"
        :loading="loading">
           <div slot="printTwo" slot-scope="text" :class="{'actions':true,'main_color':text.compiled_week_status==1}">
             <span @click="exportEx(text)" :class="{'noCur':text.compiled_week_status==0}">导出</span>
             <span @click="prints(text)" :class="{'noCur':text.compiled_week_status==0}">打印</span>
           </div>
        </a-table>
         <printTab :printdata="printData"/>
    </div>
  </div>
</template>

<script>
   import print from "print-js"
   import printTab from "../../../components/PrintTemplate/VolumeTemplate.vue"
  export default{
    data(){
      return{
        schoolData:[{id:"",full_name:"全部"}],
        semester:[{id:"",year:"全",semester:"部"}],
        weekData:[],
        startValue: null,
        endValue: null,
        endOpen: false,
        printData:"",
        columns:[
          { title: '就餐学校', width: 200, dataIndex: 'full_name', key: 'full_name',align:"center"},
          { title: '年份', width: "10%", dataIndex: 'year', key: 'year',align:"center",
            customRender: (value, row, index) => {
              return value+"年"
            }
          },
          { title: '学期', dataIndex: 'semester', key: 'semester', width: "15%",align:"center",
            customRender: (value, row, index) => {
              return value+"学期"
            }
          },
          { title: '周', dataIndex: 'weeks', key: 'weeks', width: "10%",align:"center",
            customRender: (value, row, index) => {
              return '第'+value+"周"
            }
          },
          { title: '日期', dataIndex: 'date', key: 'date', width: "30%",align:"center",
            customRender: (value, row, index) => {
              return row.start_time_text+"~"+row.end_time_text
            }
          },
          { title: '预算编制情况', dataIndex: 'compiled_week_status', key: 'compiled_week_status', width: "20%",align:"center",
            customRender: (value, row, index) => {
              return value==0?'待编制':'已编制'
            }
          },
          {
            title: '周食材用量总表',
            key: 'operation',
            fixed: 'right',
            scopedSlots: { customRender: 'printTwo' },
            align:"center",
            width: 150
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
          calendar_id:"",
          type:"",
          start_time:null,
          end_time:null,
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0])
        },
      }
    },
    components:{
      printTab
    },
    created(){
      this.getSchool()
      this.getSemester("semester")
      this.getList()
    },
    methods:{
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion
        this.postData.page = current
        this.postData.pageSize = pageSize
        this.pagination.pageSize = pageSize
        this.pagination.current = current
        this.getList()
      },
      exportEx(item){            //导出
         if(item.compiled_week_status==0){
           return false;
         }
         this.$http.ExportTableWeeklyConsumptionPrinting({school_id:item.school_id,week_id:item.week_id})
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
      searchs(type){               //筛选
        this.getSemester('week',this.postData.calendar_id);
        if(type=="calendar_id"){
          this.postData.start_week = undefined
          this.postData.end_week = undefined
        }
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      getList(){                 //获取列表
        this.loading = true
        this.$http.RecipesTableWeeklyConsumption(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },
      getSchool(){          //获取学校
         this.$commonJs.getSchool((data)=>{
           this.schoolData = this.schoolData.concat(data)
         })
      },


      prints(item){            //打印
        if(item.compiled_week_status==0){
          return false;
        }
        this.$http.RecipesTableWeeklyConsumptionPrinting({school_id:item.school_id,week_id:item.week_id}).then((res)=>{
          if(res.code==1){
            this.printData = res.data
            setTimeout(()=>{
              printJS({
                printable: 'printCons',
                type: 'html',
                // targetStyles: ['*'],
                ignoreElements:['no-print','bc','gb']
              })
            },100)
          }
        })

      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/NutritionDiet/RecipePublicity.scss';
</style>
