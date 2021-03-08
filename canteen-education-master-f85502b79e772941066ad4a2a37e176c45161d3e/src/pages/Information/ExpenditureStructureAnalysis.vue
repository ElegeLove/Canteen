<template>
    <div id="ExpenditureStructureAnalysis">
        <div class="ExpenditureStructureAnalysis_title">学校食堂支出结构分析</div>
        <div class="PurchasePlanAnalysis_box">
            <div class="PurchasePlanAnalysis_box_item">
                <div>年份：</div>
                <a-select
                    style="width:240px;height:34px;"
                    @change="yearChange"
                    default-value="全部"
                >
                    <a-select-option v-for="item in yearList" :key="item.year">
                        {{ item.year }}
                    </a-select-option>
                </a-select>
            </div>
            <div class="PurchasePlanAnalysis_box_item">
                <div>学期：</div>
                <a-select
                    style="width:240px;height:34px;"
                    :disabled="status"
                    v-model="semesterId"
                    @change="semesterChange"
                >
                    <a-select-option
                        v-for="item in semesterList"
                        :key="item.id"
                    >
                        {{ item.semester_text }}
                    </a-select-option>
                </a-select>
            </div>
            <div class="PurchasePlanAnalysis_box_item">
                <div>月份：</div>
                <a-select
                    placeholder="请选择"
                    style="width:240px;height:34px;"
                    v-model="mouthVal"
                    @change="handleChange"
                >
                    <a-select-option v-for="item in sclType" :key="item.val">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
        </div>
        <!-- 搜索框 -->
        <a-form layout="inline" class="mx_form mx_staff">
            <a-form-item label="学校：">
                <span>
                    <a-input
                        type="text"
                        v-model="schoolName"
                        placeholder="学校简称/代码"
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
        <div class="FoodConsumeStructureStatistics_tab">
            <a-table
                :rowKey="row => row.id"
                :columns="columns"
                :data-source="data"
                :loading="loadShows"
                bordered
                :pagination="pagination"
                @change="handleTableChange"
                :scroll="scrollVal"
            >
            </a-table>
        </div>
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
        width: 150,
        fixed: "left",
        align: "center"
    },
    {
        title: "上年度伙食费实际支出",
        children: [
            {
                title: "总金额",
                dataIndex: "last_year_total_money",
                key: "last_year_total_money",
                width: 100,
                align: "center"
            },
            {
                title: "食材",
                children: [
                    {
                        title: "金额",
                        dataIndex: "last_year_food",
                        key: "last_year_food",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "%",
                        dataIndex: "last_year_food_ratio",
                        key: "last_year_food_ratio",
                        width: 100,
                        align: "center"
                    }
                ]
            },
            {
                title: "人工",
                children: [
                    {
                        title: "金额",
                        dataIndex: "last_year_human",
                        key: "last_year_human",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "%",
                        dataIndex: "last_year_human_ratio",
                        key: "last_year_human_ratio",
                        width: 100,
                        align: "center"
                    }
                ]
            },
            {
                title: "运行费及其它",
                children: [
                    {
                        title: "金额",
                        dataIndex: "last_year_other",
                        key: "last_year_other",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "%",
                        dataIndex: "last_year_other_ratio",
                        key: "last_year_other_ratio",
                        width: 100,
                        align: "center"
                    }
                ]
            }
        ]
    },
    {
        title: "本年度伙食计划支出%",
        children: [
            {
                title: "食材%",
                dataIndex: "this_year_plan_food_ratio",
                key: "this_year_plan_food_ratio",
                width: 100,
                align: "center"
            },
            {
                title: "人工%",
                dataIndex: "this_year_plan_human_ratio",
                key: "this_year_plan_human_ratio",
                width: 100,
                align: "center"
            },
            {
                title: "运行及其他%",
                dataIndex: "this_year_plan_other_ratio",
                key: "this_year_plan_other_ratio",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "本年度伙食费实际支出",
        children: [
            {
                title: "累计数",
                dataIndex: "this_year_total",
                key: "this_year_total",
                width: 100,
                align: "center"
            },
            {
                title: "食材",
                children: [
                    {
                        title: "年度累计数",
                        children: [
                            {
                                title: "金额",
                                dataIndex: "this_year_food",
                                key: "this_year_food",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "%",
                                dataIndex: "this_year_food_ratio",
                                key: "this_year_food_ratio",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "超支额",
                                dataIndex: "this_year_food_over",
                                key: "this_year_food_over",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "超支%",
                                dataIndex: "this_year_food_over_ratio",
                                key: "this_year_food_over_ratio",
                                width: 100,
                                align: "center"
                            }
                        ]
                    },
                    {
                        title: "本月数",
                        children: [
                            {
                                title: "金额",
                                dataIndex: "this_month_food",
                                key: "this_month_food",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "%",
                                dataIndex: "this_month_food_ratio",
                                key: "this_month_food_ratio",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "超支额",
                                dataIndex: "this_month_food_over",
                                key: "this_month_food_over",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "超支%",
                                dataIndex: "this_month_food_over_ratio",
                                key: "this_month_food_over_ratio",
                                width: 100,
                                align: "center"
                            }
                        ]
                    }
                ]
            },
            {
                title: "人工",
                children: [
                    {
                        title: "年度累计数",
                        children: [
                            {
                                title: "金额",
                                dataIndex: "this_year_human",
                                key: "this_year_human",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "%",
                                dataIndex: "this_year_human_ratio",
                                key: "this_year_human_ratio",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "超支额",
                                dataIndex: "this_year_human_over",
                                key: "this_year_human_over",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "超支%",
                                dataIndex: "this_year_human_over_ratio",
                                key: "this_year_human_over_ratio",
                                width: 100,
                                align: "center"
                            }
                        ]
                    },
                    {
                        title: "本月数",
                        children: [
                            {
                                title: "金额",
                                dataIndex: "this_month_human",
                                key: "this_month_human",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "%",
                                dataIndex: "this_month_human_ratio",
                                key: "this_month_human_ratio",
                                width: 100,
                                align: "center"
                            }
                        ]
                    }
                ]
            },
            {
                title: "运行费及其他",
                children: [
                    {
                        title: "年度累计数",
                        children: [
                            {
                                title: "金额",
                                dataIndex: "this_year_other",
                                key: "this_year_other",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "%",
                                dataIndex: "this_year_other_ratio",
                                key: "this_year_other_ratio",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "超支额",
                                dataIndex: "this_year_other_over",
                                key: "this_year_other_over",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "超支%",
                                dataIndex: "this_year_other_ratio_ratio",
                                key: "this_year_other_ratio_ratio",
                                width: 100,
                                align: "center"
                            }
                        ]
                    },
                    {
                        title: "本月数",
                        children: [
                            {
                                title: "金额",
                                dataIndex: "this_month_other",
                                key: "this_month_other",
                                width: 100,
                                align: "center"
                            },
                            {
                                title: "%",
                                dataIndex: "this_month_other_ratio",
                                key: "this_month_other_ratio",
                                width: 100,
                                align: "center"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
const data = [];
export default {
    data() {
        return {
            columns: [],
            data,
            columnsVal,
            loadShows:false,
            schoolName: "",
            scrollVal: {},
            mouthVal: "",
            sclType: [
                { name: "全部", val: "" },
                { name: "1月", val: "1" },
                { name: "2月", val: "2" },
                { name: "3月", val: "3" },
                { name: "4月", val: "4" },
                { name: "5月", val: "5" },
                { name: "6月", val: "6" },
                { name: "7月", val: "7" },
                { name: "8月", val: "8" },
                { name: "9月", val: "9" },
                { name: "10月", val: "10" },
                { name: "11月", val: "11" },
                { name: "12月", val: "12" }
            ],
            yearList: [],
            yearVal: "",
            status: true,
            semesterList: [],
            semesterId: "全部",
            semesterVal: "",
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
        this.getYear();
        this.getListVal(
            this.yearVal,
            this.semesterVal,
            this.mouthVal,
            this.schoolName
        );
    },
    methods: {
        // 学校简称搜索
        handleSubmit() {
            this.getListVal(
                this.yearVal,
                this.semesterVal,
                this.mouthVal,
                this.schoolName
            );
        },
        // 学校类型
        handleChange(value) {
            console.log(`Selected: ${value}`);
        },
        // 年份选择
        yearChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.yearVal = "";
                this.status = true;
                this.semesterId = "全部";
                this.semesterVal = "";
            } else {
                this.status = false;
                this.yearVal = e;
                this.getSemester(e);
            }
            this.getListVal(
                this.yearVal,
                this.semesterVal,
                this.mouthVal,
                this.schoolName
            );
        },
        // 学期选择
        semesterChange(e) {
            this.pagination.current = 1;
            let that = this;
            if (e == "全部") {
                this.semesterVal = "";
                this.semesterId = "全部";
            } else {
                this.semesterId = e;
                this.semesterList.forEach(item => {
                    if (item.id == e) {
                        that.semesterVal = item.semester;
                        return;
                    }
                });
            }
            this.getListVal(
                this.yearVal,
                this.semesterVal,
                this.mouthVal,
                this.schoolName
            );
        },
        // 月份选择
        handleChange(value) {
            this.getListVal(
                this.yearVal,
                this.semesterVal,
                this.mouthVal,
                this.schoolName
            );
        },
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
                    let arr = [
                        { semester: "全部", id: "全部", semester_text: "全部" }
                    ];
                    that.semesterList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 列表分页
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getListVal(
                this.yearVal,
                this.semesterVal,
                this.mouthVal,
                this.schoolName
            );
        },
        // 获取列表数据
        getListVal(year, semester, month, search_content) {
            let that = this;
            this.loadShows = true;
            let data = {
                url: "/school/expenditureAnalysis",
                method: "post",
                data: {
                    year: year,
                    semester: semester,
                    month: month,
                    search_content: search_content,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShows = false;
                if (res.data.code == 1) {
                    that.data = res.data.data.list;
                    if (res.data.data.list.length < 1) {
                        that.columns = [];
                        this.scrollVal = {};
                    } else {
                        that.columns = that.columnsVal;
                        that.scrollVal = { x: 1400 };
                    }
                    that.pagination.total = res.data.data.total_count;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#ExpenditureStructureAnalysis {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.ExpenditureStructureAnalysis_title{
    font-size: 20px;
    font-weight: bold;
}
.PurchasePlanAnalysis_title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
}
.PurchasePlanAnalysis_box {
    margin-top: 20px;
    display: flex;
    align-items: center;
}
.PurchasePlanAnalysis_box_item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
}
.FoodConsumeStructureStatistics_tab {
    margin-top: 50px;
}
</style>