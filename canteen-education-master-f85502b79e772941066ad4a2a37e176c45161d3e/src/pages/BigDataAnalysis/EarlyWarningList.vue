<template>
    <div id="EarlyWarningList">
        <div class="bgff EarlyWarningList_main">
            <a-page-header title="预警列表" @back="goBack" />
            <div class="EarlyWarningList_main_box">
                <!-- 搜索框 -->
                <div class="RecipeQuery_box_item">
                    <div>学校：</div>
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
                        <div>类型：</div>
                        <a-select
                            style="width:240px;height:34px;"
                            @change="yearChange"
                            v-model="years"
                        >
                            <a-select-option
                                v-for="item in yearList"
                                :key="item.id"
                            >
                                {{ item.name }}
                            </a-select-option>
                        </a-select>
                    </div>
                    <div class="RecipeQuery_box_item">
                        <div>&emsp;&emsp;状态：</div>
                        <a-select
                            style="width:240px;height:34px;"
                            v-model="semester"
                            @change="semesterChange"
                        >
                            <a-select-option
                                v-for="item in semesterList"
                                :key="item.id"
                            >
                                {{ item.name }}
                            </a-select-option>
                        </a-select>
                    </div>
                </div>
                <a-table
                    :rowKey="row => row.id"
                    :columns="columns"
                    :data-source="data"
                    :loading="loadShow"
                    bordered
                    :pagination="pagination"
                    @change="handleTableChange"
                >
                    <template slot="operation" slot-scope="text, record">
                        <div
                            class="operate"
                            style="display:flex;justify-content:center;align-items: center;"
                        >
                            <div
                                @click="showList(record.id)"
                                v-if="
                                    !(
                                        record.type == 1 &&
                                        record.send_status == 1
                                    ) &&
                                        !(
                                            record.type == 5 &&
                                            record.send_status == 1
                                        ) &&
                                        !(
                                            record.type == 6 &&
                                            record.send_status == 1
                                        )
                                "
                            >
                                查看
                            </div>
                            <div
                                @click="budgetTable(record.id)"
                                v-if="record.send_status == 1"
                            >
                                提醒
                            </div>
                            <div v-if="record.send_status == 2">
                                已提醒
                            </div>
                        </div>
                    </template>
                </a-table>
            </div>
        </div>
    </div>
</template>

<script>
const columns = [
    {
        title: "预警学校",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: "15%",
        align: "center"
    },
    {
        title: "类型",
        dataIndex: "type_text",
        key: "type_text",
        width: "15%",
        align: "center"
    },
    {
        title: "预警事件",
        dataIndex: "content",
        key: "content",
        width: "30%",
        align: "center"
    },
    {
        title: "预警日期",
        dataIndex: "create_time",
        key: "create_time",
        width: "15%",
        align: "center"
    },
    {
        title: "处理状态",
        dataIndex: "status_text",
        key: "status_text",
        width: "10%",
        align: "center"
    },
    {
        title: "操作",
        key: "operation",
        width: "15%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [];
export default {
    data() {
        return {
            schoolName: "",
            yearList: [
                { id: "", name: "全部" },
                { id: "1", name: "食谱制作" },
                { id: "2", name: "食材保质期" },
                { id: "3", name: "入库处理" },
                { id: "4", name: "出库处理" },
                { id: "5", name: "信息公开上传" },
                { id: "6", name: "工作记录" },
                { id: "7", name: "学校证件" },
                { id: "8", name: "健康证" },
                { id: "9", name: "超支比例预警" }
            ],
            years: "",
            semesterList: [
                { id: "", name: "全部" },
                { id: "1", name: "未处理" },
                { id: "2", name: "已处理" }
            ],
            semester: "",
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
            }
        };
    },
    created() {
        this.getList(this.schoolName, this.years, this.semester);
    },
    methods: {
        // 返回上一级
        goBack() {
            localStorage.setItem("tabIndexs", "3");
            this.$router.go(-1);
        },
        // 搜索
        handleSubmit() {
            this.getList(this.schoolName, this.years, this.semester);
        },
        // 类型选择
        yearChange() {
            this.getList(this.schoolName, this.years, this.semester);
        },
        // 状态选择
        semesterChange() {
            this.getList(this.schoolName, this.years, this.semester);
        },
        // 列表分页
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getList(this.schoolName, this.years, this.semester);
        },
        getList(search_name, type, status) {
            let that = this;
            this.loadShow = true;
            let data = {
                url: "/index/warningList",
                method: "post",
                data: {
                    search_content: search_name,
                    type: type,
                    status: status,
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
        // 查看
        showList(i) {
            // console.log(i)
            this.$router.push({
                path: "EarlyWarningListInjfo",
                query: {
                    id: i
                }
            });
        },
        budgetTable(i) {
            // console.log(i)
            let that = this;
            let data = {
                url: "/index/sendMessage",
                method: "post",
                data: {
                    id: i
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.getList(that.schoolName, that.years, that.semester);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#EarlyWarningList {
    width: 100%;
    /* padding: 24px 0; */
    /* background: #ffffff; */
    box-sizing: border-box;
}
.bgff {
    background: #ffffff;
}
.EarlyWarningList_main {
    padding: 0px 0 30px;
}
.EarlyWarningList_main_box {
    width: 100%;
    padding: 30px 30px 0;
    box-sizing: border-box;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    border-top: 1px solid #eff1f5;
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
    margin-right: 30px;
    color: #02bb72;
    cursor: pointer;
}
.operate > div:last-child {
    margin-right: 0;
}
</style>