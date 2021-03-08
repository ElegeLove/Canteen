<template>
    <div id="ChargeManagement">
        <!-- 搜索框 -->
        <div class="RecipeQuery_box_item">
            <div>&emsp;&emsp;学校：</div>
            <a-input
                type="text"
                style="width:240px;height:34px;"
                v-model="schoolName"
                placeholder="学校简称"
            />
            <div class="mx_btnbg" @click="handleSubmit">搜索</div>
        </div>
        <div class="RecipeQuery_box">
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
                        {{ item.semester_text }}
                    </a-select-option>
                </a-select>
            </div>
            <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;月份：</div>
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
        title: "就餐天数（天）",
        dataIndex: "eat_day",
        key: "eat_day",
        width: 150,
        fixed: "left",
        align: "center"
    },
    {
        title: "伙食费标准（元）",
        children: [
            {
                title: "幼儿园（含附设）",
                children: [
                    {
                        title: "全天",
                        dataIndex: "child_total",
                        key: "child_total",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "早餐",
                        dataIndex: "child_breakfast",
                        key: "child_breakfast",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "午餐",
                        dataIndex: "child_lunch",
                        key: "child_lunch",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "晚餐",
                        dataIndex: "child_dinner",
                        key: "child_dinner",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "点心",
                        dataIndex: "child_snack",
                        key: "child_snack",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "几餐几点",
                        dataIndex: "point_eat",
                        key: "point_eat",
                        width: 100,
                        align: "center"
                    }
                ]
            },
            {
                title: "其他学段",
                children: [
                    {
                        title: "全天",
                        dataIndex: "other_total",
                        key: "other_total",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "早餐",
                        dataIndex: "other_breakfast",
                        key: "other_breakfast",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "午餐",
                        dataIndex: "other_lunch",
                        key: "other_lunch",
                        width: 100,
                        align: "center"
                    },
                    {
                        title: "晚餐",
                        dataIndex: "other_dinner",
                        key: "other_dinner",
                        width: 100,
                        align: "center"
                    }
                ]
            }
        ]
    },
    {
        title: "学生每天就餐情况",
        children: [
            {
                title: "全校就餐总人次",
                dataIndex: "student_total_count",
                key: "student_total_count",
                width: 150,
                align: "center"
            },
            {
                title: "早餐人次",
                dataIndex: "student_breakfast_count",
                key: "student_breakfast_count",
                width: 120,
                align: "center"
            },
            {
                title: "午餐人次",
                dataIndex: "student_lunch_count",
                key: "student_lunch_count",
                width: 120,
                align: "center"
            },
            {
                title: "晚餐人次",
                dataIndex: "student_dinner_count",
                key: "student_dinner_count",
                width: 120,
                align: "center"
            },
            {
                title: "点心人次",
                dataIndex: "student_cake_count",
                key: "student_cake_count",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "本月教职工（临时工）就餐情况",
        children: [
            {
                title: "总人次",
                children: [
                    {
                        title: "月人次",
                        dataIndex: "month_total_count",
                        key: "month_total_count",
                        width: 120,
                        align: "center"
                    },
                    {
                        title: "日平均人次",
                        dataIndex: "month_day_count",
                        key: "month_day_count",
                        width: 120,
                        align: "center"
                    }
                ]
            },
            {
                title: "早餐人次",
                children: [
                    {
                        title: "本月总日次",
                        dataIndex: "month_breakfast_total_count",
                        key: "month_breakfast_total_count",
                        width: 120,
                        align: "center"
                    },
                    {
                        title: "日平均人次",
                        dataIndex: "month_breakfast_day_count",
                        key: "month_breakfast_day_count",
                        width: 120,
                        align: "center"
                    }
                ]
            },
            {
                title: "午餐人次",
                children: [
                    {
                        title: "本月总日次",
                        dataIndex: "month_lunch_count",
                        key: "month_lunch_count",
                        width: 120,
                        align: "center"
                    },
                    {
                        title: "日平均人次",
                        dataIndex: "month_lunch_day_count",
                        key: "month_lunch_day_count",
                        width: 120,
                        align: "center"
                    }
                ]
            },
            {
                title: "晚餐人次",
                children: [
                    {
                        title: "本月总日次",
                        dataIndex: "month_dinner_count",
                        key: "month_dinner_count",
                        width: 120,
                        align: "center"
                    },
                    {
                        title: "日平均人次",
                        dataIndex: "month_dinner_day_count",
                        key: "month_dinner_day_count",
                        width: 120,
                        align: "center"
                    }
                ]
            },
            {
                title: "缴费额",
                children: [
                    {
                        title: "年度累计数",
                        dataIndex: "money",
                        key: "money",
                        width: 120,
                        align: "center"
                    },
                    {
                        title: "本月数",
                        dataIndex: "month_money",
                        key: "month_money",
                        width: 120,
                        align: "center"
                    }
                ]
            }
        ]
    }
];
const data = [
];
export default {
    data() {
        return {
            data,
            columns:[],
            columnsVal,
            schoolName: "",
            scrollVal:{},
            loadShows: false,
            status: true,
            yearList: [],
            years: "全部",
            yearVal: "",
            semesterList: [],
            semester: "全部",
            semesterVal: "",
            mouthVal: "",
            sclType: [
                { name: "全部",val:'' },
                { name: "1月",val:'1' },
                { name: "2月",val:'2' },
                { name: "3月",val:'3' },
                { name: "4月",val:'4' },
                { name: "5月",val:'5' },
                { name: "6月",val:'6' },
                { name: "7月",val:'7' },
                { name: "8月",val:'8' },
                { name: "9月",val:'9' },
                { name: "10月",val:'10' },
                { name: "11月",val:'11' },
                { name: "12月",val:'12' }
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
            }
        };
    },
    created () {
        this.getYear();
        this.getList(this.schoolName,this.yearVal,this.semesterVal,this.mouthVal);
    },
    methods: {
        // 学校简称搜索
        handleSubmit() {
            this.getList(this.schoolName,this.yearVal,this.semesterVal,this.mouthVal);
        },
        // 月份选择
        handleChange(value) {
            this.getList(this.schoolName,this.yearVal,this.semesterVal,this.mouthVal);
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
            this.getList(this.schoolName,this.yearVal,this.semesterVal,this.mouthVal);
        },
        // 学期选择
        semesterChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.semesterVal = "";
            } else {
                this.semesterVal = e;
            }
            this.getList(this.schoolName,this.yearVal,this.semesterVal,this.mouthVal);
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
                    let arr = [{ semester: "全部", semester_text: "全部" }];
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
            this.getList(this.schoolName,this.yearVal,this.semesterVal,this.mouthVal);
        },
        // 获取列表数据
        getList(search,year,semester,month){
            this.loadShows = true;
            let that = this;
            let data = {
                url: "/information/charge",
                method: "post",
                data: {
                    search_content: search,
                    year: year,
                    semester: semester,
                    month: month,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShows = false
                if (res.data.code == 1) {
                    that.pagination.total = res.data.data.total_count;
                    that.data = res.data.data.list;
                    if(res.data.data.list.length > 0){
                        that.columns=that.columnsVal;
                        that.scrollVal = { x: 1400 };
                    }else{
                        that.columns= [];
                        that.scrollVal = {};
                    }
                    // let arr = [{ semester: "全部", semester_text: "全部" }];
                    // that.semesterList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#ChargeManagement {
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
</style>