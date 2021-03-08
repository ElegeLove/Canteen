<template>
	<div class="pd58">
		<div class="mb30 orderListHead jsonContent">
			<div class="seachInputFlex flex"> 
				<div class="">
					<label>订单：</label>
					<a-input placeholder="订单号" v-model="seachData.order_sn" class="wlist260" />
				</div>
				<div class="">
					<label>客户名称：</label>
					<a-input placeholder="客户名称"  v-model="seachData.name" class="wlist260" />
				</div>
				<div class="">
					<label>状态：</label>
					<a-select
					    show-search
						@change="cheackState"
					    placeholder="全部"
					    class="wlist260"
						v-model="seachData.status" 
					  >
					  <a-select-option value="">
						  全部
						</a-select-option>
						<a-select-option value="0">
						  待结算
						</a-select-option>
					    <a-select-option value="1">
					      结算中
					    </a-select-option> 
						<a-select-option value="2">
					      已结算
					    </a-select-option> 
					  </a-select> 
				</div>
				<a-button type="primary" @click="searchs" class="btnH40">搜索</a-button>
			</div>
		</div>
		<div class="mb30 orderListHead">
			<div class="mr30">
				<label>学期：</label>
				<a-select
					show-search
					placeholder="请选择"
					valueFormat="YYYY-MM-DD"
					option-filter-prop="children"
					class="wlist260"
					v-model="seachData.calendar_id"
					@change="changeSelectYears"
				>
					<a-select-option value="">全部</a-select-option>
					<a-select-option :value="item.id" v-for="(item,index) in weeksList" :key="index">{{item.year}}{{item.semester}}</a-select-option>
				</a-select>
			</div>
			<div class="mr30 flex">
				<label class="pt10">日期：</label>
				<a-date-picker 
				  format="YYYY-MM-DD"
				   class="height40"
				  placeholder="选择日期" 
				  valueFormat="YYYY-MM-DD"
				  @change="chageTime"
				  v-model="seachData.start_time"
				/>
				<p class="liness pt10">—</p>
				<a-date-picker 
				  format="YYYY-MM-DD"
				  valueFormat="YYYY-MM-DD"
				  v-model="seachData.end_time"
				  @change="chageTime"
				  placeholder="选择日期" 
				/>
			</div>
			<a-button type="primary"  @click="sendSets" class="btnH40">批量结算</a-button>
		</div>
		<div>
			<div class="checkTis">
				<div>
					<span>金额合计（元）：</span>
					<span>{{subTotal.total_price}}</span>
				</div>
				<div @click="checkTypes">{{typeShow?'收起':'展开'}}分类小计</div>
			</div>
			<div class="type_arr" v-show="typeShow">
				<div v-for="(item,index) in subTotal.catePrice" :key="index">{{item.product}}：{{item.price}}元</div>
			</div>
		</div>
		<div>
			<a-table bordered
			 @change="pageCheck"
			 :loading="loading"
			 :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange,getCheckboxProps:getCheckboxProps }"
			 :rowKey="(record,index)=>{return record.id}"
			 :data-source="dataSource" :columns="columns" :pagination="pagination">
				<template slot="operation" slot-scope="text, record">
					<a href="javascript:;" class="operatingA" @click="seeDetails(record)">查看</a> 
					<a href="javascript:;" class="operatingA"  v-if="record.status == 1" @click="confirmSettlement(record)">确认结算</a> 
				</template> 
			</a-table>
		</div> 
		<a-modal v-model="seeDetailsState" title="配送记录" @ok="seeDetailsState = false" width="1000px" cancelText="关闭" visible="false" okText="确定" :closable="false">
			<div class="mb20">配送时间: {{detailsObj.distribution_time}}  <span style="margin-left:100px;"> 总金额: {{detailsObj.price_total}}元</span></div>
		    <a-table bordered :data-source="dataSourceData" :columns="detailsColumns"> 
				<template slot="total_price" slot-scope="text, record">
					<span class="priceNum">￥{{ record.total_price }}</span>
				</template>
		    </a-table>
		</a-modal>
		<a-modal
		  v-model="model_show"
		  title="发起结算"
		  centered
		  @ok="subModel"
		>
		  <p class="conts">确认结算吗?</p>
		</a-modal>
	</div>
