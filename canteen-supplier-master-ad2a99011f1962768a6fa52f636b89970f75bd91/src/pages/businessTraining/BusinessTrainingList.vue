<template>
	<div class="pd58">
		<div class="mb30 orderListHead">
			<div  class="mr7" >
				<label>培训主题：</label>
				<a-input placeholder="请输入关键词" v-model="seachData.keyword" class="wlist260" />
			</div>
			<a-button type="primary" @click="searchs" class="btnH40">搜索</a-button>
		</div>
		<div class="pageTableHead">
			<div class="pageTableHeadLeft">
				<div class="mr30 flex">
					<label class="pt10">发送日期：</label>
					<a-date-picker
					  format="YYYY-MM-DD"
					  :allowClear="true"
					   class="height40"
					  placeholder="选择日期"
					  valueFormat="YYYY-MM-DD"
					  @change="searchs"
					  v-model="seachData.start_time"
					/>
					<p class="liness pt10">—</p>
					<a-date-picker
					  format="YYYY-MM-DD"
					  valueFormat="YYYY-MM-DD"
					  :allowClear="true"
            @change="searchs"
					  v-model="seachData.end_time"
					  placeholder="选择日期"
					/>
				</div>
			</div>
		</div>
		<div>
			<a-table bordered :data-source="dataSource"
       :loading="loadings"
	   @change="pageCheck"
       :columns="columns" :row-selection="rowSelection" :pagination="pagination">
				<template slot="id" slot-scope="text, record">
					<a href="javascript:;" class="operatingA" @click="seeDetails(record.id)">查看</a>
				</template>
			</a-table>
		</div>

	</div>
</template>

<script>
export default {
	computed: {
	    rowSelection() {
	      return {
	        onChange: (selectedRowKeys, selectedRows) => {
	          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	        },
	        getCheckboxProps: record => ({
	          props: {
	            disabled: record.name === 'Disabled User', // Column configuration not to be checked
	            name: record.name,
	          },
	        }),
	      };
	    },
	  },
	data() {
		return {
      loadings:true,
			pagination:{
				total: 0,
				current: 1,
				pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
                showQuickJumper: true,
				showSizeChanger: true,
				pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
				// onChange:(e)=>{
				// 	this.seachData.page = e
				// 	this.getSeach()
				// },
				showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
			},
			dataSource: [],
			columns: [
				{
					title: '培训主题',
					dataIndex: 'title'
				},
				{
					title: '发送时间',
					dataIndex: 'create_time'
				},
				{
					title: '操作',
					scopedSlots: { customRender: 'id' }
				}
			],
			seachData:{
				keyword: '',
				start_time: '',
				end_time: '',
				page: 1,
				page_size: Number(this.$commonJs.PAGE_LINES[0])
			}
		};
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
			this.getSeach()
		},
		searchs(){
			this.seachData.page = 1
			this.pagination.current = 1
			this.getSeach()
		},
		seeDetails(data){ // 查看详情
			this.$router.push({
				path: 'BusinessTrainingDetails',
				query: { id: data }
			});
		},
		getSeach(){
      this.loadings = true;
			this.$http.businessList(this.seachData).then(res => {
        this.loadings = false;
				if (res.code == 1) {
					let {data,total,per_page} = res.data
					this.pagination.total = total
					this.dataSource = data
				}
			});
		}
	},
	created(){
		this.getSeach()
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
.orderListHead{
	display: flex;
}
.pt10{padding-top: 10px;}
</style>
