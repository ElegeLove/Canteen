<template>
    <div id="RecommendedRecipesInfo">
        <a-page-header title="查看" @back="() => $router.go(-1)" />
        <div class="RecommendedRecipesInfo_main">
            <div>
                <div class="main_item_title">上传时间：</div>
                <div class="main_item_text">
                    {{ dataVal.create_time }}
                </div>
            </div>
            <div class="main_item">
                <div class="main_item_title">推荐食谱文档：</div>
                <div class="main_item_imgs">
                    <viewer :images="dataVal.recipes_file">
                        <img v-for="(item, index) in dataVal.recipes_file" :key="index"
                            :src="item"
                            v-lazy="item"
                            alt=""
                        />
                    </viewer>
                </div>
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
                </a-modal>
            </div>
            <div>
                <div class="main_item_title">标题：</div>
                <div class="main_item_text">
                    {{ dataVal.title }}
                </div>
            </div>
            <div class="main_item_bottom">
                <div class="main_item_title">推荐说明：</div>
                <div class="main_item_text">
                    {{ dataVal.explain }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            previewVisible: false,
            previewImage: require("../../assets/image/testbg.jpg"),
            imgList: [
                { imgPath: require("../../assets/image/testbg.jpg") },
                { imgPath: require("../../assets/image/testbg.jpg") }
            ],
            dataVal: {}
        };
    },
    created() {
        let id = this.$route.query.id;
        this.getInfo(id);
    },
    methods: {
        previewImg(i) {
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
        // 获取数据详情
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
                    that.dataVal = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#RecommendedRecipesInfo {
    width: 100%;
    background: #ffffff;
}
.RecommendedRecipesInfo_main {
    width: 100%;
    padding: 24px;
    border-top: 1px solid #eff1f5;
    box-sizing: border-box;
}
.main_item {
    margin-top: 30px;
}
.main_item_bottom{
    margin-top: 30px;
}
.main_item_title {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(52, 52, 52, 1);
    line-height: 28px;
}
.main_item_text {
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 28px;
    /* padding-left: 20px; */
}
.main_item_imgs {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.main_item_imgs img {
    width: 436px;
    height: 230px;
    border-radius: 5px;
    margin: 0 20px 20px 0;
    object-fit: contain;
}
</style>