<template>
    <div>
        <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="采购计划"
            @back="() => $router.back()"
        />

        <div class="my-container">
            <div class="hidden info-head">
                <div class="left">学校：{{ tableData.school_name }}</div>
                <div class="left">
                    周：{{ tableData.year }}年{{ tableData.semester }}第{{
                        tableData.school_week
                    }}周
                </div>
                <div class="left">时间：{{ tableData.time }}</div>
                <div class="right">
                    <a-button
                        type="primary"
                        style="margin-right: 30px"
                        @click="openAdd()"
                        >添加食材</a-button
                    >
                    <a-button @click="getData()">还原</a-button>
                    <a-button type="primary" @click="submit()">保存</a-button>
                </div>
            </div>
            <div class="allNums">总金额：{{ all_total }}元</div>
            <a-table
                :columns="columns"
                :data-source="tableData.procurementDetail"
                bordered
                :rowKey="(item, index) => index"
                :pagination="false"
            >
                <template slot="unit" slot-scope="text, record">{{
                    record.school_unit || record.unit
                }}</template>
                <template slot="real_quantity" slot-scope="text, record, index">
                    <a-input
                        v-model="record.real_quantity"
                        @input="changeNum(record, index, record.real_quantity)"
                    ></a-input>
                    <!-- type="number" -->
                </template>
                <template slot="day" slot-scope="text, record">
                    <a-input v-model="record.day"></a-input>
                </template>
                <template slot="action" slot-scope="text, record, index">
                    <a-button type="link" @click="removeItem(index)"
                        >移除</a-button
                    >
                </template>
            </a-table>
        </div>

        <!-- 添加食材 - 弹窗 -->
        <a-modal v-model="addVisible" title="选择食材" @ok="handleOk">
            <a-form-model
                ref="addFormRules"
                :model="addForm"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 14 }"
            >
                <a-form-model-item label="产品名称：" class="lableRequried">
                    <a-select
                        :value="addForm.name"
                        show-search
                        placeholder="请搜索食材名称"
                        style="width: 300px"
                        :default-active-first-option="false"
                        :show-arrow="false"
                        :filter-option="false"
                        :not-found-content="null"
                        @search="handleSearch"
                    >
                        <a-select-option
                            @click="handleChange(addForm, it)"
                            v-for="(it, ix) in ingredients"
                            :key="ix"
                            >{{ it.name }}</a-select-option
                        >
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="请选择供应商：" class="lableRequried">
                    <!-- <a-select v-model="addForm.supplier_id">
                        <a-select-option
                            v-for="(item, index) in suppliers"
                            :key="index"
                            :value="item.id"
                            @click="changeSupplier(item)"
                            >{{ item.name }}</a-select-option
                        >
                    </a-select> -->
                    <div class="position" @click="checkSuppers()">
                            <span class="main_color">{{
                                addForm.supplier_id == ""
                                    ? "请选择"
                                    : addForm.supplier_product_name
                            }}</span>
                            <a-icon type="down" class="main_color" />
                        </div>
                </a-form-model-item>
                <a-form-model-item label="请选择品牌" class="lableRequried">
                    <!-- <a-select v-model="addForm.brand">
                        <a-select-option
                            v-for="(item, index) in allBrand"
                            :key="index"
                            :value="item.id"
                            @click="changeBrand(item)"
                            >{{ item.manufacturer }}</a-select-option
                        >
                    </a-select> -->
                    <div class="position" @click="checkPro()">
                            <span class="main_color">{{
                                addForm.brand == ""
                                    ? "请选择"
                                    : addForm.manufacturer
                            }}</span>
                            <a-icon type="down" class="main_color" />
                        </div>
                </a-form-model-item>
                <a-form-model-item label="产品数量" class="lableRequried">
                    <a-input
                        @input="iptReg"
                        :maxLength="12"
                        v-model="addForm.real_quantity"
                        :suffix="addForm.large_unit"
                    />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <!--供应商弹窗-->
        <a-modal
            v-model="supplierShow"
            title="选择供应商"
            width="60%"
            @cancel="
                () => {
                    supplierShow = false;
                    addVisible = true;
                }
            "
            @ok="supperOk"
            :zIndex="999"
            okText="下一步"
            centered
        >
            <a-table
                :scroll="{ x: 1000, y: 600 }"
                :columns="supplierColumns"
                :data-source="supplierData"
                bordered
                :rowKey="(item, index) => index"
                :pagination="false"
                :row-selection="{
                    selectedRowKeys: selectedRowKeys,
                    hideDefaultSelections: true,
                    type: 'radio',
                    onChange: changeSelectPro
                }"
                :customRow="superClick"
            >
            </a-table>
        </a-modal>
        <!--产品弹窗-->
        <a-modal
            v-model="proShow"
            title="选择食材"
            width="60%"
            @cancel="
                () => {
                    proShow = false;
                    addVisible = true;
                }
            "
            @ok="proOk"
            centered
            :zIndex="1000"
        >
            <a-table
                :scroll="{ x: 1000, y: 600 }"
                :columns="proColumns"
                :data-source="proData"
                bordered
                :loading="proLoading"
                :rowKey="(item, index) => index"
                :pagination="false"
                :row-selection="{
                    selectedRowKeys: proRowKeys,
                    hideDefaultSelections: true,
                    type: 'radio',
                    onChange: checkPros
                }"
                :customRow="proClick"
            >
                <template slot="image" slot-scope="text, record">
                    <img
                        :src="record.image"
                        style="width:80px;height:80px"
                        alt
                    />
                </template>
                <template slot="unit_price" slot-scope="text, record"
                    >{{ record.unit_price }}/{{ record.unit }}</template
                >
                <template slot="specifications" slot-scope="text, record">
                    <span v-if="record.type == 0"
                        >{{ record.net_content }}{{ record.unit }}/{{
                            record.small_unit
                        }}</span
                    >
                </template>
            </a-table>
        </a-modal>
    </div>
