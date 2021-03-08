<template>
    <div id="AddSchoolCode">
        <a-page-header :title="titleVal" @back="() => $router.go(-1)" />
        <div class="AddSchoolCode_main">
            <div class="changeSchool">
                <a-radio-group name="radioGroup" v-model="radioNum">
                    <a-radio :value="0">
                        民办
                    </a-radio>
                    <a-radio :value="1">
                        非民办
                    </a-radio>
                </a-radio-group>
            </div>
            <a-form
                :form="form"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                @submit="handleSubmit"
            >
                <div class="AddSchoolCode_main_title">编制代码</div>
                <div>
                    <a-form-item label="学校全称">
                        <!-- :disabled="status" -->
                        <a-input
                            v-decorator="[
                                'full_name',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入学校全称'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                    <a-form-item label="学校简称">
                        <!-- :disabled="status" -->
                        <a-input
                            v-decorator="[
                                'abbreviation',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入学校简称'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                    <a-form-item label="学校代码">
                        <a-input
                            v-decorator="[
                                'code',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入学校代码'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                    <a-form-item label="所属片区">
                        <!-- :disabled="status" -->
                        <a-input
                            v-decorator="[
                                'area',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入所属片区'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                    <a-form-item label="所属乡镇">
                        <!-- :disabled="status" -->
                        <a-input
                            v-decorator="[
                                'township',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入所属乡镇'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                    <a-form-item label="学校类型">
                        <!-- :disabled="status" -->
                        <a-select
                            placeholder="请选择"
                            v-decorator="[
                                'schoolType',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择学校类型'
                                        }
                                    ]
                                }
                            ]"
                        >
                            <a-select-option
                                v-for="item in sclType"
                                :key="item.id"
                            >
                                {{ item.name }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <div class="AddSchoolCode_main_title">创建账号</div>
                    <a-form-item label="账号">
                        <a-input
                            v-decorator="[
                                'username',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入账号'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                    <a-form-item label="密码">
                        <a-input
                            type="password"
                            v-decorator="[
                                'password',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                </div>
                <a-button
                    type="primary"
                    html-type="submit"
                    class="login-form-button AddSchoolCode_main_footer"
                >
                    {{ status ? "修改" : "保存" }}
                </a-button>
            </a-form>

            <!-- <div class="AddSchoolCode_main_title">编制代码</div>
            <div class="AddSchoolCode_info">
                <div class="AddSchoolCode_info_item">
                    <div class="title">
                        <span class="colred" v-if="!status">*</span>
                        <span>
                            学校全称
                        </span>
                    </div>
                    <input
                        class="inps"
                        type="text"
                        :readonly="status"
                        :disabled="status"
                        placeholder="请输入"
                    />
                </div>
                <div class="AddSchoolCode_info_item">
                    <div class="title">
                        <span class="colred" v-if="!status">*</span>
                        <span>
                            学校简称
                        </span>
                    </div>
                    <input
                        class="inps"
                        type="text"
                        :readonly="status"
                        :disabled="status"
                        placeholder="请输入"
                    />
                </div>
                <div class="AddSchoolCode_info_item">
                    <div class="title">
                        <span class="colred">*</span>
                        <span>
                            学校代码
                        </span>
                    </div>
                    <input class="inps" type="text" placeholder="请输入" />
                </div>
                <div class="AddSchoolCode_info_item">
                    <div class="title">
                        <span class="colred" v-if="!status">*</span>
                        <span>
                            所属片区
                        </span>
                    </div>
                    <input
                        class="inps"
                        type="text"
                        :readonly="status"
                        :disabled="status"
                        placeholder="请输入"
                    />
                </div>
                <div class="AddSchoolCode_info_item">
                    <div class="title">
                        <span class="colred" v-if="!status">*</span>
                        <span>
                            所属乡镇
                        </span>
                    </div>
                    <input
                        class="inps"
                        type="text"
                        :readonly="status"
                        :disabled="status"
                        placeholder="请输入"
                    />
                </div>
            </div>
            <div class="AddSchoolCode_info_item">
                <div>学校类型：</div>
                <a-select
                    placeholder="请选择"
                    style="width:466px;height:40px;marginTop:18px;"
                    @change="handleChange"
                    :disabled="status"
                >
                    <a-select-option v-for="(item, i) in sclType" :key="i">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
            <div>
                <div class="AddSchoolCode_main_title">创建账号</div>
                <div class="AddSchoolCode_info">
                    <div class="AddSchoolCode_info_item">
                        <div class="title">
                            <span class="colred">*</span>
                            <span>
                                账号
                            </span>
                        </div>
                        <input class="inps" type="text" placeholder="请输入" />
                    </div>
                    <div class="AddSchoolCode_info_item">
                        <div class="title">
                            <span class="colred">*</span>
                            <span>
                                密码
                            </span>
                        </div>
                        <input
                            class="inps"
                            type="password"
                            maxlength="12"
                            minlength="6"
                            name=""
                            id=""
                            placeholder="请输入6-12位"
                        />
                    </div>
                </div>
            </div>
            <div class="AddSchoolCode_main_footer">保存</div> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            radioNum: 0,
            formLayout: "horizontal",
            form: this.$form.createForm(this, { name: "coordinated" }),
            schoolType: "",
            category: "",
            status: false,
            number: "",
            unit: "",
            iscreat: true,
            unitAbbreviation: "",
            schoolId: "",
            sclType: [],
            titleVal: ""
        };
    },
    created() {
        this.getSchoolType();
        if (this.$route.query.id) {
            this.status = true;
            this.schoolId = this.$route.query.id;
            this.getDataInfo(this.$route.query.id);
            this.titleVal = "修改学校";
        } else {
            this.titleVal = "新增学校";
        }
    },
    methods: {
        getSchoolType() {
            let that = this;
            let data = {
                url: "/school/schoolType",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.sclType = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        handleSubmit(e) {
            e.preventDefault();
            let that = this;
            this.form.validateFields((err, values) => {
                if (!err) {
                    // that.$store.commit("setLoading", true);
                    // let num = parseInt(values.schoolType);
                    if (that.status) {
                        let data = {
                            url: "/school/editInfo",
                            method: "post",
                            data: {
                                id: that.schoolId,
                                nature: that.radioNum,
                                user_name: values.username,
                                password: values.password,
                                code: values.code,
                                full_name: values.full_name,
                                abbreviation: values.abbreviation,
                                area: values.area,
                                township: values.township,
                                type: values.schoolType
                            }
                        };
                        that.$apiAxiox(data).then(res => {
                            // that.$store.commit("setLoading", false);
                            if (res.data.code == 1) {
                                that.$message.success(res.data.msg);
                                setTimeout(() => {
                                    that.$router.go(-1);
                                }, 1000);
                            } else {
                                that.$message.error(res.data.msg);
                            }
                        });
                    } else {
                        let data = {
                            url: "/school/addSchool",
                            method: "post",
                            data: {
                                full_name: values.full_name,
                                nature: that.radioNum,
                                abbreviation: values.abbreviation,
                                code: values.code,
                                area: values.area,
                                township: values.township,
                                type: values.schoolType,
                                username: values.username,
                                password: values.password
                            }
                        };
                        that.$apiAxiox(data).then(res => {
                            // that.$store.commit("setLoading", false);
                            if (res.data.code == 1) {
                                that.$message.success(res.data.msg);
                                setTimeout(() => {
                                    that.$router.go(-1);
                                }, 1000);
                            } else {
                                that.$message.error(res.data.msg);
                            }
                        });
                    }
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
                    this.form.setFieldsValue({
                        full_name: res.data.data.school_info.full_name,
                        abbreviation: res.data.data.school_info.abbreviation,
                        code: res.data.data.school_info.code,
                        area: res.data.data.school_info.area,
                        schoolType: res.data.data.school_info.type,
                        township: res.data.data.school_info.township,
                        username: res.data.data.user_info.username
                        // password: res.data.data.school_info.abbreviation
                    });
                    this.schoolType = res.data.data.school_info.type_name;
                    this.radioNum = res.data.data.school_info.nature;
                    // type: that.sclType[num].id,
                    // that.dataVal = res.data.data;res.data.data.school_info.type
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#AddSchoolCode {
    width: 100%;
    background: #ffffff;
}
.changeSchool{
    margin-bottom: 20px;
}
.AddSchoolCode_main {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-top: 1px solid #eff1f5;
}

.AddSchoolCode_main_title {
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
.colred {
    color: red;
}
.inps {
    width: 466px;
    height: 40px;
    padding: 12px 20px;
    box-sizing: border-box;
    margin-top: 18px;
    border: 1px solid rgba(210, 210, 210, 1);
    border-radius: 5px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
}
.AddSchoolCode_info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.AddSchoolCode_info_item {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #333333;
    margin-right: 36px;
    margin-bottom: 25px;
}
.AddSchoolCode_main_footer {
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
}
.formBox {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
</style>