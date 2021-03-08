<template>
    <div>
        <!-- 按食材出库 -->

        <a-page-header title="按食材出库" @back="() => $router.back()">
            <a-divider orientation="left">食材清单</a-divider>

            <!-- 数据 start -->
            <a-table
                :columns="columns"
                :data-source="tableData"
                bordered
                :rowKey="(item, index) => index"
                :pagination="false"
            >
                <template slot="number" slot-scope="text, record, index">
                    <a-input
						style="width: 90px;"
                        v-model="record.number"
                        @change="changeNum(index, record)"
                        :min="1"
                        :max="record.now_count"
                    />
                </template>
                <template slot="remark" slot-scope="text, record">
                    <a-input v-model="record.remark" placeholder="请输入备注" />
                </template>
            </a-table>
            <!-- 数据 -end -->
            <div class="top-20">
                <a-button
                    type="primary"
                    :loading="submitLoading"
                    :disabled="submitLoading"
                    @click="submit()"
                    >确认出库</a-button
                >
                <a-button @click="$router.back()">取消</a-button>
            </div>
        </a-page-header>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: "产品代码",
                    dataIndex: "product_code"
                },
                {
                    title: "产品名称",
                    dataIndex: "product_name"
                },
                {
                    title: "产地品牌生产商",
                    dataIndex: "manufacturer"
                },
                {
                    title: "等级规格",
                    dataIndex: "grade"
                },
                {
                    title: "计量单位",
                    dataIndex: "unit_meterage"
                },
                {
                    title: "单价（元）",
                    dataIndex: "unit_price"
                },
                {
                    title: "数量",
                    dataIndex: "number",
                    scopedSlots: {
                        customRender: "number"
                    }
                },
                {
                    title: "该批次库存量",
                    dataIndex: "stock"
                },
                {
                    title: "金额（元）",
                    dataIndex: "total_price"
                },
                {
                    title: "备注",
                    dataIndex: "remark",
                    scopedSlots: {
                        customRender: "remark"
                    }
                }
            ],
            tableData: [],
            submitLoading: false
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        changeNum(i, val) {
			val.number = this.$commonJs.regMoneyOnes(val.number)
            this.tableData[i].total_price = this.$commonJs.rounds(this.tableData[i].unit_price * val.number,2);
        },
        getData() {
            this.$http
                .outAndIn_outData({
                    ids: this.$route.query.ids.split(",")
                })
                .then(res => {
                    this.tableData = res.data;
                    this._.forEach(this.tableData, item => {
                        this.$set(item, "number", 1);
                        this.$set(item, "remark", "");
                    });
                });
        },
        submit() {
            this.submitLoading = true;
            let array = [];
            this._.forEach(this.tableData, item => {
                array.push({
                    id: item.id,
                    number: item.number,
                    remark: item.remark || ""
                });
            });
            this.$store.commit("sch_setLoaing",true)
            this.$http.outAndIn_outSingleItem(array, 2).then(res => {
                this.submitLoading = false;
                this.$store.commit("sch_setLoaing",false)
                if (res.code == 1) {
                    this.$router.push("/outAndIn/out/outIndex/list");
                }
            });
        }
    }
};
</script>





<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
</style>
