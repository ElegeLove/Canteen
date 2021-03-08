<template>
  <div>
     <goback title="返回" :subtit="titles"/>
     <a-form-model
       ref="outhpser"
       :model="allData"
     >
       <div class="boxs">
         <div class="rows_bo">
           <div>学校：{{infoData.school}}</div>
           <div>学期：{{infoData.year}}</div>
         </div>
          <div class="bigBox">
            <div class="formBox" v-for="(item,index) in allData.data" :key="index">
              <div>
                <span>岗位</span>
                <a-form-model-item :prop="'data.' + index + '.position'" :rules="AlidateRule.position">
                  <a-input placeholder="请输入" v-model="item.position"/>
                </a-form-model-item>
              </div>
              <div>
                <span>姓名</span>
                <a-form-model-item :prop="'data.' + index + '.name'" :rules="AlidateRule.name">
                  <a-input placeholder="请输入" v-model="item.name"/>
                </a-form-model-item>
              </div>
              <div>
                <span>电话</span>
                <a-form-model-item :prop="'data.' + index + '.phone'" :rules="AlidateRule.phone">
                  <a-input placeholder="请输入" v-model="item.phone" type="number"/>
                 </a-form-model-item>
              </div>
              <a-button type="primary" clas="deles" v-if="allData.data.length>1" @click="delet(index)">删除</a-button>
            </div>
          </div>
          <div class="add_person" @click="adds">
            <img src="../../../../assets/image/adds.png" />
            <span>添加人员</span>
          </div>
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
    components:{
      goback
    },
    data(){
      return{
        titles:"",
        allData:{
          data:[],
        },
        form: this.$form.createForm(this),
        AlidateRule:{
          position:{required: true,message: '请填写输入岗位', trigger: 'blur'},
          name:{required: true,message: '请输入姓名', trigger: 'blur'},
          phone:{required: true,message: '请输入电话号码', trigger: 'blur'},
        },
        infoData:""
      }
    },
    created(){
      var objs = {
        "2":"监委会",
        "3":"家长委员会",
        "4":"膳食委员会",
        "5":"食品安全领导小组",
        "6":"营改领导小组",
        "7":"食品采购小组"
      }
      this.titles = objs[this.$route.query.type]
      this.creatList()
      var infoData = JSON.parse(localStorage.getItem("infoScolls"))
      this.infoData = infoData
    },
    methods:{
      creatList(){            //创建空的数据
        this.allData.data = [{
             position:"",
             name:"",
             phone:"",
             group_type:this.$route.query.type,
             calendar_id:this.$route.query.calendar_id,
             school_id:this.$route.query.school_id
        }]
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
      cancel(){      //取消
         this.$router.go(-1)
      },
      adds(){     //添加
         this.allData.data.push({
           position:"",
           name:"",
           phone:"",
           group_type:this.$route.query.type,
           calendar_id:this.$route.query.calendar_id,
           school_id:this.$route.query.school_id
         })
      },
      delet(index){     //删除
        this.allData.data.splice(index, 1);
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/CanteenOrganization/OtherPersonnel.scss';
</style>
