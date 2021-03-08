<template>
    <div>
        <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="采购计划详情"
            @back="() => $router.back()"
        />

        <div class="my-container">
            <div class="hidden info-head">
                <div class="left">学校：{{ tableData.school_name }}</div>
                <div class="left">
                    周：{{ tableData.year }}{{ tableData.semester }}第{{
                        tableData.school_week
                    }}周
                </div>
                <div class="left">时间：{{ tableData.time }}</div>
                <div class="right">
                    <a-button icon="printer" @click="printFun('printTable')"
                        >打印</a-button
                    >
                    <a-button type="primary" icon="download" @click="exportData"
                        >导出</a-button
                    >
                </div>
            </div>
            <div class="totalPrice">
                <div>总金额：{{ total_price }}</div>
            </div>
            <a-table
                :columns="columns"
                :data-source="tableData.procurementDetail"
                bordered
                :rowKey="(item, index) => index"
                :pagination="false"
            >
                <template slot="start_time" slot-scope="text, record"
                    >{{ ["yyyy/M/d", record.start_time * 1000] | dateFormat }} -
                    {{
                        ["yyyy/M/d", record.end_time * 1000] | dateFormat
                    }}</template
                >
            </a-table>
        </div>
        <print-table :info="tableData"></print-table>
    </div>
</template>

<script>
import print from "print-js";
import printTable from "@/pages/Procurement/Plan/components/printTable";
export default {
    components: {
        printTable
    },
    data() {
        return {
            columns: [
                { title: "产品代码", dataIndex: "code",align: "center" },
                { title: "产品名称", dataIndex: "name",align: "center" },
                { title: "定点供应商", dataIndex: "supplier",align: "center" },
                { title: "产地品牌生产商", dataIndex: "supplier_product_name",align: "center" },
                { title: "计量单位", dataIndex: "unit",align: "center" },
                { title: "单价（元）", dataIndex: "unit_price",align: "center" },
                { title: "数量", dataIndex: "real_quantity",align: "center" },
                { title: "金额（元）", dataIndex: "price",align: "center" }
            ],
            //数据
            dataSource: [],
            tableData: {
                procurementDetail: []
            },
            total_price: ""
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.$http
                .procurement_plan_detailInfo(this.$route.query.type, {
                    id: this.$route.params.id
                })
                .then(res => {
                    this.tableData = res.data;
                    let sum = 0;
                    res.data.procurementDetail.forEach(item => {
                        sum += parseFloat(item.price);
                    });
                    this.total_price = this.$commonJs.rounds(sum,2);
                });
        },
        printFun(id) {
            setTimeout(() => {
                printJS({
                    printable: id,
                    type: "html",
                    // targetStyles: ["*"],
                    ignoreElements: ["no-print", "bc", "gb"]
                });
            }, 1500);
        },
        exportData() {
            if (this.$route.query.type == "week") {
                //周
                this.$http.procurement_plan_export({
                    id: this.$route.params.id
                });
            } else {
                //天
                this.$http.procurement_plan_day_export({
                    id: this.$route.params.id
                });
            }
        }
    }
};
</script>

<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
</style>

<style scoped="scoped" lang="scss">
.info-head {
    padding: 20px 20px;
    margin-bottom: 20px;
    width: 100%;
    // background: #f2f2f2;
    .left {
        margin-right: 40px;
    }
}
.info-other {
    margin-top: 20px;
}
.totalPrice{
  width: 100%;
  padding-right: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
