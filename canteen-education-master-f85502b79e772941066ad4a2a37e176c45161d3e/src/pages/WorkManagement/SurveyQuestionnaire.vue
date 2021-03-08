<template>
    <div id="SurveyQuestionnaire">
        <div class="RecipeQuery_box_item">
            <div>问卷名称：</div>
            <a-input
                type="text"
                style="width:240px;height:34px;"
                v-model="questionnaireName"
                placeholder="输入问卷名称"
            />
            <div class="mx_btnbg" @click="handleSubmit">搜索</div>
        </div>
        <div class="BusinessTraining_top">
            <div class="RecipeQuery_box_item">
                <div>日期：</div>
                <div>
                    <a-date-picker
                        v-model="startValue"
                        :disabled-date="disabledStartDate"
                        show-time
                        format="YYYY-MM-DD"
                        placeholder="选择日期"
                        @openChange="handleStartOpenChange"
                        @ok="selStartTime"
                    />
                    -
                    <a-date-picker
                        v-model="endValue"
                        :disabled-date="disabledEndDate"
                        show-time
                        format="YYYY-MM-DD"
                        placeholder="选择日期"
                        :open="endOpen"
                        @openChange="handleEndOpenChange"
                        @ok="selEndTime"
                    />
                </div>
            </div>
            <div class="BusinessTraining_top_btn" @click="updata('新增')">
                新增
            </div>
        </div>
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :data-source="data"
            :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange
            }"
            bordered
            :loading="loadShow"
            :pagination="pagination"
            @change="handleTableChange"
        >
            <template slot="operation" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="showInfo(record.id)">查看</div>
                    <div @click="updata(record.id)">编辑</div>
                    <div @click="del(record.id)">删除</div>
                    <!-- <div @click="publicityTable(record)">导出带量公示表</div> -->
                </div>
            </template>
        </a-table>
    </div>
</template>

<script>
const columns = [
    {
        title: "问卷名称",
        dataIndex: "title",
        key: "title",
        width: "20%",
        align: "center"
    },
    {
        title: "问卷开始时间",
        dataIndex: "start_time",
        key: "start_time",
        width: "15%",
        align: "center"
    },
    {
        title: "问卷结束日期",
        dataIndex: "end_time",
        key: "end_time",
        width: "15%",
        align: "center"
    },
    {
        title: "填写描述",
        dataIndex: "requirement",
        key: "requirement",
        width: "15%",
        align: "center"
    },
    {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
        width: "15%",
        align: "center"
    },
    {
        title: "操作",
        key: "operation",
        width: "20%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [];
export default {
    data() {
        return {
            questionnaireName: "",
            startValue: null,
            endValue: null,
            endOpen: false,
            startTime: "",
            endTime: "",
            data,
            columns,
            loadShow: false,
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
            selectedRowKeys: []
        };
    },
    watch: {
        startValue(val) {
            if (this.startValue == null) {
                this.startTime = "";
                this.endTime = "";
                this.endValue = null;
                this.getList(this.questionnaireName, this.startTime, this.endTime);
            } else {
                this.startTime = this.$moment(val).format("YYYY-MM-DD");
            }
        },
        endValue(val) {
            if (this.endValue == null) {
                this.endTime = "";
                this.getList(this.questionnaireName, this.startTime, this.endTime);
            } else {
                this.endTime = this.$moment(val).format("YYYY-MM-DD");
            }
        }
    },
    created() {
        this.getList(this.questionnaireName, this.startTime, this.endTime);
    },
    methods: {
        // 问卷名称搜索
        handleSubmit() {
            this.getList(this.questionnaireName, this.startTime, this.endTime);
        },
        // 开始时间确认
        selStartTime() {
            this.getList(this.questionnaireName, this.startTime, this.endTime);
        },
        // 结束时间确认
        selEndTime() {
            this.getList(this.questionnaireName, this.startTime, this.endTime);
        },
        //日期选择
        disabledStartDate(startValue) {
            const endValue = this.endValue;
            if (!startValue || !endValue) {
                return false;
            }
            return startValue.valueOf() > endValue.valueOf();
        },
        disabledEndDate(endValue) {
            const startValue = this.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return startValue.valueOf() >= endValue.valueOf();
        },
        handleStartOpenChange(open) {
            if (!open) {
                this.endOpen = true;
            }
        },
        handleEndOpenChange(open) {
            this.endOpen = open;
        },
        // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            // this.getAllStudents()
            // this.getList(this.unitAbbreviation);
            this.getList(this.questionnaireName, this.startTime, this.endTime);
        },
        getList(search_name, startTime, endTime) {
            let that = this;
            this.loadShow = true;
            let data = {
                url: "/management/questionList",
                method: "post",
                data: {
                    title: search_name,
                    start_time: startTime,
                    end_time: endTime,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    that.data = res.data.data.list;
                    that.pagination.total = res.data.data.total_count;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 选择
        onSelectChange(selectedRowKeys) {
            console.log("selectedRowKeys changed: ", selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
        },
        // 查看
        showInfo(i) {
            this.$router.push({
                path: "SurveyQuestionnaireInfo",
                query: {
                    id: i
                }
            });
        },
        // 修改
        updata(i) {
            let id = "";
            if (i != "新增") {
                id = i;
            }
            this.$router.push({
                path: "SurveyQuestionnaireAdd",
                query: {
                    id: id
                }
            });
        },
        // 删除
        del(i) {
            let that = this;
            this.loadShow = true;
            let data = {
                url: "/management/delQuestion",
                method: "post",
                data: {
                    id: i
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.getList(that.questionnaireName, that.startTime, that.endTime);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#SurveyQuestionnaire {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
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
.BusinessTraining_top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.BusinessTraining_top_btn {
    width: 100px;
    height: 34px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #02bb72;
    color: #ffffff;
    margin-bottom: 20px;
    cursor: pointer;
}
.operate {
    width: 100%;
    display: flex;
    align-items: center;
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