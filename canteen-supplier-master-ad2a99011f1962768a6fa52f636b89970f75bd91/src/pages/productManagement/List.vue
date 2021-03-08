<template>
	<div class="pd58">
		<div>
			<div class="mb30">
				<label>产品名称：</label>
				<a-input placeholder="请输入产品名称" v-model="seachData.name" class="wlist310" />
				<a-button type="primary" class="btnH40" @click="searchs">搜索</a-button>
			</div>
		</div>
		<div class="pageTableHead">
			<div class="pageTableHeadLeft">
				<div class="mr30 flex">
					<label class="pt10">上架时间：</label>
					<a-date-picker
					  v-model="seachData.start_time"
					  format="YYYY-MM-DD"
					   valueFormat="YYYY-MM-DD"
					   class="height40 setIconStyleTop"
					  placeholder="选择日期"
					  @change="searchs"
					/>
					<p class="liness pt10">—</p>
					<a-date-picker
					  v-model="seachData.end_time"
					  format="YYYY-MM-DD"
					  class="setIconStyle setIconStyleTop"
					   valueFormat="YYYY-MM-DD"
					  placeholder="选择日期"
					   @change="searchs"
					/>
				</div>
				<div>
					<span>产品分类：</span>
					<a-select
					    style="width: 150px"
					    default-value="全部"
					    placeholder="请选择产品分类"
						v-model="seachData.primary_id"
					     @change="searchs"
					  >
					    <a-select-option :value="item.id" v-for="(item,index) in typeData" :key="index">{{item.name}}</a-select-option>
					</a-select>
				</div>
			</div>
			<a-button type="primary" @click="addProduct('')" class="btnH40">新增产品</a-button>
		</div>
		<div>
			<a-table
			 @change="pageCheck"
			 :loading="loading"
			 bordered :data-source="dataSource" :columns="columns" :pagination="pagination">
				<!-- <template slot="index" slot-scope="text, record,index">
					{{index }}
				</template> -->
				<template slot="image" slot-scope="text, record">
					<img :src="record.image" class="new_img" />
				</template>
				<template slot="primary" slot-scope="text, record">
					<span>{{record.primary}}</span>
						<!-- <span v-if="record.primary">></span> -->
					<span v-if="record.secondary">></span>
					<span>{{record.secondary}}</span>
				</template>
				<template slot="operation" slot-scope="text, record">
					<a href="javascript:;" class="operatingA" @click="seeDetails(record)">查看</a>
					<a href="javascript:;" class="operatingA"  @click="addProduct(record,'edit')">编辑</a>
					<a href="javascript:;" class="operatingA"  @click="offShelf(record)">{{record.status == '上架' ? '下架' : '上架'}}</a>
				</template>
			</a-table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			typeData:[{id:"",name:"全部"}],
			loading:false,
			pagination:{
				total: 0,
				current: 1,
				pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
				pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
                showQuickJumper: true,
				showSizeChanger: true,
				// onChange:(e)=>{          //分页触发
				// 	this.seachData.page = e
				// 	this.seachContent()
				// },
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
					dataIndex: 'primary',
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
				status: '0',
				name: '',
				page: 1,
				page_size: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
				start_time: '',
				end_time: '',
				primary_id:""
			}
		};
	},
	mounted() {
		this.seachContent()
		this.getTypes()
	},
	methods: {
		getTypes(){          //获取产品分类
			this.$http.getProductList().then((res)=>{
				if(res.code==1){
					this.typeData = this.typeData.concat(res.data)
				}
			})
		},
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
		changeTime(){
			this.seachContent()
		},
		searchs(){
			this.seachData.page = 1
			this.pagination.current = 1
			this.seachContent()
		},
		seachContent(){
			this.loading = true;
			this.$http.productCangku(this.seachData).then(res => {
				this.loading = false;
				if (res.code == 1) {
					let { total,per_page,current_page,last_page,data } = res.data
					this.pagination.total = Number(total)
					this.pagination.pageSize =Number(per_page)
					if (data.length > 0){
						for (let i = 0; i < data.length; i++){
							data[i].index = i + 1
						}
					}
					this.dataSource = data
				}
			});
		},
		offShelf(node){
			var that = this
			that.$confirm({
				title:`${node.state == 0 ? "上架" : "下架" }操作`,
				content: `您确定要对此项进行${node.state == 0 ? '上架' : '下架 '}操作吗?`,
				okText: '确认',
				cancelText: '取消',
				onOk() {
					that.$http.productOnOff({id: node.id}).then(res => {
						if (res.code == 1) {
							console.log(res.data)
							that.seachContent()
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
		seeDetails(node){
			this.$router.push({
				path: 'productManagementDetails',
				query: { id: node.id }
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
.new_img{
  width: 70px;
  object-fit: cover;
  height: 70px;
}
</style>
