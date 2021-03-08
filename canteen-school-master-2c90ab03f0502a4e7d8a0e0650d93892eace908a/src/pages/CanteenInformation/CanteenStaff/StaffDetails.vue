<template>
  <div>
    <backs title="查看详情"/>
    <div v-if="allData!==''">
      <div class="boxs">
         <div class="txtBox">
           <span>学校：</span>
           <div>{{allData.full_name}}</div>
         </div>
         <div class="txtBox">
           <span>食堂名称：</span>
           <div>{{allData.name}}</div>
         </div>
         <div class="txtBox">
           <span>负责人：</span>
           <div>{{allData.person_charge}}</div>
         </div>
         <div class="txtBox">
           <span>负责人联系方式：</span>
           <div>{{allData.person_charge_mobile}}</div>
         </div>
         <div class="txtBox">
           <span>法人：</span>
           <div>{{allData.legal_person}}</div>
         </div>
         <div class="txtBox noMar">
           <span>法人联系电话：</span>
           <div>{{allData.legal_person_mobile}}</div>
         </div>
      </div>
      <div class="boxs">
         <a-row>
            <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"  class="lefBox">
              <p>生活饮用水</p>
              <div>
                <span>供水方式：</span>
                <div>{{allData.water_supply_mode_text}}</div>
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" >
              <div class="imgBox">
                <img v-lazy="allData.water_certificate" @click="openImg(allData.water_certificate)"/>
              </div>
            </a-col>
         </a-row>
      </div>
      <div class="boxs">
         <a-row>
            <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"  class="lefBox">
              <p>食品经营许可证信息</p>
              <div>
                <span>许可证编号：</span>
                <div>{{allData.license_number}}</div>
              </div>
              <div>
                <span>许可项目：</span>
                <div>{{allData.license_projects}}</div>
              </div>
              <div>
                <span>有效起始日期：</span>
                <div>{{allData.start_time}}  至  {{allData.end_time}}</div>
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" >
              <div class="imgBox newimgBox">
                <img v-lazy="allData.license_certificate"  @click="openImg(allData.license_certificate)"/>
              </div>
            </a-col>
         </a-row>
      </div>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
  import backs from "../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        allData:"",
        previewVisible: false,
        previewImage:''
      }
    },
    components:{
      backs
    },
    created(){
       this.getDetails(this.$route.query.id)
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
      getDetails(id){          //获取食堂详情
         this.$store.commit("sch_setLoaing",true)
         this.$http.CanteenInfo({id}).then((res)=>{
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
@import '../../../assets/css/CanteenInformation/CanteenStaff/StaffDetails.scss';
</style>
