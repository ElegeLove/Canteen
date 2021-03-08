<template>
    <div id="BusinessReportEducationAdd">
        <a-page-header :title="titleName" @back="() => $router.go(-1)" />
        <div class="RecipeQuery_title">
            学生营养改善计划实施情况（教委或教育局）月报
        </div>
        <div class="RecipeQuery_box">
            <div class="RecipeQuery_box_item">
                <div>年份：{{ year }}年</div>
            </div>
            <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;学期：{{ semester }}学期</div>
            </div>
            <div class="RecipeQuery_box_item">
                <div>&emsp;&emsp;月份：{{ month }}月</div>
            </div>
        </div>
        <div class="BusinessReportEducationAdd_main">
            <div class="main_title">现有学校（所）信息</div>
            <!-- <div class="main_title_text">区县名称：开州区</div> -->
            <div class="main_title_text">
                <div class="main_schoolInfo_title">
                    区县名称：
                </div>
                <a-input
                    type="text"
                    class="inps"
                    v-model="dataVal.county_name"
                    placeholder="请输入"
                />
            </div>
            <div class="main_schoolInfo">
                <div>
                    <div class="main_schoolInfo_title">
                        小学学校数量
                    </div>
                    <a-input
                        type="text"
                        v-model="dataVal.countyVal.county_primary_num"
                        class="inps"
                        placeholder="请输入"
                    />
                </div>
                <div>
                    <div class="main_schoolInfo_title">其中城区</div>
                    <a-input
                        type="text"
                        class="inps"
                        v-model="dataVal.countyVal.county_primary_city"
                        placeholder="请输入"
                    />
                </div>
                <div>
                    <div class="main_schoolInfo_title">
                        其中农村
                    </div>
                    <a-input
                        type="text"
                        class="inps"
                        v-model="dataVal.countyVal.county_primary_village"
                        placeholder="请输入"
                    />
                </div>
            </div>
            <div class="main_schoolInfo">
                <div>
                    <div class="main_schoolInfo_title">
                        初中学校数量
                    </div>
                    <a-input
                        type="text"
                        v-model="dataVal.countyVal.county_junior_num"
                        class="inps"
                        placeholder="请输入"
                    />
                </div>
                <div>
                    <div class="main_schoolInfo_title">其中城区</div>
                    <a-input
                        type="text"
                        class="inps"
                        v-model="dataVal.countyVal.county_junior_city"
                        placeholder="请输入"
                    />
                </div>
                <div>
                    <div class="main_schoolInfo_title">
                        其中农村
                    </div>
                    <a-input
                        type="text"
                        class="inps"
                        v-model="dataVal.countyVal.county_junior_village"
                        placeholder="请输入"
                    />
                </div>
            </div>
            <div class="main_schoolInfo">
                <div>
                    <div class="main_schoolInfo_title">
                        幼儿园学校数量
                    </div>
                    <a-input
                        type="text"
                        v-model="dataVal.countyVal.county_kindergarten_num"
                        class="inps"
                        placeholder="请输入"
                    />
                </div>
                <div>
                    <div class="main_schoolInfo_title">其中城区</div>
                    <a-input
                        type="text"
                        class="inps"
                        v-model="dataVal.countyVal.county_kindergarten_city"
                        placeholder="请输入"
                    />
                </div>
                <div>
                    <div class="main_schoolInfo_title">
                        其中农村
                    </div>
                    <a-input
                        type="text"
                        class="inps"
                        v-model="dataVal.countyVal.county_kindergarten_village"
                        placeholder="请输入"
                    />
                </div>
            </div>
            <div class="summation">合计：{{ county_area_sum_nums }}</div>
            <div class="main_title martop60">实施营养改善计划学校数（所）</div>
            <div class="martop30">
                <div class="main_schoolInfo">
                    <div>
                        <div class="main_schoolInfo_title">
                            小学总数量
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_primary_num"
                            placeholder="请输入"
                        />
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            其中城区
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_primary_city"
                            placeholder="请输入"
                        />
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            其中农村
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_primary_village"
                            placeholder="请输入"
                        />
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            有食堂学校
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_primary_canteen"
                            placeholder="请输入"
                        />
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            由食堂供餐学校
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_primary_serve"
                            placeholder="请输入"
                        />
                    </div>
                </div>
                <div class="main_schoolInfo">
                    <div>
                        <div class="main_schoolInfo_title">
                            初中总数量
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_junior_num"
                            placeholder="请输入"
                        />
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            其中城区
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_junior_city"
                            placeholder="请输入"
                        />
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            其中农村
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_junior_village"
                            placeholder="请输入"
                        />
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            有食堂学校
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_junior_canteen"
                            placeholder="请输入"
                        />
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            由食堂供餐学校
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_junior_serve"
                            placeholder="请输入"
                        />
                    </div>
                </div>
                <div class="main_schoolInfo">
                    <div>
                        <div class="main_schoolInfo_title">
                            幼儿园总数量
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_kindergarten_num"
                            placeholder="请输入"
                        />
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            其中城区
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_kindergarten_city"
                            placeholder="请输入"
                        />
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            其中农村
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_kindergarten_village"
                            placeholder="请输入"
                        />
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            有食堂学校
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_kindergarten_canteen"
                            placeholder="请输入"
                        />
                    </div>
                    <div>
                        <div class="main_schoolInfo_title">
                            由食堂供餐学校
                        </div>
                        <a-input
                            type="text"
                            class="inpSmall"
                            v-model="dataVal.planVal.plan_kindergarten_serve"
                            placeholder="请输入"
                        />
                    </div>
                </div>
                <div class="totalFunds">
                    <div class="main_schoolInfo_title">
                        学校数合计：{{ plan_area_sum_nums }}
                    </div>
                    <!-- <a-input
                        type="text"
                        v-model="dataVal.plan_area_sum_num"
                        class="inps"
                        placeholder="请输入"
                    /> -->
                </div>
            </div>
            <div class="main_title martop60">
                累计投入资金（元）（从当年1月起累计计算）
            </div>
            <div>
                <div class="totalFunds">
                    <div class="main_schoolInfo_title">膳食资金总计</div>
                    <a-input
                        type="text"
                        class="inps"
                        v-model="dataVal.diet_capital_total"
                        placeholder="请输入"
                    />
                </div>
                <div>
                    <div class="titleColor">
                        &lt;&nbsp;中央&nbsp;&gt;
                    </div>
                    <div class="main_schoolInfo">
                        <div>
                            <div class="main_schoolInfo_title">
                                全年计划安排
                            </div>
                            <a-input
                                type="text"
                                class="inps"
                                v-model="dataVal.dietVal.diet_center_annual"
                                placeholder="请输入"
                            />
                        </div>
                        <div>
                            <div class="main_schoolInfo_title">
                                已下拨到校
                            </div>
                            <a-input
                                type="text"
                                class="inps"
                                v-model="dataVal.dietVal.diet_center_allocated"
                                placeholder="请输入"
                            />
                        </div>
                        <div>
                            <div class="main_schoolInfo_title">
                                已用于学生膳食
                            </div>
                            <a-input
                                type="text"
                                class="inps"
                                v-model="dataVal.dietVal.diet_center_used"
                                placeholder="请输入"
                            />
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
                                全年计划安排
                            </div>
                            <a-input
                                type="text"
                                class="inps"
                                v-model="dataVal.dietVal.diet_municipal_annual"
                                placeholder="请输入"
                            />
                        </div>
                        <div>
                            <div class="main_schoolInfo_title">
                                已下拨到校
                            </div>
                            <a-input
                                type="text"
                                class="inps"
                                v-model="
                                    dataVal.dietVal.diet_municipal_allocated
                                "
                                placeholder="请输入"
                            />
                        </div>
                        <div>
                            <div class="main_schoolInfo_title">
                                已用于学生膳食
                            </div>
                            <a-input
                                type="text"
                                class="inps"
                                v-model="dataVal.dietVal.diet_municipal_used"
                                placeholder="请输入"
                            />
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
                                全年计划安排
                            </div>
                            <a-input
                                type="text"
                                class="inps"
                                v-model="dataVal.dietVal.diet_county_annual"
                                placeholder="请输入"
                            />
                        </div>
                        <div>
                            <div class="main_schoolInfo_title">
                                已下拨到校
                            </div>
                            <a-input
                                type="text"
                                class="inps"
                                v-model="dataVal.dietVal.diet_county_allocated"
                                placeholder="请输入"
                            />
                        </div>
                        <div>
                            <div class="main_schoolInfo_title">
                                已用于学生膳食
                            </div>
                            <a-input
                                type="text"
                                class="inps"
                                v-model="dataVal.dietVal.diet_county_used"
                                placeholder="请输入"
                            />
                        </div>
                    </div>
                </div>
                <div class="totalFunds">
                    <div class="main_schoolInfo_title">
                        安排食堂从业人员工资
                    </div>
                    <a-input
                        type="text"
                        class="inps"
                        v-model="dataVal.diet_employees"
                        placeholder="请输入"
                    />
                </div>
                <div class="summation">合计：{{ diet_totals }}</div>
            </div>
            <div class="main_title martop60">
                本月投入资金（元）
            </div>
            <div class="textTitle">膳食资金</div>
            <div class="main_schoolInfo martop30">
                <div>
                    <div class="main_schoolInfo_title">
                        中央
                    </div>
                    <a-input
                        type="text"
                        class="inps"
                        v-model="dataVal.month_center"
                        placeholder="请输入"
                    />
                </div>
                <div>
                    <div class="main_schoolInfo_title">
                        市级
                    </div>
                    <a-input
                        type="text"
                        class="inps"
                        v-model="dataVal.month_municipal"
                        placeholder="请输入"
                    />
                </div>
                <div>
                    <div class="main_schoolInfo_title">区县</div>
                    <a-input
                        type="text"
                        class="inps"
                        v-model="dataVal.month_county"
                        placeholder="请输入"
                    />
                </div>
            </div>
            <div class="summation">合计：{{ month_totals }}</div>
            <div class="subsidy">
                <!-- <span>补助标准单位：x元/生*天（不汇总）</span>
                <span>123.00</span> -->
                <div class="main_schoolInfo_title">
                    补助标准单位：x元/生*天（不汇总）
                </div>
                <a-input
                    type="text"
                    v-model="dataVal.subsidy_unit"
                    class="inps"
                    placeholder="请输入"
                />
            </div>
            <div class="main_title martop60">
                本月惠及实际学生数（人）（非“人次”）
            </div>
            <div class="cityInfo martop30">
                <span>城区&emsp;{{ dataInfo.non_human_city }}</span>
                <span>农村&emsp;{{ dataInfo.non_human_village }}</span>
            </div>
            <div class="summation">合计：{{ dataInfo.non_human_total }}</div>
            <div class="actualStuBox">
                <div class="actualStuBox_item">
                    <div class="item_title">小学</div>
                    <div class="item_main">
                        <div>小计：{{ dataInfo.non_human_total_primary }}</div>
                        <div>
                            <span
                                >城区：{{
                                    dataInfo.non_human_city_primary
                                }}</span
                            >
                            <span
                                >农村：{{
                                    dataInfo.non_human_village_primary
                                }}</span
                            >
                        </div>
                        <div>其中：</div>
                        <div>
                            <span
                                >农村留守儿童人数&emsp;{{
                                    dataInfo.non_human_countryside_primary
                                }}</span
                            >
                            <span
                                >免费提供人数&emsp;{{
                                    dataInfo.non_human_free_primary
                                }}</span
                            >
                            <span
                                >非寄宿贫困学生&emsp;{{
                                    dataInfo.non_human_poor_primary
                                }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="actualStuBox_item">
                    <div class="item_title">初中</div>
                    <div class="item_main">
                        <div>小计：{{ dataInfo.non_human_total_middle }}</div>
                        <div>
                            <span
                                >城区：{{
                                    dataInfo.non_human_city_middle
                                }}</span
                            >
                            <span
                                >农村：{{
                                    dataInfo.non_human_village_middle
                                }}</span
                            >
                        </div>
                        <div>其中：</div>
                        <div>
                            <span
                                >农村留守儿童人数&emsp;{{
                                    dataInfo.non_human_countryside_middle
                                }}</span
                            >
                            <span
                                >免费提供人数&emsp;{{
                                    dataInfo.non_human_free_middle
                                }}</span
                            >
                            <span
                                >非寄宿贫困学生&emsp;{{
                                    dataInfo.non_human_poor_middle
                                }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="actualStuBox_item">
                    <div class="item_title">幼儿园</div>
                    <div class="item_main">
                        <div>小计：{{ dataInfo.non_human_total_child }}</div>
                        <div>
                            <span
                                >城区：{{ dataInfo.non_human_city_child }}</span
                            >
                            <span
                                >农村：{{
                                    dataInfo.non_human_village_child
                                }}</span
                            >
                        </div>
                        <div>其中：</div>
                        <div>
                            <span
                                >农村留守儿童人数&emsp;{{
                                    dataInfo.non_human_countryside_child
                                }}</span
                            >
                            <span
                                >免费提供人数&emsp;{{
                                    dataInfo.non_human_free_child
                                }}</span
                            >
                            <span
                                >非寄宿贫困学生&emsp;{{
                                    dataInfo.non_human_poor_child
                                }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="subsidy">
                <span>本月惠及实际学生数（人）（人次）</span>
                <span>{{ dataInfo.human_total }}</span>
            </div>
            <div class="main_title martop60">
                按供餐模式或方式划分惠及学生情况（人）
            </div>
            <div class="actualStuBox">
                <div class="actualStuBoxs_item">
                    <div class="item_title">午餐</div>
                    <div class="item_main">
                        <div>小计：{{ dataInfo.lunch_all_total }}</div>
                        <div>供餐模式：</div>
                        <div>
                            <span
                                >食堂供餐&emsp;{{
                                    dataInfo.lunch_canteen_total
                                }}</span
                            >
                            <span
                                >向企业（单位）购买供餐&emsp;{{
                                    dataInfo.lunch_enterprise_total
                                }}</span
                            >
                            <span
                                >家庭（个人）托餐&emsp;{{
                                    dataInfo.lunch_family_total
                                }}</span
                            >
                        </div>
                        <div>其中：</div>
                        <div>
                            <span
                                >农村留守儿童人数&emsp;{{
                                    dataInfo.lunch_other_countryside
                                }}</span
                            >
                            <span
                                >免费提供人数&emsp;{{
                                    dataInfo.lunch_other_free
                                }}</span
                            >
                            <span
                                >非寄宿贫困学生&emsp;{{
                                    dataInfo.lunch_other_poor
                                }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="actualStuBoxs_item">
                    <div class="item_title">蛋奶</div>
                    <div class="item_main">
                        <div>小计：{{ dataInfo.em_all_total }}</div>
                        <div>供餐模式：</div>
                        <div>
                            <span
                                >仅吃鸡蛋&emsp;{{ dataInfo.em_egg_total }}</span
                            >
                            <span
                                >仅饮牛奶&emsp;{{
                                    dataInfo.em_milk_total
                                }}</span
                            >
                            <span>蛋奶同吃&emsp;{{ dataInfo.em_total }}</span>
                        </div>
                        <div>其中：</div>
                        <div>
                            <span
                                >农村留守儿童人数&emsp;{{
                                    dataInfo.em_other_countryside
                                }}</span
                            >
                            <span
                                >免费提供人数&emsp;{{
                                    dataInfo.em_other_free
                                }}</span
                            >
                            <span
                                >非寄宿贫困学生&emsp;{{
                                    dataInfo.em_other_poor
                                }}</span
                            >
                        </div>
                    </div>
                </div>
                <div class="actualStuBoxs_item">
                    <div class="item_title">其它（课间发放水果、面包等）</div>
                    <div class="item_main">
                        <div>小计：{{ dataInfo.other_total }}</div>
                        <!-- <div>供餐模式：</div>
                        <div>
                            <span>食堂供餐&emsp;{{dataInfo.lunch_other_poor}}</span>
                            <span>向企业（单位）购买供餐&emsp;{{dataInfo.lunch_other_poor}}</span>
                            <span>家庭（个人）托餐&emsp;{{dataInfo.lunch_other_poor}}</span>
                        </div> -->
                        <div>其中：</div>
                        <div>
                            <span
                                >农村留守儿童人数&emsp;{{
                                    dataInfo.other_countryside
                                }}</span
                            >
                            <span
                                >免费提供人数&emsp;{{
                                    dataInfo.other_free
                                }}</span
                            >
                            <span
                                >非寄宿贫困学生&emsp;{{
                                    dataInfo.other_poor
                                }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btnBox">
            <div @click="writeData">保存</div>
            <!-- <div>导出月汇总</div> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            county_area_sum_num: "", //现有学校（所）信息--合计
            plan_area_sum_num: "", //计划学校数合计
            diet_total: "", //膳食资金总计--合计
            month_total: "", //本月投入资金--合计
            dataVal: {
                county_name: "", //区县名称
                countyVal: {
                    county_primary_num: "", //小学学校数量
                    county_primary_city: "", //小学学校--其中城区
                    county_primary_village: "", //小学学校--其中农村
                    county_junior_num: "", //初中学校数量
                    county_junior_city: "", //初中学校数量--其中城区
                    county_junior_village: "", //初中学校数量--其中农村
                    county_kindergarten_num: "", //幼儿园学校数量
                    county_kindergarten_city: "", //幼儿园学校数量--其中城区
                    county_kindergarten_village: "" //幼儿园学校数量--其中农村
                },
                planVal: {
                    plan_primary_num: "", //计划学校数--小学学校数量
                    plan_primary_city: "", //计划学校数--小学学校--其中城区
                    plan_primary_village: "", //计划学校数--小学学校--其中农村
                    plan_primary_canteen: "", //计划学校数--小学学校--有食堂学校
                    plan_primary_serve: "", //计划学校数--小学学校--由食堂供餐学校
                    plan_junior_num: "", //计划学校数--初中学校数量
                    plan_junior_city: "", //计划学校数--初中学校数量--其中城区
                    plan_junior_village: "", //计划学校数--初中学校数量--其中农村
                    plan_junior_canteen: "", //计划学校数--初中学校数量--有食堂学校
                    plan_junior_serve: "", //计划学校数--初中学校数量--由食堂供餐学校
                    plan_kindergarten_num: "", //计划学校数--幼儿园学校数量
                    plan_kindergarten_city: "", //计划学校数--幼儿园学校数量--其中城区
                    plan_kindergarten_village: "", //计划学校数--幼儿园学校数量--其中农村
                    plan_kindergarten_canteen: "", //计划学校数--幼儿园学校数量--有食堂学校
                    plan_kindergarten_serve: "" //计划学校数--幼儿园学校数量--由食堂供餐学校
                },
                diet_capital_total: "", //膳食资金总计
                dietVal: {
                    diet_center_annual: "", //膳食资金总计-- 中央--全年计划安排
                    diet_center_allocated: "", //膳食资金总计-- 中央--已下拨到校
                    diet_center_used: "", //膳食资金总计-- 中央--已用于学生膳食
                    diet_municipal_annual: "", //膳食资金总计-- 市级--全年计划安排
                    diet_municipal_allocated: "", //膳食资金总计-- 市级--已下拨到校
                    diet_municipal_used: "", //膳食资金总计-- 市级--已用于学生膳食
                    diet_county_annual: "", //膳食资金总计-- 区县--全年计划安排
                    diet_county_allocated: "", //膳食资金总计-- 区县--已下拨到校
                    diet_county_used: "" //膳食资金总计-- 区县--已用于学生膳食
                },
                diet_employees: "", //膳食资金总计--安排食堂从业人员工资
                month_center: "", //本月投入资金--中央
                month_municipal: "", //本月投入资金--市级
                month_county: "", //本月投入资金--区县
                subsidy_unit: "" //补助标准单位
            },
            sclType: [
                { name: "建制幼儿园" },
                { name: "民办幼儿园" },
                { name: "小学" },
                { name: "民办小学" },
                { name: "完全小学" },
                { name: "初中" },
                { name: "民办初中" },
                { name: "特殊教育" },
                { name: "九年一般制" },
                { name: "高中" },
                { name: "民办高中" },
                { name: "职高" },
                { name: "民办职高" }
            ],
            // 现有学校（所）信息
            schoolInfo: [
                {
                    schoolName: "小学学校数量",
                    schoolNum: "",
                    cityName: "其中城区",
                    cityNum: "",
                    villageName: "其中农村",
                    villageNum: ""
                },
                {
                    schoolName: "初中学校数量",
                    schoolNum: "",
                    cityName: "其中城区",
                    cityNum: "",
                    villageName: "其中农村",
                    villageNum: ""
                },
                {
                    schoolName: "幼儿园学校数量",
                    schoolNum: "",
                    cityName: "其中城区",
                    cityNum: "",
                    villageName: "其中农村",
                    villageNum: ""
                }
            ],
            dataId: "",
            titleName: "",
            year: "",
            semester: "",
            month: "",
            dataInfo: {},
            status: false,
            kindergarten: ""
        };
    },
    computed: {
        //getter方法
        //现有学校（所）信息--合计
        county_area_sum_nums: {
            get: function() {
                let num = "";
                let num1 = 0;
                let num2 = 0;
                let num3 = 0;
                if (this.dataVal.countyVal.county_primary_num != "") {
                    num1 = parseInt(this.dataVal.countyVal.county_primary_num);
                }
                if (this.dataVal.countyVal.county_junior_num != "") {
                    num2 = parseInt(this.dataVal.countyVal.county_junior_num);
                }
                if (this.dataVal.countyVal.county_kindergarten_num != "") {
                    num3 = parseInt(
                        this.dataVal.countyVal.county_kindergarten_num
                    );
                }
                num = num1 + num2 + num3;
                if (num == 0) {
                    num = "";
                }
                this.county_area_sum_num = num;
                //无需进行声明
                return this.county_area_sum_num;
            },
            set: function(newVal) {
                this.county_area_sum_num = newVal;
            }
        },
        //计划学校数合计
        plan_area_sum_nums: {
            get: function() {
                let num = "";
                let num1 = 0;
                let num2 = 0;
                let num3 = 0;
                if (this.dataVal.planVal.plan_primary_num != "") {
                    num1 = parseInt(this.dataVal.planVal.plan_primary_num);
                }
                if (this.dataVal.planVal.plan_junior_num != "") {
                    num2 = parseInt(this.dataVal.planVal.plan_junior_num);
                }
                if (this.dataVal.planVal.plan_kindergarten_num != "") {
                    num3 = parseInt(this.dataVal.planVal.plan_kindergarten_num);
                }
                num = num1 + num2 + num3;
                if (num == 0) {
                    num = "";
                }
                this.plan_area_sum_num = num;
                //无需进行声明
                return this.plan_area_sum_num;
            },
            set: function(newVal) {
                this.plan_area_sum_num = newVal;
            }
        },
        // 膳食资金总计--合计
        diet_totals: {
            get: function() {
                let num = "";
                let num1 = 0;
                let num2 = 0;
                if (this.dataVal.diet_capital_total != "") {
                    num1 = parseInt(this.dataVal.diet_capital_total);
                }
                if (this.dataVal.diet_employees != "") {
                    num2 = parseInt(this.dataVal.diet_employees);
                }
                num = num1 + num2;
                if (num == 0) {
                    num = "";
                }
                this.diet_total = num;
                //无需进行声明
                return this.diet_total;
            },
            set: function(newVal) {
                this.diet_total = newVal;
            }
        },

        // 本月投入资金--合计
        month_totals: {
            get: function() {
                let num = "";
                let num1 = 0;
                let num2 = 0;
                let num3 = 0;
                if (this.dataVal.month_center != "") {
                    num1 = parseInt(this.dataVal.month_center);
                }
                if (this.dataVal.month_municipal != "") {
                    num2 = parseInt(this.dataVal.month_municipal);
                }
                if (this.dataVal.month_county != "") {
                    num3 = parseInt(this.dataVal.month_county);
                }
                num = num1 + num2 + num3;
                if (num == 0) {
                    num = "";
                }
                this.month_total = num;
                //无需进行声明
                return this.month_total;
            },
            set: function(newVal) {
                this.month_total = newVal;
            }
        }
    },
    created() {
        let year = this.$route.query.year;
        let semester = this.$route.query.semester;
        let month = this.$route.query.month;
        let id = this.$route.query.id;
        this.dataId = id;
        this.year = year;
        this.semester = semester;
        this.month = month;
        if (id && id != 0) {
            this.titleName = "编辑";
            this.getDataInfo(id);
        } else {
            this.titleName = "填写";
            this.getInfo(year, semester, month);
        }
    },
    methods: {
        // 获取展示得数据信息
        getInfo(year, semester, month) {
            this.$store.commit("setLoading", true);
            let that = this;
            let data = {
                url: "/information/nutritionEduBeforeDetail",
                method: "post",
                data: {
                    year: year,
                    semester: semester,
                    month: month
                }
            };
            this.$apiAxiox(data).then(res => {
                that.$store.commit("setLoading", false);
                if (res.data.code == 1) {
                    that.dataInfo = res.data.data;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
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
                    that.dataInfo = res.data.data;
                    that.county_area_sum_num = res.data.data.school_total; //现有学校（所）信息--合计
                    that.plan_area_sum_num = res.data.data.nutrition_total; //计划学校数合计
                    that.diet_total = res.data.data.cumulative_total; //膳食资金总计--合计
                    that.month_total = res.data.data.month_total; //本月投入资金--合计
                    that.dataVal.county_name = res.data.data.school_area;
                    that.dataVal.countyVal.county_primary_num =
                        res.data.data.school_primary_count;
                    that.dataVal.countyVal.county_primary_city =
                        res.data.data.school_primary_city_count;
                    that.dataVal.countyVal.county_primary_village =
                        res.data.data.school_primary_countryside_count;
                    that.dataVal.countyVal.county_junior_num =
                        res.data.data.school_middle_count;
                    that.dataVal.countyVal.county_junior_city =
                        res.data.data.school_middle_city_count;
                    that.dataVal.countyVal.county_junior_village =
                        res.data.data.school_middle_countryside_count;
                    that.dataVal.countyVal.county_kindergarten_num =
                        res.data.data.school_child_count;
                    that.dataVal.countyVal.county_kindergarten_city =
                        res.data.data.school_child_city_count;
                    that.dataVal.countyVal.county_kindergarten_village =
                        res.data.data.school_child_countryside_count;
                    that.dataVal.planVal.plan_primary_num =
                        res.data.data.nutrition_primary_count;
                    that.dataVal.planVal.plan_primary_city =
                        res.data.data.nutrition_primary_city_count;
                    that.dataVal.planVal.plan_primary_village =
                        res.data.data.nutrition_primary_countryside_count;
                    that.dataVal.planVal.plan_primary_canteen =
                        res.data.data.nutrition_primary_canteen_count;
                    that.dataVal.planVal.plan_primary_serve =
                        res.data.data.nutrition_primary_canteen_serve_count;
                    that.dataVal.planVal.plan_junior_num =
                        res.data.data.nutrition_middle_count;
                    that.dataVal.planVal.plan_junior_city =
                        res.data.data.nutrition_middle_city_count;
                    that.dataVal.planVal.plan_junior_village =
                        res.data.data.nutrition_middle_countryside_count;
                    that.dataVal.planVal.plan_junior_canteen =
                        res.data.data.nutrition_middle_canteen_count;
                    that.dataVal.planVal.plan_junior_serve =
                        res.data.data.nutrition_middle_canteen_serve_count;
                    that.dataVal.planVal.plan_kindergarten_num =
                        res.data.data.nutrition_child_count;
                    that.dataVal.planVal.plan_kindergarten_city =
                        res.data.data.nutrition_child_city_count;
                    that.dataVal.planVal.plan_kindergarten_village =
                        res.data.data.nutrition_child_countryside_count;
                    that.dataVal.planVal.plan_kindergarten_canteen =
                        res.data.data.nutrition_child_canteen_count;
                    that.dataVal.planVal.plan_kindergarten_serve =
                        res.data.data.nutrition_child_canteen_serve_count;
                    that.dataVal.diet_capital_total =
                        res.data.data.cumulative_food_total;
                    that.dataVal.dietVal.diet_center_annual =
                        res.data.data.cumulative_center_year_plan;
                    that.dataVal.dietVal.diet_center_allocated =
                        res.data.data.cumulative_center_school;
                    that.dataVal.dietVal.diet_center_used =
                        res.data.data.cumulative_center_student;
                    that.dataVal.dietVal.diet_municipal_annual =
                        res.data.data.cumulative_city_year_plan;
                    that.dataVal.dietVal.diet_municipal_allocated =
                        res.data.data.cumulative_city_school;
                    that.dataVal.dietVal.diet_municipal_used =
                        res.data.data.cumulative_city_student;
                    that.dataVal.dietVal.diet_county_annual =
                        res.data.data.cumulative_area_year_plan;
                    that.dataVal.dietVal.diet_county_allocated =
                        res.data.data.cumulative_area_school;
                    that.dataVal.dietVal.diet_county_used =
                        res.data.data.cumulative_area_student;
                    that.dataVal.diet_employees =
                        res.data.data.cumulative_wages;
                    that.dataVal.month_center = res.data.data.month_food_center;
                    that.dataVal.month_municipal =
                        res.data.data.month_food_city;
                    that.dataVal.month_county = res.data.data.month_food_area;
                    that.dataVal.subsidy_unit = res.data.data.subsidy;
                } else {
                    that.$message.error(res.data.msg);
                    that.status = false;
                }
            });
        },
        // 填写
        writeData() {
            if (this.status) {
                return false;
            }
            this.status = true;
            let that = this;
            let data = {
                url: "/information/addNutritionEdu",
                method: "post",
                data: {
                    year: this.year,
                    semester: this.semester,
                    month: this.month,
                    school_area: this.dataVal.county_name,
                    school_primary_count: this.dataVal.countyVal
                        .county_primary_num,
                    school_primary_city_count: this.dataVal.countyVal
                        .county_primary_city,
                    school_primary_countryside_count: this.dataVal.countyVal
                        .county_primary_village,
                    school_middle_count: this.dataVal.countyVal
                        .county_junior_num,
                    school_middle_city_count: this.dataVal.countyVal
                        .county_junior_city,
                    school_middle_countryside_count: this.dataVal.countyVal
                        .county_junior_village,
                    school_child_count: this.dataVal.countyVal
                        .county_kindergarten_num,
                    school_child_city_count: this.dataVal.countyVal
                        .county_kindergarten_city,
                    school_child_countryside_count: this.dataVal.countyVal
                        .county_kindergarten_village,
                    school_total: this.county_area_sum_num,
                    nutrition_primary_count: this.dataVal.planVal
                        .plan_primary_num,
                    nutrition_primary_city_count: this.dataVal.planVal
                        .plan_primary_city,
                    nutrition_primary_countryside_count: this.dataVal.planVal
                        .plan_primary_village,
                    nutrition_primary_canteen_count: this.dataVal.planVal
                        .plan_primary_canteen,
                    nutrition_primary_canteen_serve_count: this.dataVal.planVal
                        .plan_primary_serve,
                    nutrition_middle_count: this.dataVal.planVal
                        .plan_junior_num,
                    nutrition_middle_city_count: this.dataVal.planVal
                        .plan_junior_city,
                    nutrition_middle_countryside_count: this.dataVal.planVal
                        .plan_junior_village,
                    nutrition_middle_canteen_count: this.dataVal.planVal
                        .plan_junior_canteen,
                    nutrition_middle_canteen_serve_count: this.dataVal.planVal
                        .plan_junior_serve,
                    nutrition_child_count: this.dataVal.planVal
                        .plan_kindergarten_num,
                    nutrition_child_city_count: this.dataVal.planVal
                        .plan_kindergarten_city,
                    nutrition_child_countryside_count: this.dataVal.planVal
                        .plan_kindergarten_village,
                    nutrition_child_canteen_count: this.dataVal.planVal
                        .plan_kindergarten_canteen,
                    nutrition_child_canteen_serve_count: this.dataVal.planVal
                        .plan_kindergarten_serve,
                    nutrition_total: this.plan_area_sum_num,
                    cumulative_food_total: this.dataVal.diet_capital_total,
                    cumulative_center_year_plan: this.dataVal.dietVal
                        .diet_center_annual,
                    cumulative_center_school: this.dataVal.dietVal
                        .diet_center_allocated,
                    cumulative_center_student: this.dataVal.dietVal
                        .diet_center_used,
                    cumulative_city_year_plan: this.dataVal.dietVal
                        .diet_municipal_annual,
                    cumulative_city_school: this.dataVal.dietVal
                        .diet_municipal_allocated,
                    cumulative_city_student: this.dataVal.dietVal
                        .diet_municipal_used,
                    cumulative_area_year_plan: this.dataVal.dietVal
                        .diet_county_annual,
                    cumulative_area_school: this.dataVal.dietVal
                        .diet_county_allocated,
                    cumulative_area_student: this.dataVal.dietVal
                        .diet_county_used,
                    cumulative_wages: this.dataVal.diet_employees,
                    cumulative_total: this.diet_total,
                    month_food_center: this.dataVal.month_center,
                    month_food_city: this.dataVal.month_municipal,
                    month_food_area: this.dataVal.month_county,
                    month_total: this.month_total,
                    subsidy: this.dataVal.subsidy_unit
                }
            };
            if (this.dataId && this.dataId != 0) {
                data.url = '/information/editNutritionEdu';
                data.data.id = this.dataId;
            } else {
                data.url = '/information/addNutritionEdu';
            }
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.$message.success(res.data.msg);
                    that.status = false;
                    that.$router.go(-1);
                } else {
                    that.$message.error("请完善信息");
                    that.status = false;
                }
            });
        }
    }
};
</script>

<style scoped>
#BusinessReportEducationAdd {
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
.BusinessReportEducationAdd_main {
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
.btnBox > div:first-child {
    background: #02bb72;
    margin-right: 26px;
}
/* .btnBox > div:last-child {
    background: #fdb11e;
} */
.textTitle {
    margin-top: 40px;
    font-size: 20px;
}
</style>