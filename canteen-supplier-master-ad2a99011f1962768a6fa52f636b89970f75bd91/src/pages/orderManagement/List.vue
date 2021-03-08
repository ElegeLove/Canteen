<template>
	<div class="pd58">
		<div class="mb30 orderListHead">
			<div class="mr30">
				<label>订单号：</label>
				<a-input placeholder="订单号" v-model="seachData.order_sn" class="w200px" />
			</div>
			<div class="">
				<label>客户名称：</label>
				<a-input placeholder="客户名称" v-model="seachData.name" class="w200px" />
			</div>
			<a-button type="primary" class="btnH40" @click="searchs">搜索</a-button>
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
			<div class="mr30">
				<label>订单状态：</label>
				<a-select show-search @change="cheackState('状态')" placeholder="全部" class="w160px" v-model="seachData.status">
					<a-select-option value=""> 全部 </a-select-option>
					<a-select-option value="0"> 待确认 </a-select-option>
					<a-select-option value="1"> 已确认 </a-select-option>
				</a-select>
			</div>
			<div class="mr30">
				<label>汇总状态：</label>
				<a-select show-search @change="cheackState()" placeholder="全部" class="w160px" v-model="seachData.is_gather">
					<a-select-option value=""> 全部 </a-select-option>
					<a-select-option value="0"> 未汇总 </a-select-option>
					<a-select-option value="1"> 已汇总 </a-select-option>

				</a-select>
			</div>
			<div class="">
				<label>打印状态：</label>
				<a-select show-search @change="cheackState()" placeholder="全部" class="w160px" v-model="seachData.is_printing">
					<a-select-option value=""> 全部 </a-select-option>
					<a-select-option value="0"> 未打印 </a-select-option>
					<a-select-option value="1"> 已打印 </a-select-option>
				</a-select>
			</div>
		</div>
		<div class="orderListHead">
			<div class="mr30 flex">
				<label class="pt10">下单时间：</label>
				<a-date-picker format="YYYY-MM-DD" class="height40" placeholder="选择日期" @change="changeVal" valueFormat="YYYY-MM-DD"
				 v-model="seachData.start_time" />
				<p class="liness pt10">—</p>
				<a-date-picker format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" @change="changeVal" v-model="seachData.end_time"
				 placeholder="选择日期" />
			</div>

			<div class="mr30 flex">
				<label class="pt10">配送时间：</label>
				<a-date-picker format="YYYY-MM-DD" class="height40" placeholder="选择日期" @change="changeVal" valueFormat="YYYY-MM-DD"
				 v-model="seachData.distribution_start_time" />
				<p class="liness pt10">—</p>
				<a-date-picker format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" @change="changeVal" v-model="seachData.distribution_end_time"
				 placeholder="选择日期" />
			</div>
			<a-button type="primary" class="btnH40" @click="confirmedSummaryFun">待确认汇总</a-button>
		</div>
		<div class="total_amount">
			<div>金额合计(元)：</div>
			<span>{{total_priced}}</span>
		</div>
		<a-table bordered :data-source="dataSource" 
		:columns="columns" @change="pageCheck" 
		:rowKey="(record,index)=>{return record.id}"
		:row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange,getCheckboxProps:getCheckboxProps }"
		 :pagination="pagination" :loading="loading">
			<template slot="operation" slot-scope="text, record">
				<a href="javascript:;" class="operatingA" @click="confirmDelivery(record)" v-if="record.status1 == '已确认'">查看</a>
				<a href="javascript:;" class="operatingA" @click="confirmDelivery(record)" v-else>确认配送</a>
				<a href="javascript:;" class="operatingA" v-if="record.status == '2'" @click="viewSummary(record, 'edit')">打印交接单</a>
				<!-- <a href="javascript:;" class="operatingA"  @click="viewRecipeWeek(record)">查看周食谱</a> getCheckboxProps:getCheckboxProps-->
			</template>
		</a-table>

		<a-modal v-model="deliveryState" title="查看配送汇总" width="1000px" @ok="printExcelFun" cancelText="关闭" visible="false"
		 okText="打印交接单" :closable="false">
			<a-table bordered :data-source="dataSourceDelivery"
			 :pagination="paginationDelivery"
			 @change="pageCheckTwo"
			 :scroll="{ y: 500 }"
			 :columns="deliveryColumns">
				<template slot="name" slot-scope="text, record">
					<editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
				</template>
			</a-table>
		</a-modal>

		<a-modal v-model="viewRecipeWeekState" title="查看周食谱" width="1000px" cancelText="关闭" visible="false" okText="确定"
		 :closable="false">
			<table class="WeekTable">
				<thead>
					<tr>
						<th>餐次</th>
						<th>周一</th>
						<th>周二</th>
						<th>周三</th>
						<th>周四</th>
						<th>周五</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in dataSourceWeek" :key="index">
						<td>{{ item.type_text }}</td>
						<td @click="seeDetails(item.list[0])">
							<a-icon type="eye" v-if="item.list[0].is == 1" />
							<span v-else>--</span>
						</td>
						<td @click="seeDetails(item.list[1])">
							<a-icon type="eye" v-if="item.list[1].is == 1" />
							<span v-else>--</span>
						</td>
						<td @click="seeDetails(item.list[2])">
							<a-icon type="eye" v-if="item.list[2].is == 1" />
							<span v-else>--</span>
						</td>
						<td @click="seeDetails(item.list[3])">
							<a-icon type="eye" v-if="item.list[3].is == 1" />
							<span v-else>--</span>
						</td>
						<td @click="seeDetails(item.list[4])">
							<a-icon type="eye" v-if="item.list[4].is == 1" />
							<span v-else>--</span>
						</td>
					</tr>
				</tbody>
			</table>
		</a-modal>

		<a-modal v-model="deliveryDetailsState" title="带量公示表" width="1000px" @ok="offSeeExCel" @cancel="offSeeExCel"
		 cancelText="关闭" visible="false" okText="确定" :closable="false">
			<div class="delieryItem" v-for="(item, index) in deliveryDetailsArr" :key="index">
				<div class="delieryType">{{ item.name }}</div>
				<div class="delieryTitle">主要材质</div>
				<div class="delieryDetailsContent">
					<div class="list" v-for="(node, idx) in item.main" :key="idx">
						<div class="bg858585">{{ node.name }}</div>
						<div class="unitNum">{{ node.unit }}</div>
					</div>
				</div>
			</div>
		</a-modal>

		<a-modal v-model="confirmedSummaryState" title="待确认汇总" 
		:afterClose="afterClosed"
		width="1000px" @ok="printSummary" :footer="null" :closable="false">
			<a-table bordered :data-source="confirmedSummaryDataSource" :columns="confirmedSummaryColumns" :pagination="false">
			</a-table>
			<div class="footerBtns">
				<a-button type="primary" @click="exportSummary" style="margin-right: 20px">导出</a-button>
				<a-button type="primary" @click="printSummary">打印</a-button>
			</div>
		</a-modal>
		<div id="printTable">
			<table id="printTabless">
				<thead>
					<tr>
						<th colspan="8" style="width: 100%; text-align: center; color: #000">
							待确认汇总表
						</th>
					</tr>
					<tr>
						<th>产品代码</th>
						<th>产品名称</th>
						<th>产地品牌生产商</th>
						<th>等级规格</th>
						<th>计量单位</th>
						<th>单价（元）</th>
						<th>数量</th>
						<th>金额（元）</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in confirmedSummaryDataSource" :key="index">
						<td>{{ item.code }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.manufacturer }}</td>
						<td>{{ item.grade }}</td>
						<td>{{ item.unit }}</td>
						<td>{{ item.unit_price }}</td>
						<td>{{ item.number }}</td>
						<td>{{ item.total_price }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<printtabs :info="printDataObj" />
	</div>
</template>

<script>
	import print from "print-js";
	import {
		getLodop
	} from "../../assets/js/LodopFuncs"
	import printtabs from "./printModel.vue";
	export default {
		components: {
			printtabs,
		},
		data() {
			return {
				loading: true,
				printDataObj: {},
				orderObj: {},
				pagination: {
					total: 0,
					current: 1,
					pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
					pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
					showQuickJumper: true,
					showSizeChanger: true,
					// onChange: (e) => {
					//   this.seachData.page = e;
					//   this.seachContent();
					// },
					showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
				},
				paginationDelivery: {
					total: 0,
					current:1,
					pageSize: Number(this.$commonJs.PAGE_LINES[0]),//每页中显示10条数据
					showSizeChanger: true,
					showQuickJumper:true,
					pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
					showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
				},
				rangeConfig: {
					rules: [{
						type: "array",
						required: true,
						message: "请选择时间!",
					}, ],
				},
				confirmedSummaryState: false,
				dataSourceDelivery: [],
				editable: false,
				dataSource: [],
				dataSourceWeek: [],
				confirmedSummaryDataSource: [],
				confirmedSummaryColumns: [{
						title: "产品代码",
						dataIndex: "code",
					},
					{
						title: "产品名称",
						dataIndex: "name",
					},
					{
						title: "产地品牌生产商",
						dataIndex: "manufacturer",
					},
					{
						title: "等级规格",
						dataIndex: "grade",
					},
					{
						title: "计量单位",
						dataIndex: "unit",
					},
					{
						title: "单价（元）",
						dataIndex: "unit_price",
					},
					{
						title: "数量",
						dataIndex: "number",
					},
					{
						title: "金额（元）",
						dataIndex: "total_price",
					},
				],
				columns: [{
						title: "订单号",
						dataIndex: "order_sn",
					},
					{
						title: "客户名称",
						dataIndex: "abbreviation",
					},
					{
						title: "采购种类数量",
						dataIndex: "species",
					},
					{
						title: "金额（元）",
						dataIndex: "total_amount",
					},
					{
						title: "留言",
						dataIndex: "remark",
					},
					{
						title: "状态",
						dataIndex: "status1",
					},
					{
						title: "汇总状态",
						dataIndex: "is_gather_text",
					},
					{
						title: "打印状态",
						dataIndex: "is_printing",
					},
					{
						title: "配送时间",
						dataIndex: "distribution_time",
					},
					{
						title: "下单时间",
						dataIndex: "create_time",
					},
					{
						title: "操作",
						scopedSlots: {
							customRender: "operation",
						},
					},
				],
				deliveryState: false,
				viewRecipeWeekState: false,
				deliveryColumns: [{
						title: "产品代码",
						dataIndex: "product_code",
					},
					{
						title: "产品名称",
						dataIndex: "product_name",
					},
					{
						title: "产地品牌生产商",
						dataIndex: "manufacturer",
					},
					{
						title: "等级规格",
						dataIndex: "grade",
					},
					{
						title: "计量单位",
						dataIndex: "unit",
					},
					{
						title: "单价（元）",
						dataIndex: "unit_price",
					},
					{
						title: "数量",
						dataIndex: "now_count",
					},
					{
						title: "金额（元）",
						dataIndex: "total_price",
					},
				],
				viewRecipeWeekColumns: [{
						title: "餐次",
						dataIndex: "type",
					},
					{
						title: "周一",
						dataIndex: "weeks",
					},
					{
						title: "周二",
						dataIndex: "weeks",
					},
					{
						title: "周三",
						dataIndex: "weeks",
					},
					{
						title: "周四",
						dataIndex: "weeks",
					},
					{
						title: "周五",
						dataIndex: "weeks",
					},
				],
				seachData: {
					order_sn: "",
					name: "",
					start_time: "",
					is_printing: '',
					is_gather: '',
					calendar_id:'',
					end_time: "",
					distribution_start_time: "",
					distribution_end_time: "",
					status: "",
					page: 1,
					page_size: Number(this.$commonJs.PAGE_LINES[0]),
				},
				seeDetailsId: "",
				deliveryDetailsState: false,
				deliveryDetailsArr: [],
				orderProduct: [],
				selectRowKeysArr: [],
				selectedRowKeys: [],
				postDatas:{
					page: 1,
					page_size: Number(this.$commonJs.PAGE_LINES[0]),
					id:""
				},
				total_priced:0,
				weeksList:[],
			};
		},
		created() {
			this.seachContent();
			this.selectRowKeysArr = [];
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
			pageCheckTwo(pagetion){              //分页
			  var {current,pageSize} = pagetion;
			  this.postDatas.page = current;
			  this.postDatas.page_size = pageSize;
			  this.paginationDelivery.pageSize = pageSize;
			  this.paginationDelivery.current = current;
			  this.getdeliveryTotal()
			},
			getCheckboxProps(record) {
				return {
					props: {
						disabled: record.is_gather == 1||record.status!=0,
						is_gather: record.is_gather
					}
				}
			},
			onSelectChange(selectedRowKeys, item) { //选择
				this.selectedRowKeys = selectedRowKeys;
				var arr = []
				item.forEach((item) => {
					arr.push(item.id)
				})
				this.selectRowKeysArr = arr;
			},
			printSummary() {
				//打印待确认汇总
				setTimeout(() => {
					printJS({
						printable: "printTabless",
						type: "html",
						targetStyles: ["*"],
						ignoreElements: ["no-print", "bc", "gb"],
						style: "@media print{@page{margin-left:2mm;margin-right:2mm;margin-bottom:3mm;margin-top:9mm;size:A4;}}",
					});
				}, 500);
			},
			changeVal() {
				this.searchs();
			},
			exportSummary() {
				//导出待确认汇总
				this.$http.exportUnconfirmedOrder({
					id: this.selectRowKeysArr.toString(),
				});
			},
			confirmedSummaryFun() {
				//待确认汇总的按钮时间
				if (this.selectRowKeysArr.length < 1) {
					return this.$message.error("请选择订单号");
				}
				this.$http
					.unconfirmedOrderList({
						id: this.selectRowKeysArr.toString(),
					})
					.then((res) => {
						if (res.code == 1) {
							this.confirmedSummaryState = true;
							console.log(res.data);
							this.confirmedSummaryDataSource = res.data;
							// this.seachContent("nums");
						}
					});
			},
			afterClosed(){
				this.seachContent()
			},
			cheackState(state) {
				//状态下拉选择
				this.searchs();
			},
			confirmedSummary() {
				//待确认汇总
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
			searchs() { //搜索
				this.seachData.page = 1
				this.pagination.current = 1

				this.seachContent()
			},
			seachContent(type) {
				this.selectedRowKeys = []
				this.selectRowKeysArr = []
				this.loading = true
				this.$http.orderList(this.seachData).then((res) => {
					this.loading = false
					if (res.code == 1) {
						let {
							total,
							per_page,
							current_page,
							last_page,
							data
						} = res.data.data;
						this.pagination.total = total;
						// var allDatas = data || [];
						// allDatas.forEach((item,index)=>{
						// 	item.key = item.id
						// })
						this.total_priced = res.data.total_price
						this.dataSource = data;
					}
				});
			},
			onCellChange(key, dataIndex, value) {
				const dataSource = [...this.dataSource];
				const target = dataSource.find((item) => item.key === key);
				if (target) {
					target[dataIndex] = value;
					this.dataSource = dataSource;
				}
			},
			confirmDelivery(node) {
				//确认配送 这里应该是弹框
				if (node.status != 2) {
					this.$router.push({
						path: "OrderManagementFillDelivery",
						query: {
							id: node.id,
							pageState: node.status,
						},
					});
				} else {
					this.$router.push({
						path: "OrderManagementDetails",
						query: {
							id: node.id,
							type: "details",
							pageState: node.status,
						},
					});
				}
			},
			viewSummary(data) {
				//查看汇总
				this.seeDetailsId = data.id;
				this.postDatas.id = data.id;
				this.postDatas.page = 1;
				this.paginationDelivery.current = 1;
				this.getdeliveryTotal();
				this.orderObj = data;
				this.deliveryState = true;
			},
			getdeliveryTotal() {
				this.$http
					.deliveryTotal(this.postDatas)
					.then((res) => {
						if (res.code == 1) {
							let {
								total,
								per_page,
								current_page,
								last_page,
								data
							} = res.data;
							this.paginationDelivery.total = total;
							this.paginationDelivery.pageSize = per_page;
							this.dataSourceDelivery = data;
						}
					});
			},
			viewRecipeWeek(data) {
				//查看周食谱
				this.viewRecipeWeekState = true;
				this.$http
					.weekRecipes({
						week_id: data.week_id,
						school_id: data.school_id,
					})
					.then((res) => {
						if (res.code == 1) {
							let {
								total,
								per_page,
								current_page,
								last_page,
								data
							} = res.data;
							console.log(res.data);
							this.dataSourceWeek = res.data;
						}
					});
			},

			seeDetails(node) {
				//查看周食谱点击眼睛执行的操作
				if (node.is == 1) {
					this.$http
						.mainRecipes({
							id: node.id,
						})
						.then((res) => {
							if (res.code == 1) {
								this.deliveryDetailsArr = res.data;
								this.deliveryDetailsState = true;
							}
						});
				}
			},
			offSeeExCel() {
				//关闭带量公示表弹框
				this.deliveryDetailsState = false;
			},
			printExcelFun() {
				this.$http.orderIs_printing({
					id: this.seeDetailsId
				})
				this.deliveryState = true
				this.$http
					.printingData({
						id: this.seeDetailsId,
					})
					.then((res) => {
						//生成成功后通过对应ID，查对接单的数据进行打印
						if (res.code == 1) {
							console.log(res.data);
							this.printDataObj = res.data;
							var LODOP = getLodop();
							setTimeout(() => {
								LODOP.PRINT_INIT("test");
								LODOP.SET_PRINT_PAGESIZE(1, '210.6mm', '140mm', 2); //设置纸张大小
								LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width"); //设置页面缩放
								var strBodyStyle = "<style>" + this.$commonJs.printStyles() + "</style>";
								var strFormHtml = strBodyStyle + "<body>" + document.getElementById("warrantTables").innerHTML + "</body>";
								LODOP.ADD_PRINT_HTM(14, 6, "100%", "100%", strFormHtml); //设置页面填充内容
								// LODOP.ADD_PRINT_HTM(14,6,"100%","100%",document.getElementById("warrantTables").innerHTML);//设置页面填充内容

								//LODOP.PRINT();
								LODOP.PREVIEW();
							}, 400)
							// setTimeout(() => {
							//   printJS({
							//     printable: "warrantTables",
							//     type: "html",
							//     targetStyles: ["*"],
							//     ignoreElements: ["no-print", "bc", "gb"],
							//     style:
							//       "@media print{@page{margin-left:18mm;margin-right:4mm;margin-bottom:3mm;margin-top:6mm;size:A4;}}",
							//   });
							// }, 500);
						}
					});
				this.seachContent();
			},
		},
	};
</script>

<style scoped="scoped">
	/* .pd58{
    background: #fff;
    position: relative;
  } */
	.delieryItem {
		margin-bottom: 30px;
	}

	.w160px {
		width: 160px;
	}

	.delieryItem .delieryType {
		font-size: 24px;
		color: #333;
		font-weight: 800;
		margin-bottom: 15px;
	}

	.delieryTitle {
		font-size: 20px;
		color: #666;
		margin-bottom: 15px;
	}

	.delieryDetailsContent {
		display: flex;
	}

	.list {
		display: flex;
		text-align: center;
		width: 200px;
		border: 1px solid #858585;
		height: 40px;
		line-height: 40px;
		margin-right: 20px;
	}

	.bg858585 {
		width: 40%;
		background: #858585;
		color: #fff;
		font-size: 16px;
	}

	.unitNum {
		width: 60%;
	}

	.w200px {
		width: 200px;
	}

	.editConfirmedSummary {
		float: right;
		margin-top: 30px;
	}

	.w90 {
		width: 75px;
	}

	.wlist260 {
		width: 260px;
		margin-right: 20px;
	}

	.numAndPriceState {
		width: 100%;
	}

	.borderR0 {
		border-right: 0 !important;
	}

	.pl10 {
		padding-left: 10px;
	}

	.h40 {
		height: 45px;
		line-height: 45px;
	}

	.numAndPriceState div {
		height: 40px;
		line-height: 40px;
		border-right: 1px solid #000;
		border-bottom: 0;
		border-top: 1px solid #000;
		width: 33.3%;
		text-align: center;
	}

	.mb30 {
		margin-bottom: 30px;
	}

	.orderListHead {
		display: flex;
	}

	.pt10 {
		padding-top: 6px;
	}

	.WeekTable {
		width: 100%;
		border: 1px solid #f1f1f1;
	}

	.WeekTable th {
		height: 60px;
		linee-height: 60px;
		background-color: #f4f4f4;
		text-align: center;
	}

	.WeekTable tbody tr {
		border-bottom: 1px solid #f1f1f1;
	}

	.WeekTable td {
		height: 60px;
		linee-height: 60px;
		text-align: center;
		cursor: pointer;
	}

	.table {
		width: 100%;
	}

	.textCenter {
		text-align: center;
	}

	.textLeft {
		text-align: left;
	}

	.textRight {
		text-align: right;
	}

	.flex {
		display: flex;
	}

	.borderR0 {
		border-right: 0 !important;
	}

	.pl10 {
		padding-left: 10px;
	}

	.h40 {
		height: 45px;
		line-height: 45px;
	}

	#printTable {
		width: 100%;
		position: absolute;
		top: 0;
		left: -100000px;
		z-index: -999;
	}

	.footerBtns {
		text-align: right;
		margin-top: 30px;
	}

	table {
		width: 100%;
	}

	/* th,td{height: 45px;border: 1px solid #000;text-align: center;} */
	th,
	td {
		height: 45px;
		border: 1px solid #000;
		text-align: center;
	}
	.total_amount{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		padding-right: 15px;
		margin-bottom: 10px;
	}
	.total_amount>span{
		color: red;
	}
</style>
