<template>
    <div id="RecipeQuery">
        <div class="RecipeQuery_title">
            学校食堂周带量食谱查询（{{ dataVal.year }}年{{
                dataVal.semester
            }}第{{ dataVal.week }}周）
        </div>
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
                <div>学校类别：</div>
                <a-select
                    placeholder="请选择"
                    style="width:240px;height:34px;"
                    default-value="全部"
                    @change="shoolTypeChange"
                >
                    <a-select-option
                        v-for="item in shoolTypeList"
                        :key="item.id"
                    >
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
            <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;年份：</div>
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
            <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;学期：</div>
                <a-select
                    style="width:240px;height:34px;"
                    :disabled="status"
                    v-model="semesterId"
                    @change="semesterChange"
                >
                    <a-select-option
                        v-for="item in semesterList"
                        :key="item.id"
                    >
                        {{ item.semester_text }}
                    </a-select-option>
                </a-select>
            </div>
            <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;&emsp;周：</div>
                <a-select
                    style="width:240px;height:34px;"
                    :disabled="weekStatus"
                    v-model="weekId"
                    @change="weekChange"
                >
                    <a-select-option v-for="item in weekList" :key="item.id">
                        {{ item.weeks }}
                    </a-select-option>
                </a-select>
            </div>
            <!-- <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;日期：</div>
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
            </div> -->
        </div>
        <a-table
            :rowKey="row => row.school_id"
            :columns="columns"
            :data-source="data"
            bordered
            :loading="loadShow"
            :pagination="pagination"
            :scroll="scrollVal"
            @change="handleTableChange"
        >
            <template
                v-for="col1 in ['oneMorning', 'oneMiddle', 'oneNight']"
                :slot="col1"
                slot-scope="text, record"
            >
                <div :key="col1">
                    <a-icon
                        class="eyeshow"
                        v-if="text && text != ''"
                        type="eye"
                        @click="publicityForm(record.school_id, text, '1')"
                    />
                    <div v-else>--</div>
                </div>
            </template>
            <template
                v-for="col2 in ['twoMorning', 'twoMiddle', 'twoNight']"
                :slot="col2"
                slot-scope="text, record"
            >
                <div :key="col2">
                    <a-icon
                        class="eyeshow"
                        v-if="text && text != ''"
                        type="eye"
                        @click="publicityForm(record.school_id, text, '2')"
                    />
                    <div v-else>--</div>
                </div>
            </template>
            <template
                v-for="col3 in ['threeMorning', 'threeMiddle', 'threeNight']"
                :slot="col3"
                slot-scope="text, record"
            >
                <div :key="col3">
                    <a-icon
                        class="eyeshow"
                        v-if="text && text != ''"
                        type="eye"
                        @click="publicityForm(record.school_id, text, '3')"
                    />
                    <div v-else>--</div>
                </div>
            </template>
            <template
                v-for="col4 in ['fourMorning', 'fourMiddle', 'fourNight']"
                :slot="col4"
                slot-scope="text, record"
            >
                <div :key="col4">
                    <a-icon
                        class="eyeshow"
                        v-if="text && text != ''"
                        type="eye"
                        @click="publicityForm(record.school_id, text, '4')"
                    />
                    <div v-else>--</div>
                </div>
            </template>
            <template
                v-for="col5 in ['fiveMorning', 'fiveMiddle', 'fiveNight']"
                :slot="col5"
                slot-scope="text, record"
            >
                <div :key="col5">
                    <a-icon
                        class="eyeshow"
                        v-if="text && text != ''"
                        type="eye"
                        @click="publicityForm(record.school_id, text, '5')"
                    />
                    <div v-else>--</div>
                </div>
            </template>
            <template
                v-for="col6 in ['sixMorning', 'sixMiddle', 'sixNight']"
                :slot="col6"
                slot-scope="text, record"
            >
                <div :key="col6">
                    <a-icon
                        class="eyeshow"
                        v-if="text && text != ''"
                        type="eye"
                        @click="publicityForm(record.school_id, text, '6')"
                    />
                    <div v-else>--</div>
                </div>
            </template>
            <template
                v-for="col7 in ['sevenMorning', 'sevenMiddle', 'sevenNight']"
                :slot="col7"
                slot-scope="text, record"
            >
                <div :key="col7">
                    <a-icon
                        class="eyeshow"
                        v-if="text && text != ''"
                        type="eye"
                        @click="publicityForm(record.school_id, text, '7')"
                    />
                    <div v-else>--</div>
                </div>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="budgetTable(record)">预算表</div>
                    <!-- <div @click="publicityTable(record)">导出带量公示表</div> -->
                </div>
            </template>
        </a-table>
        <a-modal
            v-model="visible"
            width="50%"
            title="带量公示表"
            :centered="true"
        >
            <div class="model_main_box">
                <div class="model_top">
                    <div class="model_top_main">
                        <div class="model_top_title">选择餐次：</div>
                        <div class="model_top_main_textSel">
                            <div @click="clickLeft" class="clickBtn">
                                &lsaquo;
                            </div>
                            <!-- <div @click="clickLeft"><img src="../../assets/image/icon_model_left.png" alt=""></div> -->
                            <div class="model_top_main_text">
                                {{ publicityData.type_name }}
                            </div>
                            <div @click="clickRight" class="clickBtn">
                                &rsaquo;
                            </div>
                            <!-- <div @click="clickRight"><img src="../../assets/image/icon_model_right.png" alt=""></div> -->
                        </div>
                    </div>
                    <div class="model_top_main">
                        <div class="model_top_title">选择星期：</div>
                        <div class="model_top_main_textSel">
                            <div @click="clickLefts" class="clickBtn">
                                &lsaquo;
                            </div>
                            <!-- <div @click="clickLefts"><img src="../../assets/image/icon_model_sel_left.png" alt=""></div> -->
                            <div class="model_top_main_text">
                                {{ publicityData.week_name }}
                            </div>
                            <div @click="clickRights" class="clickBtn">
                                &rsaquo;
                            </div>
                            <!-- <div @click="clickRights"><img src="../../assets/image/icon_model_sel_right.png" alt=""></div> -->
                        </div>
                    </div>
                    <!-- <span>星期一</span>
                    <span>早餐</span> -->
                </div>
                <div
                    class="model_main"
                    v-for="(modelItrm, index) in publicityData.list"
                    :key="index"
                >
                    <div class="model_main_title">【{{ modelItrm.name }}】</div>
                    <div class="model_main_man">主要食材：</div>
                    <div class="model_main_man_item">
                        <div
                            v-for="(modelItrmChild, i2) in modelItrm.ingredient"
                            :key="i2"
                        >
                            <div>{{ modelItrmChild.name }}</div>
                            <div>
                                {{ modelItrmChild.budget
                                }}{{ modelItrmChild.unit }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template slot="footer">
                <div class="model_footer">
                    <a-button
                        key="submit"
                        class="model_footer_btn"
                        @click="handleOk"
                    >
                        关闭
                    </a-button>
                </div>
            </template>
        </a-modal>
        <a-modal
            v-model="visibles"
            width="70%"
            title="食材用量预算表"
            :centered="true"
        >
            <div class="models_main">
                <div class="model_top">
                    <div class="model_top_main">第{{ budgetVal.weeks }}周</div>
                    <div class="model_top_main">
                        <div class="model_top_main_textSel">
                            <div @click="clickLeftmols" class="clickBtn">
                                &lsaquo;
                            </div>
                            <!-- <div @click="clickLefts"><img src="../../assets/image/icon_model_sel_left.png" alt=""></div> -->
                            <div class="model_top_main_text">
                                {{ budgetVal.week_text }}
                            </div>
                            <div @click="clickRighttmols" class="clickBtn">
                                &rsaquo;
                            </div>
                            <!-- <div @click="clickRights"><img src="../../assets/image/icon_model_sel_right.png" alt=""></div> -->
                        </div>
                    </div>
                    <div class="model_top_main">
                        <div class="model_top_main_textSel">
                            <div @click="clickLeftmol" class="clickBtn">
                                &lsaquo;
                            </div>
                            <!-- <div @click="clickLeft"><img src="../../assets/image/icon_model_left.png" alt=""></div> -->
                            <div class="model_top_main_text">
                                {{ budgetVal.type_name }}
                            </div>
                            <div @click="clickRightmol" class="clickBtn">
                                &rsaquo;
                            </div>
                            <!-- <div @click="clickRight"><img src="../../assets/image/icon_model_right.png" alt=""></div> -->
                        </div>
                    </div>
                </div>
                <div class="model_tmenu">
                    <div>
                        <span>全校就餐人数：</span
                        ><span class="colGree">{{
                            budgetVal.info.dinner_count
                        }}</span>
                    </div>
                    <div>
                        <span>全校金额合计：</span
                        ><span class="colRed">{{
                            budgetVal.info.school_total
                        }}</span>
                    </div>
                    <div>
                        <span>人均伙食费标准：</span
                        ><span class="colRed">{{
                            budgetVal.info.per_person_avg
                        }}</span>
                    </div>
                    <div>
                        <span>每人金额合计：</span
                        ><span class="colRed">{{
                            budgetVal.info.per_person_total
                        }}</span>
                    </div>
                </div>
                <div
                    class="model_main model_main_tab"
                    v-for="i2 in budgetVal.menu"
                    :key="i2.id"
                >
                    <div class="model_main_title">【{{ i2.name }}】</div>
                    <a-table
                        :rowKey="row => row.id"
                        :columns="modelColumns"
                        bordered
                        :data-source="i2.food_list"
                        :pagination="false"
                    >
                        <!-- :data-source="modelData" -->
                        <template
                            slot="serialNum"
                            slot-scope="text, record, index"
                        >
                            <div>
                                {{ index + 1 }}
                            </div>
                        </template>
                        <template slot="footer">
                            <div class="tab_footer">
                                <span>小计：每人每餐用量金额</span>
                                <span class="colRed marler">{{
                                    i2.per_person_total
                                }}</span>
                                <span>全校每餐用量金额</span>
                                <span class="colRed marler">{{
                                    i2.school_total
                                }}</span>
                            </div>
                        </template>
                    </a-table>
                </div>
            </div>
            <template slot="footer">
                <div class="models_footer">
                    <a-button class="model_footer_btn" @click="exportData">
                        导出
                    </a-button>
                    <a-button class="model_footer_btn" @click="handlesOk">
                        关闭
                    </a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script>
const columns = [
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
        title: "星期一",
        children: [
            {
                title: "早",
                dataIndex: "oneMorning",
                key: "oneMorning",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "oneMorning" }
            },
            {
                title: "中",
                dataIndex: "oneMiddle",
                key: "oneMiddle",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "oneMiddle" }
            },
            {
                title: "晚",
                dataIndex: "oneNight",
                key: "oneNight",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "oneNight" }
            }
        ]
    },
    {
        title: "星期二",
        children: [
            {
                title: "早",
                dataIndex: "twoMorning",
                key: "twoMorning",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "twoMorning" }
            },
            {
                title: "中",
                dataIndex: "twoMiddle",
                key: "twoMiddle",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "twoMiddle" }
            },
            {
                title: "晚",
                dataIndex: "twoNight",
                key: "twoNight",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "twoNight" }
            }
        ]
    },
    {
        title: "星期三",
        children: [
            {
                title: "早",
                dataIndex: "threeMorning",
                key: "threeMorning",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "threeMorning" }
            },
            {
                title: "中",
                dataIndex: "threeMiddle",
                key: "threeMiddle",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "threeMiddle" }
            },
            {
                title: "晚",
                dataIndex: "threeNight",
                key: "threeNight",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "threeNight" }
            }
        ]
    },
    {
        title: "星期四",
        children: [
            {
                title: "早",
                dataIndex: "fourMorning",
                key: "fourMorning",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "fourMorning" }
            },
            {
                title: "中",
                dataIndex: "fourMiddle",
                key: "fourMiddle",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "fourMiddle" }
            },
            {
                title: "晚",
                dataIndex: "fourNight",
                key: "fourNight",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "fourNight" }
            }
        ]
    },
    {
        title: "星期五",
        children: [
            {
                title: "早",
                dataIndex: "fiveMorning",
                key: "fiveMorning",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "fiveMorning" }
            },
            {
                title: "中",
                dataIndex: "fiveMiddle",
                key: "fiveMiddle",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "fiveMiddle" }
            },
            {
                title: "晚",
                dataIndex: "fiveNight",
                key: "fiveNight",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "fiveNight" }
            }
        ]
    },
    {
        title: "星期六",
        children: [
            {
                title: "早",
                dataIndex: "sixMorning",
                key: "sixMorning",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "sixMorning" }
            },
            {
                title: "中",
                dataIndex: "sixMiddle",
                key: "sixMiddle",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "sixMiddle" }
            },
            {
                title: "晚",
                dataIndex: "sixNight",
                key: "sixNight",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "sixNight" }
            }
        ]
    },
    {
        title: "星期天",
        children: [
            {
                title: "早",
                dataIndex: "sevenMorning",
                key: "sevenMorning",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "sevenMorning" }
            },
            {
                title: "中",
                dataIndex: "sevenMiddle",
                key: "sevenMiddle",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "sevenMiddle" }
            },
            {
                title: "晚",
                dataIndex: "sevenNight",
                key: "sevenNight",
                width: 100,
                align: "center",
                scopedSlots: { customRender: "sevenNight" }
            }
        ]
    },
    {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 240,
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [
    // {
    //     key: "1",
    //     schoolCode: "0031",
    //     name: "某某学校全称"
    // },
];
const modelColumns = [
    {
        title: "每人每餐用量",
        children: [
            {
                title: "序号",
                dataIndex: "serialNum",
                key: "serialNum",
                width: "3%",
                align: "center",
                scopedSlots: { customRender: "serialNum" }
            },
            {
                title: "原材料",
                dataIndex: "name",
                key: "name",
                width: "3%",
                align: "center"
            },
            {
                title: "计量单位",
                dataIndex: "unit",
                key: "unit",
                width: "3%",
                align: "center"
            },
            {
                title: "用量",
                dataIndex: "dosage",
                key: "dosage",
                width: "3%",
                align: "center"
            },
            {
                title: "单价",
                dataIndex: "unit_price",
                key: "unit_price",
                width: "3%",
                align: "center"
            },
            {
                title: "金额（元）",
                dataIndex: "price",
                key: "price",
                width: "3%",
                align: "center"
            }
        ]
    },
    {
        title: "全校每餐用量",
        children: [
            {
                title: "计量单位",
                dataIndex: "school_unit",
                key: "school_unit",
                width: "3%",
                align: "center"
            },
            {
                title: "用量",
                dataIndex: "school_dosage",
                key: "school_dosage",
                width: "3%",
                align: "center"
            },
            {
                title: "金额（元）",
                dataIndex: "school_price",
                key: "school_price",
                width: "3%",
                align: "center"
            }
        ]
    }
];
const modelData = [];
export default {
    data() {
        return {
            data,
            columns,
            loadShow: false,
            modelColumns,
            modelData,
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
            scrollVal:{ x: 1400 },
            schoolName: "",
            sclType: [
                { name: "全部" },
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
            startValue: null,
            startTime: "",
            endValue: null,
            endTime: "",
            endOpen: false,
            visible: false,
            visibles: false,
            status: true,
            weekStatus: true,
            publicityData: {},
            budgetVal: {
                info: {
                    dinner_count: "",
                    per_person_avg: "",
                    per_person_total: "",
                    school_total: ""
                }
            },
            schoolId: "",
            type: -1,
            weekNum: -1,
            types: 0,
            weekNums: 1,
            yearList: [],
            yearVal: "",
            semesterList: [],
            semesterId: "全部",
            semesterVal: "",
            weekList: [],
            weekId: "",
            weekVal: "",
            shoolTypeList: "",
            shoolTypeId: "",
            weekIds: "",
            schoolIds: "",
            dataVal: {
                year: "",
                week: "",
                semester: ""
            }
        };
    },
    watch: {
        startValue(val) {
            if (this.startValue == null) {
                this.startTime = "";
                this.endTime = "";
                this.endValue = null;
                this.getListVal(
                    this.schoolName,
                    this.shoolTypeId,
                    this.yearVal,
                    this.weekVal,
                    this.semesterVal,
                    this.startTime,
                    this.endTime
                );
            } else {
                this.startTime = this.$moment(val).format("YYYY-MM-DD");
            }
        },
        endValue(val) {
            if (this.endValue == null) {
                this.endTime = "";
                this.getListVal(
                    this.schoolName,
                    this.shoolTypeId,
                    this.yearVal,
                    this.weekVal,
                    this.semesterVal,
                    this.startTime,
                    this.endTime
                );
            } else {
                this.endTime = this.$moment(val).format("YYYY-MM-DD");
            }
        }
    },
    created() {
        this.getListVal();
        this.getYear();
        this.getShoolType();
    },
    methods: {
        // 学校类型选择
        shoolTypeChange(e) {
            if (e == "全部") {
                this.shoolTypeId = "";
            } else {
                this.shoolTypeId = e;
            }
            this.getListVal(
                this.schoolName,
                this.shoolTypeId,
                this.yearVal,
                this.weekVal,
                this.semesterVal,
                this.startTime,
                this.endTime
            );
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
            this.weekStatus = true;
            this.semesterId = "全部";
                this.semesterVal = "";
                this.weekId = this.dataVal.week;
                this.weekVal = "";
            this.getListVal(
                this.schoolName,
                this.shoolTypeId,
                this.yearVal,
                this.weekVal,
                this.semesterVal,
                this.startTime,
                this.endTime
            );
        },
        // 学期选择
        semesterChange(e) {
            this.pagination.current = 1;
            let that = this;
            if (e == "全部") {
                this.semesterVal = "";
                this.semesterId = "全部";
                this.weekStatus = true;
            } else {
                this.semesterId = e;
                this.semesterList.forEach(item => {
                    if (item.id == e) {
                        that.semesterVal = item.semester;
                        return;
                    }
                });
                this.weekStatus = false;
                this.getWeek(e);
            }
            this.weekId = this.dataVal.week;
                this.weekVal = "";
            this.getListVal(
                this.schoolName,
                this.shoolTypeId,
                this.yearVal,
                this.weekVal,
                this.semesterVal,
                this.startTime,
                this.endTime
            );
        },
        // 周选择
        weekChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.weekVal = "";
                this.weekId = "";
            } else {
                this.weekVal = e;
            }
            this.getListVal(
                this.schoolName,
                this.shoolTypeId,
                this.yearVal,
                this.weekVal,
                this.semesterVal,
                this.startTime,
                this.endTime
            );
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
                    let arr = [{ semester: "全部", id: "全部",semester_text:'全部' }];
                    that.semesterList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 获取周
        getWeek(id) {
            let that = this;
            let data = {
                url: "/common/selectWeek",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    let arr = [];
                    // let arr = [{ weeks: "全部", id: "全部" }];
                    that.weekList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 学校简称搜索
        handleSubmit() {
            this.getListVal(
                this.schoolName,
                this.shoolTypeId,
                this.yearVal,
                this.weekVal,
                this.semesterVal,
                this.startTime,
                this.endTime
            );
        },
        // 开始时间确认
        selStartTime() {
            this.getListVal(
                this.schoolName,
                this.shoolTypeId,
                this.yearVal,
                this.weekVal,
                this.semesterVal,
                this.startTime,
                this.endTime
            );
        },
        // 结束时间确认
        selEndTime() {
            this.getListVal(
                this.schoolName,
                this.shoolTypeId,
                this.yearVal,
                this.weekVal,
                this.semesterVal,
                this.startTime,
                this.endTime
            );
        },
        // 获取学校类型
        getShoolType() {
            let that = this;
            let data = {
                url: "/school/schoolType",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    let arr = [{ name: "全部", id: "全部" }];
                    that.shoolTypeList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
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
            this.getListVal(
                this.schoolName,
                this.shoolTypeId,
                this.yearVal,
                this.weekVal,
                this.semesterVal,
                this.startTime,
                this.endTime
            );
        },
        // 获取列表数据
        getListVal(
            schoolName,
            schoolType,
            year,
            weekId,
            semester,
            startTime,
            endTime
        ) {
            let that = this;
            this.loadShow = true;
            let data = {
                url: "/recipes/recipes",
                method: "post",
                data: {
                    abbreviation: schoolName,
                    school_type: schoolType,
                    year: year,
                    week_id: weekId,
                    semester: semester,
                    start_time: startTime,
                    end_time: endTime,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    res.data.data.list.forEach(item => {
                        item.key = item.id;
                        item.oneMorning = that.breakData(item.week1, "0");
                        item.oneMiddle = that.breakData(item.week1, "1");
                        item.oneNight = that.breakData(item.week1, "2");
                        item.twoMorning = that.breakData(item.week2, "0");
                        item.twoMiddle = that.breakData(item.week2, "1");
                        item.twoNight = that.breakData(item.week2, "2");
                        item.threeMorning = that.breakData(item.week3, "0");
                        item.threeMiddle = that.breakData(item.week3, "1");
                        item.threeNight = that.breakData(item.week3, "2");
                        item.fourMorning = that.breakData(item.week4, "0");
                        item.fourMiddle = that.breakData(item.week4, "1");
                        item.fourNight = that.breakData(item.week4, "2");
                        item.fiveMorning = that.breakData(item.week5, "0");
                        item.fiveMiddle = that.breakData(item.week5, "1");
                        item.fiveNight = that.breakData(item.week5, "2");
                        item.sixMorning = that.breakData(item.week6, "0");
                        item.sixMiddle = that.breakData(item.week6, "1");
                        item.sixNight = that.breakData(item.week6, "2");
                        item.sevenMorning = that.breakData(item.week7, "0");
                        item.sevenMiddle = that.breakData(item.week7, "1");
                        item.sevenNight = that.breakData(item.week7, "2");
                    });
                    that.data = res.data.data.list;
                    if (res.data.data.list.length < 1) {
                        that.columns = [];
                        this.scrollVal={};
                    } else {
                        that.columns = [
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
                                title: "星期一",
                                children: [
                                    {
                                        title: "早",
                                        dataIndex: "oneMorning",
                                        key: "oneMorning",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "oneMorning"
                                        }
                                    },
                                    {
                                        title: "中",
                                        dataIndex: "oneMiddle",
                                        key: "oneMiddle",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "oneMiddle"
                                        }
                                    },
                                    {
                                        title: "晚",
                                        dataIndex: "oneNight",
                                        key: "oneNight",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "oneNight"
                                        }
                                    }
                                ]
                            },
                            {
                                title: "星期二",
                                children: [
                                    {
                                        title: "早",
                                        dataIndex: "twoMorning",
                                        key: "twoMorning",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "twoMorning"
                                        }
                                    },
                                    {
                                        title: "中",
                                        dataIndex: "twoMiddle",
                                        key: "twoMiddle",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "twoMiddle"
                                        }
                                    },
                                    {
                                        title: "晚",
                                        dataIndex: "twoNight",
                                        key: "twoNight",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "twoNight"
                                        }
                                    }
                                ]
                            },
                            {
                                title: "星期三",
                                children: [
                                    {
                                        title: "早",
                                        dataIndex: "threeMorning",
                                        key: "threeMorning",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "threeMorning"
                                        }
                                    },
                                    {
                                        title: "中",
                                        dataIndex: "threeMiddle",
                                        key: "threeMiddle",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "threeMiddle"
                                        }
                                    },
                                    {
                                        title: "晚",
                                        dataIndex: "threeNight",
                                        key: "threeNight",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "threeNight"
                                        }
                                    }
                                ]
                            },
                            {
                                title: "星期四",
                                children: [
                                    {
                                        title: "早",
                                        dataIndex: "fourMorning",
                                        key: "fourMorning",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "fourMorning"
                                        }
                                    },
                                    {
                                        title: "中",
                                        dataIndex: "fourMiddle",
                                        key: "fourMiddle",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "fourMiddle"
                                        }
                                    },
                                    {
                                        title: "晚",
                                        dataIndex: "fourNight",
                                        key: "fourNight",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "fourNight"
                                        }
                                    }
                                ]
                            },
                            {
                                title: "星期五",
                                children: [
                                    {
                                        title: "早",
                                        dataIndex: "fiveMorning",
                                        key: "fiveMorning",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "fiveMorning"
                                        }
                                    },
                                    {
                                        title: "中",
                                        dataIndex: "fiveMiddle",
                                        key: "fiveMiddle",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "fiveMiddle"
                                        }
                                    },
                                    {
                                        title: "晚",
                                        dataIndex: "fiveNight",
                                        key: "fiveNight",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "fiveNight"
                                        }
                                    }
                                ]
                            },
                            {
                                title: "星期六",
                                children: [
                                    {
                                        title: "早",
                                        dataIndex: "sixMorning",
                                        key: "sixMorning",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "sixMorning"
                                        }
                                    },
                                    {
                                        title: "中",
                                        dataIndex: "sixMiddle",
                                        key: "sixMiddle",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "sixMiddle"
                                        }
                                    },
                                    {
                                        title: "晚",
                                        dataIndex: "sixNight",
                                        key: "sixNight",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "sixNight"
                                        }
                                    }
                                ]
                            },
                            {
                                title: "星期天",
                                children: [
                                    {
                                        title: "早",
                                        dataIndex: "sevenMorning",
                                        key: "sevenMorning",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "sevenMorning"
                                        }
                                    },
                                    {
                                        title: "中",
                                        dataIndex: "sevenMiddle",
                                        key: "sevenMiddle",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "sevenMiddle"
                                        }
                                    },
                                    {
                                        title: "晚",
                                        dataIndex: "sevenNight",
                                        key: "sevenNight",
                                        width: 100,
                                        align: "center",
                                        scopedSlots: {
                                            customRender: "sevenNight"
                                        }
                                    }
                                ]
                            },
                            {
                                title: "操作",
                                key: "operation",
                                fixed: "right",
                                width: 240,
                                align: "center",
                                scopedSlots: { customRender: "operation" }
                            }
                        ];
                        that.scrollVal={ x: 1400 };
                    }
                    that.pagination.total = res.data.data.count;
                    that.dataVal.year = res.data.data.year;
                    that.dataVal.week = res.data.data.week;
                    that.weekId = res.data.data.week;
                    that.dataVal.semester = res.data.data.semester;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        breakData(val, i) {
            if (val.indexOf(i) != -1) {
                return i;
            } else {
                return "";
            }
        },
        // 公示表
        publicityForm(id, type, weekNum) {
            this.publicityData = {};
            this.visible = true;
            this.schoolId = id;
            this.getModelInfo(id, type, weekNum);
        },
        // 带量公示表获取数据
        getModelInfo(id, type, weekNum) {
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/recipes/ingredient",
                method: "post",
                data: {
                    school_id: id,
                    type: type,
                    week: weekNum,
                    week_id:that.weekId
                }
            };
            this.$apiAxiox(data).then(res => {
                this.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.publicityData = res.data.data;
                    that.type = parseInt(res.data.data.type);
                    that.weekNum = parseInt(res.data.data.week);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 带量公示表 周数、餐次切换
        clickLeft() {
            if (this.type <= 0) {
                this.type = 2;
            } else {
                this.type = this.type - 1;
            }
            this.getModelInfo(this.schoolId, this.type, this.weekNum);
        },
        clickRight() {
            if (this.type >= 2) {
                this.type = 0;
            } else {
                this.type = this.type + 1;
            }
            this.getModelInfo(this.schoolId, this.type, this.weekNum);
        },
        clickLefts() {
            if (this.weekNum <= 1) {
                this.weekNum = 7;
            } else {
                this.weekNum = this.weekNum - 1;
            }
            this.getModelInfo(this.schoolId, this.type, this.weekNum);
        },
        clickRights() {
            console.log(this.weekNum);
            if (this.weekNum >= 7) {
                this.weekNum = 1;
            } else {
                this.weekNum = this.weekNum + 1;
            }
            this.getModelInfo(this.schoolId, this.type, this.weekNum);
        },
        // 公示表
        publicityTable(val) {
            if (this.data.length > 0) {
                location.href =
                    this.$globalApi + "/api/common/tableWeeklyRecipesExport?week_id=" +
                    val.week_id +
                    "&school_id=" +
                    val.school_id;
            } else {
                this.$message.error("暂无数据导出");
            }
        },
        // 预算表 数据
        getdataMolInfo(type, weekNum, weekId, id) {
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/recipes/budget",
                method: "post",
                data: {
                    type: type,
                    week: weekNum,
                    week_id: weekId,
                    school_id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                this.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.budgetVal = res.data.data;
                    that.types = parseInt(res.data.data.type);
                    that.weekNums = parseInt(res.data.data.week);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 预算表 周数、餐次切换
        clickLeftmol() {
            if (this.types <= 0) {
                this.types = 2;
            } else {
                this.types = this.types - 1;
            }
            this.getdataMolInfo(
                this.types,
                this.weekNums,
                this.weekIds,
                this.schoolIds
            );
        },
        clickRightmol() {
            if (this.types >= 2) {
                this.types = 0;
            } else {
                this.types = this.types + 1;
            }
            this.getdataMolInfo(
                this.types,
                this.weekNums,
                this.weekIds,
                this.schoolIds
            );
        },
        clickLeftmols() {
            if (this.weekNums <= 1) {
                this.weekNums = 7;
            } else {
                this.weekNums = this.weekNums - 1;
            }
            this.getdataMolInfo(
                this.types,
                this.weekNums,
                this.weekIds,
                this.schoolIds
            );
        },
        clickRighttmols() {
            if (this.weekNums >= 7) {
                this.weekNums = 1;
            } else {
                this.weekNums = this.weekNums + 1;
            }
            this.getdataMolInfo(
                this.types,
                this.weekNums,
                this.weekIds,
                this.schoolIds
            );
        },
        // 预算表
        budgetTable(val) {
            this.visibles = true;
            this.weekIds = val.week_id;
            this.schoolIds = val.school_id;
            // this.getdataMolInfo('1','1','1','1');
            this.getdataMolInfo(
                this.types,
                this.weekNums,
                val.week_id,
                val.school_id
            );
        },
        // 确认重置密码
        handleOk(e) {
            this.visible = false;
        },
        exportData() {
            // this.visibles = false;
            let that = this;
            if (this.budgetVal.menu.length > 0) {
                location.href =
                    this.$globalApi + "/api/recipes/export?type=" +
                    this.budgetVal.type +
                    "&week=" +
                    this.budgetVal.week +
                    "&week_id=" +
                    this.weekIds +
                    "&school_id=" +
                    this.schoolIds;
            } else {
                this.$message.error("暂无数据导出");
            }

            // let data = {
            //     url: "/recipes/export",
            //     method: "post",
            //     data: {
            //         type: this.budgetVal.type,
            //         week: this.budgetVal.week,
            //         week_id: this.weekIds,
            //         school_id: this.schoolIds
            //     }
            // };
            // this.$apiAxioxs(data).then(res => {
            //     if (res.data.code == 1) {
            //         that.$message.success(res.data.msg);
            //     } else {
            //         that.$message.error(res.data.msg);
            //     }
            // });
        },
        // 确认重置密码
        handlesOk(e) {
            this.visibles = false;
        }
    }
};
</script>

<style scoped>
#RecipeQuery {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.RecipeQuery_title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
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
.eyeshow {
    color: #02bb72;
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
.model_top {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 40px;
}
/* .models_top{

} */

.model_top_main {
    display: flex;
    align-items: center;
    margin-right: 30px;
}
.model_top_main:last-child {
    margin: 0;
}
.model_top_title {
    font-size: 20px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
}
.model_top_main_textSel {
    display: flex;
    align-items: center;
}
.model_top_main_textSel img {
    width: 26px;
    height: 26px;
    cursor: pointer;
    border-radius: 50%;
}
.clickBtn {
    width: 26px;
    height: 26px;
    border: 1px solid rgba(2, 188, 114, 1);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    color: rgba(2, 188, 114, 1);
    font-size: 30px;
    line-height: 16px;
}
.clickBtn:hover {
    background: rgba(2, 188, 114, 1);
    color: #ffffff;
}
.model_top_main_textSel img:hover {
    background: rgba(2, 188, 114, 1);
}
.model_top_main_text {
    font-size: 20px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(2, 188, 114, 1);
    margin: 0 15px;
}
.model_top > span {
    margin-right: 20px;
}
.colGree {
    color: #02bb72;
}
.colRed {
    color: #fd0505;
}
.model_main_box {
    max-height: 400px;
    overflow-y: scroll;
}
.model_tmenu {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 40px;
}
.marler {
    margin: 0 60px 0 30px;
}
.model_main_tab {
    margin-bottom: 48px;
}
.model_main_tab .model_main_title {
    margin-bottom: 20px;
}
.model_main {
    margin-bottom: 40px;
}
.model_main_title {
    font-size: 20px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(2, 187, 114, 1);
    line-height: 28px;
}
.model_main_man {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin: 20px 0 15px;
}
.model_main_man_item {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.model_main_man_item > div {
    min-width: 204px;
    min-height: 50px;
    border: 1px solid rgba(210, 210, 210, 1);
    display: flex;
    align-items: center;
}
.model_main_man_item > div > div:first-child {
    min-width: 77px;
    padding: 10px;
    box-sizing: border-box;
    min-height: 50px;
    background: rgba(2, 187, 114, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    white-space:normal;
    word-break:break-all;
}
.model_main_man_item > div > div:last-child {
    min-width: 126px;
    padding: 10px;
    box-sizing: border-box;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    white-space:normal;
    word-break:break-all;
}
.model_footer {
    width: 100%;
    display: flex;
    justify-content: center;
}
.models_footer {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.model_footer_btn {
    width: 230px;
    height: 50px;
    border: 1px solid rgba(2, 187, 114, 1);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: rgba(2, 187, 114, 1);
}
.models_footer .model_footer_btn:first-child {
    background: rgba(2, 187, 114, 1);
    color: rgba(255, 255, 255, 1) !important;
}
.models_main {
    padding: 0 20px;
    box-sizing: border-box;
    height: 400px;
    overflow-y: scroll;
}
</style>