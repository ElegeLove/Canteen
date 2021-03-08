<template>
  <div>
    <backs :title="postData.id==''?'添加用户':'编辑用户'"/>
     <a-form-model
      ref="dynamicValidateForm"
      :model="postData"
      :rules="Validata"
    >
    <div class="boxss">
       <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="selec">
              <p>用户名（登录账号）<span class="beis">*</span><span class="tips">{{postData.id==''?'添加后不可修改':'不可修改'}}</span></p>
              <a-form-model-item ref="username" prop="username">
                <a-input placeholder="填写用户名" :disabled="postData.id!=''" v-model="postData.username"/>
              </a-form-model-item>
            </div>
            <div class="selec">
              <p>职位</p>
              <a-form-model-item ref="role" prop="role">
                  <a-select
                    v-model="postData.role"
                    default-value="全部"
                    placeholder="请选择职位"
                    style="width: 270px"
                    >
                      <a-select-option :value="item.id" v-for="(item,index) in positions" :key="index">{{item.name}}</a-select-option>
                  </a-select>
              </a-form-model-item>
            </div>
            <div class="selec">
              <p>手机号码<span class="beis">*</span><span class="tips">{{postData.id==''?'添加后不可修改':'不可修改'}}</span></p>
              <a-form-model-item ref="mobile" prop="mobile">
                <a-input placeholder="填写手机号码"
                   v-model="postData.mobile"
                   :maxLength="11"
                :disabled="postData.id!=''"/>
              </a-form-model-item>
            </div>
            <div class="selec">
              <p>登录密码<span class="tips" v-if="postData.id!=''">登录密码可直接修改</span></p>
               <a-form-model-item>
                <a-input
                 v-model="postData.password"
                placeholder="填写登录密码" />
              </a-form-model-item>
            </div>
            <div class="switchBox">
              <div>
                <span>用户状态：</span>
                 <a-form-model-item>
                   <a-switch checked-children="启用" v-model="postData.status" un-checked-children="关闭" />
                 </a-form-model-item>
              </div>
            </div>
         </a-col>
       </a-row>
       <a-button type="primary" class="addSave" @click="saves">{{postData.id==''?'立即添加':'更新保存'}}</a-button>
    </div>
    </a-form-model>
  </div>
</template>

<script>
   import backs from "../../../components/goBack/index.vue"
   export default{
     data(){
       return{
         positions:[],
         form: this.$form.createForm(this),
         type:"",
         Validata:{
           username:[{ required: true, message: '请填写用户名',trigger: 'blur' }],
           mobile:[{ required: true, message: '请填写手机号码',trigger: 'blur' }],
           role:[{ required: true, message: '请选择职位',trigger: 'blur' }]
         },
         postData:{
           id:"",
           username:"",
           mobile:"",
           role:undefined,
           password:"",
           status:false
         }
       }
     },
     created(){
       var positions = localStorage.getItem("rolelist")
       if(positions){
         this.positions = JSON.parse(positions)
       }
       this.postData.id = this.$route.query.id
       if(this.$route.query.id!==''){
         this.getDetails(this.$route.query.id)
       }
     },
     components:{
       backs
     },
     methods:{
       getDetails(id){
         this.$store.commit("sch_setLoaing",true)
         this.$http.RoleUserDetails({id}).then((res)=>{
            this.$store.commit("sch_setLoaing",false)
           if(res.code==1){
             this.postData = res.data
             this.postData.status = res.data.status==0?false:true
             this.postData.id = id
           }
         })
       },
       saves(e) {              //提交
         this.$refs.dynamicValidateForm.validate(valid => {
           if (valid) {
            var datas = JSON.parse(JSON.stringify(this.postData))
            datas.status = datas.status==true?1:0
            this.$store.commit("sch_setLoaing",true)
            this.$http.RoleUserDataManipulation(datas).then((res)=>{
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
     }
   }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/ConfigurationManagement/UserManagement/AddUser.scss';
</style>
