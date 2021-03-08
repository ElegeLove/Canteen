<template>
    <div id="BusinessTrainingInfo">
        <div class="BusinessTrainingInfo_top">
            <a-page-header title="查看" @back="() => $router.go(-1)" />
            <div class="BusinessTrainingInfo_top_main">
                <div>问卷名称：{{ dataVal.title }}</div>
                <div>问卷开始时间：{{ dataVal.start_time }}</div>
                <div>问卷结束时间：{{ dataVal.end_time }}</div>
            </div>
        </div>
        <div class="BusinessTrainingInfo_main">
            <div class="BusinessTrainingInfo_main_content">
                <div class="upload_main_title">问卷回答要求</div>
                <div>{{ dataVal.requirement }}</div>
                <div class="upload_main">
                    <div class="upload_main_title">文件：</div>
                    <div class="upload_main_text" v-for="(item, index) in pathVal" :key="index">
                        <div @click="urlShow(item.url)">{{item.name}}</div>
                    </div>
                    <!-- <div class="upload_main_text">食品安全文件.docx</div>
                    <div>
                        <video
                            class="upload_entertainment"
                            controls
                            src="../../assets/video.mp4"
                        ></video>
                    </div> -->
                </div>
                <div class="tabList">
                    <div class="upload_main_title">调研用户</div>
                    <a-table
                        :rowKey="row => row.id"
                        :columns="columns"
                        :data-source="data"
                        bordered
                        :loading="loadShow"
                        :pagination="false"
                    >
                        <!-- @change="handleTableChange" -->
                        <template slot="is_feedback" slot-scope="text">
                            <div>{{ text == 1 ? "已提交" : "未提交" }}</div>
                        </template>
                        <template slot="operation" slot-scope="text, record">
                            <div
                                class="operate"
                                v-if="record.is_feedback == 1"
                                style="display:flex;justify-content:center;align-items: center;"
                            >
                                <div @click="del(record.id)">下载</div>
                            </div>
                            <div v-else style="color:#ccc;">下载</div>
                        </template>
                    </a-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const columns = [
    {
        title: "调研用户",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: "25%",
        align: "center"
    },
    {
        title: "提交状态",
        dataIndex: "is_feedback",
        key: "is_feedback",
        width: "25%",
        align: "center",
        scopedSlots: { customRender: "is_feedback" }
    },
    {
        title: "提交时间",
        dataIndex: "submit_time",
        key: "submit_time",
        width: "25%",
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
export default {
    data() {
        return {
            dataVal: {},
            data,
            columns,
            loadShow: false,
            pathVal:[],
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
            }
        };
    },
    created() {
        let id = this.$route.query.id;
        this.listId = id;
        this.getInfoList(id);
    },
    methods: {
        // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            // this.getAllStudents()
            // this.getList(this.unitAbbreviation);
        },
        getInfoList(id) {
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/management/questionDetail",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.dataVal = res.data.data;
                    that.data = res.data.data.school_list;
                    let arr = [];
                    if(res.data.data.file.length > 0){
                        res.data.data.file.forEach(item=>{
                            let obj = {
                                name:decodeURI(that.getType(item)),
                                url:item
                            }
                            arr.push(obj);
                        })
                    }
                    that.pathVal = arr;
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
        del(i) {
            let that = this;
            let data = {
                url: "/management/downloadZip",
                method: "post",
                data: {
                    id: i
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    location.href = res.data.data.url;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        urlShow(url){
            // location.href = url;
            window.open(url); 
        }
    }
};
</script>

<style scoped>
#BusinessTrainingInfo {
    width: 100%;
    background: #ffffff;
}
.BusinessTrainingInfo_top {
    width: 100%;
    background: #ffffff;
}
.BusinessTrainingInfo_top_main {
    width: 100%;
    padding: 24px;
    border-top: 1px solid #eff1f5;
    border-bottom: 1px solid #eff1f5;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #333333;
    line-height: 36px;
}
.BusinessTrainingInfo_main {
    width: 100%;
    background: #ffffff;
    /* padding: 24px;
    box-sizing: border-box; */
    margin-top: 15px;
}
.BusinessTrainingInfo_main_top {
    width: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f2f5;
}
.BusinessTrainingInfo_main_top > div {
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    border-left: 6px solid #0c0b0b;
    font-size: 20px;
    font-family: "Source Han Sans CN";
    font-weight: 500;
    color: #333333;
    line-height: 24px;
}
.BusinessTrainingInfo_main_content {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
}
.upload_main {
    margin-top: 70px;
}
.upload_main_title {
    font-size: 18px;
    font-family: "Source Han Sans CN";
    font-weight: 500;
    color: #333333;
}
.upload_main_text {
    font-size: 18px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: #02bb72;
    cursor: pointer;
}
.upload_entertainment {
    width: 277px;
    height: 170px;
    margin-top: 20px;
}
.tabList {
    margin-top: 50px;
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
</style>