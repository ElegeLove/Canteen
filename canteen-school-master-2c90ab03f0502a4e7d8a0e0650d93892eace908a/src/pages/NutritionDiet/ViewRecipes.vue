<template>
  <div>
    <backs title="食谱详情"/>
    <div class="boxs">
      <div class="tops">
         <div class="dates">
           <span>日期：</span>
           <div>{{allData.start_time}}~{{allData.end_time}}</div>
         </div>
         <div class="newDown">
            <div @click="prints">
              <img src="../../assets/image/print.png" />
              <span>打印</span>
            </div>
            <div @click="exports">
              <img src="../../assets/image/outs.png" />
              <span>导出周食谱总表</span>
            </div>
         </div>
      </div>
       <a-table :columns="columns"
       :data-source="allData.recipes"
       bordered
       :rowKey="(record,index)=>{return index}"
       id="printCons"
       class="tables"
       :loading="tabLoading"
       :scroll="{ x: 1500 }"
       :pagination="false" >
          <template slot="title" slot-scope="currentPageData" class="headers">
            学校食堂{{allData.year}}年{{allData.semester}}学期第{{allData.weeks}}周食谱总表
          </template>
          <div slot="customTitle" style="position: relative;">
            <p class="titDate">日期</p>
            <p class="lines"></p>
            <p class="titTxt">餐次</p>
          </div>
          <div :slot="'week'+ix" class="weekTit" v-for="(it,ix) in allData.dates" :key="ix">
              <p>{{it.day}}</p>
              <p>{{it.week}}</p>
          </div>
          <div v-for="(it,ix) in 7" :slot="'week' + (it+1)" slot-scope="text, record" class="colClass" :key="it">
             <div v-for="(item,index) in record.recipes[it-1]" :key="index" class="checkLisd">
                  {{item.name}}
              </div>
          </div>
        </a-table>
         <printTab :printdata="printData"/>
    </div>
  </div>
</template>

<script>
  import print from "print-js"
  import backs from "../../components/goBack/index.vue"
  import printTab from "../../components/PrintTemplate/RecipeTemplate.vue"          //打印模板
  export default{
    data(){
      return{
        allData:{},
        columns:[{
            align:'center',
            dataIndex: 'title',
            width:140,
            slots: { title: 'customTitle' }
          },
          {
            slots: { title: 'week0' },
            scopedSlots: {customRender: 'week2'},
            dataIndex: 'recipes',
            align:'center',
          },
          {
            align:'center',
            dataIndex: 'recipes1',
            slots: { title: 'week1' },
            scopedSlots: {customRender: 'week3'}
          },
          {
            align:'center',
            dataIndex: 'recipes2',
            slots: { title: 'week2' },
            scopedSlots: {customRender: 'week4'}
          },
          {
            align:'center',
            dataIndex: 'recipes3',
            slots: { title: 'week3' },
            scopedSlots: {customRender: 'week5'}
          },
          {
            align:'center',
            dataIndex: 'recipes4',
            slots: { title: 'week4' },
            scopedSlots: {customRender: 'week6'}
          },
          {
            align:'center',
            dataIndex: 'recipes5',
            slots: { title: 'week5' },
            scopedSlots: {customRender: 'week7'}
          },
          {
            align:'center',
            dataIndex: 'recipes6',
            slots: { title: 'week6' },
            scopedSlots: {customRender: 'week8'}
          },
        ],
         tabLoading:false,           //表格加载
         printData:{}               //打印的数据格式
      }
    },
    components:{
      backs,printTab
    },
    created(){
      this.getMentList(this.$route.query.week_id)
      this.getPrintData(this.$route.query.week_id)
    },
    methods:{
      exports(){          //导出表
        var {week_id,school_id} = this.$route.query
        this.$http.ExportRecipesWeeklyMenu({week_id:week_id,school_id:school_id})
      },
      getMentList(week_id){            //获取食谱列表
        this.tabLoading = true
        this.$http.RecipesWeekRecipesList({week_id}).then((res)=>{
          this.tabLoading = false
          if(res.code==1){
            this.allData = res.data
          }
        })
      },
      getPrintData(week_id){
         this.$http.RecipesWeeklyMenu({week_id}).then((res)=>{
           if(res.code==1){
             this.printData = res.data
           }
         })
      },
      prints(){
        printJS({
              printable: 'recTab',
              // printable: 'recTab',
              type: 'html',
              //properties: [
              //    { field: 'name', displayName: '姓名', columnSize:`50%`},
              //    { field: 'sex', displayName: '性别',columnSize:`50%`},
              //],
              // header: `<p class="custom-p"> 名单 </p>`,
              // gridHeaderStyle:'font-size:62px; padding:3px; border:1px solid; font-weight: 100; text-align:left;',
              // gridStyle:'font-size:12px; padding:3px; border:1px solid; text-align:left;',
              // repeatTableHeader: true,
              // scanStyles:true,
              targetStyles: ['*'],
              // style:"@media print{@page{margin:6mm;}}",
              ignoreElements:['no-print','bc','gb']
          })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/NutritionDiet/ViewRecipes.scss';
</style>
