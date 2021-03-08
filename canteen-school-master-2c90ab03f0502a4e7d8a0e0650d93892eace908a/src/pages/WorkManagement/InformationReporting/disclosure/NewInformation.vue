<template>
  <div>
    <goback title="新增"/>
    <a-form-model
       ref="formModel"
       :model="postData"
       :rules="Validata"
    >
    <div class="boxs">
      <div class="ipts seles">
        <span>选择学期：</span>
         <a-form-model-item ref="calendar_id" prop="calendar_id">
            <a-select
                v-model="postData.calendar_id"
                 @change="calenChange('calendar_id')"
                 placeholder="请选择"
              >
                <a-select-option :value="item.id" v-for="(item,index) in semester" :key="index">{{item.year}}年{{item.semester}}</a-select-option>
            </a-select>
          </a-form-model-item>
      </div>
      <div class="ipts seles">
        <span>周&emsp;&emsp;数：</span>
        <a-form-model-item ref="week_id" prop="week_id">
          <a-select
              v-model="postData.week_id"
              :disabled="postData.calendar_id==undefined?true:false"
              @change="calenChange"
              placeholder="请选择"
            >
              <a-select-option :value="item.id" v-for="(item,index) in weekData" :key="index">第{{item.weeks}}周</a-select-option>
          </a-select>
        </a-form-model-item>
      </div>
      <div class="ipts">
        <span>主&emsp;&emsp;题：</span>
        <a-form-model-item ref="title" prop="title">
          <a-input placeholder="请输入主题" v-model="postData.title"/>
        </a-form-model-item>
      </div>
      <div class="upfile">
        <p>上传文件：</p>
        <a-form-model-item ref="image" prop="image">
          <drg-file @getFile="getFile" :max="6" :fileArr="postData.image" accept=".jpg,.png,.jpeg"/>
        </a-form-model-item>
      </div>
      <a-button type="primary" @click="saves">提交</a-button>
    </div>
     </a-form-model>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
         semester:[],
         weekData:[],
         Validata:{
           calendar_id:[{ required: true, message: '请选择学期',trigger: 'blur' }],
           week_id:[{ required: true, message: '请选择周数',trigger: 'blur' }],
           title:[{ required: true, message: '请输入标题',trigger: 'blur' }],
           image:[{ required: true, message: '请上传文件',trigger: 'blur' }],
         },
         postData:{
           calendar_id:undefined,
           week_id:undefined,
           title:"",
           image:[]
         }
      }
    },
    components:{
      goback
    },
    created(){
      this.getSemester("calendar_id")
      var id = this.$route.query.id
      if(id!==""){
        this.getDetails(id)
      }
    },
    methods:{
      getDetails(id){       //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.InfoInformationDetail({id}).then((res)=>{
            this.$store.commit("sch_setLoaing",false)
            if(res.code==1){
              this.postData = res.data
              this.getSemester('week',this.postData.calendar_id);
              var imsArr = []
              res.data.image.forEach((item)=>{
                imsArr.push({url:item,name:decodeURI(this.$commonJs.getType(item))})
              })
              this.postData.image = imsArr
            }
        })
      },
      getFile(data){          //获取文件回调
        this.postData.image = data;
        this.$refs.formModel.clearValidate("image");
      },
      calenChange(type){          //选择学期回调
        this.getSemester('week',this.postData.calendar_id);
        if(type=="calendar_id"){
          this.postData.week_id = undefined
        }
      },
      getSemester(type,id){            //获取搜索条件
         this.$http.RecipesGetSearch({id:id}).then((res)=>{
           if(res.code==1){
             if(type=='calendar_id'){
                this.semester = res.data
             }else{
               this.weekData = res.data
             }
           }
         })
      },
      saves(){       //保存
        this.$refs.formModel.validate(valid => {
          if (valid) {
             this.$store.commit("sch_setLoaing",true)
             var allDatas = JSON.parse(JSON.stringify(this.postData));
             var imgs = []
             allDatas.image.forEach((items)=>{
                imgs.push(items.url)
             })
             allDatas.image = imgs
             this.$http.InfoInformationAddUpdate(allDatas).then((res)=>{
               this.$store.commit("sch_setLoaing",false)
               if(res.code==1){
                 this.$router.go(-1)
               }
             })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/NewInformation.scss';
</style>
