<template>
    <div id="ShopDetails">
        <a-page-header title="店铺详情" @back="() => $router.go(-1)" />
        <div class="ShopDetails_main">
            <div class="ShopDetails_main_top">
                <img v-lazy="dataVal.info.logo" alt="" />
                <div>
                    <div>{{ dataVal.info.name }}</div>
                    <div>经营类目：{{ dataVal.info.product }}</div>
                </div>
            </div>
            <a-tabs v-model="activeKey" @change="callback">
                <a-tab-pane
                    v-for="tagItem in productList"
                    :key="tagItem.id"
                    :tab="tagItem.name"
                >
                    <!-- 搜索框 -->
                    <a-form layout="inline" class="mx_form mx_staff">
                        <a-form-item>
                            <span>
                                <a-input
                                    type="text"
                                    v-model="commodity"
                                    placeholder="搜索店内商品/食材"
                                />
                            </span>
                        </a-form-item>
                        <a-form-item>
                            <a-button
                                class="mx_btnbg"
                                @click="handleSubmit"
                                type="primary"
                                html-type="submit"
                                >搜索</a-button
                            >
                        </a-form-item>
                    </a-form>
                    <div class="commodity_list">
                        <div
                            class="commodity_list_item"
                            v-for="item in commodityList"
                            :key="item.id"
                            @click="commodityInfo(item.id)"
                        >
                            <img v-lazy="item.image" alt="" />
                            <div class="commodity_list_item_price">
                                <span>&yen;</span>
                                <span>{{ item.unit_meterage }}</span>
                                <span>/{{ item.unit }}</span>
                            </div>
                            <div class="commodity_list_item_name">
                                {{ item.title }}
                            </div>
                        </div>
                    </div>
                    <div v-if="commodityList.length > 0">
                        <a-pagination
                            :page-size="pageSize"
                            :current="current"
                            :total="total"
                            :show-total="
                                (total, range) =>
                                    `共 ${total} 条记录 第 ${current} / ${Math.ceil(
                                        total / pageSize
                                    )} 页`
                            "
                            :page-size-options="pageSizeOptions"
                            show-size-changer
                            show-less-items
                            @change="onShowPagheChange"
                            @showSizeChange="onShowSizeChange"
                        />
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            current: 1,
            pageSize: 10,
            total:50,
            pageSizeOptions: ["10", "20", "30", "40", "50"],
            activeKey: 0,
            tagData: [
                { name: "全部" },
                { name: "即粮食类" },
                { name: "肉禽蛋类" },
                { name: "蔬菜瓜果类" },
                { name: "油盐辅料类" },
                { name: "幼儿点心类" },
                { name: "其它类" }
            ],
            commodity: "",
            supplierId: "",
            dataVal: {
                info: {
                    logo: ""
                }
            },
            productList:[],
            commodityList: [],
            pagination: {
                pageSize: 10, // 默认每页显示数量
                current: 1, //显示当前页数
                total: 50,
                pageSizeOptions: ["10", "20", "30", "40", "50"],
                showSizeChanger: true, // 显示可改变每页数量
                showQuickJumper: true, //显示跳转到输入的那一页
                showTotal: total =>
                    `共 ${total} 条记录 第 ${
                        this.pagination.current
                    } / ${Math.ceil(total / this.pagination.pageSize)} 页` // 显示总数
            }
        };
    },
    created() {
        let id = this.$route.query.id;
        this.supplierId = id;
        this.getDataInfo(id);
    },
    methods: {
        callback(key) {
            console.log(key);
            this.commodity = "";
            this.commodityList = [];
            this.getCommodityList(
                this.supplierId,
                this.activeKey,
                this.commodity
            );
        },
        // 获取供应商信息
        getDataInfo(id) {
            let that = this;
            let data = {
                url: "/supplier/shop",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.dataVal = res.data.data;
                    let arr = [{id:'',name:'全部'}];
                    that.productList = arr.concat(res.data.data.product);
                    // that.productList = res.data.data.product;
                    that.activeKey = that.productList[0].id;
                    // that.activeKey = res.data.data.product[0].id;
                    that.getCommodityList(
                        id,
                        that.productList[0].id,
                        that.commodity
                    );
                    // res.data.data.forEach(item => {
                    //     item.key = item.school_id;
                    // });
                    // // that.pagination.total = res.data.data.count;
                    // that.modelData = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        onShowPagheChange(page, pageSize) {
            this.current = page;
            this.pageSize = pageSize;
            this.getCommodityList(
                this.supplierId,
                this.activeKey,
                this.commodity
            );
        },
        onShowSizeChange(current, size) {
            this.current = 1;
            this.pageSize = size;
            this.getCommodityList(
                this.supplierId,
                this.activeKey,
                this.commodity
            );
        },
        // 获取商品列表
        getCommodityList(supplierId, primaryId, keyword) {
            let that = this;
            that.$store.commit("setLoading", true);
            let data = {
                url: "/supplier/product",
                method: "post",
                data: {
                    supplier_id: supplierId,
                    primary_id: primaryId,
                    keyword: keyword,
                    page: this.current,
                    pageSize: this.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.commodityList = res.data.data.data;
                    // that.dataVal = res.data.data;
                    // that.activeKey = res.data.data.product[0].id;
                    // res.data.data.forEach(item => {
                    //     item.key = item.school_id;
                    // });
                    that.total = res.data.data.total;
                    // that.modelData = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 商品、食材搜索
        handleSubmit() {
            this.getCommodityList(
                this.supplierId,
                this.activeKey,
                this.commodity
            );
        },
        // 商品详情
        commodityInfo(i) {
            this.$router.push({
                path: "CommodityInfo",
                query: {
                    id: i
                }
            });
        }
    }
};
</script>

<style scoped>
#ShopDetails {
    width: 100%;
    background: #ffffff;
}
.ShopDetails_main {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-top: 1px solid #eff1f5;
}
.ShopDetails_main_top {
    width: 100%;
    margin-bottom: 58px;
    display: flex;
    align-items: center;
}
.ShopDetails_main_top > img {
    width: 120px;
    height: 120px;
    border-radius: 5px;
    margin-right: 24px;
}
.ShopDetails_main_top > div > div:first-child {
    font-size: 24px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
}
.ShopDetails_main_top > div > div:last-child {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 20px;
}
.ant-btn-primary {
    background: #02bb72;
    outline-style: none;
    border: none;
}
.mx_staff {
    margin: 20px 0 46px;
}
.commodity_list {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.commodity_list_item {
    width: 215px;
    height: 248px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 5px;
    margin: 0 24px 24px 0;
    cursor: pointer;
}
.commodity_list_item img {
    width: 215px;
    height: 171px;
    border-radius: 5px 5px 0px 0px;
}
.commodity_list_item > div {
    width: 100%;
    padding: 0 18px;
    box-sizing: border-box;
}

.commodity_list_item_price {
    font-size: 26px;
    font-family: "Myriad Pro";
    font-weight: bold;
    color: rgba(255, 4, 4, 1);
    margin-top: 5px;
}
.commodity_list_item_price > span:first-child {
    font-size: 14px;
    font-family: "PingFang SC";
    font-weight: bold;
    color: rgba(255, 4, 4, 1);
}
.commodity_list_item_price > span:last-child {
    font-size: 14px;
    font-family: "PingFang SC";
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
}
.commodity_list_item_name {
    font-size: 14px;
    font-family: "PingFang SC";
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>