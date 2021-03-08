<template>
	<div class="pd58"> 
		<div>
			<a-table bordered :data-source="dataSource" :columns="columns" :pagination="false">
				<template slot="operation" slot-scope="text, record">
					<a href="javascript:;" class="operatingA" @click="seeDetails(record)">查看</a> 
				</template>
			</a-table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dataSource: [], 
			columns: [
				{
					title: '一级分类',
					dataIndex: 'name'
				}, 
				{
					title: '操作',
					scopedSlots: { customRender: 'operation' }
				}
			]
		};
	},
	mounted() {
		this.$http.getProductList().then(res => {
            if (res.code == 1) {
                this.dataSource = res.data
            } 
        }); 
	},
	methods: {
		seeDetails(node){
            this.$router.push({
				path: 'productListDetails',
				query: { id: node.id,name: node.name}
			});
        }
	}
};
</script>

<style scoped="scoped">
.w200px {
	width: 200px;
}
.wlist310 {
	width: 310px;
	margin-right: 20px;
}
.mb30 {
	margin-bottom: 30px;
}
.pt10{position: relative;top: 5px;}
</style>
