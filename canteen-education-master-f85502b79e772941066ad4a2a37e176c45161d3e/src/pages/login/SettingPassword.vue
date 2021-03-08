<template>
    <div id="boxs">
        <div class="login" style="height: 470px;" v-if="show">
            <div class="newpass">设置新密码</div>
            <div class="formBox">
                <a-form :form="form" @submit="handleSubmit">
                    <a-form-item>
                        <a-input-password
                            placeholder="6~20位数字或字母"
                            :maxLength="20"
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
                    <a-form-item>
                        <a-input-password
                            placeholder="确认密码"
                            v-decorator="[
                                're_password',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请确认密码'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                    <a-button
                        type="primary"
                        html-type="submit"
                        class="logins nomarg"
                        >确定</a-button
                    >
                    <div class="outlogin" @click="goBack">点击返回登录>></div>
                </a-form>
            </div>
        </div>
        <div class="login" style="height: 470px;" v-else>
            <div class="successBox">
                <img src="../../assets/image/success.png" />
                <div class="success">密码修改成功</div>
                <a-button type="primary" @click="goBack"
                    >返回登录（{{ minichken }}秒后自动返回）</a-button
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: this.$form.createForm(this),
            show: true,
            minichken: 3,
            phone: ""
        };
    },
    created() {
        this.phone = this.$route.query.phone;
    },
    methods: {
        setTimer() {
            //倒计时
            var that = this;
            var timer = setInterval(function() {
                that.minichken--;
                if (that.minichken == 0) {
                    clearInterval(timer);
                    that.$router.go(-2);
                }
            }, 1000);
        },
        handleSubmit(e) {
            e.preventDefault();
            let that = this;
            this.form.validateFields((err, values) => {
                if (!err) {
                    var objs = JSON.parse(JSON.stringify(values));
                    objs.mobile = this.phone;
                    let data = {
                        url: "/common/changePwdOrderPhone",
                        method: "post",
                        data: {
                            phone: that.phone,
                            password: objs.password,
                            sure_password: objs.re_password
                        }
                    };
                    that.$apiAxiox(data).then(res => {
                        if (res.data.code == 1) {
                            //忘记密码
                            that.show = false;
                            that.setTimer();
                        } else {
                            that.$message.error(res.data.msg);
                        }
                    });
                }
            });
        },
        goBack() {
            // this.$router.go(-1);
            // if (this.type == "update") {
            this.$router.go(-2);
            // } else {
            //     this.$router.go(-1);
            // }
        }
    }
};
</script>

<style scoped="scoped" lang="scss">
@import "../../assets/css/login_s.scss";
</style>
