<template>
  <div>
    <goback title="返回"/>
    <div class="prove_padd">
      <a-tabs v-model="typekey" tabPosition="top" @change="change">
        <a-tab-pane tab="享受名单" key="t_enjoyList"></a-tab-pane>
        <a-tab-pane tab="不享受名单" key="t_noenjoyList"></a-tab-pane>
      </a-tabs>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import goback from "../../../../../components/goBack/index.vue"
  export default{
    components:{
      goback
    },
    data(){
      return{
        typekey:"t_enjoyList"
      }
    },
    created(){
      this.typekey = this.$route.name
    },
    methods:{
      change(e){     //切换
       this.$router.replace({path:"/ManagementPanel/t_ImprovementDetails/"+e,query:{id:this.$route.query.id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
.prove_padd{
  box-sizing: border-box;
  padding: 10px 40px;
}
/deep/ .ant-tabs-nav .ant-tabs-tab{
  font-size: 16px;
}
</style>
