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
         <div class="selecs">
           <p>餐次：</p>
           <a-select
               style="width: 150px"
               default-value="全部"
               placeholder="请选择餐次"
               v-model="postData.type"
                @change="searchs"
             >
               <a-select-option :value="item.id" v-for="(item,index) in scrolls" :key="index">{{item.name}}</a-select-option>
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
           <div slot="printTwo" slot-scope="text" :class="{'actions':true,'main_color':text.compiled_week_food_status==1}">
             <span @click="exportEx(text)" :class="{'noCur':text.compiled_week_food_status==0}">导出</span>
             <span @click="prints(text)" :class="{'noCur':text.compiled_week_food_status==0}">打印</span>
           </div>
        </a-table>
         <printTab :printData="printdata"/>
    </div>
  </div>
</template>

<script>
   import print from "print-js"
   import printTab from "../../../components/PrintTemplate/WeeklyRecipeTemplate.vue"
  export default{
    data(){
      return{
        scrolls:[{id:"",name:"全部"},{id:0,name:"早餐"},{id:1,name:"午餐"},{id:2,name:"晚餐"},{id:3,name:"上午点心"},{id:4,name:"下午点心"}],
        schoolData:[{id:"",full_name:"全部"}],
        semester:[{id:"",year:"全",semester:"部"}],
        weekData:[],
        startValue: null,
        endValue: null,
        endOpen: false,
        columns:[
          { title: '就餐学校', width: 200, dataIndex: 'full_name', key: 'full_name',align:"center" },
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
          { title: '餐次', dataIndex: 'type_text', key: 'type_text', width: "15%",align:"center" },
          { title: '预算编制情况', dataIndex: 'compiled_week_food_status', key: 'compiled_week_food_status', width: "20%",align:"center",
            customRender: (value, row, index) => {
              return value==0?'待编制':'已编制'
            }
          },
          {
            title: '周带量食谱公示表',
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
        printdata:"",
        printStyles:`
          .allsTabfg>.rtys:nth-of-type(1){
              border-top: 0 !important;
           }
           .allsTabfg{
             border-right:0 !important;
           }
           .rtys{
             width: 100% !important;
           }
           .rtys>tr:nth-of-type(1){
             border-top: 0 !important;
           }
           .rtys>tr:nth-of-type(1) td{
             border-top: 0 !important;
           }
           #printConsdf th{
             border-right: 1px solid #000;
             border-bottom: 1px solid #000;
             text-align: center;
           }
           #printConsdf td{
             border-right: 1px solid #000;
             border-bottom: 1px solid #000;
             text-align: center;
           }
           .linesdxc{
             position:absolute;
             width: 2px;
             height: 100% !important;
             top: 0;
             left: 30px;
             border-left: 1px solid #000000 !important;
           }
           .allsTabfg:last-child{
             border-bottom: 0 !important;
           }
           .allerstys>table:first-child{
               border-top: 0;
            }
            .sapnsdfgs{
              display:inline-block !important;
              width:84px !important;
              border-bottom: 1px solid #000;
            }
            #printConsdf{
              position: relative !important;
              width: 100% !important;
              z-index: -2;
              top: 0;
              left: 0;
            }
            .tablefths{
              width: 100% !important;
            }
            .tablefths td{
              text-align: center;
              font-size: 14px;
              color: #000;
            }
            .tablefths thead>.headOne{
              text-align: center;
            }
            .tablefths thead>.headOne>td{
              font-size: 18px !important;
              font-weight: bold;
              box-sizing: border-box;
              padding:10px 0;
            }
            .tablefths thead>.headTwo span{
              display: inline-block;
              margin-right: 100px;
              white-space: nowrap;
            }
            .tablefths thead>.headTwo  td{
              text-align: left;
              box-sizing: border-box;
              padding: 6px 5px;
             }
             #printConsdf .tablefths .allerstys .fgh{
               padding:0 10px !important;
             }
             .cirl_line{
               border: 0 !important;
               box-sizing: border-box !important;
               padding: 10px 6px !important;
               height: 100% !important;
             }
             .cai_names{
               border: 0 !important;
               height: 100% !important;
               box-sizing: border-box !important;
               padding: 10px !important;
               font-size:10px !important;
               width: 116px !important;
               max-width:116px !important;
             }
             .lin_tab{
               width: 100% !important;
               border: 0 !important;
             }
             .cont_tr{
               height: 100% !important;
             }
             .line_tr{
               border: 0 !important;
               height: 100% !important;
             }
             .food_tab{
               border: 0 !important;
               width:800px !important;
             }
             .rela_tive{
               width:150px !important;
               position: relative !important;
             }
             .name_heig{
               height: 30px !important;
             }
             .nobors{
               border: 0 !important;
             }
             .nobots{
               border-bottom:none !important;
             }
        `
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
        this.$http.RecipesTableWeeklyRecipes(this.postData).then((res)=>{
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
      exportEx(item){         //导出
        if(item.compiled_week_food_status==0){
          return false;
        }
        var {school_id,week_id,type} = item
        this.$http.ExportTableWeeklyRecipesExport({school_id,type,week_id})
      },
      prints(item){            //打印
        if(item.compiled_week_food_status==0){
          return false;
        }
        var {school_id,week_id,type} = item
        this.$http.RecipesTableWeeklyRecipesPrinting({school_id,week_id,type}).then((res)=>{
          if(res.code==1){
             var datas = JSON.parse(JSON.stringify(res.data))
             this.printdata = datas;
             setTimeout(()=>{
               printJS({
                 printable: 'printConsdf',
                 type: 'html',
                 // targetStyles: ['*'],
                 style:'@media print{@page{size:A4;margin-top:8mm;margin-bottom:3mm;margin-left:5mm;margin-right:9mm;}'+this.printStyles+'}',
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
