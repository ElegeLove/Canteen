<template>
    <div id="NotificationManagement">
        <a-tabs v-model="tabKey" @change="callback">
            <a-tab-pane key="1" tab="消息中心">
                <div class="BusinessTraining_top">
                    <div class="RecipeQuery_box">
                        <div class="RecipeQuery_box_item">
                            <div>日期：</div>
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
                            <div>&emsp;状态：</div>
                            <a-select
                                style="width:240px;height:34px;"
                                v-model="classifyVal"
                                @change="classifyChange"
                            >
                                <a-select-option
                                    v-for="item in classifyList"
                                    :key="item.id"
                                >
                                    {{ item.name }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </div>
                    <div class="BusinessTraining_top_right">
                        <div
                            class="BusinessTraining_top_btn"
                            @click="tagging()"
                        >
                            标注已读
                        </div>
                        <div class="BusinessTraining_top_btn" @click="allDel()">
                            批量删除
                        </div>
                    </div>
                </div>
                <a-table
                    :rowKey="row => row.id"
                    :columns="columns"
                    :data-source="data"
                    :loading="newsLoad"
                    :row-selection="{
                        selectedRowKeys: selectedRowKeys,
                        onChange: onSelectChange
                    }"
                    bordered
                    :pagination="pagination"
                    @change="handleTableChange"
                >
                    <template slot="title_name" slot-scope="text, record">
                        <div class="infoType">
                            <div class="tags" v-if="record.status == 1">
                                <a-badge status="error" />
                            </div>
                            <div>{{ text }}</div>
                        </div>
                    </template>
                    <template slot="type">
                        <div class="infoType">
                            <div>系统消息</div>
                        </div>
                    </template>
                    <template slot="operation" slot-scope="text, record">
                        <div
                            class="operate"
                            style="display:flex;justify-content:center;align-items: center;"
                        >
                            <div @click="showInfoNews(record.id,record.order_id)">
                                查看
                            </div>
                            <div @click="delNews(record.id)">删除</div>
                            <!-- <div @click="publicityTable(record)">导出带量公示表</div> -->
                        </div>
                    </template>
                </a-table>
            </a-tab-pane>
            <a-tab-pane key="2" tab="发送通知">
                <div class="notice_top">
                    <div class="notice_top_left">
                        <div class="colred">*&nbsp;</div>
                        <div class="notice_top_text">接收对象：</div>
                        <div>
                            <a-checkbox-group
                                v-model="checkedList"
                                :options="plainOptions"
                            />
                        </div>
                    </div>
                    <div class="RecipeQuery_box">
                        <div class="RecipeQuery_box_item">
                            <div
                                class="mx_btnbg mx_btn_reset"
                                @click="sendNow('1')"
                            >
                                存草稿
                            </div>
                        </div>
                        <div class="RecipeQuery_box_item">
                            <div
                                class="mx_btnbg mx_btn_send"
                                @click="sendNow('2')"
                            >
                                立即发送
                            </div>
                        </div>
                    </div>
                </div>
                <div class="notice_top_title">
                    <div class="colred">*&nbsp;</div>
                    <div class="notice_top_text">标题：</div>
                    <a-input
                        type="text"
                        style="width:90%"
                        v-model="recordName"
                        placeholder="输入标题名称"
                    />
                </div>
                <div class="notice_top_title">
                    &emsp;
                    <div class="notice_top_text">附件：</div>
                    <div style="width:100%">
                        <!-- <a-upload
                            name="file"
                            :multiple="true"
                            :headers="headers"
                            :customRequest="customRequest"
                            :beforeUpload="beforeUpload"
                            @change="handleChange"
                        >
                            <a-button>
                                <a-icon type="upload" /> 上传文件
                            </a-button>
                        </a-upload> -->
                        <uploadFilesVal
                            :max="10"
                            :imgPath="imgPath"
                            accept=".doc,.docx,.xls,.xlsx,.rar,.zip,.pdf"
                            @getFile="getFile"
                            ref="filePath"
                        ></uploadFilesVal>
                    </div>
                </div>
                <div class="notice_top_title">
                    <div class="colred">*&nbsp;</div>
                    <div class="notice_top_text">正文：</div>
                    <div class="RecipeQuery_box_item_main">
                        <quill :default_cont="trainingVal" ref="quillVal" />
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="发送记录">
                <div class="RecipeQuery_box_item">
                    <div>通知：</div>
                    <a-input
                        type="text"
                        style="width:240px;height:34px;"
                        v-model="titleName"
                        placeholder="输入标题名称"
                    />
                    <div class="mx_btnbg" @click="handleSubmit">搜索</div>
                </div>
                <div class="RecipeQuery_box">
                    <div class="RecipeQuery_box_item">
                        <div>接收对象：</div>
                        <a-select
                            style="width:240px;height:34px;"
                            v-model="receivingVal"
                            @change="receivingChange"
                        >
                            <a-select-option
                                v-for="item in receivingList"
                                :key="item.id"
                            >
                                {{ item.name }}
                            </a-select-option>
                        </a-select>
                    </div>
                    <div class="RecipeQuery_box_item">
                        <div>日期：</div>
                        <div>
                            <a-date-picker
                                v-model="receivingStartValue"
                                :disabled-date="receivingStartDate"
                                show-time
                                format="YYYY-MM-DD"
                                placeholder="选择日期"
                                @openChange="receivingStartOpenChange"
                                @ok="receivStartTime"
                            />
                            -
                            <a-date-picker
                                v-model="receivingEndValue"
                                :disabled-date="receivingEndDate"
                                show-time
                                format="YYYY-MM-DD"
                                placeholder="选择日期"
                                :open="receivingEndOpen"
                                @openChange="receivingEndOpenChange"
                                @ok="receivEndTime"
                            />
                        </div>
                    </div>
                    <div class="RecipeQuery_box_item">
                        <div class="mx_btnbg" @click="queryData">查询</div>
                    </div>
                    <div class="RecipeQuery_box_item">
                        <div class="mx_btnbg mx_btn_reset" @click="resetVal">
                            重置
                        </div>
                    </div>
                </div>
                <a-table
                    :rowKey="row => row.id"
                    :columns="columnSend"
                    :data-source="dataSend"
                    bordered
                    :loading="recordLoad"
                    :pagination="paginationSend"
                    @change="sendTableChange"
                >
                    <template slot="create_time" slot-scope="text">
                        <div class="infoType">
                            <div>{{ text == "" ? "--" : text }}</div>
                        </div>
                    </template>
                    <template slot="status" slot-scope="text">
                        <div class="infoType">
                            <div>{{ text == "1" ? "草稿" : "已发送" }}</div>
                        </div>
                    </template>
                    <template slot="operation" slot-scope="text, record">
                        <div
                            class="operate"
                            style="display:flex;justify-content:center;align-items: center;"
                        >
                            <div @click="showInfo(record.id)">查看</div>
                            <div @click="delRecord(record.id)">删除</div>
                            <!-- <div @click="publicityTable(record)">导出带量公示表</div> -->
                        </div>
                    </template>
                </a-table>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
