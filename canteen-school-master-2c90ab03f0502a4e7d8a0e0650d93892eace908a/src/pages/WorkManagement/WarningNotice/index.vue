<template>
  <div class="padd">
    <a-tabs v-model="typekey" tabPosition="top"  @change="change">
      <a-tab-pane tab="未处理" key="t_Untreated"></a-tab-pane>
      <a-tab-pane tab="处理记录" key="t_ProcessingRecords"></a-tab-pane>
    </a-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        typekey:"t_Untreated"
      }
    },
    methods:{
      change(e){     //切换
       this.$router.replace({name:e})
      }
    },
    created(){
      this.typekey = this.$route.name
    }
  }
</script>

<style scoped="scoped" lang="scss">
 
</style>
