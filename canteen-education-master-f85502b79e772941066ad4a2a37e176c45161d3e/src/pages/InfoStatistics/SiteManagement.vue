<template>
    <div id="SiteManagement">
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
            :loading="loadShows"
            bordered
            :pagination="pagination"
            @change="handleTableChange"
            :scroll="scrollVal"
        >
            <template slot="operation" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="budgetTable(record.school_id)" v-if="record.have_son == 1">查看村校</div>
                    <!-- <div v-else>查看村校</div> -->
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
        title: "最多就餐学生数",
        dataIndex: "max_student",
        key: "max_student",
        width: 150,
        fixed: "left",
        align: "center"
    },
    {
        title: "最多就餐职工数",
        children: [
            {
                title: "总数",
                dataIndex: "max_total",
                key: "max_total",
                width: 120,
                align: "center"
            },
            {
                title: "正式职工",
                dataIndex: "max_worker_formal",
                key: "max_worker_formal",
                width: 120,
                align: "center"
            },
            {
                title: "临时用工",
                dataIndex: "max_worker_temporary",
                key: "max_worker_temporary",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "加工间面积",
        dataIndex: "processing_room_area",
        key: "processing_room_area",
        width: 120,
        align: "center"
    },
    {
        title: "库房",
        children: [
            {
                title: "间数",
                dataIndex: "storage_room_count",
                key: "storage_room_count",
                width: 120,
                align: "center"
            },
            {
                title: "总面积",
                dataIndex: "storage_room_area",
                key: "storage_room_area",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "学生餐厅",
        children: [
            {
                title: "面积",
                dataIndex: "student_room_count",
                key: "student_room_count",
                width: 120,
                align: "center"
            },
            {
                title: "座位数",
                dataIndex: "student_room_set",
                key: "student_room_set",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "其它用房",
        children: [
            {
                title: "间数",
                dataIndex: "other_room_count",
                key: "other_room_count",
                width: 120,
                align: "center"
            },
            {
                title: "总面积",
                dataIndex: "other_room_area",
                key: "other_room_area",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "教师餐厅",
        children: [
            {
                title: "面积",
                dataIndex: "teacher_room_count",
                key: "teacher_room_count",
                width: 120,
                align: "center"
            },
            {
                title: "座位数",
                dataIndex: "teacher_room_set",
                key: "teacher_room_set",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [];
export default {
    data() {
        return {
            data,
            columns: [],
            columnsVal,
            schoolName: "",
            scrollVal: {},
            visibleInfo: false,
            loadShows: false,
            status: true,
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
                url: "/information/place",
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
                    if (res.data.data.list.length > 0) {
                        that.columns = that.columnsVal;
                        that.scrollVal = { x: 1400 };
                    } else {
                        that.columns = [];
                        that.scrollVal = {};
                    }
                    // let arr = [{ semester: "全部", semester_text: "全部" }];
                    // that.semesterList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 查看村校
        budgetTable(i) {
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
                    path: "PlaceShowVillageSchool",
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
#SiteManagement {
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