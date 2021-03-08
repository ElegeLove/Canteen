<template>
  <div>
    <backs title="编制周每餐次食材用量预算表" />
    <div class="boxs" v-if="allData!==''">
      <a-form-model ref="dynamicValidateForm" :model="allData">
        <div class="topBox">
          <div class="btnDate">
            <!-- <div>
             <a-icon type="left"/>
             <span>上一餐</span>
           </div>
           <a-button type="primary">本餐</a-button>
           <div>
             <span>下一餐</span>
             <a-icon type="right"/>
           </div> -->
          </div>
          <div class="date">第{{allData.recipes.weeks}}周&emsp;&emsp;&emsp;{{allData.recipes.week}}&emsp;&emsp;&emsp;{{dinner}}</div>
          <div class="emptys"></div>
        </div>
        <div class="contBox">
          <div>
            <div class="marBot">
              <div class="txtBox">
                <span>时间：</span>
                <div>{{allData.recipes.start_time}}—{{allData.recipes.end_time}}</div>
              </div>
              <div class="txtBox">
                <span>学期：</span>
                <div>{{allData.recipes.semester}}学期第{{allData.recipes.weeks}}周</div>
              </div>
              <div class="txtBox">
                <span>学校：</span>
                <div>{{allData.recipes.full_name}}</div>
              </div>
            </div>
            <div class="marBot">
              <div class="txtBox">
                <span>就餐{{allData.recipes.type==3||allData.recipes.type==4?'幼儿数':'学生'}}：</span>
                <a-form-model-item prop="recipes.dinner_student" :rules="AlidateRule.dinner_student">
                  <a-input placeholder="请输入"
                   :maxLength="8"
                   @change="topNum($event,'dinner_student')" v-model="allData.recipes.dinner_student" />
                </a-form-model-item>
                <span>人</span>
              </div>
              <div class="txtBox" v-if="allData.recipes.type!=3||allData.recipes.type!=4">
                <span>本周就餐教师：</span>
                <a-form-model-item prop="recipes.dinner_teacher" :rules="AlidateRule.dinner_teacher">
                  <a-input placeholder="请输入"
                   :maxLength="8"
                   @change="topNum($event,'dinner_teacher')" v-model="allData.recipes.dinner_teacher" />
                </a-form-model-item>
                <span>人</span>
              </div>
              <div class="txtBox">
                <span>人均伙食费标准：</span>
                <a-form-model-item prop="recipes.per_person_avg" :rules="AlidateRule.per_person_avg">
                  <a-input placeholder="请输入" @change="ruleIput($event)" v-model="allData.recipes.per_person_avg" />
                </a-form-model-item>
                <span>元</span>
              </div>
            </div>
            <div class="marBot">
              <div class="txtBox">
                <span>每人金额合计：</span>
                <div class="moneys">{{allData.recipes.per_person_total==""?0:allData.recipes.per_person_total}}元</div>
              </div>
              <div class="txtBox">
                <span>全校金额合计：</span>
                <div class="moneys">{{allData.recipes.school_total==""?0:allData.recipes.school_total}}元</div>
              </div>
            </div>
          </div>
          <a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')">保存</a-button>
        </div>
        <div style="overflow:scroll;max-height: 700px;" class="allTab">
          <table class="tables" cellpadding="0" cellspacing="0" border="1" id="printCons">
            <colgroup>
              <col width=5%>
              <col width=8%>
              <col width=5%>
              <col width=10%>
              <col width=13%>
              <col width=13%>
              <col width=6%>
              <col width=10%>
              <col width=6%>
              <col width=8%>
              <col width=7%>
              <col width=9%>
            </colgroup>
            <thead>
              <tr>
                <td rowspan="2">序号</td>
                <td rowspan="2">菜名</td>
                <td colspan="2">原材料</td>
                <td colspan="2">商品信息</td>
                <td colspan="2">每人每餐用量</td>
                <td colspan="4">全校每餐用量</td>
              </tr>
              <tr>
                <td>序号</td>
                <td>名称</td>
                <td>供应商</td>
                <td>产地品牌生产商</td>
                <td>计量单位</td>
                <td>用量</td>
                <!-- <td>金额（元）</td> -->
                <td>计量单位</td>
                <td>用量</td>
                <td>单价(元)</td>
                <td>金额(元)</td>
              </tr>
            </thead>
            <tbody v-for="(item,index) in allData.menu" :key="index">
              <tr>
                <td :rowspan="item.food.length+2">{{index+1}}</td>
                <td :rowspan="item.food.length+2">{{item.menu_name}}</td>
              <tr v-for="(it,ix) in item.food" :key="ix">
                <td>{{ix+1}}</td>
                <td>{{it.name}}</td>
                <td>
                  <a-form-model-item :prop="'menu['+index+'].food['+ix+'].supplier_id'" :rules="AlidateRule.supplier_id">
                    <div class="position" @click="checkSuppers(it,index,ix)">
                      <span class="main_color">{{it.supplier==""?'请选择':it.supplier}}</span>
                      <a-icon type="down" class="main_color"/>
                    </div>
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item :prop="'menu['+index+'].food['+ix+'].supplier_product_id'" :rules="AlidateRule.supplier_product_id">
                    <div class="position" @click="checkPro(it,index,ix)">
                      <span class="main_color">{{it.supplier_product_name==""?'请选择':it.supplier_product_name}}</span>
                      <a-icon type="down" class="main_color"/>
                    </div>
                  </a-form-model-item>
                </td>
                <td>{{it.unit}}</td>
                <td>
                  <a-form-model-item :prop="'menu['+index+'].food['+ix+'].dosage'" :rules="AlidateRule.dosage">
                    <a-input placeholder="请输入" v-model="it.dosage" @change="price($event,it,index,ix,'dosage')" />
                  </a-form-model-item>
                </td>
                <td>{{it.school_unit}}</td>
                <td>{{it.school_dosage==""?0:it.school_dosage}}</td>
                <td>
                  <span>{{it.unit_price==''?0:it.unit_price}}</span>
                </td>
                <td>{{it.school_price==""?0:it.school_price}}</td>
              </tr>
              <tr>
                <td colspan="2">合计</td>
                <td colspan="7">/</td>
                <td>{{item.school_total==""?0:item.school_total}}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </a-form-model>
    </div>
    <!--供应商弹窗-->
    <a-modal v-model="supplierShow" title="选择供应商" width="60%" @ok="supperOk" :zIndex="999"  okText="下一步" centered>
      <a-table
        :scroll="{ x: 1000, y: 600 }"
        :columns="supplierColumns"
        :data-source="supplierData"
        bordered
        :loading="superLoading"
        :rowKey="(item,index) => index"
        :pagination="false"
        :row-selection="{selectedRowKeys:selectedRowKeys, hideDefaultSelections: true, type:'radio', onChange:changeSelectPro}"
        :customRow="superClick"
      >
      </a-table>
    </a-modal>
    <!--产品弹窗-->
    <a-modal v-model="proShow" title="选择食材" width="60%" @ok="proOk" centered :zIndex="1000">
      <a-table
        :scroll="{ x: 1000, y: 600 }"
        :columns="proColumns"
        :data-source="proData"
        bordered
        :loading="proLoading"
        :rowKey="(item,index) => index"
        :pagination="false"
        :row-selection="{selectedRowKeys:proRowKeys, hideDefaultSelections: true, type:'radio', onChange:checkPros}"
        :customRow="proClick"
      >
       <template slot="image" slot-scope="text,record">
          <img :src="record.image" style="width:80px;height:80px" alt />
        </template>
        <template slot="unit_price" slot-scope="text,record">{{record.unit_price}}/{{record.unit}}</template>
        <template slot="specifications" slot-scope="text,record">
          <span v-if="record.type==0">{{record.net_content}}{{record.unit}}/{{record.small_unit}}</span>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
  import backs from "../../components/goBack/index.vue"
  export default {
    data() {
      return {
        supplierColumns: [          //供应商表格
          {title: "供应商代码",dataIndex: "code",align:"center",
            fixed: 'left',width:180
          },
          { title: "供应品类", dataIndex: "product",align:"center" },
          {title: "供应商",dataIndex: "name",align:"center"}
        ],
        supplierData:[],         //供应商数据
        selectedRowKeys:[],         //供应商单选的下标集合
        supplierShow:false,         //控制供应商弹窗显示
        checkObj:{               //供应商选择的缓存对象下标
          index:"",
          ix:""
        },
        superLoading:false,

        proShow:false,          //控制品牌弹窗显示
        proData:[],             //品牌列表的数据
        proColumns:[            //品牌表格
          {title: "产品图片",dataIndex: "image",
           scopedSlots: { customRender: "image"},align:"center",fixed: 'left',
           width:200
          },
          { title: "产品名称", dataIndex: "title",align:"center"},
          { title: "规格", dataIndex: "specifications",align:"center",
             scopedSlots: { customRender: "specifications" }
          },
          {title: "单价",dataIndex: "unit_price",scopedSlots: { customRender: "unit_price" },align:"center"},
          { title: "产地品牌生产商", dataIndex: "manufacturer",align:"center"}
        ],
        proRowKeys:[],        //品牌单选的下标集合
        proLoading:false,


        data: [],
        allData: "",
        dinner: "",
        dinerObj: {
          0: "早餐",
          1: "午餐",
          2: "晚餐",
          3: "上午点心",
          4: "下午点心"
        },
        saveObj: {
          recipes_id: "",
          school_id: "",
          dinner_student: "",
          dinner_teacher: "",
          per_person_avg: "",
          per_person_total: "",
          school_total: "",
          budget_id: "",
          menu: []
        },
        AlidateRule: {
          dinner_student: {
            required: true,
            message: '请填写就餐学生',
            trigger: 'blur'
          },
          dinner_teacher: {
            required: true,
            message: '请填写就餐教师',
            trigger: 'blur'
          },
          per_person_avg: {
            required: true,
            message: '请填写人均伙食费',
            trigger: 'blur'
          },
          dosage: {
            required: true,
            message: '请输入用量',
            trigger: 'blur'
          },
          unit_price: {
            required: true,
            message: '请输入价格',
            trigger: 'blur'
          },
          supplier_id: {
            required: true,
            message: '请选择供应商',
            trigger: 'click'
          },
          supplier_product_id: {
            required: true,
            message: '请选择品牌',
            trigger: 'blur'
          }
        }
      }
    },
    components: {
      backs
    },
    created() {
      if (this.$route.query.id !== undefined) {             //修改
        this.getDetai(this.$route.query.id)
      } else {
        this.getDetails(this.$route.query)
        var {
          recipes_id,
          school_id
        } = this.$route.query
        this.saveObj.recipes_id = recipes_id
        this.saveObj.school_id = school_id
      }
    },
    methods: {
      superClick(record, index){          //供应商添加整行选择
        return {
          on: {
             click: () => {
               this.changeSelectPro([index],[record])
             }
          }
        }
      },
      proClick(record, index){          //品牌添加整行选择
        return {
          on: {
             click: () => {
               this.checkPros([index],[record])
             }
          }
        }
      },
      changeSelectPro(arr, data) {           //供应商单选选择
        this.selectedRowKeys = arr;
        var {index,ix} = this.checkObj;
        this.allData.menu[index].food[ix].supplier_id = data[0].id;
        this.allData.menu[index].food[ix].supplier = data[0].name;
        var str = `menu[${index}].food[${ix}].supplier_id`;
        this.$refs.dynamicValidateForm.clearValidate(str);         //清除验证
      },
      checkSuppers(item,index,ix) { //点击供应商下拉
        this.checkObj.index = index;
        this.checkObj.ix = ix;
        this.supplierShow = true;
        this.superLoading = true;
        this.$http.ProductSupplierData({
          primary_id: item.primary_id
        }).then((res) => {
          this.superLoading = false;
          if (res.code == 1) {
            this.supplierData = res.data;
            item.supplierData = res.data;
            this.ruleSupper(item.supplier_id,'supplierData','selectedRowKeys')
          }
        })
      },
      ruleSupper(id,data,seleKey){          //单选赋值
        if(id==""){       //无供应商的时候
           this[seleKey] = []
        }else{
          this[data].forEach((it,index)=>{
            if(it.id==id){        //单选赋值
              this[seleKey] = [index]
            }
          })
        }
      },
      supperOk(){         //供应弹窗确定
        var {index,ix} = this.checkObj;
        if(this.allData.menu[index].food[ix].supplier_id==""){
          return this.$message.error('请选择供应商');
        }
        this.getPro(this.allData.menu[index].food[ix])
      },

      checkPros(arr,data){          //品牌单选选择
        this.proRowKeys = arr;
        var {index,ix} = this.checkObj;
        var rows =  this.allData.menu[index].food[ix]
        rows.name = data[0].title;
        rows.supplier_product_id = data[0].id;
        rows.supplier_product_name = data[0].manufacturer;
        rows.unit_price = data[0].unit_price;
        rows.price = this.$commonJs.rounds(Number(rows.dosage) * Number(rows.unit_price),3);
         var str = `menu[${index}].food[${ix}].supplier_product_id`;
        this.$refs.dynamicValidateForm.clearValidate(str);           //清除验证
        this.per_person_total()
        this.school_dosag(rows, index, ix)
        this.school_price()
        this.school_totals()
        this.allSchoolTotla()
        this.allTotla()
      },
      getPro(item) { //获取品牌数据
        var obj = {
          supplier_id: item.supplier_id,
          secondary_id: item.secondary_id
        }
        this.proShow = true;
        this.proLoading = true;
        this.$http.ProductOptionalBrand(obj).then((res) => {
          this.proLoading = false;
          if (res.code == 1) {
            this.proData = res.data;
            item.proData = res.data;
             this.ruleSupper(item.supplier_product_id,'proData','proRowKeys')
            this.$forceUpdate()
          }
        })
      },
      checkPro(it,index,ix){           //点击品牌弹窗
        this.checkObj.index = index;
        this.checkObj.ix = ix;
        if(it.supplier_id==""){
          return this.$message.error('请选择供应商');
        }else{
          this.getPro(it)
        }
      },
      proOk(e){           //选择品牌确定
        var {index,ix} = this.checkObj;
        if(this.allData.menu[index].food[ix].supplier_product_id==""){
          return this.$message.error('请选择品牌');
        }
        if(this.proData.length==0){
          this.$message.error('暂无食材');
        }else{
          this.checkPros(this.proRowKeys,[this.proData[this.proRowKeys[0]]])
          this.proShow = false;
          this.supplierShow = false;
        }
      },

      price(e, it, index, ix, key) { //计算每人每餐用量-金额
        var val = e.target.value
        // var newStr = this.moneyReg(val)          保留两位
        var newStr = this.$commonJs.regMoneyOnes(val);     //保留一位
        // if(isNaN(newStr)){
        //   newStr = ""
        // }
        it[key] = newStr;
        e.target.value = newStr;
        it.price = this.$commonJs.rounds(Number(it.dosage) * Number(it.unit_price),3)
        this.per_person_total()
        this.school_dosag(it, index, ix)
        this.school_price()
        this.school_totals()
        this.allSchoolTotla()
        this.allTotla()
      },
      getDetai(id) { //修改加载详情
        this.$store.commit("sch_setLoaing", true)
        this.$http.RecipesBudgetInfo({
          id
        }).then((res) => {
          this.$store.commit("sch_setLoaing", false)
          if (res.code == 1) {
            this.allData = res.data
            this.dinner = this.dinerObj[res.data.recipes.type]
          }
        })
      },
      submitForm(formName) { //提交
        this.$refs[formName].validate((valid, value) => {
          if (valid) {
            var oldData = JSON.parse(JSON.stringify(this.allData))
            var {
              dinner_student,
              dinner_teacher,
              per_person_avg,
              per_person_total,
              school_total,
              id
            } = oldData.recipes
            this.saveObj.dinner_student = dinner_student
            this.saveObj.dinner_teacher = dinner_teacher
            this.saveObj.per_person_avg = per_person_avg
            this.saveObj.per_person_total = per_person_total
            this.saveObj.school_total = school_total
            if (this.$route.query.id !== undefined) {
              this.saveObj.budget_id = id
            }
            this.saveObj.menu = oldData.menu
            this.$store.commit("sch_setLoaing", true)
            this.$http.RecipesCompiled(this.saveObj).then((res) => {
              this.$store.commit("sch_setLoaing", false)
              if (res.code == 1) {
                this.$router.go(-1)
              }
            })
          } else {
            return false;
          }
        });
      },
      getDetails(data) { //新增获取数据
        this.$store.commit("sch_setLoaing", true)
        this.$http.RecipesCompiledInfo(data).then((res) => {
          this.$store.commit("sch_setLoaing", false)
          if (res.code == 1) {
            this.allData = res.data
            this.dinner = this.dinerObj[res.data.recipes.type]
          }else{
            this.$router.go(-1)
          }
        })
      },
      moneyReg(obj) { //输入金额正则验证
        var money = ""
        money = obj.replace(/^\./, "");
        money = obj.replace(/[^\d.]/g, "");
        money = obj.replace(/\.{2,}/g, ".");
        money = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        money = obj.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3');
        if (money.indexOf("-") == 0) {
          money = money.split("-")[1]
        }
        var newsd = money.split(".")
        if (newsd[1] !== undefined) {
          money = newsd[0].slice(0, 8) + '.' + newsd[1]
        } else {
          money = newsd[0].slice(0, 8)
        }
        if (money.indexOf(".") < 0 && money != "") {
          money = parseFloat(money);
        }
        return money;
      },
      ruleIput(e) { //人均伙食费标准限制输入
        var val = e.target.value
        var newStr = this.$commonJs.regMoneyOnes(val,2)
        // if(isNaN(newStr)){
        //   newStr = ""
        // }
        e.target.value = newStr
        this.allData.recipes.per_person_avg = newStr
      },
      school_dosag(it, index, ix) { //计算全校人每餐得用量
        var nums = this.$commonJs.rounds(Number(it.dosage) * (Number(this.allData.recipes.dinner_student) + Number(this.allData.recipes.dinner_teacher)),3)
        if (it.unit == "g" || it.unit == "ml") {
          this.allData.menu[index].food[ix].school_dosage = this.$commonJs.rounds(nums / 1000,3)
        } else {
          this.allData.menu[index].food[ix].school_dosage = nums
        }
      },
      topNum(e, key) { //顶部输入框监听
        var val = e.target.value;
        var newStr = val.replace(/[^0-9]/g, '')
        e.target.value = newStr;
        this.allData.recipes[key] = newStr;
        this.allData.menu.forEach((item) => {
          item.food.forEach((it) => {
            var nums = this.$commonJs.rounds(Number(it.dosage) * (Number(this.allData.recipes.dinner_student) + Number(this.allData.recipes
              .dinner_teacher)),3)
            if (it.unit == "g" || it.unit == "ml") {
              it.school_dosage = this.$commonJs.rounds(nums / 1000,3)
            } else {
              it.school_dosage = nums
            }
          })
        })
        this.school_price()
        this.school_totals()
        this.allSchoolTotla()
        this.allTotla()
      },
      per_person_total() { //计算每人每餐用量   金额合计
        this.allData.menu.forEach((item) => {
          var s = 0;
          item.food.forEach((val, idx, arr) => {
            s += Number(val.price)
          }, 0)
          item.per_person_total = this.$commonJs.rounds(s,3)
        })
      },
      school_totals() { //计算全校人每餐   金额总计
        this.allData.menu.forEach((item) => {
          var s = 0;
          item.food.forEach((val, idx, arr) => {
            s += Number(val.school_price)
          }, 0)
          item.school_total = this.$commonJs.rounds(s,2)
        })
      },
      school_price() { //计算全校人每餐用量   金额
        this.allData.menu.forEach((item) => {
          item.food.forEach((it) => {
            it.school_price = this.$commonJs.rounds(Number(it.school_dosage) *Number(it.unit_price),2)
          })
        })
      },
      allTotla() { //计算每人金额合计
        if(Number(this.allData.recipes.school_total)!==0){
          this.allData.recipes.per_person_total = this.$commonJs.rounds(Number(this.allData.recipes.school_total)/(Number(this.allData.recipes.dinner_student) + Number(this.allData.recipes.dinner_teacher)),2)
        }else{
          this.allData.recipes.per_person_total = 0
        }
      },
      allSchoolTotla() { //计算全校金额合计
        var s = 0;
        this.allData.menu.forEach((item) => {
          s += Number(item.school_total)
        })
        this.allData.recipes.school_total = this.$commonJs.rounds(s,2)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../assets/css/NutritionDiet/BudgetTable.scss';
</style>
