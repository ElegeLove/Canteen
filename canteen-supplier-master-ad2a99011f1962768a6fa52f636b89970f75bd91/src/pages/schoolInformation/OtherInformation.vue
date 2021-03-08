<template>
    <div class="pd58">
        <a-form
            :form="supplierOther"
            @submit="handleSubmit"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 24 }"
            class="mt40 w800"
        >
            <a-form-item>
                <div class="twoListInput">
                    <div class="twoListInputList">
                        <div class="pageImportantTitle">
                            <a class="colorE900">*</a>法定代表人
                        </div>
                        <a-input
                            v-decorator="[
                                'legal_person',
                                Validata.legal_person
                            ]"
                            class="w300"
                            placeholder="请输入法定代表人"
                        />
                    </div>
                    <div class="twoListInputList">
                        <div class="pageImportantTitle">
                            <a class="colorE900">*</a>身份证号码
                        </div>
                        <a-input
                            v-decorator="['id_card', Validata.id_card]"
                            class="w300"
                            placeholder="请输入身份证号码"
                        />
                    </div>
                </div>
            </a-form-item>
            <a-form-item>
                <div class="twoListInput">
                    <div>
                        <div class="pageImportantTitle">
                            <a class="colorE900">*</a>手机号
                        </div>
                        <a-input
                            v-decorator="[
                                'legal_person_mobile',
                                Validata.legal_person_mobile
                            ]"
                            class="w300"
                            placeholder="请输入手机号"
                        />
                    </div>
                    <div class="twoListInputList">
                        <div class="pageImportantTitle">家庭地址</div>
                        <a-input
                            v-decorator="['legal_person_address']"
                            class="w300"
                            placeholder="请输入家庭地址"
                        />
                    </div>
                </div>
            </a-form-item>
            <a-form-item>
                <div class="supplierInformation">
                    <div class="supplierInformationList">
                        <div class="pageImportantTitle">
                            <a class="colorE900">*</a>身份证正面
                        </div>
                        <up-file
                            @getImg="getImg($event, 'front')"
                            :max_num="1"
                            :de_fileList="front"
                            v-decorator="['front', Validata.front]"
                        >
                            <div>
                                <a-icon type="plus" />
                                <div class="ant-upload-text">上传</div>
                            </div>
                        </up-file>
                    </div>
                </div>
            </a-form-item>
            <a-form-item>
                <div class="supplierInformation">
                    <div class="supplierInformationList">
                        <div class="pageImportantTitle">
                            <a class="colorE900">*</a>身份证反面
                        </div>
                        <up-file
                            @getImg="getImg($event, 'behind')"
                            :max_num="1"
                            :de_fileList="behind"
                            v-decorator="['behind', Validata.behind]"
                        >
                            <div>
                                <a-icon type="plus" />
                                <div class="ant-upload-text">上传</div>
                            </div>
                        </up-file>
                    </div>
                </div>
            </a-form-item>

            <a-form-item>
                <div class="supplierInformation">
                    <div class="supplierInformationList">
                        <div class="pageImportantTitle">
                            LOGO
                        </div>
                        <up-file
                            @getImg="getImg($event, 'logo')"
                            :max_num="1"
                            :de_fileList="logo"
                            v-decorator="['logo']"
                        >
                            <div>
                                <a-icon type="plus" />
                                <div class="ant-upload-text">上传</div>
                            </div>
                        </up-file>
                    </div>
                </div>
            </a-form-item>
            <a-form-item>
                <div class="pageImportantTitle">
                    <a class="colorE900">*</a>购买食品安全保险保额(元)
                </div>
                <a-input
                    v-decorator="[
                        'insurance_amount',
                        Validata.insurance_amount
                    ]"
                    class="w800"
                    placeholder="请输入购买食品安全保险保额"
                />
            </a-form-item>
            <a-form-item>
                <div class="pageImportantTitle">
                    <a class="colorE900">*</a>保险公司
                </div>
                <a-input
                    v-decorator="[
                        'insurance_company',
                        Validata.insurance_company
                    ]"
                    class="w800"
                    placeholder="请输入保险公司"
                />
            </a-form-item>
            <a-form-item>
                <div class="pageImportantTitle">
                    <a class="colorE900">*</a>保险期限
                </div>
                <div class="mr30 flex">
                    <a-date-picker
                        v-decorator="[
                            'insurance_start_time',
                            Validata.insurance_start_time
                        ]"
                        format="YYYY-MM-DD"
                        valueFormat="YYYY-MM-DD"
                        class="height40 setIconStyleTop"
                        placeholder="选择开始时间"
                    />
                    <p class="liness pt10">—</p>
                    <a-date-picker
                        v-decorator="[
                            'insurance_end_time',
                            Validata.insurance_end_time
                        ]"
                        format="YYYY-MM-DD"
                        class="setIconStyle setIconStyleTop"
                        valueFormat="YYYY-MM-DD"
                        placeholder="选择结束时间"
                    />
                </div>
            </a-form-item>
            <a-form-item>
                <div class="supplierInformationList">
                    <div class="pageImportantTitle">
                        <a class="colorE900">*</a>上传保单(支持jpg,png,pdf格式)
                    </div>
                    <up-file
                        @getImg="getImg($event, 'insurance_image')"
                        :max_num="5"
                        :de_fileList="insurance_imagArr"
                        v-decorator="[
                            'insurance_image',
                            Validata.insurance_image
                        ]"
                    >
                        <div>
                            <a-icon type="plus" />
                            <div class="ant-upload-text">上传</div>
                        </div>
                    </up-file>
                </div>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12 }"
                ><a-button
                    type="primary"
                    html-type="submit"
                    class="submitBtnStyle 01BB71Btn"
                    >更新保存</a-button
                ></a-form-item
            >
        </a-form>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            supplierOther: this.$form.createForm(this),
            activeIndex: 0,
            loading: false,
            behind: [],
            logo: [],
            seachData: {},
            front: [],
            insurance_imagArr: [],
            Validata: {
                legal_person: {
                    rules: [{ required: true, message: "法定代表人" }]
                },
                id_card: {
                    rules: [{ required: true, message: "请输入身份证号码" }]
                },
                legal_person_mobile: {
                    rules: [
                        { required: true, message: "请输入手机号" },
                        { validator: this.$commonJs.phoneCheck.bind(this) }
                    ]
                },
                insurance_amount: {
                    rules: [{ required: true, message: "请输入购买保险金额" }]
                },
                insurance_company: {
                    rules: [{ required: true, message: "请输入保险公司" }]
                },
                insurance_image: {
                    rules: [
                        {
                            required: true,
                            message: "请上传保单(支持jpg,png,pdf格式)"
                        }
                    ]
                },
                front: {
                    rules: [{ required: true, message: "请上传身份证正面" }]
                },
                behind: {
                    rules: [{ required: true, message: "请上传身份证反面" }]
                }
            }
        };
    },
    mounted() {
        console.log(this.dataDictionary);
        this.$http.supplierInfo({}).then(res => {
            if (res.code == 1) {
                let {
                    insurance_company,
                    insurance_amount,
                    legal_person,
                    legal_person_mobile,
                    legal_person_address,
                    id_card,
                    front,
                    behind,
                    logo,
                    insurance_image,
                    insurance_end_time,
                    insurance_start_time
                } = res.data;
                this.$nextTick(() => {
                    this.supplierOther.setFieldsValue({
                        insurance_company,
                        insurance_amount,
                        legal_person,
                        legal_person_mobile,
                        id_card,
                        logo,
                        insurance_image,
                        legal_person_address,
                        front,
                        behind,
                        insurance_start_time,
                        insurance_end_time
                    });
                });
                if (front != "") {
                    this.front = [
                        {
                            uid: this.$commonJs.randoms(),
                            status: "done",
                            name: this.$commonJs.randoms(),
                            url: front
                        }
                    ];
                }
                if (behind != "") {
                    this.behind = [
                        {
                            uid: this.$commonJs.randoms(),
                            status: "done",
                            name: this.$commonJs.randoms(),
                            url: behind
                        }
                    ];
                }
                if (insurance_image != "") {
                    for (
                        let index = 0;
                        index < insurance_image.length;
                        index++
                    ) {
                        this.insurance_imagArr.push({
                            uid: this.$commonJs.randoms(),
                            status: "done",
                            name: this.$commonJs.randoms(),
                            url: insurance_image[index]
                        });
                    }
                }
                if (logo != "") {
                    this.logo = [
                        {
                            uid: this.$commonJs.randoms(),
                            status: "done",
                            name: this.$commonJs.randoms(),
                            url: logo
                        }
                    ];
                }
            }
        });
    },
    computed: {
        ...mapState(["dataDictionary", "dataDictionary", "is_info"])
    },
    methods: {
        getImg(data, type) {
            if (data.length !== 0) {
                this.supplierOther.setFieldsValue({
                    [type]: data[0].url
                });
            } else {
                this.supplierOther.setFieldsValue({
                    [type]: ""
                });
            }
        },
        ...mapMutations(["setIs_info"]),
        handleSubmit(e) {
            e.preventDefault();
            this.supplierOther.validateFields((err, values) => {
                if (!values.logo)
                    if (this.logo) values.logo = this.front[0].logo;
                let dataImgArr = [];
                if (this.insurance_imagArr) {
                    for (
                        let index = 0;
                        index < this.insurance_imagArr.length;
                        index++
                    ) {
                        dataImgArr.push(this.insurance_imagArr[index].url);
                        // console.log(this.insurance_imagArr[index].url);
                    }
                }
                values.insurance_image = dataImgArr.toString();
                for (const key in values) {
                    if (values[key] == null || values[key] == undefined) {
                        values[key] = "";
                    }
                }
                if (!err) {
                    let time = this.dataDictionary.fbl_end_time;
                    this.dataDictionary.fbl_end_time = time
                        ? time
                        : localStorage.getItem("fbl_end_time");
                    let postData = Object.assign(this.dataDictionary, values);
                    this.$http.supplier(postData).then(res => {
                        if (res.code == 1) {
                            // console.log(this.$store.state.is_info);
                            // console.log(this.is_info)
                            // console.log(res.data.is_info);
                            this.$store.state.dataDictionary = {};
                            if (this.$store.state.is_info == 0) {
                                this.setIs_info(1);
                                localStorage.setItem('openKey','product_management')
                                localStorage.setItem('cheakKey','ProductManagementList')
                                this.$router.push(
                                    "/ProductManagement/ProductManagementList"
                                );
                            } else {
                                // localStorage.removeItem("openKey");
                                // localStorage.removeItem("cheakKey");
                                localStorage.setItem('openKey','')
                                localStorage.setItem('cheakKey','ManagementPanel')
                                this.$router.push(
                                    "/ManagementPanel/InspectionPanel"
                                );
                            }
                        }
                    });
                }
            });
        }
    }
};
</script>
<style scoped>
.mt40 {
    margin-top: 40px;
}
.cheackPhoneFun {
    color: #01ba72;
    cursor: pointer;
}
.w800 {
    width: 800px;
}
.pd58 {
    padding: 0 58px;
}
.submitBtnStyle {
    width: 230px;
    height: 50px;
    background: rgba(1, 187, 113, 1);
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    border-radius: 5px;
}
.mb20 {
    margin-bottom: 20px;
}
.cheackSupplierInformation {
    border-bottom: 1px solid #eff1f5;
    padding: 0 40px;
    height: 85px;
    display: flex;
    line-height: 85px;
}
.cheackSupplierInformation div {
    width: auto;
    margin-right: 110px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 85px;
}
.supplierInformation {
    display: flex;
}
.w300 {
    width: 300px;
}
.w800 {
    width: 800px;
}
.h120 {
    height: 120px;
}
.supplierInformationList {
    margin-right: 90px;
}
.twoListInputList {
    /* width: 50%; */
    width: 300px;
}
.twoListInput {
    display: flex;
    justify-content: space-between;
}
.cheackImg {
    width: 120px;
    height: 36px;
    border: 1px solid rgba(219, 219, 219, 1);
    border-radius: 5px;
    font-size: 14px;
    line-height: 36px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    background-color: #fff;
    color: rgba(51, 51, 51, 1);
}
.avatar-uploader {
    width: 120px;
    height: 120px;
}
.avatar-uploader .ant-upload {
    width: 100%;
    height: 100%;
}
.cheackPhone {
    display: flex;
}
.cheackPhone div {
    margin-left: 30px;
}
</style>
