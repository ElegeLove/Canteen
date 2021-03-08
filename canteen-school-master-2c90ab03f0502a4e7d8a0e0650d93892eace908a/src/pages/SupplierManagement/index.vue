<template>
  <div class="padd">
    <a-tabs v-model="type" tabPosition="top" @change="change">
      <a-tab-pane tab="合作供应商" key="PartnerSuppliers"></a-tab-pane>
      <a-tab-pane tab="待审核供应商" key="SuppliersAudited"></a-tab-pane>
      <a-tab-pane tab="往期合作供应商" key="PastpartnerSuppliers"></a-tab-pane>
    </a-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        type:"PartnerSuppliers"
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
          this.type = val.name
        },
        deep: true
      }
    },
    created(){
      this.type = this.$route.name
    }
  }
</script>
<style>
</style>
