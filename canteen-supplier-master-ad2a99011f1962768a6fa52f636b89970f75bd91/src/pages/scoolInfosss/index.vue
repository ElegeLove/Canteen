<template>
	<div class="pd58">
		<div>
			<div class="pageTableHead">

				<a-form :form="form" class="pageTableHeadLeft" @submit="handleSubmit">
					<a-form-item>
						<div  class="flexWarp">
							<div class="mr30">
								<label>状态：</label>
								<!--  -->
								<a-select
									class="w200px height40"
									placeholder="全部"
									@change="cheackSchoolState"
									v-decorator="['state', { rules: [{ required: false, message: '请选择状态' }] }]"
								>
									<a-select-option :value="item.type" v-for="(item, index) in schoollistState" :key="index">{{ item.label }}</a-select-option>
								</a-select>
							</div>
							<div class="mr30 flex">
								<label class="">关联时间：</label>
								<a-date-picker
								  v-model="schoollistSeachData.start_time"
								  format="YYYY-MM-DD"
								   class="height40 setIconStyle"
								    valueFormat="YYYY-MM-DD"
								  placeholder="开始日期"
                  @change="searchs"
								/>
								<p class="liness ">—</p>
								<a-date-picker
								  class="setIconStyle "
								  v-model="schoollistSeachData.end_time"
								   valueFormat="YYYY-MM-DD"
								  format="YYYY-MM-DD"
								  placeholder="结束日期"
                   @change="searchs"
								/>
							</div>
						<!-- 	<div class="pageTableHeadBtns mr30 btn_boxsd">
								<a-button type="primary" class="btnH40"  @click="getList"  html-type="submit" >查询</a-button>
								<a-button type="danger" class="btnH40" @click="clearData">重置</a-button>
							</div> -->
						</div>
					</a-form-item>
				</a-form>
				<a-button type="primary" @click="addAssociatedSchool" class="btnH40" v-if="related_application==2">添加关联学校</a-button>
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
				status: '',
				start_time: '',
				end_time: '',
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
			related_application:1
		};
	},
	mounted() {
		this.getList()
	},
	methods: {
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
		cheackSchoolState(e){
			this.schoollistSeachData.status = e
			this.searchs()
		},
		searchs(){
			this.schoollistSeachData.page = 1
			this.pagination.current = 1
			this.getList()
		},
		handleSubmit(e){ //查询
			e.preventDefault();
			this.form.validateFields((err, values) => { 
				let {state,picker} = values
				this.schoollistSeachData.status = state
				this.schoollistSeachData.start_time = picker[0]
				this.schoollistSeachData.end_time = picker[1]
				this.getList()
			});
		},
		getList() {  //获取列表数据
			this.loading = true
			this.$http.schoollist(this.schoollistSeachData).then(res => {
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
				query: { id: key.id }
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
.pageTableHead{margin-bottom: 0;}
.setIconStyle{margin-top: 5px;}
.flexWarp{flex-wrap: wrap;display: flex;}
.pt10{position: relative;top: 10px;}
.btn_boxsd>button{
  height: 30px !important;
}
</style>
