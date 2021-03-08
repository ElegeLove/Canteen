<template>
  <div class="my-container">
    <a-tabs v-model="activeName" @change="callback">
      <a-tab-pane key="outAndIn_out_list" tab="食材出库"></a-tab-pane>
      <a-tab-pane key="outAndIn_out_record" tab="出库记录" force-render></a-tab-pane>
      <a-tab-pane key="outAndIn_out_inventory" tab="盘存" force-render></a-tab-pane>
    </a-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: this.$route.meta.tabName || "outAndIn_out_list",
    };
  },
  methods: {
    callback(key) {
      this.$router.push({ name: key });
    },
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to);
    this.activeName = to.meta.tabName || "outAndIn_out_list";
    next();
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
</style>
