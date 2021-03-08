<template>
  <div class="padd">
    <a-tabs v-model="typekey" tabPosition="top"  @change="change">
      <a-tab-pane tab="消息中心" key="t_NotificationCenter"></a-tab-pane>
      <a-tab-pane tab="通知中心" key="t_TwoCenter"></a-tab-pane>
      <a-tab-pane tab="发送通知" key="t_SendNotification"></a-tab-pane>
      <a-tab-pane tab="发送记录" key="t_SendRecord"></a-tab-pane>
    </a-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        typekey:"t_NotificationCenter"
      }
    },
    methods:{
      change(e){     //切换
       this.$router.replace({name:e})
      }
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          if(val.name!=="t_NoticeDetails"&&val.name!=="t_RecordDetails"){
            this.typekey = val.name
          }
        },
        deep: true
      }
    },
    created(){
      this.typekey = this.$route.name
    }
  }
</script>

<style>
</style>
