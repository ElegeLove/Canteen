<template>
	<div> 
		<div class="submittedSuccessfullyContent">
			<div class="submittedSuccessfully">
				<img src="../../assets/image/submitSuccusee.png" />
			</div>
			<div class="submitSuccusee">提交成功</div>
			<div class="goProductsShelves">您可以先去上架产品，<span @click="goShelves">去上架 ></span></div>
			<button class="backIndex" @click="() => this.$router.go(-2)">返回首页</button>
		</div>
	</div>
</template> 
<script>
	export default{
		data(){
			return{
			}
		}, 
		methods:{
			goShelves() { 
			  this.$router.replace('/ProductManagement/ProductManagementAdd')
			},
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
	.schoolAddress span{margin-right: 60px;}
</style>
