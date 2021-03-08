<template>
    <div id="SystemConstruction">
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
        </div>
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :data-source="data"
            bordered
            :loading="loadShows"
            @change="handleTableChange"
            :pagination="pagination"
        >
            <template slot="status_text" slot-scope="text, record">
                <div class="operate">
                    <!-- <div
                        :class="
                            index == 0
                                ? 'reviewed'
                                : index == 2
                                ? 'failed'
                                : 'approved'
                        "
                    >
                        {{ text }}
                    </div> -->
                    <div
                        class="reviewed"
                        v-if="record.sort == 3 || record.sort == 4"
                    >
                        {{ text }}
                    </div>
                    <div class="failed" v-if="record.sort == 2">{{ text }}</div>
                    <div class="approved" v-if="record.sort == 1">
                        {{ text }}
                    </div>
                    <!-- <div @click="budgetTable(index)">查看</div> -->
                </div>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div class="operate">
                    <div @click="budgetTable(record.id)" v-if="record.sort != 3 && record.sort!= 4">查看</div>
                    <div
                        @click="budgetTable(record.id)"
                        v-if="record.sort == 3 || record.sort == 4"
                    >
                        审核
                    </div>
                    <div @click="exportData(record.id)">导出</div>
                    <div
                        @click="budgetShowTable(record.id)"
                        v-if="record.have_son == 1"
                    >
                        查看村校
                    </div>
                    <!-- @click="budgetTable(record.id)" -->
                    <div class="nullSchool" v-if="record.have_son == 2">
                        <a-popover>
                            <template slot="content">
                                <div class="schoolTips">暂无村校</div>
                            </template>
                            <div>
                                查看村校
                            </div>
                        </a-popover>
                    </div>
                </div>
            </template>
        </a-table>
        <a-modal
            v-model="visibleInfo"
            width="30%"
            title="选择村校"
            :centered="true"
            @ok="sureShow"
            cancelText="取 消"
            okText="确 认"
        >
            <div class="visibleInfo_box">
                <div>
                    <a-select
                        style="width:240px;height:34px;"
                        v-model="villageSchoolVal"
                    >
                        <a-select-option
                            v-for="item in villageSchoolList"
                            :key="item.id"
                        >
                            {{ item.abbreviation }}
                        </a-select-option>
                    </a-select>
                </div>
            </div>
        </a-modal>
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
        title: "审核状态",
        dataIndex: "status_text",
        key: "status_text",
        width: "20%",
        align: "center",
        scopedSlots: { customRender: "status_text" }
    },
    {
        title: "上传时间",
        dataIndex: "last_time",
        key: "last_time",
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
const data = [];
export default {
    data() {
        return {
            data,
            columns,
            schoolName: "",
            status: true,
            loadShows: false,
            yearList: [],
            years: "全部",
            yearVal: "",
            semesterList: [],
            semester: "全部",
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
            },
            visibleInfo: false,
            villageSchoolList: [],
            villageSchoolVal: ""
        };
    },
    created() {
        this.getYear();
        this.getList(this.schoolName, this.yearVal, this.semesterVal);
    },
    methods: {
        // 学校简称搜索
        handleSubmit() {
            // console.log(this.unitAbbreviation);
            this.getList(this.schoolName, this.yearVal, this.semesterVal);
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
            this.getList(this.schoolName, this.yearVal, this.semesterVal);
        },
        // 学期选择
        semesterChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.semesterVal = "";
            } else {
                this.semesterVal = e;
            }
            this.getList(this.schoolName, this.yearVal, this.semesterVal);
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
            this.getList(this.schoolName, this.yearVal, this.semesterVal);
        },
        // 获取列表数据
        getList(search, year, semester) {
            this.loadShows = true;
            let that = this;
            let data = {
                url: "/information/system",
                method: "post",
                data: {
                    search_content: search,
                    year: year,
                    semester: semester,
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
        // 查看
        budgetTable(i) {
            this.$router.push({
                path: "ConstructionInfo",
                query: {
                    id: i
                }
            });
        },
        // 导出
        exportData(id){
            let that = this;
            let data = {
                url: "/information/downloadZip",
                method: "post",
                data: {
                    school_id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    // that.villageSchoolList = res.data.data;
                    // that.villageSchoolVal = res.data.data[0].id;
                    if (res.data.data.url == "") {
                        that.$message.error("没有导出内容！");
                    } else {
                        // let a = document.createElement("a");
                        // a.href = res.data.data.url;
                        // a.download = fileName;
                        // a.click();
                        location.href = res.data.data.url;
                    }
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 查看村校
        budgetShowTable(i) {
            this.villageSchoolVal = "";
            this.getVillageSchool(i);
            this.visibleInfo = true;
        },
        // 确认选择
        sureShow() {
            if (this.villageSchoolVal == "") {
                this.$message.error("请选择村校");
            } else {
                this.visibleInfo = false;
                this.$router.push({
                    path: "ConstructionInfo",
                    query: {
                        id: this.villageSchoolVal
                    }
                });
            }
        },
        // 获取村校
        getVillageSchool(id) {
            let that = this;
            let data = {
                url: "/information/selectVillage",
                method: "post",
                data: {
                    school_id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.villageSchoolList = res.data.data;
                    that.villageSchoolVal = res.data.data[0].id;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#SystemConstruction {
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
.operate > .reviewed {
    color: rgb(184, 116, 26);
    margin: 0 !important;
}
.operate > .failed {
    color: rgb(217, 0, 27);
    margin: 0 !important;
}
.operate > .approved {
    color: rgb(51, 51, 51);
    margin: 0 !important;
}
.operate > .nullSchool {
    color: #cccccc;
}
.schoolTips{
    padding: 20px;
    box-sizing: border-box;
}
.visibleInfo_box > div {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>