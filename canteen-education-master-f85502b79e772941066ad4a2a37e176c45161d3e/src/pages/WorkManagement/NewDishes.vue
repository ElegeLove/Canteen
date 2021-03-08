<template>
    <div id="NewDishes">
        <a-page-header :title="pageTitle" @back="() => $router.go(-1)" />
        <div class="NewDishes_main">
            <div class="NewDishes_main_item">
                <div>上传推荐食谱文档：</div>
                <div class="NewDishes_main_item_title">
                    <div>标题：</div>
                    <input class="inps" v-model="valTitle" type="text" />
                </div>
                <div>
                    <div>上传推荐食谱文档：</div>
                    <div class="uploads">
                        <!-- <a-upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            name="file"
                            list-type="picture-card"
                            :file-list="fileList"
                            @preview="handlePreview"
                            @change="handleChange"
                        >
                            <div class="updata_main">
                                <div>
                                    <p class="ant-upload-drag-icon">
                                        <img
                                            src="../../assets/image/pic_04.png"
                                            alt=""
                                        />
                                    </p>
                                    <p class="ant-upload-text colFont">
                                        将文件拖到此处，或<span
                                            class="upload_text"
                                            >点击上传</span
                                        >
                                    </p>
                                    <p class="ant-upload-hint colFont">
                                        支持上传 jpg/png 、文档文件，每个不超过
                                        500kb
                                    </p>
                                </div>
                            </div>
                        </a-upload>
                        <a-modal
                            :visible="previewVisible"
                            :footer="null"
                            @cancel="handleCancel"
                        >
                            <img
                                alt="example"
                                style="width: 100%"
                                :src="previewImage"
                            />
                        </a-modal> -->
                        <uploads
                            :max="10"
                            :imgPath="imgPath"
                            @getFile="getFile"
                        ></uploads>
                    </div>
                </div>
            </div>
            <div class="NewDishes_main_items">
                <div>请填写推荐说明：</div>
                <textarea
                    class="NewDishes_main_item_text"
                    cols="30"
                    rows="10"
                    v-model="valText"
                    placeholder="不超过300字"
                    maxlength="300"
                ></textarea>
            </div>
            <div class="NewDishes_btn" @click="addRecipes" v-if="isShow">
                保存
            </div>
            <div class="NewDishes_btn" @click="updataRecipes" v-if="!isShow">
                修改
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
export default {
    data() {
        return {
            pageTitle: "创建新菜品",
            previewVisible: false,
            previewImage: "",
            valTitle: "",
            valText: "",
            fileList: [
                {
                    uid: "-1",
                    name: "image.png",
                    status: "done",
                    url:
                        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                }
            ],
            imgPath: [],
            isShow: true,
            state: false,
            dataId: ""
        };
    },
    created() {
        // let id = this.$route.query.id;
        if (this.$route.query.id) {
            this.dataId = this.$route.query.id;
            this.pageTitle = "编辑菜品";
            this.isShow = false;
            this.getInfo(this.$route.query.id);
        } else {
            this.isShow = true;
            this.pageTitle = "创建新菜品";
        }
    },
    methods: {
        // 获取上传的图片
        getFile(data) {
            let arr = [];
            data.forEach(item => {
                arr.push(item.url);
            });
            this.imgPath = arr;
        },
        handleCancel() {
            this.previewVisible = false;
        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        handleChange({ fileList }) {
            this.fileList = fileList;
        },
        // 获取编辑信息
        getInfo(id) {
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/recipes/eduRecipesDetail",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                this.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.valTitle = res.data.data.title;
                    that.valText = res.data.data.explain;
                    that.imgPath = res.data.data.recipes_file;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 新增食谱
        addRecipes() {
            if (this.valTitle == "") {
                this.$message.error("请输入标题");
                return;
            }
            if (this.valText == "") {
                this.$message.error("请输入推荐说明");
                return;
            }
            if (this.state) {
                return false;
            }
            
            this.$store.commit("setLoading", true);
            let path = this.imgPath.join(",");
            let that = this;
            let data = {
                url: "/recipes/addEduRecipes",
                method: "post",
                data: {
                    recipes_file: path,
                    explain: this.valText,
                    title: this.valTitle
                }
            };
            this.state = true;
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    setTimeout(() => {
                        that.$router.go(-1);
                    }, 1000);
                } else {
                    that.$message.error(res.data.msg);
                    that.state = false;
                }
            });
        },
        // 修改食谱
        updataRecipes() {
            if (this.valTitle == "") {
                this.$message.error("请输入标题");
                return;
            }
            if (this.valText == "") {
                this.$message.error("请输入推荐说明");
                return;
            }
            this.$store.commit("setLoading", true);
            let path = this.imgPath.join(",");
            let that = this;
            let data = {
                url: "/recipes/editEduRecipes",
                method: "post",
                data: {
                    recipes_file: path,
                    explain: this.valText,
                    id: this.dataId,
                    title: this.valTitle
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    setTimeout(() => {
                        that.$router.go(-1);
                    }, 1000);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#NewDishes {
    width: 100%;
    background: #ffffff;
}
.NewDishes_main {
    width: 100%;
    padding: 24px;
    border-top: 1px solid #eff1f5;
    box-sizing: border-box;
}
.NewDishes_main_item,
.NewDishes_main_items {
    margin-bottom: 30px;
}
.NewDishes_main_item > div:first-child,
.NewDishes_main_items > div:first-child {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(52, 52, 52, 1);
    line-height: 28px;
    margin-bottom: 20px;
}
.NewDishes_main_item_text {
    width: 566px;
    height: 234px;
    border: 1px solid rgba(211, 211, 211, 1);
    border-radius: 5px;
    resize: none;
    padding: 20px;
    box-sizing: border-box;
}
/* .uploads {
    width: 436px;
    height: 230px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(153, 153, 153, 1);
    border-radius: 5px;
} */
.ant-upload-drag-icon img {
    width: 108px;
    height: 90px;
}
.updata_main {
    width: 436px;
    height: 230px;
    background: rgba(245, 245, 245, 1);
    /* border: 1px solid rgba(153, 153, 153, 1); */
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.upload_text {
    font-size: 14px;
    color: #02bb72;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    margin-left: 5px;
    border-bottom: 1px solid #02bb72;
}
.colFont {
    font-size: 14px !important;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(154, 154, 154, 1) !important;
}
.NewDishes_btn {
    width: 230px;
    height: 50px;
    background: rgba(2, 187, 114, 1);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
}
.inps {
    width: 466px;
    height: 40px;
    padding: 12px 20px;
    box-sizing: border-box;
    margin-top: 18px;
    border: 1px solid rgba(210, 210, 210, 1);
    border-radius: 5px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
}
.NewDishes_main_item_title {
    margin-bottom: 30px;
}
</style>
<style>
.ant-upload-list-picture-card .ant-upload-list-item,
.ant-upload-list-picture-card-container {
    width: 436px !important;
    height: 230px !important;
    object-fit: cover;
}
</style>