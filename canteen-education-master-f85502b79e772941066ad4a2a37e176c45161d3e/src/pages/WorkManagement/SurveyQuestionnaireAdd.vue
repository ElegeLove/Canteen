<template>
    <div id="BusinessTrainingInfoAdd">
        <div class="BusinessTrainingInfoAdd_top">
            <a-page-header :title="pageTitle" @back="() => $router.go(-1)" />
            <div class="BusinessTrainingInfoAdd_top_main">
                <div class="RecipeQuery_box_item">
                    <div class="inp_title">问卷名称：</div>
                    <a-input
                        class="inps"
                        type="text"
                        placeholder="输入关键字"
                        v-model="questionName"
                    />
                </div>
                <div class="RecipeQuery_box_item">
                    <div class="inp_title">问卷开始日期：</div>
                    <a-date-picker
                        v-model="startValue"
                        class="inps"
                        :disabled-date="disabledStartDate"
                        show-time
                        format="YYYY-MM-DD hh:mm"
                        placeholder="开始日期"
                        @openChange="handleStartOpenChange"
                    />
                </div>
                <div class="RecipeQuery_box_item">
                    <div class="inp_title">问卷结束日期：</div>
                    <a-date-picker
                        v-model="endValue"
                        class="inps"
                        :disabled-date="disabledEndDate"
                        show-time
                        format="YYYY-MM-DD hh:mm"
                        placeholder="结束日期"
                        :open="endOpen"
                        @openChange="handleEndOpenChange"
                    />
                </div>
                <div class="RecipeQuery_box_item">
                    <div class="inp_title">问卷回答要求：</div>
                    <a-textarea
                        class="inps"
                        placeholder="Basic usage"
                        :maxLength="500"
                        v-model="requestAnswer"
                        :rows="4"
                    />
                </div>
                <div class="RecipeQuery_box_item selSchool">
                    <div class="inp_title">调研用户：</div>
                    <div @click="selSchool">
                        <div v-if="selSchooolList.length > 0">
                            已选择{{ selSchooolList.length }}
                        </div>
                        <div v-else>请选择学校</div>
                    </div>
                </div>
                <div class="RecipeQuery_box_item">
                    <div class="inp_title">上传文件：</div>
                    <div>
                        <uploadFile
                            :max="10"
                            :imgPath="imgPath"
                            ref="filePath"
                            accept=".doc,.docx,.xls,.xlsx,.rar,.zip,.pdf,.jpg,.png,.gif"
                            @getFile="getFile"
                        ></uploadFile>
                    </div>
                </div>
                <div
                    class="BusinessTrainingInfoAdd_top_main_btn"
                    @click="sendVal"
                >
                     {{isUpdata?'编辑':'发送'}}
                </div>
            </div>
        </div>
        <a-modal
            v-model="visible"
            width="60%"
            title="查看"
            @ok="handleOk"
            :centered="true"
        >
            <div class="RecipeQuery_box_item">
                <div>学校：</div>
                <a-input
                    type="text"
                    style="width:240px;height:34px;"
                    v-model="schoolName"
                    placeholder="输入学校简称/代码"
                />
                <div class="mx_btnbg" @click="handleSubmit">搜索</div>
            </div>
            <div>
                <a-table
                    :rowKey="row => row.id"
                    :columns="modelColumns"
                    :data-source="modelData"
                    :loading="loadShow"
                    :row-selection="{
                        selectedRowKeys: selectedRowKeys,
                        onChange: onSelectChange,
                        onSelect: onSelectItem,
                        onSelectAll: onSelectAllItem
                    }"
                    :pagination="pagination"
                    @change="handleTableChange"
                >
                </a-table>
            </div>
        </a-modal>
    </div>
</template>

