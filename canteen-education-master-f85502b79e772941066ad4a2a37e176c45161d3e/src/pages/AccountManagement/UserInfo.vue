<template>
    <div id="UserInfo">
        <a-page-header title="查看详情" @back="() => $router.go(-1)" />
        <div class="UserInfo_main">
            <a-row>
                <a-col
                    :xs="24"
                    :sm="24"
                    :md="24"
                    :lg="12"
                    :xl="12"
                    class="modulesBox"
                >
                    <div>
                        <div class="txtBox">
                            <span>用户名(登陆账号)：</span>
                            <div>{{ dataVal.username }}</div>
                        </div>
                        <div class="txtBox">
                            <span>职位权限：</span>
                            <div>{{ dataVal.role_name }}</div>
                        </div>
                        <div class="txtBox">
                            <span>手机号码：</span>
                            <div>{{ dataVal.mobile }}</div>
                        </div>
                        <div class="txtBox">
                            <span>登录密码：</span>
                            <div>*****</div>
                        </div>
                        <div class="txtBox">
                            <span>用户状态：</span>
                            <div>
                                {{ dataVal.status == 0 ? "禁用" : "启用" }}
                            </div>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataVal: {}
        };
    },
    created() {
        let id = this.$route.query.id;
        this.getInfo(id);
    },
    methods: {
        getInfo(id) {
            let that = this;
            that.$store.commit("setLoading", true);
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
                    this.dataVal = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped="scoped" lang="scss">
#UserInfo {
    width: 100%;
    background: #ffffff;
}
.UserInfo_main {
    width: 100%;
    padding: 24px;
    border-top: 1px solid #eff1f5;
    box-sizing: border-box;
}
.txtBox{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  color: #333333;
  >span{
    white-space: nowrap;
  }
}
.modulesBox{
  >div{
    margin-bottom: 60px;
  }
}
.imgBox{
  >img{
    width: 118px;
    height: 138px;
    border-radius: 6px;
  }
}
</style>