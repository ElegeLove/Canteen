<template>
	<div class="pd58">
		<div>
			<div class="mb30">
				<label>产品名称：</label>
				<a-input placeholder="请输入" v-model="seachData.name" class="wlist260" />
				<a-button type="primary" class="btnH40" @click="searchs">搜索</a-button>
			</div>
		</div>
		<div class="pageTableHead">
			<div class="pageTableHeadLeft">
				<div class="mr30">
					<div class="mr30 flex">
						<label class="pt10">上架时间：</label>
						<a-date-picker
						  v-model="seachData.start_time"
						  format="YYYY-MM-DD"
						   class="height40"
						   valueFormat="YYYY-MM-DD"
						  placeholder="选择日期" 
						   @change="searchs"
						/>
						<p class="liness pt10">—</p>
						<a-date-picker
						  v-model="seachData.end_time"
						  format="YYYY-MM-DD"
						  placeholder="选择日期" 
						  valueFormat="YYYY-MM-DD"
						  @change="searchs"
						/>
					</div>
				</div>
			</div>
		</div>
		<div>
			<a-table bordered :data-source="dataSource"
			  @change="pageCheck"
			  :loading="loading"
			 :columns="columns" :pagination="pagination">
				<template slot="image" slot-scope="text, record, index">
					<img :src="record.image" class="tableImg" />
				</template> 
				<template slot="primary" slot-scope="text, record">
					<span>{{record.primary}}</span> <span v-if="record.secondary">> </span> <span>{{record.secondary}}</span>
				</template> 
				<template slot="operation" slot-scope="text, record">
					<a href="javascript:;" class="operatingA" @click="seeDetails(record)">查看</a>
					<a href="javascript:;" class="operatingA"  @click="addProduct(record,'edit')">编辑</a>
					<a href="javascript:;" class="operatingA"  @click="offShelf(record)">{{record.status ==  "上架" ? "下架" : "上架"}}</a>
					<a href="javascript:;" class="operatingA"  @click="removeProduct(record,)">删除</a>

				</template>
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
				showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
			},
			dataSource: [],
			columns: [
				{
					title: '序号',
					dataIndex: 'sort'
				},
				{
					title: '产品图片',
					scopedSlots: { customRender: 'image' }
				},
				{
					title: '产品名称',
					dataIndex: 'title'
				},
				{
					title: '所属类目',
					scopedSlots: { customRender: 'primary' }
				},
				{
					title: '单价(元)',
					dataIndex: 'unit_meterage'
				},
				{
					title: '上架时间',
					dataIndex: 'update_time'
				},
				{
					title: '当前状态',
					dataIndex: 'status'
				},
				{
					title: '操作',
					scopedSlots: { customRender: 'operation' }
				}
			],
			seachData:{
				status: '1',
				name: '',
				start_time: '',
				end_time: '',
				page: 1,
				page_size: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
			}
		};
	},
	created() {
		this.seachContent('one')
	},
	methods: {
		pageCheck(pagetion) { //分页
			var {
				current,
				pageSize
			} = pagetion;
			this.seachData.page = current;
			this.seachData.page_size = pageSize;
			this.pagination.pageSize = pageSize;
			this.pagination.current = current;
			this.seachContent()
		},
		select_timeFun(e){
			this.seachContent()
		},
		searchs(){
			this.seachData.page = 1
			this.pagination.current = 1
			this.seachContent()
		},
		seachContent(isOneLoad){
			if (isOneLoad == 'one'){
				this.seachData.start_time = null
				this.seachData.end_time = null
			}  
			this.loading = true;
			this.$http.productCangku(this.seachData).then(res => {
				this.loading = false;
				if (res.code == 1) {
					let { total,per_page,current_page,last_page,data } = res.data
					this.pagination.total = total
					// this.pagination.pageSize = per_page 
					if (data.length > 0){
						for (let i = 0; i < data.length; i++){
							data[i].index = i + 1
						}
					}
					this.dataSource = data
				}
			});
		},
		seeDetails(node){ 
			this.$router.push({ 
				path: 'productManagementDetails',
				query: { id: node.id }
			});
		}, 
		removeProduct(node){
			var that = this
			that.$confirm({
				title:`删除操作`,
				content: `您确定要删除此产品吗?`,
				okText: '确认',
				cancelText: '取消',
				onOk() {
					that.$http.productDel({id: node.id}).then(res => {
						if (res.code == 1) { 
							that.seachContent('one')
						} 
					});
				},
				onCancel() {
					
				},
			  });
		},
		offShelf(node){
			var that = this
			that.$confirm({
				title:`${node.status ==  "上架" ? "下架" : "上架" }操作`,
				content: `您确定要对此项进行${node.status ==  "上架" ? '下架' : '上架 '}操作吗?`,
				okText: '确认',
				cancelText: '取消',
				onOk() {
					that.$http.productOnOff({id: node.id}).then(res => {
						if (res.code == 1) {
							console.log(res.data) 
							that.seachContent('one')
						} 
					});
				},
				onCancel() {
					
				},
			  });
		}, 
		addProduct(node,type) {
 			this.$router.push({
				path: 'ProductManagementAdd',
				query: { id: type ? node.id : '',name: node.title }
			});
		},
	}
};
</script>

<style scoped="scoped">
.w200px {
	width: 200px;
}
.wlist260 {
	width: 260px;
	margin-right: 20px;
}
.mb30 {
	margin-bottom: 30px;
}
.pt10{position: relative;top: 10px;}
</style>