<script>
const modelColumns = [
    {
        title: "学校简称",
        dataIndex: "abbreviation",
        key: "abbreviation",
        width: "40%",
        align: "center"
    },
    {
        title: "学校代码",
        dataIndex: "code",
        key: "code",
        width: "60%",
        align: "left"
    }
];
const modelData = [];
export default {
    data() {
        return {
            questionName: "", //问卷名称
            requestAnswer: "", //问卷回答要求
            startValue: null,
            endValue: null,
            endOpen: false,
            startTime: "",
            endTime: "",

            pageTitle: "",
            loadShow: false,
            visible: false,
            imgPath: [],
            modelColumns,
            modelData,
            schoolName: "",
            selSchooolList: [],
            selectedRowKeys: [],
            pagination: {
                pageSize: 10, // 默认每页显示数量
                current: 1, //显示当前页数
                total: modelData.length,
                pageSizeOptions: ["10", "20", "30", "40", "50"],
                showSizeChanger: true, // 显示可改变每页数量
                showQuickJumper: true, //显示跳转到输入的那一页
                showTotal: total =>
                    `共 ${total} 条记录 第 ${
                        this.pagination.current
                    } / ${Math.ceil(total / this.pagination.pageSize)} 页` // 显示总数
            },
            status:false
        };
    },
    watch: {
        startValue(val) {
            if (this.startValue == null) {
                this.startTime = "";
                this.endTime = "";
                this.endValue = null;
            } else {
                this.startTime = this.$moment(val).format("YYYY-MM-DD hh:mm");
            }
        },
        endValue(val) {
            if (this.endValue == null) {
                this.endTime = "";
            } else {
                this.endTime = this.$moment(val).format("YYYY-MM-DD hh:mm");
            }
        }
    },
    created() {
        let id = this.$route.query.id;
        this.updataId = id;
        if (id && id != "") {
            this.pageTitle = "编辑问卷调查";
            this.isUpdata = true;
        } else {
            this.pageTitle = "新增问卷调查";
            this.isUpdata = false;
        }
    },
    mounted() {
        let id = this.$route.query.id;
        if (id && id != "") {
            this.getInfoList(id);
        }
    },
    methods: {
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
        // 获取上传的图片
        getFile(data) {
            let arr = [];
            data.forEach(item => {
                arr.push(item.name);
            });
            this.imgPath = arr;
            // this.imgPath = data;
        },
        // 发送
        sendVal() {
            console.log(this.status)
            if (this.status) {
                    return false;
                }
                
            let schoolIds = "";
            if(this.questionName == ''){
                this.$message.error('请输入问卷名称');
                return
            }
            if(this.startTime == ''){
                this.$message.error('请选择开始日期');
                return
            }
            if(this.endTime == ''){
                this.$message.error('请选择结束日期');
                return
            }
            if(this.requestAnswer == ''){
                this.$message.error('请输入问卷回答要求');
                return
            }
            if (this.selSchooolList.length > 0) {
                schoolIds = this.selSchooolList.join(",");
            }else{
                this.$message.error('请选择调研用户');
                return
            }
            let that = this;
            let data = {
                method: "post",
                data: {
                    title: this.questionName,
                    start_time: this.startTime,
                    end_time: this.endTime,
                    requirement: this.requestAnswer,
                    school_id: schoolIds,
                    file:
                        this.imgPath.length > 0
                            ? this.imgPath.join(',')
                            : ""
                }
            };
            if (this.isUpdata) {
                data.url = "/management/updateQuestion";
                data.data.id = this.updataId;
            } else {
                data.url = "/management/addQuestion";
            }
            this.status = true;
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.status = false;
                    that.$router.go(-1);
                } else {
                    that.status = false;
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 列表
        handleTableChange(pagination, filters, sorter) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.getSchoolList(this.schoolName);
        },
        // 获取学校列表
        getSchoolList(search_name) {
            let that = this;
            this.loadShow = true;
            let data = {
                url: "/school/schoolList",
                method: "post",
                data: {
                    page: this.pagination.current,
                    page_num: this.pagination.pageSize,
                    search_name: search_name
                }
            };
            this.$apiAxiox(data).then(res => {
                that.loadShow = false;
                if (res.data.code == 1) {
                    // res.data.data.list.forEach(item => {
                    //     item.key = item.id;
                    // });
                    that.modelData = res.data.data.list;
                    that.pagination.total = res.data.data.total_count;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 搜索
        handleSubmit() {
            this.getSchoolList(this.schoolName);
        },
        // 选中学校
        selSchool() {
            this.pagination.current = 1;
            // this.selectedRowKeys = this.selSchooolList;
            let arr = [];
            if(this.selSchooolList.length > 0){
                this.selSchooolList.some(item=>{
                   arr.push(parseInt(item))
                })
            }
            this.selectedRowKeys = arr;
            this.visible = true;
            this.getSchoolList(this.schoolName);
        },
        // 选择
        onSelectChange(selectedRowKeys, selectedRows) {
            this.selectedRowKeys = selectedRowKeys;
        },
        onSelectItem(record, selected, selectedRows, nativeEvent) {
            if (selected) {
                this.selSchooolList.push(record.id);
            } else {
                this.selSchooolList.some((item, index) => {
                    if (item == record.id) {
                        this.selSchooolList.splice(index, 1);
                        return true;
                    }
                });
            }
        },
        onSelectAllItem(selected, selectedRows, changeRows) {
            if (selected) {
                let arr = [];
                changeRows.forEach(item => {
                    arr.push(item.id);
                });
                this.selSchooolList = this.selSchooolList.concat(arr);
            } else {
                changeRows.forEach(item => {
                    this.selSchooolList.some((itemChild, index) => {
                        if (item.id == itemChild) {
                            this.selSchooolList.splice(index, 1);
                            return true;
                        }
                    });
                });
            }
        },
        // 确认
        handleOk(e) {
            this.visible = false;
        },
        // 获取数据
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
                    that.questionName = res.data.data.title;
                    if(res.data.data.start_time && res.data.data.start_time != ''){
                        that.startValue = res.data.data.start_time;
                    }else{
                        that.startValue = null;
                    }
                    if(res.data.data.end_time && res.data.data.end_time != ''){
                        that.endValue = res.data.data.end_time;
                    }else{
                        that.endValue = null;
                    }
                    that.startTime = res.data.data.start_time;
                    that.endTime = res.data.data.end_time;
                    that.requestAnswer = res.data.data.requirement;
                    if(res.data.data.school_id && res.data.data.school_id != ''){
                        that.selSchooolList = res.data.data.school_id.split(',');
                    }

                    let arr = [];
                    let arr1 = [];
                    if (res.data.data.file.length > 0) {
                        res.data.data.file.forEach(item => {
                            let obj = {
                                name: decodeURI(that.getType(item)),
                                url: item
                            };
                            arr.push(decodeURI(that.getType(item)));
                            arr1.push(obj)
                        });
                    }
                    that.imgPath = arr;
                    that.$refs.filePath.imageUrl = arr1;

                    // that.imgPath = JSON.parse(res.data.data.file);
                    // that.$refs.filePath.imageUrl = JSON.parse(
                    //     res.data.data.file
                    // );
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
        }
    }
};
</script>

<style scoped>
#BusinessTrainingInfoAdd {
    width: 100%;
}
.BusinessTrainingInfoAdd_top {
    width: 100%;
    background: #ffffff;
}
.BusinessTrainingInfoAdd_top_main {
    width: 100%;
    padding: 24px 150px;
    border-top: 1px solid #eff1f5;
    box-sizing: border-box;
}
.RecipeQuery_box_item {
    width: 100%;
    padding-right: 100px;
    box-sizing: border-box;
    margin-bottom: 20px;
    display: flex;
}
.inp_title {
    width: 150px;
    text-align: right;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #333333;
    margin-bottom: 18px;
}
.RecipeQuery_box_item_main {
    width: 100%;
    height: 370px;
    /* border: 1px solid #d2d2d2; */
    border-radius: 5px;
    resize: none;
}

.BusinessTrainingInfoAdd_top_main_btn {
    width: 230px;
    height: 50px;
    margin: 60px auto 0;
    /* margin-top: 60px; */
    background: #02bc72;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
}
.inps {
    width: 400px;
    resize: none;
    margin-bottom: 18px;
}
.selSchool {
    display: flex;
    align-items: center;
}
.selSchool > div:last-child {
    color: rgba(2, 187, 114, 1);
    margin-bottom: 18px;
    cursor: pointer;
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
</style>