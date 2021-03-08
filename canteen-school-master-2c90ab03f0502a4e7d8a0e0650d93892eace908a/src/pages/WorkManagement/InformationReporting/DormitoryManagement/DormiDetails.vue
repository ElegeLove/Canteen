<template>
  <div>
     <goback title="返回"/>
     <div class="padBox" v-if="allData!==''">
       <div class="top_box">
         <div>
           <span>学期：{{year}}</span>
         </div>
       </div>
        <div>
          <div class="iptBox">
            <div>
              <p>寄宿男生人数：{{allData.boy_count}}人</p>
            </div>
            <div>
              <p>寄宿女生人数：{{allData.girl_count}}人</p>
            </div>
            <div>
              <p>合计：{{allData.total_count}}人</p>
            </div>
          </div>
        </div>
        <div>
          <div class="titles">
            <span>男生寝室</span>
            <div></div>
          </div>
          <div class="iptBox">
              <div>
                <p>栋数：{{allData.boy_tung_count}}栋</p>
              </div>
              <div>
                <p>间数：{{allData.boy_room_count}}间</p>
              </div>
              <div>
                <p>床位数：{{allData.boy_bed_count}}床</p>
              </div>
            </div>
            <div class="iptBox">
                <div>
                  <p>淋浴间数：{{allData.boy_shower_count}}间</p>
                </div>
                <div>
                  <p>是否有热水：{{allData.boy_is_hot==1?'有':'没有'}}</p>
                </div>
                <div>
                  <p>管理员人数：{{allData.boy_admin_count}}人</p>
                </div>
              </div>
          </div>
        <div>
          <div class="titles">
            <span>女生寝室</span>
            <div></div>
          </div>
          <div class="iptBox">
              <div>
                <p>栋数：{{allData.girl_tung_count}}栋</p>
              </div>
              <div>
                <p>间数：{{allData.girl_room_count}}间</p>
              </div>
              <div>
                <p>床位数：{{allData.girl_bed_count}}床</p>
              </div>
            </div>
            <div class="iptBox">
                <div>
                  <p>淋浴间数：{{allData.girl_shower_count}}间</p>
                </div>
                <div>
                  <p>是否有热水：{{allData.girl_is_hot==1?'有':'没有'}}</p>
                </div>
                <div>
                  <p>管理员人数：{{allData.girl_admin_count}}人</p>
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
    <emptys titles="暂无数据" v-else/>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue";
  import emptys from "../../../../components/EmptyNum/index.vue"
  export default{
    data(){
      return{
        year:"",
        allData:""
      }
    },
    created(){
      var {year} = this.$route.query;
      this.year = year;
      this.getDetails(this.$route.query)
    },
    components:{
      goback,emptys
    },
    methods:{
      getDetails(obj){      //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.InfoRoominfo(obj).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1&&res.data!==null){
            this.allData = res.data
          }
        })
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/DormitoryManagement/index.scss';
</style>
