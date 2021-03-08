<template>
    <div id="AddUser">
        <a-page-header :title="titleVal" @back="() => $router.go(-1)" />
        <div class="AddUser_main">
            <a-form
                :form="form"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 8 }"
                @submit="handleSubmit"
            >
                <div>
                    <a-form-item>
                        <div class="item_title">
                            <span>用户名（登录账号）</span
                            ><span class="item_title_start">*</span
                            ><span class="item_title_text">添加后不可修改</span>
                        </div>
                        <a-input
                            :disabled="status"
                            placeholder="填写用户名"
                            v-decorator="[
                                'userName',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写用户名'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                    <a-form-item>
                        <div class="item_title">角色权限</div>
                        <a-select
                            placeholder="选择一个角色权限"
                            v-decorator="[
                                'role',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择角色权限'
                                        }
                                    ]
                                }
                            ]"
                        >
                            <a-select-option
                                :value="item.id"
                                v-for="(item, index) in position"
                                :key="index"
                            >
                                {{ item.name }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item>
                        <div class="item_title">
                            <span>手机号码</span
                            ><span class="item_title_start">*</span
                            ><span class="item_title_text">添加后不可修改</span>
                        </div>
                        <a-input
                            :disabled="status"
                            placeholder="填写手机号码"
                            :maxLength="11"
                            v-decorator="[
                                'phone',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写手机号码'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                    <a-form-item>
                        <div class="item_title">登录密码</div>
                        <a-input
                            placeholder="填写登录密码"
                            :minLength="6"
                            :maxLength="20"
                            v-decorator="[
                                'full_name',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            min:6,
                                            message: '请填写登录密码,最少6位数'
                                        }
                                    ]
                                }
                            ]"
                        />
                    </a-form-item>
                    <div class="item_switch">
                        <div class="item_title">用户状态：</div>
                        <div>
                            <a-switch
                                checked-children="启用"
                                v-model="isSwitch"
                                un-checked-children="停用"
                            />
                        </div>
                    </div>
                </div>
                <div class="item_btn">
                    <a-button
                        type="primary"
                        html-type="submit"
                        class="login-form-button AddSchoolCode_main_footer"
                    >
                        {{ status ? "修改" : "保存" }}
                    </a-button>
                </div>
            </a-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: this.$form.createForm(this, { name: "coordinated" }),
            status: false,
            position: [],
            titleVal: "",
            isSwitch: true,
            userId:''
        };
    },
    created() {
        let id = this.$route.query.id;
        this.userId = id;
        this.getPosition();
        if (id) {
            this.titleVal = "编辑用户";
            this.status = true;
            this.getDataInfo(id);
        } else {
            this.titleVal = "添加用户";
            this.status = false;
        }
    },
    methods: {
        // 获取角色权限
        getPosition() {
            //获取角色筛选列表
            let that = this;
            let data = {
                url: "/role/userRole",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.position = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 新增、编辑
        handleSubmit(e) {
            e.preventDefault();
            let that = this;
            this.form.validateFields((err, values) => {
                if (!err) {
                    that.$store.commit("setLoading", true);
                    let sta = that.isSwitch == true?1:0;
                    let data = {
                        url: "/role/userDataManipulation",
                        method: "post",
                        data: {
                            username: values.userName,
                            mobile: values.phone,
                            role: values.role,
                            password: values.full_name,
                            status: sta,
                        }
                    };
                    if(that.status){
                        data.data.id = this.userId;
                    }
                    that.$apiAxiox(data).then(res => {
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
            });
        },
        // 获取用户信息
        getDataInfo(id) {
            let that = this;
            this.$store.commit("setLoading", true);
            let data = {
                url: "/role/userDetails",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.isSwitch = res.data.data.status == 1?true:false;
                    that.form.setFieldsValue({
                        userName: res.data.data.username,
                        phone: res.data.data.mobile,
                        role: res.data.data.role,
                        full_name: res.data.data.password
                    });
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
#AddUser {
    width: 100%;
    background: #ffffff;
}
.AddUser_main {
    width: 100%;
    padding: 24px;
    border-top: 1px solid #eff1f5;
    box-sizing: border-box;
}
.item_title {
    font-size: 14px;
    color: rgb(51, 51, 51);
}
.item_title_start {
    color: rgb(255, 102, 0);
    font-size: 18px;
    margin-right: 8px;
}
.item_title_text {
    color: rgb(162, 148, 148);
}
.item_switch {
    display: flex;
    align-items: center;
}
.item_btn {
    width: 100%;
    margin-top: 80px;
    display: flex;
    justify-content: center;
}
</style>