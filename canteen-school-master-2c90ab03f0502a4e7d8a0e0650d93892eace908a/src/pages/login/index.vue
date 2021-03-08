<template>
  <div  id="boxs">
     <div class="login">
       <div class="logos">
         <div class="log">
           <img src="../../assets/image/logo.png" />
           <div class="shownLine"></div>
         </div>
          <span>智慧食堂学校端</span>
          <div class="linesd">
            <img src="../../assets/image/picr.png" />
            <span>守护孩子每一餐</span>
            <img src="../../assets/image/picl.png" />
          </div>
       </div>
       <div class="formBox">
          <a-form :form="form" @submit="handleSubmit">
              <a-form-item>
                <a-input
                  placeholder="账号"
                  v-decorator="['username', { rules: [{ required: true, message: '请输入账号' }] }]"
                />
              </a-form-item>
              <a-form-item>
                <a-input-password
                  placeholder="密码"
                  v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
                />
              </a-form-item>
              <div class="flex">
                 <a-checkbox v-model="checkPhone">记住账户</a-checkbox>
                 <span class="noPass" @click="updatepass">忘记密码</span>
              </div>
              <a-button type="primary" html-type="submit" class="logins" :loading="loading">登录</a-button>
            </a-form>
       </div>
     </div>
  </div>
</template>

<script>
  import { mapState,mapMutations} from 'vuex';
  export default{
    data(){
      return{
        form: this.$form.createForm(this),
        checkPhone:false,
        loading:false
      }
    },
    computed: {
      ...mapState(['sch_loginCache'])
    },
    mounted(){
      this.sch_setMenuList([])
      this.sch_setRootSubmenuKeys([])
      if(this.sch_loginCache!==""){
         var {username,password,checkPhone} = this.sch_loginCache
         this.form.setFieldsValue({
          username,
          password
        });
        this.checkPhone = checkPhone
      }
      this.getUpload()
      this.getOption()
      this.clearLeftSide()
    },
    methods:{
      clearLeftSide(){          //清空左侧
        localStorage.removeItem("cheakKey")
        localStorage.removeItem("openKey")
      },
      ...mapMutations(['sch_setRootSubmenuKeys','sch_setToken','sch_setLoginCache','sch_setFirstLogin','sch_setUploadConfig','setCommonSchoolSet','sch_setMenuList']),
      getUpload(){
        this.$http.CommonUpload().then((res)=>{
          if(res.code==1){
             this.sch_setUploadConfig(res.data)
          }
        })
      },
      handleSubmit(e) {
        e.preventDefault();
        var type = true
        this.form.validateFields((err, values) => {
          if (!err) {
            this.loading = true
            this.$http.login(values).then((res)=>{
              this.loading = false
              if(res.code==1){
                this.sch_setToken(res.data.access_token)
                this.sch_setFirstLogin(res.data.is_info)
                localStorage.setItem("school_id",res.data.school_id)
                if(res.data.first!==0){
                  this.$router.push({name:"ManagementPanel"})
                }else{
                  this.$router.push({path:"/SettingPassword",query:{phone:values.username,type:'set'}})
                }
                if(this.checkPhone){
                  var login_post = values
                  login_post.checkPhone = true
                  this.sch_setLoginCache(login_post)
                }else{
                  this.sch_setLoginCache("")
                }
              }
            })
          }
        });
      },
      updatepass(){
        this.$router.push({name:"UpdatePass"})
      },
      getOption(){       //获取学校配置
        this.$http.CommonSchoolSet().then((res)=>{
          if(res.code==1){
            this.setCommonSchoolSet(res.data)
            // this.position = res.data.position
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/login.scss';
</style>
