<template>
    <div id="BookSubscription">
        <div class="RecipeQuery_title">
            义务教育学生作业本征订统计
        </div>
        <!-- 搜索框 -->
        <div class="RecipeQuery_box_item">
            <div>学校简称：</div>
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
                <div>所需年份：</div>
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
                <div>所需学期：</div>
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
        <div class="export_box">
            <div @click="exportData">导出</div>
        </div>
        <!-- :row-selection="rowSelection" -->
        <a-table
            :rowKey="row => row.id"
            :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
                getCheckboxProps: getCheckboxProps
            }"
            :columns="columns"
            :data-source="data"
            bordered
            :pagination="pagination"
            :scroll="scrollVal"
            :loading="loadShows"
            @change="handleTableChange"
        >
            <template
                style="display: flex;justify-content: space-around;"
                v-for="col in [
                    'create_time',
                    'user_name',
                    'status_text',
                    'school_phone'
                ]"
                :slot="col"
                slot-scope="text, record"
            >
                <!-- <img :key="col" v-lazy="text" class="tabImg" /> -->
                <div :key="col">
                    {{ record.is_total == 1 ? "--" : text }}
                </div>
            </template>
        </a-table>
    </div>
</template>

<script>
const columnsVal = [
    {
        title: "学校代码",
        dataIndex: "code",
        key: "code",
        width: 100,
        fixed: "left",
        align: "center",
        scopedSlots: { customRender: "code" },
        customRender: (value, row, index) => {
            const obj = {
                children: value,
                attrs: {}
            };
            if (row.is_total == 1) {
                obj.attrs.colSpan = 2;
            } else {
                obj.attrs.colSpan = 1;
            }
            return obj;
        }
    },
    {
        title: "学校简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: 120,
        fixed: "left",
        align: "center",
        scopedSlots: { customRender: "abbreviation" },
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
        title: "学生数",
        children: [
            {
                title: "小学",
                dataIndex: "pupil_count",
                key: "pupil_count",
                width: 100,
                align: "center"
            },
            {
                title: "初中",
                dataIndex: "junior_count",
                key: "junior_count",
                width: 100,
                align: "center"
            }
        ]
    },
    {
        title: "大本子数量",
        children: [
            {
                title: "小计",
                dataIndex: "big_total_count",
                key: "big_total_count",
                width: 100,
                align: "center"
            },
            {
                title: "作业本",
                dataIndex: "big_work_book",
                key: "big_work_book",
                width: 100,
                align: "center"
            },
            {
                title: "数学本",
                dataIndex: "big_math_book",
                key: "big_math_book",
                width: 100,
                align: "center"
            },
            {
                title: "作文本",
                dataIndex: "big_composition_book",
                key: "big_composition_book",
                width: 100,
                align: "center"
            },
            {
                title: "大字本",
                dataIndex: "big_word_book",
                key: "big_word_book",
                width: 100,
                align: "center"
            },
            {
                title: "图画本",
                dataIndex: "big_picture_book",
                key: "big_picture_book",
                width: 100,
                align: "center"
            },
            {
                title: "英语本",
                dataIndex: "big_english_book",
                key: "big_english_book",
                width: 100,
                align: "center"
            }
        ]
    },
    {
        title: "小本子数量",
        children: [
            {
                title: "小计",
                dataIndex: "small_total_count",
                key: "small_total_count",
                width: 100,
                align: "center"
            },
            {
                title: "拼音本",
                dataIndex: "small_abc_book",
                key: "small_abc_book",
                width: 100,
                align: "center"
            },
            {
                title: "拼习本",
                dataIndex: "small_practice_book",
                key: "small_practice_book",
                width: 100,
                align: "center"
            },
            {
                title: "习字本",
                dataIndex: "small_writing_book",
                key: "small_writing_book",
                width: 100,
                align: "center"
            },
            {
                title: "小字体",
                dataIndex: "small_word_book",
                key: "small_word_book",
                width: 100,
                align: "center"
            },
            {
                title: "数学本",
                dataIndex: "small_math_book",
                key: "small_math_book",
                width: 100,
                align: "center"
            },
            {
                title: "作业本",
                dataIndex: "small_work_book",
                key: "small_work_book",
                width: 100,
                align: "center"
            },
            {
                title: "作文本",
                dataIndex: "small_composition_book",
                key: "small_composition_book",
                width: 100,
                align: "center"
            },
            {
                title: "图画本",
                dataIndex: "small_picture_book",
                key: "small_picture_book",
                width: 100,
                align: "center"
            }
        ]
    },
    {
        title: "作业本大本总数",
        dataIndex: "all_total_count",
        key: "all_total_count",
        width: 240,
        align: "center"
    },
    {
        title: "上报时间",
        dataIndex: "create_time",
        key: "create_time",
        width: 240,
        align: "center",
        scopedSlots: { customRender: "create_time" }
    },
    {
        title: "填报人",
        dataIndex: "user_name",
        key: "user_name",
        width: 240,
        align: "center",
        scopedSlots: { customRender: "user_name" }
    },
    {
        title: "联系电话",
        dataIndex: "phone",
        key: "phone",
        width: 240,
        align: "center",
        scopedSlots: { customRender: "status_text" }
    },
    {
        title: "学校收货人联系电话",
        dataIndex: "school_phone",
        key: "school_phone",
        width: 240,
        align: "center",
        scopedSlots: { customRender: "school_phone" }
    }
];
const data = [
    // {
    //     key: "1",
    //     schoolCode: "合计",
    //     name: "",
    //     primarySchoolNum: "0",
    //     middleSchoolNum: "0",
    //     bigSubtotal: "0",
    //     bigExercise: "0",
    //     bigMathematics: "0",
    //     bigCompositions: "0",
    //     bigBigCharacters: "0",
    //     bigPicture: "0",
    //     bigEnglish: "0",
    //     smallSubtotal: "0",
    //     smallPinyin: "0",
    //     smallSpelling: "0",
    //     smallWriting: "0",
    //     smallSmallFont: "0",
    //     smallMathematics: "0",
    //     smallTask: "0",
    //     smallComposition: "0",
    //     smallPicture: "0",
    //     bigTotal: "0",
    //     reportingTime: "--",
    //     filledBy: "--",
    //     phone: "--",
    //     consigneePhone: "--"
    // },
    // {
    //     key: "2",
    //     schoolCode: "001",
    //     name: "某某学校",
    //     primarySchoolNum: "0",
    //     middleSchoolNum: "0",
    //     bigSubtotal: "0",
    //     bigExercise: "0",
    //     bigMathematics: "0",
    //     bigCompositions: "0",
    //     bigBigCharacters: "0",
    //     bigPicture: "0",
    //     bigEnglish: "0",
    //     smallSubtotal: "0",
    //     smallPinyin: "0",
    //     smallSpelling: "0",
    //     smallWriting: "0",
    //     smallSmallFont: "0",
    //     smallMathematics: "0",
    //     smallTask: "0",
    //     smallComposition: "0",
    //     smallPicture: "0",
    //     bigTotal: "0",
    //     reportingTime: "2020-8-5 19:44:59",
    //     filledBy: "李四",
    //     phone: "18580455555",
    //     consigneePhone: "18580455555"
    // }
];
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
            selectedRowKeys: [],
            scrollVal: {},
            selKey: []
        };
    },
    created() {
        this.getYear();
        this.getList(this.schoolName, this.yearVal, this.semesterVal);
    },
    computed: {
        
        // rowSelection() {
        //     return {
        //         onChange: (selectedRowKeys, selectedRows) => {
        //             // console.log(selectedRows);
        //             this.selKey = selectedRowKeys;
        //             // if(selectedRowKeys.length > 0){
        //             //     this.selKey = selectedRowKeys.join(',');
        //             // }else{
        //             //     this.selKey = '';
        //             // }
        //         },
        //         getCheckboxProps: (record, index) => ({
        //             props: {
        //                 disabled: record.is_total == "1" // Column configuration not to be checked
        //                 // schoolCode: '合计'
        //             }
        //         })
        //     };
        // }
    },
    methods: {
        getCheckboxProps(record) {
            return {
                props: {
                    disabled: record.is_total == "1",
                    role: record.role
                }
            };
        },
        // 学校简称搜索
        handleSubmit() {
            this.getList(this.schoolName, this.yearVal, this.semesterVal);
            this.selKey = [];
            this.selectedRowKeys = [];
        },
        // 年份选择
        yearChange(e) {
            this.selKey = [];
            this.selectedRowKeys = [];
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
            this.selKey = [];
            this.selectedRowKeys = [];
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
        // 选中
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
            this.selKey = selectedRowKeys;
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
                url: "/school/book",
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
        // 导出
        exportData() {
            if (this.selKey.length > 0) {
                if (this.semester == "全部") {
                    this.$message.error("请筛选学期后再导出！");
                    return;
                }
                location.href =
                    this.$globalApi +
                    "/api/export/bookExport?ids=" +
                    this.selKey +
                    "&year=" +
                    this.yearVal +
                    "&semester=" +
                    this.semesterVal;
            } else {
                this.$message.error("请选择需要导出的内容！");
            }
            // let that = this;
            // let data = {
            //     url: "/export/bookExport",
            //     method: "post",
            //     data: {
            //         ids: this.selKey,
            //         year:this.yearVal,
            //         semester:this.semesterVal,
            //     }
            // };
            // this.$apiAxiox(data).then(res => {
            //     if (res.data.code == 1) {
            //         // that.villageSchoolList = res.data.data;
            //         // that.villageSchoolVal = res.data.data[0].id;
            //         if (res.data.data.url == "") {
            //             that.$message.error("没有导出内容！");
            //         } else {
            //             // let a = document.createElement("a");
            //             // a.href = res.data.data.url;
            //             // a.download = fileName;
            //             // a.click();
            //             location.href = res.data.data.url;

            //         }
            //     } else {
            //         that.$message.error(res.data.msg);
            //     }
            // });
        }
    }
};
</script>

<style scoped>
#BookSubscription {
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
.export_box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}
.export_box div {
    width: 62px;
    height: 34px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #02bb72;
    color: #ffffff;
    cursor: pointer;
}
</style>