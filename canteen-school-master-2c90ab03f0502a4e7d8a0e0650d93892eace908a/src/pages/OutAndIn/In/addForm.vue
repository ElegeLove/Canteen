<template>
    <div>
        <!-- 填写自购单 -->
        <a-page-header title="填写自购入库单" :backIcon="false">
            <div>
                <a-form-model
                    class="mySubmitForm"
                    layout="vertical"
                    ref="form"
                    :model="form"
                    :rules="rules"
                >
                    <a-form-model-item label="采购学校" prop="school_id">
                        <a-select
                            style="width:200px"
                            v-model="form.school_id"
                            placeholder="请选择"
                        >
                            <a-select-option
                                v-for="(item, index) in allSchool"
                                :key="index"
                                :value="item.id"
                                >{{ item.full_name }}</a-select-option
                            >
                        </a-select>
                    </a-form-model-item>
                    <a-divider orientation="left">采购食材信息</a-divider>
                    <!-- 循环list -->
                    <div v-for="(item, index) in form.list" :key="index">
                        <div>
                            <div class="iptBox">
                                <div>
                                    <div>
                                        <a-form-model-item
                                            label="品名"
                                            :prop="
                                                'list.' +
                                                    index +
                                                    '.product_name'
                                            "
                                            :rules="{
                                                required: true,
                                                message: '请输入食材品名',
                                                trigger: 'blur'
                                            }"
                                        >
                                            <a-select
                                                v-model="item.product_name"
                                                show-search
                                                placeholder="查询产品"
                                                :default-active-first-option="
                                                    false
                                                "
                                                :show-arrow="false"
                                                :filter-option="false"
                                                :not-found-content="null"
                                                @search="handleSearch"
                                                :getPopupContainer="
                                                    triggerNode => {
                                                      return triggerNode.parentNode || document.body;
                                                    }
                                                  "
                                            >
                                                <a-select-option
                                                    @click="
                                                        handleChange(item, it)
                                                    "
                                                    v-for="(it,
                                                    ix) in ingredients"
                                                    :key="ix"
                                                    :value="it.name"
                                                >
                                                    {{ it.name }}
                                                </a-select-option>
                                            </a-select>
                                            <!-- <a-input v-model="item.product_name" placeholder="食材品名" /> -->
                                        </a-form-model-item>
                                    </div>
                                    <div>
                                        <a-form-model-item
                                            label="副标题"
                                            :prop="
                                                'list.' + index + '.subtitle'
                                            "
                                            :rules="{
                                                required: true,
                                                message: '请输入副标题',
                                                trigger: 'blur'
                                            }"
                                        >
                                            <a-input
                                                v-model="item.subtitle"
                                                placeholder="副标题"
                                            />
                                        </a-form-model-item>
                                    </div>
                                    <div>
                                        <a-form-model-item
                                            label="产品类型"
                                            :prop="
                                                'list.' +
                                                    index +
                                                    '.is_prepackaging'
                                            "
                                            :rules="{
                                                required: true,
                                                message: '请选择产品类型',
                                                trigger: 'change'
                                            }"
                                        >
                                            <a-radio-group
                                                v-model="item.is_prepackaging"
                                                @change="checkRadio(item)"
                                            >
                                                <a-radio :value="0"
                                                    >预包装食品</a-radio
                                                >
                                                <a-radio :value="1"
                                                    >农产品</a-radio
                                                >
                                                <a-radio :value="2"
                                                    >小作坊食品</a-radio
                                                >
                                            </a-radio-group>
                                        </a-form-model-item>
                                    </div>
                                </div>
                            </div>
                            <div class="iptBox">
                                <div v-if="item.is_prepackaging == 0">
                                    <div>
                                        <a-form-model-item
                                            label="品牌"
                                            :prop="'list.' + index + '.brand'"
                                            :rules="{
                                                required: true,
                                                message: '请输入品牌',
                                                trigger: 'change'
                                            }"
                                        >
                                            <a-input
                                                v-model="item.brand"
                                                placeholder="品牌"
                                            />
                                        </a-form-model-item>
                                    </div>
                                    <div>
                                        <a-form-model-item
                                            label="生产商"
                                            :prop="'list.' + index + '.produce'"
                                            :rules="{
                                                required: true,
                                                message: '请输入生产商',
                                                trigger: 'change'
                                            }"
                                        >
                                            <a-input
                                                v-model="item.produce"
                                                placeholder="生产商"
                                            />
                                        </a-form-model-item>
                                    </div>
                                    <div>
                                        <a-form-model-item
                                            label="等级"
                                            :prop="'list.' + index + '.grade'"
                                            :rules="{
                                                required: true,
                                                message: '请输入等级',
                                                trigger: 'blur'
                                            }"
                                        >
                                            <a-input
                                                v-model="item.grade"
                                                placeholder="等级"
                                            />
                                        </a-form-model-item>
                                    </div>
                                    <div>
                                        <p class="saizePs">
                                            <span>*</span>规格
                                        </p>
                                        <div class="allIptsd">
                                            <a-form-model-item
                                                :prop="
                                                    'list.' +
                                                        index +
                                                        '.net_content'
                                                "
                                                :rules="{
                                                    required: true,
                                                    message: '请输入规格',
                                                    trigger: 'blur'
                                                }"
                                            >
                                                <a-input
                                                    v-model="item.net_content"
                                                    @input="setNums(item,index)"
                                                    placeholder="规格"
                                                />
                                            </a-form-model-item>
                                            <span>{{ item.unit }}/</span>
                                            <a-form-model-item
                                                :prop="
                                                    'list.' +
                                                        index +
                                                        '.small_unit'
                                                "
                                                :rules="{
                                                    required: true,
                                                    message:
                                                        '请输入最小包装单位',
                                                    trigger: 'blur'
                                                }"
                                            >
                                                <a-input
                                                    v-model="item.small_unit"
                                                    placeholder="请填写最小包装单位"
                                                />
                                            </a-form-model-item>
                                        </div>
                                    </div>
                                    <div>
                                        <a-form-model-item
                                            label="生产日期"
                                            :prop="
                                                'list.' +
                                                    index +
                                                    '.production_time'
                                            "
                                            :rules="{
                                                required: true,
                                                message: '请选择生产日期',
                                                trigger: 'change'
                                            }"
                                        >
                                            <a-date-picker
                                                v-model="item.production_time"
                                                valueFormat="yyyy-MM-DD"
                                            />
                                        </a-form-model-item>
                                    </div>
                                    <div>
                                        <a-form-model-item
                                            label="保质期至"
                                            :prop="
                                                'list.' +
                                                    index +
                                                    '.expiration_time'
                                            "
                                            :rules="{
                                                required: true,
                                                message: '请选择保质期',
                                                trigger: 'change'
                                            }"
                                        >
                                            <a-date-picker
                                                v-model="item.expiration_time"
                                                valueFormat="yyyy-MM-DD"
                                            />
                                        </a-form-model-item>
                                    </div>
                                    <div>
                                        <p class="saizePs">计量单位价</p>
                                        <div>
                                            {{ item.unit_price || "--" }}元/{{
                                                item.unit
                                            }}
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                                <div v-if="item.is_prepackaging == 1">
                                    <div>
                                        <a-form-model-item
                                            label="产地"
                                            :prop="'list.' + index + '.origin'"
                                            :rules="{
                                                required: true,
                                                message: '请输入产地',
                                                trigger: 'blur'
                                            }"
                                        >
                                            <a-input
                                                v-model="item.origin"
                                                placeholder="产地"
                                            />
                                        </a-form-model-item>
                                    </div>
                                </div>
                                <div v-if="item.is_prepackaging == 2">
                                    <div>
                                        <a-form-model-item
                                            label="小作坊名称"
                                            :prop="
                                                'list.' +
                                                    index +
                                                    '.workshop_name'
                                            "
                                            :rules="{
                                                required: true,
                                                message: '请输入小作坊名称',
                                                trigger: 'blur'
                                            }"
                                        >
                                            <a-input
                                                v-model="item.workshop_name"
                                                placeholder="小作坊名称"
                                            />
                                        </a-form-model-item>
                                    </div>
                                    <div>
                                        <a-form-model-item
                                            label="生产日期"
                                            :prop="
                                                'list.' +
                                                    index +
                                                    '.production_time'
                                            "
                                            :rules="{
                                                required: true,
                                                message: '请选择生产日期',
                                                trigger: 'change'
                                            }"
                                        >
                                            <a-date-picker
                                                v-model="item.production_time"
                                                valueFormat="yyyy-MM-DD"
                                            />
                                        </a-form-model-item>
                                    </div>
                                    <div></div>
                                </div>
                                <div>
                                    <div>
                                        <a-form-model-item
                                            :label="item.is_prepackaging!=0?'售价':'售价（元）'"
                                            :prop="
                                                'list.' +
                                                    index +
                                                    '.unit_meterage'
                                            "
                                            :rules="{
                                                validator: validatePrice,
                                                trigger: 'blur',
                                                required: true
                                            }"
                                        >
                                            <a-input
                                                v-model="item.unit_meterage"
                                                @input="setNumss(item,index)"
                                                :suffix="item.is_prepackaging!=0?'元/'+item.unit:item.small_unit+'/(规格'+item.net_content+item.unit+')'"
                                                placeholder="请输入售价"
                                            />
                                        </a-form-model-item>
                                    </div>
                                    <div>
                                        <a-form-model-item
                                            label="采购数量"
                                            :prop="
                                                'list.' + index + '.now_count'
                                            "
                                            :rules="{
                                                required: true,
                                                message: '请输入采购数量',
                                                trigger: 'blur'
                                            }"
                                        >
                                            <a-input
                                                v-model="item.now_count"
                                                @input="setNumVal(item,index)"
                                                :suffix="item.unit"
                                                placeholder="请输入采购数量"
                                            />
                                        </a-form-model-item>
                                    </div>
                                    <div>
                                        <a-form-model-item
                                            label="金额（元）"
                                            :prop="
                                                'list.' + index + '.total_price'
                                            "
                                        >
                                            <!-- :rules="{
                                                validator: validatePrice,
                                                trigger: 'blur',
                                                required: true
                                            }" -->
                                            <!-- <a-input
                                                v-model="item.total_price"
                                                placeholder="请输入金额"
                                            /> -->
                                            <div>{{ item.total_price }}</div>
                                        </a-form-model-item>
                                    </div>
                                    <div>
                                        <a-form-model-item
                                            label="进货查验情况"
                                            :prop="
                                                'list.' +
                                                    index +
                                                    '.check_detail'
                                            "
                                            :rules="{
                                                required: true,
                                                message: '请选择进货查验情况',
                                                trigger: 'blur'
                                            }"
                                        >
                                            <a-radio-group
                                                v-model="item.check_detail"
                                            >
                                                <a-radio value="合格"
                                                    >合格</a-radio
                                                >
                                                <a-radio value="不合格"
                                                    >不合格</a-radio
                                                >
                                            </a-radio-group>
                                        </a-form-model-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bottom-20" v-if="form.list.length > 1">
                            <a-button type="danger" @click="deleteItem(index)"
                                >删除本项</a-button
                            >
                        </div>
                    </div>
                    <div class="bottom-20">
                        <a-button type="primary" @click="addItem()"
                            >新增一项</a-button
                        >
                    </div>
                    <!-- 供应商信息 -->
                    <a-divider orientation="left">非定点供应商信息</a-divider>
                    <div class="bottom-20">
                        <a-button type="primary" @click="goNonFixedManage()"
                            >非地点供应商管理</a-button
                        >
                    </div>
                    <div class="iptBox">
                        <div>
                            <div>
                                <a-form-model-item
                                    label="供应商名称"
                                    prop="supplier_name"
                                >
                                    <!-- <a-input
                                        v-model="form.supplier_name"
                                        placeholder="请输入供应商名称"
                                    /> -->
                                    <a-select
                                        show-search
                                        :show-arrow="false"
                                        :default-active-first-option="false"
                                        :filter-option="false"
                                        :not-found-content="null"
                                        v-model="form.supplier_name"
                                        placeholder="请输入供应商名称"
                                        style="width: 200px"
                                        @search="supSearch"
                                        @blur="supBlur"
                                        @change="supChange"
                                    >
                                        <a-select-option v-for="d in supList" :key="d.id">
                                        {{ d.name }}
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </div>
                            <div>
                                <a-form-model-item
                                    label="食品经营许可证编码"
                                >
                                    <!-- prop="food_business_license" -->
                                    <a-input
                                        v-model="form.food_business_license"
                                        :disabled="isDisabled"
                                        placeholder="请输入食品经营许可证编码"
                                    />
                                </a-form-model-item>
                            </div>
                            <div>
                                <a-form-model-item
                                    label="统一社会信用代码"
                                >
                                    <!-- prop="code" -->
                                    <a-input
                                        v-model="form.code"
                                        :disabled="isDisabled"
                                        placeholder="请输入统一社会信用代码"
                                    />
                                </a-form-model-item>
                            </div>
                            <div>
                                <a-form-model-item
                                    label="联系方式："
                                    prop="supplier_phone"
                                >
                                    <a-input
                                        v-model="form.supplier_phone"
                                        :disabled="isDisabled"
                                        placeholder="请输入联系方式"
                                        :maxLength="11"
                                    />
                                </a-form-model-item>
                            </div>
                            <div>
                                <a-form-model-item
                                    label="供应商地址："
                                >
                                    <!-- prop="supplier_address" -->
                                    <a-input
                                        v-model="form.supplier_address"
                                        :disabled="isDisabled"
                                        placeholder="请输入供应商地址"
                                    />
                                </a-form-model-item>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div>
                        <a-button
                            type="primary"
                            :disabled="submitLoading"
                            :loading="submitLoading"
                            @click="submitForm('form')"
                            >确认</a-button
                        >
                    </div>
                </a-form-model>
            </div>
        </a-page-header>
    </div>
