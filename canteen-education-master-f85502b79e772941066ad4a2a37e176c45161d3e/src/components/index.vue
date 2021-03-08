<template>
    <div class="upBox">
        <a-upload-dragger
            name="avatar"
            :multiple="multiple"
            :accept="accept"
            listType="picture-card"
            class="avatar-uploader uplods"
            :showUploadList="false"
            :customRequest="customRequest"
            :beforeUpload="beforeUpload"
            @change="handleChange"
        >
            <p class="ant-upload-drag-icon">
                <!-- <a-icon type="inbox" /> -->
                <img src="../assets/image/pic_04.png" alt="" />
            </p>
            <p class="ant-upload-text">
                将文件拖到此处，或<span class="upload_text">点击上传</span>
            </p>
            <p class="ant-upload-hint">
                只能上传 jpg/png 文件
            </p>
        </a-upload-dragger>
        <div class="imgBox">
            <div
                v-for="(item, index) in imageUrl"
                :key="index"
                :class="{
                    imgbo: accept == 'image/*',
                    filebo: accept != 'image/*'
                }"
            >
                <div v-if="accept == 'image/*' && item.load" class="upds">
                    <a-spin />
                </div>
                <div class="img" v-if="accept == 'image/*'">
                    <img v-lazy="item.url" />
                    <div>
                        <a-icon type="eye" @click="openImg(item.url)" />
                        <a-icon type="delete" @click="delets(index)" />
                    </div>
                </div>
                <div v-else class="files">
                    <span class="danshen">{{ item.name }}</span>
                    <a-icon type="delete" @click="delets(index)" />
                </div>
            </div>
        </div>
        <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
        >
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import { put } from "../assets/js/upload";
export default {
    props: {
        max: {
            type: Number,
            default: 1
        },
        imgPath: {
            type: Array,
            default: function(data) {
                return { message: "I am from propE." };
            }
        },
        multiple: {
            type: Boolean,
            default: true
        },
        accept: {
            type: String,
            default: "image/*"
        }
    },
    data() {
        return {
            imageUrl: [],
            previewVisible: false,
            previewImage: ""
        };
    },
    watch: {
        imgPath: {
            //深度监听，可监听到对象、数组的变化
            handler(newV, oldV) {
                if (newV && newV.length > 0) {
                    let arr = [];
                    newV.forEach(item => {
                        let obj = {
                            url: item
                        };
                        arr.push(obj);
                    });
                    this.imageUrl = arr;
                }
            },
            immediate: true
        }
    },
    mounted() {
        if (this.imgPath && this.imgPath.length > 0) {
            let arr = [];
            this.imgPath.forEach(item => {
                let obj = {
                    url: item
                };
                arr.push(obj);
            });
            this.imageUrl = arr;
        }
    },
    methods: {
        handleCancel() {
            this.previewVisible = false;
        },
        openImg(url) {
            //打开图片
            if (url == "") {
                return false;
            }
            this.previewImage = url;
            this.previewVisible = true;
        },
        delets(index) {
            //删除
            this.imageUrl.splice(index, 1);
            this.$emit("getFile", this.imageUrl);
        },
        customRequest(action) {
            if (this.max !== -1) {
                if (this.imageUrl.length >= this.max) {
                    return this.$message.error(
                        "最多只能上传" + this.max + "个文件"
                    );
                }
            }
            const file = action.file;
            var fileName = parseInt(Math.random() * 10000) + file.name;
            this.imageUrl.push({
                load: true,
                name: fileName,
                url: ""
            });
            put(fileName, file)
                .then(result => {
                    this.imageUrl.forEach(it => {
                        if (it.name == fileName) {
                            it.url = result.url;
                            it.load = false;
                        }
                    });
                    this.$emit("getFile", this.imageUrl);
                })
                .catch(e => {
                    put(fileName, file).then(result => {
                        this.imageUrl.forEach(it => {
                            if (it.name == fileName) {
                                it.url = result.url;
                                it.load = false;
                            }
                        });
                        this.$emit("getFile", this.imageUrl);
                    });
                });
        },
        handleChange(info) {
            // if (info.file.status === 'uploading') {
            //   this.loading = true
            // }
        },
        beforeUpload(file) {
            // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
            // if (!isJpgOrPng) {
            //   this.$message.error('只允许上传图片')
            // }
        }
    }
};
</script>

<style scoped="scoped" lang="scss">
/deep/ .ant-upload.ant-upload-drag {
    width: 500px !important;
    height: 200px !important;
    border-radius: 10px !important;
}
.upBox {
    width: 500px !important;
}
.imgBox {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .imgbo > .img:hover > div {
        opacity: 1;
    }
    .filebo {
        width: 100%;
    }
    > .imgbo {
        margin-top: 20px;
        margin-right: 20px;
        width: 100px;
        height: 100px;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        padding: 7px;
        border: 1px solid #ccc;

        > .upds {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            position: absolute;
            top: 0;
            left: 0;
            color: #ffff;
            width: 100%;
            height: 100%;
            z-index: 600;
            background-color: rgba(0, 0, 0, 0.3);

            /deep/ .ant-spin-dot-item {
                background-color: #fff !important;
            }
        }

        > .img {
            width: 100%;
            height: 100%;
            position: relative;

            > img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            > div {
                display: flex;
                opacity: 0;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                z-index: 200;
                left: 0;
                align-items: center;
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.5);
                transition: all 0.3s;

                > i {
                    color: #fff;
                    font-size: 16px;
                    cursor: pointer;
                }

                > i:nth-of-type(1) {
                    margin-right: 9px;
                }
            }
        }
    }
}
.files {
    width: 100% !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 5px 0;
    margin-top: 5px;
    > i {
        cursor: pointer;
    }
}
.upload_text {
    font-size: 16px;
    color: #02bb72;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    margin-left: 5px;
    border-bottom: 1px solid #02bb72;
}
// .files:hover{
//   // background-color: rgba();
// }
</style>
