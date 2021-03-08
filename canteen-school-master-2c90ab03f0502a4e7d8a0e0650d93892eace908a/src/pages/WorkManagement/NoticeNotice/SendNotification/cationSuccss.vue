<template>
  <div class="sucBox">
    <img src="../../../../assets/image/sensucc.png" />
    <p>发送成功</p>
    <span>您已成功发送通知</span>
    <div>
      <a-button type="primary" ghost @click="lookDetails">查看此通知</a-button>
      <a-button type="primary" @click="goback">返回</a-button>
    </div>
  </div>
</template>

<script>
  export default{
    methods:{
      goback(){      //返回
        this.$router.go(-1)
      },
      lookDetails(){     //查看详情
        this.$router.push({path:"/ManagementPanel/t_RecordDetails",query:{id:this.$route.query.id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../../assets/css/WorkManagement/NoticeNotice/SendNotification/cationSuccss.scss';
</style>
