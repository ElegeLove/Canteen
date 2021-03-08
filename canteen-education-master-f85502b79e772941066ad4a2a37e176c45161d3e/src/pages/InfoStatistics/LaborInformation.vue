<template>
    <div id="LaborInformation">
        <!-- 搜索框 -->
        <div class="RecipeQuery_box_item">
            <div>&emsp;&emsp;学校：</div>
            <a-input
                type="text"
                style="width:240px;height:34px;"
                v-model="schoolName"
                placeholder="学校简称/代码"
            />
            <div class="mx_btnbg" @click="handleSubmit">搜索</div>
        </div>
        <div class="RecipeQuery_box">
            <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;年份：</div>
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
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :data-source="data"
            :loading="loadShows"
            bordered
            :pagination="pagination"
            @change="handleTableChange"
            :scroll="scrollVal"
        >
            <template
                style="display: flex;justify-content: space-around;"
                v-for="col in ['labour_credit_code_image', 'labour_licence_image']"
                :slot="col"
                slot-scope="text"
            >
                <div :key="col">
                    <viewer>
                        <img class="tabImg" :src="text" v-lazy="text" />
                    </viewer>
                </div>
                
            </template>
            <template slot="id_card_img" slot-scope="text">
                <div
                    style="display:flex;justify-content:space-around;align-items: center;"
                >
                    <viewer :images="text">
                        <img class="tabImg cardTabImg" v-for="(item, index) in text" :key="index" :src="item" v-lazy="item" />
                    </viewer>
                </div>
            </template>
            <template slot="labour_total_count" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="budgetTable(record.school_id)">{{ text }}</div>
                </div>
            </template>
        </a-table>
        <a-modal
            v-model="visible"
            width="80%"
            title="食堂劳务人员信息"
            :centered="true"
        >
            <div>
                <a-table
                    :rowKey="row => row.id"
                    :columns="modelColumns"
                    :data-source="modelData"
                    bordered
                    :loading="loadShowMol"
                    :pagination="false"
                >
                    <template
                        style="display: flex;justify-content: space-around;"
                        slot="health_certificate_image"
                        slot-scope="text"
                    >
                        <img class="tabImg" :src="text" v-lazy="text" />
                    </template>
                </a-table>
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
    </div>
</template>

<script>
const columnsVal = [
    {
        title: "学校代码",
        dataIndex: "school_code",
        key: "school_code",
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
        title: "劳务人员总数",
        dataIndex: "labour_total_count",
        key: "labour_total_count",
        width: 150,
        fixed: "left",
        align: "center",
        scopedSlots: { customRender: "labour_total_count" }
    },
    {
        title: "上年度劳务支出",
        children: [
            {
                title: "年度总额",
                dataIndex: "last_year_total_money",
                key: "last_year_total_money",
                width: 100,
                align: "center"
            },
            {
                title: "人均年工资",
                dataIndex: "last_year_wages",
                key: "last_year_wages",
                width: 120,
                align: "center"
            },
            {
                title: "人均年社保",
                dataIndex: "last_year_social",
                key: "last_year_social",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "劳务方式",
        dataIndex: "labour_type",
        key: "labour_type",
        width: 100,
        align: "center"
    },
    {
        title: "劳务服务商",
        children: [
            {
                title: "名称",
                dataIndex: "labour_service",
                key: "labour_service",
                width: 120,
                align: "center"
            },
            {
                title: "信用代码编号",
                dataIndex: "labour_credit_code",
                key: "labour_credit_code",
                width: 180,
                align: "center",
            },
            {
                title: "信用代码图片",
                dataIndex: "labour_credit_code_image",
                key: "labour_credit_code_image",
                width: 180,
                align: "center",
                scopedSlots: { customRender: "labour_credit_code_image" }
            },
            {
                title: "许可证编号",
                dataIndex: "labour_licence",
                key: "labour_licence",
                width: 180,
                align: "center",
            },
            {
                title: "许可证图片",
                dataIndex: "labour_licence_image",
                key: "labour_licence_image",
                width: 180,
                align: "center",
                scopedSlots: { customRender: "labour_licence_image" }
            }
        ]
    },
    {
        title: "服务商法定代表人信息",
        children: [
            {
                title: "姓名",
                dataIndex: "legal_person",
                key: "legal_person",
                width: 100,
                align: "center"
            },
            {
                title: "身份证号",
                dataIndex: "legal_person_id_card",
                key: "legal_person_id_card",
                width: 180,
                align: "center",
            },
            {
                title: "身份证图片",
                dataIndex: "id_card_img",
                key: "id_card_img",
                width: 280,
                align: "center",
                scopedSlots: { customRender: "id_card_img" }
            },
            {
                title: "家庭住址",
                dataIndex: "legal_person_address",
                key: "legal_person_address",
                width: 150,
                align: "center"
            },
            {
                title: "手机号",
                dataIndex: "legal_person_phone",
                key: "legal_person_phone",
                width: 120,
                align: "center"
            }
        ]
    }
];
const data = [
];
const columnMolVal = [
    {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: "10%",
        align: "center"
    },
    {
        title: "性别",
        dataIndex: "sex",
        key: "sex",
        width: "10%",
        align: "center"
    },
    {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        width: "10%",
        align: "center"
    },
    {
        title: "身份证号",
        dataIndex: "id_card",
        key: "id_card",
        width: "10%",
        align: "center"
    },
    {
        title: "健康证号（扫描上传）",
        dataIndex: "health_certificate_image",
        key: "health_certificate_image",
        width: "10%",
        align: "center",
        scopedSlots: { customRender: "health_certificate_image" }
    },
    {
        title: "健康证到期日期",
        dataIndex: "health_certificate_time",
        key: "health_certificate_time",
        width: "13%",
        align: "center"
    },
    {
        title: "身份证地址",
        dataIndex: "id_card_address",
        key: "id_card_address",
        width: "10%",
        align: "center"
    },
    {
        title: "实际家庭住址",
        dataIndex: "address",
        key: "address",
        width: "14%",
        align: "center"
    },
    {
        title: "手机号",
        dataIndex: "mobile",
        key: "mobile",
        width: "13%",
        align: "center"
    },
];
const modelData = [
];
export default {
    data() {
        return {
            data,
            columns:[],
            columnsVal,
            schoolName: "",
            scrollVal: {},
            loadShows: false,
            status: true,
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
            loadShowMol: false,
            modelColumns:[],
            columnMolVal,
            modelData
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
                url: "/information/labour",
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
                    // let arr = [{ semester: "全部", semester_text: "全部" }];
                    // that.semesterList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 劳务人员信息
        budgetTable(i) {
            // this.schoolId = i;
            this.getLaborInfo(i);
            this.visible = true;
        },
        // 获取劳务人员信息
        getLaborInfo(id){
            this.loadShowMol = true;
            let that = this;
            let data = {
                url: "/information/labourList",
                method: "post",
                data: {
                    school_id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShowMol = false;
                if (res.data.code == 1) {
                    that.modelData = res.data.data;
                    if (res.data.data.length > 0) {
                        that.modelColumns = that.columnMolVal;
                    } else {
                        that.modelColumns = [];
                    }
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 关闭弹窗
        handleOk() {
            this.visible = false;
        }
    }
};
</script>

<style scoped>
#LaborInformation {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
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
    /* margin-right: 30px; */
    color: #02bb72;
    cursor: pointer;
}
.tabImg {
    width: 110px;
    height: 60px;
    object-fit: contain;
}
.cardTabImg{
    margin: 0 10px 10px 0;
}
.cardTabImg:last-child{
    margin-right: 0;
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
</style>