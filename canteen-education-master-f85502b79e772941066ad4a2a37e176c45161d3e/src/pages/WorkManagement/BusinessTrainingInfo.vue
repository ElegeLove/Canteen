<template>
    <div id="BusinessTrainingInfo">
        <div class="BusinessTrainingInfo_top">
            <a-page-header title="查看" @back="() => $router.go(-1)" />
            <div class="BusinessTrainingInfo_top_main">
                <div>培训主题：{{dataVal.title}}</div>
                <div>创建时间：{{dataVal.create_time}}</div>
            </div>
        </div>
        <div class="BusinessTrainingInfo_main">
            <div class="BusinessTrainingInfo_main_top">
                <div>培训内容</div>
            </div>
            <div class="BusinessTrainingInfo_main_content">
                <div v-html="dataVal.content"></div>
                <div class="upload_main">
                    <div class="upload_main_title">文件：</div>
                    <div class="upload_main_text" v-for="(item, index) in pathVal" :key="index">
                        <div @click="urlShow(item.url)">{{item.name}}</div>
                    </div>
                    <!-- <div>
                        <video class="upload_entertainment" controls src="../../assets/video.mp4"></video>
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
            main:`<p>生活中的很多蔬菜，看着营养健康，无毒无害</p>`,
            dataVal:{},
            pathVal:[]
        };
    },
    created() {
        let id = this.$route.query.id;
        this.getInfo(id);
    },
    methods: {
        getInfo(id){
            let that = this;
            let data = {
                url: "/management/businessDetail",
                method: "post",
                data: {
                    id: id,
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.dataVal = res.data.data;
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
}
.BusinessTrainingInfo_top {
    width: 100%;
    background: #ffffff;
}
.BusinessTrainingInfo_top_main {
    width: 100%;
    padding: 24px;
    border-top: 1px solid #eff1f5;
    box-sizing: border-box;
    font-size: 24px;
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
.upload_entertainment{
    width: 277px;
    height: 170px;
    margin-top: 20px;
}
</style>