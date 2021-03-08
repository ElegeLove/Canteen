<template>
    <div class="padd">
        <!-- <div>{{ dataDictionary.name }}</div> -->
        <div class="headerMenu" v-if="pageData.is_relation == 1">
            <div class="headerMenuTitle">
                <div class="headerTitle"><span>订单统计</span></div>
                <div>
                    <label>学期：</label>
                    <a-select
                        show-search
                        placeholder="请选择"
                        valueFormat="YYYY-MM-DD"
                        option-filter-prop="children"
                        class="wlist260"
                        v-model="weekId"
                        @change="changeSelectYears"
                    >
                        <a-select-option value="">全部</a-select-option>
                        <a-select-option :value="item.id" v-for="(item,index) in weeksList" :key="index">{{item.year}}{{item.semester}}</a-select-option>
                    </a-select>
                </div>
            </div>
            <div class="menuContent">
                <!-- <div class="menuList">
                    <p>累计订单</p>
                    <div>{{ pageData.total_order_count }}</div>
                </div>
                <div class="menuList">
                    <p>订单累计金额</p>
                    <div>&yen;{{ pageData.total_money }}</div>
                </div> -->
                <div class="menuList">
                    <p>本学期订单数</p>
                    <div>{{ pageData.semester_order_count }}</div>
                </div>
                <div class="menuList">
                    <p>本学期订单总额</p>
                    <div>&yen;{{ pageData.semester_total_money }}</div>
                </div>
                <div class="menuList menuListVal">
                    <div>
                        <p>待配送订单</p>
                        <div>{{ pageData.undelivery_order_count }}</div>
                    </div>
                    <!-- <div>
                        <span class="goPeisong" @click="goPeisong">去配送</span>
                    </div> -->
                </div>
                <div class="menuList">
                    <p>已结算订单</p>
                    <div>{{ pageData.settlement_order }}</div>
                </div>
                <div class="menuList">
                    <p>已结算订单总额</p>
                    <div>&yen;{{ pageData.settlement_money }}</div>
                </div>
                <div class="menuList">
                    <p>待结算订单</p>
                    <div>{{ pageData.unsettlement_order }}</div>
                </div>
                <div class="menuList">
                    <p>待结算订单金额</p>
                    <div>&yen;{{ pageData.unsettlement_money }}</div>
                </div>
            </div>

            <!-- <div class="menuContent">
				<div class="menuList">
					<p>总计订单数</p>
					<div>{{pageData.total_order_count}}</div>
				</div>
				<div class="menuList">
					<p>本学期订单数</p>
					<div>{{pageData.semester_order_count}}</div>
				</div>
				<div class="menuList">
					<p>已结算订单</p>
					<div>{{pageData.settled_order_count}}</div>
				</div>
				<div class="menuList">
					<p>待结算订单</p>
					<div>{{pageData.unsettled_order_count}}</div>
				</div>
				<div class="menuList">
					<p>订单累计总金额</p>
					<div>￥{{pageData.total_money }}</div>
				</div>
				<div class="menuList">
					<p>本学期订单总额</p>
					<div>￥{{pageData.semester_total_money }}</div>
				</div>
				<div class="menuList">
					<p>本学期退单总额</p>
					<div>￥{{pageData.semester_return_money }}</div>
				</div>
				<div class="menuList">
					<p>今日新订单</p>
					<div>{{pageData.today_order_count }}</div>
				</div> -->
            <!-- </div> -->
        </div>
        <div class="headerMenu noGuanlian" v-else>
            <img src="../../assets/image/u394.svg" alt="" />
            <span>您还没有关联学校哦~</span>
        </div>
        <div class="homeContent">
            <div class="homeTitle">快捷功能</div>
            <div class="homeRouter">
                <div
                    class="itemClass"
                    @click="
                        JumpPageUrl(
                            '/OrderManagement/OrderManagementList',
                            'OrderManagementList',
                            'order_management'
                        )
                    "
                >
                    <img src="../../assets/image/dingdan2@2x.png" />
                    <div class="routerName">订单管理</div>
                </div>
                <div
                    class="itemClass"
                    @click="
                        JumpPageUrl(
                            '/ProductManagement/ProductManagementList',
                            'ProductManagementList',
                            'product_management'
                        )
                    "
                >
                    <img src="../../assets/image/chanpin@2x.png" />
                    <div class="routerName">产品管理</div>
                </div>
                <div
                    class="itemClass"
                    @click="
                        JumpPageUrl(
                            '/ProductManagement/WarehouseManagement',
                            'WarehouseManagement',
                            'product_management'
                        )
                    "
                >
                    <img src="../../assets/image/cangku@2x.png" />
                    <div class="routerName">仓库管理</div>
                </div>
                <div
                    class="itemClass"
                    @click="
                        JumpPageUrl(
                            '/BusinessTraining/BusinessTrainingList',
                            'BusinessTrainingList',
                            'work_items'
                        )
                    "
                >
                    <img src="../../assets/image/peixun@2x.png" />
                    <div class="routerName">业务培训</div>
                </div>
                <div
                    class="itemClass"
                    @click="
                        JumpPageUrl(
                            '/OrderManagement/OrderSummary',
                            'OrderSummary',
                            'order_management'
                        )
                    "
                >
                    <img src="../../assets/image/peisong@2x.png" />
                    <div class="routerName">配送记录</div>
                </div>
                <div
                    class="itemClass"
                    @click="
                        JumpPageUrl(
                            '/OrderManagement/DeliveryRecord',
                            'DeliveryRecord',
                            'order_management'
                        )
                    "
                >
                    <img src="../../assets/image/jiesuan@2x.png" />
                    <div class="routerName">结算管理</div>
                </div>
            </div>
        </div>
    </div>
