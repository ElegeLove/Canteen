<template>
  <div class="padd">
    <div class="scoolName">
      <span>{{allData.full_name}}</span>
      <div class="main_color" @click="updateScoll">修改学校信息</div>
    </div>
    <a-row>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="chilBox">
        <div>
           <div class="headers">
              <span class="bg_color"></span>
              <div>办学信息</div>
           </div>
           <a-row class="rowBox">
              <a-col class="colList">
                 <span>学校简称：</span>
                 <div>{{allData.abbreviation}}</div>
              </a-col>
              <a-col class="colList">
                 <span>学校类别：</span>
                 <div>{{allData.type_text}}</div>
              </a-col>
              <a-col class="colList">
                 <span>学校代码：</span>
                 <div>{{allData.code}}</div>
              </a-col>
              <a-col class="colList">
                 <span>统一社会信用代码：</span>
                 <div>{{allData.credit_code}}</div>
              </a-col>
              <a-col class="colList">
                 <span>所属片区：</span>
                 <div>{{allData.area}}</div>
              </a-col>
              <a-col class="colList">
                 <span>所属乡镇：</span>
                 <div>{{allData.township}}</div>
              </a-col>
              <a-col class="colList">
                 <span>详细地址：</span>
                 <div>{{allData.address}}</div>
              </a-col>
           </a-row>
        </div>
       </a-col>
       <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12"
        v-if="allData.legal_person!==''"
        :class="{'chilBox':true,'setHeaight':true,newHei:allData.affiliated_kindergarten!=1}">
         <div>
            <div class="headers">
               <span class="bg_color"></span>
               <div>负责人信息</div>
            </div>
            <a-row class="rowBox">
               <a-col class="colList">
                  <span>学校法人代表：</span>
                  <div>{{allData.legal_person}}</div>
               </a-col>
               <a-col class="colList">
                  <span>法人联系电话：</span>
                  <div>{{allData.legal_person_mobile}}</div>
               </a-col>
               <a-col class="colList">
                  <span>校长：</span>
                  <div>{{allData.principal}}</div>
               </a-col>
               <a-col class="colList">
                  <span>校长联系电话：</span>
                  <div>{{allData.principal_mobile}}</div>
               </a-col>
            </a-row>
         </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" class="chilBox setHeaight" v-if="allData.affiliated_kindergarten==1">
          <div>
             <div class="headers">
                <span class="bg_color"></span>
                <div>附属幼儿园</div>
             </div>
             <a-row class="rowBox">
                <a-col class="colList">
                   <span>幼儿园长：</span>
                   <div>{{allData.director}}</div>
                </a-col>
                <a-col class="colList">
                   <span>幼儿园长联系电话：</span>
                   <div>{{allData.director_mobile}}</div>
                </a-col>
                <a-col class="colList">
                   <span>是否为普惠：</span>
                   <div>{{allData.inclusive_garden==0?'否':'是'}}</div>
                </a-col>
             </a-row>
          </div>
         </a-col>
         <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" class="chilBox newHei" v-for="(item,index) in allData.village" :key="index">
           <div>
              <div class="headers">
                 <span class="bg_color"></span>
                 <div>{{item.full_name}}</div>
              </div>
              <a-row class="rowBox">
                 <a-col class="colList">
                    <span>村校简称：</span>
                    <div>{{item.abbreviation}}</div>
                 </a-col>
                 <a-col class="colList">
                    <span>主任教师：</span>
                    <div>{{item.chief_teacher}}</div>
                 </a-col>
                 <a-col class="colList">
                    <span>主任教师联系电话：</span>
                    <div>{{item.chief_teacher_mobile}}</div>
                 </a-col>
                 <a-col class="colList" v-if="item.director!==''">
                    <span>园长姓名：</span>
                    <div>{{item.director}}</div>
                 </a-col>
                 <a-col class="colList" v-if="item.director_mobile!==''">
                    <span>园长联系电话：</span>
                    <div>{{item.director_mobile}}</div>
                 </a-col>
                 <a-col class="colList">
                    <span>是否有普惠园：</span>
                    <div>{{item.inclusive_garden==1?'是':'否'}}</div>
                 </a-col>
                 <a-col class="colList">
                    <span>详细地址：</span>
                    <div>{{item.address}}</div>
                 </a-col>
              </a-row>
           </div>
          </a-col>
     </a-row>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        allData:{}
      }
    },
    created(){
       this.getData()
    },
    methods:{
      updateScoll(){
        this.$router.push({name:"SetSchoolInformation"})
      },
      getData(){
        this.$store.commit("sch_setLoaing",true)
        this.$http.IndexSchoolInfo().then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/internalManagement/SchoolInformation.scss';
</style>
