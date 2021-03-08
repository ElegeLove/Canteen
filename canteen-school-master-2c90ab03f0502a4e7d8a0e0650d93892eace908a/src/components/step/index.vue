<template>
  <div class="topFix">
    <a-steps v-model="currentIndex" type="navigation" size="small" :style="stepStyle" @change="change">
       <a-step title="办学信息"/>
       <a-step title="村校信息"/>
       <a-step title="负责人信息"/>
     </a-steps>
  </div>
</template>

<script>
  export default{
    props:["current"],
    data(){
      return{
        currentIndex:"",
        setpObj:{
          scollInfo:"finish",
          villageSchool:"",
          personCcharge:""
        },
        stepStyle: {
          marginBottom: '60px',
          boxShadow: '0px -1px 0 0 #e8e8e8 inset',
        },
      }
    },
    created(){
      this.currentIndex = this.current
    },
    methods:{
      change(e){
        var route = {
          0:"/ManagementPanel/SetSchoolInformation",
          1:"/ManagementPanel/VillageSchool",
          2:"/ManagementPanel/ChargeInformation"
        }
        this.$router.push({path:route[e]})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .ant-steps{
    margin-bottom: 0 !important;
  }
  .topFix{
    margin-bottom: 38px;
    padding-top: 20px;
    width: 50%;
  }
</style>
