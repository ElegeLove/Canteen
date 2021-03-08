<template>
  <div class="my-container">
    <a-tabs v-model="activeName" @change="callback">
      <a-tab-pane key="outAndIn_in_list" tab="食材入库"></a-tab-pane>
      <a-tab-pane key="outAndIn_in_record" tab="入库记录" force-render></a-tab-pane>
    </a-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: this.$route.meta.tabName || "outAndIn_in_list",
    };
  },
  methods: {
    callback(key) {
      this.$router.push({ name: key });
    },
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to);
    this.activeName = to.meta.tabName || "outAndIn_in_list";
    next();
  },
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
</style>
