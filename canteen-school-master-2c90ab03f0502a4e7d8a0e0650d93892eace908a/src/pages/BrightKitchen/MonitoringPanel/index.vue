<template>
  <div class="padd">
    <a-tabs v-model="typekey" tabPosition="top" @change="change">
      <a-tab-pane tab="监控面板" key="t_Panel"></a-tab-pane>
      <a-tab-pane tab="监控回放" key="t_Playback"></a-tab-pane>
    </a-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        typekey:"t_Panel"
      }
    },
    methods:{
      change(e) { //切换
        this.$router.replace({
          name: e
        })
      }
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          this.typeKey = val.name
        },
        deep: true
      }
    },
    created(){
      this.typekey = this.$route.name
    }
  }
</script>

<style scoped="scoped" lang="scss">
</style>
