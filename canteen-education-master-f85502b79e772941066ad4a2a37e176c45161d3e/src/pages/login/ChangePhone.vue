<template>
    <div id="ChangePhone">
        <div class="bgff ChangePhone_top">
            <a-page-header title="更换绑定手机" @back="() => $router.go(-1)" />
            <div class="ChangePhone_main">
                <div class="ChangePhone_topMain_box">
                    <div class="main_title_text">
                        <div class="main_schoolInfo_title">
                            请输入原密码验证身份
                        </div>
                        <a-input
                            type="text"
                            class="inps"
                            v-model="oldPwd"
                            placeholder="请输入原密码"
                        />
                    </div>
                </div>
                <div class="ChangePhone_main_bottom">
                    <div class="main_title_text">
                        <div class="main_schoolInfo_title">
                            新绑定手机号
                        </div>
                        <a-input
                            type="text"
                            class="inps"
                            :maxLength="11"
                            v-model="newPhone"
                            placeholder="输入手机号"
                        />
                    </div>
                    <div class="verCode_box">
                        <a-input
                            class="verCode"
                            v-model="codeVal"
                            type="text"
                            placeholder="输入验证码"
                        />
                        <button
                            class="verCode_btn"
                            @click="getCode"
                            :disabled="disabled"
                        >
                            {{ codeText }}
                        </button>
                    </div>
                    <div class="footer_btn" @click="sureChage">确认更换</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            county_name: "",
            disabled: false,
            codeText: "获取验证码",
            oldPwd: "",
            newPhone: "",
            codeVal: ""
        };
    },
    created() {},
    methods: {
        getCode() {
            let that = this;
            let data = {
                url: "/common/sendSms",
                method: "post",
                data: {
                    phone: this.newPhone
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.disabled = true;
                    that.$message.success(res.data.msg);
                    let num = 60;
                    let time = setInterval(() => {
                        num--;
                        if (num <= 0) {
                            that.codeText = "获取验证码";
                            that.disabled = false;
                            clearInterval(time);
                        } else {
                            that.codeText = num;
                        }
                    }, 1000);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        sureChage() {
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/common/changePhone",
                method: "post",
                data: {
                    password: this.oldPwd,
                    phone: this.newPhone,
                    code: this.codeVal
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
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
};
</script>

<style scoped>
#ChangePhone {
    width: 100%;
    padding: 24px 0;
    /* background: #ffffff; */
    box-sizing: border-box;
}
.bgff {
    background: #ffffff;
}
.ChangePhone_top {
    padding: 0px 0 30px;
}
.ChangePhone_main {
    padding: 0 20px;
    box-sizing: border-box;
}
.ChangePhone_topMain_box {
    width: 100%;
    padding: 0px 10px 40px;
    box-sizing: border-box;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    border-bottom: 10px solid #eeeeee;
}
.ChangePhone_main_bottom {
    width: 100%;
    margin-top: 30px;
    padding: 0px 10px;
    box-sizing: border-box;
}
.main_schoolInfo_title {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #343434;
    margin-bottom: 18px;
}
.main_title_text {
    font-size: 20px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #343434;
    margin: 30px 0;
}
.inps {
    width: 310px;
    height: 40px;
    border-radius: 5px;
}
.verCode_box {
    width: 100%;
    display: flex;
    align-items: center;
}
.verCode {
    width: 180px;
    height: 40px;
    border-radius: 5px;
    margin-right: 20px;
}
.verCode_btn {
    width: 108px;
    height: 40px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border: 1px solid rgba(2, 187, 114, 1);
    color: rgba(2, 187, 114, 1);
    cursor: pointer;
}
.footer_btn {
    width: 90px;
    height: 32px;
    background: rgba(2, 187, 114, 1);
    color: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    cursor: pointer;
}
button:disabled {
    cursor: no-drop;
}
</style>