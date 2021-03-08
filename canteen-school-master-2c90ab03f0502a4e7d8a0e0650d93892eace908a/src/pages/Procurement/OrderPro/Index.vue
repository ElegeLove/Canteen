<template>
  <div class="my-container">
    <a-tabs v-model="activeName" @change="callback">
      <a-tab-pane key="byPlan" tab="按计划采购"></a-tab-pane>
      <a-tab-pane key="bySelf" v-if="info.optional_purchase == 1" tab="自选采购" force-render></a-tab-pane>
      <a-tab-pane key="cart" v-if="info.optional_purchase == 1" tab="购物车"></a-tab-pane>
    </a-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: this.$route.meta.tabName || "byPlan",
      info: {},
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.activeName = to.meta.tabName || "byPlan";
    next();
  },
  beforeMount(){
    // optional_purchase 1 可以自选采购  0 不能自选采购
    this.info = JSON.parse(localStorage.getItem("indexInfo"));
  },
  mounted() {
    // optional_purchase 1 可以自选采购  0 不能自选采购
    // this.info = JSON.parse(localStorage.getItem("indexInfo"));
  },
  methods: {
    callback(key) {
      this.$router.push({ name: key });
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
</style>
