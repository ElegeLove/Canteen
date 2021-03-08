<template>
    <div id="StaffInfo">
        <a-page-header title="员工详情" @back="() => $router.go(-1)" />
        <div class="StaffInfo_main">
            <div class="StaffInfo_main_box">
                <a-row>
                    <a-col :span="10">
                        <div>就职学校：{{dataVal.full_name}}</div>
                        <div>合同类型：{{dataVal.type_text}}</div>
                        <div>姓&emsp;&emsp;名：{{dataVal.name}}</div>
                        <div>性&emsp;&emsp;别：{{dataVal.sex_text}}</div>
                        <div>年&emsp;&emsp;龄：{{dataVal.age}}</div>
                        <div>职&emsp;&emsp;位：{{dataVal.position}}</div>
                        <div>入职日期：{{dataVal.entry_time}}</div>
                        <div>联系地址：{{dataVal.address}}</div>
                    </a-col>
                    <a-col :span="14">
                        <div>
                            <div>照片</div>
                            <viewer>
                            <img
                                class="top_img"
                                alt=""
                                v-lazy="dataVal.face_picture"
                            /></viewer>
                        </div>
                    </a-col>
                </a-row>
            </div>
            <div class="StaffInfo_main_boxs">
                <a-row>
                    <a-col :span="10">
                        <div>身份证号：{{dataVal.id_card}}</div>
                    </a-col>
                    <a-col :span="14">
                        <div>
                            <div>身份证正反面图片</div>
                            <div>
                                <img
                                    class="top_img"
                                    alt=""
                                    v-lazy="dataVal.front"
                                />
                                <img
                                    class="top_img"
                                    alt=""
                                    v-lazy="dataVal.behind"
                                />
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataVal:{}
        };
    },
    created() {
        let id = this.$route.query.id;
        console.log(id);
        this.getInfo(id);
    },
    methods: {
        // 获取详情
        getInfo(id) {
            this.$store.commit("setLoading", true);
            let that = this;
            that.loadShow = true;
            let data = {
                url: "/school/workerInfo",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                that.loadShow = false;
                if (res.data.code == 1) {
                    this.dataVal = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#StaffInfo {
    width: 100%;
    background: #ffffff;
}
.StaffInfo_main {
    width: 100%;
    border-top: 1px solid #eff1f5;
}
.StaffInfo_main_box,
.StaffInfo_main_boxs {
    padding: 24px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    border-bottom: 1px solid #f0f2f5;
}
.StaffInfo_main_boxs {
    border: none;
}
.top_img {
    width: 118px;
    height: 118px;
    border-radius: 4px;
    margin-top: 18px;
}
.StaffInfo_main_boxs .top_img {
    width: 170px;
    height: 110px;
    border-radius: 4px;
    margin-top: 18px;
    margin: 18px 32px 18px 0;
}
</style>