<template>
  <div>
     <steps :current="1"/>
     <a-form-model
       ref="dynamicValidateForm"
       :model="dynamicValidateForm"
     >
      <div class="rows" >
         <div  v-for="(domain, index) in dynamicValidateForm.scollData" :key="index">
           <div class="divFlex">
              <div>
                <p>村校全称</p>
                 <a-form-model-item :prop="'scollData.' + index + '.full_name'" :rules="AlidateRule.full_name">
                    <a-input placeholder="请填写学校全称"  v-model="domain.full_name" />
              </a-form-model-item>
              </div>
              <span></span>
              <div>
                <p>村校简称</p>
                <a-form-model-item :prop="'scollData.' + index + '.abbreviation'" :rules="AlidateRule.abbreviation">
                   <a-input placeholder="请填写简称，限制6个字" :maxLength="6" v-model="domain.abbreviation"/>
                </a-form-model-item>
              </div>
           </div>
           <div class="divFlex">
              <div>
                <p>主任教师姓名及联系方式</p>
                 <a-form-model-item :prop="'scollData.' + index + '.chief_teacher'" :rules="AlidateRule.chief_teacher">
                   <a-input placeholder="请填写主任教师姓名" v-model="domain.chief_teacher"/>
                 </a-form-model-item>
              </div>
              <span>
                <span></span>
              </span>
              <div>
                <p></p>
                <a-form-model-item :prop="'scollData.' + index + '.chief_teacher_mobile'" :rules="AlidateRule.chief_teacher_mobile">
                  <a-input placeholder="请填写教师联系方式" :maxLength="11" v-model="domain.chief_teacher_mobile"/>
                </a-form-model-item>
              </div>
           </div>
           <div class="divFlex">
              <div>
                <p>详细地址</p>
                <a-form-model-item :prop="'scollData.' + index + '.address'" :rules="AlidateRule.address">
                  <a-input placeholder="请填写详细地址" v-model="domain.address"/>
                </a-form-model-item>
              </div>
           </div>
           <div class="radios">
             <div>是否有普惠幼儿园</div>
             <a-radio-group name="radioGroup" v-model="domain.inclusive_garden">
                 <a-radio :value="1">是</a-radio>
                 <a-radio :value="0">否</a-radio>
              </a-radio-group>
           </div>
          <div class="divFlex" v-if="domain.inclusive_garden==1">
              <div>
                <p>园长姓名及联系方式</p>
                <a-form-model-item :prop="'scollData.' + index + '.director'" :rules="AlidateRule.director">
                  <a-input placeholder="请填写园长姓名" v-model="domain.director"/>
                </a-form-model-item>
              </div>
              <span>
                <span></span>
              </span>
              <div>
                <p></p>
                <a-form-model-item :prop="'scollData.' + index + '.director_mobile'" :rules="AlidateRule.director_mobile">
                  <a-input placeholder="请填写园长联系方式" :maxLength="11" v-model="domain.director_mobile"/>
                </a-form-model-item>
              </div>
           </div>
           <a-button type="primary" class="delets" @click="delets(index)" v-if="domain.id==undefined">删除</a-button>
         </div>
        <div class="addScoll" @click="addScoll">
          <img src="../../../assets/image/adds.png" />
          <span>添加村校</span>
        </div>
        <div class="flexs">
          <a-button ghost type="primary" @click="jumps">跳过</a-button>
          <a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')">下一步</a-button>
        </div>
     </div>
     </a-form-model>
  </div>
</template>

<script>
  import steps from "../../../components/step/index.vue"
  import { mapState,mapMutations} from 'vuex';
  export default{
    data(){
      return{
        radio:1,
        scollData:[],
        form: this.$form.createForm(this),
        dynamicValidateForm: {
           scollData: []
        },
        AlidateRule:{
          full_name:{required: true,message: '请填写学校全称', trigger: 'blur'},
          abbreviation:{required: true,message: '请填写简称，限制6个字', trigger: 'blur'},
          chief_teacher:{required: true,message: '请填写主任教师姓名', trigger: 'blur'},
          chief_teacher_mobile:[{required: true,message: '请填写教师联系方式', trigger: 'blur'},{validator:this.$commonJs.phoneCheck.bind(this)}],
          address:{required: true,message: '请填写详细地址', trigger: 'blur'},
          director:{required: true,message: '请填写园长姓名', trigger: 'blur'},
          director_mobile:[{required: true,message: '请填写园长联系方式', trigger: 'blur'},{validator:this.$commonJs.phoneCheck.bind(this)}],
        }
      }
    },
    computed: {
      ...mapState(['scollInfo'])
    },
    mounted(){
       this.$store.commit("sch_setLoaing",true)
       this.$http.IndexSchoolInfo().then((res)=>{
          this.$store.commit("sch_setLoaing",false);
          if(res.code==1){
            this.setScollInfo(res.data)
            this.dynamicValidateForm.scollData = res.data.village
          }
       })
    },
    components:{
      steps
    },
    methods:{
      ...mapMutations(['setScollInfo']),
      submitForm(formName) {            //提交
        if(this.dynamicValidateForm.scollData.length==0){
          return this.$message.error('请添加村校');
        }
        this.$refs[formName].validate((valid,value) => {
          if (valid) {
            let obj = {village:this.dynamicValidateForm.scollData}
            var oldObj = JSON.parse(JSON.stringify(this.scollInfo))
            this.$store.commit("sch_setLoaing",true)
            this.$http.indexVillage(obj).then((res)=>{
              this.$store.commit("sch_setLoaing",false)
              if(res.code==1){
                var newObj =  Object.assign(oldObj,obj);
                this.setScollInfo(newObj)
                this.$router.push({name:"ChargeInformation"})
              }
            })
          } else {
            return false;
          }
        });
      },
      jumps(){       //跳过
        this.$router.push({name:"ChargeInformation"})
      },
      addScoll(){       //添加村校
         this.dynamicValidateForm.scollData.push({
          full_name:"",
          abbreviation:"",
          chief_teacher:"",
          chief_teacher_mobile:"",
          address:"",
          director:"",
          director_mobile:"",
          inclusive_garden:1
        });
      },
      delets(index){        //删除村校
         this.dynamicValidateForm.scollData.splice(index, 1);
         this.$forceUpdate()
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/internalManagement/VillageSchool.scss';
</style>
