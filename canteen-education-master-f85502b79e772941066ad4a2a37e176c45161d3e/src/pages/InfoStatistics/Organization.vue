<template>
    <div id="Organization">
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
            <!-- <template slot="principal" slot-scope="text, record, index">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                </div>
            </template> -->
            <template
                v-for="(col1, ix) in [
                    'principal',
                    'vice_principal',
                    'middle_cadres',
                    'canteen_man',
                    'food_security',
                    'accounting',
                    'cashier',
                    'storekeeper',
                    'buyer'
                ]"
                :slot="col1"
                slot-scope="text"
            >
                <div :key="col1" @click="publicityMol(text)" class="eyeshow">
                    {{ text.name }}
                    <!-- <a-icon type="eye" /> -->
                </div>
            </template>
            <template
                v-for="(col, ix1) in [
                    'committee',
                    'parentCommittee',
                    'cateringCommittee',
                    'securityGroup',
                    'reformGroup',
                    'procurement'
                ]"
                :slot="col"
                slot-scope="text, record"
            >
                <div
                    :key="col"
                    class="eyeshow"
                    @click="publicityForm(record.id, ix1)"
                >
                    <a-icon type="eye" />
                </div>
            </template>
        </a-table>
        <a-modal
            v-model="visibleInfo"
            width="40%"
            title="基本信息"
            :centered="true"
        >
            <div class="visibleInfo_box">
                <div>
                    <img v-lazy="modelVal.image" alt="" />
                    <div>
                        <div>{{ modelVal.position }}</div>
                        <div>姓名：{{ modelVal.name }}</div>
                        <div>电话：{{ modelVal.phone }}</div>
                    </div>
                </div>
            </div>
            <template slot="footer">
                <div class="model_footer">
                    <a-button
                        key="submit"
                        class="model_footer_btn"
                        @click="
                            () => {
                                visibleInfo = false;
                            }
                        "
                    >
                        关闭
                    </a-button>
                </div>
            </template>
        </a-modal>
        <a-modal
            v-model="visible"
            width="40%"
            :title="molTitle"
            :centered="true"
        >
            <div>
                <a-table
                    :rowKey="row => row.id"
                    :columns="modelColumns"
                    bordered
                    :data-source="modelData"
                    :pagination="false"
                >
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
        title: "校长",
        dataIndex: "principal",
        key: "principal",
        width: 120,
        fixed: "left",
        align: "center",
        scopedSlots: { customRender: "principal" }
    },
    {
        title: "分管副校长",
        dataIndex: "vice_principal",
        key: "vice_principal",
        width: 120,
        fixed: "left",
        align: "center",
        scopedSlots: { customRender: "vice_principal" }
    },
    {
        title: "分管中层干部",
        dataIndex: "middle_cadres",
        key: "middle_cadres",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "middle_cadres" }
    },
    {
        title: "食堂负责人",
        dataIndex: "canteen_man",
        key: "canteen_man",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "canteen_man" }
    },
    {
        title: "食品安全管理员",
        dataIndex: "food_security",
        key: "food_security",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "food_security" }
    },
    {
        title: "会计",
        dataIndex: "accounting",
        key: "accounting",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "accounting" }
    },
    {
        title: "出纳",
        dataIndex: "cashier",
        key: "cashier",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "cashier" }
    },
    {
        title: "库管员",
        dataIndex: "storekeeper",
        key: "storekeeper",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "storekeeper" }
    },
    {
        title: "采购员",
        dataIndex: "buyer",
        key: "buyer",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "buyer" }
    },
    {
        title: "监委会",
        dataIndex: "committee",
        key: "committee",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "committee" }
    },
    {
        title: "家长委员会",
        dataIndex: "parentCommittee",
        key: "parentCommittee",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "parentCommittee" }
    },
    {
        title: "膳食委员会",
        dataIndex: "cateringCommittee",
        key: "cateringCommittee",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "cateringCommittee" }
    },
    {
        title: "食品安全领导小组",
        dataIndex: "securityGroup",
        key: "securityGroup",
        width: 150,
        align: "center",
        scopedSlots: { customRender: "securityGroup" }
    },
    {
        title: "营改领导小组",
        dataIndex: "reformGroup",
        key: "reformGroup",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "reformGroup" }
    },
    {
        title: "食品采购小组",
        dataIndex: "procurement",
        key: "procurement",
        width: 120,
        align: "center",
        scopedSlots: { customRender: "procurement" }
    }
];
const data = [];
const modelColumns = [
    {
        title: "岗位",
        dataIndex: "position",
        key: "position",
        width: "30%",
        align: "center"
    },
    {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: "30%",
        align: "center"
    },
    {
        title: "电话",
        dataIndex: "phone",
        key: "phone",
        width: "40%",
        align: "center"
    }
];
const modelData = [];
export default {
    data() {
        return {
            data,
            columns: [],
            columnsVal,
            schoolName: "",
            loadShows: false,
            scrollVal: {},
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
            visibleInfo: false,
            modelVal: {},
            molTitle: "",
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
            // console.log(this.unitAbbreviation);
            this.pagination.current = 1;
            this.getList(this.schoolName, this.yearVal, this.semesterVal);
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
            // this.getList(this.schoolName,this.yearVal,this.semesterVal,this.mouthVal);
        },
        // 获取列表数据
        getList(search, year, semester) {
            this.loadShows = true;
            let that = this;
            let data = {
                url: "/information/organization",
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
        // 公示表
        publicityForm(id, i) {
            if (i == "0") {
                this.molTitle = "查看监委会成员";
            } else if (i == "1") {
                this.molTitle = "查看家长委员会成员";
            } else if (i == "2") {
                this.molTitle = "查看膳食委员会成员";
            } else if (i == "3") {
                this.molTitle = "查看食品安全领导小组成员";
            } else if (i == "4") {
                this.molTitle = "查看营改领导小组成员";
            } else {
                this.molTitle = "查看食品采购小组成员";
            }
            let type = i + 2;
            let that = this;
            let data = {
                url: "/information/organizationDetail",
                method: "post",
                data: {
                    id: id,
                    type: type
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.loadShows = false;
                if (res.data.code == 1) {
                    if (res.data.data.length > 0) {
                        res.data.data.forEach((item, index) => {
                            item.id = index;
                        });
                    }
                    that.modelData = res.data.data;
                    that.visible = true;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        publicityMol(val) {
            this.visibleInfo = true;
            this.modelVal = val;
        },
        // 确认重置密码
        handleOk(e) {
            this.visible = false;
        }
    }
};
</script>

<style scoped>
#Organization {
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
.eyeshow {
    color: #02bb72;
    cursor: pointer;
}
.visibleInfo_box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.visibleInfo_box > div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.visibleInfo_box > div > img {
    width: 130px;
    height: 130px;
    object-fit: contain;
    margin-right: 20px;
}
.visibleInfo_box > div > div {
    font-size: 20px;
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