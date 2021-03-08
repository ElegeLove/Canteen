<template>
  <div  id="boxs">
     <div class="login" style="height: 470px;" v-if="show">
       <div class="newpass">设置新密码</div>
       <div class="formBox">
          <a-form :form="form" @submit="handleSubmit">
              <a-form-item>
                <a-input-password
                  placeholder="6~20位数字或字母"
                  :maxLength="20"
                  v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
                />
              </a-form-item>
              <a-form-item>
                <a-input-password
                  placeholder="确认密码"
                  v-decorator="['re_password', { rules: [{ required: true, message: '请确认密码' }] }]"
                />
              </a-form-item>
              <a-button type="primary" html-type="submit" class="logins nomarg">确定</a-button>
              <div class="outlogin" @click="goBack">点击返回登录>></div>
            </a-form>
       </div>
     </div>
     <div class="login" style="height: 470px;" v-else>
       <div class="successBox">
         <img src="../../assets/image/success.png" />
         <div class="success">密码修改成功</div>
         <a-button type="primary" @click="goBack">返回登录（{{minichken}}秒后自动返回）</a-button>
       </div>
     </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        form: this.$form.createForm(this),
        show:true,
        minichken:3,
        type:"",
        phone:""
      }
    },
    created(){
       this.type = this.$route.query.type
       this.phone = this.$route.query.phone
    },
    methods:{
      setTimer(){       //倒计时
        var that = this;
        var timer=setInterval(function () {
            that.minichken--;
            if(that.minichken==0){
               clearInterval(timer)
               that.$router.go(-2)
            }
        },1000)
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            var objs = JSON.parse(JSON.stringify(values))
            objs.mobile = this.phone
            objs.type = '2'
            var posts = this.type=='set'?'IndexSetPassword':'HandleSetpassword'
            this.$http[posts](objs).then((res)=>{
              if(res.code==1){
                if(this.type=="update"){           //忘记密码
                  this.setTimer()
                  this.show = false
                }else{         //首次登录
                  this.$router.push({name:"ManagementPanel"})
                }
              }
            })
          }
        });
      },
      goBack(){
         if(this.type=="update"){
           this.$router.go(-2)
         }else{
           this.$router.go(-1)
         }
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/login.scss';
</style>
