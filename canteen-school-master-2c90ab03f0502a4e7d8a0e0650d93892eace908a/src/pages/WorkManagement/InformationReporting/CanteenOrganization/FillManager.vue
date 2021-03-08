<template>
  <div>
     <goback title="返回" subtit="食堂管理人员"/>
     <a-form-model
       ref="outhpser"
       :model="allData"
     >
     <div class="boxs">
        <div class="scolls">
          <div>学校：{{infoData.school}}</div>
          <div>学期：{{infoData.year}}</div>
        </div>
        <a-row>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="formBox" v-for="(item,index) in allData.data" :key="index">
            <div class="lef">
               <p>{{item.position}}</p>
               <div>
                 <span>姓名</span>
                 <a-form-model-item :prop="'data.' + index + '.name'" :rules="AlidateRule.name">
                   <a-input placeholder="请输入" v-model="item.name"/>
                 </a-form-model-item>
               </div>
               <div>
                 <span>电话</span>
                 <a-form-model-item :prop="'data.' + index + '.phone'" :rules="AlidateRule.phone">
                   <a-input placeholder="请输入" v-model="item.phone"/>
                 </a-form-model-item>
               </div>
            </div>
            <div class="uploads">
               <div>上传人像</div>
               <!-- <a-form-model-item :prop="'data.' + index + '.image'" :rules="AlidateRule.image"> -->
                  <up-file @getImg="getImg($event,index)" :de_fileList="item.defaultImg">
                      <div>
                        <a-icon type="plus" />
                        <div class="ant-upload-text">上传</div>
                      </div>
                   </up-file>
               <!-- </a-form-model-item> -->
            </div>
          </a-col>
        </a-row>
        <div class="btnBox">
          <a-button @click="cancel">取消</a-button>
          <a-button type="primary" @click="saves">保存</a-button>
        </div>
     </div>
     </a-form-model>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        allData:{
          data:[]
        },
        AlidateRule:{
          name:{required: true,message: '请输入姓名', trigger: 'blur'},
          phone:{required: true,message: '请输入电话号码', trigger: 'blur'},
          // image:{required: true,message: '请上传人像'}
        },
        infoData:""
      }
    },
    components:{
      goback
    },
    created(){
      this.creatList()
      var infoData = JSON.parse(localStorage.getItem("infoScolls"))
      this.infoData = infoData
    },
    methods:{
      creatList(){            //创建空的数据
        var titArr = ["校长","分管副校长","分管中层干部","食堂负责人","食堂安全管理员","会计","库管员","采购员","出纳"]
        titArr.forEach((item)=>{
           this.allData.data.push({
             position:item,
             name:"",
             phone:"",
             image:"",
             group_type:1,
             calendar_id:this.$route.query.calendar_id,
             school_id:this.$route.query.school_id
           })
        })
      },
      getImg(file,index){           //图片上传回调
        if(file.length!==0){
          this.allData.data[index].image = file[0].url
        }else{
          this.allData.data[index].image = ""
        }
      },
      saves(){          //保存
        this.$refs.outhpser.validate((valid,value) => {
          if (valid) {
            this.$store.commit("sch_setLoaing",true)
            this.$http.InfoCanteenGroupAddUpdate(this.allData).then((res)=>{
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
      cancel(){     //取消
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/CanteenOrganization/FillManager.scss';
</style>
