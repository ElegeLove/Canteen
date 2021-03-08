<template>

	<div class="pd28">
        <a-page-header
		    style="border-bottom: 1px solid rgb(235, 237, 240)"
		    title="查看详情" 
		    @back="() => this.$router.back()"
		/>
        <div class="mt20">当前分类：{{$route.query.name}}</div>
		<div class="mt20">
			<a-table bordered
			 @change="pageCheck"
			 :loading="loading"
			 :data-source="dataSource" :columns="columns" :pagination="pagination" >
			</a-table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading:false,
            pagination:{
				total: 0,
				current: 1,
				pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
				pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
                showQuickJumper: true, 
				showSizeChanger: true,
				// onChange:(e)=>{          //分页触发
				// 	this.seachContent.page = e
				// 	this.seachContentFun()
				// },
				showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
			},
			dataSource: [], 
			columns: [
				{
					title: '二级分类',
					dataIndex: 'name'
				}, 
				{
					title: '编号',
					dataIndex: 'code'
				},
				{
					title: '创建时间',
					dataIndex: 'create_time'
				}
            ],
            seachContent:{
                pid: this.$route.query.id,
                page: 1,
                page_size: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
            }
		};
	},
	mounted() { 
		this.seachContentFun()
	},
	methods: {
		pageCheck(pagetion) { //分页
			var {
				current,
				pageSize
			} = pagetion;
			this.seachContent.page = current;
			this.seachContent.page_size = pageSize;
			this.pagination.pageSize = pageSize;
			this.pagination.current = current;
			this.seachContentFun()
		},
        seachContentFun(){
			this.loading = true;
            this.$http.getProductList(this.seachContent).then(res => {
				this.loading = false;
                if (res.code == 1) {
                    this.dataSource = res.data.data
                    console.log(res.data)
                    this.pagination.total =res.data.total
                    this.pagination.pageSize =res.data.per_page
                    this.seachContent.page_size =res.data.per_page
                } 
            }); 
        }
	}
};
</script>

<style scoped="scoped">
.w200px {
	width: 200px;
}
.pd28{padding: 20px;}
.wlist310 {
	width: 310px;
	margin-right: 20px;
}
.mb30 {
	margin-bottom: 30px;
}
.mt20{margin-top:30px;}
.pt10{position: relative;top: 5px;}
</style>
