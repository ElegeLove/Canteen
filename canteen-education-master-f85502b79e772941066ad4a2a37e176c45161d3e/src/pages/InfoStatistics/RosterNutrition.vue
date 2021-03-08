<template>
    <div id="RosterNutrition">
        <div class="RecipeQuery_box">
            <div class="RecipeQuery_box_item">
                <div>年份：</div>
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
        </div>
        <!-- 搜索框 -->
        <div class="RecipeQuery_box_item">
            <div>学校/村校：</div>
            <a-input
                type="text"
                style="width:240px;height:34px;"
                v-model="schoolName"
                placeholder="学校简称"
            />
            <div class="mx_btnbg" @click="handleSubmit">搜索</div>
        </div>
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :data-source="data"
            bordered
            :pagination="pagination"
            :loading="loadShows"
            @change="handleTableChange"
        >
            <template slot="operation" slot-scope="text, record">
                <div class="operate">
                    <div @click="enjoyRoster('1', record.id)">享受花名册</div>
                    <div @click="enjoyRoster('2', record.id)">未享受花名册</div>
                </div>
            </template>
        </a-table>
    </div>
</template>

<script>
const columns = [
    {
        title: "学校代码",
        dataIndex: "code",
        key: "code",
        width: "15%",
        align: "center"
    },
    {
        title: "学校简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: "20%",
        align: "center"
    },
    {
        title: "村校简称",
        dataIndex: "school_name",
        key: "school_name",
        width: "20%",
        align: "center"
    },
    {
        title: "学期",
        dataIndex: "semester",
        key: "semester",
        width: "20%",
        align: "center"
    },
    {
        title: "操作",
        key: "operation",
        width: "25%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [
];
export default {
    data() {
        return {
            yearList: [],
            years: "全部",
            yearVal: "",
            status: true,
            semesterList: [],
            semester: "全部",
            semesterVal: "",
            schoolName: "",
            loadShows: false,
            columns,
            data,
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
        this.getList(this.yearVal, this.semesterVal,this.schoolName);
    },
    methods: {
        // 学校简称搜索
        handleSubmit() {
            this.getList(this.yearVal, this.semesterVal,this.schoolName);
        },
        // 年份选择
        yearChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.yearVal = "";
                this.status = true;
            } else {
                this.status = false;
                this.yearVal = e;
                this.getSemester(e);
            }
            this.semester = "全部";
            this.semesterVal = "";
            this.getList(this.yearVal, this.semesterVal,this.schoolName);
        },
        // 学期选择
        semesterChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.semesterVal = "";
            } else {
                this.semesterVal = e;
            }
            this.getList(this.yearVal, this.semesterVal,this.schoolName);
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
            this.getList(this.yearVal, this.semesterVal,this.schoolName);
        },
        // 获取列表数据
        getList(year, semester,search ) {
            this.loadShows = true;
            let that = this;
            let data = {
                url: "/information/nutritionPlanPeople",
                method: "post",
                data: {
                    year: year,
                    semester: semester,
                    search_content: search,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShows = false;
                if (res.data.code == 1) {
                    that.pagination.total = res.data.data.total_count;
                    that.data = res.data.data.list;
                    // let arr = [{ semester: "全部", semester_text: "全部" }];
                    // that.semesterList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 享受、未享受花名册
        enjoyRoster(num, i) {
            let name = "";
            if (num == "1") {
                name = "EnjoyRoster";
            } else {
                name = "NoEnjoyRoster";
            }
            this.$router.push({
                path: name,
                query: {
                    id: i
                }
            });
        }
    }
};
</script>
<style scoped>
#RosterNutrition {
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
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.operate > div {
    margin-right: 30px;
    color: #02bb72;
    cursor: pointer;
}
.operate > div:last-child {
    margin: 0;
}
</style>