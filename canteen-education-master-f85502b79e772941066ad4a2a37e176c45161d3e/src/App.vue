<template>
    <a-config-provider :locale="locale">
        <div id="app">
            <loading />
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </a-config-provider>
</template>

<script>
import loading from "@/components/loading";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
    name: "App",
    data() {
        return {
            locale: zhCN
        };
    },
    components: {
        loading
    },
    created() {
        window.addEventListener("beforeunload", e => this.beforeunloadFn(e));
        // this.beforeunloadFn();
        // //在页面加载时读取sessionStorage里的状态信息
        // if (sessionStorage.getItem("store")) {
        //     this.$store.replaceState(
        //         Object.assign(
        //             {},
        //             this.$store.state,
        //             JSON.parse(sessionStorage.getItem("store"))
        //         )
        //     );
        // }

        // //在页面刷新时将vuex里的信息保存到sessionStorage里
        // window.addEventListener("beforeunload", () => {
        //     sessionStorage.setItem("store", JSON.stringify(this.$store.state));
        // });
    },
    mounted() {
        // this.$store.commit("setLoaing", false);
        //  window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
    },
    methods: {
        beforeunloadFn(e) {
            this.$store.commit("setLoading", false);
        }
    }
};
</script>

<style>
#app {
    height: 100%;
}
.ant-page-header-back {
    font-size: 20px !important;
    font-weight: 500 !important;
}
.ant-page-header {
    padding: 30px 0 30px 25px !important;
}
.rigContent {
    background: none !important;
    padding: 0 !important;
}

.ant-tabs-nav .ant-tabs-tab {
    padding: 12px 0 !important;
    width: 80px !important;
    font-size: 14px !important;
    font-family: "Microsoft YaHei" !important;
    font-weight: 300 !important;
    color: rgba(51, 51, 51, 1) !important;
    text-align: center !important;
}
.ant-tabs-nav .ant-tabs-tab-active {
    font-size: 14px !important;
    font-family: "Microsoft YaHei" !important;
    font-weight: bold !important;
    color: rgba(2, 187, 114, 1) !important;
}
.ant-tabs-nav .ant-tabs-tab:hover {
    color: rgba(2, 187, 114, 1) !important;
}
.ant-tabs-ink-bar {
    width: 30px !important;
    left: 25px !important;
    background: rgba(2, 187, 114, 1) !important;
}
.ant-pagination-item-active a,
.ant-pagination-item:focus a,
.ant-pagination-item:hover a {
    color: rgba(2, 187, 114, 1) !important;
}
.ant-pagination-item-active,
.ant-pagination-item:focus,
.ant-pagination-item:hover,
.ant-radio-checked .ant-radio-inner,
.ant-radio-checked::after,
.ant-radio-wrapper:hover .ant-radio,
.ant-radio:hover .ant-radio-inner,
.ant-radio-input:focus + .ant-radio-inner,
.ant-checkbox-wrapper:hover .ant-checkbox-inner,
.ant-checkbox:hover .ant-checkbox-inner,
.ant-checkbox-input:focus + .ant-checkbox-inner,
.ant-select-selection:hover,
.ant-input:hover,
.ant-input:focus,
.ant-select-focused .ant-select-selection,
.ant-select-selection:focus,
.ant-select-selection:active,
.ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-inner,
.ant-tree-checkbox:hover .ant-tree-checkbox-inner,
.ant-tree-checkbox-input:focus + .ant-tree-checkbox-inner {
    border-color: #02bb72 !important;
}
.ant-pagination-prev:focus .ant-pagination-item-link,
.ant-pagination-next:focus .ant-pagination-item-link,
.ant-pagination-prev:hover .ant-pagination-item-link,
.ant-pagination-next:hover .ant-pagination-item-link,
.ant-btn:hover,
.ant-btn:focus {
    color: #02bb72 !important;
    border-color: #02bb72 !important;
}
.ant-radio-inner::after,
.ant-checkbox-indeterminate .ant-checkbox-inner::after,
.ant-menu.ant-menu-dark .ant-menu-item-selected,
.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected,
.ant-switch-checked,
.ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner::after,
.ant-spin-dot-item {
    background: #02bb72 !important;
}
.ant-checkbox-checked .ant-checkbox-inner,
.ant-btn-primary,
.ant-tree-checkbox-checked .ant-tree-checkbox-inner {
    border-color: #02bb72 !important;
    background: #02bb72 !important;
}
.rigHeader .trigger:hover,
.ant-menu-item:hover,
.ant-menu-item-active,
.ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
.ant-menu-submenu-active,
.ant-menu-submenu-title:hover,
.ant-page-header-back-button:focus,
.ant-page-header-back-button:hover,
.ant-spin {
    color: #02bb72;
}
.ant-menu-submenu-active:hover,
.ant-btn-primary:hover,
.ant-btn-primary:focus {
    color: #fff !important;
}
.ant-upload.ant-upload-drag {
    border: none;
}
/* .ant-upload-list{
    width: 436px;
    height: 230px;
    border-radius: 5px;
} */
.ant-col-12 {
    margin: 0 !important;
}
.ant-form-inline .ant-form-item{
    margin-right: 16ppx !important;
}
</style>
