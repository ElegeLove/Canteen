<template>
    <a-menu
        :selected-keys="defaultSelectedKeys"
        theme="dark"
        mode="inline"
        :openKeys="openKeys"
        @select="oPChange"
        class="leftSidsWid"
        @openChange="onOpenChange"
    >
        <template v-for="item in route">
            <a-menu-item
                :key="item.key"
                v-if="item.children.length == 0"
                @click="clickKey(item)"
            >
                <a-icon :type="item.icon" />
                <span>{{ item.title }}</span>
            </a-menu-item>
            <a-sub-menu :key="item.key" v-else>
                <span slot="title"
                    ><a-icon :type="item.icon" /><span>{{
                        item.title
                    }}</span></span
                >
                <a-menu-item
                    :key="it.key"
                    v-for="it in item.children"
                    @click="clickKey(it)"
                    >{{ it.title }}</a-menu-item
                >
            </a-sub-menu>
        </template>
    </a-menu>
</template>

<script>
export default {
    data() {
        return {
            rootSubmenuKeys: [
                "NameLibrary",
                "Information",
                "InfoStatistics",
                "WorkManagement",
                "BrightKitchen",
                "BigDataAnalysis",
                "AccountManagement",
                "AccountManagement"
            ],
            defaultSelectedKeys: [],
            openKeys: [],
            route: [
                // {
                //     key: "NameLibrary",
                //     title: "产品(用户)名称库",
                //     icon: "apartment",
                //     children: [
                //         {
                //             key: "ProductCatalog",
                //             title: "产品目录"
                //         },
                //         {
                //             key: "SupplierCode",
                //             title: "供应商代码"
                //         },
                //         {
                //             key: "SchoolCode",
                //             title: "学校代码"
                //         }
                //     ]
                // },
                // {
                //     key: "Information",
                //     title: "工作监督",
                //     icon: "insurance",
                //     children: [
                //         {
                //             key: "RecipeQuery",
                //             title: "食谱查询"
                //         },
                //         {
                //             key: "PriceInquiry",
                //             title: "价格查询"
                //         },
                //         {
                //             key: "PurchasePlanAnalysis",
                //             title: "采购计划分析"
                //         },
                //         // {
                //         //     key: "ExpenditureStructureAnalysis",
                //         //     title: "支出结构分析"
                //         // },
                //         {
                //             key: "FoodConsumeStructureStatistics",
                //             title: "食材消耗结构统计"
                //         }
                //     ]
                // },
                // {
                //     key: "InfoStatistics",
                //     title: "信息统计",
                //     icon: "file-done",
                //     children: [
                //         {
                //             key: "InfoAggregation",
                //             title: "学校基本信息汇总"
                //         },
                //         {
                //             key: "DesignatedSupplierInfo",
                //             title: "定点供应商信息"
                //         },
                //         {
                //             key: "DesignatedSupplierStatistics",
                //             title: "定点供应商分类统计"
                //         }
                //         // {
                //         //     key: "Organization",
                //         //     title: "组织机构"
                //         // },
                //         // {
                //         //     key: "ChargeManagement",
                //         //     title: "收费管理"
                //         // },
                //         // {
                //         //     key: "SiteManagement",
                //         //     title: "场所管理"
                //         // },
                //         // {
                //         //     key: "LicenseManagement",
                //         //     title: "许可管理"
                //         // },
                //         // {
                //         //     key: "LaborInformation",
                //         //     title: "劳务信息"
                //         // },
                //         // {
                //         //     key: "DrinkingWater",
                //         //     title: "直饮水"
                //         // },
                //         // {
                //         //     key: "CampusSupermarket",
                //         //     title: "校园超市"
                //         // },
                //         // {
                //         //     key: "StudentDormitory",
                //         //     title: "学生寝室"
                //         // },
                //         // {
                //         //     key: "SystemConstruction",
                //         //     title: "制度建设"
                //         // },
                //         // {
                //         //     key: "BusinessReportEducation",
                //         //     title: "营改报表（教委/教育局）"
                //         // },
                //         // {
                //         //     key: "BusinessReportUnit",
                //         //     title: "营改报表（单位）"
                //         // },
                //         // {
                //         //     key: "BookSubscription",
                //         //     title: "作业本征订"
                //         // }
                //     ]
                // },
                // {
                //     key: "WorkManagement",
                //     title: "工作管理",
                //     icon: "codepen",
                //     children: [
                //         // {
                //         //     key: "InformationDisclosure",
                //         //     title: "信息公开"
                //         // },
                //         // {
                //         //     key: "WorkRecord",
                //         //     title: "工作记录"
                //         // },
                //         {
                //             key: "RecommendedRecipes",
                //             title: "推荐食谱"
                //         },
                //         // {
                //         //     key: "BusinessTraining",
                //         //     title: "业务培训"
                //         // },
                //         // {
                //         //     key: "SurveyQuestionnaire",
                //         //     title: "问卷调查"
                //         // },
                //         // {
                //         //     key: "NotificationManagement",
                //         //     title: "通知管理"
                //         // },
                //         {
                //             key: "SchoolCalendarSetting",
                //             title: "校历设置"
                //         },
                //         {
                //             key: "EarlyWarningSetting",
                //             title: "预警设置"
                //         }
                //     ]
                // },
                // {
                //     key: "AccountManagement",
                //     title: "账户管理",
                //     icon: "codepen",
                //     children: [
                //         {
                //             key: "UserManagement",
                //             title: "用户管理"
                //         },
                //         {
                //             key: "RoleManagement",
                //             title: "角色管理"
                //         }
                //     ]
                // }
                // {
                //     key: "BrightKitchen",
                //     title: "明厨亮灶",
                //     icon: "contacts",
                //     children: []
                // },
                // {
                //     key: "BigDataAnalysis",
                //     title: "大数据分析",
                //     icon: "shopping-cart",
                //     children: []
                // },
                // {
                //     key: "AccountManagement",
                //     title: "账户管理",
                //     icon: "database",
                //     children: [
                //         {
                //             key: "UserManagement",
                //             title: "用户管理"
                //         },
                //         {
                //             key: "RoleManagement",
                //             title: "角色管理"
                //         }
                //     ]
                // }
            ]
        };
    },
    // 监听,当路由发生变化的时候执行
    // watch: {
    //     $route: {
    //         handler(to, from) {
    //             console.log(to, from);
    //             let arr = to.path.split("/");
    //             // let arr = to.path.split('/')
    //             localStorage.setItem("cheakKey", to.name);
    //             // localStorage.setItem("cheakKeyItem", to.name);
    //         },
    //         deep: true,
    //         immediate: true
    //     }
    //     // $route(to, from) {
    //     //     console.log(to);
    //     //     let arr = to.path.split("/");
    //     //     // let arr = to.path.split('/')
    //     //     localStorage.setItem("cheakKeyItem", to.name);
    //     //     // if(arr.length>3){
    //     //     // }else{
    //     //     //     localStorage.removeItem('cheakKeyItem')
    //     //     // }
    //     // },
    // },
    watch: {
        $route: {
            handler: function(val, oldVal) {
                //   if(val.name!=='SetSchoolInformation'){
                //     this.getFirst()
                //   }
                // console.log(val);
                var relation = val.meta.munuVal;
                var path = val.path;
                //   console.log(this.$store.state.menuBar)
                this.$store.state.menuBar.forEach(item => {
                    if (item.relation == relation) {
                        //没有下级的时候 只有一级
                        //   this.defaultSelectedKeys = ['BigDataAnalysis']
                        this.defaultSelectedKeys = [item.key];
                        this.openKeys = [""];
                        localStorage.setItem("sec_cheakKey", item.key);
                        localStorage.removeItem("sec_openKey");
                    } else {
                        if (relation == "noSide") {
                            //此处是指像意见反馈这种没有选中左边的路由  直接清空
                            this.openKeys = [""];
                            this.defaultSelectedKeys = [""];
                            localStorage.removeItem("sec_openKey");
                            localStorage.removeItem("sec_cheakKey");
                        } else {
                            item.children.forEach(it => {
                                if (it.relation == relation) {
                                    this.openKeys = [item.key];
                                    this.defaultSelectedKeys = [it.key];
                                    localStorage.setItem("sec_cheakKey", it.key);
                                    localStorage.setItem("sec_openKey", item.key);
                                }
                            });
                        }
                    }
                });
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        if (localStorage.getItem("sec_openKey")) {
            this.openKeys = [localStorage.getItem("sec_openKey")];
        } else {
            this.openKeys = [];
        }
        if (localStorage.getItem("sec_cheakKey")) {
            this.defaultSelectedKeys = [localStorage.getItem("sec_cheakKey")];
            let paths = "";
        } else {
            this.defaultSelectedKeys = ["BigDataAnalysis"];
            // if (localStorage.getItem("cheakKeyItem")) {
            //     this.defaultSelectedKeys = [
            //         localStorage.getItem("cheakKeyItem")
            //     ];
            //     let paths = "";
            // } else {
            //     this.defaultSelectedKeys = ["BigDataAnalysis"];
            // }
        }
        this.getMenus();
    },
    methods: {
        // 获取左侧菜单
        getMenus() {
            let that = this;
            // console.log(this.$store.state.menuBar)
            if (this.$store.state.menuBar.length < 1) {
                let data = {
                    url: "/role/sidebarMenu",
                    method: "post",
                    data: {}
                };
                this.$apiAxiox(data).then(res => {
                    if (res.data.code == 1) {
                        this.route = res.data.data;
                        this.$store.commit("setMenuList", res.data.data);
                    } else {
                        that.$message.error(res.data.msg);
                    }
                });
            } else {
                // console.log(23423)
                this.route = this.$store.state.menuBar;
            }
        },
        // 默认选中
        oPChange(val) {
            // console.log(val)
            // this.defaultSelectedKeys = val.selectedKeys;
            this.defaultSelectedKeys = [val.selectedKeys];
            localStorage.setItem("sec_cheakKey", val.selectedKeys);
        },
        // onOpenChange(openKeys) {
        //     const latestOpenKey = openKeys.find(
        //         key => this.openKeys.indexOf(key) === -1
        //     );
        //     if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        //         this.openKeys = openKeys;
        //     } else {
        //         this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        //     }
        // },
        // 打开的一级目录
        onOpenChange(openKeys) {
            var num;
            if (openKeys.length > 1) {
                num = openKeys[1];
            } else {
                num = openKeys[0];
            }
            localStorage.setItem("sec_openKey", num);
            const latestOpenKey = openKeys.find(
                key => this.openKeys.indexOf(key) === -1
            );
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys;
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : [];
            }
        },
        // checs(item) {
        //     //左侧路由切换
        //     // location.hash = item.key;
        //     var route = item.key;
        //     this.$router.push({ name: route });
        // },
        clickKey(item) {
            // console.log(item)
            // location.hash = item.key;
            var route = item.key;
            this.$router.push({ name: route });
        }
    }
};
</script>

<style>
.ant-menu-item,
.ant-menu-submenu {
    margin-bottom: 10px !important;
}
.leftSidsWid {
    margin-top: 65px !important;
}
</style>
