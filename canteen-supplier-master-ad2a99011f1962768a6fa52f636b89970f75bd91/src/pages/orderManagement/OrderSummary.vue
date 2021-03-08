<template>
	<div class="pd58 positionR">
		<div class="orderListHead jsonContent">
			<div class="flexsd">
				<div class="mr30 newMars">
					<label>产品：</label>
					<a-input placeholder="产品名称/代码" v-model="seachContent.keyword" class="wlist260" />
				</div>
				<div class="newMars">
					<label>学校：</label>
					<a-input placeholder="学校名称" v-model="seachContent.school_name" class="wlist260" />
				</div>
				<a-button type="primary" @click="searchs" class="btnH40 newMars">搜索</a-button>
			</div>
		<!-- 	<div class="">
				<a-button type="primary" class="btnH40 mr15" @click="printfile('week')">打印周汇总</a-button>
				<a-button type="primary" class="btnH40 mr15" @click="exportFile('week')">导出周汇总</a-button>
				<a-button type="primary" class="btnH40 mr15" @click="printfile('mouth')">打印月汇总表</a-button>
				<a-button type="primary" class="btnH40 mr15" @click="exportFile('mouth')">导出月汇总表</a-button>
			</div> -->
		</div>
		<div class="newsFlex">
			<div class="orderListHead">
				<div class="mr30 newMars">
					<label>学期：</label>
					<a-select
						show-search
						placeholder="请选择"
						valueFormat="YYYY-MM-DD"
						option-filter-prop="children"
						class="wlist260"
						v-model="seachContent.year"
						@change="changeSelectYears"
					>
						<a-select-option value="">全部</a-select-option>
						<a-select-option :value="item.id" v-for="(item,index) in years" :key="index">{{item.year}}{{item.semester}}</a-select-option>
					</a-select>
				</div>
				 <timeSelection title="日期" @getTims="getTims" class="newMars"/>
				<!-- <div class="mr30">
					<label>月份：</label>
					<a-select
						show-search
						placeholder="请选择"
						:allowClear="true"
						option-filter-prop="children"
						 valueFormat="YYYY-MM-DD"
						 format="YYYY-MM-DD"
						class="wlist260"
						:disabled="seachContent.year==''?true:false"
						@change="chackMouth"
						v-model="seachContent.month"
					>
						<a-select-option :value="index + 1" v-for="(item,index) in weekArr"  :key="index">{{item}}</a-select-option>
					</a-select>
				</div>
				<div class="">
					<label>周：</label>
					<a-select
						show-search
						:allowClear="true"
						format="YYYY-MM-DD"
						placeholder="请选择"
						option-filter-prop="children"
						 valueFormat="YYYY-MM-DD"
						class="wlist260"
						:disabled="seachContent.year==''?true:false"
						@change="cheackZhou"
						v-model="seachContent.week"
					>
						<a-select-option   :value="item.id" v-for="(item,index) in monthArr" :key="index"> 第{{item.weeks}}周</a-select-option>
					</a-select>
				</div> -->
			</div>
			<div class="newMars">
				<a-button type="primary" class="btnH40 mr15" @click="printfile('week')">打印</a-button>
				<a-button type="primary" class="btnH40 mr15" @click="exportFile('week')">导出</a-button>
			</div>
		</div>
		<div class="total_amount">
			<div>金额合计(元)：</div>
			<span>{{total_priced}}</span>
		</div>
		<div>
			<a-table bordered
			 @change="pageCheck"
			 :loading="loading"
			 :data-source="dataSource" :rowKey="(record,index)=>{return index}" :columns="columns"  :pagination="paginationObj" >
				<template slot="state" slot-scope="text, record">
					{{ record.title }}
				</template>
				<template slot="weeks" slot-scope="text, record">
					第{{record.weeks}}周
				</template>
			</a-table>
		</div>

		<table class="table" border="1" id="tableStyle" cellpadding="0" cellspacing="0" ref="print" v-if="dataSourceEdit!==''">
			<thead>
				<tr>
					<th colspan="11" class="textCenter" style="min-width: 1200px;">
						<!-- <span class="ml40"></span>
						{{dataSourceEdit.month.year}} 年
						{{dataSourceEdit.month.semester}}
						学期
						<span class="ml40"></span>
						 第
             {{printType=="week"?dataSourceEdit.week.weeks:dataSourceEdit.month.month}} -->
						<!-- {{printType=="week"?'周':'月'}} -->
						学校食堂食品及原辅材料配送汇总表
						<!-- <span>（{{dataSourceEdit.min_time}}日 -- {{dataSourceEdit.max_time}}日）</span> -->
					</th>
				</tr>
			<!-- 	<tr>
					<th colspan="18" class="textLeft"><span class="pl10">定点供应商名称：{{dataSourceEdit.supplier}}</span> </th>
				</tr> -->
				<tr>
					<th>配送时间</th>
					<th>学校名称</th>
					<th>产品代码</th>
					<th >产品名称</th>
					<th >产地品牌生产商</th>
					<th >等级规格</th>
					<th >生产日期</th>
					<th >计量单位</th>
					<th >单价(元)</th>
					<th >数量</th>
					<th>金额(元)</th>
					<!-- <th >备注</th> -->
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in dataSourceEdit.data" :key="index">
					<td align="center" width="140">{{item.distribution_time}}</td>
					<td align="center" width="190">{{item.abbreviation}}</td>
					<td align="center" width="110">{{item.product_code}}</td>
					<td align="center" width="230">{{item.product_name}}</td>
					<td align="center" width="320">{{item.manufacturer}}</td>
					<td align="center">{{item.grade}}</td>
					<td align="center">{{item.production_time}}</td>
					<td align="center">{{item.unit}}</td>
					<td align="center">{{item.unit_price}}</td>
					<td align="center">{{item.now_count}}</td>
					<td align="center">{{item.total_price}}</td>
					<!-- <td align="center">{{item.remark}}</td> -->
				</tr>
				<tr>
					<td colspan="2"><span class="pl10">&emsp;金额总计： {{dataSourceEdit.small_total_money}}元</span></td>
					<td colspan="9"><span class="pl10">（大写）： {{dataSourceEdit.big_total_money}}</span>
					</td>
					<!-- <td align="center">*</td> -->
				</tr>
				<!-- <tr style="text-align: left;" v-if="printType=='mouth'">
					<td colspan="9" style="text-align: left;" class="margs">
					<span>食堂名称：</span>
					<span>库管员（签字）：</span>
					<span>收货人（签字）：</span>
					<span>食堂负责人（签字）：</span>
				</td>
				</tr> -->
			</tbody>
		</table>
	</div>
