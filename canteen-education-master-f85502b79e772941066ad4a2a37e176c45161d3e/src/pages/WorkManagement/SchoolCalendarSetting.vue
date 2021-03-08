<template>
    <div id="SchoolCalendarSetting">
        <div class="RecipeQuery_box_item">
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
        <a-table
            :rowKey="row=>row.id"
            :columns="columns"
            :data-source="data"
            bordered
            :loading="loadShow"
            :pagination="pagination"
            @change="handleTableChange"
        >
            <template
                v-for="col in ['open_time', 'close_time']"
                :slot="col"
                slot-scope="text"
            >
                <div :key="col">
                    {{ text == "" ? "未设置" : text }}
                </div>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div v-if="record.open_time == ''" @click="setDate(record)">
                        设置
                    </div>
                    <div v-if="record.open_time != ''" @click="setDate(record)">
                        编辑
                    </div>
                    <div @click="setWeeks(record)" v-if="record.open_time != ''">周数设置</div>
                </div>
            </template>
        </a-table>
        <a-modal
            v-model="visible"
            width="30%"
            :title="modelTitle"
            cancelText="取消"
            okText="确 定"
            :closable="false"
            :centered="true"
            @ok="handleOk"
        >
            <div>
                <div class="tipsMain" v-if="isSet">
                    <a-icon class="tipsMain_icon" type="exclamation-circle" />
                    <div>设置后将不可重新编辑，请谨慎设置</div>
                </div>
                <div class="RecipeQuery_box_item">
                    <div>开学日期：</div>
                    <div>
                        <a-date-picker
                            v-model="startValue"
                            :disabled-date="disabledStartDate"
                            valueFormat="YYYY-MM-DD"
                            placeholder="选择日期"
                            @openChange="handleStartOpenChange"
                        />
                        <!-- valueFormat="YYYY-MM-DD" -->
                        <!-- show-time
                            format="YYYY-MM-DD" -->
                    </div>
                </div>
                <div class="RecipeQuery_box_item">
                    <div>结课日期：</div>
                    <div>
                        <a-date-picker
                            v-model="endValue"
                            :disabled-date="disabledEndDate"
                            valueFormat="YYYY-MM-DD"
                            placeholder="选择日期"
                            :open="endOpen"
                            @openChange="handleEndOpenChange"
                        />
                    </div>
                </div>
            </div>
        </a-modal>
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
        title: "开学日期",
        dataIndex: "open_time",
        key: "open_time",
        width: "20%",
        align: "center",
        scopedSlots: { customRender: "open_time" }
    },
    {
        title: "结课日期",
        dataIndex: "close_time",
        key: "close_time",
        width: "20%",
        align: "center",
        scopedSlots: { customRender: "close_time" }
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
            data,
            columns,
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
            visible: false,
            modelTitle: "",
            dateVal: {},
            startValue: null,
            endValue: null,
            endOpen: false,
            loadShow: false,
            yearList: [],
            yearVal: "",
            calendarId: "",
            isSet:false
        };
    },
    watch: {
        startValue(val) {
            console.log("startValue", val);
        },
        endValue(val) {
            console.log("endValue", val);
        }
    },
    created() {
        this.getYear();
        this.getCalendarList(this.yearVal);
    },
    methods: {
        // 年份选择
        yearChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.yearVal = "";
            } else {
                this.yearVal = e;
            }
            this.getCalendarList(this.yearVal);
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
        // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getCalendarList(this.yearVal);
        },
        // 获取校历列表
        getCalendarList(year) {
            let that = this;
            that.loadShow = true;
            let data = {
                url: "/school_calendar/schoolCalendarList",
                method: "post",
                data: {
                    year: year,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    that.data = res.data.data.list;
                    that.pagination.total = res.data.data.count;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 校历设置
        calendarSet(id, openTime, closeTime) {
            let that = this;
            that.loadShow = true;
            let data = {
                url: "/school_calendar/updateDate",
                method: "post",
                data: {
                    id: id,
                    open_time: openTime,
                    close_time: closeTime
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.getCalendarList(that.yearVal);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 编辑、设置
        setDate(val) {
            if (val.open_time == "") {
                this.modelTitle = "设置";
                this.startValue = null;
                this.endValue = null;
                this.isSet = true;
            } else {
                this.modelTitle = "编辑";
                this.startValue = val.open_time;
                this.endValue = val.close_time;
                this.isSet = false;
            }
            this.visible = true;
            this.calendarId = val.id;
        },
        //日期选择
        disabledStartDate(startValue) {
            const endValue = this.$moment(this.endValue);
            // const endValue = this.endValue;
            if (!startValue || !endValue) {
                return false;
            }
            return startValue.valueOf() > endValue.valueOf();
        },
        disabledEndDate(endValue) {
            const startValue = this.$moment(this.startValue);
            // const startValue = this.startValue;
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
        // 关闭弹窗
        handleOk() {
            if(this.startValue == null){
                this.$message.error('请选择开学日期');
                return false;
            }
            if(this.endValue == null){
                 this.$message.error('请选择结课日期');
                return false;
            }
            this.calendarSet(this.calendarId, this.startValue, this.endValue);
            this.visible = false;
        },
        // 周数设置
        setWeeks(val) {
            this.$router.push({
                path: "WeeksSetting",
                query: {
                    id: val.id,
                    startTime:val.open_time,
                    endTime:val.close_time,
                }
            });
        }
    }
};
</script>

<style scoped>
#SchoolCalendarSetting {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
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
    margin: 0;
}
.tipsMain{
    background: rgb(255, 251, 230);
    padding: 10px 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border: 1px solid rgb(255, 229, 143);
    border-radius: 4px;
    margin-bottom: 40px;
}
.tipsMain_icon{
    background: rgb(250, 173, 20);
    border-radius: 50%;
    color: rgb(250, 255, 255);
    margin-right: 10px;
    }
</style>