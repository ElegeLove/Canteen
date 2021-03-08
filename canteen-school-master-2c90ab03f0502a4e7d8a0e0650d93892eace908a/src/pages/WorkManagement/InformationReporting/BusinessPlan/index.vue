<template>
  <div>
    <goback title="返回"/>
    <div class="allBox">
      <a-tabs v-model="type" tabPosition="top" @change="change">
        <a-tab-pane tab="营养改善计划" key="t_ImprovementPlan"></a-tab-pane>
        <a-tab-pane tab="营改月报表" key="t_ReportForm"></a-tab-pane>
      </a-tabs>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        type:"t_ImprovementPlan"
      }
    },
    components:{
      goback
    },
    methods:{
      change(e){     //切换
        this.$router.replace({name:e})
      }
    },
    created(){
      this.type = this.$route.name
    }
  }
</script>

<style scoped="scoped" lang="scss">
.allBox{
  box-sizing: border-box;
  padding: 10px 40px !important;
}
/deep/ .ant-tabs-nav .ant-tabs-tab{
  font-size: 16px;
}
</style>
