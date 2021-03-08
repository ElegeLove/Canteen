<template>
  <div>
    <goback title="返回"/>
    <!-- <steps :current="0"/> -->
    <div class="contBox">
       <div class="stepBox">
         <p>享受营改花名册：</p>
         <div>
            <a-button type="primary" @click="importExe('enjoy')">导入花名册</a-button>
            <span  class="main_color" @click="downLoa('nutrition_enjoy')">下载花名册</span>
         </div>
         <div class="fileView main_color" v-if="postData.enjoy!==''">
           <span>享受营改花名册</span>
           <a-icon type="delete" @click="delets('enjoy')"/>
         </div>
       </div>
       <div class="stepBox">
         <p>未享受营改花名册：</p>
         <div>
            <a-button type="primary" @click="importExe('not_enjoy')">导入花名册</a-button>
            <span  class="main_color" @click="downLoa('nutrition_not_enjoy')">下载花名册</span>
         </div>
         <div class="fileView main_color" v-if="postData.not_enjoy!==''">
           <span>未享受营改花名册</span>
           <a-icon type="delete" @click="delets('not_enjoy')"/>
         </div>
       </div>
       <div class="beis">注：请下载模板，根据模板填写学校享受营改计划的学生后，导入花名册</div>
       <div class="btnBox">
         <a-button @click="goBack">取消</a-button>
         <a-button type="primary" @click="goNext">保存</a-button>
       </div>
    </div>
    <impmodule ref="upfile" @getFiles="getFile"/>
  </div>
</template>

<script>
  import steps from "./step.vue"
  import goback from "../../../../components/goBack/index.vue"
  import impmodule from "../../../../components/ImportModule.vue"
  import {put} from "../../../../assets/js/upload.js"
  export default{
    data(){
      return{
        modelObj:{
          nutrition_enjoy:"",            //享受
          nutrition_not_enjoy:""         //不享受
        },
        postData:{
          id:"",
          enjoy:"",
          not_enjoy:""
        },
        localKey:""
      }
    },
    components:{
      steps,goback,impmodule
    },
    created(){
       this.postData.id = this.$route.query.id;
    },
    methods:{
      getDownUrl(call){           //获取模板
        this.$http.CommonDownloadTemplate().then((res)=>{
          if(res.code==1){
            this.modelObj.nutrition_enjoy = res.data.nutrition_enjoy;
            this.modelObj.nutrition_not_enjoy = res.data.nutrition_not_enjoy;
            if(call!==undefined){
              call(res.data)
            }
          }
        })
      },
      downLoa(key){         //下载模板
        if(this.modelObj[key]!==''){
          window.open(this.modelObj[key])
        }else{
          this.getDownUrl((data)=>{
             window.open(data[key])
          })
        }
      },
      delets(key){        //删除花名册
        this.postData[key] = ""
      },
      goBack(){
        this.$router.go(-1)
      },
      goNext(){
        var {enjoy,not_enjoy} = this.postData;
        if(enjoy==""){
          return this.$message.error('请上传享受营改花名册');
        }
        if(not_enjoy==""){
          return this.$message.error('请上传未享受营改花名册');
        }
        var formData = new FormData();
        var {id,enjoy,not_enjoy} = this.postData;
        formData.append("id",id);
        formData.append("enjoy",enjoy);
        formData.append("not_enjoy",not_enjoy);
        this.$store.commit("sch_setLoaing",true)
        this.$http.InformationBusinessReformUser(formData).then((res)=>{
          this.$store.commit("sch_setLoaing",false);
          if(res.code==1){
            this.$router.go(-1);
          }
        })
        // this.$router.push({name:"t_planTwo"})
      },
      getFile(file){          //获取文件
        this.postData[this.localKey] = file;
      },
      importExe(key){           //导入花名册
        this.localKey = key;
        this.$refs.upfile.upFile();
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
.fileView{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 180px;
  font-size: 15px !important;
  margin-top: 6px;
  >span{
    margin-left: 0 !important;
  }
}
.contBox{
  display: flex;
  margin: 90px auto 0 auto;
  width: 35%;
  flex-direction: column;
  box-sizing: border-box;
  padding-left: 40px;
  justify-content: center;
  >.stepBox{
    margin-bottom: 40px;
    >p{
      font-size: 16px;
      color: #000;
      white-space: nowrap;
    }
    >div{
      flex-wrap: wrap;
      display: flex;
      align-items: center;
      >button{
        border-radius: 4px;
      }
      >span{
        font-size: 14px;
        cursor: pointer;
        margin-left: 10px;
        white-space: nowrap;
      }
    }
  }
}
.beis{
  font-size: 16px;
  color: #717171;
}
.btnBox{
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  button{
    width: 80px;
    height: 36px;
    font-size: 14px;
    border-radius: 4px;
  }
  button:nth-of-type(1){
    margin-right: 20px;
  }
}
</style>
