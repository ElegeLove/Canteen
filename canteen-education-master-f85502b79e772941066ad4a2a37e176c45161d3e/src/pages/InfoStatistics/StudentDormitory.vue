<template>
    <div id="StudentDormitory">
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
            bordered
            :pagination="pagination"
            :loading="loadShows"
            @change="handleTableChange"
            :scroll="scrollVal"
        >
            <template slot="boy_is_hot" slot-scope="text">
                <div>{{text==1?'有':'没有'}}</div>
            </template>
            <template slot="girl_is_hot" slot-scope="text">
                <div>{{text==1?'有':'没有'}}</div>
            </template>
            <!-- <template slot="contractWorkers" slot-scope="text, record, index">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="budgetTable(index)">{{ text }}</div>
                </div>
            </template> -->
        </a-table>
        <a-modal
            v-model="visible"
            width="80%"
            title="食堂劳务人员信息"
            :centered="true"
        >
            <div>
                <a-table
                    :columns="modelColumns"
                    bordered
                    :data-source="modelData"
                    :pagination="false"
                >
                    <template
                        style="display: flex;justify-content: space-around;"
                        slot="healthNum"
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
const columnsData = [
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
        title: "寄宿人数",
        children: [
            {
                title: "总数",
                dataIndex: "total_count",
                key: "total_count",
                width: 100,
                align: "center"
            },
            {
                title: "男生",
                dataIndex: "boy_count",
                key: "boy_count",
                width: 120,
                align: "center"
            },
            {
                title: "女生",
                dataIndex: "girl_count",
                key: "girl_count",
                width: 120,
                align: "center"
            }
        ]
    },
    {
        title: "男生寝室",
        children: [
            {
                title: "栋数",
                dataIndex: "boy_tung_count",
                key: "boy_tung_count",
                width: 120,
                align: "center"
            },
            {
                title: "间数",
                dataIndex: "boy_room_count",
                key: "boy_room_count",
                width: 180,
                align: "center"
            },
            {
                title: "床位数",
                dataIndex: "boy_bed_count",
                key: "boy_bed_count",
                width: 180,
                align: "center"
            },
            {
                title: "淋浴间数",
                dataIndex: "boy_shower_count",
                key: "boy_shower_count",
                width: 180,
                align: "center"
            },
            {
                title: "是否有热水",
                dataIndex: "boy_is_hot",
                key: "boy_is_hot",
                width: 180,
                align: "center",
                scopedSlots: { customRender: "boy_is_hot" }
            },
            {
                title: "管理员人数",
                dataIndex: "boy_admin_count",
                key: "boy_admin_count",
                width: 180,
                align: "center"
            }
        ]
    },
    {
        title: "女生寝室",
        children: [
            {
                title: "栋数",
                dataIndex: "girl_tung_count",
                key: "girl_tung_count",
                width: 120,
                align: "center"
            },
            {
                title: "间数",
                dataIndex: "girl_room_count",
                key: "girl_room_count",
                width: 180,
                align: "center"
            },
            {
                title: "床位数",
                dataIndex: "girl_bed_count",
                key: "girl_bed_count",
                width: 180,
                align: "center"
            },
            {
                title: "淋浴间数",
                dataIndex: "girl_shower_count",
                key: "girl_shower_count",
                width: 180,
                align: "center"
            },
            {
                title: "是否有热水",
                dataIndex: "girl_is_hot",
                key: "girl_is_hot",
                width: 180,
                align: "center",
                scopedSlots: { customRender: "girl_is_hot" }
            },
            {
                title: "管理员人数",
                dataIndex: "girl_admin_count",
                key: "girl_admin_count",
                width: 180,
                align: "center"
            }
        ]
    }
];
const data = [
];
const modelColumns = [
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
        dataIndex: "IDcardNum",
        key: "IDcardNum",
        width: "10%",
        align: "center"
    },
    {
        title: "健康证号（扫描上传）",
        dataIndex: "healthNum",
        key: "healthNum",
        width: "10%",
        align: "center",
        scopedSlots: { customRender: "healthNum" }
    },
    {
        title: "健康证到期日期",
        dataIndex: "dueDate",
        key: "dueDate",
        width: "10%",
        align: "center"
    },
    {
        title: "身份证地址",
        dataIndex: "IDcardAddress",
        key: "IDcardAddress",
        width: "10%",
        align: "center"
    },
    {
        title: "实际家庭住址",
        dataIndex: "homeAddress",
        key: "homeAddress",
        width: "10%",
        align: "center"
    },
    {
        title: "手机号",
        dataIndex: "phoneNum",
        key: "phoneNum",
        width: "10%",
        align: "center"
    },
    {
        title: "备注",
        dataIndex: "remarks",
        key: "remarks",
        width: "10%",
        align: "center"
    }
];
const modelData = [
    {
        key: "1",
        name: "0031",
        sex: "男",
        age: "46",
        IDcardNum: "500222000000000000",
        healthNum:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1614844013,1715687448&fm=15&gp=0.jpg",
        dueDate: "2020年8月9日",
        IDcardAddress: "重庆市某某地区",
        homeAddress: "重庆市某某地区",
        phoneNum: "18500000000",
        remarks: "备注"
    },
    {
        key: "2",
        name: "0056",
        sex: "男",
        age: "46",
        IDcardNum: "500222000000000000",
        healthNum:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1614844013,1715687448&fm=15&gp=0.jpg",
        dueDate: "2020年8月9日",
        IDcardAddress: "重庆市某某地区",
        homeAddress: "重庆市某某地区",
        phoneNum: "18500000000",
        remarks: "备注"
    },
    {
        key: "3",
        name: "0089",
        sex: "女",
        age: "46",
        IDcardNum: "500222000000000000",
        healthNum:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1614844013,1715687448&fm=15&gp=0.jpg",
        dueDate: "2020年8月9日",
        IDcardAddress: "重庆市某某地区",
        homeAddress: "重庆市某某地区",
        phoneNum: "18500000000",
        remarks: "备注"
    },
    {
        key: "4",
        name: "0054",
        sex: "男",
        age: "46",
        IDcardNum: "500222000000000000",
        healthNum:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1614844013,1715687448&fm=15&gp=0.jpg",
        dueDate: "2020年8月9日",
        IDcardAddress: "重庆市某某地区",
        homeAddress: "重庆市某某地区",
        phoneNum: "18500000000",
        remarks: "备注"
    }
];
export default {
    data() {
        return {
            data,
            columns:[],
            columnsData,
            scrollVal:{},
            schoolName: "",
            status: true,
            loadShows:false,
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
            modelColumns,
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
            this.pagination.current = 1;
            // console.log(this.unitAbbreviation);
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
                url: "/information/dorm",
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
                    if(res.data.data.list.length > 0){
                        that.columns=that.columnsData;
                        that.scrollVal = { x: 1400 };
                    }else{
                        that.columns=[];
                        that.scrollVal = {};
                    }
                    // let arr = [{ semester: "全部", semester_text: "全部" }];
                    // that.semesterList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 查看村校
        budgetTable(i) {
            this.visible = true;
        },
        // 关闭弹窗
        handleOk() {
            this.visible = false;
        }
    }
};
</script>

<style scoped>
#StudentDormitory {
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
    object-fit: cover;
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