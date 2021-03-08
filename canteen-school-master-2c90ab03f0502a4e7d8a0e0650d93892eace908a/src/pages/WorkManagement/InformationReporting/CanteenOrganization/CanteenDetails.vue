<template>
  <div>
    <goback title="返回" />
    <div class="boxs">
      <a-tabs v-model="typekey" tabPosition="top" @change="change" :animated="false">
        <a-tab-pane :tab="item.tit" :key="item.key" v-for="(item,index) in typeArr">
          <canteenManagement :types="typekey" ref="chList"/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  import canteenManagement from "./CanteenManagement.vue"
  export default {
    components: {
      goback,
      canteenManagement
    },
    data() {
      return {
        typekey: 1,
        typeArr: [{
          tit: "食堂管理人员",
          key: 1
        }, {
          tit: "监委会",
          key: 2
        }, {
          tit: "家长委员会",
          key: 3
        },{
          tit: "膳食委员会",
          key: 4
        },{
          tit: "食品安全领导小组",
          key: 5
        },{
          tit: "营改领导小组",
          key: 6
        },{
          tit: "食品采购小组",
          key: 7
        }]
      }
    },
    created() {
      this.typekey = Number(this.$route.query.type)
    },
    methods: {
      change(e) { //切换
        // localStorage.setItem("routesKey", e)
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/CanteenOrganization/index.scss';
</style>
