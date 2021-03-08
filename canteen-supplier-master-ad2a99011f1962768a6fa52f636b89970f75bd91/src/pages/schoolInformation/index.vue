<template>
	<div>
		<div class="cheackSupplierInformation" :wrapper-col="{ span: 12 }">
			<div :class="activeIndex == 0 ? 'activeClass' : ''" @click="cheackIndex(0,'BasicInformation')">基本信息</div>
			<div :class="activeIndex == 1 ? 'activeClass' : ''" @click="cheackIndex(1,'OtherInformation')">其他信息</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script> 
export default {
	data() {
		return {
			activeIndex: 0 
		};
	},
	beforeRouteUpdate(to,from,next) {
		if (to.name == 'BasicInformation'){ 
			this.activeIndex = 0
		} else {
			this.activeIndex = 1
		}
		next()
	},
	mounted() {
		 
	},
	methods: {
		cheackIndex(index,path) { 
			 // is_info  是否填写完整的信息 0 否 1 是 
			if (this.$store.state.userInfo.is_info == 0){
				console.log(index)
				if (index == 0){
					this.activeIndex = index;
					this.$router.push(path)
				} else{
					return
				} 
			} else{
				this.activeIndex = index;
				this.$router.push(path)
			}
		},
	}
};
</script>
<style scoped>
 
.cheackSupplierInformation {
	border-bottom: 1px solid #eff1f5;
	padding: 0 40px;
	height: 85px;
	display: flex;
	line-height: 85px;
}

.activeClass {
	color: #02bb72 !important;
	border-bottom: 4px solid #02bb72;
}
.cheackSupplierInformation div {
	width: auto;
	margin-right: 110px;
	text-align: center;
	cursor: pointer;
	font-size: 20px;
	font-family: Microsoft YaHei;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
	line-height: 85px;
}
.supplierInformation {
	display: flex;
} 
</style>
