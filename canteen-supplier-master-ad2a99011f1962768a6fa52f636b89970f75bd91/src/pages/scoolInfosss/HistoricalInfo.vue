<template>
	<div class="pd58">
		<div>
			<div class="pageTableHead">
				<div class="disWeek">
					<div class="title">合同到期时间节点：</div>
					<a-select
					v-model="schoollistSeachData.disassociate_id"
					default-value
					style="width: 120px"
					@change="getWeekData"
					>
					<a-select-option value>全部</a-select-option>
					<a-select-option
						v-for="(item,index) in timeList"
						:key="index"
						:value="item.id"
					>{{item.create_time_text}}</a-select-option>
					</a-select>
				</div>
			</div>
		</div>
		<div>
			<a-table bordered 
			@change="pageCheck" 
			:loading="loading"
			:data-source="dataSource" :columns="columns" :pagination="pagination">
				<template slot="logo" slot-scope="text, record">
					<img :src="record.logo"   class="tableImg" />
				</template>
				<template slot="operation" slot-scope="text, record">
					<a href="javascript:;" @click="seeDetails(record)">查看</a>
				</template>
			</a-table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: this.$form.createForm(this),
			valueData: '',
			loading:false,
			pagination: { 
				total: 0,
				current: 1,
				pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
				pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
                showQuickJumper: true,
				showSizeChanger: true,
				// onChange: e => {
				// 	this.schoollistSeachData.page = e
				// 	this.getList()
				// },
				showTotal: total => `共有 ${total} 条数据` //分页中显示总的数据
			},
			schoollistState: [{ type: '', label: '全部' },{ type: '0', label: '申请中' }, { type: '1', label: '合作中' }, { type: '2', label: '已到期' }, { type: '3', label: '已拒绝' }],
			value: this.text,
			schoollistSeachData: {
				disassociate_id: '',
				page: 1,
				page_size:Number(this.$commonJs.PAGE_LINES[0])
			},
			dataSource: [],
			columns: [
				{
					title: 'LOGO',
					scopedSlots: { customRender: 'logo' }
				},
				{
					title: '学校名称',
					dataIndex: 'full_name'
				},
				{
					title: '状态',
					dataIndex: 'status'
				},
				{
					title: '操作人',
					dataIndex: 'contacts'
				},
				{
					title: '关联时间',
					dataIndex: 'create_time'
				},
				{
					title: '操作',
					scopedSlots: { customRender: 'operation' }
				}
			],
			related_application:1,
			timeList:[],
		};
	},
	mounted() {
		this.getList();
		this.getWeek();
	},
	methods: {
		getWeek(){
			this.$http.timeList({}).then(res => {
				if (res.code == 1) {
					this.timeList = res.data;
				}
			});
		},
		getWeekData(){
			this.pagination.pageSize = pageSize;
			this.getList()
		},
		pageCheck(pagetion) { //分页
			var {
				current,
				pageSize
			} = pagetion;
			this.schoollistSeachData.page = current;
			this.schoollistSeachData.page_size = pageSize;
			this.pagination.pageSize = pageSize;
			this.pagination.current = current;
			this.getList()
		},
		getList() {  //获取列表数据
			this.loading = true
			this.$http.HistoryList(this.schoollistSeachData).then(res => {
				this.loading = false
				if (res.code == 1) {
					let { current_page, total, per_page, data,related_application } = res.data;
					this.pagination.total = total;
					this.dataSource = data;
					this.related_application = related_application;
				}
			});
		},
		clearData(){ //重置
			this.form.resetFields();
			this.schoollistSeachData.status = ''
			this.schoollistSeachData.start_time  = ''
			this.schoollistSeachData.end_time  = ''
			this.getList()
		},
		addAssociatedSchool() {
			this.$router.push({
				path: 'addAssociatedSchool'
			});
		},
		seeDetails(key) {
			this.$router.push({
				path: 'relatedSchoolDetails',
				query: { id: key.id,type:1 }
			});
		}
	}
};
</script>

<style scoped="scoped">
.w200px {
	width: 200px;
}
.tableImg{
	width: 90px;
	height: 90px;
	object-fit: contain;
}
.pageTableHead{margin-bottom: 20px;}
.disWeek{
	display: flex;
	align-items: center;
}
.setIconStyle{margin-top: 5px;}
.flexWarp{flex-wrap: wrap;display: flex;}
.pt10{position: relative;top: 10px;}
.btn_boxsd>button{
  height: 30px !important;
}
</style>
