<template>
  <div>
    <steps :current="3"/>
    <div class="centBox">
       <img src="../../../assets/image/sensucc.png" />
       <p>提交成功</p>
       <div>您可以先去完善学校人员信息，<span class="main_color" @click="goPerson">去完善></span></div>
       <a-button type="primary" ghost @click="goHome">返回首页</a-button>
    </div>
  </div>
</template>

<script>
  import steps from "../../../components/step/index.vue"
  export default{
    data(){
      return{

      }
    },
    methods:{
      goHome(){
          this.$router.push({path:"/ManagementPanel/InspectionPanel"})
      },
      goPerson(){
        this.$router.push({path:"/ManagementPanel/StudentNum"})
        // this.$router.push({path:"/ManagementPanel/FacultyManagement/Faculty"})
      }
    },
    components:{
      steps
    }
  }
</script>

<style scoped="scoped" lang="scss">
.centBox{
  display: flex;
  flex-direction:column;
  align-items: center;
  >img{
    width: 93px;
    height: 93px;
    margin-top: 150px;
  }
  >p{
    font-size: 30px;
    color: #333333;
    font-weight: bold;
    margin-top: 40px;
  }
  >div{
    font-size: 16px;
    color: #999999;
    >span{
      cursor: pointer;
    }
  }
  button{
    font-size: 14px;
    width: 88px;
    height: 40px;
    margin-top: 50px;
  }
}
</style>
