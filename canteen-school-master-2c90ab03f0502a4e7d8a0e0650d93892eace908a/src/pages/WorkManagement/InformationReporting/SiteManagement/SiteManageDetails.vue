<template>
  <div>
    <goback title="返回"/>
    <div class="padBox" v-if="allData!==''">
      <div class="top_box">
        <div>
          <span>学校：{{school}}</span>
        </div>
        <div>
          <span>学期：{{year}}</span>
        </div>
      </div>
       <div>
         <div class="titles">
           <span>最多就餐学生数</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>最多就餐学生人数：{{allData.max_student}}人</p>
            </div>
         </div>
         <div class="titles">
           <span>最多就餐职工数</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>最多就餐教职工人数（正式）：{{allData.max_worker_formal}}人</p>
            </div>
            <div>
              <p>最多就餐教职工人数（临时）：{{allData.max_worker_temporary}}人</p>
            </div>
            <div>
              <p>最多就餐教职工人数合计：{{allData.max_total}}人</p>
            </div>
         </div>
       </div>
        <div>
          <div class="titles">
            <span>加工间</span>
            <div></div>
          </div>
          <div class="iptBox">
             <div>
               <p>面积：{{allData.processing_room_area}}㎡</p>
             </div>
          </div>
        </div>
       <div>
         <div class="titles">
           <span>库房</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>间数：{{allData.storage_room_count}}间</p>
            </div>
            <div>
              <p>总面积：{{allData.storage_room_area}}㎡</p>
            </div>
         </div>
       </div>
       <div>
         <div class="titles">
           <span>学生餐厅</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>面积：{{allData.student_room_count}}㎡</p>
            </div>
            <div>
              <p>座位数：{{allData.student_room_set}}位</p>
            </div>
         </div>
       </div>
        <div>
          <div class="titles">
            <span>教师餐厅</span>
            <div></div>
          </div>
          <div class="iptBox">
             <div>
               <p>面积：{{allData.teacher_room_count}}㎡</p>
             </div>
             <div>
               <p>座位数：{{allData.teacher_room_set}}位</p>
             </div>
          </div>
        </div>
       <div>
         <div class="titles">
           <span>其他用房</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>间数：{{allData.other_room_count}}间</p>
            </div>
            <div>
              <p>总面积：{{allData.other_room_area}}㎡</p>
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
        year:"",
        school:"",
        postData:{
          school_id:"",
          calendar_id:""
        },
        allData:""
      }
    },
    created(){
      var {
        years,
        school,
        calendar_id,
        school_id
      } = JSON.parse(localStorage.getItem("localInfo"));
      this.year = years;
      this.school = school;
      this.postData.calendar_id = calendar_id;
      this.postData.school_id = school_id;
      this.getDetails()
    },
    components:{
      goback
    },
    methods:{
      getDetails(){      //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.InfoPlaceInfo(this.postData).then((res)=>{
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
  @import '../../../../assets/css/WorkManagement/InformationReporting/SiteManagementDetails.scss';
</style>
