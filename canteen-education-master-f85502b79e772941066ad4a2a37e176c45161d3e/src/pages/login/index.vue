<template>
    <div id="login" class="main">
        <div class="login">
            <div class="lBox">
                <div class="lPic">
                    <img
                        class="logo"
                        src="../../assets/image/logo.png"
                        alt=""
                    />
                    <p class="MfBold">智慧食堂教委端</p>
                    <div class="lineBox">
                        <img src="../../assets/image/picr.png" alt="" />
                        <p class="Mf">守护孩子每一餐</p>
                        <img src="../../assets/image/picl.png" alt="" />
                    </div>
                </div>

                <a-form
                    id="formLogin"
                    class="user-layout-login"
                    ref="formLogin"
                    :form="form"
                    @submit="handleSubmit"
                >
                    <a-form-item class="Mt20">
                        <a-input
                            class="tWidth"
                            size="large"
                            type="text"
                            :initialValue="user.name"
                            placeholder="帐户名"
                            v-decorator="[
                                'username',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入正确的用户名'
                                        }
                                    ],
                                    validateTrigger: 'change',
                                    initialValue: user.name
                                }
                            ]"
                        >
                            <a-icon
                                slot="prefix"
                                type="user"
                                :style="{ color: 'rgba(0,0,0,.25)' }"
                            />
                        </a-input>
                    </a-form-item>
                    <a-form-item class="Mt20">
                        <a-input-password
                            class="tWidth"
                            size="large"
                            type="password"
                            autocomplete="false"
                            placeholder="密码"
                            v-decorator="[
                                'password',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码'
                                        }
                                    ],
                                    validateTrigger: 'blur'
                                }
                            ]"
                        >
                            <a-icon
                                slot="prefix"
                                type="lock"
                                :style="{ color: 'rgba(0,0,0,.25)' }"
                            />
                        </a-input-password>
                    </a-form-item>
                    <!-- <a-form-item class="tWidth"> -->
                    <div class="forgetPwd">
                        <a-checkbox v-model="clickState">记住账户</a-checkbox>
                        <div @click="updatepass" class="forge-password"
                            >忘记密码</div
                        >
                    </div>
                    <!-- </a-form-item> -->
                    <!-- <a-form-item class="tWidth"> -->
                    <a-button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        class="login-button"
                        :loading="state.loginBtn"
                        :disabled="state.loginBtn"
                        >登录</a-button
                    >
                    <!-- </a-form-item> -->
                </a-form>
            </div>
        </div>
    </div>
</template>

<script>
// import globalApi from "../../globalApi/globalApi";
// import axios from "axios";
// import qs from "qs";
// import { constants } from "crypto";
export default {
    data() {
        return {
            loginBtn: false,
            loginType: 0,
            requiredTwoStepCaptcha: false,
            stepCaptchaVisible: false,
            form: this.$form.createForm(this),
            state: {
                time: 60,
                loginBtn: false,
                loginType: 0,
                smsSendBtn: false
            },
            user: {
                name: "",
                psd: ""
            },
            clickState: false
        };
    },
    created() {
        // let x = localStorage.getItem("username");
        if (
            localStorage.getItem("username") &&
            localStorage.getItem("username") != ""
        ) {
            this.user.name = localStorage.getItem("username");
            this.clickState = true;
        }
    },
    methods: {
        // handler
        handleSubmit(e) {
            e.preventDefault();
            localStorage.removeItem("sec_openKey");
            localStorage.removeItem("sec_cheakKey");
            localStorage.removeItem("cheakKeyItem");
            localStorage.removeItem("sec_token");
            this.$store.commit("setMenuList", []);
            // this.$store.commit("vuex", "");
            sessionStorage.removeItem("store");
            // const {
            //     form: { validateFields },
            //     state
            // } = this;
            let that = this;
            this.form.validateFields((err, values) => {
                if (!err) {
                    that.state.loginBtn = true;
                    let data = {
                        url: "/handle/login",
                        method: "post",
                        data: {
                            username: values.username,
                            password: values.password
                        }
                    };
                    this.$apiAxiox(data)
                        .then(res => {
                            if (res.data.code == 1) {
                                that.state.loginBtn = false;
                                // localStorage.setItem("sec_openKey", "NameLibrary");
                                localStorage.setItem(
                                    "sec_cheakKey",
                                    "BigDataAnalysis"
                                );
                                localStorage.setItem(
                                    "sec_token",
                                    res.data.data.access_token
                                );

                                var userInfo = {
                                    username: res.data.data.username,
                                    avatar: res.data.data.avatar,
                                    role: res.data.data.role
                                };
                                localStorage.setItem(
                                    "userInfo",
                                    JSON.stringify(userInfo)
                                );
                                setTimeout(() => {
                                    this.$notification.success({
                                        message: "欢迎",
                                        description: "登录成功！"
                                    });
                                }, 1000);
                                if (that.clickState == true) {
                                    localStorage.setItem(
                                        "username",
                                        values.username
                                    );
                                }
                                that.$router.push({ name: "ManagementPanel" });
                            } else {
                                that.$message.error(res.data.msg);
                                that.state.loginBtn = false;
                            }
                        })
                        .catch(err => {
                            state.loginBtn = true;
                            console.log(err);
                        });
                }
            });
        },
        // 忘记密码
        updatepass() {
            this.$router.push({ name: "UpdatePass" });
        }
    }
};
</script>

<style scoped>
.main .forge-password {
    font-family: "PingFang-SC-Medium";
    color: #02bb72;
    cursor: pointer;
}
.main {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #fff none no-repeat center center;
    background-size: cover;
    background-image: url("../../assets/image/lBg.png");
}
.login {
    display: flex;
    justify-content: center;
    width: 540px;
    height: 750px;
    background: #fff;
    margin-right: 92px;
    border-radius: 10px;
}
.login .lBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 395px;
    height: 540px;
    margin-top: 75px;
}
.login .lBox .lPic img.logo {
    margin-left: 32%;
}
.main .tWidth {
    width: 360px;
    height: 50px;
    margin: 0;
}
.forgetPwd {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.main .Mt20 {
    margin-bottom: 20px;
}
.main .logo {
    width: 114px;
    height: 129px;
    margin-bottom: 14px;
}
.main .lineBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 90px;
}
.main .lineBox .Mf {
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #02bb72;
    margin-bottom: 1px;
}
.main .lineBox img {
    width: 130px;
    height: 6px;
}
.MfBold {
    font-size: 30px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #02bb72;
    margin-bottom: 10px;
    text-align: center;
}
button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
    background: #02bb72;
    outline: none;
    border: none;
}
#rememberMe {
    outline: none;
}
button.ant-btn-lg {
    width: 100%;
}
</style>

<style>
#login .ant-input:hover,
#login .ant-input:focus {
    border-color: #02bb72;
}

#login .ant-checkbox-wrapper:hover .ant-checkbox-inner,
.ant-checkbox:hover .ant-checkbox-inner,
.ant-checkbox-input:focus + .ant-checkbox-inner:hover {
    border-color: #02bb72;
}
#login .ant-checkbox-wrapper:hover .ant-checkbox-inner,
.ant-checkbox:hover .ant-checkbox-inner,
.ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #02bb72;
    outline: none;
}
#login .ant-checkbox-checked .ant-checkbox-inner {
    border-color: #02bb72;
    background: #02bb72;
}
#login .ant-form-item-children {
    justify-content: space-between;
}
</style>