</template>   
 
<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            pageData: {},
            dataDictionary: {},
            weeksList:[],
            weekId:''
        };
    },
    computed: {
        ...mapState(["menuList", "userInfo", "allinfo"])
    },
    created() {
        this.$http.supplierInfo().then(res => {
            if (res.code == 1) {
                this.basicInformationData = res.data;
                res.data.contacts_mobile = this.$store.state.userInfo.username;
                let {
                    warehouse_address,
                    office_address,
                    contacts_mobile,
                    contacts,
                    nature,
                    abbreviation,
                    name,
                    insurance_company,
                    insurance_amount,
                    legal_person,
                    legal_person_mobile,
                    is_info,
                    id_card,
                    credit_code,
                    fbl_end_time,
                    business_license,
                    food_business_license
                } = res.data;
                let datas = {
                    warehouse_address,
                    office_address,
                    contacts_mobile,
                    nature,
                    business_license,
                    credit_code,
                    food_business_license,
                    contacts,
                    abbreviation,
                    name
                };
                this.$store.commit("dataDictionaryWarehouse", datas);
                this.dataDictionary = datas;
                // JSON.parse(
                //     localStorage.getItem("vuex")
                // ).dataDictionary;
            }
        });
        this.getData();
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
			this.getData();
        },
        getData(){
            this.$http.Home({calendar_id:this.weekId}).then(res => {
                if (res.code == 1) {
                    this.pageData = res.data;
                }
            });
        },
        goPeisong() {
            this.$router.push("/OrderManagement/DeliveryRecord");
            localStorage.setItem("openKey", "order_management");
            localStorage.setItem("cheakKey", "DeliveryRecord");
        },
        JumpPageUrl(url, cheakKey, open) {
            let state = false;
            for (let index = 0; index < this.menuList.length; index++) {
                if (open == this.menuList[index].url_value) {
                    localStorage.setItem("openKey", open);
                    localStorage.setItem("cheakKey", cheakKey);
                    if (url) {
                        this.$router.push({ path: url });
                    }
                }
            }
            // if (state){
            // 	this.$message.error('无权限访问');
            // }
        }
    }
};
</script>

<style scoped="scoped">
.headerMenuTitle{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.wlist260 {
	width: 260px;
	margin-right: 20px;
}
.goPeisong {
    color: #169bd5;
    font-size: 15px;
    display: inline-block;
    margin-top: 38px;
}
.menuListVal {
    display: flex;
    justify-content: center;
    align-items: center;
}
.noGuanlian {
    text-align: center;
    font-size: 26px;
    height: 200px;
    line-height: 160px;
}
.noGuanlian img {
    width: 80px;
    height: 60px;
}
.noGuanlian span {
    margin-left: 100px;
}
.rigContent {
    background: inherit !important;
}
.headerTitle {
    /* margin-bottom: 20px; */
    display: flex;
    line-height: 40px;
    font-size: 30px;
    display: flex;
    justify-content: space-between;
}
.headerTitle div {
    width: 5px;
    height: 28px;
    background-color: #000;
    margin-right: 10px;
}
.headerTitle span {
    position: relative;
    bottom: 7px;
}
.menuContent {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
}
.menuList {
    width: 25%;
    text-align: center;
    margin-top: 20px;
}
.menuList p {
    margin-bottom: 10px;
    font-size: 20px;
    color: #9a9a9a;
    font-weight: 400;
}
.headerMenu {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    border-radius: 5px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 1px 0px 11px 0px #ccc;
}
.homeTitle {
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    display: flex;
    color: rgba(51, 51, 51, 1);
}
.homeTitle div {
    width: 3px;
    height: 22px;
}

.menuContent {
    display: flex;
}
.menuContent .menuContent {
    width: 25%;
    height: 100px;
}
.homeContent {
    margin-top: 25px;
    width: 100%;
}
.homeRouter {
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;
}
.itemClass {
    width: 130px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    margin-right: 95px;
    margin-bottom: 20px;
    cursor: pointer;
}
.itemClass img {
    width: 130px;
    margin-bottom: 20px;
    height: 130px;
}
</style>
