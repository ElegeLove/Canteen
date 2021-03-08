<template>
    <div id="BusinessReportEducation">
        <div class="RecipeQuery_title">
            学生营养改善计划实施情况（教委或教育局）月报
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
                    v-model="mouthVal"
                    style="width:240px;height:34px;"
                    @change="handleChange"
                >
                    <a-select-option v-for="item in sclType" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
        </div>
        <div class="BusinessReportEducation_tab">
            <a-table
                :rowKey="row => row.key"
                :columns="columns"
                :data-source="data"
                bordered
                :pagination="pagination"
                :loading="loadShow"
                @change="handleTableChange"
            >
                <template slot="status" slot-scope="text">
                    <div>{{text==1?'已填写':'未填写'}}</div>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <div class="operate">
                        <div
                            @click="enjoyRoster(record)"
                            v-if="record.status == 2"
                        >
                            填写
                        </div>
                        <div
                            @click="enjoyRoster(record)"
                            v-if="record.status !=2 && record.edit_status == 1"
                        >
                            编辑
                        </div>
                        <div @click="showInfo(record.id)" v-if="record.status !=2">
                            查看
                        </div>
                    </div>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script>
const columns = [
    {
        title: "年份",
        dataIndex: "year",
        key: "year",
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
        title: "月份",
        dataIndex: "month",
        key: "month",
        width: "20%",
        align: "center"
    },
    {
        title: "状态",
        dataIndex: "status",
        key: "status",
        width: "20%",
        align: "center",
        scopedSlots: { customRender: "status" }
    },
    {
        title: "操作",
        key: "operation",
        width: "20%",
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
            sclType: [
                { id: "", name: "全部" },
                { id: "1", name: "1月" },
                { id: "2", name: "2月" },
                { id: "3", name: "3月" },
                { id: "4", name: "4月" },
                { id: "5", name: "5月" },
                { id: "6", name: "6月" },
                { id: "7", name: "7月" },
                { id: "8", name: "8月" },
                { id: "9", name: "9月" },
                { id: "10", name: "10月" },
                { id: "11", name: "11月" },
                { id: "12", name: "12月" }
            ],
            mouthVal: "",
            loadShow: false,
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
        this.getList(this.yearVal, this.semesterVal,this.mouthVal);
    },
    methods: {
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
            this.getList(this.yearVal, this.semesterVal,this.mouthVal);
        },
        // 学期选择
        semesterChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.semesterVal = "";
            } else {
                this.semesterVal = e;
            }
            this.getList(this.yearVal, this.semesterVal,this.mouthVal);
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
        // 月份选择
        handleChange(e) {
            this.getList(this.yearVal, this.semesterVal,this.mouthVal);
        },
        // 列表分页
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getList(this.yearVal, this.semesterVal,this.mouthVal);
        },
        getList(year,semester,month){
            this.loadShow = true;
            let that = this;
            let data = {
                url: "/information/nutritionEduList",
                method: "post",
                data: {
                    year: year,
                    semester: semester,
                    month: month,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    that.pagination.total = res.data.data.total_count;
                    if(res.data.data.list.length > 0){
                        res.data.data.list.forEach((item,index)=>{
                            item.key = index;
                        })
                    }
                    that.data = res.data.data.list;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 填写、编辑
        enjoyRoster(val) {
            this.$router.push({
                path: 'BusinessReportEducationAdd',
                query: {
                    year: val.year,
                    semester: val.semester,
                    month: val.month,
                    id:val.id
                }
            });
        },
        // 查看
        showInfo(i) {
            this.$router.push({
                path: 'BusinessReportEducationInfo',
                query: {
                    id: i
                }
            });
        }
    }
};
</script>

<style scoped>
#BusinessReportEducation {
    width: 100%;
    padding: 24px 0;
    background: #ffffff;
    box-sizing: border-box;
}
.RecipeQuery_title {
    width: 580px;
    height: 50px;
    background: #02bc72;
    border-radius: 0px 30px 30px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #ffffff;
}
.RecipeQuery_box {
    width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /* border-bottom: 1px solid #f0f2f5; */
}
.RecipeQuery_box_item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
}
.BusinessReportEducation_tab {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
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