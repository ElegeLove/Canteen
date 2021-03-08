<template>
	<div>
		<a-page-header style="border-bottom: 1px solid rgb(235, 237, 240)" title="查看详情" @back="() => this.$router.back()" />
		<div class="pd3058">
			<div class="faiiDeilseryHead">
				<div class="titleSlectNum">
					配送情况
				</div>
			</div>
			<div class="flexsd">
				<a-button type="primary" @click="prinOrders">打印交接单</a-button>
			</div>
			<div class="detailsTable">
				<div class="detailsTableHead">
					<div class="detailsTableLeft">
						<div class="title">所属订单</div>
						<div class="text">
							<span>订单号：{{orderObj.order_sn}}</span>
							<span>{{orderObj.create_time}}</span>
							<span>{{orderObj.abbreviation}}</span>
							<span>合计：{{price_total}}元</span>
						</div>
					</div>
					<div class="state">{{orderObj.status}}</div>
				</div>
				<a-table :data-source="dataSource"
				 :pagination="pagination"
				 @change="pageCheck"
				 :loading="loading"
				 id="detailsTable" :columns="columns" >
					<template slot="image" slot-scope="text, record">
						<img :src="record.image" class="tableImg" />
					</template>
					<template slot="total_price" slot-scope="text, record">
						<span class="priceNum">￥{{ record.total_price }}</span>
					</template>
				</a-table>
			</div>
		</div>
     <printtabs :info="printDataObj" />
	</div>
</template>

<script>
  import {getLodop} from "../../assets/js/LodopFuncs"
  import printtabs from "./printModel.vue";
export default {
	created() {
		this.seachData.id = this.$route.query.id
		this.getData()
	},
  components: {
    printtabs,
  },
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
			seachData:{
				id:"",
				type:999,
				page: 1,
				page_size: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示数据
			},
			dataSource: [],
			orderObj:{},
			price_total:0,
       printDataObj: {},
			selectTableIndex: [],
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
					dataIndex: 'change_price'
				},
				{
					title: '原单价（元）',
					dataIndex: 'price'
				},
				{
					title: '所需数量',
					dataIndex: 'number'
				},
				{
					title: '配送数量',
					dataIndex: 'now_count'
				},
				{
					title: '总金额（元）',
					scopedSlots: { customRender: 'total_price' }
				},
				{
					title: '包装数量',
					dataIndex: 'package_num'
				},
				{
					title: '包装单位',
					dataIndex: 'package_unit'
				}
			]
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
			this.getData()
		},
		getData(){
			this.loading = true;
			this.$http.orderProductList(this.seachData).then(res => {
				this.loading = false;
				if (res.code == 1) {
					let {order,orderProduct} = res.data;
					this.dataSource = orderProduct.data;
					this.orderObj = order;
					this.pagination.total = Number(orderProduct.total)
					this.price_total = order.total_amount;
				}
			});
		},
		prinOrders(){         //打印交接单
			this.$http.orderIs_printing({
				id: this.$route.query.id
			})
			this.prints(this.$route.query.id)
		},
    prints(id){
      this.$http
        .printingData({
          id:id,
        }).then((res)=>{
          if (res.code == 1) {
            this.printDataObj = res.data;
            var LODOP=getLodop();
            setTimeout(()=>{
            LODOP.PRINT_INIT("test");
            LODOP.SET_PRINT_PAGESIZE (1,'210.6mm','140mm',2);//设置纸张大小
            LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width");//设置页面缩放
              var strBodyStyle = "<style>" + this.$commonJs.printStyles() + "</style>";
            var strFormHtml = strBodyStyle + "<body>" + document.getElementById("warrantTables").innerHTML + "</body>";
            LODOP.ADD_PRINT_HTM(14,6,"100%","100%",strFormHtml);//设置页面填充内容
              LODOP.PREVIEW();
            },400)
          }
        })
    }
	},
	mounted() {
    // if(this.$route.query.print=="print"){
    //   this.prints(this.$route.query.id)
    // }
  }
};
</script>

<style scoped="scoped">
.faiiDeilseryHead{display: flex; justify-content: space-between;margin-bottom: 10px;}
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
	border: 1px solid rgba(245, 245, 245, 1);
	margin-top: 16px;
}
.detailsTableHead {
	width: 100%;
	height: 50px;
	background: rgba(245, 245, 245, 1);
	line-height: 50px;
	display: flex;
	justify-content: space-around;
}
.titleSlectNum{
	font-weight: 900;
    font-size: 23px;
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
.flexsd{
	display: flex;
	justify-content: flex-end;
}
</style>
