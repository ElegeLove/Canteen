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
          <div class="titBoxs">
             <div class="iptBox">
               <div>
                 <p>学生人数：{{allData.student_count}}人</p>
               </div>
               <div>
                 <p>容器式供水点数：{{allData.container_water_point}}</p>
               </div>
               <div>
                <p>供水点总数：{{allData.total_point}}</p>
               </div>
             </div>
             <div class="lookStu">
               <p @click="lookStu">查看学生情况</p>
               <div>提示：若数据与实际人数不符，请查看学生情况修正</div>
             </div>
          </div>
          <div>
            <div class="titles">
              <span>桶装水</span>
              <div></div>
            </div>
            <div class="rowsd">
              <div class="inputs">
                <p>点数：{{allData.bucket_water_point}}</p>
              </div>
              <div class="uploads">
                 <div>水质报告</div>
                 <div class="rigs">
                   <div v-for="(item,index) in allData.bucket_water_image" :key="index" @click="openImg(item)">
                     <img v-lazy="item" />
                   </div>
                 </div>
              </div>
            </div>
          </div>
          <div>
            <div class="titles">
              <span>电热直供式（开水）</span>
              <div></div>
            </div>
            <div class="rowsd">
              <div class="inputs">
                <p>点数：{{allData.hot_water_point}}</p>
              </div>
            </div>
            <div class="rowsd">
              <div class="inputs">
                <p>设备质量：{{allData.hot_water_quality}}</p>
              </div>
            </div>
          </div>
          <div>
            <div class="titles">
              <span>电热直供式（冷热开）</span>
              <div></div>
            </div>
            <div class="all_flexs">
              <div>
                <div class="inputs marbot">
                  <p>点数：{{allData.hot_cold_water_point}}</p>
                </div>
                <div class="inputs">
                  <p>设备质量：{{allData.hot_cold_water_quality}}</p>
                </div>
              </div>
              <div class="uploads">
                 <div>水质报告</div>
                 <div class="rigs">
                   <div v-for="(item,index) in allData.hot_cold_water_image" :key="index" @click="openImg(item)">
                     <img v-lazy="item" />
                   </div>
                 </div>
              </div>
            </div>
          </div>
          <div class="textAreas">
            <div class="titles">
              <span>备注</span>
              <div></div>
            </div>
            <div class="beis">
              {{allData.remark}}
            </div>
          </div>
      </div>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        year:"",
        school:"",
        allData:"",
        previewVisible: false,
        previewImage:''
      }
    },
    components:{
      goback
    },
    created(){
      var {years,school} = this.$route.query;
      this.year = years;
      this.school = school;
      this.getDetails(this.$route.query)
    },
    methods:{
      handleCancel(){
         this.previewVisible = false;
      },
      openImg(url){       //打开图片
        if(url==""){
          return false;
        }
       this.previewImage = url;
       this.previewVisible = true;
      },
      getDetails(obj){      //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.InfoWaterInfo(obj).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data
          }
        })
      },
      lookStu(){         //查看学生情况
        this.$router.push({path:"/ManagementPanel/StudentNum"})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/DrinkingWater/details.scss';
</style>
