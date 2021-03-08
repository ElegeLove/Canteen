<template>
    <div id="WeeksSetting">
        <a-page-header title="校历设置" @back="() => $router.go(-1)" />
        <div class="WeeksSetting_main">
            <a-table
                :rowKey="row => row.weeks"
                :columns="columns"
                :data-source="data"
                bordered
                :pagination="false"
                :loading="loadShow"
            >
                <template slot="timeSlot" slot-scope="text, record, index">
                    <!-- <div v-if="record.status"> -->
                    <a-range-picker
                        show-time
                         :disabledDate="disabledDate"
                        :default-value="[
                            record.start_time
                                ? $moment(record.start_time, dateFormat)
                                : '',
                            record.start_time
                                ? $moment(record.end_time, dateFormat)
                                : ''
                        ]"
                        format="YYYY-MM-DD"
                        @change="
                            (value, val1) => {
                                dataList[index].start_time = val1[0];
                                dataList[index].end_time = val1[1];
                            }
                        "
                        @ok="dataTime(record, index)"
                    />
                    <!-- </div> -->
                    <!-- <div
                        style="display:flex;justify-content:center;align-items: center;"
                        v-else
                    >
                        {{ record.start_time }}~{{ record.end_time }}
                    </div> -->
                </template>
                <template slot="month" slot-scope="text, record, index">
                    <div
                        style="display:flex;justify-content:center;align-items: center;"
                    >
                        <a-select
                            placeholder="请选择"
                            style="width:240px;height:34px;"
                            @change="
                                value => {
                                    dataList[index].month = value;
                                }
                            "
                            v-model="record.month"
                        >
                            <!-- @change="(value)=>{dataList[index].month = value}" -->
                            <!-- @select="(value)=>{record.month = value}" -->
                            <!-- @select="selData" -->
                            <a-select-option
                                v-for="item in sclType"
                                :key="item.name"
                                :value="item.name"
                            >
                                {{ item.name }}
                            </a-select-option>
                        </a-select>
                    </div>
                </template>
            </a-table>
            <div class="addWeek" @click="addWeeks">+ 新增周数</div>
            <div class="footer_btn" @click="conserveSub">保存</div>
        </div>
    </div>
</template>

<script>
const columns = [
    {
        title: "周数",
        dataIndex: "weeks",
        key: "weeks",
        width: "30%",
        align: "center"
    },
    {
        title: "时间段",
        dataIndex: "timeSlot",
        key: "timeSlot",
        width: "30%",
        align: "center",
        scopedSlots: { customRender: "timeSlot" }
    },
    {
        title: "选择对应月份",
        dataIndex: "month",
        key: "month",
        width: "40%",
        align: "center",
        scopedSlots: { customRender: "month" }
    }
];
const data = [];
export default {
    data() {
        return {
            data,
            columns,
            sclType: [
                { name: "1" },
                { name: "2" },
                { name: "3" },
                { name: "4" },
                { name: "5" },
                { name: "6" },
                { name: "7" },
                { name: "8" },
                { name: "9" },
                { name: "10" },
                { name: "11" },
                { name: "12" }
            ],
            weekId: "",
            loadShow: false,
            selVal: "",
            dataList: [],
            dateFormat: "YYYY-MM-DD",
            num: 0,
            startTime:'',
            endTime:'',
        };
    },
    created() {
        let id = this.$route.query.id;
        let startTime = this.$route.query.startTime;
        let endTime = this.$route.query.endTime;
        this.startTime = startTime;
        this.endTime = endTime;
        this.weekId = id;
        this.getWeekList(this.weekId);
    },
    methods: {
        // 获取周列表
        getWeekList(id) {
            let that = this;
            that.loadShow = true;
            let data = {
                url: "/school_calendar/getWeekList",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    that.data = res.data.data;
                    // let arr = [];
                    // if (res.data.data.length > 0) {
                    //     res.data.data.forEach(item => {
                    //         let obj = {
                    //             id: item.id,
                    //             month: item.month
                    //         };
                    //         arr.push(obj);
                    //     });
                    // }
                    that.dataList = res.data.data;
                    // that.pagination.total = res.data.data.count;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 添加周
        addWeeks() {
            // this.num = this.num + 1;
            let obj = {
                id: "",
                start_time: null,
                end_time: null,
                month: null,
                status: true,
                weeks: this.data.length + 1
            };
            this.data.push(obj);
            // this.dataList.push(obj);
        },
        onChange(dates, dateStrings) {
            console.log(dates);
            console.log(dateStrings);
            // console.log("From: ", dates[0], ", to: ", dates[1]);
            // console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
        },
        dataTime(val, i) {
            // console.log(this.dateTime);
            if (val.id == "") {
                let that = this;
                let data = {
                    url: "/school_calendar/addWeek",
                    method: "post",
                    data: {
                        id: this.weekId,
                        start_time: this.dataList[i].start_time,
                        end_time: this.dataList[i].end_time
                    }
                };
                this.$apiAxiox(data).then(res => {
                    if (res.data.code == 1) {
                        that.$message.success(res.data.msg);
                        that.getWeekList(that.weekId);
                        // setTimeout(() => {
                        //     that.$router.go(-1);
                        // }, 1000);
                    } else {
                        that.$message.error(res.data.msg);
                    }
                });
            }
        },
        //禁止选择的日期（未来日期不可选，半年之前的不可选）
			disabledDate(current){
				return this.$moment(current).valueOf() < this.$moment(this.startTime).valueOf() || this.$moment(current).valueOf() > this.$moment(this.endTime).valueOf()
			},
        // 保存
        conserveSub() {
            let that = this;
            let data = {
                url: "/school_calendar/setWeek",
                method: "post",
                data: {
                    content: JSON.stringify(this.dataList)
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    setTimeout(() => {
                        that.$router.go(-1);
                    }, 1000);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#WeeksSetting {
    width: 100%;
    background: #ffffff;
}
.WeeksSetting_main {
    width: 100%;
    padding: 24px;
    border-top: 1px solid #eff1f5;
    box-sizing: border-box;
}
.footer_btn {
    width: 140px;
    height: 40px;
    background: #02bb72;
    border: 1px solid #02bb72;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: #ffffff;
    margin: 0 auto;
    margin-top: 100px;
    cursor: pointer;
}
.addWeek {
    width: 140px;
    height: 42px;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
}
</style>