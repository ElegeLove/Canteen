<template>
    <div id="WorkRecord">
        <div class="RecipeQuery_box">
            <div class="RecipeQuery_box_item">
                <div>&emsp;名称：</div>
                <a-input
                    type="text"
                    style="width:240px;height:34px;"
                    v-model="searchTitle"
                    placeholder="输入标题名称"
                />
            </div>
            <div class="RecipeQuery_box_item">
                <div>学校简称：</div>
                <a-input
                    type="text"
                    style="width:240px;height:34px;"
                    v-model="schoolName"
                    placeholder="输入学校简称/代码"
                />
                <div class="mx_btnbg" @click="handleSubmit">搜索</div>
            </div>
        </div>
        <div class="RecipeQuery_box">
            <div class="RecipeQuery_box_item">
                <div>&emsp;年份：</div>
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
                <div>学期：</div>
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
                        {{ item.semester }}
                    </a-select-option>
                </a-select>
            </div>
            <div class="RecipeQuery_box_item">
                <div>&emsp;月份：</div>
                <a-select
                    style="width:240px;height:34px;"
                    v-model="weekId"
                    @change="weekChange"
                >
                    <a-select-option v-for="item in weekList" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
            <div class="RecipeQuery_box_item">
                <div>&emsp;分类：</div>
                <a-select
                    style="width:240px;height:34px;"
                    v-model="classifyVal"
                    @change="classifyChange"
                >
                    <a-select-option v-for="item in classifyList" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
        </div>
        <a-table
            :rowKey="row => row.id"
            :columns="columns"
            :data-source="data"
            bordered
            :loading="loadShow"
            :pagination="pagination"
            @change="handleTableChange"
        >
            <template
                style="display: flex;justify-content: space-around;"
                slot="content"
                slot-scope="text"
            >
                <!-- <img class="tabImg" :src="text" v-lazy="text" /> -->
                <viewer>
                    <img class="tabImg" :src="text" v-lazy="text" />
                </viewer>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="feedbackMon(record.id)">监督反馈</div>
                    <!-- <div @click="publicityTable(record)">导出带量公示表</div> -->
                </div>
            </template>
        </a-table>
        <a-modal
            v-model="visible"
            width="50%"
            title="监督反馈"
            :centered="true"
            @ok="sureFeedback"
        >
            <div>
                <div>请填写内容</div>
                <div>
                    <a-textarea
                        class="inpArea"
                        v-model="feedbackVal"
                        :rows="5"
                    />
                </div>
            </div>
            <!-- <template slot="footer">
                <div class="model_footer">
                    <a-button
                        class="model_footer_btn"
                        @click="
                            () => {
                                visible = false;
                            }
                        "
                    >
                        取消
                    </a-button>
                    <a-button class="model_footer_btn" @click="sureFeedback">
                        确定
                    </a-button>
                </div>
            </template> -->
        </a-modal>
    </div>
</template>

