<template>
    <div id="InfoAggregation">
        <!-- 搜索框 -->
        <div class="RecipeQuery_box_item">
            <div>&emsp;&emsp;学校：</div>
            <a-input
                type="text"
                style="width:240px;height:34px;"
                v-model="schoolName"
                placeholder="学校简称/代码"
            />
            <div class="mx_btnbg" @click="handleSubmit">搜索</div>
        </div>
        <!-- <div class="RecipeQuery_box">
            <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;年份：</div>
                <a-select
                    style="width:240px;height:34px;"
                    @change="yearChange"
                    v-model="years"
                >
                    <a-select-option v-for="item in yearList" :key="item.year">
                        {{ item.year }}
                    </a-select-option>
                </a-select>
            </div>
            <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;学期：</div>
                <a-select
                    style="width:240px;height:34px;"
                    :disabled="status"
                    v-model="semester"
                    @change="semesterChange"
                >
                    <a-select-option
                        v-for="item in semesterList"
                        :key="item.semester"
                    >
                        {{ item.semester }}
                    </a-select-option>
                </a-select>
            </div>
        </div> -->
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
            <template slot="inclusive_garden" slot-scope="text">
                <div
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div>{{ text == 1 ? "是" : "否" }}</div>
                </div>
            </template>
            <template slot="is_canteen" slot-scope="text">
                <div
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div>{{ text == 1 ? "是" : "否" }}</div>
                </div>
            </template>
            <!-- <template slot="regular_staff" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="workersListShow(record.id, '0')">{{text}}</div>
                </div>
            </template> -->
            <template slot="temporary_employee" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="workersListShow(record.id)">{{ text }}</div>
                </div>
            </template>
            <!-- <template slot="expenditures" slot-scope="text, record, index">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="expendituresModel(index)">查看</div>
                </div>
            </template>
            <template slot="planExpenditures" slot-scope="text, record, index">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="planExpenditureModel(index)">查看</div>
                </div>
            </template> -->
            <template slot="operation" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="budgetTable(record.id)">查看村校</div>
                </div>
            </template>
        </a-table>
        <a-modal
            v-model="isProvisional"
            width="40%"
            title="查看"
            :centered="true"
        >
            <div class="provisionalMain">
                <a-row style="width:100%;">
                    <a-col :span="8">
                        <div>教师：{{molVal.teacher}}人</div>
                        <div>保育员：{{molVal.nursery_governess}}人</div>
                    </a-col>
                    <a-col :span="8">
                        <div>保安：{{molVal.security_staff}}人</div>
                        <div>炊事员：{{molVal.cook}}人</div>
                    </a-col>
                    <a-col :span="8">
                        <div>生活指导老师：{{molVal.life_instructor}}人</div>
                        <div>其他：{{molVal.other}}人</div>
                    </a-col>
                </a-row>
            </div>
            <template slot="footer">
                <div class="model_footer">
                    <a-button
                        key="submit"
                        class="model_footer_btn"
                        @click="
                            () => {
                                isProvisional = false;
                            }
                        "
                    >
                        关闭
                    </a-button>
                </div>
            </template>
        </a-modal>
        <a-modal
            v-model="visibles"
            width="40%"
            title="本年度伙食计划支出"
            :centered="true"
        >
            <div>
                <a-table
                    :columns="columnsMods"
                    :data-source="dataMods"
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
                        @click="handleOks"
                    >
                        关闭
                    </a-button>
                </div>
            </template>
        </a-modal>
        <a-modal
            v-model="visible"
            width="40%"
            title="本年度伙食计划支出"
            :centered="true"
        >
            <div>
                <a-table
                    :columns="columnsModel"
                    :data-source="dataModel"
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
        title: "学校代码",
        dataIndex: "code",
        key: "code",
        width: 100,
        fixed: "left",
        align: "center"
    },
    {
        title: "学校简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: 120,
        fixed: "left",
        align: "center"
    },
    {
        title: "所属",
        children: [
            {
                title: "片区",
                dataIndex: "area",
                key: "area",
                width: 100,
                align: "center"
            },
            {
                title: "乡镇",
                dataIndex: "township",
                key: "township",
                width: 100,
                align: "center"
            }
        ]
    },
    {
        title: "学校地址",
        dataIndex: "address",
        key: "address",
        width: 240,
        align: "center"
    },
    {
        title: "法定代表人",
        children: [
            {
                title: "姓名",
                dataIndex: "legal_person",
                key: "legal_person",
                width: 100,
                align: "center"
            },
            {
                title: "电话",
                dataIndex: "legal_person_mobile",
                key: "legal_person_mobile",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "幼儿园园长",
        children: [
            {
                title: "姓名",
                dataIndex: "director",
                key: "director",
                width: 100,
                align: "center"
            },
            {
                title: "电话",
                dataIndex: "director_mobile",
                key: "director_mobile",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "是否普惠园",
        dataIndex: "inclusive_garden",
        key: "inclusive_garden",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "inclusive_garden" }
    },
    {
        title: "是否有食堂",
        dataIndex: "is_canteen",
        key: "is_canteen",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "is_canteen" }
    },
    {
        title: "用工总数",
        dataIndex: "worker_count",
        key: "worker_count",
        width: 100,
        align: "center"
    },
    {
        title: "正式职工",
        dataIndex: "regular_staff",
        key: "regular_staff",
        width: 100,
        align: "center"
    },
    {
        title: "临时用工",
        dataIndex: "temporary_employee",
        key: "temporary_employee",
        width: 100,
        align: "center",
        scopedSlots: { customRender: "temporary_employee" }
    },
    {
        title: "学生人数",
        dataIndex: "student_count",
        key: "student_count",
        width: 100,
        align: "center"
    },
    // {
    //     title: "上年度伙食支出情况",
    //     dataIndex: "expenditures",
    //     key: "expenditures",
    //     width: 180,
    //     align: "center",
    //     scopedSlots: { customRender: "expenditures" }
    // },
    // {
    //     title: "本年度伙食计划支出",
    //     dataIndex: "planExpenditures",
    //     key: "planExpenditures",
    //     width: 180,
    //     align: "center",
    //     scopedSlots: { customRender: "planExpenditures" }
    // },
    {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 140,
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [];
const columnsModel = [
    {
        title: "食材%",
        dataIndex: "food",
        key: "food",
        width: "30%",
        align: "center"
    },
    {
        title: "人工%",
        dataIndex: "artificial",
        key: "artificial",
        width: "30%",
        align: "center"
    },
    {
        title: "运费及其他%",
        dataIndex: "freight",
        key: "freight",
        width: "40%",
        align: "center"
    }
];
const dataModel = [
    {
        key: "1",
        food: "50",
        artificial: "50",
        freight: "50"
    },
    {
        key: "2",
        food: "50",
        artificial: "50",
        freight: "50"
    },
    {
        key: "3",
        food: "50",
        artificial: "50",
        freight: "50"
    }
];
const columnsMods = [
    {
        title: "食材金额",
        dataIndex: "foodPrice",
        key: "foodPrice",
        width: "23%",
        align: "center"
    },
    {
        title: "%",
        dataIndex: "foodPercentage",
        key: "foodPercentage",
        width: "10%",
        align: "center"
    },
    {
        title: "人工金额",
        dataIndex: "artificialPrice",
        key: "artificialPrice",
        width: "23%",
        align: "center"
    },
    {
        title: "%",
        dataIndex: "artificialPercentage",
        key: "artificialPercentage",
        width: "10%",
        align: "center"
    },
    {
        title: "运行费及其他",
        dataIndex: "otherPrice",
        key: "otherPrice",
        width: "24%",
        align: "center"
    },
    {
        title: "%",
        dataIndex: "otherPercentage",
        key: "otherPercentage",
        width: "10%",
        align: "center"
    }
];
const dataMods = [
    {
        key: "1",
        foodPrice: "1563.48",
        foodPercentage: "50",
        artificialPrice: "1563.48",
        artificialPercentage: "50",
        otherPrice: "1563.48",
        otherPercentage: "50"
    },
    {
        key: "2",
        foodPrice: "1563.48",
        foodPercentage: "50",
        artificialPrice: "1563.48",
        artificialPercentage: "50",
        otherPrice: "1563.48",
        otherPercentage: "50"
    },
    {
        key: "3",
        foodPrice: "1563.48",
        foodPercentage: "50",
        artificialPrice: "1563.48",
        artificialPercentage: "50",
        otherPrice: "1563.48",
        otherPercentage: "50"
    }
];
export default {
    data() {
        return {
            data,
            columns: [],
            columnsVal,
            scrollVal: { x: 1400 },
            schoolName: "",
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
            columnsModel,
            dataModel,
            columnsMods,
            dataMods,
            visible: false,
            visibles: false,
            loadShow: false,
            isProvisional: false,
            molVal:{},
            status: true,
            yearList: [],
            years: "全部",
            yearVal: "",
            semesterList: [],
            semester: "全部",
            semesterVal: ""
        };
    },
    created() {
        this.getDataList(this.schoolName);
        this.getYear();
    },
    methods: {
        // 获取年份列表
        getYear() {
            let that = this;
            let data = {
                url: "/common/selectYear",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    let arr = [{ year: "全部" }];
                    that.yearList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 获取学期
        getSemester(year) {
            let that = this;
            let data = {
                url: "/common/selectSemester",
                method: "post",
                data: {
                    year: year
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    let arr = [{ semester: "全部" }];
                    that.semesterList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 年份选择
        yearChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.yearVal = "";
                this.status = true;
                this.semester = "全部";
                this.semesterVal = "";
            } else {
                this.status = false;
                this.yearVal = e;
                this.getSemester(e);
            }
            // this.getDataList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName);
        },
        // 学期选择
        semesterChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.semesterVal = "";
            } else {
                this.semesterVal = e;
            }
            // this.getDataList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName);
        },
        // 学校简称搜索
        handleSubmit() {
            console.log(this.schoolName);
            this.getDataList(this.schoolName);
        },
        // 学校类型
        handleChange(value) {
            console.log(`Selected: ${value}`);
        },
        // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getDataList(this.schoolName);
        },
        // 获取数据列表
        getDataList(schoolName) {
            let that = this;
            that.loadShow = true;
            let data = {
                url: "/school/schoolsInfo",
                method: "post",
                data: {
                    search_name: schoolName,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    if (res.data.data.list.length < 1) {
                        that.columns = [];
                        that.scrollVal = {};
                    } else {
                        that.columns = that.columnsVal;
                        that.scrollVal = { x: 1400 };
                    }
                    that.data = res.data.data.list;
                    that.pagination.total = res.data.data.total_count;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 查看村校
        budgetTable(i) {
            this.$router.push({
                path: "ShowVillageSchool",
                query: {
                    id: i
                }
            });
        },
        // 正式职工、临时用工列表页
        workersListShow(id) {
            this.isProvisional = true;
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/school/temporaryEmployee",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.molVal = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        //上年度伙食支出情况--弹窗
        expendituresModel(i) {
            this.visibles = true;
        },
        // 关闭
        handleOks() {
            this.visibles = false;
        },
        // 本年度伙食计划支出--弹窗
        planExpenditureModel(i) {
            this.visible = true;
        },
        // 关闭
        handleOk() {
            this.visible = false;
        }
    }
};
</script>

<style scoped>
#InfoAggregation {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.RecipeQuery_box {
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.mx_btnbg {
    width: 62px;
    height: 34px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #02bb72;
    color: #ffffff;
    margin-left: 22px;
    cursor: pointer;
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
    /* margin-right: 30px; */
    color: #02bb72;
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
.provisionalMain {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}
</style>