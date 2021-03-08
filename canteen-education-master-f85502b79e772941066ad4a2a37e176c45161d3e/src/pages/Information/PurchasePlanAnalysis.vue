<template>
    <div id="PurchasePlanAnalysis">
        <div class="PurchasePlanAnalysis_title">
            <!-- 学校食堂及原辅材料采购计划执行情况分析（{{dataVal.year}}年{{dataVal.semester}}学期{{dataVal.week}}月） -->学校食堂食品及原辅材料采购计划执行情况分析
        </div>
        <div class="PurchasePlanAnalysis_box">
            <div class="PurchasePlanAnalysis_box_item">
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
            <div class="PurchasePlanAnalysis_box_item">
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
            <div class="PurchasePlanAnalysis_box_item">
                <div>月份：</div>
                <a-select
                    placeholder="请选择"
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
                        placeholder="学校简称/代码"
                    />
                </span>
            </a-form-item>
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
        <div class="PurchasePlanAnalysis_tagging">
            注：①占比是入库金额与计划采购金额的比；②占比是出库金额与入库金额的比。
        </div>
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :data-source="data"
            :loading="loadShow"
            :pagination="pagination"
            @change="handleTableChange"
        >
        </a-table>
    </div>
</template>

<script>
const columns = [
    {
        title: "学校代码",
        dataIndex: "code",
        key: "code",
        width: "10%",
        align: "center"
    },
    {
        title: "学校简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: "10%",
        align: "center"
    },
    {
        title: "计划采购金额",
        dataIndex: "order_money",
        key: "order_money",
        width: "20%",
        align: "center"
    },
    {
        title: "入库金额",
        dataIndex: "add_money",
        key: "add_money",
        width: "20%",
        align: "center"
    },
    {
        title: "①占比%",
        dataIndex: "add_ratio",
        key: "add_ratio",
        width: "10%",
        align: "center"
    },
    {
        title: "出库金额",
        dataIndex: "out_money",
        key: "out_money",
        width: "20%",
        align: "center"
    },
    {
        title: "②占比%",
        dataIndex: "out_ratio",
        key: "out_ratio",
        width: "10%",
        align: "center"
    }
];
const data = [
    // {
    //     key: "1",
    //     schoolCode: "0031",
    //     schoolName: "某某供应商",
    //     planPrice: "15,120.00",
    //     warehousingPrice: "1,240.00",
    //     proportion: "12%",
    //     deliveryPrice: "1,240.00",
    //     proportions: "12%"
    // },
];
export default {
    data() {
        return {
            columns,
            data,
            schoolName: "",
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
            dataVal:{
                year:'',
                week:'',
                semester:'',
            }
        };
    },
    created() {
        this.getDataList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName);
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
            this.getDataList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName);
        },
        // 月份选择
        monthChange(e){
            this.pagination.current = 1;
            if(e == 0){
                this.monthVal = '';
            }else{
                this.monthVal = e;
            }
            this.getDataList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName);
        },
        // 学期选择
        semesterChange(e) {
            this.pagination.current = 1;
            if(e == '全部'){
                this.semesterVal = '';
            }else{
                this.semesterVal = e;
            }
            this.getDataList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName);
        },
        // 学校简称搜索
        handleSubmit() {
            // console.log(this.schoolName);
            this.pagination.current = 1;
            this.getDataList(this.yearVal, this.semesterVal, this.monthVal, this.schoolName);
        },
        // 学校类型
        handleChange(value) {
            console.log(`Selected: ${value}`);
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
            let year = "";
            let semester = "";
            let month = "";
            if (this.yearVal != "全部") {
                year = this.yearVal;
            }
            this.getDataList(this.schoolName);
            this.getDataList(year, semester, month, this.schoolName);
        },
        getDataList(year, semester, month, schoolName) {
            let that = this;
            that.loadShow = true;
            let data = {
                url: "/school/procurement",
                method: "post",
                data: {
                    year: year,
                    semester: semester,
                    month: month,
                    search_name: schoolName,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                that.loadShow = false;
                if (res.data.code == 1) {
                    res.data.data.list.forEach(item => {
                        item.key = item.id;
                    });
                    that.pagination.total = res.data.data.total_count;
                    that.data = res.data.data.list;
                    that.dataVal.year = res.data.data.year;
                    that.dataVal.week = res.data.data.week;
                    that.dataVal.semester = res.data.data.semester;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#PurchasePlanAnalysis {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.PurchasePlanAnalysis_title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
}
.PurchasePlanAnalysis_box {
    margin-top: 20px;
    display: flex;
    align-items: center;
}
.PurchasePlanAnalysis_box_item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
}
.PurchasePlanAnalysis_tagging {
    margin: 40px 0;
}
</style>