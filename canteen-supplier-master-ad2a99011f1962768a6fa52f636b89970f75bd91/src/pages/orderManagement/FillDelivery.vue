<template>
	<div class="positionR">
		<a-page-header style="border-bottom: 1px solid rgb(235, 237, 240)" title="查看详情" @back="backPageFun" />
		<div class="pd3058">
			<div class="faiiDeilseryHead">
				<div>
					<div class="titleSlectNum" v-if="orderObj.status == '待确认'">
						tip:若产品信息有更改，请前往产品管理编辑信息
					</div>
				</div>
				<a-button type="primary" class="btnH40 ConfirmDeliveryBtn" v-if="orderObj.status == '待确认'" @click="ConfirmDeliveryFun">确认配送</a-button>
				<!-- <a-button type="primary" class="btnH40 ConfirmDeliveryBtn" v-if="is_distribution == 0" @click="ConfirmDeliveryFun">确认配送</a-button> -->
				<!-- v-if="orderObj.is_distribution == 0" -->
				<div v-else>
					<a-button type="primary" class="btnH40 ConfirmDeliveryBtn" @click="printStateFun">打印发货单</a-button>
					<a-button type="primary" class="btnH40 ConfirmDeliveryBtn"  @click="fillDeliveryStateFun">生成交接表</a-button>
				</div>
			</div>
			<div class="detailsTable">
				<div class="detailsTableHead">
					<div class="detailsTableLeft">
						<div class="text">
							<span>订单号：{{orderObj.order_sn}}</span>
							<span>{{orderObj.create_time}}</span>
							<span>{{orderObj.abbreviation}}</span>
							<span>期望送达时间：{{orderObj.distribution_time}}</span>
						</div>
					</div>
					<div class="state">{{orderObj.status}}</div>
				</div>
				<a-table :data-source="dataSourceTwo"
				 :pagination="pagination"
				 @change="pageCheck"
				 :loading="loading"
				 id="detailsTable" :columns="columns">
					<template slot="image" slot-scope="text, record">
						<img :src="record.image" class="tableImg" />
					</template>
					<template slot="package_num" v-if="isWhetherGenerate"  slot-scope="text, record">
						{{record.package_num}} {{isWhetherGenerate}}
					</template>
					<template slot="package_unit" v-if="isWhetherGenerate" slot-scope="text, record">
						{{record.package_unit}}
					</template>
					<template slot="price" slot-scope="text, record">
						<div v-if="orderObj.status == '待确认'">{{text}}</div>
						<div v-else>{{record.price == record.change_price?text:record.change_price}}</div>
					</template>
					<template slot="total_price" slot-scope="text, record">
						<span class="priceNum">￥{{ record.total_price }}</span>
					</template>
				</a-table>
			</div>
		</div>

		<a-modal
			v-model="fillDeliveryState"
			title="交接单确认 "
			@cancel="offFillDelivery"
			@ok="handleOk"
			width="90%"
			cancelText="取消"
			visible="false"
			okText="确认交接单"
			:closable="false"
		>
			<div class="detailsTableHead newHead">
				<div class="detailsTableLeft">
					<div style="margin-right: 15px;">订单号：  {{orderObj.order_sn}}</div>
					<div style="margin-right: 15px;">下单时间： {{orderObj.create_time}}</div>
					<div style="margin-right: 15px;">配送时间： {{orderObj.distribution_time}}</div>
					<div style="margin-right: 15px;">  {{orderObj.abbreviation}}</div>
				</div>
			</div>
       <!-- :scroll="{ x: 900,y:500}" -->
			<a-table bordered
       :scroll="{ y:500}"
	   :loading="loadingTwo"
       :data-source="dataSource" :columns="columnsillDelivery" :pagination="false">
				<template slot="image" class="w100"  slot-scope="text, record">
					<img :src="record.image" class="tableImg viewImages" />
				</template>
				<template slot="price" slot-scope="text, record">
					<div class="flex">
						<a-input placeholder="请输入" v-model="record.price" />
						<span class="recordUnit">{{record.unit}}</span>
					</div>
				</template>
				<template slot="total_price" slot-scope="text, record">
					<div class="flex">
						<span class="recordUnit">{{record.total_price}}</span>
					</div>
				</template>
				<template slot="number" slot-scope="text, record">
					<a-input placeholder="请输入" v-model="record.number" />
				</template>
				<template slot="num" slot-scope="text, record, scope">
					<a-input placeholder="配送数量" v-model="record.num" @input="getInputNumPrice(record,scope)" />
				</template>
				<template slot="package_num" slot-scope="text, record">
					<a-input placeholder="包装数量" v-model="record.package_num" @input="iptRegs(record)"/>
				</template>
				<template slot="package_unit" slot-scope="text, record">
					<a-input placeholder="单位" v-model="record.package_unit" />
				</template>
				<!-- <template slot="operation" slot-scope="text, record,index">
					<a-button type="primary" class="btnH40 " @click="removeItem(index)">删除</a-button>
				</template> -->
			</a-table>
		</a-modal>

		<a-modal
			title="提示"
			:visible="isShowVisible"
			@ok="isShowVisibleHandleOk"
			@cancel="isShowVisible = false"
			>
			<p>有产品单价已变更，将重新计算产品单价和金额</p>
		</a-modal>

		<!-- 打印发货单  -->
		<div class="detailsTable" id="tableStyle"  style="padding: 2px;">
			<table style="width:100%;min-width:1200px;max-height: 1754px;margin-bottom: 40px;" v-for="(item,index) in printTable" :key="index">
				<thead>
					<tr>
						<th colspan="14">
							<div class="tabHeader">
								<span>{{item.data}}</span>
								<!-- <span>订单号：{{item.order_sn}}</span>
								<span>{{item.create_time}}</span>
								<span>{{item.abbreviation}}</span>
								<span>期望送达时间：{{orderObj.distribution_time}}</span> -->
							</div>
						</th>
					</tr>
					<tr>
						<!-- <th>产品代码</th> -->
						<th style="width:120px;" rowspan='2'>产品名称</th>
						<th style="width:140px;" rowspan='2'>产地品牌生产商</th>
						<th style="width:120px;" rowspan='2'>等级规格</th>
						<th style="width:100px;" rowspan='2'>生产日期</th>
						<!-- <th>保质期至</th> -->
						<th style="width:80px;" rowspan='2'>计量单位</th>
						<th style="width:80px;" rowspan='2'>单价（元）</th>
						<th colspan="2">学校订货</th>
						<th colspan="2">实际配送</th>
						<th style="width:80px;" rowspan='2'>包装数量</th>
						<th style="width:80px;" rowspan='2'>包装单位</th>
					</tr>
					<tr>
						<th style="width:60px;">数量</th>
						<th style="width:80px;">金额（元)</th>
						<th style="width:60px;">数量</th>
						<th style="width:80px;">金额（元)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in item.table" :key="index" style="height: 30px;font-size:14px;">
						<!-- <td>{{item.code}}</td> -->
						<td>{{item.title}}</td>
						<td>{{item.manufacturer}}</td>
						<td>{{item.grade}}</td>
						<td ><div>{{item.production_time}}</div></td>
						<!-- <td >{{item.expiration_time}}</td> -->
						<td >{{item.unit}}</td>
						<td >{{item.price}}</td>
						<td >{{item.number}}</td>
						<td >{{item.total_price}}</td>
						<!-- <td >
							<div class="disflex">
								<div class="borderRight">{{item.number}}</div>
								<div>{{item.total_price}}</div>
							</div>
						</td> -->
						<td ></td>
						<td ></td>
						<!-- <td >
							<div class="disflex">
								<div class="borderRight"></div>
								<div></div>
							</div>
						</td> -->
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			loadingTwo:false,
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
			seachData:{
				id:"",
				type:999,
				page: 1,
				page_size: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
			},
			printDataObj: {},
			isShowVisible: false,
			is_distribution: 0,
			isPrintFahuodan: false,
			postData:{},
			dataSource: [],
			dataSourceTwo:[],
			isWhetherGenerate: false,
			dataSourceContentJiaojie: [],
			selectArr: [],
			columns: [
				{
					title: '产品图',
					scopedSlots: { customRender: 'image' }
				},
				{
					title: '产品名称',
					dataIndex: 'title'
				},
				{
					title: '产品代码',
					dataIndex: 'code'
				},
				{
					title: '产品单价（元）',
					dataIndex: 'price',
					scopedSlots: { customRender: 'price' }
				},
				{
					title: '所需数量',
					dataIndex: 'number'
				},
				{
					title: '总金额（元）',
					scopedSlots: { customRender: 'total_price' }
				},
			],
			columnsillDelivery: [
				{
                    title: '产品图',
                    width:'100px',
					scopedSlots: { customRender: 'image' }
				},
				{
					title: '产品名称',
					dataIndex: 'title'
				},
				{
					title: '产品代码',
					dataIndex: 'code'
				},
				{
					title: '产地品牌生产商',
					dataIndex: 'manufacturer'
				},
				{
					title: '单价（元）',
					dataIndex: 'change_price'
				},
				{
					title: '计量单位',
					dataIndex: 'unit'
				},
				{
					title: '学校采购数量',
					dataIndex: 'number'
				},
				{
					title: '本次配送数量',
					scopedSlots: { customRender: 'num' }
				},
				// {
				// 	title: '产品单价',
				// 	scopedSlots: { customRender: 'price' }
				// },
				{
					title: '总金额（元）',
					scopedSlots: { customRender: 'total_price' }
				},
				{
					title: '包装数量',
					scopedSlots: { customRender: 'package_num' }
				},
				{
					title: '包装单位',
					scopedSlots: { customRender: 'package_unit' }
				},
			],
			orderObj: {},
			fillDeliveryState: false,
			selectedRowKeys: [],
			printTable: [],
			isClick:false,
			btnClick:false
		};
	},
	created() {
		this.getPrintTableList()
		this.seachData.id = this.$route.query.id
		this.seachData.type = 999
		this.getList()
	},
	methods: {
		pageCheck(pagetion) { //分页
			var {
				current,
				pageSize
			} = pagetion;
			this.seachData.type = 999;
			this.seachData.page = current;
			this.seachData.page_size = pageSize;
			this.pagination.pageSize = pageSize;
			this.pagination.current = current;
			this.getList()
		},
		iptRegs(item){
			item.package_num = this.$commonJs.regMoneyOnes(item.package_num)
		},
		printStateFun(){ //打印发货单
			setTimeout(() => {
            printJS({
              printable: 'tableStyle',
              type: 'html',
              targetStyles: ['*'],
              ignoreElements: ["no-print", "bc", "gb"],
            //   style: "@media print{@page{margin-left:0mm;margin-right:0mm;margin-bottom:3mm;margin-top:9mm;size:A4;}}",
              style:"@media print{@page{size: A4 landscape;}}"
            })
          }, 500)
		},
		getInputNumPrice(node,e){
			node.num = this.$commonJs.regMoneyOnes(node.num);
			this.dataSource[e].total_price = this.$commonJs.rounds(Number(this.dataSource[e].num) * Number(this.dataSource[e].change_price),2)
			// let len = 0;
			// if(node.num.split('.')){
			// 	len = node.num.split('.')[1].length ;
			// }
			// if (len >= 1){
			// 	this.dataSource[e].num = Number(node.num).toFixed(1);
   //      var regs = (Number(this.dataSource[e].num) * Number(this.dataSource[e].change_price)).toFixed(3)
			// 	return this.dataSource[e].total_price = Math.round(regs * 100) / 100
			// } else{
   //      var regs = (Number(this.dataSource[e].num)  * Number(this.dataSource[e].change_price) ).toFixed(3)
			// 	this.dataSource[e].total_price = Math.round(regs * 100) / 100
			// }
		},
		ConfirmDeliveryFun() {
			this.$http.delivery({id: this.$route.query.id}).then(res => {
				if (res.code == 1) {
					if (res.data.is_change > 0){
						this.isShowVisible = true;
					} else{
						this.getList();
						//  this.is_distribution = 1
					}
				}
			})
		},
		isShowVisibleHandleOk(){ //请求点击确认配送后的接口
			 this.isShowVisible = false
			//  this.is_distribution = 1
			 this.getList();
		},
		offFillDelivery(){ //关闭打印交接单弹框
			this.fillDeliveryState = false
			// this.is_distribution = 1
			this.getList()
		},
		backPageFun(){
			if (this.$route.query.type && this.$route.query.type == 'detail'){
				this.$router.go(-2)
			} else{
				 this.$router.back()
			}
		},
		getList(){
			this.loading = true;
			this.loadingTwo = true;
			this.$http.orderProductList(this.seachData).then(res => {
				this.loadingTwo = false;
				this.loading = false;
				if (res.code == 1) {
					let {order,orderProduct} = res.data;
					if(this.seachData.type==999){
						orderProduct.data.forEach(item=>{
							item.num = item.number;
						})
						this.dataSourceTwo = orderProduct.data;
						this.pagination.total = Number(orderProduct.total)
					}else{
						orderProduct.forEach(item=>{
							item.num = item.number;
						})
						this.dataSource = orderProduct;
						this.isClick = true;
					}
					this.orderObj = order
					this.is_distribution = order.is_distribution
					if (this.$route.query.pageState){
						this.is_distribution = Number(this.$route.query.pageState)
					}
				}
			});
		},
		getPrintTableList(){
			this.$http.orderProductListPrinting({id: this.$route.query.id}).then(res => {
				if (res.code == 1) {
					console.log(res.data)
					this.printTable = res.data;
				}
			});
		},
		onSelectChange(selectedRowKeys) {
			this.selectedRowKeys = selectedRowKeys;
		},
		handleOk(){ //确认并打印交接单
			if(!this.isClick){
				return this.$message.error('数据未加载完毕，请稍等');
			}
			if(this.btnClick){
				return;
			}
			this.btnClick = true;
			let postObj = {}
			let dataArr = []
			let dataId = []
			for (let i = 0; i <  this.dataSource.length; i++){
				console.log(this.dataSource[i].num)
				if (!this.dataSource[i].num){
					return this.$message.error('请输入本次配送数量');
				} else{
					let obj = {id: this.dataSource[i].id,num: this.dataSource[i].num,package_num: this.dataSource[i].package_num || '',package_unit: this.dataSource[i].package_unit || ''}
					dataArr.push(obj)
					dataId.push(this.dataSource[i].id)
				}
			}
			postObj.order_id =  this.$route.query.id,
			postObj.order = dataArr
			this.$http.printingHandover({data: postObj}).then(res => { //确认并打印交接单成功！
				if (res.code == 1) {
					this.fillDeliveryState = false
					 this.isWhetherGenerate = false
					// this.isClick = false;
					 setTimeout(()=>{
						this.$router.replace({
							path: 'OrderManagementDetails',
							query: { id: this.$route.query.id,type: 'details',print:"print" }
						});
					 },1000)
				}else{
          this.btnClick = false;
        }
			});


		},
		fillDeliveryStateFun(){
			// if (this.selectArr.length < 1){
			// 	return this.$error({
			// 		title: '生成交接单',
			// 		content: '您必须要勾选表格数据才能生成交接表',
			// 	});
			// }
			this.seachData.type = ""
			this.isClick = false;
			this.btnClick = false;
			this.fillDeliveryState = true
			this.getList()
		},
		removeItem(index) {
			var that = this
			this.$confirm({
				title: '删除',
				content: '您确定要删除此项交接单吗？',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk() {
					that.selectArr.splice(index,1)
					that.selectedRowKeys = []
				},
				onCancel() {
					console.log('Cancel');
				}
			});
		}
	},
	mounted() {}
};
</script>

