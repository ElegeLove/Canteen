<template>
    <div id="BusinessTrainingInfo">
        <div class="BusinessTrainingInfo_top">
            <a-page-header title="查看" @back="() => $router.go(-1)" />
            <div class="BusinessTrainingInfo_top_main">
                <div>标题：{{ dataVal.title }}</div>
                <div>发送用户：{{ dataVal.user_type }}</div>
                <div>发送时间：{{ dataVal.create_time }}</div>
            </div>
        </div>
        <div class="BusinessTrainingInfo_main">
            <div class="BusinessTrainingInfo_main_content">
                <!-- <div class="upload_main_title">问卷回答要求</div> -->
                <div v-html="dataVal.content"></div>
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataVal: {},
            pathVal:[],
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
                url: "/management/noticeDetail",
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