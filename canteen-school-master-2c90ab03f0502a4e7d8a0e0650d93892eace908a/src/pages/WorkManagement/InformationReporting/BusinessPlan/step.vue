<template>
  <div class="topFix">
    <a-steps v-model="currentIndex" type="navigation" size="small" :style="stepStyle" @change="change">
       <a-step title="步骤1"/>
       <a-step title="步骤2"/>
       <a-step title="步骤3"/>
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
          0:"/ManagementPanel/t_planOne",
          1:"/ManagementPanel/t_planTwo",
          2:"/ManagementPanel/t_planThree"
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
    width: 70%;
    margin: 0 auto;
  }
</style>
