<template>
    <div class="boxs" v-if="allData !== ''">
    <!--    <div class="tops">
            <span>{{ allData.school_name }}</span>
            <div>{{ dateTim }}</div>
        </div> -->
        <a-row class="contBox">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" :xxl="12">
                <div class="lefs">
                    <div class="conts">
                        <span>食堂数量：</span>
                        <div>{{ allData.number_of_canteens }}个</div>
                    </div>
                    <div class="conts">
                        <span>在校总人数：</span>
                        <div>{{ allData.faculty_total }}人</div>
                    </div>
                    <div class="conts noMar">
                        {{ allData.food_safety }}
                    </div>
                </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" :xxl="12">
                <div class="rig">
                    <div class="titles" style="margin-bottom: 0;">
                        <span></span>
                        <div>待办工作事项</div>
                    </div>
                    <div class="scollsd">
                        <div
                            class="flexs"
                            v-for="(its, itx) in allData.inspection_plan"
                            :key="itx"
                        >
                            <span>{{ its.name }}</span>
                            <p>{{ its.status }}</p>
                            <div
                                class="main_color"
                                @click="noActions(its.type)"
                            >
                                去处理>
                            </div>
                        </div>
                    </div>
                </div>
            </a-col>
        </a-row>
        <a-row class="contBox contOne">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" :xxl="12">
                <div>
                    <div class="headers">食谱就餐情况</div>
                    <div class="titles">
                        <span></span>
                        <div>预计本周就餐人数</div>
                    </div>
                    <div class="rices">
                        <div>
                            <span>早餐</span>
                            <div>{{ allData.recipes_meals.breakfast }}人</div>
                        </div>
                        <div>
                            <span>午餐</span>
                            <div>{{ allData.recipes_meals.lunch }}人</div>
                        </div>
                        <div>
                            <span>晚餐</span>
                            <div>{{ allData.recipes_meals.dinner }}人</div>
                        </div>
                    </div>
                </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" :xxl="12">
                <div>
                    <div class="headers">食材采购情况</div>
                    <div class="titles">
                        <span></span>
                        <div>食材订单</div>
                    </div>
                    <div class="rices">
                        <div>
                            <span>本学期采购总额</span>
                            <div>
                                {{
                                    allData.food_material_purchase
                                        .loss_semester
                                }}
                            </div>
                        </div>
                        <div>
                            <span>本学期出库总额</span>
                            <div>
                                {{
                                    allData.food_material_purchase.purchasing_semester
                                }}
                            </div>
                        </div>
                    </div>
                </div>
            </a-col>
        </a-row>
        <a-row class="contBox contThree">
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" :xxl="12">
                <div>
                    <div class="todayRecipes">
                        <div class="recHead">
                            <div class="titles noMar">
                                <span></span>
                                <div>今日食谱</div>
                            </div>
                            <div @click="lookWccs" class="main_color">
                                查看完整食谱 >
                            </div>
                        </div>
                        <div>
                            <div
                                class="canteen"
                                v-if="allData.today_recipes.length != 0"
                            ></div>
                            <div
                                class="variety"
                                v-for="(it, ix) in allData.today_recipes"
                                :key="ix"
                            >
                                <span>{{ it.type_text }}</span>
                                <div class="moreshen">{{ it.food_name }}</div>
                            </div>
                            <emptys
                                titles="今日暂无食谱"
                                v-if="allData.today_recipes.length == 0"
                            />
                        </div>
                    </div>
                </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" :xxl="12">
                <div>
                    <div class="intoStorage">
                        <div class="recHead">
                            <div class="titles noMar">
                                <span></span>
                                <div>食材待入库</div>
                            </div>
                            <div class="main_color" @click="inKus">
                                查看全部 >
                            </div>
                        </div>
                        <div
                            v-for="(it, ix) in allData.storage_food_materials"
                            :key="ix"
                        >
                            <div class="shopBox">
                                <div>
                                    <span
                                        >订单号&emsp;&emsp;{{
                                            it.order_sn
                                        }}</span
                                    >
                                    <span
                                        >{{ it.total_count }}类食材待验收</span
                                    >
                                </div>
                                <div class="main_color" @click="inKus">
                                    去入库 >
                                </div>
                            </div>
                            <div class="menuBox">
                                <img
                                    v-lazy="its.image"
                                    v-for="(its, ixs) in it.product"
                                    :key="ixs"
                                />
                            </div>
                        </div>
                        <emptys
                            titles="今日暂无待入库食材"
                            v-if="allData.storage_food_materials.length == 0"
                        />
                    </div>
                </div>
            </a-col>
        </a-row>
        <a-row class="early_warning">
            <div class="headers">智能预警</div>
            <div class="earBox">
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" :xxl="12">
                    <div class="titles">
                        <span></span>
                        <div>食材预警提醒</div>
                    </div>
                    <div class="rices newLine">
                        <div>
                            <span>临近保质期</span>
                            <div>
                                {{
                                    allData.intelligent_early_warning
                                        .near_shelf_life
                                }}
                            </div>
                        </div>
                        <div>
                            <span>已过期</span>
                            <div>
                                {{ allData.intelligent_early_warning.expired }}
                            </div>
                        </div>
                    </div>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" :xxl="12">
                    <div class="titles">
                        <span></span>
                        <div>其他预警</div>
                    </div>
                    <div class="rices">
                        <div>
                            <span>健康证</span>
                            <div>
                                {{
                                    allData.intelligent_early_warning
                                        .health_certificate
                                }}
                            </div>
                        </div>
                        <div>
                            <span>学校证件</span>
                            <div>
                                {{
                                    allData.intelligent_early_warning
                                        .school_certificate
                                }}
                            </div>
                        </div>
                    </div>
                </a-col>
            </div>
        </a-row>
        <div class="WorkRecord">
            <div class="headers">工作记录</div>
            <div class="workBox">
                <div class="titles">
                    <span></span>
                    <div>本月填写</div>
                </div>
                <div class="hrefBox">
                    <span
                        v-for="(item, index) in allData.work_record"
                        :key="index"
                        >{{ item.type_text }}（{{ item.total }}）</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import emptys from "../../components/EmptyNum/index.vue";
export default {
    data() {
        return {
            dateTim: "",
            allData: ""
        };
    },
    components: {
        emptys
    },
    created() {
        this.getData();
        var now = moment()
            .locale("zh-cn")
            .format("YYYY-MM-DD");
        this.dateTim = now;
    },
    methods: {
        getData() {
            //获取信息
            this.$store.commit("sch_setLoaing", true);
            this.$http.IndexInspectionPanel("").then(res => {
                this.$store.commit("sch_setLoaing", false);
                if (res.code == 1) {
                    this.allData = res.data;
                }
            });
        },
        lookWccs() {
            //查看完整食谱
            this.$router.push({
                path: "/ManagementPanel/WeeklyRecipes"
            });
        },
        inKus() {
            //去入库
            this.$router.push({
                path: "/outAndIn/in/inIndex/list"
            });
        },
        noActions(type) {
            //去处理
            //       type => 1  信息上报
            // type => 2  工作记录
            if (type == "1") {
                this.$router.push({
                    path: "/ManagementPanel/InformationReporting"
                });
            } else {
                this.$router.push({
                    path: "/ManagementPanel/t_WorkRecord"
                });
            }
            // this.$message.error("该功能正在开发中");
        }
    }
};
</script>

<style scoped="scoped" lang="scss">
@import "../../assets/css/inspectionPanel.scss";
</style>
