<template>
  <div>
    <goback title="返回"/>
    <div class="padBox" v-if="allData!==''">
      <div class="top_box">
        <div>
          <span>学校：{{full_name}}</span>
        </div>
        <div>
          <span>年份：{{year}}年</span>
        </div>
        <div>
          <span>月份：{{month}}月</span>
        </div>
      </div>
      <div class="addDays">
        <div class="noHeight">
          <p>就餐天数（天）：{{allData.eat_day}}</p>
        </div>
      </div>
       <div>
         <div class="titles">
           <span>幼儿园伙食费标准（元）</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>早餐：{{allData.child_breakfast}}</p>
            </div>
            <div>
              <p>午餐：{{allData.child_lunch}}</p>
            </div>
            <div>
              <p>晚餐：{{allData.child_dinner}}</p>
            </div>
            <div>
              <p>点心：{{allData.child_snack}}</p>
            </div>
            <div>
              <p>几点：{{allData.child_spot}}</p>
            </div>
            <div>
              <p>几餐：{{allData.child_count}}</p>
            </div>
            <div class="setNum">
              <div>
                <span>全天：{{allData.child_total}}元</span>
              </div>
            </div>
         </div>
       </div>
       <div>
         <div class="titles">
           <span>其他学段伙食费标准（元）</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>早餐：{{allData.other_breakfast}}</p>
            </div>
            <div>
              <p>午餐：{{allData.other_lunch}}</p>
            </div>
            <div>
              <p>晚餐：{{allData.other_dinner}}</p>
            </div>
            <div class="setNum">
              <div>
                <span>全天：{{allData.other_total}}元</span>
              </div>
            </div>
         </div>
       </div>
       <div>
         <div class="titles">
           <span>学生每天就餐情况</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>早餐人次：{{allData.student_breakfast_count}}</p>
            </div>
            <div>
              <p>午餐人次：{{allData.student_lunch_count}}</p>
            </div>
            <div>
              <p>晚餐人次：{{allData.student_dinner_count}}</p>
            </div>
            <div>
              <p>点心人次：{{allData.student_cake_count}}</p>
            </div>
            <div class="setNum">
              <div>
                <span>全校就餐总人次：{{allData.student_total_count}}人次</span>
              </div>
            </div>
         </div>
       </div>
       <div>
          <div class="titles">
            <span>本月教职工就餐情况</span>
            <div></div>
          </div>
          <div class="new_boxsd">
            <p>总人次</p>
            <div>
              <div>
                <p>月人次：</p>
                <div class="sizes">{{allData.month_total_count}}</div>
              </div>
              <div>
                <p>日平均人次：</p>
                <div class="sizes">{{allData.month_day_count}}</div>
              </div>
            </div>
          </div>
          <div class="new_boxsd">
            <p>早餐人次</p>
            <div>
              <div>
                <p>日平均人次：</p>
                 <div class="sizes">{{allData.month_breakfast_day_count}}</div>
              </div>
               <div>
                 <p>本月就餐名单：</p>
                 <div v-if="allData.month_breakfast_day_list!==''">
                   <img src="../../../../assets/image/excel.png" />
                   <span class="main_color" @click="downLoad(allData.month_breakfast_day_list)">下载</span>
                 </div>
                 <div v-else>暂无</div>
               </div>
            </div>
          </div>
          <div class="new_boxsd">
            <p>午餐人次</p>
            <div>
              <div>
                <p>日平均人次：</p>
                 <div class="sizes">{{allData.month_lunch_day_count}}</div>
              </div>
               <div>
                 <p>本月就餐名单：</p>
                 <div v-if="allData.month_lunch_day_list!==''">
                   <img src="../../../../assets/image/excel.png" />
                   <span class="main_color" @click="downLoad(allData.month_lunch_day_list)">下载</span>
                 </div>
                 <div v-else>暂无</div>
               </div>
            </div>
          </div>
          <div class="new_boxsd">
            <p>晚餐人次</p>
            <div>
              <div>
                <p>日平均人次：</p>
                 <div class="sizes">{{allData.month_dinner_day_count}}</div>
              </div>
               <div>
                 <p>本月就餐名单：</p>
                 <div v-if="allData.month_dinner_day_list!==''">
                   <img src="../../../../assets/image/excel.png" />
                   <span class="main_color" @click="downLoad(allData.month_dinner_day_list)">下载</span>
                 </div>
                 <div v-else>暂无</div>
               </div>
            </div>
          </div>
          <div class="new_boxsd">
            <p>缴费额</p>
            <div>
              <div>
                <p>年度累计数：{{allData.money}}元</p>
              </div>
              <div>
                <p>本月数：{{allData.month_money}}元</p>
              </div>
            </div>
          </div>
       </div>
       <div class="textAreas">
         <div class="titles">
           <span>备注</span>
           <div></div>
         </div>
         <div class="ramsks">
           {{allData.remark}}
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
        full_name:"",
        year:"",
        month:"",
        allData:""
      }
    },
    components:{
      goback
    },
    created(){
      var localData = JSON.parse(localStorage.getItem("localInfo"));
      this.full_name = localData.full_name;
      this.year = localData.year;
      this.month = localData.month;
      this.getDetails(this.$route.query.id)
    },
    methods:{
      getDetails(id){       //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.InformationChargeDetails({id}).then((res)=>{
            this.$store.commit("sch_setLoaing",false)
            if(res.code==1){
              this.allData = res.data
            }
        })
      },
      downLoad(url){              //下载
        window.open(url)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/ChargeManagement/index.scss';
</style>
