<template>
  <a-config-provider :locale="locale">
  <div id="app">
   <loading/>
   <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
  </a-config-provider>
</template>

<script>
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import loading from "./components/loading.vue"
export default {
  name: 'App',
  data(){
    return{
      locale:zhCN
    }
  },
  components:{
	  loading
  },
  created(){             //监听页面刷新   关闭loading
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  methods:{
    beforeunloadFn(e) {
      this.$store.commit("sch_setLoaing",false)
    }
  }
}
</script>

<style scoped="scoped">
#app{
  height: 100%;
}
</style>
