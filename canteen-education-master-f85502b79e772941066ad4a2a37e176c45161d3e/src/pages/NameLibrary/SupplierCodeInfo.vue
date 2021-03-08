<template>
    <div id="SupplierCodeInfo">
        <a-page-header :title="titleTet" @back="() => $router.go(-1)" />
        <div class="SupplierCodeInfo_main">
            <div class="SupplierCodeInfo_top">
                <div>申请时间：{{ dataVal.check_info.create_time }}</div>
                <div>关联学校：{{ dataVal.check_info.school_name }}</div>
                <div>
                    学校审核通过时间：{{
                        dataVal.check_info.school_examine_time
                    }}
                </div>
                <div v-if="dataVal.check_info.sec_status != 0">
                    教委审核时间：{{ dataVal.check_info.sec_examine_time }}
                </div>
                <div v-if="dataVal.check_info.sec_status != 0">
                    审核结果：{{
                        dataVal.check_info.sec_status == 1
                            ? "审核通过"
                            : "审核未通过"
                    }}
                </div>
            </div>
            <div class="basicInfo">
                <div class="left">
                    <div class="title">基本信息</div>
                    <div>供应商全称：{{ dataVal.supplier_info.name }}</div>
                    <div>
                        供应商简称：{{ dataVal.supplier_info.abbreviation }}
                    </div>
                    <div>企业类型：{{ dataVal.supplier_info.nature }}</div>
                    <div>联 系 人：{{ dataVal.supplier_info.contacts }}</div>
                    <div>
                        联系电话：{{ dataVal.supplier_info.contacts_mobile }}
                    </div>
                </div>
                <div class="right mt40">
                    <div>LOGO</div>
                    <viewer>
                        <img
                            v-if="
                                dataVal.supplier_info.logo &&
                                dataVal.supplier_info.logo != ''
                            "
                            alt=""
                            :src="dataVal.supplier_info.logo"
                            v-lazy="dataVal.supplier_info.logo"
                        />
                        <img
                            v-else
                            :src="require('../../assets/image/logos.png')"
                            v-lazy="require('../../assets/image/logos.png')"
                            alt=""
                        />
                    </viewer>
                </div>
            </div>
            <div class="basicInfo">
                <div class="left">
                    <div class="title">法人信息</div>
                    <div>法人：{{ dataVal.supplier_info.legal_person }}</div>
                    <div>
                        联系电话：{{
                            dataVal.supplier_info.legal_person_mobile
                        }}
                    </div>
                    <div>身份证号码：{{ dataVal.supplier_info.id_card }}</div>
                    <div>家庭地址：{{ dataVal.supplier_info.legal_person_address }}</div>
                </div>
            </div>
            <div class="basicInfo">
                <div class="left">
                    <div class="title">其他信息</div>
                    <div>供应品类：{{ dataVal.check_info.product_str }}</div>
                    <div>
                        办公地址：{{ dataVal.supplier_info.office_address }}
                    </div>
                    <div>
                        仓库地址：{{ dataVal.supplier_info.warehouse_address }}
                    </div>
                    <div>
                        合作时间：{{ dataVal.check_info.start_time }}至{{
                            dataVal.check_info.end_time
                        }}
                    </div>
                </div>
            </div>
            <div class="basicInfo">
                <div class="left">
                    <div class="title">证件信息</div>
                    <div class="codeInfo_imgs">
                        <div class="codeInfo">
                            <div>食品经营许可证</div>
                            <div>
                                <viewer>
                                    <img
                                        v-if="
                                            dataVal.supplier_info.food_business_license &&
                                            dataVal.supplier_info.food_business_license != ''
                                        "
                                        alt=""
                                        class="codeImg"
                                        :src="dataVal.supplier_info.food_business_license"
                                        v-lazy="dataVal.supplier_info.food_business_license"
                                    />
                                    <img
                                        v-else
                                        alt=""
                                        class="codeImg"
                                        :src="require('../../assets/image/loaderr.png')"
                                        v-lazy="require('../../assets/image/loaderr.png')"
                                    />
                                </viewer>
                            </div>
                        </div>
                        <div class="codeInfo">
                            <div>营业执照</div>
                            <viewer>
                                <img
                                    v-if="
                                        dataVal.supplier_info.business_license &&
                                        dataVal.supplier_info.business_license != ''
                                    "
                                    alt=""
                                    class="codeImg"
                                    :src="dataVal.supplier_info.business_license"
                                    v-lazy="dataVal.supplier_info.business_license"
                                />
                                <img
                                    v-else
                                    alt=""
                                    class="codeImg"
                                    :src="require('../../assets/image/loaderr.png')"
                                    v-lazy="require('../../assets/image/loaderr.png')"
                                />
                            </viewer>
                        </div>
                        <div class="codeInfo">
                            <div>合同</div>
                            <div>
                                <viewer :images="dataVal.check_info.contract">
                                    <img class="codeImg" v-for="(src,index) in dataVal.check_info.contract"
                                        :key='index'
                                        :src="src"
                                        v-lazy="src" alt="">
                                </viewer>
                            </div>
                        </div>
                        <div class="codeInfo">
                            <div>保单</div>
                            <div>
                                <viewer :images="dataVal.supplier_info.insurance_image">
                                    <img class="codeImg" v-for="(src,index) in dataVal.supplier_info.insurance_image"
                                        :key='index'
                                        :src="src"
                                        v-lazy="src" alt="">
                                </viewer>
                            </div>
                        </div>
                        <div class="codeInfo">
                            <div>保证金</div>
                            <div>
                                <viewer :images="dataVal.check_info.bond_voucher">
                                    <img class="codeImg" v-for="(src,index) in dataVal.check_info.bond_voucher"
                                        :key='index'
                                        :src="src"
                                        v-lazy="src" alt="">
                                </viewer>
                            </div>
                        </div>
                        <div class="codeInfo">
                            <div>身份证正反面</div>
                            <div class="codeInfo_cd_right">
                                <div>
                                    <viewer>
                                        <img
                                            v-if="
                                                dataVal.supplier_info.front &&
                                                dataVal.supplier_info.front != ''
                                            "
                                            alt=""
                                            class="codeImg"
                                            :src="dataVal.supplier_info.front"
                                            v-lazy="dataVal.supplier_info.front"
                                        />
                                        <img
                                            v-else
                                            alt=""
                                            class="codeImg"
                                            :src="require('../../assets/image/loaderr.png')"
                                            v-lazy="require('../../assets/image/loaderr.png')"
                                        />
                                    </viewer>
                                </div>
                                <div>
                                    <viewer>
                                        <img
                                            v-if="
                                                dataVal.supplier_info.behind &&
                                                dataVal.supplier_info.behind != ''
                                            "
                                            alt=""
                                            class="codeImg"
                                            :src="dataVal.supplier_info.behind"
                                            v-lazy="dataVal.supplier_info.behind"
                                        />
                                        <img
                                            v-else
                                            alt=""
                                            class="codeImg"
                                            :src="require('../../assets/image/loaderr.png')"
                                            v-lazy="require('../../assets/image/loaderr.png')"
                                        />
                                    </viewer>
                                </div>
                            </div>
                            <!-- src="../../assets/image/testbg.jpg" -->
                        
                        </div>
                    </div>
                    <div class="codeMain">
                        统一社会信用代码：{{
                            dataVal.supplier_info.credit_code
                        }}
                    </div>
                    <div>
                        食品经营许可证有效期至：{{
                            dataVal.supplier_info.fbl_end_time
                        }}
                    </div>
                </div>
            </div>
            <div class="basicInfo">
                <div class="left">
                    <div class="title">保险信息</div>
                    <div>
                        食品安全保险保额：{{
                            dataVal.supplier_info.insurance_amount
                        }}元
                    </div>
                    <div>
                        保险公司：{{ dataVal.supplier_info.insurance_company }}
                    </div>
                    <div>
                        保险期限：{{
                            dataVal.supplier_info.insurance_start_time
                        }}至{{ dataVal.supplier_info.insurance_end_time }}
                    </div>
                </div>
                
            </div>
            <div class="basicInfo">
                <div class="left">
                    <div class="title">履约保证金</div>
                    <div>缴纳金额：{{ dataVal.check_info.bond }}元</div>
                </div>
                
            </div>
            <div class="basicInfo" v-if="dataVal.check_info.sec_status == 0">
                <div class="left">
                    <div class="title">审批结果</div>
                    <div class="basicInfo_btn">
                        <a-radio-group name="radioGroup" v-model="appResults">
                            <a-radio :value="1">同意</a-radio>
                            <a-radio :value="2">不同意</a-radio>
                        </a-radio-group>
                        <!-- <div
                            @click="appResults = 1"
                            :class="appResults == 1 ? 'activeBind' : ''"
                        >
                            同意
                        </div>
                        <div
                            @click="appResults = 2"
                            :class="appResults == 2 ? 'activeBind' : ''"
                        >
                            不同意
                        </div> -->
                    </div>
                    <textarea
                        class="basicInfo_text"
                        v-if="appResults == 2"
                        cols="30"
                        rows="10"
                        v-model="appResultsText"
                        placeholder="不同意原因"
                    ></textarea>
                </div>
            </div>
            <div class="basicInfo" v-if="appResults == 1">
                <div class="left">
                    <div class="title">设置单位代码</div>
                    <div class="codeUpdata">
                        <input
                            type="text"
                            v-model="untilCode"
                            placeholder="输入代码"
                        />
                        <div
                            v-if="dataVal.check_info.sec_status != 0"
                            @click="untilCodeSure"
                        >
                            保存
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="footer_btn"
                v-if="
                    dataVal.check_info.cooperation == 0 &&
                    dataVal.check_info.sec_status == 0
                "
                @click="sureData(dataVal.check_info.sec_status)"
            >
                确 定
                <!-- {{ dataVal.check_info.sec_status == 0 ? "确 定" : "解除关联" }} -->
            </div>
            <div
                class="footer_btn"
                v-if="
                    dataVal.check_info.cooperation == 1 &&
                    dataVal.check_info.sec_status == 1
                "
                @click="sureData(dataVal.check_info.sec_status)"
            >
                解除关联
            </div>
            <div class="footer_btns" v-if="dataVal.check_info.cooperation == 3">
                已解除关联
            </div>
        </div>
        <!-- <div class="footer_btn">确 定</div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            superId: "",
            titleTet: "",
            untilCode: "",
            dataVal: {
                check_info: {
                    create_time: "",
                },
                supplier_info: {
                    name: "",
                },
            },
            appResults: 1,
            appResultsText: "",
        };
    },
    created() {
        let id = this.$route.query.id;
        this.superId = id;
        this.getDataVal(id);
    },
    methods: {
        // 获取详情
        getDataVal(id) {
            let that = this;
            this.$store.commit("setLoading", true);
            let data = {
                url: "/supplier/detail",
                method: "post",
                data: {
                    id: id,
                },
            };
            this.$apiAxiox(data).then((res) => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.dataVal = res.data.data;
                    that.untilCode = res.data.data.supplier_info.code;
                    if (res.data.data.check_info.sec_status == "0") {
                        this.titleTet = "审核";
                    } else {
                        this.titleTet = "查看详情";
                    }
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 保存单位代码
        untilCodeSure() {
            let that = this;
            let data = {
                url: "/supplier/setCode",
                method: "post",
                data: {
                    id: this.dataVal.check_info.supplier_id,
                    code: this.untilCode,
                },
            };
            this.$apiAxiox(data).then((res) => {
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.getDataVal(that.superId);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 审核
        approval(i) {
            let that = this;
            let data = {
                url: "/supplier/check",
                method: "post",
                data: {
                    id: this.superId,
                    status: i,
                },
            };
            this.$apiAxiox(data).then((res) => {
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.getDataVal(that.superId);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        sureData(i) {
            let that = this;
            if (i == 0) {
                let data = {
                    url: "/supplier/check",
                    method: "post",
                    data: {
                        id: this.superId,
                        status: this.appResults,
                        code: this.untilCode,
                        reasons_refusal: this.appResultsText,
                    },
                };
                this.$apiAxiox(data).then((res) => {
                    if (res.data.code == 1) {
                        that.$message.success(res.data.msg);
                        that.getDataVal(that.superId);
                    } else {
                        that.$message.error(res.data.msg);
                    }
                });
            } else {
                let data = {
                    url: "/supplier/relieveSupplier",
                    method: "post",
                    data: {
                        id: this.superId,
                    },
                };
                this.$apiAxiox(data).then((res) => {
                    if (res.data.code == 1) {
                        that.$message.success(res.data.msg);
                        that.getDataVal(that.superId);
                    } else {
                        that.$message.error(res.data.msg);
                    }
                });
            }
        },
    },
};
</script>

<style scoped>
#SupplierCodeInfo {
    width: 100%;
    background: #ffffff;
}
.SupplierCodeInfo_main {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-top: 1px solid #eff1f5;
}
.SupplierCodeInfo_top {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.SupplierCodeInfo_top > div {
    margin-right: 130px;
    margin-bottom: 20px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}
.basicInfo {
    width: 100%;
    display: flex;
    padding-bottom: 20px;
    margin-bottom: 30px;
    border-bottom: 1px solid #ededed;
}
.basicInfo .left .title {
    border-left: 6px solid #0c0b0b;
    padding-left: 18px;
    box-sizing: border-box;
    margin-bottom: 30px;
    font-size: 20px;
    font-family: "Source Han Sans CN";
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
}
.basicInfo .left {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
    margin-right: 260px;
}
.basicInfo .right {
    font-size: 20px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
}
.basicInfo .right img {
    width: 120px;
    height: 120px;
    margin-top: 20px;
    object-fit: cover;
}
.codeInfo div {
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 20px;
}
.codeInfo img {
    width: 180px;
    height: 110px;
    border-radius: 5px;
    margin-right: 30px;
    object-fit: cover;
}
.codeInfo_imgs {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}
/* .codeInfo_imgs > div:first-child {
    margin-right: 45px;
} */
.codeUpdata {
    width: 100%;
    display: flex;
    align-items: center;
}
.codeUpdata > input {
    width: 610px;
    height: 50px;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid rgba(225, 225, 229, 1);
    border-radius: 5px;
    font-size: 18px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: rgba(67, 67, 67, 0.5);
    margin-right: 32px;
}
.codeUpdata > div {
    width: 110px;
    height: 40px;
    background: rgba(1, 187, 113, 1);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
}
.basicInfo_btn {
    display: flex;
    align-items: center;
}
.basicInfo_btn div {
    /* width: 110px; */
    height: 40px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    /* background: rgba(203, 203, 203, 1); */
}
.basicInfo_btn > div:first-child {
    margin-right: 20px;
}
.basicInfo_btn .activeBind {
    background: rgba(1, 187, 113, 1);
}
.basicInfo_text {
    width: 500px;
    height: 234px;
    border: 1px solid rgba(211, 211, 211, 1);
    border-radius: 5px;
    resize: none;
    margin-top: 20px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(154, 154, 154, 1);
    line-height: 20px;
}
.codeMain {
    margin-top: 20px;
}
.footer_btn,
.footer_btns {
    width: 230px;
    height: 50px;
    background: rgba(1, 187, 113, 1);
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
.footer_btns {
    background: rgba(154, 154, 154, 1);
    cursor: no-drop;
}
.codeInfo_cd_right{
    display: flex;
    align-items: center;
    /* flex-wrap: wrap; */
}
.codeImg{
    width: 120px;
    height: 120px;
    object-fit: contain;
}
.mt40{
    margin-top: 40px;
}
</style>