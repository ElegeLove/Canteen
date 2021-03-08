<template>
    <div id="LicenseManagement">
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
                        {{ item.semester_text }}
                    </a-select-option>
                </a-select>
            </div>
        </div> -->
        <a-table
            :rowKey="row => row.id"
            :loading="loadShows"
            :columns="columns"
            :data-source="data"
            bordered
            :scroll="scrollVal"
            :pagination="pagination"
            @change="handleTableChange"
        >
            <template
                style="display: flex;justify-content: space-around;"
                v-for="col in ['license_certificate', 'water_certificate']"
                :slot="col"
                slot-scope="text"
            >
                <div :key="col">
                    <viewer>
                        <img class="tabImg" :src="text" v-lazy='text' />
                    </viewer>
                </div>
                
            </template>
            <template slot="operation" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="budgetTable(record.school_id)" v-if="record.have_son == 1">查看村校</div>
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
        width: 150,
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
        title: "食堂",
        dataIndex: "name",
        key: "name",
        width: 150,
        align: "center"
    },
    {
        title: "食品经营许可证信息",
        children: [
            {
                title: "法定代表人",
                dataIndex: "legal_person",
                key: "legal_person",
                width: 150,
                align: "center"
            },
            {
                title: "许可证编号",
                dataIndex: "license_number",
                key: "license_number",
                width: 150,
                align: "center"
            },
            {
                title: "证件图片",
                dataIndex: "license_certificate",
                key: "license_certificate",
                width: 150,
                align: "center",
                scopedSlots: { customRender: "license_certificate" }
            },
            {
                title: "许可项目",
                dataIndex: "license_projects",
                key: "license_projects",
               width: 150,
                align: "center"
            },
            {
                title: "到期日期",
                dataIndex: "end_time",
                key: "end_time",
                width: 150,
                align: "center"
            },
        ]
    },
    {
        title: "生活饮用水",
        children: [
            {
                title: "供水方式",
                dataIndex: "water_supply_mode",
                key: "water_supply_mode",
                width: 150,
                align: "center"
            },
            {
                title: "水质检验报告扫描件",
                dataIndex: "water_certificate",
                key: "water_certificate",
                width: 150,
                align: "center",
                scopedSlots: { customRender: "water_certificate" }
            }
        ]
    },
    {
        title: "操作",
        key: "operation",
        width: 180,
        fixed: "right",
        align: "center",
        scopedSlots: { customRender: "operation" }
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
            scrollVal: {},
            schoolName: "",
            loadShows: false,
            status: true,
            yearList: [],
            years: "全部",
            yearVal: "",
            semesterList: [],
            semester: "全部",
            semesterVal: "",
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
            visibleInfo:false,
            villageSchoolList: [],
            villageSchoolVal: ""
        };
    },
    created () {
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
                url: "/information/permit",
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
        // // 查看村校
        // budgetTable(i) {
        //     this.$router.push({
        //         path: "PermitShowVillageSchool",
        //         query: {
        //             id: i
        //         }
        //     });
        // },
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
                    path: "PermitShowVillageSchool",
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
#LicenseManagement {
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
.tabImg{
    width: 110px;
    height: 40px;
    object-fit: contain;
}
.visibleInfo_box > div {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>