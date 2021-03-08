<template>
    <div id="BigDataAnalysis">
        <a-tabs v-model="tabKey" @change="callback">
            <a-tab-pane key="1" tab="数据统计">
                <div class="tab_top">
                    <div class="top_box">
                        <div class="item_title">学校概况</div>
                        <div class="top_box_main">
                            <div>
                                <div>
                                    <div class="top_box_main_title">
                                        学校总数
                                    </div>
                                    <div class="top_box_main_text">
                                        {{
                                            dataVal.school_info.school_count
                                        }}&nbsp;<span>所</span>
                                    </div>
                                </div>
                                <div>
                                    <div class="top_box_main_title">
                                        学生人数
                                    </div>
                                    <div class="top_box_main_text">
                                        {{
                                            dataVal.school_info.student_count
                                        }}&nbsp;<span>人</span>
                                    </div>
                                </div>
                                <!-- <div>
                                    <div class="top_box_main_title">
                                        教职工人数
                                    </div>
                                    <div class="top_box_main_text">
                                        {{
                                            dataVal.school_info
                                                .school_worker_count
                                        }}&nbsp;<span>人</span>
                                    </div>
                                </div> -->
                            </div>
                            <div>
                                <div>
                                    <div class="top_box_main_title">食堂数</div>
                                    <div class="top_box_main_text">
                                        {{
                                            dataVal.school_info.canteen_count
                                        }}&nbsp;<span>家</span>
                                    </div>
                                </div>
                                <div>
                                    <div class="top_box_main_title">
                                        食堂在职员工人数
                                    </div>
                                    <div class="top_box_main_text">
                                        {{
                                            dataVal.school_info
                                                .canteen_worker_count
                                        }}&nbsp;<span>人</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div class="top_box_main_title">
                                        供应商入驻总数
                                    </div>
                                    <div class="top_box_main_text">
                                        {{
                                            dataVal.school_info.supplier_count
                                        }}&nbsp;<span>家</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="totalAlert">
                    <div class="item_title">预警总计</div>
                    <div class="totalAlert_top">
                        <div
                            :class="yearVal == '1' ? 'activeAlert' : ''"
                            @click="chegeData('1')"
                        >
                            上学期
                        </div>
                        <div
                            :class="yearVal == '2' ? 'activeAlert' : ''"
                            @click="chegeData('2')"
                        >
                            本学期
                        </div>
                        <div
                            :class="yearVal == '3' ? 'activeAlert' : ''"
                            @click="chegeData('3')"
                        >
                            上月
                        </div>
                        <div
                            :class="yearVal == '4' ? 'activeAlert' : ''"
                            @click="chegeData('4')"
                        >
                            本月
                        </div>
                    </div>
                    <div class="top_box totalAlert_main">
                        <div
                            v-for="(item, index) in totalAlertList"
                            :key="index"
                        >
                            <div :id="item.title"></div>
                            <div class="totalAlert_main_title">
                                {{ item.name }}
                            </div>
                            <div class="totalAlert_main_text">
                                {{ item.count }}次
                            </div>
                        </div>
                    </div>
                </div>
                <div class="censusSchool">
                    <div class="censusSchool_left_title censusSchool_title">
                        <div>学校统计</div>
                    </div>
                    <div class="censusSchool_left">
                        <div class="censusSchool_right_title">
                            学校类别占比
                        </div>
                        <div>
                            <div class="schoolType_box">
                                <div id="schoolType"></div>
                                <div>
                                    <div
                                        v-for="(item, index) in statisticsLeft"
                                        :key="index"
                                        class="schoolType_right"
                                    >
                                        <div class="cardList">
                                            <div
                                                :style="{
                                                    background: item.color
                                                }"
                                            ></div>
                                            <div>
                                                {{ item.name }}
                                            </div>
                                        </div>
                                        <div>{{ item.ratio }}%</div>
                                        <div>{{ item.count }}</div>
                                        <!-- <a-list
                                                    :grid="{
                                                        gutter: 15,
                                                        column: 3
                                                    }"
                                                >
                                                    <a-list-item>
                                                        <a-card
                                                            :bordered="false"
                                                        >
                                                            <div
                                                                class="cardList"
                                                            >
                                                                <div
                                                                    :style="{
                                                                        background:
                                                                            item.color
                                                                    }"
                                                                ></div>
                                                                <div>
                                                                    {{
                                                                        item.name
                                                                    }}
                                                                </div>
                                                            </div>
                                                        </a-card>
                                                    </a-list-item>
                                                    <a-list-item>
                                                        <a-card
                                                            :bordered="false"
                                                        >
                                                            {{
                                                                item.proportion
                                                            }}
                                                        </a-card>
                                                    </a-list-item>
                                                    <a-list-item>
                                                        <a-card
                                                            :bordered="false"
                                                        >
                                                            {{ item.value }}
                                                        </a-card>
                                                    </a-list-item>
                                                </a-list> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <a-row>
                        <a-col :span="11">
                            <div class="censusSchool_left">
                                <div class="censusSchool_right_title">
                                    学校类别占比
                                </div>
                                <div>
                                    <div class="schoolType_box">
                                        <div id="schoolType"></div>
                                        <div>
                                            <div
                                                v-for="(item,
                                                index) in statisticsLeft"
                                                :key="index"
                                                class="schoolType_right"
                                            >
                                                <div class="cardList">
                                                    <div
                                                        :style="{
                                                            background:
                                                                item.color
                                                        }"
                                                    ></div>
                                                    <div>
                                                        {{ item.name }}
                                                    </div>
                                                </div>
                                                <div>{{ item.ratio }}%</div>
                                                <div>{{ item.count }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="1"> </a-col>
                        <a-col :span="12">
                            <div class="censusSchool_right">
                                <div class="censusSchool_right_title">
                                    学校类别占比
                                </div>
                                <div class="censusSchool_right_main">
                                    <div
                                        v-for="(item, index) in schoolType"
                                        :key="index"
                                    >
                                        <div :id="item.title"></div>
                                    </div>
                                </div>
                            </div>
                        </a-col>
                    </a-row> -->
                </div>
                <div class="totalAlert">
                    <div class="item_title">各类别学生人数统计</div>
                    <div>
                        <div id="stuCensus"></div>
                    </div>
                </div>
                <div class="totalWeeks">
                    <div class="disWeek">
                        <div class="title">学期:</div>
                        <a-select
                        v-model="weekId"
                        default-value
                        style="width: 120px"
                        @change="getWeekData"
                        >
                        <a-select-option value>全部</a-select-option>
                        <a-select-option
                            v-for="(item,index) in weekList"
                            :key="index"
                            :value="item.id"
                        >{{item.year}}{{item.semester}}</a-select-option>
                        </a-select>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="价格监管">
                <div class="priceDemo">
                    <div>
                        <div class="RecipeQuery_box_item">
                            <div>选择年份：</div>
                            <a-select
                                class="selStyle"
                                @change="yearChange"
                                default-value="全部"
                            >
                                <a-select-option
                                    v-for="item in yearList"
                                    :key="item.year"
                                >
                                    {{ item.yearVal }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </div>
                    <div class="proActualList">
                        <div class="item_title">实际采购成本趋势</div>
                        <div>
                            <div id="proActual"></div>
                        </div>
                        <div class="proActualList_item">
                            <div class="proActualList_item_left">
                                <div class="censusSchool_left_title">
                                    <div>各类食材花费占比</div>
                                </div>
                                <div class="proActualList_item_left_main">
                                    <div
                                        v-for="(item,
                                        index) in priceData.type_pay_ratio"
                                        :key="index"
                                    >
                                        <div :id="item.title"></div>
                                        <div class="totalAlert_main_title">
                                            {{ item.name }}
                                        </div>
                                        <div class="totalAlert_main_text">
                                            {{ item.ratio }}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="proActualList_item_right">
                                <div class="censusSchool_left_title">
                                    <div>食材采购成本排行</div>
                                </div>
                                <div>
                                    <div class="purchase_item_top">
                                        <div>类型</div>
                                        <div>成本（万）</div>
                                        <div>排行</div>
                                    </div>
                                    <div
                                        class="purchase_item_main"
                                        v-for="(item,
                                        index) in priceData.type_list_sort"
                                        :key="index"
                                    >
                                        <div>{{ item.name }}</div>
                                        <div>{{ item.value }}</div>
                                        <div>{{ index + 1 }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="priceDemo_footer">
                    <div class="priceDemo_footer_title">
                        <div class="item_title">采购平均单价趋势</div>
                        <div class="totalAlert_top">
                            <div
                                v-for="(item, index) in productList"
                                :key="index"
                                :class="
                                    foodType == item.id ? 'activeAlert' : ''
                                "
                                @click="chegeDatas(item.id)"
                            >
                                {{ item.name }}
                            </div>
                            <!-- <div
                                :class="foodType == '2' ? 'activeAlert' : ''"
                                @click="chegeDatas('2')"
                            >
                                肉类
                            </div>
                            <div
                                :class="foodType == '3' ? 'activeAlert' : ''"
                                @click="chegeDatas('3')"
                            >
                                蔬菜类
                            </div>
                            <div
                                :class="foodType == '4' ? 'activeAlert' : ''"
                                @click="chegeDatas('4')"
                            >
                                干货类
                            </div> -->
                        </div>
                    </div>
                    <div id="purchaseAverage"></div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="智能预警">
                <div class="earlyWarning">
                    <div class="earlyWarning_top">
                        <div class="earlyWarning_top_left">
                            <div>实时智能预警</div>
                            <div class="earlyWarning_top_left_text">
                                截止到{{ dataEarlyList.look_time }}
                            </div>
                        </div>
                        <div
                            class="earlyWarning_top_right"
                            @click="allReminders"
                        >
                            一键全部提醒
                        </div>
                    </div>
                    <div class="earlyWarning_main">
                        <div class="earlyWarning_main_title">
                            <a-row type="flex">
                                <a-col :span="4">
                                    <div>学校简称</div>
                                </a-col>
                                <a-col :span="1"> </a-col>
                                <a-col :span="4">
                                    <div>预警类型</div>
                                </a-col>
                                <a-col :span="1"> </a-col>
                                <a-col :span="4">
                                    <div>预警事件</div>
                                </a-col>
                                <a-col :span="1"> </a-col>
                                <a-col :span="4">
                                    <div>过期时间</div>
                                </a-col>
                                <a-col :span="1"> </a-col>
                                <a-col :span="4">
                                    <div class="overtime"></div>
                                </a-col>
                            </a-row>
                        </div>
                        <div class="earlyWarning_main_text">
                            <div
                                v-for="(item, index) in dataEarlyList.main_list"
                                :key="index"
                            >
                                <a-row>
                                    <a-col :span="4">
                                        <div>{{ item.abbreviation }}</div>
                                    </a-col>
                                    <a-col :span="1"> </a-col>
                                    <a-col :span="4">
                                        <div>{{ item.type_text }}</div>
                                    </a-col>
                                    <a-col :span="1"> </a-col>
                                    <a-col :span="4">
                                        <div>{{ item.content }}</div>
                                    </a-col>
                                    <a-col :span="1"> </a-col>
                                    <a-col :span="4">
                                        <div>{{ item.over_time }}</div>
                                    </a-col>
                                    <a-col :span="1"> </a-col>
                                    <a-col :span="4">
                                        <div class="overtime">
                                            {{ item.time_text }}
                                        </div>
                                    </a-col>
                                </a-row>
                            </div>
                        </div>
                    </div>
                    <div class="earlyWarning_footer">
                        <div @click="earlyList">
                            共计{{ dataEarlyList.count }}条未处理预警 >
                        </div>
                    </div>
                </div>
                <div class="earlyWarning workInfo">
                    <div class="earlyWarning_top">
                        <div class="earlyWarning_top_left">
                            <div>工作完成情况</div>
                            <!-- <div class="earlyWarning_top_left_text">
                                截止到2020-02-15 08:02:25
                            </div> -->
                        </div>
                        <div
                            class="earlyWarning_top_right"
                            @click="allReminders"
                        >
                            一键全部提醒
                        </div>
                    </div>
                    <div class="earlyWarning_main">
                        <div class="earlyWarning_main_title">
                            <a-row type="flex">
                                <a-col :span="16">
                                    <div>工作事项</div>
                                </a-col>
                                <a-col :span="2"> </a-col>
                                <a-col :span="6">
                                    <div class="textCen">未完成学校数量</div>
                                </a-col>
                            </a-row>
                        </div>
                        <div class="earlyWarning_main_text">
                            <a-row>
                                <a-col :span="16">
                                    <div>信息公开上传</div>
                                </a-col>
                                <a-col :span="2"> </a-col>
                                <a-col :span="6">
                                    <div class="textCen">
                                        {{ dataEarlyList.information }}
                                    </div>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="16">
                                    <div>工作记录</div>
                                </a-col>
                                <a-col :span="2"> </a-col>
                                <a-col :span="6">
                                    <div class="textCen">
                                        {{ dataEarlyList.work }}
                                    </div>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="16">
                                    <div>食谱制作</div>
                                </a-col>
                                <a-col :span="2"> </a-col>
                                <a-col :span="6">
                                    <div class="textCen">
                                        {{ dataEarlyList.recipes }}
                                    </div>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="16">
                                    <div>食材保质期</div>
                                </a-col>
                                <a-col :span="2"> </a-col>
                                <a-col :span="6">
                                    <div class="textCen">
                                        {{ dataEarlyList.food }}
                                    </div>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="16">
                                    <div>入库处理</div>
                                </a-col>
                                <a-col :span="2"> </a-col>
                                <a-col :span="6">
                                    <div class="textCen">
                                        {{ dataEarlyList.warehousing }}
                                    </div>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="16">
                                    <div>出库处理</div>
                                </a-col>
                                <a-col :span="2"> </a-col>
                                <a-col :span="6">
                                    <div class="textCen">
                                        {{ dataEarlyList.out }}
                                    </div>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="16">
                                    <div>学校证件（食品经营许可）</div>
                                </a-col>
                                <a-col :span="2"> </a-col>
                                <a-col :span="6">
                                    <div class="textCen">
                                        {{ dataEarlyList.certificates }}
                                    </div>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="16">
                                    <div>健康证</div>
                                </a-col>
                                <a-col :span="2"> </a-col>
                                <a-col :span="6">
                                    <div class="textCen">
                                        {{ dataEarlyList.health }}
                                    </div>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="16">
                                    <div>超支比例预警（1个月）</div>
                                </a-col>
                                <a-col :span="2"> </a-col>
                                <a-col :span="6">
                                    <div class="textCen">
                                        {{ dataEarlyList.overspending }}
                                    </div>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabKey: "1",
            yearVal: "2",
            foodType: "",
            totalAlertList: [],
            schoolType: [
                {
                    title: "citySchool",
                    name: "城区学校",
                    color: ["#EEEEEE", "#02BC72"],
                    num: 28
                },
                {
                    title: "nocitySchool",
                    name: "非城区学校",
                    color: ["#EEEEEE", "#02BC72"],
                    num: 22
                },
                {
                    title: "inclusiveSchool",
                    name: "普惠学校",
                    color: ["#EEEEEE", "#FDB838"],
                    num: 28
                },
                {
                    title: "noinclusiveSchool",
                    name: "非普惠学校",
                    color: ["#EEEEEE", "#FDB838"],
                    num: 22
                }
            ],
            yearList: [],
            typeFood: [
                {
                    title: "foodstuffType",
                    name: "即粮食类",
                    color: ["#EEEEEE", "#FDB737"],
                    num: 20.25
                },
                {
                    title: "tablePoultryType",
                    name: "肉禽蛋类",
                    color: ["#EEEEEE", "#02BB72"],
                    num: 25.68
                },
                {
                    title: "vegetablesType",
                    name: "蔬菜瓜果类",
                    color: ["#EEEEEE", "#BD8DEF"],
                    num: 12.25
                },
                {
                    title: "accessoriesType",
                    name: "油盐辅料类",
                    color: ["#EEEEEE", "#50ACFE"],
                    num: 8.12
                },
                {
                    title: "dessertType",
                    name: "幼儿点心类",
                    color: ["#EEEEEE", "#FD7272"],
                    num: 8.69
                },
                {
                    title: "otherType",
                    name: "其他类",
                    color: ["#EEEEEE", "#14C6E0"],
                    num: 2.35
                }
            ],
            dataVal: {
                school_info: {
                    school_count: ""
                }
            },
            yearData: "",
            priceData: {},
            productList: [],
            data: [
                {
                    name: "小学",
                    proportion: "36%",
                    value: "99",
                    color: "#50ACFE"
                },
                {
                    name: "幼儿园",
                    proportion: "20%",
                    value: "89",
                    color: "#02BC72"
                },
                {
                    name: "初中",
                    proportion: "16%",
                    value: "45",
                    color: "#FDB838"
                },
                {
                    name: "高中",
                    proportion: "10%",
                    value: "12",
                    color: "#FD7272"
                }
            ],
            statisticsLeft: [],
            dataEarlyList: {},
            weekList:[],
            weekId:''
        };
    },
    created() {
        let tabs = localStorage.getItem("tabIndexs");
        if (tabs && tabs != "") {
            this.tabKey = tabs;
            localStorage.removeItem("tabIndexs");
        } else {
            this.tabKey = "1";
        }
    },
    mounted() {
        // this.getDataVal(); //数据统计
        // this.getPurchase(this.foodType); //采购平均单价趋势图
        // let that = this;
        // this.getPriceVal(this.yearData); //价格监管
        // // 预警总计
        // this.totalAlertList.some(item => {
        //     let arr = [
        //         { value: 200, name: "总数" },
        //         { value: item.num, name: item.name }
        //     ];
        //     let color = item.color;
        //     that.drawLine(item.title, arr, color);
        // });
        // // 学校类型占比
        // this.schoolType.some(item => {
        //     let arr = [
        //         { value: 100, name: "总数" },
        //         { value: item.num, name: item.name }
        //     ];
        //     let color = item.color;
        //     that.drawLineSchool(item.name, item.title, arr, color, item.num);
        // });
        // this.drawLines(); // 学校统计
        // this.getYear();

        // this.setProActual();
        // 各类食材花费占比
        // this.typeFood.some(item => {
        //     let arr = [
        //         { value: 200, name: "总数" },
        //         { value: item.num, name: item.name }
        //     ];
        //     let color = item.color;
        //     // if (item.title == "totalAlertFood") {
        //     //     color = ["#e9e9e9", "#99d5fd"];
        //     // }
        //     that.drawLine(item.title, arr, color);
        // });
        // this.drawLinePurchase();

        // }

        let that = this;
        if (this.tabKey == "1") {
            this.getWeek();
            this.getEarlyWarning(this.yearVal);
            // 预警总计
            // this.totalAlertList.some(item => {
            //     let arr = [
            //         { value: 200, name: "总数" },
            //         { value: item.count, name: item.name }
            //     ];
            //     let color = item.color;
            //     that.drawLine(item.title, arr, color);
            // });
            // // 学校类型占比
            // this.schoolType.some(item => {
            //     let arr = [
            //         { value: 100, name: "总数" },
            //         { value: item.num, name: item.name }
            //     ];
            //     let color = item.color;
            //     that.drawLineSchool(
            //         item.name,
            //         item.title,
            //         arr,
            //         color,
            //         item.num
            //     );
            // });

            // this.drawLineStu();
            this.getDataVal(); //数据统计
        } else if (this.tabKey == "2") {
            this.getProductList(); //一级产品目录
            this.getYear();
            this.getPriceVal(this.yearData);
            // this.setProActual();
            // 各类食材花费占比
            // this.typeFood.some(item => {
            //     let arr = [
            //         { value: 200, name: "总数" },
            //         { value: item.num, name: item.name }
            //     ];
            //     let color = item.color;
            //     // if (item.title == "totalAlertFood") {
            //     //     color = ["#e9e9e9", "#99d5fd"];
            //     // }
            //     that.drawLine(item.title, arr, color);
            // });
            // this.drawLinePurchase();
            // this.getPurchase(this.foodType); //采购平均单价趋势图
            if (
                this.priceData.type_pay_ratio &&
                this.priceData.type_pay_ratio.length > 0
            ) {
                this.priceData.type_pay_ratio.forEach(item => {
                    this.drawLinePrice(item);
                });
            }
        } else {
            this.getEarlyList();
        }
    },
    watch: {
        priceData(val, newval) {
            if (newval.type_pay_ratio && newval.type_pay_ratio.length > 0) {
                newval.type_pay_ratio.forEach(item => {
                    this.drawLinePrice(item);
                });
            }
        }
    },
    methods: {
        // tab切换
        callback(key) {
            let that = this;
            if (key == "1") {
                // 预警总计
                this.getEarlyWarning(this.yearVal);
                this.getDataVal(); //数据统计
            } else if (key == "2") {
                this.getYear();
                this.getPriceVal(this.yearData);
                // this.setProActual();
                // 各类食材花费占比
                // this.typeFood.some(item => {
                //     let arr = [
                //         { value: 200, name: "总数" },
                //         { value: item.num, name: item.name }
                //     ];
                //     let color = item.color;
                //     // if (item.title == "totalAlertFood") {
                //     //     color = ["#e9e9e9", "#99d5fd"];
                //     // }
                //     that.drawLine(item.title, arr, color);
                // });
                // this.drawLinePurchase();
                // this.getPurchase(this.foodType); //采购平均单价趋势图
                if (
                    this.priceData.type_pay_ratio &&
                    this.priceData.type_pay_ratio.length > 0
                ) {
                    this.priceData.type_pay_ratio.forEach(item => {
                        this.drawLinePrice(item);
                    });
                }
                this.getProductList(); //一级产品目录
            } else {
                this.getEarlyList();
            }
        },
        getWeek(){
            //获取周，年份，学期
            let that = this;
            let data = {
                url: "/school/recipes/getSearch",
                method: "post",
                data: { id: "" }
            };
            this.$apiAxioxs(data).then(res => {
                if (res.data.code == 1) {
                    that.weekList = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
      },
        getWeekData(){
            this.getEarlyWarning(this.yearVal);
            this.getDataVal(); //数据统计
        },
        // 获取数据统计
        getDataVal() {
            let that = this;
            this.$store.commit("setLoading", true);
            let data = {
                url: "/index/data",
                method: "post",
                data: {
                    id:this.weekId
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.dataVal = res.data.data;
                    that.drawLineStu(res.data.data.school_data.type_student);
                    res.data.data.school_data.type_ratio_list.forEach(item => {
                        item.color = [that.getColor()];
                    });
                    that.statisticsLeft =
                        res.data.data.school_data.type_ratio_list;
                    setTimeout(() => {
                        that.drawLines();
                    }, 100);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 预警切换
        chegeData(i) {
            this.yearVal = i;
            this.getEarlyWarning(i);
        },
        // 获取预警总计
        getEarlyWarning(type) {
            let that = this;
            // that.$store.commit("setLoading", true);
            let data = {
                url: "/index/warningData",
                method: "post",
                data: {
                    type: type, //1：去年；2：今年；3：上月；4：本月
                    id:this.weekId
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    res.data.data.list.forEach((item, index) => {
                        item.title = "totalAlertRecipes" + index;
                    });
                    that.totalAlertList = res.data.data.list;
                    setTimeout(() => {
                        that.totalAlertList.forEach(item => {
                            let arr = [
                                { value: res.data.data.count, name: "总数" },
                                { value: item.count, name: item.name }
                            ];
                            let color;
                            if (item.count == res.data.data.count) {
                                color = that.getColor();
                            } else {
                                color = ["#EEEEEE", that.getColor()];
                            }
                            that.drawLine(item.title, arr, color);
                        });
                    }, 100);

                    // that.$message.success(res.data.msg);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 随机色
        getColor() {
            let r = parseInt(Math.random() * 256);
            let g = parseInt(Math.random() * 256);
            let b = parseInt(Math.random() * 256);
            return `rgb(${r},${g},${b})`;
        },
        // 预警总计
        drawLine(name, data, color) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(name));
            // 绘制图表
            myChart.setOption({
                series: [
                    {
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: "right"
                        },
                        emphasis: {
                            label: {
                                show: false,
                                fontSize: "10",
                                fontWeight: "bold"
                            }
                        },
                        data: data
                    }
                ],
                color: color
            });
        },
        // 食材花费占比
        drawLinePrice(data) {
            // drawLinePrice(name, data, color) {
            let arr = [
                { value: 100, name: "总数" },
                { value: data.ratio, name: data.name }
            ];
            let color = data.color;
            // data.title = "title" + item.id;
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
                document.getElementById(data.title)
            );
            // 绘制图表
            myChart.setOption({
                series: [
                    {
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: "right"
                        },
                        emphasis: {
                            label: {
                                show: false,
                                fontSize: "10",
                                fontWeight: "bold"
                            }
                        },
                        data: arr
                    }
                ],
                color: color
            });
        },
        // 学校统计
        drawLines() {
            // var data = this.genData(5);
            // 基于准备好的dom，初始化echarts实例
            let color = [];
            let data = [];
            let total = 0;
            this.statisticsLeft.forEach(item => {
                color.push(item.color);
                let obj = {
                    value: item.count,
                    name: item.name
                };
                total = item.school_total;
                data.push(obj);
            });
            let myChart = this.$echarts.init(
                document.getElementById("schoolType")
            );
            // 绘制图表
            myChart.setOption({
                title: {
                    text: "总学校数量",
                    // left: "left",
                    x: "center",
                    y: "center",
                    top: "160",
                    textStyle: {
                        color: "#333",
                        fontWeight: 400,
                        fontSize: 16
                    }
                },
                tooltip: {
                    trigger: "item",
                    formatter: " {b}：{c} "
                },
                color: color, //环形颜色
                graphic: {
                    //图形中间文字
                    type: "text",
                    left: "center",
                    top: "190",
                    style: {
                        text: total,
                        textAlign: "center",
                        fill: "#000",
                        fontSize: 18
                    }
                },
                // legend: {
                //     orient: "vertical",
                //     right: 10,
                //     top: 80,
                //     itemWidth: 5,
                //     itemHeight: 5,
                //     borderRadius: 5,
                //     textStyle: {
                //         borderRadius: 50,
                //         fontSize: 18
                //     },
                //     data: ["小学", "幼儿园", "初中", "高中"]
                // },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: "center"
                        },
                        emphasis: {
                            label: {
                                show: false,
                                fontSize: "18",
                                fontWeight: "bold"
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: data
                        // data: [
                        //     { value: 335, name: "小学" },
                        //     { value: 310, name: "幼儿园" },
                        //     { value: 234, name: "初中" },
                        //     { value: 135, name: "高中" }
                        // ]
                    }
                ]
            });
        },
        // 学校类型占比
        drawLineSchool(title, name, data, color, num) {
            let titleVal = num + "%";
            // var data = this.genData(5);
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(name));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: title,
                    // left: "left",
                    x: "center",
                    y: "center",
                    top: "70",
                    textStyle: {
                        color: "#9A9A9A",
                        fontWeight: 400,
                        fontSize: 16
                    }
                },
                tooltip: {
                    trigger: "item",
                    formatter: " {b}：{c} "
                },
                color: ["#3ba1ff", "#2fc25b", "#facc14", "#f04864"], //环形颜色
                graphic: {
                    //图形中间文字
                    type: "text",
                    left: "center",
                    top: "100",
                    style: {
                        text: titleVal,
                        textAlign: "center",
                        fill: "#000",
                        fontSize: 24
                    }
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: "center"
                        },
                        emphasis: {
                            label: {
                                show: false,
                                fontSize: "18",
                                fontWeight: "bold"
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: data
                    }
                ],
                color: color
            });
        },
        // 各类别学生人数统计
        drawLineStu(data) {
            let arr = [];
            let arr1 = [];

            data.forEach(item => {
                arr.push(item.name);
                arr1.push(item.count);
            });
            let maxVal = Math.max.apply(null, arr1);
            // var data = this.genData(5);
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
                document.getElementById("stuCensus")
            );
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "cross" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    data: arr,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        fontSize: 10,
                        width: "10%"
                    }
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    min: 0,
                    max: maxVal,
                    axisLabel: {
                        // formatter: "{value} k"
                        formatter: value => {
                            let val = "";
                            if (value == 0) {
                                val = "0";
                            } else if (value < 1000) {
                                val = value;
                            } else {
                                val = value / 1000 + " k";
                            }
                            return val;
                        }
                    }
                    // data: [0, 5, 10, 15, 20, 25, 30]
                },
                series: [
                    {
                        name: "学生人数",
                        type: "bar",
                        barMaxWidth: 40,
                        backgroundStyle: {
                            color: "#ffffff"
                        },
                        data: arr1
                    }
                ],
                color: "#02BC72"
            });
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
                    let arr = [{ year: "全部", yearVal: "全部" }];
                    res.data.data.forEach(item => {
                        item.yearVal = item.year + "年";
                    });
                    that.yearList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 价格监督
        getPriceVal(year) {
            let that = this;
            this.$store.commit("setLoading", true);
            let data = {
                url: "/index/price",
                method: "post",
                data: {
                    year: year
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.setProActual(res.data.data.month_cost);
                    res.data.data.type_pay_ratio.forEach(item => {
                        item.title = "title" + item.id;
                        item.color =
                            that.typeFood[Math.floor(Math.random() * 6)].color;
                    });
                    that.priceData = res.data.data;
                    setTimeout(() => {
                        that.priceData.type_pay_ratio.forEach(item => {
                            // let arr = [
                            //     { value: 100, name: "总数" },
                            //     { value: item.ratio, name: item.name }
                            // ];
                            // // item.title =
                            // //     that.typeFood[Math.floor(Math.random() * 6)].color;
                            // // item.title = "title" + item.id;
                            // console.log(item);
                            // debugger;
                            // that.drawLinePrice(item.title, arr, color);
                            that.drawLinePrice(item);
                        });
                    }, 100);
                    // res.data.data.type_pay_ratio.forEach(item => {
                    //     // let arr = [
                    //     //     { value: 100, name: "总数" },
                    //     //     { value: item.ratio, name: item.name }
                    //     // ];
                    //     // // item.title =
                    //     // //     that.typeFood[Math.floor(Math.random() * 6)].color;
                    //     // // item.title = "title" + item.id;
                    //     // console.log(item);
                    //     // debugger;
                    //     // that.drawLinePrice(item.title, arr, color);
                    //     that.drawLinePrice(item);
                    // });
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 年份选择
        yearChange(e) {
            if (e == "全部") {
                this.yearData = "";
            } else {
                this.yearData = e;
            }
            this.getPriceVal(this.yearData);
        },
        // 实际采购成本趋势
        setProActual(data) {
            let arr = [0];
            data.forEach(item => {
                arr.push(item.value);
            });
            let maxVal = Math.max.apply(null, arr);
            // var data = this.genData(5);
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
                document.getElementById("proActual")
            );
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985"
                        }
                    }
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false,
                        data: [
                            "",
                            "1月",
                            "2月",
                            "3月",
                            "4月",
                            "5月",
                            "6月",
                            "7月",
                            "8月",
                            "9月",
                            "10月",
                            "11月",
                            "12月"
                        ],
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        name: "单位（元）",
                        type: "value",
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        min: 0,
                        max: maxVal.toFixed(2),
                        axisLabel: {
                            // formatter: "{value} k"
                            formatter: value => {
                                let val = "";
                                if (value == 0) {
                                    val = "0";
                                } else if (value < 10000) {
                                    val = value.toFixed(2);
                                } else {
                                    val = (value / 10000).toFixed(2) + " 万";
                                }
                                return val;
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "采购成本",
                        type: "line",
                        smooth: true,
                        stack: "总量",
                        areaStyle: {},
                        itemStyle: {
                            color: "#02BB72"
                        },
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "#02BB72"
                                    },
                                    {
                                        offset: 1,
                                        color: "#fff"
                                    }
                                ]
                            )
                        },
                        data: arr
                    }
                ]
            });
        },
        // 获取一级产品目录
        getProductList() {
            let that = this;
            let data = {
                url: "/product/productList",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.productList = res.data.data;
                    that.foodType = res.data.data[0].id;
                    that.getPurchase(res.data.data[0].id);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 获取采购平均单价趋势图数据
        getPurchase(id) {
            let that = this;
            let data = {
                url: "/index/pay_unit_price",
                method: "post",
                data: {
                    type_id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.drawLinePurchase(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 采购平均单价趋势
        chegeDatas(i) {
            this.foodType = i;
            this.getPurchase(i); //采购平均单价趋势图
        },
        // 采购平均单价趋势图
        drawLinePurchase(data) {
            let arr = [0];
            let arr1 = [0];
            let arrName = [""];
            data.forEach(item => {
                // arr.push(item.value.toString());
                // arr1.push(item.last_value.toString());
                arr.push(parseFloat(item.value));
                arr1.push(parseFloat(item.last_value));
                arrName.push(item.month);
            });
            // var data = this.genData(5);
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
                document.getElementById("purchaseAverage")
            );
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["实时", "去年同期"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: arrName,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    name: "单位（元）",
                    type: "value",
                    axisLine: {
                        show: true
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    
                    {
                        name: "去年同期",
                        type: "line",
                        stack: "总量",
                        data: arr1,
                        itemStyle: {
                            color: "#FDB737"
                        }
                    },
                    {
                        name: "实时",
                        type: "line",
                        stack: "总量",
                        data: arr,
                        itemStyle: {
                            color: "#02BB72"
                        }
                    },
                ]
            });
        },
        // 获取预警主页数据
        getEarlyList() {
            let that = this;
            let data = {
                url: "/index/earlyWarning",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.dataEarlyList = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 跳转预警列表
        earlyList() {
            this.$router.push({
                path: "EarlyWarningList",
                query: {
                    // id: i
                }
            });
        },
        // 全部提醒
        allReminders() {
            let that = this;
            let data = {
                url: "/index/oneKeySend",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#BigDataAnalysis {
    width: 100%;
    padding: 0 24px 24px;
    box-sizing: border-box;
}
.item_title {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #343434;
    line-height: 20px;
    border-left: 4px solid #343434;
    padding-left: 18px;
    box-sizing: border-box;
    margin-bottom: 40px;
}
.tab_top {
    width: 100%;
    padding: 20px 20px 30px;
    box-sizing: border-box;
    background: #ffffff;
}
.top_box {
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
}
.top_box_main {
    margin-top: 20px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.top_box_main > div:first-child {
    width: 40%;
    padding-right: 80px;
    border-right: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
}
.top_box_main > div:nth-child(2) {
    width: 35%;
    border-right: 1px solid #eeeeee;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
}
.top_box_main > div:last-child {
    width: 25%;
    text-align: center;
}
.top_box_main_title {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #9a9a9a;
    line-height: 28px;
    margin-bottom: 30px;
}
.top_box_main_text {
    font-size: 24px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #343434;
    line-height: 28px;
}
.top_box_main_text span {
    font-size: 14px;
}
.totalAlert {
    margin-top: 20px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: #ffffff;
}
.totalAlert_top {
    margin-top: 20px;
    display: flex;
    align-items: center;
    padding-bottom: 28px;
    border-bottom: 1px solid #eeeeee;
}
.totalAlert_top > div {
    min-width: 84px;
    height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
}
.activeAlert {
    background: rgba(2, 187, 114, 1);
    color: #ffffff;
}
.totalAlert_main {
    margin: 20px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}
.totalAlert_main > div {
    width: 156px;
    text-align: center;
}
.totalAlert_main > div > div:first-child {
    width: 156px;
    height: 156px;
}
.totalAlert_main_title {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #9a9a9a;
    line-height: 28px;
}
.totalAlert_main_text {
    font-size: 24px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #343434;
    line-height: 28px;
    margin-top: 18px;
}
.totalWeeks{
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
.disWeek{
    display: flex;
    align-items: center;
}
/* #totalAlertRecipes {
    width: 110px;
    height: 110px;
} */
.censusSchool {
    margin-top: 20px;
    /* width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center; */
}
.censusSchool_left,
.censusSchool_right {
    /* width: 45%; */
    padding: 20px;
    min-height: 510px;
    box-sizing: border-box;
    background: #ffffff;
}
.censusSchool_left_title,
.censusSchool_right_title {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #343434;
    margin-bottom: 22px;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 20px;
    box-sizing: border-box;
}
.censusSchool_title {
    padding: 0 0 0 22px;
}
.censusSchool_left_title > div {
    line-height: 26px;
    border-left: 4px solid #343434;
    padding-left: 18px;
    box-sizing: border-box;
}
.censusSchool_right_main {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.censusSchool_right_main > div {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.censusSchool_right_main > div > div {
    width: 185px;
    height: 185px;
    margin: 10px 0;
}
.schoolType_box {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
#schoolType {
    width: 80%;
    height: 400px;
}
.schoolType_right {
    display: flex;
    align-items: center;
}
.schoolType_right > div {
    min-width: 50px;
    text-align: center;
    margin: 10px 0;
}
.schoolType_right > .cardList {
    display: flex;
    align-items: center;
    text-align: center;
}
.cardList > div:first-child {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    margin-right: 10px;
}
.cardList > div:last-child {
    width: 80px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
#stuCensus {
    width: 100%;
    height: 400px;
}
.priceDemo {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: #ffffff;
}
.RecipeQuery_box_item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
}
.selStyle {
    width: 240px;
    height: 34px;
}
.proActualList .item_title {
    margin: 0;
}
#proActual {
    width: 100%;
    height: 380px;
}
.proActualList_item {
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    flex-wrap: wrap;
}
.proActualList_item > div {
    width: 49%;
    min-height: 596px;
    padding: 22px;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px #ccc;
}
.proActualList_item_left_main {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
}
.proActualList_item_left_main > div {
    width: 30%;
}
.proActualList_item_left_main > div > div:first-child {
    width: 100%;
    /* width: 156px; */
    height: 156px;
}
.purchase_item_top,
.purchase_item_main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.purchase_item_main {
    margin: 50px 0;
}
.purchase_item_top > div {
    width: 30%;
    text-align: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #999999;
}
.purchase_item_main > div {
    width: 30%;
    text-align: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #333333;
}
.priceDemo_footer {
    width: 100%;
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
}
.priceDemo_footer_title {
    width: 100%;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
}
.priceDemo_footer_title .item_title {
    margin: 0;
}
.priceDemo_footer_title .totalAlert_top {
    border: none;
    margin-top: 30px;
    flex-wrap: wrap;
}
#purchaseAverage {
    width: 100%;
    height: 400px;
}
/* 智能预警 */
.earlyWarning {
    background: #fff;
    padding: 20px 20px 30px;
    box-sizing: border-box;
}
.earlyWarning_top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 30px;
    margin-bottom: 20px;
    box-sizing: border-box;
}
.earlyWarning_top_right {
    width: 168px;
    height: 40px;
    background: #02bc72;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
}
.earlyWarning_top_left {
    display: flex;
    align-items: center;
    font-size: 18px;
    line-height: 20px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #343434;
    padding-left: 8px;
    border-left: 4px solid #343434;
    box-sizing: border-box;
}
.earlyWarning_top_left_text {
    margin-left: 20px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #02bb72;
}
.earlyWarning_main_title {
    width: 100%;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #9a9a9a;
    margin-bottom: 30px;
    text-align: left;
}
.earlyWarning_main_text {
    width: 100%;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #343434;
    text-align: left;
}
.overtime {
    color: #fd7272;
    text-align: right;
}
.earlyWarning_main_text > div {
    margin: 10px 0;
}
.earlyWarning_footer {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #343434;
    cursor: pointer;
}
.workInfo {
    margin-top: 20px;
}
.textCen {
    text-align: center;
}
</style>
<style>
.ant-tabs-nav .ant-tabs-tab-active,
.ant-tabs-nav .ant-tabs-tab {
    font-size: 24px !important;
}
.ant-tabs-nav .ant-tabs-tab {
    width: 110px !important;
}
.ant-tabs-ink-bar {
    left: 40px !important;
}
/* .ant-tabs-bar{
    position: fixed;
    top: 88px;
    left: 36px;
} */
.ant-card-body {
    padding: 0 !important;
    text-align: center;
}
</style>