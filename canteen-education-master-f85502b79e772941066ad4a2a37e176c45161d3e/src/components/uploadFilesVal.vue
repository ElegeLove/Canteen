<template>
    <div class="upBox">
        <a-upload
            name="avatar"
            :multiple="multiple"
            :accept="accept"
            :file-list="fileArr"
            :remove="removes"
            class="avatar-uploader uplods"
            :customRequest="customRequest"
        >
            <a-button> <a-icon type="upload" />上传文件</a-button>
        </a-upload>
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
            default: ".xls,.xlsx,.doc,.docx"
        },
        de_fileList: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            fileArr: []
        };
    },
    mounted() {
        this.fileArr = this.de_fileList;
    },
    methods: {
        setlists(data) {
            //赋值数据
            this.fileArr = data;
        },
        randoms() {
            //生成随机uuid
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0)
                    .toString(16)
                    .substring(1);
            }
            function getTime() {
                return new Date().getTime();
            }
            function prefixInteger(num, length) {
                return (Array(length).join("0") + num).slice(-length);
            }
            return (
                "z" + prefixInteger(getTime(), 15) + S4() + S4() + S4() + S4()
            );
        },
        customRequest(action) {
            if (this.max !== -1) {
                if (this.fileArr.length >= this.max) {
                    return this.$message.error(
                        "最多只能上传" + this.max + "个文件"
                    );
                }
            }
            const file = action.file;
            // var fileName =file.name.substring(0, 20);
            var fileName =
                parseInt(Math.random() * 10000) + file.name;
            // var fileName =
            //     parseInt(Math.random() * 10000) + file.name.substring(0, 20);
            this.fileArr.push({
                uid: this.randoms(),
                name: fileName,
                status: "uploading",
                url: ""
            });
            put(fileName, file)
                .then(result => {
                    this.fileArr.forEach(it => {
                        if (it.name == fileName) {
                            it.url = result.url;
                            it.status = "done";
                        }
                    });
                    this.$emit("getFile", this.fileArr);
                })
                .catch(e => {
                    put(fileName, file).then(result => {
                        this.fileArr.forEach(it => {
                            if (it.name == fileName) {
                                it.url = result.url;
                                it.status = "done";
                            }
                        });
                        this.$emit("getFile", this.fileArr);
                    });
                });
        },
        removes(e) {
            //删除
            this.fileArr.forEach((item, index) => {
                if (item.uid == e.uid) {
                    this.fileArr.splice(index, 1);
                }
            });
            this.$emit("getFile", this.fileArr);
        }
    }
};
</script>

<style scoped="scoped" lang="scss">
/deep/ .ant-upload-list {
    width: 250px !important;
}
</style>
