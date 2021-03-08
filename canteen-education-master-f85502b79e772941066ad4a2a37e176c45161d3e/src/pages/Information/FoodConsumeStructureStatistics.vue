<template>
    <div id="FoodConsumeStructureStatistics">
        <div class="FoodConsumeStructureStatistics_box">
            <!-- <div class="FoodConsumeStructureStatistics_box_item">
                <div>食堂：</div>
                <a-select
                    placeholder="请选择"
                    style="width:240px;height:34px;"
                    @change="handleChange"
                >
                    <a-select-option v-for="(item, i) in sclType" :key="i">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div> -->
            <div class="FoodConsumeStructureStatistics_box_item">
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
            <div class="FoodConsumeStructureStatistics_box_item">
                <div>学期：</div>
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
            <div class="FoodConsumeStructureStatistics_box_item">
                <div>月份：</div>
                <a-select
                    style="width:240px;height:34px;"
                    @change="monthChange"
                    default-value="0"
                >
                    <a-select-option v-for="item in monthList" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
        </div>
        <!-- 搜索框 -->
        <a-form layout="inline" class="mx_form mx_staff">
            <a-form-item label="学校：">
                <span>
                    <a-input
                        type="text"
                        v-model="schoolName"
                        placeholder="学校简称"
                    />
                </span>
            </a-form-item>
            <!-- <a-form-item label="供应商名称：">
                <span>
                    <a-input
                        type="text"
                        v-model="supplierName"
                        placeholder="请输入供应商名称"
                    />
                </span>
            </a-form-item> -->
            <a-form-item>
                <a-button
                    class="mx_btnbg"
                    @click="handleSubmit"
                    type="primary"
                    html-type="submit"
                    >搜索</a-button
                >
            </a-form-item>
        </a-form>
        <div class="FoodConsumeStructureStatistics_tab">
            <a-table
                :rowKey="row => row.id"
                :columns="columns"
                :data-source="data"
                bordered
                :loading="loadShow"
                :pagination="pagination"
                :scroll="scrolls"
                @change="handleTableChange"
            >
            </a-table>
        </div>
    </div>
</template>

