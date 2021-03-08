<template>
    <div id="SchoolCodeInfo">
        <div class="bgff SchoolCodeInfo_topMain">
            <a-page-header title="查看详情" @back="() => $router.go(-1)" />
            <div class="SchoolCodeInfo_topMain_box">
                <div class="SchoolCodeInfo_top">
                    <div>{{ dataVal.school_info.full_name }}</div>
                    <div @click="updataInfo">
                        <a-icon type="form" />
                        <div>修改学校信息</div>
                    </div>
                </div>
                <!-- <div>已关联</div> -->
            </div>
        </div>
        <div class="bgff schoolInfo">
            <div>办学信息</div>
            <div>
                <div>学校简称：{{ dataVal.school_info.abbreviation }}</div>
                <div>学校类别：{{ dataVal.school_info.type_name }}</div>
                <div>学校代码：{{ dataVal.school_info.code }}</div>
                <div>
                    统一社会信用代码：{{ dataVal.school_info.credit_code }}
                </div>
                <div>详细地址：{{ dataVal.school_info.address }}</div>
                <div>所属片区：{{ dataVal.school_info.area }}</div>
                <div>所属乡镇：{{ dataVal.school_info.township }}</div>
            </div>
        </div>
        <div class="SchoolInfoBox">
            <div class="bgff SchoolInfoBox_item">
                <div>负责人信息</div>
                <div>学校法人代表：{{ dataVal.school_info.legal_person }}</div>
                <div>
                    法人联系电话：{{ dataVal.school_info.legal_person_mobile }}
                </div>
                <div>校长：{{ dataVal.school_info.principal }}</div>
                <div>
                    校长联系电话：{{ dataVal.school_info.principal_mobile }}
                </div>
            </div>
            <div
                class="bgff SchoolInfoBox_item"
                v-if="dataVal.school_info.affiliated_kindergarten == 1"
            >
                <div>附属幼儿园</div>
                <div>幼儿园长：{{ dataVal.school_info.director }}</div>
                <div>
                    幼儿园长联系电话：{{ dataVal.school_info.director_mobile }}
                </div>
                <div>
                    是否为普惠：{{
                        dataVal.school_info.inclusive_garden == 0 ? "否" : "是"
                    }}
                </div>
            </div>
            <div
                class="bgff SchoolInfoBox_item"
                v-for="(item, index) in dataVal.son_list"
                :key="index"
            >
                <div>村校{{ index + 1 }}</div>
                <div>村校全称：{{ item.full_name }}</div>
                <div>村校简称：{{ item.abbreviation }}</div>
                <div>任教教师：{{ item.chief_teacher }}</div>
                <div>教师联系电话：{{ item.chief_teacher_mobile }}</div>
                <div>详细地址：{{ item.address }}</div>
            </div>
        </div>
        <div class="footer">
            <div @click="accountOpen(dataVal.school_info.status)">
                {{ dataVal.school_info.status == 1 ? "停用账号" : "启用账号" }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataVal: {
                school_info: {
                    full_name: ""
                },
                ids: ""
            }
        };
    },
    created() {
        let id = this.$route.query.id;
        this.ids = id;
        this.getDataInfo(id);
    },
    methods: {
        updataInfo() {
            this.$router.push({
                path: "AddSchoolCode",
                query: {
                    id: this.ids
                }
            });
        },
        getDataInfo(id) {
            let that = this;
            this.$store.commit("setLoading", true);
            let data = {
                url: "/school/detail",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.dataVal = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 启用，禁用账号
        accountOpen(i) {
            let that = this;
            let dataVal = "";
            if (i == 1) {
                dataVal =
                    "停用学校账号后，学校将不可登录学校端，且不再对此学校进行数据统计。确定继续？";
            } else {
                dataVal =
                    "启用学校账号后，学校将恢复登录学校端，将恢复对此学校进行数据统计。确定继续？";
            }
            this.$confirm({
                title: "提示",
                icon: '<Icon type="question-circle" />',
                content: dataVal,
                centered: true,
                okText: "确认",
                cancelText: "取消",
                onOk() {
                    let data = {
                        url: "/school/changeStatus",
                        method: "post",
                        data: {
                            school_id: that.ids
                        }
                    };
                    that.$apiAxiox(data).then(res => {
                        if (res.data.code == 1) {
                            that.$message.success(res.data.msg);
                            that.getDataInfo(that.ids);
                        } else {
                            that.$message.error(res.data.msg);
                        }
                    });
                }
            });
        }
    }
};
</script>

<style scoped>
#SchoolCodeInfo {
    width: 100%;
    padding: 24px 0;
    /* background: #ffffff; */
    box-sizing: border-box;
}
.bgff {
    background: #ffffff;
}
.SchoolCodeInfo_topMain {
    padding: 0px 0 30px;
}
.SchoolCodeInfo_topMain_box {
    width: 100%;
    padding: 30px 30px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #eff1f5;
}
/* .SchoolCodeInfo_topMain_box > div:last-child {
    width: 160px;
    height: 50px;
    border-radius: 5px;
    background: rgb(8, 177, 135);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: "Microsoft YaHe" i;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
} */
.SchoolCodeInfo_top {
    display: flex;
    align-items: flex-end;
}
.SchoolCodeInfo_top > div:first-child {
    font-size: 36px;
    font-family: "Source Han Sans CN";
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    margin-right: 60px;
}
.SchoolCodeInfo_top > div:last-child {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: rgba(2, 187, 114, 1);
    cursor: pointer;
}
.SchoolCodeInfo_top > div > div {
    margin-left: 10px;
}
.schoolInfo {
    width: 100%;
    margin-top: 15px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 3px 3px 10px 0px rgba(247, 247, 247, 0.5);
}
.schoolInfo > div:first-child {
    padding-left: 8px;
    box-sizing: border-box;
    border-left: 4px solid #333333;
    line-height: 22px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 24px;
}
.schoolInfo > div:last-child {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
}
.schoolInfo > div:last-child > div {
    width: 352px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(101, 101, 101, 1);
    line-height: 40px;
    margin-right: 20px;
    word-wrap:break-word;
    word-break: break-all;
}
.SchoolInfoBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.SchoolInfoBox_item {
    width: 49%;
    min-height: 280px;
    margin-top: 16px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 3px 3px 10px 0px rgba(247, 247, 247, 0.5);
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(101, 101, 101, 1);
    line-height: 48px;
}
.SchoolInfoBox_item > div:first-child {
    padding-left: 8px;
    box-sizing: border-box;
    border-left: 4px solid #333333;
    line-height: 22px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 24px;
}
.footer {
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
.footer > div {
    width: 142px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #ccc;
    cursor: pointer;
}
</style>