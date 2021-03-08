<template>
	<div> 
		<a-page-header
		    style="border-bottom: 1px solid rgb(235, 237, 240)"
		    title="添加关联学校" 
		    @back="() => this.$router.back()"
		  />
		<div class="p48">
			<div class="processListContent">
				<div  :class="(current == 0 || current == 1  || current == 2)? 'processList activeBg' : 'processList'">
					<div class="content">
						<div class="num">1</div>
						<div class="title">步骤一</div>
						<p class="text">搜索学校名称或 学校的代码，点击申请关联</p>
					</div>
				</div>
				<div :class="current == 1 || current == 2 ? 'processList activeBg noAfter' : 'processList'">
					<div class="content">
						<div class="num">2</div>
						<div class="title">步骤二</div>
						<p class="text">填写资料，提交至学校和教委审批，教委最终审批后则关联成功</p>
					</div>
				</div>
				<div  :class="current == 2? 'processList noBorder' : 'processList'" id="lastProcessList">
					<div class="content">
						<div class="num">3</div>
						<div class="title">步骤三</div>
						<p class="text">关联后，您需要先上架产品后， 学校才能采购哦~</p>
					</div>
				</div>
			</div>
		</div>
		<div class="pd40">
			<router-view></router-view> 
		</div>
	</div>
</template> 
<script>
	export default{
		data(){
			return{
				current: 0,
				getRouter: ''
			}
		}, 
		beforeRouteUpdate(to,from,next) {
			if (to.name == 'ApplicationOne'){
				this.current = 0
			} else if (to.name == 'ApplicationTwo' ){
				this.current = 1
			}
			else {
				this.current = 2
			}
			next()
		},
		methods:{
			 
		},
		mounted() {
			
		}
	}
</script> 
<style scoped="scoped">
	 .p48{padding: 48px 76px;}
	 .mb15{margin-bottom: 15px;}
	 .mt18{margin-top: 0;}
	 .pd40{padding: 0 40px;}
	 .mt40{margin-top: 40px;} .mt70{margin-top: 70px;margin-bottom: 70px;}
	.processListContent{width: 100%;display: flex;}
	.processList{width: 40%;position: relative;} 
	.schoolText{position: relative;top: 20px;color: #333;}
	.schoolText span{margin-right: 20px;}
	.submittedSuccessfullyContent{
		width: 100%;
		text-align: center;
		margin-top: 80px;
	}
	#lastProcessList{
		width: 20%;
	}
	.noAfter::after{
		content: '';
		width: 0;
		height: 0;
	}
	.submittedSuccessfully img{
		width:93px;
		height:93px;
	} 
	.submitSuccusee{
		font-size:30px;
		font-family:Source Han Sans CN;
		font-weight:bold;
		margin-top: 28px;
		color:rgba(51,51,51,1);
	}
	.goProductsShelves{
		font-size:18px;
		font-family:Source Han Sans CN;
		font-weight:400;
		margin-top: 28px;
		color:rgba(153,153,153,1);
	}
	.goProductsShelves span{
		color: #01BB71;
		cursor: pointer;
	}
	.backIndex{
		width:510px;
		height:70px;
		padding: 0;
		margin-top: 60px;
		line-height: 70px;
		cursor: pointer;
		background:rgba(1,187,113,1);
		border-radius:5px;
		font-size:30px;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	
	
	.twoBtn button{
		margin-right: 33px;
		width: 230px;
		height:50px;
		line-height: 50px;
		font-size:24px;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(255,255,255,1);
		padding: 0;
	}
	.processList .content{
		width: 168px;
	}
	.selectTimeInput{
		display: flex;
	}
	.mr130{margin-right: 130px;}
	.followingInformation{
		height:23px;
		font-size:24px;
		display: flex;
		margin-bottom: 30px;
		font-family:Source Han Sans CN;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.followingInformation div{
		width:6px;
		height:26px;
		background:rgba(12,11,11,1);
		margin-right: 10px;
	}
	.followingInformation span{
		position: relative;
		bottom: 5px;
	}
	.titleLael{margin-bottom: 15px;
		font-size:18px;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.processList .content .num{
		width:50px;
		height:50px;
		line-height:50px;
		background:rgba(223,223,223,1);
		font-size:30px;
		text-align: center;
		font-family:MicrosoftYaHeiUI;
		font-weight:bold;
		color:rgba(255,255,255,1);
		border-radius:50%;
	}
	.processList .content  .title{
		font-size:16px;
		margin-top:6px;
		margin-bottom:6px;
		font-family:Adobe Heiti Std;
		font-weight:normal;
		color:rgba(51,51,51,1);
	}
	.processList .content  .text{
		font-size:14px;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(153,153,153,1);
		text-align: center;
		position: relative;
		right: 48px;
	}
	.processList::after{
		position: absolute; 
		left: 70px;
		top: 28px;
		width: 80%;
		height: 1px;
		content: '';
		background-color: #DFDFDF;
	}
	.noBorder .num{
		background-color: #02BB72 !important;
	}
	#lastProcessList::after{
		width: 0;
	}
	.activeBg::after{background-color: #02BB72 !important;}
	.activeBg .num{background-color: #02BB72 !important;} 
	.relatedSchoolContent{ border:1px solid rgba(210,210,210,1); border-radius:5px; }
	.relatedSchoolContentImg{padding: 30px;display: flex;}
	.relatedSchoolContentImg img{width:120px;height:90px;}
	.relatedSchoolContentText{width: calc(100% - 140px);margin-left: 20px;}
	.relatedSchoolContentText .name{font-size:20px; font-family:Microsoft YaHei; font-weight:bold; color:rgba(51,51,51,1); }
	.schoolAddress{padding: 0 30px;height:63px; border-top: 1px solid #d2d2d2; line-height: 63px;}
	.schoolAddress span{margin-right: 60px;}
	.seachInputSchool{display: flex;margin-bottom: 50px;}
	.seachInputSchool input{margin-right: 15px;}
	.seachInputSchool button{height: 40px;}
</style>
