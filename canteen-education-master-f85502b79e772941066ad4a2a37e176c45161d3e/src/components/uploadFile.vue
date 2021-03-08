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
                支持上传 jpg/png 、视频、音频、文档文件，每个不超过 500kb
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
                    <div class="fileSpans">
                        <div v-if="item.load" class="upds smalls">
                            <a-spin>
                                <a-icon
                                    slot="indicator"
                                    type="loading"
                                    style="font-size: 18px"
                                    spin
                                />
                            </a-spin>
                        </div>
                        <div v-else>
                            <a-icon type="paper-clip" />
                        </div>
                        <span class="danshen">{{ item.name }}</span>
                    </div>
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
        multiple: {
            type: Boolean,
            default: true
        },
        accept: {
            type: String,
            default: "image/*"
        },
        fileArr: {
            type: Array,
            default: function() {
                return [];
            }
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
        fileArr: {
            handler(nesd) {
                this.imageUrl = nesd;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        setArr(data) {
            //赋值数据
            this.imageUrl = data;
        },
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
            let sizeNum = action.file.size / 1024;
            if(sizeNum > 500){
                return this.$message.error(
                        "文件不得超过500kb"
                    );
            }
            const file = action.file;
            // var fileName = file.name;
            var fileName =
                parseInt(Math.random() * 10000) + file.name;
            // var fileName =
            //     parseInt(Math.random() * 10000) + file.name.substring(0, 20);
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
    padding: 5px 10px;
    transition: all 0.3s;
    cursor: pointer;
    margin-top: 5px;
    > i {
        cursor: pointer;
    }
    > div {
        display: flex;
        align-items: center;
    }
}
.files:hover {
    background-color: rgba(1, 187, 114, 0.1);
}
.fileSpans > span {
    margin-left: 8px;
    max-width: 300px;
}
</style>
