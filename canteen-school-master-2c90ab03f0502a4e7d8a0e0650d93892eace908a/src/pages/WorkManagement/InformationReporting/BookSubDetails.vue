<template>
  <div>
    <goback title="返回"/>
    <div class="boxs" v-if="allData!==''">
      <div class="top_box">
        <div>
          <span>学校：{{school}}</span>
        </div>
        <div>
          <span>学期：{{year}}</span>
        </div>
      </div>
      <div class="titles">
        <span>作业本数量标准</span>
        <div></div>
      </div>
      <div class="alls">
         <div class="rowBoxs">
           <div>小学生数：{{allData.pupil_count}}人</div>
           <div>
             <span>小学生作业本标准数：</span>
             <span>{{allData.pupil_book_standard_count}}</span>
             <div>本</div>
           </div>
           <div>小学生作业本总数：{{allData.pupil_book_standard_total_count}}本</div>
         </div>
         <div class="rowBoxs">
          <div>初中生数：{{allData.junior_count}}人</div>
          <div>
            <span>初中生作业本标准数：</span>
            <span>{{allData.junior_book_standard_count}}</span>
            <div>本</div>
          </div>
          <div>初中生作业本总数：{{allData.junior_book_standard_total_count}}本</div>
        </div>
      </div>
      <div class="tips">
        <span class="main_color" @click="lookStu">查看学生</span>
        <div>提示：请根据教委发布的标准进行填写</div>
      </div>
      <div class="tips">
        <div>提示：若数据与实际人数不符，请查看学生情况修正</div>
      </div>
      <div class="allBool">合计作业本大本数：{{allData.total_count}}本</div>
      <div class="titles">
        <span>大本子数量</span>
        <div></div>
      </div>
      <div class="iptBox">
        <div>
          <div>
            <p>作业本：{{allData.big_work_book}}本</p>
          </div>
          <div>
            <p>数学本：{{allData.big_math_book}}本</p>
          </div>
          <div>
            <p>作文本：{{allData.big_composition_book}}本</p>
          </div>
          <div>
            <p>大字本：{{allData.big_word_book}}本</p>
          </div>
          <div>
            <p>图画本：{{allData.big_picture_book}}本</p>
          </div>
          <div>
            <p>英语本：{{allData.big_english_book}}本</p>
          </div>
          <div>
            <p>小计：{{allData.big_total_count}}本</p>
          </div>
        </div>
      </div>
      <div class="titles">
        <span>小本子数量</span>
        <div></div>
      </div>
      <div class="tips">
        <div>提示：2个小本子计算为1个大本子</div>
      </div>
      <div class="iptBox">
        <div>
          <div>
            <p>拼音本：{{allData.small_abc_book}}本</p>
          </div>
          <div>
            <p>练习本：{{allData.small_practice_book}}本</p>
          </div>
          <div>
            <p>习字本：{{allData.small_writing_book}}本</p>
          </div>
          <div>
            <p>小字本：{{allData.small_word_book}}本</p>
          </div>
          <div>
            <p>数学本：{{allData.small_math_book}}本</p>
          </div>
          <div>
            <p>作业本：{{allData.small_work_book}}本</p>
          </div>
          <div>
            <p>作文本：{{allData.small_composition_book}}本</p>
          </div>
          <div>
            <p>图画本：{{allData.small_picture_book}}本</p>
          </div>
          <div>
            <p>小计：{{allData.small_total_count}}本</p>
          </div>
        </div>
      </div>
      <div class="titles">
        <span>填报信息</span>
        <div></div>
      </div>
      <div class="iptBox">
        <div>
          <div>
            <p>填报人：{{allData.user_name}}</p>
          </div>
          <div>
            <p>联系电话：{{allData.phone}}</p>
          </div>
          <div>
            <p>学校收货人联系电话：{{allData.school_phone}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import goback from "../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        year:"",
        school:"",
        postData:{
          calendar_id:"",
          school_id:""
        },
        allData:""
      }
    },
    components:{
      goback
    },
    created(){
      var {
        years,
        school,
        calendar_id,
        school_id,
        pupil_count,
        junior_count
      } = JSON.parse(localStorage.getItem("localInfo"));
      this.year = years;
      this.school = school;
      this.postData.calendar_id = calendar_id;
      this.postData.school_id = school_id;
      this.getDetails()
    },
    methods:{
      lookStu(){           //查看学生
        this.$router.push({path:"/ManagementPanel/StudentNum"})
      },
      getDetails(){      //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.InfoBookInfo(this.postData).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data
          }
        })
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../assets/css/WorkManagement/InformationReporting/BookSubscriptionDetails.scss';
</style>
