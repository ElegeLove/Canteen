<template>
  <a-layout-header class="rigHeader">
    <div class="flexsd">
      <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="checkLeft" />
      <div>{{allData.school_name}}</div>
    </div>
    <div class="topRig">
      <div>
        <a-popover class="alitim" v-model="messShow" trigger="click">
         <a-icon type="bell" />
          <a-badge :count="allData.message_number" v-if="allData.message_number!==0"/>
          <span @click="checksd">消息通知</span>
          <template slot="content">
            <div class="alerts message">
              <a-tabs class="tabBox"
              v-model="tabKey"
              @change="checkTabs"
              tabPosition="top">
                <a-tab-pane tab="系统消息" key="1">
                </a-tab-pane>
                <a-tab-pane tab="预警消息" key="2">
                </a-tab-pane>
              </a-tabs>
              <infoList :dataIx="tabKey" @messCheck="messCheck" ref="tablists"/>
            </div>
          </template>
        </a-popover>
      </div>
      <!-- <div class="alitim" @click="goHelp">
        <a-icon type="question-circle" />
        <span>操作手册</span>
      </div> -->
      <div>
        <a-popover class="alitim" v-model="infoShow" trigger="click">
         <img src="../../assets/image/logo.png" class="logs"/>
          <span class="margins">{{allData.username}}</span>
          <a-icon type="caret-down" class="downIcon"/>
          <template slot="content">
            <div class="alerts userBoxs">
               <div class="infos">
                 <img src="../../assets/image/logo.png" />
                 <div>
                   <!-- <span>超级管理员</span> -->
                   <div>账号：<span>{{allData.username}}</span></div>
                 </div>
               </div>
               <div class="infoBot">
                  <div @click="goRoute('PersonalCenter')">
                    <img src="../../assets/image/ingoHead.png" />
                    <span>个人中心</span>
                  </div>
                  <div @click="goOut">
                    <img src="../../assets/image/out.png" />
                    <span>退出登录</span>
                  </div>
               </div>
            </div>
          </template>
        </a-popover>
      </div>
    </div>
    <a-modal
        v-model="outShow"
        title="退出登录"
        centered
        @ok="subOut"
      >
        <p class="out_txt">是否确定退出该账号？</p>
      </a-modal>
  </a-layout-header>
</template>

<script>
  import {mapMutations} from 'vuex';
  import infoList from "./InformationList.vue"
  export default {
    props: ["collapsed"],
    data(){
      return{
        outShow:false,
        allData:{
          username:""
        },
        tabKey:"1",            //tab切换下标
        messShow:false,            //消息弹框
        helpShow:false,            //帮助中心弹框
        infoShow:false             //个人中心弹框
      }
    },
    components:{
      infoList
    },
    created(){
      this.getInfo()
    },
    computed:{
      messages() {
        return this.$store.state.messAgeLis;
      }
    },
    watch:{
      messages(val) {
        if(val==true){        //更新未读消息
          this.getInfo("updates")
        }
      }
    },
    methods: {
      goHelp(){        // 帮助中心
         window.open(this.allData.school_operation_manual)
      },
      ...mapMutations(['sch_setToken']),
      messCheck(key){            //消息弹窗关闭
        this[key] = false;
      },
      lookSystem(){           //查看系统版本
        this.helpShow = false;
        this.$notification.open({
          message: '系统版本',
          description:
            '当前系统V1.0',
          icon: <a-icon type="safety" style="color:#02BB72;"/>,
          duration: 1.5
        });
      },
      checkLeft() {               //点击左边菜单icon
        this.$emit('checkLeft');
      },
      goRoute(e){
        this.infoShow = false
        this.$router.push({name:e})
      },
      goOut(){    //退出登录
        this.outShow = true;
        this.infoShow = false;
      },
      subOut(){         //确认退出
        this.sch_setToken("")
        this.$router.replace({path:'/'})
      },
      getInfo(type){               //获取用户信息
        this.$http.IndexInfo().then((res)=>{
          if(res.code==1){
            if(type!="updates"){
              this.allData = res.data;
            }else{
              this.allData.message_number = res.data.message_number
            }
            if(this.allData.message_number>99){
              this.allData.message_number = "99+"
            }
            localStorage.setItem("indexInfo",JSON.stringify(res.data))
          }
        })
      },
      checkTabs(e){        //切换tab
        this.$refs.tablists.getList(e)
      },
      checksd(){
        this.$refs.tablists.getList(this.tabKey)
      }
    }
  }
</script>

<style>
  .ant-popover-inner-content {
    padding: 0 !important;
  }
</style>
<style scoped="scoped" lang="scss">
  @import '../../assets/css/topHeader.scss';
</style>
