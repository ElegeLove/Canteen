<template>
  <div class="box">
    <steps :current="0"/>
     <a-row class="rows">
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="leftBox">
           <p>{{scrollData.full_name}}</p>
           <div class="info">
             <span>学校简称：{{scrollData.abbreviation}}</span>
           </div>
           <div class="info">
             <span>学校代码：{{scrollData.code}}</span>
           </div>
           <div class="info">
             <span>学校类别：{{scrollData.type_text}}</span>
           </div>
           <div class="codes">
              <div>统一社会信用代码</div>
              <a-input placeholder="填写统一社会信用代码" v-model="scrollData.credit_code"/>
           </div>
           <div class="radioBox">
             <div>是否有附属幼儿园</div>
             <a-radio-group name="radioGroup" v-model="scrollData.affiliated_kindergarten">
                 <a-radio :value="1">是</a-radio>
                 <a-radio :value="0">否</a-radio>
               </a-radio-group>
           </div>
           <div class="info">
             <span>所属片区：{{scrollData.area}}</span>
           </div>
           <div class="info">
             <span>所属乡镇：{{scrollData.township}}</span>
           </div>
           <div class="codes" style="margin-top: 10px;">
              <div>详细地址</div>
               <a-input placeholder="请填写详细地址" v-model="scrollData.address"/>
           </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="uploads">
             <div>LOGO(选填)</div>
             <up-file @getImg="getImg" :de_fileList="fileList">
                 <div>
                   <a-icon type="plus" />
                   <div class="ant-upload-text">上传</div>
                 </div>
              </up-file>
          </div>
        </a-col>
     </a-row>
     <div class="flexs">
       <a-button @click="goBack">取消</a-button>
       <a-button type="primary" @click="goNext">下一步</a-button>
     </div>
  </div>
</template>

<script>
  import steps from "../../../components/step/index.vue"
  import {mapMutations} from 'vuex';
  export default{
    data(){
      return{
        scrollData:{},
        fileList:[],
        tostData:{
          credit_code:"请填写统一社会信用代码",
          address:"请填写详细地址"
        },
      }
    },
    components:{
      steps
    },
    created(){
        this.getData()
    },
    methods:{
      ...mapMutations(['setScollInfo','sch_setFirstLogin']),
      getImg(data){
        if(data.length!==0){
          this.scrollData.logo = data[0].url
        }else{
          this.scrollData.logo = ""
        }
      },
      getData(){
        this.$store.commit("sch_setLoaing",true)
        this.$http.IndexSchoolInfo().then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.scrollData = res.data
            this.setScollInfo(res.data)
            if(res.data.logo!==""){
              this.fileList = [{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:res.data.logo}]
            }
          }
        })
      },
      goNext(){
        var arr =  Object.keys(this.tostData)
        for(var i=0;i<arr.length;i++){           //非空验证
           if(this.scrollData[arr[i]]==''){
               return this.$message.error(this.tostData[arr[i]]);
           }
        }
        var {credit_code,affiliated_kindergarten,address,logo} = this.scrollData
        let postData = {
          credit_code,
          affiliated_kindergarten,
          address,
          logo
        }
        this.$store.commit("sch_setLoaing",true)
        this.$http.IndexCentralSchool(postData).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
           if(res.code==1){
              this.sch_setFirstLogin(1)
              this.$router.push({name:"VillageSchool"})
           }
        })
      },
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/internalManagement/setSchoolInformation.scss';
</style>