</template>

<script>
import timeSelection from "../../components/TimeSelection/index.vue"
export default {
	data() {
		return {
			loading:false,
			paginationObj:{
				total: 0,
				pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
				current: 1, //显示当前页数
				showSizeChanger: true,
				showQuickJumper:true,
				pageSizeOptions: this.$commonJs.PAGE_LINES,
				showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
			},
			years: [],
			monthArr: [],
			weekArr: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
			dataSource: [],
			dataSourceEdit: "",
			columns: [
				// {
				// 	title: '月份',
				// 	dataIndex: 'month'
				// },
				// {
				// 	title: '周',
				// 	scopedSlots: { customRender: 'weeks' }
				// },
				{
					title: '配送时间',
					dataIndex: 'distribution_time'
				},
				{
					title: '学校名称',
					dataIndex: 'abbreviation'
				},
				{
					title: '产品代码',
					dataIndex: 'product_code'
				},
				{
					title: '产品名称',
					dataIndex: 'product_name'
				},
				{
					title: '产地品牌生产商',
					dataIndex: 'manufacturer'
				},
				{
					title: '等级规格',
					dataIndex: 'grade'
				},
				{
					title: '生产日期',
					dataIndex: 'production_time'
				},
				{
					title: '计量单位',
					dataIndex: 'unit'
				},
				{
					title: '单价（元）',
					dataIndex: 'unit_price'
				},
				{
					title: '数量',
					dataIndex: 'now_count'
				},
				{
					title: '金额（元）',
					dataIndex: 'total_price'
				}
			],
			seachContent:{
				year: '',
				// month: undefined,
				// week: undefined,
				keyword: '',
				page: 1,
				school_name:"",
				start_time:"",
				end_time:"",
				page_size: Number(this.$commonJs.PAGE_LINES[0])
			},
			monthArrTable: [],
			weekExportArr: [],
			total_priced:0
		};
	},
	components:{
		timeSelection
	},
	created() {
		this.seachContentFun()
		this.$http.getSearch({id: ''}).then(res => {
			if (res.code == 1) { 
				this.years = res.data
				// this.getmonth(res.data[0].id)
			}
		});
	},
	methods: {
		getTims(obj){
			this.seachContent.start_time = obj.start_time
			this.seachContent.end_time = obj.end_time
			this.seachContentFun()
		},
		pageCheck(pagetion) { //分页
			var {
				current,
				pageSize
			} = pagetion;
			this.seachContent.page = current;
			this.seachContent.page_size = pageSize;
			this.paginationObj.pageSize = pageSize;
			this.paginationObj.current = current;
			this.seachContentFun()
		},
		searchs(){
			this.seachContent.page = 1
			this.paginationObj.current = 1
			this.seachContentFun()
		},
		exportFile(type){//导出汇总
			// this.seachContent.type = ''
			// if (type == 'mouth') if (!this.seachContent.month)return this.$message.error('请选择需要导出的月份');
			// if (type == 'week') if (!this.seachContent.week)return this.$message.error('请选择需要导出周');
			var objs = JSON.parse(JSON.stringify(this.seachContent))
			objs.supplier_id = this.$store.state.userInfo.supplier_id;
			this.$http.exportExcel(objs)
		},
		printfile(type){ //打印汇总
			// if (type == 'mouth') if (!this.seachContent.month) return this.$message.error('请选择需要打印的月份');
			// if (type == 'week') if (!this.seachContent.week)return this.$message.error('请选择需要打印的周');
			var newsObj = JSON.parse(JSON.stringify(this.seachContent))
			newsObj.type = 2
			this.$http.orderTotal(newsObj).then(res => {
				if (res.code == 1) {
					this.dataSourceEdit = res.data;
					setTimeout(()=>{
						printJS({
						  printable: 'tableStyle',
						  type: 'html',
						  // targetStyles: ['*'],
						  ignoreElements:['no-print','bc','gb'],
						  style:"@media print{@page{size: A4 landscape;}}"
						})
					},200)
				}
			}); 
		},
		changeSelectYears(e){ //选择年，获取周
			// this.getmonth(this.seachContent.year)
			// this.seachContent.month = undefined	
			// this.seachContent.week = undefined
      		this.searchs()
		},
		getmonth(ID){ //获取周
			this.$http.getSearch({id: ID}).then(res => { 
				if (res.code == 1) {
					this.monthArr = res.data
				}
			});
			this.seachContentFun()
		},
		chackMouth(e){ //选择月 
			this.seachContent.month = e
			this.seachContent.week = ''
			this.searchs()
		},
		cheackZhou(e){
			this.seachContent.week = e
			this.searchs()
		},
		seachContentFun(){ 
			this.loading = true;
			this.$http.orderTotal(this.seachContent).then(res => {
				this.loading = false;
				if (res.code == 1) { 
					this.dataSource = res.data.data.data;
					this.total_priced = res.data.total_price;
					this.paginationObj.total = res.data.data.total
				}
			});
		},
		seeDelivery() {
			// 查看详情
			this.$router.push({
				path: 'OrderManagementDetails',
				params: { id: 1 }
			});
		},
		viewSummary() {
			//查看汇总
			this.deliveryState = true;
		},
		viewRecipeWeek() {
			//查看汇总
			this.viewRecipeWeekState = true;
		},
		confirmDelivery() {
			//确认配送 这里应该是弹框
			this.$router.push({
				path: 'OrderManagementDetails',
				params: { id: 1 }
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
.orderListHead {
	display: flex;
	flex-wrap: wrap;
}
.jsonContent {
	justify-content: space-between;
}

.table{width: 100%;}
.textCenter{text-align: center;} .textLeft{text-align: left;} .textRight{text-align: right;}
 .flex{display: flex;}
 .numAndPrice{ width: 100%;}
 .pr10{padding-right: 10px;}
 .numAndPriceState{
	 width: 100%;
 }
 .borderR0{border-right: 0;}
 .pl10{padding-left: 10px;}
 .h40{height: 45px;line-height: 45px;}
 th,td{height: 45px;border: 1px solid #000;text-align: center;}
 .footerContent{display: flex;width: 100%;}
 .footerContent div{width: calc(100% / 3); text-align: left;}
 /* .ml40{margin-left: 40px;} */
 .margs>span:not(:last-child){
   display: inline-block;
   margin-right: 70px;
 }
 .alls>span{
   display: inline-block;
   margin-right: 70px;
 }

.flexsd{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
.newsFlex{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;
}
.newMars{
	margin-bottom: 30px;
}
.total_amount{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-right: 15px;
		margin-bottom: 10px;
		margin-top: -10px;
	}
	.total_amount>span{
		color: red;
	}
</style>
