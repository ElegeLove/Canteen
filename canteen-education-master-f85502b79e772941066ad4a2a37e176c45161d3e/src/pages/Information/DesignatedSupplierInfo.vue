<template>
    <div id="DesignatedSupplierInfo">
        <!-- 搜索框 -->
        <a-form layout="inline" class="mx_form mx_staff topBox">
            <a-form-item label="单位：">
                <span>
                    <a-input
                        type="text"
                        v-model="schoolName"
                        placeholder="单位简称/代码"
                    />
                </span>
            </a-form-item>
            <a-form-item label="合同到期时间节点：">
                <span>
                    <a-select
                        placeholder="请选择"
                        style="width:240px;height:34px;"
                        v-model="timeVal"
                        @change="shoolTypeChange"
                    >
                        <a-select-option
                            v-for="item in timeList"
                            :key="item.id"
                        >
                            {{ item.create_time_text }}
                        </a-select-option>
                    </a-select>
                </span>
            </a-form-item>
            <a-form-item>
                <a-button
                    class="mx_btnbg"
                    @click="handleReset"
                    html-type="reset"
                    >重置</a-button
                >
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
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :data-source="data"
            bordered
            :pagination="pagination"
            :scroll="scrollVal"
            :loading="loadShow"
            @change="handleTableChange"
        >
            <template
                style="display: flex;justify-content: space-around;"
                v-for="col in ['business_license', 'food_business_license']"
                :slot="col"
                slot-scope="text"
            >
                <div :key="col">
                    <viewer>
                        <img v-lazy="text" :src="text" class="tabImg" />
                    </viewer>
                </div>
            </template>
            <template slot="distribution" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="showInfo(record)">查看</div>
                </div>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="proctInfo(record.id)">产品信息</div>
                </div>
            </template>
        </a-table>
        <a-modal v-model="visible" width="60%" title="查看" :centered="true">
            <div>
                <a-table
                    :columns="modelColumns"
                    :data-source="modelData"
                    bordered
                    :pagination="false"
                >
                </a-table>
            </div>
            <template slot="footer">
                <div class="model_footer">
                    <a-button
                        key="submit"
                        class="model_footer_btn"
                        @click="handleOk"
                    >
                        关闭
                    </a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script>
