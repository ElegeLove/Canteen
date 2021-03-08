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
        <span>选择年份：</span>
        <a-form-model-item ref="calendar_id" prop="calendar_id">
          <a-select
              placeholder="请选择"
              v-model="postData.calendar_id"
              @change="checkYear('year')"
            >
              <a-select-option :value="item.id" v-for="(item,index) in yearData" :key="index">{{item.year}}年{{item.semester}}</a-select-option>
          </a-select>
        </a-form-model-item>
      </div>
      <div class="ipts seles">
        <span>选择月份：</span>
        <a-form-model-item ref="month" prop="month">
            <a-select
                placeholder="请选择"
                :disabled="postData.calendar_id==undefined?true:false"
                v-model="postData.month"
              >
                <a-select-option :value="item.month" v-for="(item,index) in mounths" :key="index">{{item.month}}月</a-select-option>
            </a-select>
        </a-form-model-item>
      </div>
      <div class="ipts seles">
        <span>记录类型：</span>
        <a-form-model-item ref="type" prop="type">
            <a-select
              placeholder="请选择"
              v-model="postData.type"
              style="width: 400px;"
            >
                <a-select-option :value="item.id" v-for="(item,index) in workTypes" :key="index">{{item.name}}</a-select-option>
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
        <a-form-model-item ref="content" prop="content">
          <drg-file @getFile="getImg" :max="6" :fileArr="postData.content"/>
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
        workTypes:[],
        mounths:[],
        yearData:[],
        postData:{
          calendar_id:undefined,
          month:undefined,
          title:"",
          type:undefined,
          content:[]
        },
        Validata:{
          calendar_id:[{ required: true, message: '请选择年份',trigger: 'blur' }],
          month:[{ required: true, message: '请选择月份',trigger: 'blur' }],
          type:[{ required: true, message: '请选择记录类型',trigger: 'blur' }],
          title:[{ required: true, message: '请输入主题',trigger: 'blur' }],
          content:[{ required: true, message: '请上传文件',trigger: 'blur' }]
        },
      }
    },
    components:{
      goback
    },
    created(){
      this.workTypes = JSON.parse(localStorage.getItem("workTypesd"))
      this.getSearchs("year")
      var id = this.$route.query.id
      if(id!==""){
        this.getDetails(id)
      }
    },
    methods:{
      getImg(data){         //文件回调
        this.postData.content = data;
        this.$refs.formModel.clearValidate("content");
      },
      getDetails(id){       //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.InfoRecordDetail({id}).then((res)=>{
            this.$store.commit("sch_setLoaing",false)
            if(res.code==1){
              this.postData = res.data
              var imsArr = []
              res.data.content.forEach((item)=>{
                imsArr.push({url:item})
              })
              this.postData.content = imsArr
            }
        })
      },
      getSearchs(type,id){           //获取下拉数据
         this.$http.RecipesGetSearchMonth({id}).then((res)=>{
            if(res.code==1){
              if(type=='year'){
                 this.yearData = res.data
              }else{
                this.mounths = res.data
              }
            }
         })
      },
      checkYear(){          //选择年份
        this.getSearchs('mounth',this.postData.calendar_id)
        this.postData.month = undefined
      },
      saves(){
        this.$refs.formModel.validate(valid => {
          if (valid) {
             this.$store.commit("sch_setLoaing",true)
             var allDatas = JSON.parse(JSON.stringify(this.postData));
             var imgs = []
             allDatas.content.forEach((items)=>{
                imgs.push(items.url)
             })
             allDatas.content = imgs
             this.$http.InfoRecordAddUpdate(allDatas).then((res)=>{
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
