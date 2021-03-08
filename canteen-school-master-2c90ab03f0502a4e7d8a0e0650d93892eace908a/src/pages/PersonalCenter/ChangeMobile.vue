<template>
  <div>
      <backs title="更换绑定手机号"/>
      <div>
        <div class="passwords">
          <p>请输入原密码验证身份</p>
          <a-input placeholder="请输入原密码" v-model="postData.password"/>
        </div>
        <div class="passwords" style="border: 0;">
           <p>新绑定手机号</p>
           <a-input placeholder="输入手机号" v-model="postData.mobile"/>
           <div>
              <a-input placeholder="输入验证码" v-model="postData.code"/>
              <a-button type="primary" ghost @click="SendCode" 
              :loading="loading"
              v-show="sends.show">获取验证码</a-button>
              <a-button type="primary" ghost v-show="!sends.show">{{sends.count}} s</a-button>
           </div>
            <a-button type="primary" @click="updates">确认更换</a-button>
        </div>
      </div>
  </div>
</template>

<script>
  import backs from "../../components/goBack/index.vue"
  export default{
    data(){
       return{
         postData:{
           password:"",
           mobile:"",
           code:""
         },
         tostData:{
           password:"请输入原密码",
           mobile:"亲输入手机号",
           code:"亲输入验证码"
         },
         sends:{
           show:true,
           count:"",
           timer: null
         },
         loading:false
       }
    },
    components:{
      backs
    },
    methods:{
      SendCode(){            //发送验证码
        var bool = this.$commonJs.loginReg(this.postData.mobile)
        if(bool){
         this.loading = true;
         const time_out = 60;
         this.$http.SendCode({phone:this.postData.mobile}).then((res)=>{
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
      updates(){          //确认更换
        var arr =  Object.keys(this.tostData)
        for(var i=0;i<arr.length;i++){           //非空验证
           if(this.postData[arr[i]]==''){
               return this.$message.error(this.tostData[arr[i]]);
           }
        }
        this.$store.commit("sch_setLoaing",true)
        this.$http.IndexUpdateMobile(this.postData).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
           if(res.code==1){
             this.$router.go(-1)
           }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/PersonalCenter/ChangeMobile.scss';
</style>