</template>

<script>
let timeout;
export default {
    data() {
        return {
            form: {
                list: [
                    {
                        product_name: undefined,
                        product_code: "",
                        primary_id: "",
                        origin: "",
                        brand: "",
                        produce: "",
                        grade: "",
                        unit_price: "",
                        now_count: "",
                        total_price: "0",
                        is_prepackaging: 0,
                        production_time: "",
                        check_detail: "合格",
                        expiration_time: "",
                        subtitle: "",
                        unit_meterage: "",
                        small_unit: "",
                        net_content: "",
                        workshop_name: "",
                        unit: "",
                        secondary_id:""
                    }
                ],
                supplier_name:''
            },
            submitLoading: false,
            rules: {
                school_id: [
                    { required: true, message: "请选择学校", trigger: "change" }
                ],
                code: [
                    {
                        message: "请输入食品经营许可证编码/社会统一信用代码",
                        trigger: "blur"
                    }
                ],
                supplier_name: [
                    {
                        required: true,
                        message: "请输入供应商名称",
                        trigger: "blur"
                    }
                ],
                supplier_phone: [
                    {
                        validator: this.validatePhone,
                        trigger: "blur",
                        required: true
                    }
                ],
                supplier_address: [
                    {
                        required: true,
                        message: "请输入联系地址",
                        trigger: "blur"
                    }
                ],
                food_business_license: [
                    {
                        required: true,
                        message: "请输入许可证编码",
                        trigger: "blur"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "请输入社会信用代码",
                        trigger: "blur"
                    }
                ]
            },
            allSchool: [],
            searData: {
                keyword: ""
            },
            ingredients: [],
            supList:[],
            supSearData:{
                supSearVal:'',
            },
            isDisabled:false
        };
    },
    mounted() {
        //获取所有学校
        this.$commonJs.getSchool(res => {
            this.allSchool = res;
        });
        // this.getSupplierList('')
    },
    methods: {
        checkRadio(item){
          this.$refs.form.clearValidate()
          item.brand = "";
           item.produce = "";
           item.grade = "";
           item.net_content = "";
           item.small_unit = "";
           item.production_time = "";
           item.expiration_time = "";
           item.unit_price = "";
           item.unit_meterage = "";
           item.now_count = "";
           item.total_price = 0;
           item.origin = "";
           item.workshop_name = "";
        },
        //获取供应商列表
        getSupplierList(val){
            let that = this;
            this.$http.nonFixedList_supplier({keyword:val}).then(res => {
                if (res.code == 1) {
                    that.supList = res.data;
                    that.$forceUpdate();
                }
            });
        },
        supSearch(value) {
            if (!!value) {
                this.supSearData.supSearVal = value||'';
                this.getSupplierList(value);
            }
        },
        supBlur(){
            const value = this.supSearData.supSearVal;
            if (!!value) {
                this.supChange(value,2);
                this.$delete(this.supSearData,'supSearVal'); // 在onBlur后将对应的key删除，防止当从下拉框中选择后再次触发onBlur时经过此处恢复成原来的值
            }
        },
        supChange(value,i) {
            if(i == 2){
                this.supSearData.supId = '';
                this.isDisabled = false;
                this.form.code = '';
                this.form.food_business_license = '';
                this.form.supplier_address = '';
                this.form.supplier_phone = '';
            }else{
                this.supSearData.supId = value;
                this.isDisabled = true;
                let that = this;
                this.supList.forEach(item => {
                    if(item.id == this.supSearData.supId){
                        that.form.code = item.credit_code;
                        that.form.food_business_license = item.food_business_license;
                        that.form.supplier_address = item.warehouse_address;
                        that.form.supplier_phone = item.contacts_mobile;
                    }
                })
            }
            this.form.supplier_name = value!=null && value !='' ? value : '';
            this.$delete(this.supSearData,'supSearVal');
        },
        handleSearch(value) {
            //食材搜索
            this.searData.keyword = value;
            this.getMenu();
        },
        handleChange(item, it) {
            //食材触发
            item.product_code = it.code;
            item.product_name = it.name;
            item.unit = it.large_unit;
            item.primary_id = it.pid;
            item.secondary_id = it.id;
            this.$forceUpdate();
        },
        getMenu() {
            //获取食材
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            timeout = setTimeout(this.questMenu, 400);
        },
        questMenu() {
            //搜索请求
            if (this.searData.keyword == "") {
                return false;
            }
            this.$http.RecipesProduct(this.searData).then(res => {
                if (res.code == 1) {
                    this.ingredients = res.data;
                }
            });
        },
        setNums(item,i) {
            //计算
			item.net_content = this.$commonJs.regMoneyOnes(item.net_content)
            if (Number(item.net_content) !== 0) {
                item.unit_price = this.$commonJs.rounds(
                    Number(item.unit_meterage) / Number(item.net_content)
                ,3)
            }else{
              item.unit_price = 0
            }
            this.setNumVal(item,i)
        },
        setNumss(item,i){
            //计算
			item.unit_meterage =  this.$commonJs.regMoneyOnes(item.unit_meterage)
            if (Number(item.net_content) !== 0) {
                item.unit_price = this.$commonJs.rounds(
                    Number(item.unit_meterage) / Number(item.net_content)
                ,3);
            }else{
              item.unit_price = 0
            }
            this.setNumVal(item,i)
        },
        setNumVal(item,i){
            item.now_count = this.$commonJs.regMoneyOnes(String(item.now_count))
            var setnum = item.is_prepackaging!=0?item.unit_meterage:item.unit_price;
            if(setnum != '' && item.now_count != ''){
                this.form.list[i].total_price = this.$commonJs.rounds(parseFloat(item.now_count)*parseFloat(setnum),2);
            }else{
                this.form.list[i].total_price = 0;
            }
        },

        validatePrice(rule, value, callback) {
            if (!value) {
                callback(new Error("请输入金额"));
            }else {
                callback();
            }
        },
        validatePhone(rule, value, callback) {
            if (this.form.supplier_phone == '') {
                callback(new Error("请输入手机号码"));
            } else if (!this.$commonJs.REG.PHONE.test(this.form.supplier_phone)) {
                callback(new Error("手机号码格式不正确"));
            } else {
                callback();
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        deleteItem(index) {
            this.form.list.splice(index, 1);
            // this.resetForm("form");
        },
        addItem() {
            this.form.list.push({
                product_code: "",
                product_name: undefined,
                origin: "",
                brand: "",
                produce: "",
                grade: "",
                unit_price: "",
                now_count: "",
                total_price: "0",
                is_prepackaging: 0,
                production_time: "",
                check_detail: "合格",
                expiration_time: "",

                subtitle: "",
                unit_meterage: "",
                small_unit: "",
                net_content: "",
                workshop_name: "",
                unit: "",
                primary_id: "",
                secondary_id:""
            });
            // this.resetForm("form");
        },
        goNonFixedManage(){
            this.$router.push({
                path: "/outAndIn/in/nonFixedManage"
            });
        },
        submitForm(formName) {
            let data = {
                code: this.form.code,
                food_business_license: this.form.food_business_license,
                list: this.form.list,
                supplier_address: this.form.supplier_address,
                supplier_name: this.form.supplier_name,
                supplier_phone: this.form.supplier_phone,
            }
            if(this.supSearData.supId && this.supSearData.supId != ''){
                data.supplier_id = this.supSearData.supId;
                this.supList.forEach(item => {
                    if(item.id == this.supSearData.supId){
                        data.supplier_name = item.name
                    }
                })
            }else{
               data.supplier_id = 0; 
            }
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.submitLoading = true;
                    this.$http.outAndIn_addForm(data).then(res => {
                        this.submitLoading = false;
                        if (res.code == 1) {
                            //导出
                            // this.$http.outAndIn_exportInForm({
                            //   id: res.data.distribution_id,
                            // })
                            history.back();
                        }
                    });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>


<style scoped="scoped" lang="scss">
@import "../../../assets/css/Procurement/common.scss";
.iptBox {
    box-sizing: border-box;
    > div {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        > div {
            flex: 0 0 33%;
            height: 100px;
            // margin-bottom: 30px;
            > p {
                font-size: 16px;
                color: #333333;
                white-space: nowrap;
                margin-bottom: 10px;
                margin-left: 0;
            }
            > div {
                input,
                textarea {
                    width: 300px;
                }
                > span {
                    font-size: 16px;
                    color: #333333;
                    margin-left: 10px;
                    white-space: nowrap;
                    margin-top: 10px;
                }
                .ant-input-affix-wrapper,
                .ant-calendar-picker,
                .ant-select {
                    width: 300px;
                }
            }
        }
    }
}
.saizePs {
    font-size: 14px !important;
    > span {
        color: red;
        margin-right: 4px;
    }
}
.allIptsd {
    display: flex;
    align-items: center;
    input {
        width: 132px !important;
    }
    > span {
        margin: 0 5px !important;
    }
}
/deep/ .ant-form-vertical .ant-form-item {
    margin-bottom: 0 !important;
}
</style>
