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
          <a-input placeholder="请输入原密码" v-model="up_pass.oldpassword"/>
        </div>
        <div class='passIpt'>
          <span>新密码：</span>
          <a-input placeholder="请输入新密码" v-model="up_pass.newpassword1"/>
        </div>
        <div class='passIpt'>
          <span>确认密码：</span>
          <a-input placeholder="请确认密码" v-model="up_pass.newpassword2"/>
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
          oldpassword:"",
          newpassword1:"",
          newpassword2:""
        },
        tostData:{
          oldpasswrd:"请输入原密码",
          newpassword1:"请输入新密码",
          newpassword2:"请确认密码"
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
        this.$router.push({name:"PersonalCenterChangeMobile"})
      },
      getData(){
        this.$http.userInfo().then((res)=>{
          if(res.code==1){
            console.log(res.data)
             this.allData = res.data
          }
        })
      },
      upPassword(){        //修改密码
        var arr =  Object.keys(this.tostData)
        for(var i=0;i<arr.length;i++){           //非空验证
           if(this.up_pass[arr[i]]==''){
               return this.$message.error(this.tostData[arr[i]]);
           }
        }
        this.$http.updatePasswrod(this.up_pass).then((res)=>{
          if(res.code==1){
             this.passModal = false
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
.userInfo{
  display: flex;
  height: 96px;
  box-sizing: border-box;
  padding-left: 40px;
  border-bottom: 1px solid #F0F2F5;
  align-items: center;
  >img{
    width: 21px;
    height: 21px;
    margin-right: 12px;
  }
  >span{
    font-size: 20px;
    color: #333333;
    white-space: nowrap;
  }
}
.contBox{
  box-sizing: border-box;
  padding: 31px 40px 0 40px;
  >div{
    margin-bottom: 30px;
    font-size: 16px;
    color: #333333;
    display: flex;
    align-items: center;
    >span,>div{
      white-space: nowrap;
    }
    >p{
      margin-bottom: 0;
      cursor: pointer;
      margin-left: 20px;
    }
    >input{
      width: 181px;
      height: 40px;
      border: 1px solid #D2D2D2;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 0 10px;
    }
  }
}
.userBox{
  border-bottom: 8px solid #F0F2F5;
}
.uploads{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  // >div{
  //   display: flex;
  //   margin-right: 80px;
  //   flex-direction: column;
  //   align-items: center;
  //   >div{
  //     width: 118px;
  //     height: 118px;
  //     border: 1px dashed #ccc;
  //     box-sizing: border-box;
  //     padding: 10px;
  //     margin-bottom: 20px;
  //     border-radius: 5px;
  //     >img{
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }
  //   >img{
  //     margin-bottom: 20px;
  //     border-radius: 5px;
  //     width: 118px;
  //     height: 118px;
  //   }
  // }
}
.imgBoxs{
  box-sizing: border-box;
  padding: 30px 42px 0 42px;
  >p{
    font-size: 16px;
    color: #333333;
    white-space: nowrap;
  }
  .checkBox{
    margin-top: 25px;
  }
  .btns{
    width: 80px;
    height: 36px;
    font-size: 14px;
    margin-top: 57px;
    margin-bottom: 30px;
  }
}
.passIpt{
  display: flex;
  align-items: center;
  margin: 20px 0;
  justify-content: center;
  >span{
    display: inline-block;
    width: 80px;
    font-size: 16px;
  }
  >input{
    width: 300px;
  }
}

</style>
