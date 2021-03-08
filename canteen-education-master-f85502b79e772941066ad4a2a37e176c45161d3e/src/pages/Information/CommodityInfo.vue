<template>
    <div id="CommodityInfo">
        <a-page-header title="商品详情" @back="() => $router.go(-1)" />
        <div class="CommodityInfo_main">
            <div class="CommodityInfo_main_top">
                <img
                    v-lazy="dataVal.image"
                    alt=""
                />
                <div>
                    <div>{{dataVal.title}}</div>
                    <div>
                        <div>商品售价</div>
                        <div>
                            <span>&yen;{{dataVal.unit_meterage}}</span>
                            <span>/{{dataVal.small_unit}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="Commodity_show">商品介绍</div>
            <div class="Commodity_show_info">
                <a-row>
                    <a-col :span="8">
                        <div v-if="dataVal.type == 0">产地品牌生产商：{{dataVal.brand}}，{{dataVal.produce}}</div>
                        <div v-if="dataVal.type == 1">产地：{{dataVal.origin}}</div>
                        <div v-if="dataVal.type == 2">小作坊名称：{{dataVal.workshop_name}}</div>
                        <!-- <div>生产厂家：{{dataVal.manufacturer}}</div> -->
                        <div v-if="dataVal.type == 0">
                            保质期至：{{dataVal.expiration_time}}
                        </div>
                    </a-col>
                    <a-col :span="8" v-if="dataVal.type != 2">
                        <div v-if="dataVal.type == 0">等级规格：{{dataVal.grade}},{{dataVal.net_content}}{{dataVal.unit}}/{{dataVal.small_unit}}</div>
                        <div v-if="dataVal.type == 0 || dataVal.type == 1">类型：{{dataVal.type_text}}</div>
                        <!-- <div>生产日期：{{dataVal.production_time}}</div>
                        <div>保&nbsp;&nbsp;质&nbsp;&nbsp;期：{{dataVal.expiration_time}}</div>
                        <div>贮存方式：常温贮存</div> -->
                    </a-col>
                    <a-col :span="8" v-if="dataVal.type != 1">
                        <div v-if="dataVal.type == 0 || dataVal.type == 2">生产日期：{{dataVal.production_time}}</div>
                        <div v-if="dataVal.type == 0">计量单位价：&yen;{{dataVal.unit_price}}/{{dataVal.unit}}</div>
                        <!-- <div>包装方式：{{dataVal.packing_type}}</div>
                        <div>净&nbsp;&nbsp;含&nbsp;&nbsp;量： {{dataVal.net_content}}</div> -->
                    </a-col>
                </a-row>
            </div>
            <div class="Commodity_show_img">
                <div v-html='dataVal.introduce'></div>
                <!-- <img
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597746764174&di=0abf2ed5bc2361d3a146f59b8f1696f4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F13%2F20151213103933_rN3ti.thumb.700_0.jpeg"
                    alt=""
                /> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataVal:{}
        };
    },
    created() {
        let id = this.$route.query.id;
        this.getCommodityInfo(id)
    },
    methods: {
        getCommodityInfo(id) {
            let that = this;
            that.$store.commit("setLoading", true);
            let data = {
                url: "/supplier/productInfo",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.dataVal = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#CommodityInfo {
    width: 100%;
    background: #ffffff;
}
.CommodityInfo_main {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-top: 1px solid #eff1f5;
}
.CommodityInfo_main_top {
    width: 100%;
    margin-bottom: 58px;
    display: flex;
    align-items: center;
}
.CommodityInfo_main_top > img {
    width: 230px;
    height: 230px;
    border-radius: 5px;
    margin-right: 24px;
}
.CommodityInfo_main_top > div > div:first-child {
    font-size: 24px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
}
.CommodityInfo_main_top > div > div:last-child {
    width: 356px;
    height: 80px;
    background: rgba(245, 245, 245, 1);
    padding: 30px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: rgba(153, 153, 153, 1);
    margin-top: 40px;
}
.CommodityInfo_main_top > div > div:last-child > div > span {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #666666;
}
.CommodityInfo_main_top > div > div:last-child > div > span:first-child {
    font-size: 36px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: rgba(240, 4, 4, 1);
}
.Commodity_show {
    width: 100%;
    height: 50px;
    background: rgba(245, 245, 245, 1);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
}
.Commodity_show_info {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    margin: 40px 0 50px;
}
.Commodity_show_info div {
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    line-height: 30px;
}
.Commodity_show_img {
    width: 100%;
    /* text-align: center; */
}
</style>