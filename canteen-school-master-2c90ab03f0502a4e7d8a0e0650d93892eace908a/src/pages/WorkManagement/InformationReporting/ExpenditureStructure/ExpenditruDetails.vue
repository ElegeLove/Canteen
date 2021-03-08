<template>
  <div>
     <goback title="返回"/>
      <div class="padBox" v-if="allData!==''">
        <div class="top_box">
          <div>
            <span>学校：{{viewInfo.school}}</span>
          </div>
          <div>
            <span>年份：{{viewInfo.year}}年</span>
          </div>
          <div>
            <span>月份：{{viewInfo.month}}月</span>
          </div>
        </div>
        <div>
          <div class="titles">
            <span>上年度伙食费实际支出</span>
            <div></div>
          </div>
          <div class="iptBox">
             <div class="newMars">
               <p>食材支出金额：{{allData.last_year_food}}</p>
             </div>
             <div class="newMars">
               <p>人工支出金额：{{allData.last_year_human}}</p>
             </div>
             <div class="newMars">
               <p>运行费及其他支出金额：{{allData.last_year_other}}</p>
             </div>
          </div>
          <div class="set_box">
             <div class="tils">*根据以上填写自动计算</div>
             <div class="num_boxs">
               <div>
                 <div>总支出金额:</div>
                 <div>{{allData.last_year_total_money}}</div>
               </div>
               <div>
                 <div>食材支出占比%:</div>
                 <div>{{allData.last_year_food_ratio}}%</div>
               </div>
               <div>
                 <div>人工支出占比%:</div>
                 <div>{{allData.last_year_human_ratio}}%</div>
               </div>
               <div>
                 <div>运行费及其他支出占比%:</div>
                 <div>{{allData.last_year_other_ratio}}%</div>
               </div>
             </div>
          </div>
        </div>
        <div>
          <div class="titles">
            <span>本年度伙食费计划支出%</span>
            <div></div>
          </div>
          <div class="iptBox">
             <div class="newMars">
               <p>食材支出占比%：{{allData.this_year_plan_food_ratio}}</p>
             </div>
             <div class="newMars">
               <p>人工支出占比%：{{allData.this_year_plan_human_ratio}}</p>
             </div>
             <div class="newMars">
               <p>运行费及其他支出占比%：{{allData.this_year_plan_other_ratio}}</p>
             </div>
          </div>
        </div>
        <div>
          <div class="titles">
            <span>本年度伙食费实际支出</span>
            <div></div>
          </div>
          <div class="view_box">
            <div>食材</div>
            <p>年度累计数</p>
            <div>
              <div>金额：{{allData.this_year_food}}</div>
              <div>占比%：{{allData.this_year_food_ratio}}</div>
              <div>超支额：{{allData.this_year_food_over}}</div>
              <div>超支%：{{allData.this_year_food_over_ratio}}</div>
            </div>
            <p>本月数</p>
            <div>
              <div>金额：{{allData.this_month_food}}</div>
              <div>占比%：{{allData.this_month_food_ratio}}</div>
              <div>超支额：{{allData.this_month_food_over}}</div>
              <div>超支%：{{allData.this_month_food_over_ratio}}</div>
            </div>
          </div>
          <div class="view_box">
            <div>人工</div>
            <p>年度累计数</p>
            <div>
              <div>金额：{{allData.this_year_human}}</div>
              <div>占比%：{{allData.this_year_human_ratio}}</div>
              <div>超支额：{{allData.this_year_human_over}}</div>
              <div>超支%：{{allData.this_year_human_over_ratio}}</div>
            </div>
            <p>本月数</p>
            <div>
              <div>
                <span>金额：{{allData.this_month_human}}</span>
              </div>
              <div>占比%：{{allData.this_month_human_ratio}}</div>
            </div>
          </div>
          <div class="view_box">
            <div>运行费及其他</div>
            <p>年度累计数</p>
            <div>
              <div>金额：{{allData.this_year_other}}</div>
              <div>占比%：{{allData.this_year_other_ratio}}</div>
              <div>超支额：{{allData.this_year_other_over}}</div>
              <div>超支%：{{allData.this_year_other_ratio_ratio}}</div>
            </div>
            <p>本月数</p>
            <div>
              <div>
                <span>金额：{{allData.this_month_other}}</span>
              </div>
              <div>占比%：{{allData.this_month_other_ratio}}</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        allData:"",
        viewInfo:{
          school:"",
          year:"",
          month:""
        }
      }
    },
    components:{
      goback
    },
    created(){
      this.getDetails(this.$route.query.id);
      var {school,year,month} = JSON.parse(localStorage.getItem("localdatas"));
      this.viewInfo.school = school;
      this.viewInfo.year = year;
      this.viewInfo.month = month;
    },
    methods:{
      getDetails(id){      //获取详情
        this.$store.commit("sch_setLoaing",true);
        this.$http.InformationExpenditureDetails({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false);
          if(res.code==1){
            this.allData = res.data
          }
        })
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/ExpenditureStructure/details.scss';
</style>
