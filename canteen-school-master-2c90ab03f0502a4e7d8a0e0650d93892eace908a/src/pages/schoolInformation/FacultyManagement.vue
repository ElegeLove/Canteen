<template>
  <div class="padd">
    <a-tabs v-model="typeKey" tabPosition="top" @change="change">
      <a-tab-pane tab="在职教职工" key="Faculty"></a-tab-pane>
      <a-tab-pane tab="离职记录" key="ResignationRecord"></a-tab-pane>
    </a-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        typeKey: 'Faculty'
      }
    },
    methods: {
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
    created() {
      this.typeKey = this.$route.name
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../assets/css/internalManagement/FacultyManagement.scss';
</style>
