<template>
  <div>
     <goback title="返回"/>
     <a-form-model ref="formModel" :model="postData" :rules="Validata">
      <div class="padBox">
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
               <p>食材支出金额：</p>
               <div>
                 <a-form-model-item ref="last_year_food" prop="last_year_food">
                   <a-input placeholder="请输入"
                   :maxLength="10"
                    @change="regIpt('last_year_food')"
                    @input="setDatas"
                    v-model="postData.last_year_food"/>
                 </a-form-model-item>
               </div>
             </div>
             <div class="newMars">
               <p>人工支出金额：</p>
               <div>
                  <a-form-model-item ref="last_year_human" prop="last_year_human">
                    <a-input placeholder="请输入"
                    :maxLength="10"
                     @change="regIpt('last_year_human')"
                     @input="setDatas"
                     v-model="postData.last_year_human"/>
                  </a-form-model-item>
               </div>
             </div>
             <div class="newMars">
               <p>运行费及其他支出金额：</p>
               <div>
                 <a-form-model-item ref="last_year_other" prop="last_year_other">
                   <a-input placeholder="请输入"
                   :maxLength="10"
                    @change="regIpt('last_year_other')"
                    @input="setDatas"
                    v-model="postData.last_year_other"/>
                 </a-form-model-item>
               </div>
             </div>
          </div>
          <div class="set_box">
             <div class="tils">*根据以上填写自动计算</div>
             <div class="num_boxs">
               <div>
                 <div>总支出金额:</div>
                 <div>{{postData.last_year_total_money}}</div>
               </div>
               <div>
                 <div>食材支出占比%:</div>
                 <div>{{postData.last_year_food_ratio}}%</div>
               </div>
               <div>
                 <div>人工支出占比%:</div>
                 <div>{{postData.last_year_human_ratio}}%</div>
               </div>
               <div>
                 <div>运行费及其他支出占比%:</div>
                 <div>{{postData.last_year_other_ratio}}%</div>
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
               <p>食材支出占比%：</p>
               <div>
                 <a-form-model-item ref="this_year_plan_food_ratio" prop="this_year_plan_food_ratio">
                   <a-input placeholder="请输入"
                   :maxLength="10"
                    @change="regIpt('this_year_plan_food_ratio')"
                    @input="centerIpts"
                    v-model="postData.this_year_plan_food_ratio"/>
                 </a-form-model-item>
               </div>
             </div>
             <div class="newMars">
               <p>人工支出占比%：</p>
               <div>
                  <a-form-model-item ref="this_year_plan_human_ratio" prop="this_year_plan_human_ratio">
                    <a-input placeholder="请输入"
                    :maxLength="10"
                    @input="centerIpts"
                     @change="regIpt('this_year_plan_human_ratio')"
                     v-model="postData.this_year_plan_human_ratio"/>
                  </a-form-model-item>
               </div>
             </div>
             <div class="newMars">
               <p>运行费及其他支出占比%：</p>
               <div>
                 <a-form-model-item ref="this_year_plan_other_ratio" prop="this_year_plan_other_ratio">
                   <a-input placeholder="请输入"
                   :maxLength="10"
                   @input="centerIpts"
                    @change="regIpt('this_year_plan_other_ratio')"
                    v-model="postData.this_year_plan_other_ratio"/>
                 </a-form-model-item>
               </div>
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
              <div>金额：{{postData.this_year_food===""?'--':postData.this_year_food}}</div>
              <div>占比%：{{postData.this_year_food_ratio===""?'--':postData.this_year_food_ratio}}</div>
              <div>超支额：{{postData.this_year_food_over===""?'--':postData.this_year_food_over}}</div>
              <div>超支%：{{postData.this_year_food_over_ratio===""?'--':postData.this_year_food_over_ratio}}</div>
            </div>
            <p>本月数</p>
            <div>
              <div>金额：{{postData.this_month_food===""?'--':postData.this_month_food}}</div>
              <div>占比%：{{postData.this_month_food_ratio===""?'--':postData.this_month_food_ratio}}</div>
              <div>超支额：{{postData.this_month_food_over===""?'--':postData.this_month_food_over}}</div>
              <div>超支%：{{postData.this_month_food_over_ratio===""?'--':postData.this_month_food_over_ratio}}</div>
            </div>
          </div>
          <div class="view_box">
            <div>人工</div>
            <p>年度累计数</p>
            <div>
              <div>金额：{{postData.this_year_human===""?'--':postData.this_year_human}}</div>
              <div>占比%：{{postData.this_year_human_ratio===""?'--':postData.this_year_human_ratio}}</div>
              <div>超支额：{{postData.this_year_human_over===""?'--':postData.this_year_human_over}}</div>
              <div>超支%：{{postData.this_year_human_over_ratio===""?'--':postData.this_year_human_over_ratio}}</div>
            </div>
            <p>本月数</p>
            <div>
              <div>
                <span>金额：</span>
                <a-form-model-item ref="this_month_human" prop="this_month_human">
                  <a-input placeholder="请输入"
                  :maxLength="10"
                   @change="regIpt('this_month_human')"
                   @input="laborAmount"
                   v-model="postData.this_month_human"/>
                </a-form-model-item>
              </div>
              <div>占比%：{{postData.this_month_human_ratio===""?'--':postData.this_month_human_ratio}}</div>
            </div>
          </div>
          <div class="view_box">
            <div>运行费及其他</div>
            <p>年度累计数</p>
            <div>
              <div>金额：{{postData.this_year_other===""?'--':postData.this_year_other}}</div>
              <div>占比%：{{postData.this_year_other_ratio===""?'--':postData.this_year_other_ratio}}</div>
              <div>超支额：{{postData.this_year_other_over===""?'--':postData.this_year_other_over}}</div>
              <div>超支%：{{postData.this_year_other_ratio_ratio===""?'--':postData.this_year_other_ratio_ratio}}</div>
            </div>
            <p>本月数</p>
            <div>
              <div>
                <span>金额：</span>
                <a-form-model-item ref="this_month_other" prop="this_month_other">
                  <a-input placeholder="请输入"
                  :maxLength="10"
                  @input="operatingAmount"
                   @change="regIpt('this_month_other')"
                   v-model="postData.this_month_other"/>
                </a-form-model-item>
              </div>
              <div>占比%：{{postData.this_month_other_ratio==""?'--':postData.this_month_other_ratio}}</div>
            </div>
          </div>
        </div>
        <a-button type="primary" class="btns" @click="saves">提交</a-button>
      </div>
     </a-form-model>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        artificial:0,             //人工后台反的当年每月累计数
        fun:0,             //运行费后台反的当年每月累计数
        postData:{
          week_id:"",
          school_id:"",
          last_year_total_money:0,
          last_year_food:"",
          last_year_human:"",
          last_year_other:"",
          last_year_food_ratio:0,
          last_year_human_ratio:0,
          last_year_other_ratio:0,
          this_year_plan_food_ratio:"",
          this_year_plan_human_ratio:"",
          this_year_plan_other_ratio:"",
          this_year_food:0,               //暂时写死  本年度伙食费实际-食材-年度-金额
          this_year_food_ratio:"",
          this_year_food_over:"",
          this_year_food_over_ratio:"",
          this_month_food:0,             //暂时写死  本年度伙食费实际-食材-本月-金额
          this_month_food_ratio:"",
          this_month_food_over:"",
          this_month_food_over_ratio:"",
          this_year_human:"",
          this_year_human_ratio:"",
          this_year_human_over:"",
          this_year_human_over_ratio:"",
          this_month_human:"",
          this_month_human_ratio:"",
          this_year_other:"",
          this_year_other_ratio:"",
          this_year_other_over:"",
          this_year_other_ratio_ratio:"",
          this_month_other:"",
          this_month_other_ratio:"",
          cumulative_number:0,           //累计数  自己计算用
        },
        Validata:{
          last_year_food:[{ required: true, message: '请输入',trigger: 'blur' }],
          last_year_human:[{ required: true, message: '请输入',trigger: 'blur' }],
          last_year_other:[{ required: true, message: '请输入',trigger: 'blur' }],
          this_year_plan_food_ratio:[{ required: true, message: '请输入',trigger: 'blur' }],
          this_year_plan_human_ratio:[{ required: true, message: '请输入',trigger: 'blur' }],
          this_year_plan_other_ratio:[{ required: true, message: '请输入',trigger: 'blur' }],
          this_month_human:[{ required: true, message: '请输入',trigger: 'blur' }],
          this_month_other:[{ required: true, message: '请输入',trigger: 'blur' }],
        },
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
       var {school_id,week_id,school,year,month,out_month,out_year,this_month_human_total,this_month_other_total} = JSON.parse(localStorage.getItem("localdatas"));
       this.postData.school_id = school_id;
       this.postData.week_id = week_id;
       this.postData.this_month_food = out_month;
       this.postData.this_year_food = out_year;
       this.artificial = this_month_human_total;
       this.fun = this_month_other_total;
       this.viewInfo.school = school;
       this.viewInfo.year = year;
       this.viewInfo.month = month;
    },
    methods:{
      regIpt(type) { //限制整数
        this.postData[type] = this.$commonJs.regMoney(this.postData[type])
      },
      setDatas(){             //计算
        var datas = this.postData;
        this.postData.last_year_total_money = Number(datas.last_year_food)+Number(datas.last_year_human)+Number(datas.last_year_other);    //上年度食材支出总金额
        if(Number(datas.last_year_total_money)==0){
          this.postData.last_year_food_ratio = 0;
          this.postData.last_year_human_ratio = 0;
          this.postData.last_year_other_ratio = 0;
          return false;
        }
        this.postData.last_year_food_ratio = ((Number(datas.last_year_food)/Number(datas.last_year_total_money)).toFixed(4)*100).toFixed(2);     //上年度食材支出占比
        this.postData.last_year_human_ratio = ((Number(datas.last_year_human)/Number(datas.last_year_total_money)).toFixed(4)*100).toFixed(2);     //上年度人工支出占比
        this.postData.last_year_other_ratio = ((Number(datas.last_year_other)/Number(datas.last_year_total_money)).toFixed(4)*100).toFixed(2);     //上年度运行费支出占比
      },
      laborAmount(){      //人工-本月数-金额输入
         var datas = this.postData;
         this.postData.this_year_human = Number(datas.this_month_human)+Number(this.artificial);           //人工-年度累计数-金额
         this.setCumulative()
      },
      operatingAmount(){    //运行费及其他-本月数-金额输入
        var datas = this.postData;
        this.postData.this_year_other = Number(datas.this_month_other)+Number(this.fun);           //运行费及其他-年度累计数-金额
        this.setCumulative()
      },
      setCumulative(){         //计算累计数  --计算用
        var datas = this.postData;
        //食材
        this.postData.cumulative_number = Number(datas.this_year_human)+Number(datas.this_year_other)+Number(datas.this_year_food);
        if(datas.cumulative_number!==0){
          this.postData.this_year_food_ratio = ((Number(datas.this_year_food)/Number(datas.cumulative_number)).toFixed(2)*100).toFixed(2);      //计算 本年度伙食费实际支出-食材-年度-占比
        }
        this.postData.this_year_food_over_ratio = Number(datas.this_year_food_ratio)-Number(datas.this_year_plan_food_ratio);      //计算 本年度伙食费实际支出-食材-年度-超支%
        this.postData.this_year_food_over = ((Number(datas.this_year_food_over_ratio)*Number(datas.cumulative_number))/100).toFixed(2);      //计算 本年度伙食费实际支出-食材-年度-超支额
        var setNums = Number(datas.this_month_food)+Number(datas.this_month_human)+Number(datas.this_month_other);
        if(setNums!==0){
          this.postData.this_month_food_ratio = ((Number(datas.this_month_food)/(setNums)).toFixed(2)*100).toFixed(2);      //计算 本年度伙食费实际支出-食材-本月-占比
        }
        this.postData.this_month_food_over_ratio = Number(datas.this_month_food_ratio)-Number(datas.this_year_plan_food_ratio);      //计算 本年度伙食费实际支出-食材-本月-超支%
        this.postData.this_month_food_over = ((Number(datas.this_month_food_over_ratio)*(setNums))/100).toFixed(2);      //计算 本年度伙食费实际支出-食材-本月-超支额
        //人工
        if(datas.cumulative_number!==0){
          this.postData.this_year_human_ratio = ((Number(datas.this_year_human)/Number(datas.cumulative_number)).toFixed(2)*100).toFixed(2);      //计算 本年度伙食费实际支出-人工-年度-占比%
        }
        this.postData.this_year_human_over_ratio = Number(datas.this_year_human_ratio)-Number(datas.this_year_plan_human_ratio);      //计算 本年度伙食费实际支出-人工-年度-超支%
        this.postData.this_year_human_over = ((Number(datas.this_year_human_over_ratio)*Number(datas.cumulative_number))/100).toFixed(2);      //计算 本年度伙食费实际支出-人工-年度-超支额
        if(setNums!==0){
          this.postData.this_month_human_ratio = ((Number(datas.this_month_human)/(setNums)).toFixed(2)*100).toFixed(2);    //计算 本年度伙食费实际支出-人工-本月-占比%
        }
        //运行费及其他
        if(datas.cumulative_number!==0){
          this.postData.this_year_other_ratio = ((Number(datas.this_year_other)/Number(datas.cumulative_number)).toFixed(2)*100).toFixed(2);      //计算 本年度伙食费实际支出-运行费及其他-年度-占比%
        }
        this.postData.this_year_other_ratio_ratio = Number(datas.this_year_other_ratio)-Number(datas.this_year_plan_other_ratio);      //计算 本年度伙食费实际支出-运行费及其他-年度-超支%
        this.postData.this_year_other_over = ((Number(datas.this_year_other_ratio_ratio)*Number(datas.cumulative_number))/100).toFixed(2);      //计算 本年度伙食费实际支出-运行费及其他-年度-超支额
        if(setNums!==0){
          this.postData.this_month_other_ratio = ((Number(datas.this_month_other)/(setNums)).toFixed(2)*100).toFixed(2);      //计算 本年度伙食费实际支出-运行费及其他-本月-占比%
        }
      },
      centerIpts(){    //本年度伙食费计划支出% 输入监听
         this.setCumulative()
      },
      saves(){
        this.$refs.formModel.validate(valid => {
          if (valid) {
            this.$store.commit("sch_setLoaing",true);
            var allDatas = JSON.parse(JSON.stringify(this.postData));
            this.$http.InformationExpenditure(allDatas).then((res)=>{
                this.$store.commit("sch_setLoaing",false);
                if(res.code==1){
                  this.$router.go(-1);
                }
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/ExpenditureStructure/add.scss';
</style>