const columns = [
    {
        title: "标题",
        dataIndex: "title_name",
        key: "title_name",
        width: "45%",
        align: "center",
        scopedSlots: { customRender: "title_name" }
    },
    {
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: "15%",
        align: "center",
        scopedSlots: { customRender: "type" }
    },
    {
        title: "接收时间",
        dataIndex: "create_time",
        key: "create_time",
        width: "15%",
        align: "center"
    },
    {
        title: "操作",
        key: "operation",
        width: "25%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [];
const columnSend = [
    {
        title: "标题",
        dataIndex: "title_name",
        key: "title_name",
        width: "16%",
        align: "center"
    },
    {
        title: "接收对象",
        dataIndex: "user_type",
        key: "user_type",
        width: "16%",
        align: "center"
    },
    {
        title: "发送人",
        dataIndex: "user_name",
        key: "user_name",
        width: "16%",
        align: "center"
    },
    {
        title: "发送时间",
        dataIndex: "create_time",
        key: "create_time",
        width: "16%",
        align: "center",
        scopedSlots: { customRender: "create_time" }
    },
    {
        title: "状态",
        dataIndex: "status",
        key: "status",
        width: "16%",
        align: "center",
        scopedSlots: { customRender: "status" }
    },
    {
        title: "操作",
        key: "operation",
        width: "20%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const dataSend = [
    {
        key: "1",
        name: "我是某某通知标题",
        receiving: "学校",
        sender: "张主任",
        sendTime: "",
        status: "已发送"
    },
    {
        key: "2",
        name: "我是某某通知标题",
        receiving: "供应商",
        sender: "张主任",
        sendTime: "2019-07-02    15:23",
        status: "草稿"
    },
    {
        key: "3",
        name: "我是某某通知标题",
        receiving: "学校",
        sender: "张主任",
        sendTime: "2019-07-02    15:23",
        status: "已发送"
    }
];
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
import quill from "../../components/quillGroup/index"; //引入
import { put } from "../../assets/js/upload";
export default {
    components: {
        quill
    },
    data() {
        return {
            tabKey: "1",
            // 消息中心
            startValue: null,
            endValue: null,
            endOpen: false,
            startTime: "",
            endTime: "",
            classifyVal: "",
            classifyList: [
                { id: "", name: "全部" },
                { id: "1", name: "未读" },
                { id: "2", name: "已读" }
            ],
            data,
            columns,
            newsLoad: false,
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
            receivingList: [
                { id: "", name: "全部对象" },
                { id: "1", name: "学校" },
                { id: "2", name: "供应商" }
            ],
            // 发送通知
            uploadImg: "",
            plainOptions: [
                { label: "学校", value: "1" },
                { label: "供应商", value: "2" }
            ],
            checkedList: [],
            imgPath: [],
            headers: {
                authorization: "authorization-text"
            },
            recordName: "",
            trainingVal: "",
            state: false,
            // 发送记录
            titleName: "",
            receivingVal: "",
            receivingStartValue: null,
            receivingEndValue: null,
            receivingEndOpen: false,
            receivingStartTime: "",
            receivingEndTime: "",
            dataSend,
            columnSend,
            recordLoad: false,
            paginationSend: {
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
            }
        };
    },
    watch: {
        startValue(val) {
            if (this.startValue == null) {
                this.startTime = "";
                this.endTime = "";
                this.endValue = null;
                this.getNews(this.startTime, this.endTime, this.classifyVal);
            } else {
                this.startTime = this.$moment(val).format("YYYY-MM-DD");
            }
        },
        endValue(val) {
            if (this.endValue == null) {
                this.endTime = "";
                this.getNews(this.startTime, this.endTime, this.classifyVal);
            } else {
                this.endTime = this.$moment(val).format("YYYY-MM-DD");
            }
        },
        receivingStartValue(val) {
            if (this.receivingStartValue == null) {
                this.receivingStartTime = "";
                this.receivingEndTime = "";
                this.receivingEndValue = null;
                this.getRecord(
                    this.receivingVal,
                    this.receivingStartTime,
                    this.receivingEndTime,
                    this.titleName
                );
            } else {
                this.receivingStartTime = this.$moment(val).format(
                    "YYYY-MM-DD"
                );
            }
        },
        receivingEndValue(val) {
            if (this.receivingEndValue == null) {
                this.receivingEndTime = "";
                this.getRecord(
                    this.receivingVal,
                    this.receivingStartTime,
                    this.receivingEndTime,
                    this.titleName
                );
            } else {
                this.receivingEndTime = this.$moment(val).format("YYYY-MM-DD");
            }
        }
    },
    created() {
        this.uploadImg = this.$globalApi + "/api/common/upload";
        if (this.tabKey == "1") {
            this.getNews(this.startTime, this.endTime, this.classifyVal);
        } else if (this.tabKey == "2") {
        } else {
            this.getRecord(
                this.receivingVal,
                this.receivingStartTime,
                this.receivingEndTime,
                this.titleName
            );
        }
    },
    methods: {
        // tab切换
        callback(key) {
            if (key == 1) {
                this.getNews(this.startTime, this.endTime, this.classifyVal);
            } else if (key == 2) {
            } else {
                this.getRecord(
                    this.receivingVal,
                    this.receivingStartTime,
                    this.receivingEndTime,
                    this.titleName
                );
            }
        },
        // 消息中心
        // 开始时间确认
        selStartTime() {
            // console.log(this.startTime);
            // console.log(this.endTime);
            this.getNews(this.startTime, this.endTime, this.classifyVal);
        },
        // 结束时间确认
        selEndTime() {
            // console.log(this.startTime);
            // console.log(this.endTime);
            this.getNews(this.startTime, this.endTime, this.classifyVal);
        },
        //日期选择
        disabledStartDate(startValue) {
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
        // 分类选择
        classifyChange() {
            this.getNews(this.startTime, this.endTime, this.classifyVal);
            // this.getListVal(this.searchTitle,this.schoolName,this.yearVal,this.semesterVal,this.weekId,this.classifyVal);
        },
        // 标注已读
        tagging() {
            if (this.selectedRowKeys.length > 0) {
                // this.$store.commit("setLoading", true);
                let that = this;
                let data = {
                    url: "/index/readMessage",
                    method: "post",
                    data: {
                        id: this.selectedRowKeys
                    }
                };
                this.$apiAxiox(data).then(res => {
                    // that.$store.commit("setNewsData", false);
                    if (res.data.code == 1) {
                        that.$message.success(res.data.msg);
                        that.selectedRowKeys = [];
                        that.$store.commit("setNewsData", true);
                        // setTimeout(() => {
                        //     that.$store.commit("setNewsData", false);
                        // }, 300);
                        that.getNews(
                            that.startTime,
                            that.endTime,
                            that.classifyVal
                        );
                    } else {
                        that.$message.error(res.data.msg);
                    }
                });
            } else {
                this.$message.error("请选择标记信息");
            }
        },
        // 批量删除
        allDel() {
            if (this.selectedRowKeys.length > 0) {
                let that = this;
                let data = {
                    url: "/index/delMessage",
                    method: "post",
                    data: {
                        id: this.selectedRowKeys
                    }
                };
                this.$apiAxiox(data).then(res => {
                    if (res.data.code == 1) {
                        that.$message.success(res.data.msg);
                        that.$store.commit("setNewsData", true);
                        // setTimeout(() => {
                        //     that.$store.commit("setNewsData", false);
                        // }, 300);
                        that.selectedRowKeys = [];
                        that.getNews(
                            that.startTime,
                            that.endTime,
                            that.classifyVal
                        );
                    } else {
                        that.$message.error(res.data.msg);
                    }
                });
            } else {
                this.$message.error("请选择删除信息");
            }
        },
        // 删除
        delNews(id) {
            let that = this;
            let data = {
                url: "/index/delMessage",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.$store.commit("setNewsData", true);
                    //     setTimeout(() => {
                    //         that.$store.commit("setNewsData", false);
                    //     }, 300);
                    that.getNews(
                        that.startTime,
                        that.endTime,
                        that.classifyVal
                    );
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 查看
        showInfoNews(id,orderId) {
            let that = this;
            let data = {
                url: "/index/readMessage",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setNewsData", true);
                if (res.data.code == 1) {
                    that.$router.push({
                        path: "ExamineList",
                        query: {
                            id: orderId
                        }
                    });
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getNews(this.startTime, this.endTime, this.classifyVal);
        },
        // 获取消息列表数据
        getNews(startTime, endTime, status) {
            // this.$store.commit("setLoading", true);
            this.newsLoad = true;
            let that = this;
            let data = {
                url: "/index/message",
                method: "post",
                data: {
                    start_time: startTime,
                    end_time: endTime,
                    status: status,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                that.newsLoad = false;
                if (res.data.code == 1) {
                    if (res.data.data.list.length > 0) {
                        res.data.data.list.forEach(item => {
                            item.title_name = item.title;
                        });
                    }
                    that.data = res.data.data.list;
                    that.pagination.total = res.data.data.count;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 选择
        onSelectChange(selectedRowKeys) {
            console.log("selectedRowKeys changed: ", selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
        },
        // 查看
        showInfo(i) {
            this.$router.push({
                path: "NotificationManagementInfo",
                query: {
                    id: i
                }
            });
        },
        // 修改
        updata(i) {
            let id = "";
            if (i != "新增") {
                id = i;
            }
            this.$router.push({
                path: "SurveyQuestionnaireAdd",
                query: {
                    id: id
                }
            });
        },

        // 发送通知
        handleChange(info) {
            console.log(info);
        },
        // 获取上传的图片
        getFile(data) {
            // console.log(data);
            let arr = [];
            data.forEach(item => {
                arr.push(item.url);
            });
            this.imgPath = arr;
            // this.imgPath = data;
        },
        // 存草稿、立即发送
        sendNow(i) {
            let that = this;
            let num = "";
            if (this.checkedList.length < 1) {
                this.$message.error("请选择接收对象");
                return;
            }
            if (this.recordName == "") {
                this.$message.error("请输入标题");
                return;
            }
            if (this.$refs.quillVal.content == "") {
                this.$message.error("请输入正文");
                return;
            }
            if (this.state) {
                return false;
            }
            this.state = true;
            this.$store.commit("setLoading", true);
            if (
                this.checkedList.indexOf("1") != -1 &&
                this.checkedList.indexOf("2") != -1
            ) {
                num = "0";
            } else if (this.checkedList.indexOf("1") != -1) {
                num = "1";
            } else {
                num = "2";
            }
            let data = {
                method: "post",
                data: {
                    user_type: num,
                    title: this.recordName,
                    content: this.$refs.quillVal.content,
                    file: this.imgPath.length > 0 ? this.imgPath.join(",") : ""
                }
            };
            if (i == 1) {
                data.url = "/management/saveNotice";
            } else {
                data.url = "/management/addNotice";
            }
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.$store.commit("setLoading", false);
                    that.$message.success(res.data.msg);
                    that.state = false;
                    that.checkedList = [];
                    that.recordName = "";
                    that.$refs.quillVal.content = "";
                    that.imgPath = [];
                    that.$refs.filePath.fileArr = [];
                } else {
                    that.$message.error(res.data.msg);
                    that.state = false;
                }
            });
        },
        // 发送记录
        // 通知搜索
        handleSubmit() {
            this.getRecord(
                this.receivingVal,
                this.receivingStartTime,
                this.receivingEndTime,
                this.titleName
            );
        },
        // 对象选择
        receivingChange() {
            this.getRecord(
                this.receivingVal,
                this.receivingStartTime,
                this.receivingEndTime,
                this.titleName
            );
        },
        //日期选择
        receivingStartDate(receivingStartValue) {
            const receivingEndValue = this.receivingEndValue;
            if (!receivingStartValue || !receivingEndValue) {
                return false;
            }
            return receivingStartValue.valueOf() > receivingEndValue.valueOf();
        },
        receivingEndDate(receivingEndValue) {
            const receivingStartValue = this.receivingStartValue;
            if (!receivingEndValue || !receivingStartValue) {
                return false;
            }
            return receivingStartValue.valueOf() >= receivingEndValue.valueOf();
        },
        receivingStartOpenChange(open) {
            if (!open) {
                this.receivingEndOpen = true;
            }
        },
        receivingEndOpenChange(open) {
            this.receivingEndOpen = open;
        },
        // 开始时间确认
        receivStartTime() {
            this.getRecord(
                this.receivingVal,
                this.receivingStartTime,
                this.receivingEndTime,
                this.titleName
            );
        },
        // 结束时间确认
        receivEndTime() {
            this.getRecord(
                this.receivingVal,
                this.receivingStartTime,
                this.receivingEndTime,
                this.titleName
            );
        },
        // 查询
        queryData() {
            this.getRecord(
                this.receivingVal,
                this.receivingStartTime,
                this.receivingEndTime,
                this.titleName
            );
        },
        // 重置
        resetVal() {
            this.titleName = "";
            this.receivingVal = "";
            this.receivingStartTime = "";
            this.receivingEndTime = "";
            this.receivingStartValue = null;
            this.receivingEndValue = null;
            this.getRecord(
                this.receivingVal,
                this.receivingStartTime,
                this.receivingEndTime,
                this.titleName
            );
        },
        // 列表
        sendTableChange(pagination, filters, sorter) {
            this.paginationSend.pageSize = pagination.pageSize;
            this.paginationSend.current = pagination.current;
            this.getRecord(
                this.receivingVal,
                this.receivingStartTime,
                this.receivingEndTime,
                this.titleName
            );
            // this.getAllStudents()
            // this.getList(this.unitAbbreviation);
        },
        // 获取发送记录列表数据
        getRecord(type, startTime, endTime, title) {
            // this.$store.commit("setLoading", true);
            this.recordLoad = true;
            let that = this;
            let data = {
                url: "/management/noticeList",
                method: "post",
                data: {
                    user_type: type,
                    start_time: startTime,
                    end_time: endTime,
                    title: title,
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                that.recordLoad = false;
                if (res.data.code == 1) {
                    if (res.data.data.list.length > 0) {
                        res.data.data.list.forEach(item => {
                            item.title_name = item.title;
                        });
                    }
                    that.dataSend = res.data.data.list;
                    that.paginationSend.total = res.data.data.total_count;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 删除
        delRecord(i) {
            let that = this;
            let data = {
                url: "/management/delNotice",
                method: "post",
                data: {
                    id: i
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.getRecord(
                        that.receivingVal,
                        that.receivingStartTime,
                        that.receivingEndTime,
                        that.titleName
                    );
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#NotificationManagement {
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
.RecipeQuery_box_item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    /* margin-bottom: 20px; */
}
/* .RecipeQuery_box_item > div {
    display: flex;
    align-items: center;
    margin-right: 20px;
} */
.BusinessTraining_top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0 40px;
}
.BusinessTraining_top_right {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.BusinessTraining_top_right .BusinessTraining_top_btn:last-child {
    margin-left: 20px;
}
.BusinessTraining_top_btn {
    width: 100px;
    height: 34px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #02bb72;
    color: #ffffff;
    /* margin-bottom: 20px; */
    cursor: pointer;
}
.operate {
    width: 100%;
    display: flex;
    align-items: center;
}
.operate > div {
    margin-right: 30px;
    color: #02bb72;
    cursor: pointer;
}
.operate > div:last-child {
    margin: 0;
}
.infoType {
    display: flex;
    justify-content: center;
}
.infoType .tags {
    margin-bottom: 10px;
    display: flex;
    /* justify-content: start; */
    /* align-items: center; */
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
.mx_btn_reset {
    background: #eee;
    color: rgb(31, 30, 30);
}
.notice_top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.notice_top_left {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #333333;
}
.mx_btn_send {
    width: 90px;
}
.colred {
    color: rgb(255, 82, 82);
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
}
.notice_top_title {
    width: 100%;
    display: flex;
    /* align-items: center; */
    margin-bottom: 10px;
}
.notice_top_text {
    width: 100px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #333333;
}
.RecipeQuery_box_item_main {
    width: 100%;
    height: 370px;
    /* border: 1px solid #d2d2d2; */
    border-radius: 5px;
    resize: none;
}
</style>
<style>
.ant-badge-status-dot {
    top: -8px !important;
}
.ant-badge {
    margin-right: -10px !important;
}
</style>