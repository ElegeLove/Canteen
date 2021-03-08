<template>
	<div>
		<a-page-header
		    style="border-bottom: 1px solid rgb(235, 237, 240)"
		    title="查看详情" 
		    @back="() => this.$router.back()"
		/>
		<div class="pd58">
			<div class="productDetails">
				<img :src="pageData.image"/>
				<div class="productContent">
					<div class="productTitle">{{pageData.title}}</div> 
					<div class="productText">
						<div class="title">商品售价</div>
						<div class="text">
							<!-- 预包装商品临时更换状态 -->
							<span  v-if="pageData.type == 0" >¥  {{ pageData.unit_meterage}}</span>
							<span  v-else>¥  {{ pageData.unit_price}}</span>
							/
							<a v-if="pageData.type == 0" style="color: #666">{{pageData.small_unit}}</a>
							<a v-else style="color: #666">{{pageData.unit}}</a>
						</div>
					</div>
				</div>
			</div>
			<div class="productDesciption">
				<div class="splitHeading">商品介绍</div>
				<div class="productDesciptionContrnt" v-if="pageData.type == 0">
					<div>
						<p>产地品牌生产商：{{pageData.manufacturer}}</p>
						<p>保质期至：{{pageData.expiration_time}}</p> 
					</div>
					<div>
						<p>等级规格：{{pageData.grade}},{{pageData.net_content}}{{pageData.unit}}/{{pageData.small_unit}}</p>
						<p>类型：预包装食品</p>
					</div>
					<div> 
						<p>生产日期：{{pageData.production_time}}</p>
						<p>计量单位价：¥{{pageData.unit_price}}/{{pageData.unit}}</p>
					</div> 
				</div>
				<div class="productDesciptionContrnt" v-if="pageData.type == 1">
					<div>
						<p>产地: {{pageData.origin}}</p> 
					</div>
					<div>
						<p>类型： 农产品</p> 
					</div> 
				</div> 
				<div class="productDesciptionContrnt" v-if="pageData.type == 2">
					<div>
						<p>小作坊名称：{{pageData.workshop_name}}</p> 
					</div>
					<div>
						<p>生产日期：{{pageData.production_time}}</p> 
					</div> 
					<div>
						<p>类型：小作坊食品</p>
					</div> 	

					
				</div>
				<div class="productDesciptionHtml" v-html="pageData.introduce">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				pageData: {} 
			}
		},
		methods:{
			 
		},
		created() { 
			this.$http.productDetail({id: this.$route.query.id}).then(res => {
				if (res.code == 1) {
					console.log(res.data)
					this.pageData = res.data 
				}
			});
		}
	}
</script>

<style scoped="scoped">
.productDetails{display: flex;} 
.productDetails img{width:230px;height:230px;margin-right: 53px;}
.productContent{
	width: 500px;
}
.productTitle{
	font-size:36px;
	font-family:Microsoft YaHei;
	font-weight:bold;
	margin-top: 30px;
	overflow: hidden;
	width: 100%;
	text-overflow:ellipsis;
	white-space: nowrap;
	color:rgba(51,51,51,1);
}
.productText{
	width:auto;
	height:80px;
	line-height: 80px;
	font-size:18px;
	font-family:Microsoft YaHei;
	font-weight:bold;
	display: flex;
	color:rgba(153,153,153,1);
	margin-top: 40px;
	padding: 0 20px;
	background:rgba(245,245,245,1);
}
.productText span{
	color: #F00404;
	margin-left: 70px;
	font-size: 36px;
} 
.productDesciption{
	margin-top: 70px;
}
.splitHeading{
	width: calc(100% - 20px);
	height:50px;
	line-height: 50px;
	font-size:18px;
	padding-left: 20px;
	font-family:Microsoft YaHei;
	font-weight:bold;
	color:rgba(102,102,102,1);
	background:rgba(245,245,245,1);
}
.productDesciptionContrnt{
	margin-top: 40px;
	display: flex;
	width: 100%;
}
.productDesciptionContrnt div{
	width: 33%;
	font-size:16px;
	font-family:Microsoft YaHei;
	font-weight:bold;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.productDesciptionContrnt div p{
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.productDesciptionHtml{
	margin-top: 57px;
}
</style>
