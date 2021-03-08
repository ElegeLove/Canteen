<template>
  <div  id="boxs">
    <div class="login" style="height: 470px;">
       <div class="newpass">短信验证修改密码</div>
       <div class="formBox">
         <a-form-model
           ref="dynamicValidateForm"
           :model="postData"
           :rules="rules"
         >
              <a-form-model-item ref="name" prop="phone">
                <a-input
                  placeholder="手机号"
                  :maxLength="11"
                  v-model="postData.phone"
                />
              </a-form-model-item>
              <a-form-model-item ref="code" prop="code" class="bettonFlex">
                  <a-input
                    class="code"
                    :maxLength="6"
                    placeholder="验证码"
                    v-model="postData.code"
                  />
                  <a-button type="primary" class="getBtn"
                   :loading="loading"
                   @click="SendCode"  v-show="sends.show">获取验证码</a-button>
                  <a-button type="primary" class="getBtn" v-show="!sends.show">{{sends.count}} s</a-button>
              </a-form-model-item>
              <a-button type="primary"
              html-type="submit"
              class="logins nomarg" @click="onSubmit">下一步</a-button>
              <div class="outlogin" @click="goBack">点击返回登录>></div>
          </a-form-model>
       </div>
     </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        form: this.$form.createForm(this, { name: 'coordinated' }),
        postData:{
          phone:"",
          code:""
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            {validator:this.$commonJs.phoneCheck.bind(this),trigger: 'blur'}
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        sends:{
          show:true,
          count:"",
          timer: null
        },
        loading:false
      }
    },
    methods:{
      goBack(){
         this.$router.go(-1)
      },
      onSubmit() {
        this.$refs.dynamicValidateForm.validate(valid => {
          if (valid) {
            this.$http.CommonCheckSms(this.postData).then((res)=>{
               if(res.code==1){
                 this.$router.push({path:"/SettingPassword",query:{type:"update",phone:this.postData.phone}})
               }
            })
          } else {
            return false;
          }
        });
      },
      SendCode(){            //发送验证码
        var bool = this.$commonJs.loginReg(this.postData.phone)
        console.log(bool) 
        if(bool){
          this.loading = true 
         const time_out = 60;
         this.$http.SendCode({phone:this.postData.phone}).then((res)=>{
            this.loading = false
            if(res.code==1){
              if (!this.timer) {
                this.sends.count = time_out;
                this.sends.show = false;
                this.sends.timer = setInterval(() => {
                if (this.sends.count > 0 && this.sends.count <= time_out) {
                  this.sends.count--;
                 } else {
                  this.sends.show = true;
                  clearInterval(this.timer);
                  this.sends.timer = null;
                 }
                }, 1000)
               }
            }
         })
        }
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '@/assets/css/login.scss';
</style>
