<template>
  <div>
     <goback title="返回"/>
     <steps :current="2"/>
     <div class="boxsc">
        <img src="../../../../assets/image/sensucc.png" />
        <p>提交成功</p>
        <div>您已完成本学期的营改计划，每月的营改报表还未完成，<span class="main_color" @click="goOvers">去完善></span></div>
        <a-button @click="goOvers">填写营改月报表</a-button>
     </div>
  </div>
</template>

<script>
  import steps from "./step.vue"
  import goback from "../../../../components/goBack/index.vue"
  export default{
    components:{
      steps,goback
    },
    methods:{
      goOvers(){
        this.$router.push({path:'/ManagementPanel/t_BusinessPlan/t_ReportForm'})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
.boxsc{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  >img{
    width: 80px;
    height: 80px;
    margin-bottom: 30px;
    margin-top: 100px;
  }
  >p{
    font-size: 28px;
    color: #000;
    font-weight: bold;
    margin-bottom: 20px;
  }
  >div{
    font-size: 16px;
    color: #333333;
    >span{
      cursor: pointer;
    }
  }
  >button{
    margin-top: 50px;
    border-radius: 5px;
  }
}
</style>