</template>

<script>
let timeout;

export default {
    data() {
        return {
            all_total: 0,
            columns: [
                { title: "产品代码", dataIndex: "code" },
                { title: "产品名称", dataIndex: "name" },
                { title: "定点供应商", dataIndex: "supplier" },
                { title: "产地品牌生产商", dataIndex: "supplier_product_name" },
                {
                    title: "计量单位",
                    dataIndex: "unit",
                    scopedSlots: { customRender: "unit" }
                },
                { title: "单价（元）", dataIndex: "unit_price" },
                { title: "预算采购数量", dataIndex: "purchase_quantity" },
                { title: "当前库存量", dataIndex: "count" },
                {
                    title: "实际采购数量（请填写）",
                    dataIndex: "real_quantity",
                    width: "140px",
                    scopedSlots: { customRender: "real_quantity" }
                },
                {
                    title: "金额（元）",
                    dataIndex: "price",
                    scopedSlots: { customRender: "price" }
                },
                {
                    title: "操作",
                    dataIndex: "action",
                    scopedSlots: { customRender: "action" }
                }
            ],
            //弹窗
            addVisible: false,
            addForm: {
                id: "",
                name: "",
                pid: "",
                unit: "",
                supplier_product_name: "",
                supplier_id: "",
                brand: "",
                real_quantity: "",
                large_unit: "",
                title:""
            },

            ingredients: [], //食材数据
            suppliers: [], //食材对应的供应商
            allBrand: [], //获取所有品牌
            //数据
            tableData: {
                procurementDetail: []
            },
            loading: false,
            supplierColumns: [
                //供应商表格
                {
                    title: "供应商代码",
                    dataIndex: "code",
                    align: "center",
                    fixed: "left",
                    width: 180
                },
                { title: "供应品类", dataIndex: "product", align: "center" },
                { title: "供应商", dataIndex: "name", align: "center" }
            ],
            supplierData: [], //供应商数据
            selectedRowKeys: [], //供应商单选的下标集合
            supplierShow: false, //控制供应商弹窗显示
            checkObj: {
                //供应商选择的缓存对象下标
                index: "",
                ix: ""
            },
            superLoading: false,

            proShow: false, //控制品牌弹窗显示
            proData: [], //品牌列表的数据
            proColumns: [
                //品牌表格
                {
                    title: "产品图片",
                    dataIndex: "image",
                    scopedSlots: { customRender: "image" },
                    align: "center",
                    fixed: "left",
                    width: 200
                },
                { title: "产品名称", dataIndex: "title", align: "center" },
                {
                    title: "规格",
                    dataIndex: "specifications",
                    align: "center",
                    scopedSlots: { customRender: "specifications" }
                },
                {
                    title: "单价",
                    dataIndex: "unit_price",
                    scopedSlots: { customRender: "unit_price" },
                    align: "center"
                },
                {
                    title: "产地品牌生产商",
                    dataIndex: "manufacturer",
                    align: "center"
                }
            ],
            proRowKeys: [], //品牌单选的下标集合
            proLoading: false
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 添加食材点击供应商
        superClick(record, index) {
            //供应商添加整行选择
            return {
                on: {
                    click: () => {
                        this.changeSelectPro([index], [record]);
                    }
                }
            };
        },
        proClick(record, index) {
            //品牌添加整行选择
            return {
                on: {
                    click: () => {
                        this.checkPros([index], [record]);
                    }
                }
            };
        },
        changeSelectPro(arr, data) {
            //供应商单选选择
            this.selectedRowKeys = arr;
            this.addForm.supplier_id = data[0].id;
            this.addForm.supplier_product_name = data[0].name;
            this.getAllBrand();
            // var { index, ix } = this.checkObj;
            // this.allData.menu[index].food[ix].supplier_id = data[0].id;
            // this.allData.menu[index].food[ix].supplier = data[0].name;
        },
        checkSuppers() {
            //点击供应商下拉
            if (this.addForm.name == "") {
                this.$message.error("请输入产品名称");
                return;
            }
            // this.checkObj.index = index;
            // this.checkObj.ix = ix;
            this.supplierShow = true;
            this.addVisible = false;
            // this.superLoading = true;
            this.supplierData = this.suppliers;
        },
        ruleSupper() {
            //单选赋值
            if (id == "") {
                //无供应商的时候
                this[seleKey] = [];
            } else {
                this[data].forEach((it, index) => {
                    if (it.id == id) {
                        //单选赋值
                        this[seleKey] = [index];
                    }
                });
            }
        },
        supperOk() {
            if(this.addForm.supplier_id==""){
              return this.$message.error("请选择供应商");
            }
            this.supplierShow = false;
            this.proShow = true;
            this.proData = this.allBrand;
            //供应弹窗确定
            // var { index, ix } = this.checkObj;
            // if (this.allData.menu[index].food[ix].supplier_id == "") {
            //     return this.$message.error("请选择供应商");
            // }
            // this.getPro(this.allData.menu[index].food[ix]);
        },

        checkPros(arr, data) {
            //品牌单选选择
            this.proRowKeys = arr;
            this.addForm.brand = data[0].id;
            this.addForm.manufacturer = data[0].manufacturer;
            this.addForm.unit_price = data[0].unit_price;
            this.addForm.supplier_product_id = data[0].id;
            // this.addForm.unit = value.unit;
            this.addForm.unit_price = data[0].unit_price;
            this.addForm.grade = data[0].grade;
            this.addForm.title = data[0].title;
            // var { index, ix } = this.checkObj;
            // var rows = this.allData.menu[index].food[ix];
            // rows.supplier_product_id = data[0].id;
            // rows.supplier_product_name = data[0].manufacturer;
            // rows.unit_price = data[0].unit_price;
            // rows.price = (
            //     Number(rows.dosage) * Number(rows.unit_price)
            // ).toFixed(2);
            // this.per_person_total();
            // this.school_dosag(rows, index, ix);
            // this.school_price();
            // this.school_totals();
            // this.allSchoolTotla();
            // this.allTotla();
        },
        getPro(item) {
            //获取品牌数据
            var obj = {
                supplier_id: item.supplier_id,
                secondary_id: item.secondary_id
            };
            this.proShow = true;
            this.proLoading = true;
            this.$http.ProductOptionalBrand(obj).then(res => {
                this.proLoading = false;
                if (res.code == 1) {
                    this.proData = res.data;
                    item.proData = res.data;
                    this.ruleSupper(
                        item.supplier_product_id,
                        "proData",
                        "proRowKeys"
                    );
                    this.$forceUpdate();
                }
            });
        },
        checkPro() {
            //点击品牌弹窗
            if (this.addForm.supplier_id == "") {
                return this.$message.error("请选择供应商");
            } else {
                this.addVisible = false;
                this.proShow = true;
                this.proData = this.allBrand;
            }
        },
        proOk(e) {
            console.log();
            this.proShow = false;
            this.addVisible = true;
            // //选择品牌确定
            // var { index, ix } = this.checkObj;
            // if (this.allData.menu[index].food[ix].supplier_product_id == "") {
            //     return this.$message.error("请选择品牌");
            // }
            // if (this.proData.length == 0) {
            //     this.$message.error("暂无食材");
            // } else {
            //     this.checkPros(this.proRowKeys, [
            //         this.proData[this.proRowKeys[0]]
            //     ]);
            //     this.proShow = false;
            //     this.supplierShow = false;
            // }
        },
        iptReg() {
            //验证
            this.addForm.real_quantity = this.$commonJs.regMoneyOnes(
                this.addForm.real_quantity);
        },
        removeItem(index) {
            this.tableData.procurementDetail.splice(index, 1);
            this.setAllnum(this.tableData.procurementDetail);
        },
        changeTime(data, dateString) {
            console.log(dateString);
        },
        changeNum(obj, index, num) {
            num =this.$commonJs.regMoneyOnes(num);
            obj.real_quantity = num;
            this.tableData.procurementDetail[index].price = this.$commonJs.rounds(
                (Number(this.tableData.procurementDetail[index].unit_price) *100 *num) /100,2);
            this.setAllnum(this.tableData.procurementDetail);
        },
        getData() {
            this.loading = true;
            this.$http
                .procurement_plan_detail(this.$route.query.type, {
                    id: this.$route.params.id
                })
                .then(res => {
                    this.loading = false;
                    this.tableData = res.data;
                    var datas = JSON.parse(
                        JSON.stringify(res.data.procurementDetail)
                    );
                    this.setAllnum(datas);
                });
        },
        setAllnum(datas) {
            var sum = 0;
            datas.forEach(item => {
                sum += Number(item.price);
            });
            this.all_total = this.$commonJs.rounds(Number(sum),2)
        },
        submit() {
            let submitForm = JSON.parse(JSON.stringify(this.tableData));
            let typeNum = this.$route.query.type == "day" ? 1 : 0;
            console.log(typeNum);

            this._.forEach(submitForm.procurementDetail, item => {
                this.$set(item, "procurement_type", typeNum);
                this.$set(item, "budget_id", this.tableData.id);
                this.$set(
                    item,
                    "budget_week_id",
                    this.tableData.budget_week_id
                );
                this.$set(item, "unit", item.school_unit);
            });

            this.$http
                .procurement_plan_update(submitForm.procurementDetail)
                .then(res => {
                    if (res.code == 1) {
                        history.go(-1);
                    }
                });
        },
        //弹窗
        openAdd() {
            this.addVisible = true;
            this.addForm = {
                id: "",
                name: "",
                pid: "",
                unit: "",
                supplier_product_name: "",
                supplier_id: "",
                brand: "",
                real_quantity: "",
                large_unit: ""
            };
            this.selectedRowKeys = [];
            this.proRowKeys = [];
            this.setAllnum(this.tableData.procurementDetail);
        },
        handleOk() {
            if (!this.addForm.name) {
                this.$message.error("请输入商品名称");
                return;
            }
            if (!this.addForm.supplier_id) {
                this.$message.error("请选择供应商");
                return;
            }
            if (!this.addForm.brand) {
                this.$message.error("请选择品牌");
                return;
            }
            if (
                !this.addForm.real_quantity ||
                this.addForm.real_quantity <= 0
            ) {
                this.$message.error("请输入商品数量");
                return;
            }

            this.tableData.procurementDetail.push({
                code: this.addForm.code,
                name: this.addForm.title,
                supplier: this.addForm.supplier_product_name,
                supplier_id: this.addForm.supplier_id,
                supplier_product_name: this.addForm.manufacturer,
                supplier_product_id: this.addForm.supplier_product_id,
                secondary_id: this.addForm.id,
                primary_id: this.addForm.pid,
                unit: this.addForm.unit,
                unit_price: this.addForm.unit_price,
                purchase_quantity: this.addForm.purchase_quantity || 0,
                count: this.addForm.count,
                real_quantity: this.addForm.real_quantity || 0,
                price: this.$commonJs.rounds(this.addForm.unit_price * this.addForm.real_quantity,2),
                grade: this.addForm.grade,
                school_unit: this.addForm.school_unit,
                day: 0
            });
            this.all_total =
                parseFloat(this.all_total) +
                parseFloat(
                    this.$commonJs.rounds(
                        this.addForm.unit_price * this.addForm.real_quantity
                    ,2)
                );
            this.addVisible = false;
        },
        questMenu(keyword) {
            //搜索请求
            if (keyword == "") {
                return false;
            }
            this.$http.RecipesProduct({ keyword: keyword }).then(res => {
                if (res.code == 1) {
                    this.ingredients = res.data;
                }
            });
        },
        handleChange(item, it) {
            //食材触发
            item.unit = it.large_unit;
            item.count = it.count;
            item.id = it.id;
            item.pid = it.pid;
            item.name = it.name;
            item.code = it.code;
            item.large_unit = it.large_unit;
            item.school_unit = it.large_unit;
            this.getAllSupplier(it.pid);
        },
        handleSearch(value) {
            //食材搜索
            this.questMenu(value);
            //将其他清空
            this.addForm.supplier_product_name = "";
            this.addForm.supplier_id = "";
            this.addForm.supplier_prodbranduct_name = "";
            this.addForm.real_quantity = "";
        },
        //获取供应商
        getAllSupplier(id) {
            this.$http
                .procurement_orderPro_bySelf_supplierList({ primary_id: id })
                .then(res => {
                    this.selectedRowKeys = [];
                    this.addForm.supplier_id = "";
                    this.addForm.supplier_product_name = "";
                    this.suppliers = res.data || [];
                });
        },
        changeSupplier(value) {
            this.addForm.supplier_id = value.id;
            this.addForm.supplier_product_name = value.name;
            this.getAllBrand();
        },
        //获取品牌
        getAllBrand() {
            var obj = {
                supplier_id: this.addForm.supplier_id,
                secondary_id: this.addForm.id
            };
            this.$http.ProductOptionalBrand(obj).then(res => {
                if (res.code == 1) {
                    this.proRowKeys = [];
                    this.addForm.brand = "";
                    this.addForm.manufacturer = "";
                    this.addForm.unit_price = "";
                    this.allBrand = res.data || [];
                }
            });
        },
        changeBrand(value) {
            this.addForm.manufacturer = value.manufacturer;
            this.addForm.supplier_product_id = value.id;
            // this.addForm.unit = value.unit;
            this.addForm.unit_price = value.unit_price;
            this.addForm.grade = value.grade;
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
    width: 100%;
    // background: #f2f2f2;
    .left {
        margin-right: 40px;
    }
}
.info-other {
    margin-top: 20px;
}
.allNums {
    font-size: 16px;
    color: #333333;
    text-align: right;
    margin-right: 20px;
    margin-bottom: 20px;
}
</style>
