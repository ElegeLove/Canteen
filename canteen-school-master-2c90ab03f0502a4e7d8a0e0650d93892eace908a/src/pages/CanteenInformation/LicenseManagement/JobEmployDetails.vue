<template>
  <div>
    <backs title="查看详情"/>
    <div class="boxs">
      <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="txtBox">
            <span>食&emsp;&emsp;堂：</span>
            <div>{{allData.canteen_name}}</div>
          </div>
          <div class="txtBox">
            <span>姓&emsp;&emsp;名：</span>
            <div>{{allData.name}}</div>
          </div>
          <div class="txtBox">
            <span>性&emsp;&emsp;别：</span>
            <div>{{allData.sex_text}}</div>
          </div>
          <div class="txtBox">
            <span>年&emsp;&emsp;龄：</span>
            <div>{{allData.age}}</div>
          </div>
          <div class="txtBox">
            <span>职&emsp;&emsp;位：</span>
            <div>{{allData.position}}</div>
          </div>
          <div class="txtBox">
            <span>入职日期：</span>
            <div>{{allData.entry_time}}</div>
          </div>
          <div class="txtBox noMar">
            <span>联系地址：</span>
            <div>{{allData.address}}</div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="colBox">
          <p>照片</p>
          <div class="imgBox">
            <img v-lazy="allData.picture" @click="openImg(allData.picture)"/>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="boxs">
      <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="txtBox"></div>
          <div class="txtBox">
            <span>身份证号：</span>
            <div>{{allData.id_card}}</div>
          </div>
          <div class="txtBox noMar">
            <span>身份地址：</span>
            <div>{{allData.id_card_address}}</div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="colBox">
          <p>身份证正反面图片</p>
          <div class="cardImg">
             <img v-lazy="allData.front" @click="openImg(allData.front)"/>
             <img v-lazy="allData.behind" @click="openImg(allData.behind)"/>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="boxs">
      <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="txtBox"></div>
          <div class="txtBox">
            <span>健康证发证单位：</span>
            <div>{{allData.health_certificate_unit}}</div>
          </div>
          <div class="txtBox noMar">
            <span>健康证到期日期：</span>
            <div>{{allData.health_certificate_time}}</div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="colBox">
          <p>健康证图片</p>
          <div class="imgBox news">
            <img v-lazy="allData.health_certificate_image" @click="openImg(allData.health_certificate_image)"/>
          </div>
        </a-col>
      </a-row>
     </div>
  <!--    <div class="boxs">
       <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
           <div class="txtBox">
             <span>创建人：</span>
             <div>王主任</div>
           </div>
           <div class="txtBox noMar">
             <span>创建时间：</span>
             <div>2018-5-6</div>
           </div>
         </a-col>
       </a-row>
      </div> -->
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
        allData:{},
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
         this.$http.CanteenFacultyInfo({id}).then((res)=>{
           this.$store.commit("sch_setLoaing",false)
            if(res.code==1){
              this.allData = res.data
               console.log(res)
            }
         })
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/CanteenInformation/LicenseManagement/JobEmployDetails.scss';
</style>
