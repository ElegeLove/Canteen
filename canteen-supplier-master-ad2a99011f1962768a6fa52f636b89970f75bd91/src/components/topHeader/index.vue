<template>
	<a-layout-header class="rigHeader">
		<div class="flexsd">
			<a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="checkLeft" />
			 <div>{{$store.state.userInfo.supplier_name}}</div>
		</div>
		<div class="topRig">
			<div>
				<a-popover trigger="click" class="alitim" v-model="messShow">
					<a-icon type="bell" />
          <a-badge :count="unread" v-if="unread!==0"/>
					<span @click="checksd">消息通知</span>
          <template slot="content">
            <div class="alerts message">
              <a-tabs class="tabBox"
              v-model="tabKey"
              tabPosition="top">
                <a-tab-pane tab="系统消息" key="1">
                </a-tab-pane>
              </a-tabs>
              <infoList ref="tablists" :datas="announcement" @messCheck="messCheck"/>
            </div>
          </template>
				</a-popover>
			</div>
			<!-- <div @click="operationManual">
					<a-icon type="question-circle" />
					<span>操作手册</span>
			</div> -->
			<div>
				<a-popover class="alitim">
					<img src="../../assets/image/logo.png" />
					<span class="margins"><span v-if="$store.state.userInfo.nickname">{{ $store.state.userInfo.nickname || '' }}-</span> {{ $store.state.userInfo.username || '' }}</span>
					<a-icon type="caret-down" />
					<template slot="content">
						<div class="alerts helps"  @click="seeUserInfo"><div class="hlp">个人中心</div></div>
						<div class="alerts helps"  @click="goOut"><div class="hlp">退出登录</div></div>
					</template>
				</a-popover>
			</div>
		</div>
	</a-layout-header>
</template>

<script>
import {mapMutations,mapState} from 'vuex';
import infoList from "./InformationList.vue"
export default {
	data(){
		return{
			pageData:{},
			announcement: [],
			unread: '0',
      tabKey:"1",
      messShow:false
		}
	},
  components:{
    infoList
  },
  computed:{
    messages() {
      return this.$store.state.sup_messAgeLis;
    }
  },
  watch:{
    messages(val) {
      if(val==true){        //更新未读消息
        this.getInfos()
      }
    }
  },
	props: ['collapsed'],
	methods: {
    checksd(){
      this.getInfos()
    },
		...mapMutations(['setToken']),
		checkLeft() {
			this.$emit('checkLeft');
		},
    messCheck(key){            //消息弹窗关闭
      this[key] = false;
	},
		operationManual(){
			console.log()
			window.open(sessionStorage.getItem('supplier_operation_manual'))
		},
		goOut(){    //退出登录
			this.setToken("")
			localStorage.clear()
			this.$router.replace({path:'/'})
	   },
	   seeUserInfo(){
		   localStorage.setItem('openKey','')
			localStorage.setItem('cheakKey','')
		   this.$router.replace({path:'/ManagementPanel/PersonalCenter'})
	   },
	   seeDetails(node){
			localStorage.setItem('openKey','work_items')
			localStorage.setItem('cheakKey','Announcement')
			this.$router.push({
				path: '/BusinessTraining/AnnouncementDetails',
				query: { id: node.id,type: 'message'}
			});
	   },
     getInfos(){
       this.$http.noticeIndex({}).then(res => {
       	if (res.code == 1) {
       		this.announcement = res.data.list
       		this.unread = res.data.unread
       	}
       });
     }
	},
	mounted() {
     this.getInfos()
	}
};
</script>

<style>
.ant-popover-inner-content {
    padding: 0 !important;
  }
</style>
<style scoped="scoped" lang="scss">
@import '../../assets/css/topHeader.scss';
// .message{padding: 0 10px 20px 10px;width: 400px;}
// .title{
// 	overflow: hidden;
// 	text-overflow:ellipsis;
// 	white-space: nowrap;
// 	width:340px;
// }
// .unreadTip{
// 	text-align: center;
// 	color: #666;
// 	line-height: 50px;
// 	border-bottom: 1px solid #f6f6f6;
// }
// .unreadLineRed{
// 	width: auto;
//     padding: 2px;
//     background: red;
//     color: #fff;
//     height: 16px;
//     position: relative;
//     bottom: 5px;
//     margin-left: 5px;
//     line-height: 10px;
//     font-size: 11px;
//     border-radius: 10px;
// }
// .unreadLineRed2{
// 	width: 8px;
//     background: red;
//     color: #fff;
// 	height: 8px;
//     margin-right: 5px;
//     border-radius: 10px;
// 	position: relative;
// 	top: 10px;
// }
// .title{display: flex;}
// .messageList{position: relative;}
// .setTip .ant-scroll-number-custom-component{
//     top: -5px !important;
//     right: -9px !important;
// }
</style>
