<template>
    <div id="ConstructionInfo">
        <a-page-header title="查看" @back="() => $router.go(-1)" />
        <div class="ConstructionInfo_main">
            <div class="ConstructionInfo_top">
                <span>学校简称</span>
                <span>{{ dataVal.abbreviation }}</span>
            </div>
            <div class="ConstructionInfo_top">
                <span>学校代码</span>
                <span>{{ dataVal.code }}</span>
            </div>
            <a-table
                :rowKey="row => row.id"
                :columns="columns"
                :data-source="data"
                :loading="loadShows"
                bordered
                :pagination="false"
            >
                <template slot="image_list" slot-scope="text">
                    <div class="tabImg">
                        <viewer :images="text">
                            <img
                                v-for="(item, index) in text"
                                :key="index"
                                :src="item"
                                v-lazy="item"
                            />
                        </viewer>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <div class="operate">
                        <div @click="download(record.id)">下载</div>
                        <div
                            @click="budgetTable(record.id)"
                            v-if="record.status == '待审核'"
                        >
                            审核
                        </div>
                        <div
                            @click="delTable(record.id)"
                            v-if="record.status == '审核不通过'"
                        >
                            删除
                        </div>
                    </div>
                </template>
            </a-table>
        </div>
        <a-modal
            v-model="visible"
            width="30%"
            title="审核"
            cancelText="取消"
            okText="确 定"
            :closable="false"
            :centered="true"
            @ok="handleOk"
        >
            <div>
                <div class="model_title">选择审核结果：</div>
                <div class="model_group">
                    <a-radio-group name="radioGroup" v-model="radioNum">
                        <!-- @change="groupSel" -->
                        <a-radio :value="2">
                            审核通过
                        </a-radio>
                        <a-radio :value="3">
                            审核不通过
                        </a-radio>
                    </a-radio-group>
                </div>
                <div v-show="radioNum == 3">
                    <div class="model_title">不通过原因</div>
                    <textarea
                        class="model_text"
                        v-model="reasonsVal"
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script>
const columns = [
    {
        title: "原件扫描",
        dataIndex: "image_list",
        key: "image_list",
        width: "10%",
        align: "center",
        scopedSlots: { customRender: "image_list" }
    },
    {
        title: "电子文件",
        dataIndex: "file",
        key: "file",
        width: "10%",
        align: "center"
    },
    {
        title: "审核状态",
        dataIndex: "status",
        key: "status",
        width: "10%",
        align: "center"
    },
    {
        title: "上传时间",
        dataIndex: "create_time",
        key: "create_time",
        width: "10%",
        align: "center"
    },
    {
        title: "操作",
        key: "operation",
        width: "10%",
        align: "center",
        scopedSlots: { customRender: "operation" }
    }
];
const data = [
    // {
    //     key: "1",
    //     originalScanning:
    //         "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1614844013,1715687448&fm=15&gp=0.jpg",
    //     electronicText: "某某制度.docx",
    //     auditStatus: "未审核",
    //     startDare: "2019-07-02    15:23"
    // },
];
export default {
    data() {
        return {
            data,
            columns,
            dataVal: {},
            loadShows: false,
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
            radioNum: 2,
            schoolId: "",
            tabId: "",
            reasonsVal: ""
        };
    },
    created() {
        let id = this.$route.query.id;
        this.schoolId = id;
        this.getDataInfo(id);
    },
    methods: {
        getDataInfo(id) {
            this.loadShows = true;
            let that = this;
            let data = {
                url: "/information/systemVillage",
                method: "post",
                data: {
                    school_id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShows = false;
                if (res.data.code == 1) {
                    res.data.data.list.forEach(item=>{
                        item.file = decodeURI(that.getType(item.file));
                    })
                    that.data = res.data.data.list;
                    that.dataVal = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 转换
        getType(file, type) {
            //截取文件名及类型
            var filename = file;
            if (type == ",") {
                var index1 = filename.lastIndexOf(".");
            } else {
                var index1 = filename.lastIndexOf("/") + 1;
            }
            var index2 = filename.length;
            var type = filename.substring(index1, index2);
            return type;
        },
        // 下载
        download(i) {
            let that = this;
            let data = {
                url: "/information/download",
                method: "post",
                data: {
                    id: i
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    if (res.data.data.url == "") {
                        that.$message.error("没有下载内容！");
                    } else {
                        // let a = document.createElement("a");
                        // a.href = res.data.data.url;
                        // a.download = fileName;
                        // a.click();
                        location.href = res.data.data.url;
                    }
                    // that.$message.success(res.data.msg);
                    // that.getDataInfo(that.schoolId);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 审核
        budgetTable(i) {
            this.tabId = i;
            this.visible = true;
            // this.$router.push({
            //     path: "ConstructionInfo",
            //     query: {
            //         type: i
            //     }
            // });
        },
        // 删除
        delTable(i) {
            let that = this;
            let data = {
                url: "/information/delSystem",
                method: "post",
                data: {
                    id: i
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.getDataInfo(that.schoolId);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // groupSel(e) {
        //     console.log(e.target.value);
        // },
        // 关闭弹窗
        handleOk() {
            let dataVal = {};
            if (this.radioNum == 3) {
                dataVal = {
                    id: this.tabId,
                    status: this.radioNum,
                    reason: this.reasonsVal
                };
            } else {
                dataVal = {
                    id: this.tabId,
                    status: this.radioNum
                };
            }
            let that = this;
            let data = {
                url: "/information/checkSystem",
                method: "post",
                data: dataVal
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.getDataInfo(that.schoolId);
                    that.visible = false;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#ConstructionInfo {
    width: 100%;
    background: #ffffff;
}
.ConstructionInfo_main {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-top: 1px solid #eff1f5;
}
.ConstructionInfo_top {
    margin-bottom: 10px;
}
.ConstructionInfo_top > span:first-child {
    margin-right: 20px;
}
.operate {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.operate > div {
    color: #02bb72;
    cursor: pointer;
}
.operate > div:nth-child(2) {
    margin-left: 30px;
}
.tabImg {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}
.tabImg img {
    width: 110px;
    height: 60px;
    object-fit: cover;
    margin: 10px;
}
.model_title {
    font-size: 18px;
    font-family: "Source Han Sans CN";
    font-weight: 500;
    color: rgba(52, 52, 52, 1);
    margin-bottom: 10px;
}
.model_group {
    font-size: 16px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: rgba(52, 52, 52, 1);
    margin-bottom: 20px;
}
.model_text {
    width: 320px;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
    resize: none;
    border: 1px solid rgb(121, 121, 121);
}
</style>