<template>
    <div id="BusinessReportEducationInfo">
        <a-page-header title="查看详情" @back="() => $router.go(-1)" />
        <div class="RecipeQuery_title">
            学生营养改善计划实施情况（教委或教育局）月报
        </div>
        <div class="RecipeQuery_box">
            <div class="RecipeQuery_box_item">
                <div>年份：{{dataVal.year}}年</div>
            </div>
            <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;学期：{{dataVal.semester}}学期</div>
            </div>
            <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;月份：{{dataVal.month}}月</div>
            </div>
        </div>
        <div class="BusinessReportEducationInfo_main">
            <div class="main_title">现有学校（所）信息</div>
            <div class="main_title_text">区县名称：{{dataVal.school_area}}</div>
            <div class="main_schoolInfo">
                <div>
                    <div class="main_schoolInfo_title">
                        小学学校数量&emsp;{{dataVal.school_primary_count}}
                    </div>
                </div>
                <div>
                    <div class="main_schoolInfo_title">其中城区&emsp;{{dataVal.school_primary_city_count}}</div>
                </div>
                <div>
                    <div class="main_schoolInfo_title">
                        其中农村&emsp;{{dataVal.school_primary_countryside_count}}
                    </div>
                </div>
            </div>
            <div class="main_schoolInfo">
                <div>
                    <div class="main_schoolInfo_title">
                        初中学校数量&emsp;{{dataVal.school_middle_count}}
                    </div>
                </div>
                <div>
                    <div class="main_schoolInfo_title">其中城区&emsp;{{dataVal.school_middle_city_count}}</div>
                </div>
                <div>
                    <div class="main_schoolInfo_title">
                        其中农村&emsp;{{dataVal.school_middle_countryside_count}}
                    </div>
                </div>
            </div>
            <div class="main_schoolInfo">
                <div>
                    <div class="main_schoolInfo_title">
                        幼儿园学校数量&emsp;{{dataVal.school_child_count}}
                    </div>
                </div>
                <div>
                    <div class="main_schoolInfo_title">其中城区&emsp;{{dataVal.school_child_city_count}}</div>
                </div>
                <div>
                    <div class="main_schoolInfo_title">
                        其中农村&emsp;{{dataVal.school_child_countryside_count}}
                    </div>
                </div>
            </div>
            <div class="summation">合计：{{dataVal.school_total}}</div>
            <div class="main_title martop60">实施营养改善计划学校数（所）</div>
            <div style="marginTop:20px">
                <div class="main_schoolInfo">
                    <div>
                        <div class="main_schoolInfo_title">
                            小学总数量&emsp;{{dataVal.nutrition_primary_count}}
                        </div>
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            其中城区&emsp;{{dataVal.nutrition_primary_city_count}}
                        </div>
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            其中农村&emsp;{{dataVal.nutrition_primary_countryside_count}}
                        </div>
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            有食堂学校&emsp;{{dataVal.nutrition_primary_canteen_count}}
                        </div>
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            由食堂供餐学校&emsp;{{dataVal.nutrition_primary_canteen_serve_count}}
                        </div>
                    </div>
                </div>
                <div class="main_schoolInfo">
                    <div>
                        <div class="main_schoolInfo_title">
                            初中总数量&emsp;{{dataVal.nutrition_middle_count}}
                        </div>
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            其中城区&emsp;{{dataVal.nutrition_middle_city_count}}
                        </div>
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            其中农村&emsp;{{dataVal.nutrition_middle_countryside_count}}
                        </div>
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            有食堂学校&emsp;{{dataVal.nutrition_middle_canteen_count}}
                        </div>
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            由食堂供餐学校&emsp;{{dataVal.nutrition_middle_canteen_serve_count}}
                        </div>
                    </div>
                </div>
                <div class="main_schoolInfo">
                    <div>
                        <div class="main_schoolInfo_title">
                            幼儿园总数量&emsp;{{dataVal.nutrition_child_count}}
                        </div>
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            其中城区&emsp;{{dataVal.nutrition_child_city_count}}
                        </div>
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            其中农村&emsp;{{dataVal.nutrition_child_countryside_count}}
                        </div>
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            有食堂学校&emsp;{{dataVal.nutrition_child_canteen_count}}
                        </div>
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            由食堂供餐学校&emsp;{{dataVal.nutrition_child_canteen_serve_count}}
                        </div>
                    </div>
                </div>
                <div class="totalFunds">
                    <div class="main_schoolInfo_title">学校数合计&emsp;{{dataVal.nutrition_total}}</div>
                </div>
            </div>
            <div class="main_title martop60">
                累计投入资金（元）（从当年1月起累计计算）
            </div>
            <div>
                <div class="totalFunds">
                    <div class="main_schoolInfo_title">膳食资金总计&emsp;{{dataVal.cumulative_food_total}}</div>
                </div>
                <div>
                    <div class="titleColor">
                        &lt;&nbsp;中央&nbsp;&gt;
                    </div>
                    <div class="main_schoolInfo">
                        <div>
                            <div class="main_schoolInfo_title">
                                全年计划安排&emsp;{{dataVal.cumulative_center_year_plan}}
                            </div>
                        </div>
                        <div>
                            <div class="main_schoolInfo_title">
                                已下拨到校&emsp;{{dataVal.cumulative_center_school}}
                            </div>
                        </div>
                        <div>
                            <div class="main_schoolInfo_title">
                                已用于学生膳食&emsp;{{dataVal.cumulative_center_student}}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="titleColor">
                        &lt;&nbsp;市级&nbsp;&gt;
                    </div>
                    <div class="main_schoolInfo">
                        <div>
                            <div class="main_schoolInfo_title">
                                全年计划安排&emsp;{{dataVal.cumulative_city_year_plan}}
                            </div>
                        </div>
                        <div>
                            <div class="main_schoolInfo_title">
                                已下拨到校&emsp;{{dataVal.cumulative_city_school}}
                            </div>
                        </div>
                        <div>
                            <div class="main_schoolInfo_title">
                                已用于学生膳食&emsp;{{dataVal.cumulative_city_student}}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="titleColor">
                        &lt;&nbsp;区县&nbsp;&gt;
                    </div>
                    <div class="main_schoolInfo">
                        <div>
                            <div class="main_schoolInfo_title">
                                全年计划安排&emsp;{{dataVal.cumulative_area_year_plan}}
                            </div>
                        </div>
                        <div>
                            <div class="main_schoolInfo_title">
                                已下拨到校&emsp;{{dataVal.cumulative_area_school}}
                            </div>
                        </div>
                        <div>
                            <div class="main_schoolInfo_title">
                                已用于学生膳食&emsp;{{dataVal.cumulative_area_student}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="totalFunds">
                    <div class="main_schoolInfo_title">
                        安排食堂从业人员工资&emsp;{{dataVal.cumulative_wages}}
                    </div>
                </div>
                <div class="summation">合计&emsp;{{dataVal.cumulative_total}}</div>
            </div>
            <div class="main_title martop60">
                本月投入资金（元）
            </div>
            <div class="main_schoolInfo martop30">
                <div>
                    <div class="main_schoolInfo_title">
                        中央&emsp;{{dataVal.month_food_center}}
                    </div>
                </div>
                <div>
                    <div class="main_schoolInfo_title">
                        市级&emsp;{{dataVal.month_food_city}}
                    </div>
                </div>
                <div>
                    <div class="main_schoolInfo_title">区县&emsp;{{dataVal.month_food_area}}</div>
                </div>
            </div>
            <div class="summation">合计：{{dataVal.month_total}}</div>
            <div class="subsidy">
                <span>补助标准单位：x元/生*天（不汇总）</span>
                <span>{{dataVal.subsidy}}</span>
            </div>
            <div class="main_title martop60">
                本月惠及实际学生数（人）（非“人次”）
            </div>
             <div class="cityInfo martop30">
                <span>城区&emsp;{{ dataVal.non_human_city }}</span>
                <span>农村&emsp;{{ dataVal.non_human_village }}</span>
            </div>
            <div class="summation">合计：{{ dataVal.non_human_total }}</div>
            <div class="actualStuBox">
                <div class="actualStuBox_item">
                    <div class="item_title">小学</div>
                    <div class="item_main">
                        <div>小计：{{ dataVal.non_human_total_primary }}</div>
                        <div>
                            <span
                                >城区：{{
                                    dataVal.non_human_city_primary
                                }}</span
                            >
                            <span
                                >农村：{{
                                    dataVal.non_human_village_primary
                                }}</span
                            >
                        </div>
                        <div>其中：</div>
                        <div>
                            <span
                                >农村留守儿童人数&emsp;{{
                                    dataVal.non_human_countryside_primary
                                }}</span
                            >
                            <span
                                >免费提供人数&emsp;{{
                                    dataVal.non_human_free_primary
                                }}</span
                            >
                            <span
                                >非寄宿贫困学生&emsp;{{
                                    dataVal.non_human_poor_primary
                                }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="actualStuBox_item">
                    <div class="item_title">初中</div>
                    <div class="item_main">
                        <div>小计：{{ dataVal.non_human_total_middle }}</div>
                        <div>
                            <span
                                >城区：{{
                                    dataVal.non_human_city_middle
                                }}</span
                            >
                            <span
                                >农村：{{
                                    dataVal.non_human_village_middle
                                }}</span
                            >
                        </div>
                        <div>其中：</div>
                        <div>
                            <span
                                >农村留守儿童人数&emsp;{{
                                    dataVal.non_human_countryside_middle
                                }}</span
                            >
                            <span
                                >免费提供人数&emsp;{{
                                    dataVal.non_human_free_middle
                                }}</span
                            >
                            <span
                                >非寄宿贫困学生&emsp;{{
                                    dataVal.non_human_poor_middle
                                }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="actualStuBox_item">
                    <div class="item_title">幼儿园</div>
                    <div class="item_main">
                        <div>小计：{{ dataVal.non_human_total_child }}</div>
                        <div>
                            <span
                                >城区：{{ dataVal.non_human_city_child }}</span
                            >
                            <span
                                >农村：{{
                                    dataVal.non_human_village_child
                                }}</span
                            >
                        </div>
                        <div>其中：</div>
                        <div>
                            <span
                                >农村留守儿童人数&emsp;{{
                                    dataVal.non_human_countryside_child
                                }}</span
                            >
                            <span
                                >免费提供人数&emsp;{{
                                    dataVal.non_human_free_child
                                }}</span
                            >
                            <span
                                >非寄宿贫困学生&emsp;{{
                                    dataVal.non_human_poor_child
                                }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="subsidy">
                <span>本月惠及实际学生数（人）（人次）</span>
                <span>{{ dataVal.human_total }}</span>
            </div>
            <div class="main_title martop60">
                按供餐模式或方式划分惠及学生情况（人）
            </div>
            <div class="actualStuBox">
                <div class="actualStuBoxs_item">
                    <div class="item_title">午餐</div>
                    <div class="item_main">
                        <div>小计：{{ dataVal.lunch_all_total }}</div>
                        <div>供餐模式：</div>
                        <div>
                            <span
                                >食堂供餐&emsp;{{
                                    dataVal.lunch_canteen_total
                                }}</span
                            >
                            <span
                                >向企业（单位）购买供餐&emsp;{{
                                    dataVal.lunch_enterprise_total
                                }}</span
                            >
                            <span
                                >家庭（个人）托餐&emsp;{{
                                    dataVal.lunch_family_total
                                }}</span
                            >
                        </div>
                        <div>其中：</div>
                        <div>
                            <span
                                >农村留守儿童人数&emsp;{{
                                    dataVal.lunch_other_countryside
                                }}</span
                            >
                            <span
                                >免费提供人数&emsp;{{
                                    dataVal.lunch_other_free
                                }}</span
                            >
                            <span
                                >非寄宿贫困学生&emsp;{{
                                    dataVal.lunch_other_poor
                                }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="actualStuBoxs_item">
                    <div class="item_title">蛋奶</div>
                    <div class="item_main">
                        <div>小计：{{ dataVal.em_all_total }}</div>
                        <div>供餐模式：</div>
                        <div>
                            <span
                                >仅吃鸡蛋&emsp;{{ dataVal.em_egg_total }}</span
                            >
                            <span
                                >仅饮牛奶&emsp;{{
                                    dataVal.em_milk_total
                                }}</span
                            >
                            <span>蛋奶同吃&emsp;{{ dataVal.em_total }}</span>
                        </div>
                        <div>其中：</div>
                        <div>
                            <span
                                >农村留守儿童人数&emsp;{{
                                    dataVal.em_other_countryside
                                }}</span
                            >
                            <span
                                >免费提供人数&emsp;{{
                                    dataVal.em_other_free
                                }}</span
                            >
                            <span
                                >非寄宿贫困学生&emsp;{{
                                    dataVal.em_other_poor
                                }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="actualStuBoxs_item">
                    <div class="item_title">其它（课间发放水果、面包等）</div>
                    <div class="item_main">
                        <div>小计：{{ dataVal.other_total }}</div>
                        <!-- <div>供餐模式：</div>
                        <div>
                            <span>食堂供餐&emsp;{{dataVal.lunch_other_poor}}</span>
                            <span>向企业（单位）购买供餐&emsp;{{dataVal.lunch_other_poor}}</span>
                            <span>家庭（个人）托餐&emsp;{{dataVal.lunch_other_poor}}</span>
                        </div> -->
                        <div>其中：</div>
                        <div>
                            <span
                                >农村留守儿童人数&emsp;{{
                                    dataVal.other_countryside
                                }}</span
                            >
                            <span
                                >免费提供人数&emsp;{{
                                    dataVal.other_free
                                }}</span
                            >
                            <span
                                >非寄宿贫困学生&emsp;{{
                                    dataVal.other_poor
                                }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btnBox">
            <!-- <div>保存</div> -->
            <div @click="exportMonthly">导出月汇总</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            infoId:'',
            dataVal:{}
        };
    },
    created () {
        let id = this.$route.query.id;
        this.infoId = id;
        this.getDataInfo(id);
    },
    methods: {
        // 获取详情数据
        getDataInfo(id) {
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/information/nutritionEduDetail",
                method: "post",
                data: {
                    id: id
                }
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
        // 导出
        exportMonthly(){
            location.href = this.$globalApi + "/api/information/exportNutritionEduDetail?id="+this.infoId;
        }
    }
};
</script>

<style scoped>
#BusinessReportEducationInfo {
    width: 100%;
    padding: 0 0 24px;
    background: #ffffff;
    box-sizing: border-box;
}
.RecipeQuery_title {
    width: 580px;
    height: 50px;
    background: #02bc72;
    border-radius: 0px 30px 30px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #ffffff;
}
.RecipeQuery_box {
    width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #f0f2f5;
}
.mx_btnbg {
    width: 62px;
    height: 34px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #02bb72;
    color: #ffffff;
    margin-left: 22px;
}
.RecipeQuery_box_item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
}
.BusinessReportEducationInfo_main {
    width: 100%;
    padding: 30px 24px;
    box-sizing: border-box;
}
.main_title {
    width: 100%;
    padding-left: 10px;
    border-left: 6px solid #0c0c0c;
    font-size: 24px;
    font-family: "Source Han Sans CN";
    font-weight: 500;
    color: #343434;
    line-height: 26px;
}
.main_title_text {
    font-size: 20px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #343434;
    margin: 30px 0;
}
.inps {
    width: 466px;
    height: 40px;
    border-radius: 5px;
}
.inpSmall {
    width: 251px;
    height: 41px;
    border-radius: 5px;
}
.main_schoolInfo {
    width: 100%;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
}
.main_schoolInfo > div {
    margin-right: 36px;
    margin-bottom: 24px;
}
.main_schoolInfo_title {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #343434;
    margin-bottom: 18px;
}
.martop60 {
    margin-top: 60px;
}
.totalFunds {
    margin: 30px 0;
}
.titleColor {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #02bb72;
    margin-bottom: 20px;
}
.martop30 {
    margin-top: 30px;
}
.subsidy {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #333333;
}
.subsidy > span:last-child {
    font-size: 24px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #ff0000;
}
.summation {
    margin: 20px 0;
    font-size: 20px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #333333;
}
.cityInfo {
    font-size: 20px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #02bb72;
}
.cityInfo > span:last-child {
    margin-left: 20px;
}
.actualStuBox {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 30px;
}
.actualStuBox_item {
    width: 725px;
    height: 285px;
    padding: 20px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #d2d2d2;
    margin: 0 16px 16px 0;
}
.actualStuBoxs_item {
    width: 725px;
    height: 335px;
    padding: 20px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #d2d2d2;
    margin: 0 16px 16px 0;
}
.item_title {
    width: 100%;
    padding-left: 8px;
    box-sizing: border-box;
    border-left: 4px solid #333333;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #333333;
    line-height: 20px;
}
.item_main {
    padding-left: 12px;
    margin-top: 30px;
    box-sizing: border-box;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: #666666;
    line-height: 48px;
}
.item_main span {
    margin-right: 34px;
}
.btnBox {
    width: 100%;
    padding-left: 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}
.btnBox > div {
    width: 230px;
    height: 50px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-family: "Source Han Sans CN";
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
}
/* .btnBox > div:first-child{
    background: #02BB72;
    margin-right: 26px;
} */
.btnBox > div:last-child{
    background: #FDB11E;
}
</style>