<template>
	<div>
		<a-page-header
		    style="border-bottom: 1px solid rgb(235, 237, 240)"
		    title="查看" 
		    @back="() => this.$router.back()"
		/>
		<div class="">
			<div class="pd3058 trainingTopics">
				<div>培训主题：{{pageData.title}} </div>
				<div>创建时间：{{pageData.create_time}}</div>
			</div> 
			<div class="segmentationDiv"></div>
			
			<div class="">
				<div class="businessTraning">
					<div class="segmentationTitle "> 培训资料</div>
				</div>
				<div class="businessTraningFile">
					<div class="fileListText" v-for="(item,index) in pageData.file" :key="index">
						<div class="fileDown">
							<span>{{getType(item)}} </span>
							<a-button type="primary" @click="down(item)" class="w110">下载</a-button>
						</div>
					</div> 
				</div>
			</div>
			<div class="segmentationDiv">
				<div class="businessTraning">
					<div class="segmentationTitle mt5">培训内容</div>
				</div>
				<div class="trainingContent pd20">
					<p v-html="pageData.content"> </p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				pageData:{}
			}
		},
		methods:{
			down(node){ 
				window.open(node)
			},
			getType(file,type){          //截取文件名及类型
				var filename=file;
				if(type==","){
					var index1=filename.lastIndexOf(".");
				}else{
					var index1=filename.lastIndexOf("/")+1;
				}
				var index2=filename.length;
				var type=filename.substring(index1,index2);
				return decodeURI(type);
			}
		},
		created(){  
			this.$http.businessDetail({id: this.$route.query.id}).then(res => {
				if (res.code == 1) { 
					this.pageData = res.data
				} 
			});
		},
		mounted() {
			 
		}
	}
</script>

<style scoped="scoped">
	.pd20{padding: 25px;}
	.segmentationDiv{
		height: 12px;
		background-color: #F0F2F5;
	}
	.mt5{margin-top: 5px;}
	.trainingTopics{
		font-size:24px;
		font-family:Microsoft YaHei;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.businessTraning{
		height: 66px;
		padding: 20px 30px;
		border-bottom: 1px solid #F0F2F5;
	}
	.businessTraningFile{
		padding: 20px 30px;
	}
	.fileListText{
		margin-bottom: 40px;
	}
	.fileListText .title{
		font-size:18px;
		font-family:Source Han Sans CN;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.fileListText .fileDown{
		display: flex;
	}
	.fileDown span{
		font-size:18px;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(2,187,114,1);
		position: relative;
		top: 10px;
	}
	.fileDown button{
		margin-left: 90px;
	}
	.w110{width: 110px;}
	.trainingContent{
		font-size:18px;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
</style>
