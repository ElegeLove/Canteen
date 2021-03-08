<template>
   <a-layout id="box">
      <a-layout-sider
       v-model="collapsed"
       :trigger="null"
       :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
       width="230px"
       collapsible
       class="leftSide">
       <div class="logo" :style="{ width: !collapsed?'230px':'80px' }" @click="goHomes">
          <img src="../../assets/image/logo.png" :class="{'logoSize':true,'collaMar':collapsed}"/>
          <span v-if="!collapsed">学校食堂智慧管理系统</span>
         </div>
        <leftSide/>
      </a-layout-sider>
      <a-layout :style="{ marginLeft: !collapsed?'230px':'80px' }">
        <topHeader :collapsed="collapsed" @checkLeft="checkLeft"/>
        <a-layout-content class="rigContent">
          <router-view v-if="sch_menuList.length!==0"></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>

<script>
  import { mapState} from 'vuex';
  import topHeader from "../../components/topHeader/index.vue"        //头部
  import leftSide from "../../components/leftSide/index.vue"        //左侧列表
  export default{
    data(){
      return{
         collapsed: false,
      }
    },
    components:{
      topHeader,leftSide
    },
    mounted(){
       this.listenScoll()
    },
    computed: {
      ...mapState(['sch_menuList'])
    },
    methods:{
      goHomes(){
        this.$router.push({path:"/ManagementPanel/InspectionPanel"}) 
      },
      checkLeft(){          //折叠菜单栏
        this.collapsed = !this.collapsed
      },
      listenScoll(){          //监听窗口变化
        const that = this
        window.onresize = () => {
          return (() => {
             window.screenWidth = document.body.clientWidth
             if(window.screenWidth<1000){
               that.collapsed = true
             }else{
               that.collapsed = false
             }
          })()
        }
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/plate.scss';
</style>