<script>
const columns = [
    {
        title: "学校简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: "10%",
        align: "center"
    },
    {
        title: "学校代码",
        dataIndex: "code",
        key: "code",
        width: "10%",
        align: "center"
    },
    {
        title: "分类",
        dataIndex: "type",
        key: "type",
        width: "10%",
        align: "center"
    },
    {
        title: "标题",
        dataIndex: "title",
        key: "title",
        width: "10%",
        align: "center"
    },
    {
        title: "工作记录",
        dataIndex: "content",
        key: "content",
        width: "15%",
        align: "center",
        scopedSlots: { customRender: "content" }
    },
    {
        title: "监督反馈",
        dataIndex: "feedback",
        key: "feedback",
        width: "15%",
        align: "center"
    },
    {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
        width: "15%",
        align: "center"
    },
    {
        title: "操作",
        key: "operation",
        width: "15%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [];
export default {
    data() {
        return {
            data,
            columns,
            searchTitle: "",
            schoolName: "",
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
            status: true,
            loadShow: false,
            weekStatus: true,
            weekNums: 1,
            yearList: [],
            yearVal: "",
            semesterList: [],
            semesterId: "全部",
            semesterVal: "",
            weekList: [
                {name:'全部',id:''},
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
            weekId: "",
            weekVal: "",
            classifyList:[],
            classifyVal:'',
            feedbackVal:'',
            visible: false
        };
    },
    created() {
        this.getYear();
        this.getClass();
        this.getListVal(this.searchTitle,this.schoolName,this.yearVal,this.semesterVal,this.weekId,this.classifyVal);
    },
    methods: {
        // 年份选择
        yearChange(e) {
            this.pagination.current = 1;
            this.semesterId = "全部";
            this.semesterVal = "";
            if (e == "全部") {
                this.yearVal = "";
                this.status = true;
            } else {
                this.status = false;
                this.yearVal = e;
                this.getSemester(e);
            }
            this.getListVal(this.searchTitle,this.schoolName,this.yearVal,this.semesterVal,this.weekId,this.classifyVal);
        },
        // 学期选择
        semesterChange(e) {
            this.pagination.current = 1;
            let that = this;
            if (e == "全部") {
                this.semesterVal = "";
                this.semesterId = "全部";
            } else {
                this.semesterId = e;
                this.semesterList.forEach(item => {
                    if (item.id == e) {
                        that.semesterVal = item.semester;
                        return;
                    }
                });
            }
            this.getListVal(this.searchTitle,this.schoolName,this.yearVal,this.semesterVal,this.weekId,this.classifyVal);
        },
        // 月份选择
        weekChange(e) {
            this.pagination.current = 1;
            this.getListVal(this.searchTitle,this.schoolName,this.yearVal,this.semesterVal,this.weekId,this.classifyVal);
        },
        // 分类选择
        classifyChange(){
            this.getListVal(this.searchTitle,this.schoolName,this.yearVal,this.semesterVal,this.weekId,this.classifyVal);
        },
        getClass(){
            let that = this;
            let data = {
                url: "/common/workType",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    let arr = [{id:'',name:'全部'}];
                    that.classifyList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
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
                    let arr = [{ semester: "全部", id: "全部" }];
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
                    let arr = [{ weeks: "全部", id: "全部" }];
                    that.weekList = arr.concat(res.data.data);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 学校简称搜索
        handleSubmit() {
            this.getListVal(this.searchTitle,this.schoolName,this.yearVal,this.semesterVal,this.weekId,this.classifyVal);
        },
        // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getListVal(this.searchTitle,this.schoolName,this.yearVal,this.semesterVal,this.weekId,this.classifyVal);
        },
        // 获取列表数据
        getListVal(
            searchTitle,
            search,
            year,
            semester,
            weekId,
            type
        ) {
            let that = this;
            this.loadShow = true;
            let data = {
                url: "/management/workRecord",
                method: "post",
                data: {
                    search_content: search,
                    semester: semester,
                    title: searchTitle,
                    year: year,
                    month: weekId,
                    type: type,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    that.data = res.data.data.list;
                    that.pagination.total = res.data.data.total_count;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 监督反馈
        feedbackMon(i) {
            this.listId = i;
            this.visible = true;
            this.feedbackVal = '';
        },
        // 确认
        sureFeedback() {
            let that = this;
            let data = {
                url: "/management/updateRecord",
                method: "post",
                data: {
                    id: this.listId,
                    content: this.feedbackVal,
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.visible = false;
                    that.getListVal(this.searchTitle,this.schoolName,this.yearVal,this.semesterVal,this.weekId,this.classifyVal);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#WorkRecord {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.RecipeQuery_box {
    /* margin-top: 20px; */
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
.tabImg {
    width: 110px;
    height: 60px;
    object-fit: contain;
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
.model_footer {
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    display: flex;
    /* justify-content: center; */
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
.model_footer > .model_footer_btn:last-child {
    background: #02bb72;
    color: #ffffff !important;
}
.inpArea {
    width: 100%;
    height: 130px;
    resize: none;
    margin-top: 20px;
}
</style>
<style>
.ant-modal-header,
.ant-modal-footer {
    border: none;
}
</style>