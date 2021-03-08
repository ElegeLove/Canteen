<template>
    <div id="Personal">
        <div class="Personal_main">
            <div class="Personal_main_top">个人中心</div>
            <div class="Personal_main_content">
                <div>用 户 I D：{{ dataVal.id }}</div>
                <div>
                    绑定手机：<span>{{ dataVal.mobile }}</span
                    >&emsp;<span
                        class="Personal_main_content_change"
                        @click="changePhone"
                        >更换</span
                    >
                </div>
                <div>账号：{{ dataVal.username }}</div>
                <div>
                    密码：<input
                        type="password"
                        disabled
                        class="Personal_main_content_pwd"
                        value="123456"
                    />&emsp;<span
                        class="Personal_main_content_change"
                        @click="changePwd"
                        >更换</span
                    >
                </div>
                <div>创建时间： {{ dataVal.create_time }}</div>
            </div>
        </div>
        <a-modal
            v-model="visible"
            title="密码修改"
            :centered="true"
            @ok="handleOk"
            cancelText="取 消"
            okText="确 认"
        >
            <a-form :form="form" class="model_box">
                <a-form-item>
                    <div class="model_main">
                        <div>原密码：&emsp;</div>
                        <a-input
                            class="inps"
                            v-decorator="[
                                'oldPwd',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入原密码',
                                            trigger: 'blur'
                                        },
                                        {
                                            required: true,
                                            min: 6,
                                            message: '密码最少6位数',
                                            trigger: 'blur'
                                        }
                                    ]
                                }
                            ]"
                            placeholder="请输入"
                        />
                    </div>
                </a-form-item>
                <a-form-item>
                    <div class="model_main">
                        <div>新密码：&emsp;</div>
                        <a-input
                            class="inps"
                            v-decorator="[
                                'newPwd',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入新密码',
                                            trigger: 'blur'
                                        },
                                        {
                                            required: true,
                                            min: 6,
                                            message: '密码最少6位数',
                                            trigger: 'blur'
                                        }
                                    ]
                                }
                            ]"
                            placeholder="请输入"
                        />
                    </div>
                </a-form-item>
                <a-form-item>
                    <div class="model_main">
                        <div>确认密码：</div>
                        <a-input
                            class="inps"
                            v-decorator="[
                                'rePwd',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入确认密码',
                                            trigger: 'blur'
                                        },
                                        {
                                            required: true,
                                            min: 6,
                                            message: '密码最少6位数',
                                            trigger: 'blur'
                                        }
                                    ]
                                }
                            ]"
                            placeholder="请输入"
                        />
                    </div>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            form: this.$form.createForm(this, { name: "dynamic_rule" }),
            oldPwd: "",
            newPwd: "",
            rePwd: "",
            dataVal: {}
        };
    },
    created() {
        this.getInfo();
    },
    methods: {
        // 获取页面信息
        getInfo() {
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/user/userInfo",
                method: "post",
                data: {}
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
        // 修改密码
        changePwd() {
            this.visible = true;
            this.oldPwd = "";
            this.newPwd = "";
            this.rePwd = "";
            this.form.setFieldsValue({
                oldPwd: '',
                newPwd: '',
                rePwd: '',
            });
        },
        // 确认重置密码
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.$store.commit("setLoading", true);
                    let that = this;
                    let data = {
                        url: "/user/changePwd",
                        method: "post",
                        data: {
                            old_password: values.oldPwd,
                            password: values.newPwd,
                            sure_password: values.rePwd
                        }
                    };
                    this.$apiAxiox(data).then(res => {
                        that.$store.commit("setLoading", false);
                        if (res.data.code == 1) {
                            that.visible = false;
                            that.$message.success(res.data.msg);
                        } else {
                            that.$message.error(res.data.msg);
                        }
                    });
                }
            });
        },
        // 修改手机号
        changePhone() {
            this.$router.push({
                path: "ChangePhone"
            });
        }
    }
};
</script>

<style scoped>
#Personal {
    width: 100%;
    padding: 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.Personal_main_top {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 20px;
}
.Personal_main_content {
    font-size: 16px;
    color: #000;
}
.Personal_main_content > div {
    margin: 10px 0;
}
.Personal_main_content_pwd {
    width: 216px;
    height: 32;
    background: rgb(245, 245, 245);
    padding: 0 10px;
    box-sizing: border-box;
    cursor: no-drop;
}
.Personal_main_content_change {
    color: rgba(2, 187, 114, 1);
    cursor: pointer;
}
.model_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.model_main {
    /* width: 100%; */
    display: flex;
    align-items: center;
    margin: 10px 0;
}
.model_main .inps {
    width: 200px;
    border: 1px solid rgb(217, 217, 217);
    padding: 0 10px;
    box-sizing: border-box;
}
</style>