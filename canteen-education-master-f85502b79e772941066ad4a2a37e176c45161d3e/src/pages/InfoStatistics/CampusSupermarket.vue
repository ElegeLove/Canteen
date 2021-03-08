<template>
    <div id="CampusSupermarket">
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
            :scroll="scrollVal"
            @change="handleTableChange"
        >
            <!-- <template
                style="display: flex;justify-content: space-around;"
                slot="creditCode"
                slot-scope="text"
            >
                <img class="tabImg" :src="text" v-lazy="text" />
            </template> -->
            <template slot="operation" slot-scope="text, record">
                <div
                    class="operate"
                    style="display:flex;justify-content:center;align-items: center;"
                >
                    <div @click="budgetTable(record.id)">查看</div>
                </div>
            </template>
        </a-table>
        <a-modal
            v-model="visible"
            width="80%"
            title=""
            :closable="false"
            :centered="true"
        >
            <div class="model_main">
                <div class="model_top">
                    <a-row>
                        <a-col :span="8">
                            <div>学校代码：{{ dataVal.school_code }}</div>
                            <div>经营模式：{{ dataVal.sell_model }}</div>
                            <div>年租金（上年度利润）：{{ dataVal.money }}</div>
                            <div class="creditCode">
                                <div>信用代码：{{ dataVal.code }}</div>
                                <!-- <img
                                    src="../../assets/image/testbg.jpg"
                                    alt=""
                                /> -->
                            </div>
                        </a-col>
                        <a-col :span="16">
                            <div>学校简称：{{ dataVal.abbreviation }}</div>
                            <div>
                                租赁（承包）起止日期：{{
                                    dataVal.start_time
                                }}至{{ dataVal.end_time }}
                            </div>
                            <div>经营主体名称：{{ dataVal.name }}</div>
                            <div class="model_flex">
                                <div>营业执照图片：</div>
                                <img
                                    class="model_img"
                                    v-lazy="dataVal.license"
                                    alt=""
                                />
                            </div>
                        </a-col>
                    </a-row>
                </div>
                <div class="model_top">
                    <div class="model_top_title">食品经营许可证</div>
                    <div>许可证号：{{ dataVal.card_number }}</div>
                    <div>到期日期：{{ dataVal.card_end_time }}</div>
                    <div class="model_flex">
                        <div>证件图片：</div>
                        <img
                            class="model_img"
                            v-lazy="dataVal.card_img"
                            alt=""
                        />
                    </div>
                </div>
                <div class="model_top noBorder">
                    <a-row>
                        <a-col :span="6">
                            <div>
                                <div class="model_top_title">
                                    法人代表人
                                </div>
                                <div>姓名：{{ dataVal.person_name }}</div>
                                <div>家庭住址：{{ dataVal.address }}</div>
                                <div>联系电话：{{ dataVal.person_phone }}</div>
                                <div>身份证号：{{ dataVal.person_id_card }}</div>
                            </div>
                        </a-col>
                        <a-col :span="10">
                            <div class="IDcardImgs">
                                <div>身份证正反面图片</div>
                                <div>
                                    <!-- src="../../assets/image/testbg.jpg" -->
                                    <img
                                        v-lazy="dataVal.id_card_front"
                                        alt=""
                                    />

                                    <!-- src="../../assets/image/testbg.jpg" -->
                                    <img v-lazy="dataVal.id_card_back" alt="" />
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="IDcardImgs">
                                <div>合同扫描件</div>
                                <div class="IDcardImgs_imgs">
                                    <img
                                        v-for="(item,
                                        index) in dataVal.contract"
                                        :key="index"
                                        v-lazy="item"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>
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
        width: 150,
        fixed: "left",
        align: "center"
    },
    {
        title: "学校简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: 150,
        fixed: "left",
        align: "center"
    },
    {
        title: "经营模式",
        dataIndex: "sell_model",
        key: "sell_model",
        width: 180,
        align: "center"
    },
    {
        title: "租赁（承包）起止日期",
        dataIndex: "time_text",
        key: "time_text",
        width: 200,
        align: "center"
    },
    {
        title: "年租金（上年度利润）",
        dataIndex: "money",
        key: "money",
        width: 200,
        align: "center"
    },
    {
        title: "经营主体名称",
        dataIndex: "name",
        key: "name",
        width: 180,
        align: "center"
    },
    {
        title: "信用代码",
        dataIndex: "code",
        key: "code",
        width: 150,
        align: "center"
    },
    {
        title: "食品经营许可证",
        children: [
            {
                title: "许可证号",
                dataIndex: "card_number",
                key: "card_number",
                width: 180,
                align: "center"
            },
            {
                title: "到期日期",
                dataIndex: "card_end_time",
                key: "card_end_time",
                width: 180,
                align: "center"
            }
        ]
    },
    {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 180,
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
            scrollVal: {},
            schoolName: "",
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
            dataVal: {}
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
                url: "/information/supermarket",
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
        // 查看村校
        budgetTable(i) {
            this.visible = true;
            // this.$router.push({
            //     path: "WaterShowVillageSchool",
            //     query: {
            //         type: i
            //     }
            // });
            this.getDataVal(i);
        },
        getDataVal(id) {
            let that = this;
            let data = {
                url: "/information/supermarketDetail",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.dataVal = res.data.data;
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
#CampusSupermarket {
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
.model_top {
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 36px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 30px;
    padding-bottom: 28px;
}
.creditCode {
    display: flex;
    align-items: flex-start;
    line-height: 16px;
    margin-top: 18px;
}
.creditCode img {
    width: 115px;
    height: 70px;
    border-radius: 5px;
    object-fit: cover;
}
.model_top_title {
    font-size: 20px;
    font-family: "Source Han Sans CN";
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    padding-left: 12px;
    box-sizing: border-box;
    border-left: 6px solid #0c0b0b;
    line-height: 20px;
    margin-bottom: 20px;
}
.model_main {
    height: 500px;
    overflow-y: scroll;
}
.model_flex{
    display: flex;
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
.noBorder {
    border: none;
}
.IDcardImgs {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
}
.IDcardImgs > div:last-child {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.IDcardImgs_imgs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.IDcardImgs img {
    width: 180px;
    height: 110px;
    border-radius: 5px;
    margin: 18px 18px 18px 0;
    object-fit: contain;
}
.model_img {
    width: 180px;
    height: 110px;
    border-radius: 5px;
    margin: 18px 18px 18px 0;
    object-fit: contain;
}
</style>