<template>
    <a-layout-header class="rigHeader">
        <div>
            <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="checkLeft"
            />
            <span>{{unit_name}}</span>
        </div>
        <div class="topRig">
            <div>
                <a-popover
                    trigger="click"
                    :visible="clicked"
                    @visibleChange="handleClickChange"
                    class="alitim"
                >
                    <div>
                        <a-badge :count="dataVal.count">
                            <a-icon type="bell" />
                            <!-- &nbsp; -->
                            消息
                        </a-badge>
                        <!-- &emsp; -->
                    </div>
                    <template slot="content">
                        <div class="alerts message">
                            <div class="infoTop">
                                未读消息({{ dataVal.count }})
                            </div>
                            <div
                                class="messageList"
                                v-for="(item, index) in dataVal.list"
                                :key="index"
                                @click="allInfo"
                            >
                                <!-- @click="showInfo(item.order_id)" -->
                                <!-- <div class="lef">
                                    <img src="../../assets/image/alipay.png" />
                                </div> -->
                                <div class="rig">
                                    <div>{{ item.title }}</div>
                                    <div>{{ item.create_time }}</div>
                                </div>
                            </div>
                            <div class="lookAll" @click="allInfo">
                                <span>查看全部</span>
                                <a-icon type="right" />
                            </div>
                        </div>
                    </template>
                </a-popover>
            </div>
            <!-- <div>
                <a-popover trigger="click" class="alitim">
                    <div @click="manual">
                        <a-icon type="question-circle" />
                        <span>&nbsp;操作手册</span>
                    </div>
                </a-popover>
            </div> -->
            <div>
                <a-popover class="alitim">
                    <img src="../../assets/image/logo.png" />
                    <span class="margins"
                        >{{ userVal.role_name }}-{{ userVal.username }}</span
                    >
                    <a-icon type="caret-down" />
                    <template slot="content">
                        <div>
                            <div class="alitim_user_box">
                                <div class="alitim_user">
                                    <img src="../../assets/image/logo.png" />
                                    <div>
                                        <div>{{ userVal.role_name }}</div>
                                        <div>账号：{{ userVal.username }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="alerts">
                                <div class="hlp" @click="goPersonal">
                                    个人中心
                                </div>
                            </div>
                            <div class="alerts">
                                <div class="hlp" @click="outLogin">
                                    退出登录
                                </div>
                            </div>
                        </div>
                    </template>
                </a-popover>
            </div>
        </div>
    </a-layout-header>
</template>

<script>
export default {
    props: ["collapsed"],
    data() {
        return {
            clicked: false,
            dataVal: {},
            userVal: {},
            linkVal: "",
            unit_name: "",
        };
    },
    mounted() {
        this.getData();
        this.getUserInfo();
        this.getLink();
        this.getDataInfo();
    },
    computed: {
        getIndex() {
            return this.$store.state.newsData;
        },
        getTitle() {
            return this.$store.state.newTitle;
        },
        getUrl() {
            return this.$store.state.linkData;
        },
    },
    watch: {
        getIndex: {
            handler(val) {
                if (val) {
                    this.getData();
                }
            },
            deep: true,
            immediate: true
        },
        getTitle: {
            handler(val) {
                if (val) {
                    this.getDataInfo();
                }
            },
            deep: true,
            immediate: true
        },
        getUrl: {
            handler(val) {
                if (val) {
                    this.getLink();
                }
            },
            deep: true,
            immediate: true
        },
    },
    methods: {
        checkLeft() {
            this.$emit("checkLeft");
        },
        // 个人中心
        goPersonal() {
            this.$router.push({
                path: "Personal"
            });
        },
        // 退出登录
        outLogin() {
            this.$router.push("/");
            localStorage.removeItem("sec_openKey");
            localStorage.removeItem("sec_cheakKey");
            localStorage.removeItem("cheakKeyItem");
            localStorage.removeItem("sec_token");
            this.$store.commit("setMenuList", []);
            // this.$store.commit("vuex", "");
            sessionStorage.removeItem("store");
        },
        // 查看所有信息
        showInfo(id) {
            this.clicked = false;
            // localStorage.setItem('cheakKey','BigDataAnalysis')
            this.$router.push({
                path: "ExamineList",
                query: {
                    id: id
                }
            });
        },
        // 查看所有信息
        allInfo() {
            this.clicked = false;
            // localStorage.setItem('cheakKey','BigDataAnalysis')
            this.$router.push({
                path: "NotificationManagement",
                query: {
                    tabs: "3"
                }
            });
        },
        handleClickChange(visible) {
            this.clicked = visible;
        },
        // 获取数据
        getData() {
            let that = this;
            let data = {
                url: "/index/messageList",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setNewsData", false);
                if (res.data.code == 1) {
                    that.dataVal = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 获取数据
        getDataInfo() {
            let that = this;
            let data = {
                url: "/user/userInfo",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setTitle", false);
                if (res.data.code == 1) {
                    that.unit_name = res.data.data.unit_name;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 获取用户信息
        getUserInfo() {
            let that = this;
            let data = {
                url: "/user/userInfo",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setNewsData", false);
                if (res.data.code == 1) {
                    that.userVal = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 获取数据
        getLink() {
            let that = this;
            let data = {
                url: "/index/getUrlConfig",
                method: "post",
                data: {
                    type: "sec_operation_manual"
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLinkData", false);
                if (res.data.code == 1) {
                    that.linkVal = res.data.data.value;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // 操作手册
        manual(){
            // location.href = this.linkVal;
            window.open(this.linkVal);
        }
    }
};
</script>

<style>
.ant-popover-inner-content {
    padding: 0 !important;
}
.alerts .hlp:hover {
    background-color: #02bb72 !important;
}
.ant-badge-count {
    min-width: 10px !important;
    padding: 0 5px !important;
    height: 16px !important;
    font-size: 10px !important;
    line-height: 15px !important;
    transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8); /*兼容-webkit-引擎浏览器*/
    -moz-transform: scale(0.8, 0.8); /*兼容-moz-引擎浏览器*/
}
.ant-badge-count,
.ant-badge-dot,
.ant-badge .ant-scroll-number-custom-component {
    position: absolute;
    top: -10px !important;
    right: -18px !important;
    /* left: 0px !important; */
}
</style>
<style scoped="scoped" lang="scss">
@import "../../assets/css/topHeader.scss";
</style>
