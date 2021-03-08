<template>
  <div class="box">
    <p>{{allData.full_name}}</p>
    <div>欢迎您</div>
    <span>请先完成学校信息的填写</span>
     <a-button type="primary" @click="setCont">立即填写</a-button>
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
      this.$http.IndexSchoolInfo().then((res)=>{
        if(res.code==1){
          this.allData = res.data
        }
      })
    },
    methods:{
      setCont(){
        this.$router.push({path:"/ManagementPanel/SetSchoolInformation"})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/FirstLogin.scss';
</style>
