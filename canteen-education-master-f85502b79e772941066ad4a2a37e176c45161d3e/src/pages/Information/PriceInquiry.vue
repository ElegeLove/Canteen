<template>
    <div id="PriceInquiry">
        <ul class="tabs">
            <li
                v-for="(item, index) in tabs"
                :key="index"
                :class="{ active: num == index }"
                @click="getNum(index)"
            >
                {{ item }}
            </li>
        </ul>
        <div>
            <div v-if="num == 0">
                <div class="RecipeQuery_box">
                    <div class="RecipeQuery_box_item">
                        <div>&emsp;&emsp;年份：</div>
                        <a-select
                            style="width:240px;height:34px;"
                            @change="yearChange"
                            v-model="years"
                        >
                            <a-select-option
                                v-for="item in yearList"
                                :key="item.year"
                            >
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
                        <div>&emsp;自定义：</div>
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
                    <div class="RecipeQuery_box_item">
                        <div>&emsp;&emsp;学校：</div>
                        <a-input
                            type="text"
                            style="width:240px;height:34px;"
                            v-model="schoolName"
                            placeholder="学校简称/代码"
                        />
                    </div>

                    <!-- 搜索框 -->
                    <div class="RecipeQuery_box_item">
                        <div>&emsp;原材料：</div>
                        <a-input
                            type="text"
                            style="width:240px;height:34px;"
                            v-model="material"
                            placeholder="多个原材料以 , 分隔"
                        />
                        <div class="mx_btnbg" @click="handleSubmit">搜索</div>
                    </div>
                </div>
                <a-table
                    :rowKey="row => row.school_id"
                    :columns="columns"
                    :data-source="data"
                    bordered
                    :loading="loadShow"
                    :pagination="pagination"
                    :scroll="scroll"
                    @change="handleTableChange"
                >
                </a-table>
            </div>
            <div v-else>
                <div class="RecipeQuery_box">
                    <div class="RecipeQuery_box_item">
                        <div>&emsp;&emsp;年份：</div>
                        <a-select
                            style="width:240px;height:34px;"
                            @change="yearChange"
                            v-model="years"
                        >
                            <a-select-option
                                v-for="item in yearList"
                                :key="item.year"
                            >
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
                        <div>&emsp;自定义：</div>
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
                            <!-- valueFormat="YYYY-MM-DD" -->
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
                            <!-- valueFormat="YYYY-MM-DD" -->
                        </div>
                    </div>
                    <div class="RecipeQuery_box_item">
                        <div>&emsp;供应商：</div>
                        <a-input
                            type="text"
                            style="width:240px;height:34px;"
                            v-model="supplierName"
                            placeholder="供应商简称/代码"
                        />
                    </div>

                    <!-- 搜索框 -->
                    <div class="RecipeQuery_box_item">
                        <div>&emsp;原材料：</div>
                        <a-input
                            type="text"
                            style="width:240px;height:34px;"
                            v-model="material"
                            placeholder="请输入原材料"
                        />
                        <div class="mx_btnbg" @click="handleSubmit">搜索</div>
                    </div>
                </div>
                <a-table
                    :rowKey="row => row.supplier_id"
                    :columns="columnsTwo"
                    :data-source="dataTwo"
                    bordered
                    :loading="loadShows"
                    :pagination="paginations"
                    :scroll="scrolls"
                    @change="handleTableChanges"
                >
                </a-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            columns: [],
            dataTwo: [],
            columnsTwo: [],
            showPage: true,
            tabs: ["学校采购价格查询", "供应商供应价格查询"],
            num: 0,
            schoolName: "",
            supplierName: "",
            material: "",
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
                total: 0,
                pageSizeOptions: ["10", "20", "30", "40", "50"],
                showSizeChanger: true, // 显示可改变每页数量
                showQuickJumper: true, //显示跳转到输入的那一页
                showTotal: total =>
                    `共 ${total} 条记录 第 ${
                        this.pagination.current
                    } / ${Math.ceil(total / this.pagination.pageSize)} 页` // 显示总数
            },
            paginations: {
                pageSize: 10, // 默认每页显示数量
                current: 1, //显示当前页数
                total: 0,
                pageSizeOptions: ["10", "20", "30", "40", "50"],
                showSizeChanger: true, // 显示可改变每页数量
                showQuickJumper: true, //显示跳转到输入的那一页
                showTotal: total =>
                    `共 ${total} 条记录 第 ${
                        this.pagination.current
                    } / ${Math.ceil(total / this.pagination.pageSize)} 页` // 显示总数
            },
            startValue: null,
            endValue: null,
            endOpen: false,
            loadShow: false,
            loadShows: false,
            scroll: {},
            scrolls: {},
            status: true,
            yearList: [],
            years: "全部",
            yearVal: "",
            semesterList: [],
            semester: "全部",
            semesterVal: "",
            startTime: "",
            endTime: ""
        };
    },
    watch: {
        startValue(val) {
            if (this.startValue == null) {
                this.startTime = "";
                this.endTime = "";
                this.endValue = null;
                if (this.num == 0) {
                    this.pagination.current = 1;
                    // this.getDataList(
                    //     this.yearVal,
                    //     this.semesterVal,
                    //     this.schoolName,
                    //     this.material,
                    //     this.startTime,
                    //     this.endTime
                    // );
                } else {
                    this.paginations.current = 1;
                    // this.getDataLists(
                    //     this.yearVal,
                    //     this.semesterVal,
                    //     this.supplierName,
                    //     this.material,
                    //     this.startTime,
                    //     this.endTime
                    // );
                }
            } else {
                this.startTime = this.$moment(val).format("YYYY-MM-DD");
            }
            // console.log("startValue", this.startTime);
        },
        endValue(val) {
            if (this.endValue == null) {
                this.endTime = "";
                if (this.num == 0) {
                    this.pagination.current = 1;
                    // this.getDataList(
                    //     this.yearVal,
                    //     this.semesterVal,
                    //     this.schoolName,
                    //     this.material,
                    //     this.startTime,
                    //     this.endTime
                    // );
                } else {
                    this.paginations.current = 1;
                    // this.getDataLists(
                    //     this.yearVal,
                    //     this.semesterVal,
                    //     this.supplierName,
                    //     this.material,
                    //     this.startTime,
                    //     this.endTime
                    // );
                }
            } else {
                this.endTime = this.$moment(val).format("YYYY-MM-DD");
            }
            // console.log("endValue", this.endTime);
        }
    },
    created() {
        // this.getDataLists();
        this.getYear();
        // this.getDataList(
        //     this.yearVal,
        //     this.semesterVal,
        //     this.schoolName,
        //     this.material,
        //     this.startTime,
        //     this.endTime
        // );
        // this.getDataLists(
        //     this.yearVal,
        //     this.semesterVal,
        //     this.supplierName,
        //     this.material,
        //     this.startTime,
        //     this.endTime
        // );
    },
    methods: {
        // 选项卡切换
        getNum(index) {
            this.num = index;
            this.yearVal = "";
            this.years = "全部";
            this.semester = "全部";
            this.semesterVal = "";
            this.status = true;
            this.schoolName = "";
            this.supplierName = "";
            this.material = "";
            this.startTime = "";
            this.endTime = "";
            this.startValue = null;
            this.endValue = null;
            if (index == 0) {
                this.pagination.current = 1;
                // this.getDataList(
                //     this.yearVal,
                //     this.semesterVal,
                //     this.schoolName,
                //     this.material,
                //     this.startTime,
                //     this.endTime
                // );
            } else {
                this.paginations.current = 1;
                // this.getDataLists(
                //     this.yearVal,
                //     this.semesterVal,
                //     this.supplierName,
                //     this.material,
                //     this.startTime,
                //     this.endTime
                // );
            }
        },
        // 年份选择
        yearChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.yearVal = "";
                this.status = true;
                this.semester = "全部";
                this.semesterVal = "";
            } else {
                this.status = false;
                this.yearVal = e;
                this.getSemester(e);
            }
            // this.getDataList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName);
            // if (this.num == 0) {
            //     this.getDataList(
            //         this.yearVal,
            //         this.semesterVal,
            //         this.schoolName,
            //         this.material,
            //         this.startTime,
            //         this.endTime
            //     );
            // } else {
            //     this.getDataLists(
            //         this.yearVal,
            //         this.semesterVal,
            //         this.supplierName,
            //         this.material,
            //         this.startTime,
            //         this.endTime
            //     );
            // }
        },
        // 学期选择
        semesterChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.semesterVal = "";
            } else {
                this.semesterVal = e;
            }
            // if (this.num == 0) {
            //     this.getDataList(
            //         this.yearVal,
            //         this.semesterVal,
            //         this.schoolName,
            //         this.material,
            //         this.startTime,
            //         this.endTime
            //     );
            // } else {
            //     this.getDataLists(
            //         this.yearVal,
            //         this.semesterVal,
            //         this.supplierName,
            //         this.material,
            //         this.startTime,
            //         this.endTime
            //     );
            // }
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
        // 开始时间确认
        selStartTime() {
            // if (this.num == 0) {
            //     this.getDataList(
            //         this.yearVal,
            //         this.semesterVal,
            //         this.schoolName,
            //         this.material,
            //         this.startTime,
            //         this.endTime
            //     );
            // } else {
            //     this.getDataLists(
            //         this.yearVal,
            //         this.semesterVal,
            //         this.supplierName,
            //         this.material,
            //         this.startTime,
            //         this.endTime
            //     );
            // }
        },
        // 结束时间确认
        selEndTime() {
            // if (this.num == 0) {
            //     this.getDataList(
            //         this.yearVal,
            //         this.semesterVal,
            //         this.schoolName,
            //         this.material,
            //         this.startTime,
            //         this.endTime
            //     );
            // } else {
            //     this.getDataLists(
            //         this.yearVal,
            //         this.semesterVal,
            //         this.supplierName,
            //         this.material,
            //         this.startTime,
            //         this.endTime
            //     );
            // }
        },
        // 学校简称搜索
        handleSubmit() {
             if (this.num == 0) {
                if (this.material == "") {
                    this.$message.error('请输入原材料');
                } else {
                    this.getDataList(
                        this.yearVal,
                        this.semesterVal,
                        this.schoolName,
                        this.material,
                        this.startTime,
                        this.endTime
                    );
                }
            } else {
                if(this.material == ''){
                    this.$message.error('请输入原材料');
                }else{
                    this.getDataLists(
                        this.yearVal,
                        this.semesterVal,
                        this.supplierName,
                        this.material,
                        this.startTime,
                        this.endTime
                    );
                }
            }
            // console.log(this.startValue);
            // console.log(this.$moment(this.startValue).format("YYYY-DD-MM"));
            // console.log(this.$moment(this.endValue).format("YYYY-DD-MM"));
        },
        // 学校类型
        handleChange(value) {
            console.log(`Selected: ${value}`);
        },
        //日期选择
        disabledStartDate(startValue) {
            // this.$moment('string').format("YYYY-DD-MM")
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
        // 列表分页
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getDataList(
                this.yearVal,
                this.semesterVal,
                this.schoolName,
                this.material,
                this.startTime,
                this.endTime
            );
        },
        getDataList(year, semester, schoolName, material, startTime, endTime) {
            let that = this;
            that.loadShow = true;
            let data = {
                url: "/recipes/priceOrderSchool",
                method: "post",
                data: {
                    year: year,
                    semester: semester,
                    search_school: schoolName,
                    search_food: material,
                    start_time: startTime,
                    end_time: endTime,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                that.loadShow = false;
                that.pagination.total = res.data.data.total_count;
                if (res.data.code == 1) {
                    let arr = [];
                    if (res.data.data.list.length > 0) {
                        if (parseInt(res.data.data.count) < 6) {
                            that.scroll = {};
                            arr = [
                                {
                                    title: "学校代码",
                                    dataIndex: "code",
                                    key: "code",
                                    width: 100,
                                    align: "center"
                                },
                                {
                                    title: "学校简称",
                                    dataIndex: "abbreviation",
                                    key: "abbreviation",
                                    width: 180,
                                    align: "center"
                                }
                            ];
                        } else {
                            that.scroll = { x: 1400 };
                            arr = [
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
                                    width: 180,
                                    fixed: "left",
                                    align: "center"
                                }
                            ];
                        }
                        for (
                            let i = 0;
                            i < parseInt(res.data.data.count);
                            i++
                        ) {
                            let arr1 = [
                                {
                                    title: "原材料",
                                    dataIndex: "schoolName" + (i + 1),
                                    key: "schoolName" + (i + 1),
                                    width: 150,
                                    align: "center"
                                },
                                {
                                    title: "单价（元）",
                                    dataIndex: "price" + (i + 1),
                                    key: "price" + (i + 1),
                                    width: 120,
                                    align: "center"
                                }
                            ];
                            arr = arr.concat(arr1);
                        }

                        that.columns = arr;
                        res.data.data.list.forEach(item => {
                            item.key = item.school_id;
                            item.product_list.forEach((itemChild, i) => {
                                item["schoolName" + (i + 1)] = itemChild.name;
                                item["price" + (i + 1)] = itemChild.unit_price;
                            });
                        });
                        that.data = res.data.data.list;
                    } else {
                        that.columns = [];
                        that.data = [];
                    }
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 列表分页s
        handleTableChanges(pagination, filters, sorter) {
            this.paginations.pageSize = pagination.pageSize;
            this.paginations.current = pagination.current;
            // this.getAllStudents()
            this.getDataLists(
                this.yearVal,
                this.semesterVal,
                this.supplierName,
                this.material,
                this.startTime,
                this.endTime
            );
        },

        getDataLists(
            year,
            semester,
            supplierName,
            material,
            startTime,
            endTime
        ) {
            let that = this;
            that.loadShows = true;
            let data = {
                url: "/recipes/priceOrderSupplier",
                method: "post",
                data: {
                    search_content: supplierName,
                    year: year,
                    semester: semester,
                    start_time: startTime,
                    end_time: endTime,
                    product_name: material,
                    page: this.paginations.current,
                    page_num: this.paginations.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                that.loadShows = false;
                that.paginations.total = res.data.data.page_count;
                if (res.data.code == 1) {
                    let arr = [];
                    if (res.data.data.list.length > 0) {
                        if (parseInt(res.data.data.count) < 5) {
                            that.scrolls = {};
                            arr = [
                                {
                                    title: "单位代码",
                                    dataIndex: "code",
                                    key: "code",
                                    width: 100,
                                    align: "center"
                                },
                                {
                                    title: "单位简称",
                                    dataIndex: "supplier_name",
                                    key: "supplier_name",
                                    width: 180,
                                    align: "center"
                                }
                            ];
                        } else {
                            that.scrolls = { x: 1400 };
                            arr = [
                                {
                                    title: "单位代码",
                                    dataIndex: "code",
                                    key: "code",
                                    width: 100,
                                    fixed: "left",
                                    align: "center"
                                },
                                {
                                    title: "单位简称",
                                    dataIndex: "supplier_name",
                                    key: "supplier_name",
                                    width: 180,
                                    fixed: "left",
                                    align: "center"
                                }
                            ];
                        }
                        for (
                            let i = 0;
                            i < parseInt(res.data.data.count);
                            i++
                        ) {
                            let arr1 = [
                                {
                                    title: "学校简称",
                                    dataIndex: "schoolName" + (i + 1),
                                    key: "schoolName" + (i + 1),
                                    width: 150,
                                    align: "center"
                                },
                                {
                                    title: "单价",
                                    dataIndex: "price" + (i + 1),
                                    key: "price" + (i + 1),
                                    width: 120,
                                    align: "center"
                                }
                            ];
                            arr = arr.concat(arr1);
                        }

                        that.columnsTwo = arr;
                        res.data.data.list.forEach(item => {
                            item.key = item.id;
                            item.school_list.forEach((itemChild, i) => {
                                item["schoolName" + (i + 1)] =
                                    itemChild.abbreviation;
                                item["price" + (i + 1)] = itemChild.price;
                            });
                        });
                        that.dataTwo = res.data.data.list;
                    } else {
                        that.columnsTwo = [];
                        that.dataTwo = [];
                    }
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#PriceInquiry {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.tabs {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 20px;
}
.tabs > li {
    cursor: pointer;
}
.tabs > li:first-child {
    margin-right: 50px;
}
.active {
    color: rgb(51, 51, 51);
    font-weight: bold;
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
</style>