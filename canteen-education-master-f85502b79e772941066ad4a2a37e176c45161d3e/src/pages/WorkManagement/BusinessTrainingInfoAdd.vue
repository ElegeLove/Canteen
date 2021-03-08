<template>
    <div id="BusinessTrainingInfoAdd">
        <div class="BusinessTrainingInfoAdd_top">
            <a-page-header :title="pageTitle" @back="() => $router.go(-1)" />
            <div class="BusinessTrainingInfoAdd_top_main">
                <div class="RecipeQuery_box_item">
                    <div class="inp_title">培训主题：</div>
                    <a-input
                        type="text"
                        placeholder="输入关键字"
                        v-model="trainingTopics"
                    />
                </div>
                <div class="RecipeQuery_box_item">
                    <div class="inp_title">培训内容：</div>
                    <!-- <a-textarea
                        class="trainingContent"
                        placeholder="Controlled autosize"
                    /> -->
                    <div class="RecipeQuery_box_item_main">
                        <quill
                            v-if="flag"
                            :default_cont="trainingVal"
                            ref="quillVal"
                        />
                    </div>
                </div>
                <div class="RecipeQuery_box_item">
                    <div class="inp_title">上传文件：</div>
                    <div>
                        <uploadFile
                            :max="10"
                            :imgPath="imgPath"
                            accept=".doc,.docx,.xls,.xlsx,.rar,.zip,.pdf,.jpg,.png,.gif"
                            @getFile="getFile"
                            ref="filePath"
                        ></uploadFile>
                    </div>
                </div>
                <div class="RecipeQuery_box_item">
                    <div class="inp_title">发送用户：</div>
                    <div>
                        <a-checkbox-group
                            v-model="checkedList"
                            :options="plainOptions"
                        />
                    </div>
                </div>
                <div
                    class="BusinessTrainingInfoAdd_top_main_btn"
                    @click="sendVal"
                    v-preventReClick
                >
                    {{ isUpdata ? "编辑" : "发送" }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
import quill from "../../components/quillGroup/index"; //引入
export default {
    data() {
        return {
            pageTitle: "",
            trainingTopics: "",
            trainingVal: "",
            imgPath: [],
            checkedList: [],
            // 发送用户
            plainOptions: [
                { label: "学校", value: "1" },
                { label: "供应商", value: "2" }
            ],
            flag: false,
            isUpdata: false,
            updataId: "",
            state: false
        };
    },
    components: {
        quill
    },
    created() {
        let id = this.$route.query.id;
        this.updataId = id;
        if (id && id != "") {
            this.pageTitle = "编辑";
            this.flag = false;
            // this.dataId = id;
            // this.getInfo(id);
            this.isUpdata = true;
        } else {
            this.flag = true;
            this.pageTitle = "新增";
            this.isUpdata = false;
        }
    },
    mounted() {
        let id = this.$route.query.id;
        if (id && id != "") {
            this.getInfo(id);
        }
    },
    methods: {
        // 获取上传的图片
        getFile(data) {
            // console.log(data);
            let arr = [];
            data.forEach(item => {
                arr.push(item.name);
            });
            this.imgPath = arr;
            // this.imgPath = data;
        },
        // 发送
        sendVal() {
            let num = "";
            if (this.checkedList.length > 0) {
                if (this.trainingTopics == "") {
                    this.$message.error("请输入培训主题");
                    return;
                }
                if (this.$refs.quillVal.content == "") {
                    this.$message.error("请输入培训内容");
                    return;
                }
                if (this.state) {
                    return false;
                }
                this.state = true;
                if (
                    this.checkedList.indexOf("1") != -1 &&
                    this.checkedList.indexOf("2") != -1
                ) {
                    num = "3";
                } else if (this.checkedList.indexOf("1") != -1) {
                    num = "1";
                } else {
                    num = "2";
                }
                let that = this;
                let data = {
                    method: "post",
                    data: {
                        content: this.$refs.quillVal.content,
                        title: this.trainingTopics,
                        file:
                            this.imgPath.length > 0
                                ? this.imgPath.join(",")
                                : "",
                        type: num
                    }
                };
                if (this.isUpdata) {
                    data.url = "/management/updateBusiness";
                    data.data.id = this.updataId;
                } else {
                    data.url = "/management/addBusiness";
                }
                this.$apiAxiox(data).then(res => {
                    if (res.data.code == 1) {
                        that.$message.success(res.data.msg);
                        that.state = false;
                        that.$router.go(-1);
                    } else {
                        that.$message.error(res.data.msg);
                        that.state = false;
                    }
                });
            } else {
                this.$message.error("请选择发送用户");
            }
        },
        // 获取数据
        getInfo(id) {
            let that = this;
            let data = {
                url: "/management/businessDetail",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.trainingTopics = res.data.data.title;
                    that.trainingVal = res.data.data.content;
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
                    that.flag = true;
                    if (res.data.data.type == 1) {
                        that.checkedList = ["1"];
                    } else if (res.data.data.type == 2) {
                        that.checkedList = ["2"];
                    } else {
                        that.checkedList = ["1", "2"];
                    }
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
    padding: 24px;
    border-top: 1px solid #eff1f5;
    box-sizing: border-box;
}
.RecipeQuery_box_item {
    width: 100%;
    padding-right: 100px;
    box-sizing: border-box;
    margin-bottom: 20px;
}
.inp_title {
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
    margin-top: 60px;
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
</style>