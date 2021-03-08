<template>
    <div id="AddRole">
        <a-page-header :title="titleVal" @back="() => $router.go(-1)" />
        <div class="AddRole_main">
            <a-form-model
                ref="dynamicValidateForm"
                :model="postData"
                :rules="Validata"
            >
                <div class="boxss">
                    <div class="selec">
                        <p>角色名称</p>
                        <a-form-model-item ref="name" prop="name">
                            <a-input
                                placeholder="填写角色名称"
                                v-model="postData.name"
                            />
                        </a-form-model-item>
                    </div>
                    <div class="selec">
                        <p>角色描述</p>
                        <a-form-model-item ref="description" prop="description">
                            <a-textarea
                                placeholder="填写角色描述"
                                :rows="3"
                                v-model="postData.description"
                            />
                        </a-form-model-item>
                    </div>
                    <p class="moduels">模块选择</p>
                    <div class="treeBox">
                        <a-tree
                            v-if="lists.length !== 0"
                            v-model="postData.menu_auth"
                            checkable
                            :defaultExpandAll="true"
                            :tree-data="lists"
                            :replaceFields="{ key: 'id' }"
                        />
                    </div>
                    <a-button type="primary" @click="saves">{{
                        postData.id == "" ? "立即添加" : "更新保存"
                    }}</a-button>
                </div>
            </a-form-model>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            titleVal: "",
            type: "",
            lists: [],
            form: this.$form.createForm(this),
            postData: {
                id: "",
                name: "",
                description: "",
                menu_auth: []
            },
            Validata: {
                name: [
                    {
                        required: true,
                        message: "请填写职位名称",
                        trigger: "blur"
                    }
                ],
                description: [
                    {
                        required: true,
                        message: "请填写职位描述",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.postData.id = this.$route.query.id;
        this.getList();
        if (this.$route.query.id !== "") {
            this.getDetails(this.$route.query.id);
            this.titleVal = "编辑职位";
        } else {
            this.titleVal = "添加职位";
        }
    },
    methods: {
        getDetails(id) {
            //加载详情
            // this.$store.commit("setLoaing", true);
            // this.$http.RoleDetails({ id }).then(res => {
            //     this.$store.commit("setLoaing", false);
            //     if (res.code == 1) {
            //         this.postData = res.data;
            //     }
            // });

            let that = this;
            this.$store.commit("setLoading", true);
            let data = {
                url: "/role/details",
                method: "post",
                data: {
                    id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    let arr = []
                    res.data.data.menu_auth.forEach(item => {
                        item = parseInt(item);
                        arr.push(item)
                    })
                    that.postData = res.data.data;
                    that.postData.menu_auth = arr;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        saves() {
            //保存
            let that = this;
            this.$refs.dynamicValidateForm.validate(valid => {
                if (valid) {
                    that.$store.commit("setLoading", true);
                    // this.$http.RoleDataManipulation(this.postData).then(res => {
                    //     if (res.code == 1) {
                    //         this.$router.go(-1);
                    //     }
                    // });
                    let data = {
                        url: "/role/dataManipulation",
                        method: "post",
                        data: this.postData
                    };
                    if (that.status) {
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
                } else {
                    return false;
                }
            });
        },
        getList() {
            //获取权限列表
            // this.$http.RoleModule().then(res => {
            //     if (res.code == 1) {
            //         this.lists = res.data;
            //     }
            // });
            let that = this;
            let data = {
                url: "/role/module",
                method: "post",
                data: {}
            };
            if (that.status) {
                data.data.id = this.userId;
            }
            that.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.lists = res.data.data;
                    console.log(that.lists)
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped="scoped" lang="scss">
// .boxss {
//     box-sizing: border-box;
//     padding: 30px 40px;
//     background: #ffffff;
// }
#AddRole {
    width: 100%;
    background: #ffffff;
}
.AddRole_main {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-top: 1px solid #eff1f5;
}
.selec {
    margin-bottom: 50px;
    > p {
        font-size: 16px;
        color: #333333;
    }
    input {
        width: 270px;
    }
    textarea {
        width: 370px;
        resize: none;
        height: 140px;
    }
    .ant-checkbox-group {
        max-width: 900px;
        margin-top: 10px;
    }
    /deep/ .ant-checkbox-group-item {
        margin-right: 50px;
        margin-bottom: 35px;
    }
}
.treeBox {
    width: 900px;
    height: 500px;
    border: 1px solid #cccc;
    box-sizing: border-box;
    padding: 20px;
    overflow-y: scroll;
    margin-bottom: 20px;
}
.moduels {
    font-size: 16px;
    color: #333333;
}
</style>
