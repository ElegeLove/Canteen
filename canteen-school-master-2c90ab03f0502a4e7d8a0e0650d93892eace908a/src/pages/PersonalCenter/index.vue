<template>
  <div>
      <div class="userBox">
         <div class="userInfo">
           <img src="../../assets/image/user.png"/>
           <span>个人中心</span>
         </div>
         <div class="contBox">
            <div>
               <span>用户ID：</span>
               <div>{{allData.id}}</div>
            </div>
            <div>
               <span>绑定手机：</span>
               <div>{{allData.mobile==''?'暂未绑定':allData.mobile}}</div>
               <p class="main_color" @click="checks">更换</p>
            </div>
            <div>
               <span>账号：</span>
               <div>{{allData.username}}</div>
            </div>
            <div>
              <span>密码：</span>
              <a-input  value="******" disabled/>
              <p class="main_color" @click="()=>passModal=true">修改</p>
            </div>
            <div>
               <span>创建时间：</span>
               <div>{{allData.create_time}}</div>
            </div>
         </div>
      </div>
      <a-modal
        v-model="passModal"
        title="密码修改"
        centered
        @ok="upPassword"
      >
        <div class='passIpt'>
          <span>原密码：</span>
          <a-input placeholder="请输入原密码" v-model="up_pass.old_password"/>
        </div>
        <div class='passIpt'>
          <span>新密码：</span>
          <a-input placeholder="请输入新密码" v-model="up_pass.password"/>
        </div>
        <div class='passIpt'>
          <span>确认密码：</span>
          <a-input placeholder="请确认密码" v-model="up_pass.re_password"/>
        </div>
      </a-modal>
     <!-- <div class="userBox">
          <div class="userInfo">
            <img src="../../assets/image/setting.png"/>
            <span>个性化配置</span>
          </div>
          <div class="imgBoxs">
             <p>系统图标</p>
              <div class="uploads">
              <up-file @getImg="getImg" :max_num="1" :de_fileList="fileList">
                  <div>
                    <a-icon type="plus" />
                    <div class="ant-upload-text">上传</div>
                  </div>
               </up-file>
            </div>
            <div>
              <a-checkbox @change="onChange" class="checkBox">使用默认</a-checkbox>
            </div>
            <a-button type="primary" class="btns">提交反馈</a-button>
          </div>
      </div> -->
  </div>
</template>

<script>
  export default{
    data(){
      return{
        passModal:false,
        allData:{},
        up_pass:{
          old_password:"",
          password:"",
          re_password:""
        },
        tostData:{
          old_password:"请输入原密码",
          password:"请输入新密码",
          re_password:"请确认密码"
        },
      }
    },
    created(){
       this.getData()
    },
    methods:{
      onChange(){

      },
      checks(){       //更换手机号
        this.$router.push({name:"ChangeMobile"})
      },
      getData(){
        this.$store.commit("sch_setLoaing",true)
        this.$http.IndexInfo().then((res)=>{
          if(res.code==1){
             this.allData = res.data
          }
          this.$store.commit("sch_setLoaing",false)
        })
      },
      upPassword(){        //修改密码
        var arr =  Object.keys(this.tostData)
        for(var i=0;i<arr.length;i++){           //非空验证
           if(this.up_pass[arr[i]]==''){
               return this.$message.error(this.tostData[arr[i]]);
           }
        }
        this.$http.IndexChangePassword(this.up_pass).then((res)=>{
          if(res.code==1){
             this.passModal = false
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/PersonalCenter/index.scss';
</style>
