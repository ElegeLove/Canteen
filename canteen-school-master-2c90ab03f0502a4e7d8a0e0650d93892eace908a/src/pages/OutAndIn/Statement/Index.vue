<template>
  <div class="my-container">
    <a-tabs v-model="activeName" @change="callback">
      <a-tab-pane key="outAndIn_statement_buy" tab="采购汇总"></a-tab-pane>
      <a-tab-pane key="outAndIn_statement_plan" tab="结存及采购计划统计" force-render></a-tab-pane>
    </a-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: this.$route.meta.tabName || "outAndIn_statement_buy",
      };
    },
    methods: {
      callback(key) {
        this.$router.push({
          name: key
        });
      },
    },
    beforeRouteUpdate(to, from, next) {
      console.log(to);
      this.activeName = to.meta.tabName || "outAndIn_statement_buy";
      next();
    },
  };
</script>

<style scoped="scoped" lang="scss">
  @import "../../../assets/css/Procurement/common.scss";
</style>
