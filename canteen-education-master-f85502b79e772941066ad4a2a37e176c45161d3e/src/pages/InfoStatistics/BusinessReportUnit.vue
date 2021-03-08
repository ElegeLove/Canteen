<template>
    <div id="BusinessReportUnit">
        <div class="RecipeQuery_title">
            学生营养改善计划实施情况（学校）月报
        </div>
        <div class="RecipeQuery_box">
            <div class="RecipeQuery_box_item">
                <div>年份：</div>
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
        <div>注：累计投入资金(元) ：从当年1月起累计计算。</div>
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :data-source="data"
            bordered
            :pagination="pagination"
            :scroll="scrollVal"
            :loading="loadShows"
            @change="handleTableChange"
        >
            <template slot="operation" slot-scope="text, record">
                <div class="operate" v-if="record.is_total == 1">
                    <div
                        @click="
                            budgetTable(
                                record.id,
                                '本月惠及学生（人次）总计',
                                '1'
                            )
                        "
                    >
                        本月惠及学生（人次）总计
                    </div>
                    <div
                        @click="
                            budgetTable(
                                record.id,
                                '本月惠及实际学生(人)(非“人次”)总计',
                                '2'
                            )
                        "
                    >
                        本月惠及实际学生(人)(非“人次”)总计
                    </div>
                    <div @click="lunchModel(record.id, '供餐总计')">
                        供餐总计
                    </div>
                </div>
                <div class="operate" v-else>
                    <div
                        @click="
                            budgetTable(record.id, '本月惠及学生（人次）', '1')
                        "
                    >
                        本月惠及学生（人次）
                    </div>
                    <div
                        @click="
                            budgetTable(
                                record.id,
                                '本月惠及实际学生(人)(非“人次”)',
                                '2'
                            )
                        "
                    >
                        本月惠及实际学生(人)(非“人次”)
                    </div>
                    <div @click="lunchModel(record.id, '供餐信息')">
                        供餐信息
                    </div>
                </div>
            </template>
        </a-table>
        <a-modal
            v-model="visible"
            width="30%"
            :title="monthVal"
            :centered="true"
        >
            <div>
                <a-row>
                    <a-col :span="12">
                        <div class="model_left">
                            <div>农村留守儿童{{ molText }}</div>
                            <div>非寄宿贫困学生</div>
                            <div>免费提供{{ molText }}</div>
                            <div>总计</div>
                        </div>
                    </a-col>
                    <a-col :span="2"> </a-col>
                    <a-col :span="10">
                        <div class="model_right" v-if="molText == '人次'">
                            <div>{{molVal.total_child_count}}</div>
                            <div>{{molVal.total_poor_count}}</div>
                            <div>{{molVal.total_free_count}}</div>
                            <div>{{molVal.total_people_count}}</div>
                        </div>
                        <div class="model_right" v-else>
                            <div>{{molVal.total_child}}</div>
                            <div>{{molVal.total_poor}}</div>
                            <div>{{molVal.total_free}}</div>
                            <div>{{molVal.total_all_count}}</div>
                        </div>
                    </a-col>
                </a-row>
            </div>
            <template slot="footer">
                <div class="model_footer">
                    <a-button
                        key="submit"
                        class="model_footer_btn"
                        @click="() => (visible = false)"
                    >
                        关闭
                    </a-button>
                </div>
            </template>
        </a-modal>
        <a-modal
            v-model="visibles"
            width="40%"
            :title="serveFoodVal"
            :centered="true"
        >
            <div>
                <a-tabs v-model="tabsVal" @change="callback">
                    <a-tab-pane
                        v-for="item in tabs"
                        :key="item.id"
                        :tab="item.name"
                    >
                        <div class="models_main">
                            <div class="models_top borderBot">
                                <div>资金（元）</div>
                                <div>累计投入：{{lunchVal.total_plan}}</div>
                                <div>本月投入：{{lunchVal.month_plan}}</div>
                            </div>
                            <div>
                                <div class="models_top">
                                    <div>惠及学生（人）</div>
                                    <div>其中农村留守儿童：{{lunchVal.student_countryside}}</div>
                                    <div>其中非寄宿贫困学生：{{lunchVal.student_poor}}</div>
                                    <div>其中免费提供人数：{{lunchVal.student_free}}</div>
                                    <div>合计：{{lunchVal.student_total}}</div>
                                </div>
                                <div class="models_top" v-if="tabsVal == 1">
                                    <div>按供餐模式</div>
                                    <div class="models_list">
                                        <div>食堂供餐</div>
                                        <div class="models_list_item">
                                            <div>其中农村留守儿童：{{lunchVal.lunch_canteen_countryside}}</div>
                                            <div>其中非寄宿贫困学生：{{lunchVal.lunch_canteen_poor}}</div>
                                            <div>其中免费提供人数：{{lunchVal.lunch_canteen_free}}</div>
                                            <div>合计：{{lunchVal.lunch_canteen_total}}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>向企业（单位）购买</div>
                                        <div class="models_list_item">
                                            <div>其中农村留守儿童：{{lunchVal.lunch_enterprise_countryside}}</div>
                                            <div>其中非寄宿贫困学生：{{lunchVal.lunch_enterprise_poor}}</div>
                                            <div>其中免费提供人数：{{lunchVal.lunch_enterprise_free}}</div>
                                            <div>合计：{{lunchVal.lunch_enterprise_total}}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>家庭（个人）托餐</div>
                                        <div class="models_list_item">
                                            <div>其中农村留守儿童：{{lunchVal.lunch_family_countryside}}</div>
                                            <div>其中非寄宿贫困学生：{{lunchVal.lunch_family_poor}}</div>
                                            <div>其中免费提供人数：{{lunchVal.lunch_family_free}}</div>
                                            <div>合计：{{lunchVal.lunch_family_total}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="models_top" v-if="tabsVal == 2">
                                    <div>按供餐模式</div>
                                    <div class="models_list">
                                        <div>食堂供餐</div>
                                        <div class="models_list_item">
                                            <div>仅吃鸡蛋</div>
                                            <div>其中农村留守儿童：{{lunchVal.em_egg_countryside}}</div>
                                            <div>其中非寄宿贫困学生：{{lunchVal.em_egg_poor}}</div>
                                            <div>其中免费提供人数：{{lunchVal.em_egg_free}}</div>
                                            <div>合计：{{lunchVal.em_egg_total}}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>向企业（单位）购买</div>
                                        <div class="models_list_item">
                                            <div>仅饮牛奶</div>
                                            <div>其中农村留守儿童：{{lunchVal.em_milk_countryside}}</div>
                                            <div>其中非寄宿贫困学生：{{lunchVal.em_milk_poor}}</div>
                                            <div>其中免费提供人数：{{lunchVal.em_milk_free}}</div>
                                            <div>合计：{{lunchVal.em_milk_total}}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>家庭（个人）托餐</div>
                                        <div class="models_list_item">
                                            <div>奶蛋同吃</div>
                                            <div>其中农村留守儿童：{{lunchVal.em_countryside}}</div>
                                            <div>其中非寄宿贫困学生：{{lunchVal.em_poor}}</div>
                                            <div>其中免费提供人数：{{lunchVal.em_free}}</div>
                                            <div>合计：{{lunchVal.em_total}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a-tab-pane>
                    <!-- <a-tab-pane key="2" tab="蛋奶" force-render>
                        Content of Tab Pane 2
                    </a-tab-pane>
                    <a-tab-pane key="3" tab="其他（课间发放水果、面包等）">
                        <div></div>
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                    </a-tab-pane> -->
                </a-tabs>
            </div>
            <template slot="footer">
                <div class="model_footer">
                    <a-button
                        key="submit"
                        class="model_footer_btn"
                        @click="() => (visibles = false)"
                    >
                        关闭
                    </a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script>
const columnsVal = [
    {
        title: "区县名称",
        dataIndex: "area",
        key: "area",
        width: 100,
        fixed: "left",
        align: "center",
        scopedSlots: { customRender: "area" },
        customRender: (value, row, index) => {
            const obj = {
                children: value,
                attrs: {}
            };
            // // obj.attrs.rowSpan = 5;
            // obj.attrs.colSpan = 0;
            if (row.is_total == 1) {
                obj.attrs.colSpan = 3;
            } else {
                obj.attrs.colSpan = 1;
            }
            return obj;
        }
    },
    {
        title: "学校简称",
        dataIndex: "school",
        key: "school",
        width: 120,
        fixed: "left",
        align: "center",
        scopedSlots: { customRender: "school" },
        customRender: (value, row, index) => {
            const obj = {
                children: value,
                attrs: {}
            };
            // obj.attrs.rowSpan = 5;
            // obj.attrs.colSpan = 0;
            if (row.is_total == 1) {
                obj.attrs.colSpan = 0;
            } else {
                obj.attrs.colSpan = 1;
            }
            return obj;
        }
    },
    {
        title: "学校类别",
        dataIndex: "type",
        key: "type",
        width: 120,
        fixed: "left",
        align: "center",
        scopedSlots: { customRender: "type" },
        customRender: (value, row, index) => {
            const obj = {
                children: value,
                attrs: {}
            };
            // obj.attrs.rowSpan = 5;
            // obj.attrs.colSpan = 0;
            if (row.is_total == 1) {
                obj.attrs.colSpan = 0;
            } else {
                obj.attrs.colSpan = 1;
            }
            return obj;
        }
    },
    {
        title: "是否城区学校",
        dataIndex: "urban_school",
        key: "urban_school",
        width: 240,
        align: "center"
    },
    {
        title: "有无食堂",
        dataIndex: "canteen",
        key: "canteen",
        width: 240,
        align: "center"
    },
    {
        title: "供餐模式",
        children: [
            {
                title: "午餐",
                dataIndex: "lunch_all_total",
                key: "lunch_all_total",
                width: 100,
                align: "center"
            },
            {
                title: "蛋奶",
                dataIndex: "em_all_total",
                key: "em_all_total",
                width: 100,
                align: "center"
            },
            {
                title: "其他",
                dataIndex: "other_total",
                key: "other_total",
                width: 100,
                align: "center"
            }
        ]
    },
    {
        title: "全校学生数（人）",
        dataIndex: "total_count",
        key: "total_count",
        width: 240,
        align: "center"
    },
    {
        title: "累计投入资金（元）",
        dataIndex: "now_year_total_plan",
        key: "now_year_total_plan",
        width: 240,
        align: "center"
    },
    {
        title: "本月投入资金（元）",
        dataIndex: "total_plan",
        key: "total_plan",
        width: 240,
        align: "center"
    },
    {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 300,
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
            visible: false,
            monthVal: "",
            serveFoodVal: "",
            visibles: false,
            molText: "",
            molVal: {},
            tabs: [
                { name: "午餐",id:'1' },
                { name: "蛋奶",id:'2' },
                { name: "其他（课间发放水果、面包等）",id:'3' }
            ],
            tabsVal: '1',
            lunchId:'',
            lunchVal:{},
            isLunch:false,
            scrollVal: { x: 1400 }
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
                url: "/information/nutritionMonth",
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
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 弹窗1
        budgetTable(id, val, i) {
            this.visible = true;
            this.monthVal = val;
            if (i == 1) {
                this.molText = "人次";
                this.getDataVal(id);
            } else {
                this.molText = "人数";
                this.getDataVals(id);
            }
            // molVal
        },
        // 获取人次
        getDataVal(id){
            let that = this;
            let data = {
                url: "/information/nutritionPeople",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.molVal = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 获取人数
        getDataVals(id){
            let that = this;
            let data = {
                url: "/information/nutritionCount",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.molVal = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 弹窗2
        lunchModel(i, val) {
            this.visibles = true;
            this.tabsVal = '1';
            this.lunchVal={};
            if(val == '供餐总计'){
                this.isLunch = true;
                this.getLunchData(i,this.tabsVal,this.schoolName, this.yearVal, this.semesterVal);
            }else{
                this.isLunch = false;
                this.getLunchData(i,this.tabsVal);
            }
            this.lunchId = i;
            this.serveFoodVal = val;
            // this.tabsVal = 0;
        },
        getLunchData(id,type,search,year,semester){
            let that = this;
            let data = {
                url: "/information/serveFood",
                method: "post",
                data: {
                    id: id,
                    type: type, //	1：午餐；2：蛋奶；3：其他
                    search_content: search,
                    year: year,
                    semester: semester,
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.lunchVal = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 选项卡
        callback(key) {
            this.lunchVal={};
            if(this.isLunch){
                this.getLunchData(this.lunchId,this.tabsVal,this.schoolName, this.yearVal, this.semesterVal);
            }else{
                this.getLunchData(this.lunchId,this.tabsVal);
            }
        },
    }
};
</script>

<style scoped>
#BusinessReportUnit {
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
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.operate > div {
    margin-right: 30px;
    color: #02bb72;
    cursor: pointer;
}
.operate > div:last-child{
    margin: 0;
}
.model_footer {
    width: 100%;
    display: flex;
    justify-content: center;
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
.model_left {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(154, 154, 154, 1);
    text-align: right;
    line-height: 48px;
}
.model_right {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: rgba(52, 52, 52, 1);
    line-height: 48px;
}
.models_top {
    padding: 20px 0;
    box-sizing: border-box;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(52, 52, 52, 1);
    line-height: 36px;
}
.borderBot {
    border-bottom: 1px solid #eeeeee;
}
.models_top > div:first-child {
    width: 100%;
    padding-left: 18px;
    box-sizing: border-box;
    border-left: 6px solid #0c0c0c;
    font-size: 24px;
    font-family: "Source Han Sans CN";
    font-weight: 500;
    line-height: 24px;
    color: rgba(52, 52, 52, 1);
    margin-bottom: 20px;
}
.models_main {
    height: 400px;
    overflow-y: scroll;
}
.models_list {
    margin-bottom: 10px;
}
.models_list_item {
    padding-left: 20px;
    box-sizing: border-box;
}
</style>