</template>
<script>
export default {
	data() {
		return {
			 model_show:false,
			selectedRowKeys: [],
			subTotal:{},   //分类小计
			typeShow:false,
			loading:false,
			pagination:{
				  total: 0,
				  current: 1,
				  pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
				  pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
				  showQuickJumper: true, 
				  showSizeChanger: true,
				  // onChange:(e)=>{
					 //  this.seachData.page = e
					 //  this.seachContent()
				  // },
				  showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
			},
			seachData:{
				start_time: '',
				end_time: '',
				calendar_id:'',
				order_sn: '',
				name: '',
				page: 1,
				page_size: Number(this.$commonJs.PAGE_LINES[0]),
				status: ''
			},
			detailsObj: {},
			seeDetailsState: false,
			dataSourceData: [],
			dataSource: [],
			columns: [
				{
					title: '期望配送时间',
					dataIndex: 'distribution_time'
				},
				{
					title: '所属订单号',
					dataIndex: 'order_sn'
				},
				// {
				// 	title: '批次号',
				// 	dataIndex: 'batch_number'
				// },
				{
					title: '客户名称',
					dataIndex: 'school_name'
				},
				{
					title: '总配送数量',
					dataIndex: 'number_total'
				},
				{
					title: '金额(元)',
					dataIndex: 'price_total'
				},
				{
					title: '结算状态',
					dataIndex: 'status1'
				},
				// {
				// 	title: '状态',
				// 	dataIndex: 'status'
				// },
				{
					title: '操作',
					scopedSlots: { customRender: 'operation' }
				} 
			],
			detailsColumns:[
				{
					title: '产品名称',
					dataIndex: 'product_name'
				},
				{
					title: '产品代码',
					dataIndex: 'product_code'
				},
				{
					title: '产品单价（元）',
					dataIndex: 'unit_price'
				},
				{
					title: '配送数量',
					dataIndex: 'now_count'
				},
				{
					title: '单位',
					dataIndex: 'unit'
				},
				{
					title: '总金额（元）',
					scopedSlots: { customRender: 'total_price' }
				}
			],
			actionIds:{              //批量结算的数据
			  ids:[]
			},
			weeksList:[],
		};
	},
	created(){
		this.seachContent();
		this.getWeek();
	},
	methods: {
		getWeek(){
			this.$http.getSearch({id: ''}).then(res => {
				if (res.code == 1) { 
					this.weeksList = res.data;
					// this.getmonth(res.data[0].id)
					// this.getdeliveryTotal();
				}
			});
		},
		changeSelectYears(e){ //选择年，获取周
			this.seachContent();
		},
		sendSets(){          //发起结算
		  if(this.actionIds.ids.length==0){
		    return this.$message.error("请选择订单");
		  }
		  this.model_show = true;
		},
		subModel(){        //确认结算
		  this.model_show = false;
		  this.$http.orderBatchSettlement(this.actionIds).then((res)=>{
		    if(res.code==1){
		      this.emptyCheck();
		      this.seachContent()
		    }
		  })
		},
		getCheckboxProps(record){
		  return {
		     props: {
		      disabled: record.status ==0|| record.status ==2,
		      status: record.status,
		    }
		  }
		},
		onSelectChange(selectedRowKeys,item) {
		   this.selectedRowKeys = selectedRowKeys;
		   var arr = []
		   item.forEach((item)=>{
		     arr.push(item.id)
		   })
		   this.actionIds.ids = arr;
		},
		emptyCheck(){        //清空选中
		  this.selectedRowKeys = []
		  this.actionIds.ids = []
		},
		checkTypes(){   //切换分类小计
			this.typeShow = !this.typeShow
		},
		searchs(){
			this.seachData.page = 1
			this.pagination.current = 1
			this.seachContent()
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
		cheackState(state){ //状态下拉选择
			this.seachData.status = state
			this.searchs()
		},
		chageTime(){
			this.searchs();
		},
		confirmSettlement(node){ //确认结算
			var that = this
			this.$confirm({
				title: '确认结算',
				content: '您确定要确认结算吗？',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk() {
					that.$http.trueSettlement({id: node.id}).then(res => {
					if (res.code == 1) { 
						that.seachContent()
					}
				});  
				},
				onCancel() {
					console.log('Cancel');
				}
			});


	
		},
		seachContent(){
			this.emptyCheck()
			this.loading = true;
			this.$http.deliveryRecord(this.seachData).then(res => {
				this.loading = false;
				if (res.code == 1) { 
					let {data,catePrice } = res.data;
					this.subTotal = catePrice;
					this.pagination.total = data.total;
					this.pagination.page_size = data.per_page; 
					this.dataSource = data.data;
				}
			}); 
		},
		seeDetails(data){ // 查看详情 
			this.detailsObj = data
			this.seeDetailsState = true
			this.dataSourceData  = []
			this.$http.deliveryRecordDetail({id: data.id}).then(res => {
				if (res.code == 1) { 
					let { total,per_page,current_page,last_page,distributionDetail } = res.data
					this.pagination.total = total 
					this.dataSourceData = distributionDetail
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
.wlist260 {
	width: 260px;
	margin-right: 20px;
}
.mb30 {
	margin-bottom: 30px;
}
.pt10{padding-top: 10px;}
.orderListHead{
	display: flex;
}
.conts{
  text-align: center;
  font-size: 16px;
  color: #333333;
  margin: 20px 0;
}
.jsonContent{justify-content: space-between;}
.checkTis{
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-bottom: 10px;
	margin-right: 10px;
}
.checkTis>div:nth-of-type(1){
	margin-right: 30px;
}
.checkTis>div:nth-of-type(1)>span:nth-of-type(2){
	color: red;
}
.checkTis>div:nth-of-type(2){
	cursor: pointer;
	color: #1890ff;
}
.type_arr{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	box-sizing: border-box;
	padding: 0 10px;
}
.type_arr>div{
	min-width: 200px;
	margin-right: 10px;
	white-space: nowrap;
	margin-bottom: 15px;
}
</style>
