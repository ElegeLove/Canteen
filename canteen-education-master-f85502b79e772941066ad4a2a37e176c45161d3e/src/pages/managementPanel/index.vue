<template>
   <a-layout id="box">
      <a-layout-sider
       v-model="collapsed"
       :trigger="null"
       :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
       width="230px"
       collapsible
       class="leftSide">
       <div class="logo" :style="{ width: !collapsed?'230px':'80px' }">
          <!-- <a-icon type="html5" :class="{'collaMar':collapsed}"/> -->
          <img src="../../assets/image/logo.png" class="imgLogo" :class="{'collaMar':collapsed}" alt="">
          <span v-if="!collapsed">智慧食堂教委端</span>
         </div>
        <leftSide/>
      </a-layout-sider>
      <a-layout :style="{ marginLeft: !collapsed?'230px':'80px' }">
        <topHeader :collapsed="collapsed" @checkLeft="checkLeft"/>
        <a-layout-content class="rigContent">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
</template>

<script>
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
    methods:{
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
.imgLogo{
  width: 25px;
  height: 30px;
}
</style>
