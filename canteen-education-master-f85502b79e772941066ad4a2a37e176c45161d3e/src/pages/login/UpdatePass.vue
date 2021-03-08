<template>
    <div id="boxs">
        <div class="login" style="height: 470px;">
            <div class="newpass">短信验证修改密码</div>
            <div class="formBox">
                <a-form-model
                    ref="dynamicValidateForm"
                    :model="postData"
                    :rules="rules"
                >
                    <a-form-model-item ref="name" prop="phone">
                        <div class="phoneVal">
                            <a-input
                            placeholder="手机号"
                            :maxLength="11"
                            v-model="postData.phone"
                        />
                        </div>
                            <!-- style="width:100%;" -->
                    </a-form-model-item>
                    <a-form-model-item
                        ref="code"
                        prop="code"
                        class="bettonFlex"
                    >
                        <a-input
                            class="code"
                            :maxLength="6"
                            placeholder="验证码"
                            v-model="postData.code"
                        />
                        <a-button
                            type="primary"
                            class="getBtn"
                            :loading="loading"
                            @click="SendCode"
                            v-show="sends.show"
                            >获取验证码</a-button
                        >
                        <a-button
                            type="primary"
                            class="getBtn"
                            v-show="!sends.show"
                            >{{ sends.count }} s</a-button
                        >
                    </a-form-model-item>
                    <a-button
                        type="primary"
                        html-type="submit"
                        class="logins nomarg"
                        @click="onSubmit"
                        >下一步</a-button
                    >
                    <div class="outlogin" @click="goBack">点击返回登录>></div>
                </a-form-model>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: this.$form.createForm(this, { name: "coordinated" }),
            postData: {
                phone: "",
                code: ""
            },
            rules: {
                phone: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur"
                    },
                    { validator: this.phoneCheck.bind(this), trigger: "blur" }
                ],
                code: [
                    { required: true, message: "请输入验证码", trigger: "blur" }
                ]
            },
            sends: {
                show: true,
                count: "",
                timer: null
            },
            loading: false
        };
    },
    methods: {
        phoneCheck(rule, value, callbackFn) {
            const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if (!reg.test(value)) {
                callbackFn("请输入正确的手机号码");
                return;
            }
            callbackFn();
        },
        goBack() {
            this.$router.go(-1);
        },
        onSubmit() {
            let that = this;
            this.$refs.dynamicValidateForm.validate(valid => {
                if (valid) {
                    let data = {
                        url: "/common/checkSms",
                        method: "post",
                        data: {
                            phone: this.postData.phone,
                            code: this.postData.code
                        }
                    };
                    this.$apiAxiox(data).then(res => {
                        if (res.data.code == 1) {
                            that.$message.success(res.data.msg);
                            this.$router.push({
                                path: "/SettingPassword",
                                query: { phone: this.postData.phone }
                            });
                        } else {
                            that.$message.error(res.data.msg);
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        SendCode() {
            let that = this;
            let data = {
                url: "/common/sendSms",
                method: "post",
                data: {
                    phone: this.postData.phone
                }
            };
            this.$apiAxiox(data).then(res => {
                // that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    // that.disabled = true;
                    that.$message.success(res.data.msg);
                    let num = 60;
                    that.sends.count = num;
                    that.sends.show = false;
                    let time = setInterval(() => {
                        num--;
                        if (num <= 0) {
                            that.sends.show = true;
                            clearInterval(time);
                        } else {
                            that.sends.count = num;
                        }
                    }, 1000);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped="scoped" lang="scss">
@import "../../assets/css/login_s.scss";
</style>
<style>
/* .ant-form-item-control-wrapper{
    width: 100%;
} */
</style>
