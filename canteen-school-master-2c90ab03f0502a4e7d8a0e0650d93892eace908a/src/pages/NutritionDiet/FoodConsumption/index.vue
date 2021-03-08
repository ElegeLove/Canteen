<template>
  <div class="padd">
    <a-tabs v-model="typekey" tabPosition="top" @change="change">
      <a-tab-pane tab="待编制" key="BePrepared"></a-tab-pane>
      <a-tab-pane tab="已编制" key="Compiled"></a-tab-pane>
    </a-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        typekey:"BePrepared"
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
          this.typekey = val.name
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
