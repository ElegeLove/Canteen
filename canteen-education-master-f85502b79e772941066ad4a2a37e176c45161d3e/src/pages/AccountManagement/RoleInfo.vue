<template>
    <div id="RoleInfo">
        <a-page-header title="查看详情" @back="() => $router.go(-1)" />
        <div class="RoleInfo_main">
            <div>
                <div class="txtBox">
                    <span>职位名称：</span>
                    <div>{{ dataVal.name }}</div>
                </div>
                <div class="txtBox">
                    <span>职位描述：</span>
                    <div>{{ dataVal.description }}</div>
                </div>
                <div class="txtBox">
                    <span>权限板块：</span>
                    <div>{{ dataVal.menu_name }}</div>
                </div>
            </div>
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
                url: "/role/details",
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
#RoleInfo {
    width: 100%;
    background: #ffffff;
}
.RoleInfo_main {
    width: 100%;
    padding: 24px;
    border-top: 1px solid #eff1f5;
    box-sizing: border-box;
}
.txtBox{
  display: flex;
  margin-bottom: 20px;
  font-size: 16px;
  color: #333333;
  >span{
    white-space: nowrap;
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