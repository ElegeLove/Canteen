<template>
  <div class="padd">
    <a-tabs v-model="typekey" tabPosition="top" @change="change">
      <a-tab-pane tab="周带量食谱公示表" key="RecipePublicity"></a-tab-pane>
      <a-tab-pane tab="周食材用量总表" key="ZhouCuisine"></a-tab-pane>
    </a-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        typekey:"RecipePublicity"
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