<script>
const columns = [
    {
        title: "学校代码",
        dataIndex: "schoolCode",
        key: "schoolCode",
        width: 100,
        fixed: "left",
        align: "center"
    },
    {
        title: "学校简称",
        dataIndex: "schoolName",
        key: "schoolName",
        width: 120,
        fixed: "left",
        align: "center"
    },
    {
        title: "消耗总金额",
        dataIndex: "planPrice",
        key: "planPrice",
        width: 120,
        fixed: "left",
        align: "center"
    },
    {
        title: "即粮食类",
        children: [
            {
                title: "金额",
                dataIndex: "foodstuffPrice",
                key: "foodstuffPrice",
                width: 120,
                align: "center"
            },
            {
                title: "%",
                dataIndex: "foodstuffPercentage",
                key: "foodstuffPercentage",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "肉禽蛋类",
        children: [
            {
                title: "金额",
                dataIndex: "poultryPrice",
                key: "poultryPrice",
                width: 120,
                align: "center"
            },
            {
                title: "%",
                dataIndex: "poultryPercentage",
                key: "poultryPercentage",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "蔬菜瓜果类",
        children: [
            {
                title: "金额",
                dataIndex: "greensPrice",
                key: "greensPrice",
                width: 120,
                align: "center"
            },
            {
                title: "%",
                dataIndex: "greensPercentage",
                key: "greensPercentage",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "油盐辅料类",
        children: [
            {
                title: "金额",
                dataIndex: "accessoriesPrice",
                key: "accessoriesPrice",
                width: 120,
                align: "center"
            },
            {
                title: "%",
                dataIndex: "accessoriesPercentage",
                key: "accessoriesPercentage",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "幼儿点心类",
        children: [
            {
                title: "金额",
                dataIndex: "dessertPrice",
                key: "dessertPrice",
                width: 120,
                align: "center"
            },
            {
                title: "%",
                dataIndex: "dessertPercentage",
                key: "dessertPercentage",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "其它类",
        children: [
            {
                title: "金额",
                dataIndex: "otherPrice",
                key: "otherPrice",
                width: 120,
                align: "center"
            },
            {
                title: "%",
                dataIndex: "otherPercentage",
                key: "otherPercentage",
                width: 120,
                align: "center"
            }
        ]
    }
];
const data = [
];
export default {
    data() {
        return {
            columns,
            data,
            schoolName: "",
            supplierName: "",
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
            loadShow: false,
            scrolls: {},
            status: true,
            yearList: [],
            yearVal: "",
            monthList:[
                {name:'全部',id:'0'},
                {name:'1月',id:'1'},
                {name:'2月',id:'2'},
                {name:'3月',id:'3'},
                {name:'4月',id:'4'},
                {name:'5月',id:'5'},
                {name:'6月',id:'6'},
                {name:'7月',id:'7'},
                {name:'8月',id:'8'},
                {name:'9月',id:'9'},
                {name:'10月',id:'10'},
                {name:'11月',id:'11'},
                {name:'12月',id:'12'},
            ],
            monthVal:'',
            semesterList: [],
            semester: "全部",
            semesterVal: "",
        };
    },
    created() {
        this.getList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName,this.supplierName);
        this.getYear();
    },
    methods: {
        // 年份选择
        yearChange(e) {
            this.pagination.current = 1;
            if (e == "全部") {
                this.yearVal = '';
                this.status = true;
                this.semester = "全部";
                this.semesterVal = "";
            } else {
                this.status = false;
                this.yearVal = e;
                this.getSemester(e);
            }
            this.getList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName,this.supplierName);
        },
        // 月份选择
        monthChange(e){
            this.pagination.current = 1;
            if(e == 0){
                this.monthVal = '';
            }else{
                this.monthVal = e;
            }
            this.getList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName,this.supplierName);
        },
        // 学期选择
        semesterChange(e) {
            this.pagination.current = 1;
            if(e == '全部'){
                this.semesterVal = '';
            }else{
                this.semesterVal = e;
            }
            this.getList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName,this.supplierName);
        },
        // 学校简称搜索
        handleSubmit() {
            this.getList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName,this.supplierName);
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
                    let arr = [{ semester: "全部",semester_text:'全部' }];
                    that.semesterList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            // this.getAllStudents()
            this.getList(this.schoolName);
        },
        // 列表数据
        getList(year, semester, month, schoolName,supplierName) {
            this.loadShow = true;
            let that = this;
            let data = {
                url: "/school/schoolFood",
                method: "post",
                data: {
                    year: year,
                    semester: semester,
                    month: month,
                    search_school: schoolName,
                    search_supplier: supplierName,
                     page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                that.pagination.total = res.data.data.total_count;
                if (res.data.code == 1) {
                    //    that.$message.success(res.data.msg);
                    //    that.getList();
                    // that.scrolls={x: 1400} type_count
                    let arr = [];
                    if (res.data.data.list.length > 0) {
                        if (parseInt(res.data.data.type_count) < 5) {
                            that.scrolls = {};
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
                                    width: 120,
                                    align: "center"
                                },
                                {
                                    title: "消耗总金额",
                                    dataIndex: "out_total_count",
                                    key: "out_total_count",
                                    width: 120,
                                    align: "center"
                                }
                            ];
                        } else {
                            that.scrolls = { x: 1400 };
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
                                    width: 120,
                                    fixed: "left",
                                    align: "center"
                                },
                                {
                                    title: "消耗总金额",
                                    dataIndex: "out_total_count",
                                    key: "out_total_count",
                                    width: 120,
                                    fixed: "left",
                                    align: "center"
                                }
                            ];
                        }
                        if (res.data.data.list[0].list.length > 0) {
                            res.data.data.list[0].list.forEach((item, i) => {
                                let arr1 = [
                                    {
                                        title: item.name,
                                        children: [
                                            {
                                                title: "金额",
                                                dataIndex:
                                                    "out_son_count" + (i + 1),
                                                key: "out_son_count" + (i + 1),
                                                width: 120,
                                                align: "center"
                                            },
                                            {
                                                title: "%",
                                                dataIndex:
                                                    "out_son_ratio" + (i + 1),
                                                key: "out_son_ratio" + (i + 1),
                                                width: 120,
                                                align: "center"
                                            }
                                        ]
                                    }
                                ];
                                arr = arr.concat(arr1);
                            });
                            that.columns = arr;

                            res.data.data.list.forEach(item => {
                                item.key = item.id;
                                item.list.forEach((itemChild, i) => {
                                    item["out_son_count" + (i + 1)] =
                                        itemChild.out_son_count;
                                    item["out_son_ratio" + (i + 1)] =
                                        itemChild.out_son_ratio;
                                });
                            });
                        }

                        that.data = res.data.data.list;
                    } else {
                        that.columns = [];
                        that.data = [];
                        that.scrolls={};
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
#FoodConsumeStructureStatistics {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.FoodConsumeStructureStatistics_title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
}
.FoodConsumeStructureStatistics_box {
    margin-top: 20px;
    display: flex;
    align-items: center;
}
.FoodConsumeStructureStatistics_box_item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
}
.FoodConsumeStructureStatistics_tab {
    margin-top: 50px;
}
</style>