const columnsVal = [
    {
        title: "单位代码",
        dataIndex: "code",
        key: "code",
        width: 100,
        fixed: "left",
        align: "center"
    },
    {
        title: "单位简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: 100,
        fixed: "left",
        align: "center"
    },
    {
        title: "企业类型",
        dataIndex: "nature",
        key: "nature",
        width: 100,
        fixed: "left",
        align: "center"
    },
    {
        title: "营业执照",
        dataIndex: "business_license",
        key: "business_license",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "business_license" }
    },
    {
        title: "统一社会信用代码",
        dataIndex: "credit_code",
        key: "credit_code",
        width: 150,
        align: "center"
    },
    {
        title: "食品经营许可证号",
        dataIndex: "food_business_license",
        key: "food_business_license",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "food_business_license" }
    },
    {
        title: "办公地址",
        dataIndex: "office_address",
        key: "office_address",
        width: 100,
        align: "center"
    },
    {
        title: "仓库地址",
        dataIndex: "warehouse_address",
        key: "warehouse_address",
        width: 100,
        align: "center"
    },
    {
        title: "法定代表人",
        children: [
            {
                title: "姓名",
                dataIndex: "legal_person",
                key: "legal_person",
                width: 120,
                align: "center"
            },
            {
                title: "家庭住址",
                dataIndex: "legal_person_address",
                key: "legal_person_address",
                width: 120,
                align: "center"
            },
            {
                title: "身份证号",
                dataIndex: "id_card",
                key: "id_card",
                width: 150,
                align: "center"
            },
            {
                title: "手机号",
                dataIndex: "legal_person_mobile",
                key: "legal_person_mobile",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "购买保险",
        children: [
            {
                title: "金额",
                dataIndex: "insurance_amount",
                key: "insurance_amount",
                width: 120,
                align: "center"
            },
            {
                title: "保险公司",
                dataIndex: "insurance_company",
                key: "insurance_company",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "配送学校",
        key: "distribution",
        width: 120,
        fixed: "right",
        align: "center",
        scopedSlots: { customRender: "distribution" }
    }
];
const data = [
    // {
    //     key: "1",
    //     unitCode: "0031",
    //     unitName: "某某学校全称",
    //     nature: "小微",
    //     creditCode:
    //         "http://a2.att.hudong.com/50/03/01300000167059121860035875425.jpg",
    //     licenseKey:
    //         "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2877376443,40725785&fm=26&gp=0.jpg",
    //     office: "某某地址",
    //     warehouse: "某某地址",
    //     representative: "张三",
    //     address: "800",
    //     IDCard:
    //         "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3742885068,948154031&fm=26&gp=0.jpg",
    //     phone: "18580400000",
    //     money: "800",
    //     insurer: "某某公司"
    // },
];
const modelColumns = [
    {
        title: "学校简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: "15%",
        align: "center"
    },
    {
        title: "履约保证金金额（元）",
        dataIndex: "bond",
        key: "bond",
        width: "20%",
        align: "center"
    },
    {
        title: "配送品种",
        dataIndex: "product_str",
        key: "product_str",
        width: "15%",
        align: "center"
    },
    {
        title: "就餐人次（平均每天）",
        children: [
            {
                title: "总",
                dataIndex: "avg_count",
                key: "avg_count",
                width: "10%",
                align: "center"
            },
            {
                title: "早",
                dataIndex: "m_count",
                key: "m_count",
                width: "10%",
                align: "center"
            },
            {
                title: "中",
                dataIndex: "a_count",
                key: "a_count",
                width: "10%",
                align: "center"
            },
            {
                title: "晚",
                dataIndex: "e_count",
                key: "e_count",
                width: "10%",
                align: "center"
            }
        ]
    }
];
const modelData = [
    // {
    //     key: "1",
    //     schoolName: "某某学校全称",
    //     bond: "800",
    //     deliveryBreed: "点心类",
    //     sumUp: "800",
    //     early: "800",
    //     centre: "800",
    //     evening: "800"
    // },
];
export default {
    data() {
        return {
            columns: [],
            columnsVal,
            data,
            scrollVal: { x: 1400 },
            modelColumns,
            modelData,
            schoolName: "",
            sclType: [
                { name: "建制幼儿园" },
                { name: "民办幼儿园" },
                { name: "小学" },
                { name: "民办小学" },
                { name: "完全小学" },
                { name: "初中" },
                { name: "民办初中" },
                { name: "特殊教育" },
                { name: "九年一般制" },
                { name: "高中" },
                { name: "民办高中" },
                { name: "职高" },
                { name: "民办职高" }
            ],
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
            },
            visible: false,
            loadShow: false,
            timeList:[],
            timeVal:''
        };
    },
    created() {
        this.getDataInfo(this.schoolName);
        this.getShoolType();
    },
    methods: {
        // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getDataInfo(this.schoolName);
        },
        // 获取列表数据
        getDataInfo(schoolName) {
            let that = this;
            that.loadShow = true;
            let data = {
                url: "/supplier/supplierList",
                method: "post",
                data: {
                    search_name: schoolName,
                    disassociate_id: this.timeVal,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                that.loadShow = false;
                if (res.data.code == 1) {
                    if (res.data.data.list.length < 1) {
                        that.scrollVal = {};
                        that.columns = [];
                    } else {
                        let obj = {
                            title: "操作",
                            key: "operation",
                            fixed: "right",
                            width: 100,
                            align: "center",
                            scopedSlots: { customRender: "operation" }
                        }
                        if(that.timeVal == ''){
                            that.columns = that.columnsVal.concat(obj);
                        }else{
                            that.columns = that.columnsVal;
                        }
                        that.scrollVal = { x: 1400 };
                        res.data.data.list.forEach(item => {
                            item.key = item.id;
                        });
                    }
                    that.pagination.total = res.data.data.count;
                    that.data = res.data.data.list;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 获取合同到期时间节点列表
        getShoolType() {
            let that = this;
            let data = {
                url: "/common/getDisassociate",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    let arr = [{ create_time_text: "请选择", id: "" }];
                    that.timeList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 合同到期时间节点
        shoolTypeChange(e){
            this.pagination.current = 1;
            this.getDataInfo(this.schoolName);
        },
        // 重置
        handleReset(){
            this.schoolName = '';
            this.timeVal = '';
            this.pagination.current = 1;
            this.getDataInfo(this.schoolName);
        },
        // 学校简称搜索
        handleSubmit() {
            this.pagination.current = 1;
            this.getDataInfo(this.schoolName);
        },
        // 查看
        showInfo(val) {
            this.visible = true;
            this.modelData = [];
            let id = '';
            if(this.timeVal == ''){
                id = val.id;
            }else{
                id = val.supplier_id;
            }
            this.getdeliveryVal(id);
        },
        // 获取配送学校
        getdeliveryVal(id) {
            let that = this;
            that.$store.commit("setLoading", true);
            let data = {
                url: "/supplier/schoolList",
                method: "post",
                data: {
                    id: id,
                    disassociate_id: this.timeVal,
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    res.data.data.forEach(item => {
                        item.key = item.school_id;
                    });
                    // that.pagination.total = res.data.data.count;
                    that.modelData = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 产品信息
        proctInfo(i) {
            this.$router.push({
                path: "ShopDetails",
                query: {
                    id: i
                }
            });
        },
        // 确认
        handleOk(e) {
            // this.data[this.dataIndex].pwd = "123456";
            this.visible = false;
        }
    }
};
</script>

<style scoped>
#DesignatedSupplierInfo {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.topBox {
    margin-bottom: 30px;
}
.RecipeQuery_box {
    margin-top: 20px;
    display: flex;
    align-items: center;
}
.RecipeQuery_box_item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
}
.operate {
    width: 100%;
    display: flex;
    align-items: center;
}
.operate > div {
    color: rgba(2, 187, 114, 1);
    cursor: pointer;
}
.model_footer {
    width: 100%;
    display: flex;
    justify-content: center;
}
.model_footer_btn {
    width: 230px;
    height: 50px;
    border: 1px solid rgba(2, 187, 114, 1);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: rgba(2, 187, 114, 1);
}
.tabImg {
    width: 60px;
    height: 60px;
    object-fit: cover;
}
</style>