<style scoped="scoped" lang="scss">
	.w90{width: 75px;}
	.w50{width: 50px;}
	.w100{width: 80px;}
.priceNum {
	color: #e30707;
	font-weight: bold;
}
.disflexContent{
	display: flex;
	width: 100%;
	div{
		width: 50%;
		height: 45px;
		line-height: 45px;
		font-size: 12px;
		border-top: 1px solid #333 ;
		border-right: 1px solid #333 ;
	}
	>div:last-child{
		border-right: none;
	}
}
.disflex{
	div{
		width: 50%;
		height: auto;
		min-height: 45px;
		line-height: 45px;
		font-size: 12px;

	}
	display: flex;
	width: 100%;

}
.titleFlex{height: 45px;line-height: 45px;}
.titleSlectNum {
	line-height: 50px;
	font-size: 18px;
	color: #666;
	font-weight: 400;
}
.faiiDeilseryHead {
	display: flex;
	font-size: 24px;
	font-family: Source Han Sans CN;
	margin-bottom: 20px;
	font-weight: bold;
	color: rgba(8, 8, 8, 1);
	justify-content: space-between;
}
.faiiDeilseryHead span {
	margin-left: 45px;
	font-size: 18px;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: rgba(2, 187, 114, 1);
}
.ConfirmDeliveryBtn {
	width: 230px;
	font-size: 24px;
	font-family: Source Han Sans CN;
	font-weight: 400;
	height: 50px !important;
	background: rgba(2, 187, 114, 1);
	border-radius: 5px;
}
.detailsTable {
	margin-top: 50upx;
	border: 1px solid rgba(245, 245, 245, 1);
}
.detailsTableHead {
	width: 100%;
	height: 50px;
	background: rgba(245, 245, 245, 1);
	line-height: 50px;
	display: flex;
	justify-content: space-around;
}
.newHead{
  min-height: 50px !important;
  height: auto !important;
  >div{
    display: flex;
    align-items: center;
    flex-wrap: wrap !important;
  }
}
.detailsTableLeft {
	width: 90%;
	display: flex;
}
.detailsTableLeft .title {
	font-size: 18px;
	height: 20px;
	padding-right: 20px;
	border-right: 2px solid rgba(3, 3, 3, 1);
	margin-right: 24px;
	font-family: Microsoft YaHei;
	line-height: 20px;
	font-weight: bold;
	position: relative;
	top: 15px;
	color: rgba(3, 3, 3, 1);
}
.tabHeader{
 //  font-size: 18px;
	// padding-right: 20px;
	// margin-right: 24px;
	// font-family: Microsoft YaHei;
	// line-height: 40px;
	// font-weight: bold;
	// position: relative;
	// color: rgba(3, 3, 3, 1);
  display: flex;
  align-items: center;
  padding-left: 80px;
  box-sizing: border-box;
}
.tabHeader span{
  font-size: 18px;
  color: rgba(3, 3, 3, 1);
    margin-right: 10px;
    white-space: nowrap;
}
.detailsTableLeft .text span {
	margin-right: 30px;
}
.state {
	font-size: 18px;
	font-family: Microsoft YaHei;
	font-weight: bold;
	color: rgba(2, 187, 114, 1);
}
#detailsTable .ant-table-thead > tr > th {
	background: #fff !important;
}
.recordUnit{margin-left: 10px;position: relative;top: 5px;}
.table{width: 100%; }
.textCenter{text-align: center;} .textLeft{text-align: left;} .textRight{text-align: right;}
 .flex{display: flex;}
 .numAndPrice{ width: 100%;}
 .numAndPrice div{width: 50%; text-align: center; height: 40px; line-height: 40px;
	border-right: 1px solid #000;
	border-bottom: 0;
	border-top: 1px solid #000;
 }
 .pr10{padding-right: 10px;}
 .numAndPriceState{
	 width: 100%;
 }
 .borderR0{border-right: 0 !important;}
 .pl10{padding-left: 10px;}
 .h40{height: 45px;line-height: 45px;}
 th,td{height: 45px;border: 1px solid #000;text-align: center;padding: 10px 10px;box-sizing: border-box;transform: scale(1.1);}
  #tableStyle td{
	  padding: 4px 0;
	  white-space: nowrap;
  }
//  #tableStyle td div{
// 	 overflow: hidden;
// 	 text-overflow:ellipsis;
// 	//  white-space: nowrap;
// 	 padding: 0 5px;
// 	 box-sizing: border-box;
// 	 display: flex;
// 	 justify-content: center;
// 	 align-items: center;
// 	 height: 45px;
// 	 transform: scale(1.1);
//  }
 .numAndPriceState div{
	 height: 40px; line-height: 40px;
	 border-right: 1px solid #000;
	 border-bottom: 0;
	 border-top: 1px solid #000;
	 width: 33.3%; text-align: center;
 }
 .footerContent{display: flex;width: 100%;}
 .footerContent div{width: calc(100% / 3); text-align: left;}
 .viewImages{
   width: 70px;
   height: 70px;
   object-fit: cover;
 }
 .borderRight{border-right: 1px solid #333;}
</style>
