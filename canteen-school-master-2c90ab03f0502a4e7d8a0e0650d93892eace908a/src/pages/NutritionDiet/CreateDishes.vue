<template>
  <div>
    <backs :title="type=='add'?'创建菜品':'编辑菜品'"/>
     <a-form-model
        ref="dynamicValidateForm"
        :model="dynamicValidateForm"
      >
    <div class="boxs">
       <div class="seleBox">
         <p>名称<span>注：请添加该菜品的主要食材</span></p>
          <a-form-model-item :rules="AlidateRule.name" prop="name">
             <a-input placeholder="请输入菜名" v-model="dynamicValidateForm.name" :maxLength="15" :disabled="type=='update'?true:false"/>
          </a-form-model-item>
       </div>
       <div class="seleBox">
         <p>类别</p>
         <a-form-model-item :rules="AlidateRule.type" prop="type">
           <a-select
               style="width: 300px"
               v-model="dynamicValidateForm.type"
               placeholder="菜品类别选择"
             >
               <a-select-option :value="item.id" v-for="(item,index) in commonSchoolSet.menu" :key="index">{{item.name}}</a-select-option>
           </a-select>
         </a-form-model-item>
       </div>
       <div v-for="(item,index) in dynamicValidateForm.ingredient" :key="index" class="addLines">
          <div class="flexBox">
             <div class="seleBox newMar">
               <p>食材</p>
               <a-form-model-item :prop="'ingredient.' + index + '.secondary_id'" :rules="AlidateRule.secondary_id">
                   <a-select
                       v-model="item.secondary_name"
                       show-search
                       placeholder="请搜索食材"
                       style="width: 300px"
                       :default-active-first-option="false"
                       :show-arrow="false"
                       :filter-option="false"
                       :not-found-content="null"
                       @search="handleSearch($event,index)"
                       :getPopupContainer="
                           triggerNode => {
                             return triggerNode.parentNode || document.body;
                           }
                         "
                     >
                       <a-select-option
                        @click="handleChange(item,it)"
                        v-for="(it,ix) in menu_obj[index].ingredients" :key="ix">
                         {{it.name}}
                       </a-select-option>
                     </a-select>
                 </a-form-model-item>
             </div>
             <div class="seleBox newMar">
               <p>食材每餐每人预算量</p>
               <a-form-model-item :prop="'ingredient.' + index + '.budget'" :rules="AlidateRule.budget">
                <a-input placeholder="食材预算量" v-model="item.budget" @change="iptReg($event,item)"/>
               </a-form-model-item>
             </div>
             <div class="seleBox newMar">
               <p>计量单位</p>
               <a-form-model-item :prop="'ingredient.' + index + '.unit'">
                  <div>{{item.unit==''?'— —':item.unit}}</div>
               </a-form-model-item>
             </div>
             <a-button type="primary" class="deles" @click="delets(index)">删除</a-button>
          </div>
       </div>
       <div class="adds" @click="addSc">
         <img src="../../assets/image/adds.png" />
         <span>添加食材</span>
       </div>
       <div class="btnBox">
         <a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')">保存</a-button>
         <a-button @click="gobacks">取消</a-button>
       </div>
    </div>
    </a-form-model>
  </div>
</template>

<script>
  let timeout;
  import { mapState} from 'vuex';
  import backs from "../../components/goBack/index.vue"
  export default{
    data(){
      return{
        form: this.$form.createForm(this),
        datas:[{id:1}],
        type:"",
        dynamicValidateForm:{
          name:"",
          type:undefined,
          ingredient:[{secondary_id:undefined,budget:"",unit:""}]
        },
        AlidateRule:{
          name:{required: true,message: '请输入菜名', trigger: 'blur'},
          type:{required: true,message: '请选择菜品', trigger: 'blur'},
          secondary_id:{required: true,message: '请选择食材', trigger: 'blur'},
          budget:{required: true,message: '请输入食材预算量', trigger: 'blur'},
        },
        menu_obj:[{ingredients:[]}],//食材数据
        searData:{
          keyword:""
        },
        setIndex:""
      }
    },
    components:{
      backs
    },
    created(){
      this.type = this.$route.query.type
      if(this.$route.query.id){
        this.getDetails(this.$route.query.id)
      }
    },
    computed: {
      ...mapState(['commonSchoolSet'])
    },
    methods:{
      iptReg(e,item){         //输入验证
        var vals = e.target.value;
        var newVal = this.$commonJs.regMoneyOnes(vals);
        e.target.value = newVal;
        item.budget = newVal;
      },
      getMenu(){                 //获取食材
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        timeout = setTimeout(this.questMenu, 400);
      },
      questMenu(){           //搜索请求
        if(this.searData.keyword==""){
          return false;
        }
        this.$http.RecipesProduct(this.searData).then((res)=>{
          if(res.code==1){
            this.menu_obj[this.setIndex].ingredients = res.data;
            // this.dynamicValidateForm.ingredient[this.setIndex].ingredients = res.data
          }
        })
      },
      handleChange(item,it) {             //食材触发
        item.unit = it.unit
        item.secondary_id = it.id
        item.secondary_name = it.name
        this.$forceUpdate()
      },
      handleSearch(value,index){        //食材搜索
       this.setIndex = index;
       this.searData.keyword = value
       this.getMenu(index)
      },
      gobacks(){       //取消
         this.$router.go(-1)
      },
      getDetails(id){             //详情加载
        this.$store.commit("sch_setLoaing",true)
        this.$http.RecipesInfo({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.dynamicValidateForm = res.data;
            var arr_menus = [];
            this.dynamicValidateForm.ingredient.forEach((its)=>{
              arr_menus.push({ingredients:[]});
            })
            this.menu_obj = arr_menus;
          }
        })
      },
      submitForm(formName) {            //提交
        this.$refs[formName].validate((valid,value) => {
          if (valid) {
             if(this.dynamicValidateForm.ingredient.length==0){
               return this.$message.error('请添加食材');
             }
             this.$store.commit("sch_setLoaing",true)
             this.$http.RecipesDataManipulation(this.dynamicValidateForm).then((res)=>{
               this.$store.commit("sch_setLoaing",false)
               if(res.code==1){
                 this.$router.go(-1)
               }
             })
          } else {
            return false;
          }
        });
      },
      addSc(){
        this.dynamicValidateForm.ingredient.push({secondary_id:undefined,budget:"",unit:""});
        this.menu_obj.push({ingredients:[]});
      },
      delets(index){            //删除
        this.dynamicValidateForm.ingredient.splice(index,1)
        this.menu_obj.splice(index,1)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/NutritionDiet/CreateDishes.scss';
</style>
