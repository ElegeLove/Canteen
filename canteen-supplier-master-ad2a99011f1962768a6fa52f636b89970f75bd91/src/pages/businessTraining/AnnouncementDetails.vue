<template>
	<div>
		<a-page-header
		    style="border-bottom: 1px solid rgb(235, 237, 240)"
		    title="查看"
		    @back="() => this.$router.back()"
		/>
		<div class="">
			<!-- <div class="pd30 BusinessTrainingDetails" v-if="$route.query.type == 'message'">
				<a-button type="primary" class="btnH40 mr15 w110" @click="removeItem">删除</a-button>
				<div>
					<span class="frstPage">上一页</span> &nbsp; &nbsp; <a>|</a>  &nbsp; &nbsp;<span>下一页</span>
				</div>
			</div> -->
			<div class="segmentationDiv" v-if="$route.query.type == 'message'"></div>
			<div class="announcement pd30">
				<div class="titleAnnuot">{{pageData.title}}</div>
				<div class="titleAnnuot_p">
					<p v-if="$route.query.type == 'message'">发件人：{{pageData.from}}</p>
					<p v-else>发送对象：{{pageData.send_type}}</p>

					<p>时间：{{pageData.create_time}}</p>
					<!-- <p>类型：{{pageData.type}}</p> -->
					<p v-if="$route.query.type == 'message'">类型：{{pageData.type}}</p>
					<p v-else v-for="(item,index) in pageData.file" :key="index">附件：{{(getType(item))}}   <a-button type="primary" class="btnH40 mr15" @click="upLoadFile(item)">下载</a-button> </p>
				</div>
			</div>
			<div class="trainingContent ">
				<div class="pd20" v-html="pageData.content">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		beforeRouteUpdate  (to, from, next) {
			this.upDataInfo(to)
		},
		data(){
			return{
				pageData:{}
			}
		},
		methods:{
			removeItem(){
				var that = this
				that.$confirm({
					title: '提示',
					content: '消息通知删除后无法恢复，是否继续？',
					okText: '确认',
					okType: 'danger',
					cancelText: '取消',
					onOk() {
						that.$http.noticeDel({id: that.$route.query.id}).then(res => {
							if (res.code == 1) {
								setTimeout(() => {
									that.$router.back()
								});
							}
						});
					},
					onCancel() {},
				});
			},
			upLoadFile(url){ //下载文件
				window.open(url)
			},
			upDataInfo(data){
				let dataId = data ? data.query.id : this.$route.query.id
				this.$http.messageDetail({id: dataId}).then(res => {
					if (res.code == 1) {
						let {content,create_time,message_type,title} = res.data
						this.pageData = {
							title:title,
							from: message_type,
							send_type:message_type,
							create_time:create_time,
							file: [],
							type: message_type,
							content: content
						}
						// this.pageData = res.data
					}
				});
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
			if (this.$route.query.type == 'notification'){
				this.$http.noticeDetail({id: this.$route.query.id}).then(res => {
					if (res.code == 1) {
						let {content,file,send_time,send_type,title} = res.data
						this.pageData = {
							title:title,
							from: '',
							send_type:send_type,
							create_time:send_time,
							type: '',
							file: file,
							content: content
						}
					}
				});
			} else{
				this.upDataInfo()
			}
		},
		mounted() {

		}
	}
</script>

<style scoped="scoped">
	.pd20{padding: 25px;}
	.trainingContent{
		font-size:18px;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.BusinessTrainingDetails{
		display: flex;
	}
	.BusinessTrainingDetails div{
		margin-left: 45px;
		line-height: 40px;
		color: #02BB72;
	}
	.segmentationDiv{
		height: 12px;
		background-color: #F0F2F5;
	}
	.frstPage{
		color: #999 !important;
	}
	.BusinessTrainingDetails span{
		cursor: pointer;
		color: #02BB72; margin-left: 10px;
	}
	.w110{width: 110px;}
	.titleAnnuot{
		font-size:24px;
		font-family:Source Han Sans CN;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-bottom: 30px;
	}
	.titleAnnuot_p{
		font-size:16px;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.trainingContent{
		border-top: 1px solid #F0F2F5;
	}
</style>
