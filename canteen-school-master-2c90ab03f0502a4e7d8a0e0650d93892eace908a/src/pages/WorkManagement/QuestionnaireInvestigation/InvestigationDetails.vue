<template>
  <div>
    <goback title="详情"/>
    <div class="boxsf" v-if="allData!==''">
       <div class="topBox">
         <p>{{allData.title}}</p>
         <div class="tips">{{allData.requirement}}</div>
         <div class="timBoxs">
           <div>
              <span>问卷开始时间</span>
              <div>{{allData.start_time}}</div>
           </div>
           <span></span>
           <div>
             <span>问卷结束日期</span>
             <div>{{allData.end_time}}</div>
           </div>
         </div>
         <div class="file_box">
           <div class="files" v-for="(item,index) in allData.file" :key="index">
             <span>{{item.name}}</span>
             <a-button type="primary" @click="downLoad(item)">下载</a-button>
           </div>
         </div>
       </div>
       <div class="dragUps">
          <p>上传已经填写好的问卷</p>
          <drg-file :max="-1" accept=".doc,.docx,.xls,.xlsx,.rar,.zip,.pdf,.jpg,.png,.gif,.mp4"
           @getFile="getFile"
           ref="upfiles"
           acceptTxt="支持扩展名:.rar .zip .doc .docx .pdf .jpg...">
          </drg-file>
       </div>
       <a-button type="primary" @click="sends">发送</a-button>
    </div>
  </div>
</template>

<script>
  import goback from "../../../components/goBack/index.vue"
  import print from "print-js"
  export default{
    data(){
      return{
        allData:"",
        postData:{
          questionnaire_id:"",
          feedback:[]
        }
      }
    },
    components:{
      goback
    },
    created(){
      var id = this.$route.query.id;
      this.postData.questionnaire_id = id;
      this.getDetails(id)
    },
    methods:{
      getDetails(id){      //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.QuestionnaireQuestionnaireDetail({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data;
            var fileNews = [];
            this.allData.file.forEach((file)=>{
              fileNews.push({url:file,name:decodeURI(this.$commonJs.getType(file))})
            });
            if(this.allData.questionnaire!==null){
              var oldFile = [];
               this.allData.questionnaire.forEach((item)=>{
                   oldFile.push({load:false,url:item,name:decodeURI(this.$commonJs.getType(item))})
               })
              this.$nextTick(()=>{
                this.$refs.upfiles.setArr(oldFile);
              }) 
            }
            this.postData.feedback = fileNews;
            this.allData.file = fileNews;
          }
        })
      },
      downLoad(item){        //下载
        window.open(item.url)
      },
      getFile(data){
        this.postData.feedback = data;
      },
      sends(){       //发送
        if(this.postData.feedback.length==0){
          return this.$message.error('请上传问卷');
        }
        var datas = JSON.parse(JSON.stringify(this.postData));
        var file = [];
        datas.feedback.forEach((item)=>{
          file.push(item.url)
        })
        datas.feedback = file.join(",");
        this.$store.commit("sch_setLoaing",true)
        this.$http.QuestionnaireQuestionnaireFeedback(datas).then((res)=>{
          this.$store.commit("sch_setLoaing",false);
          if(res.code==1){
            this.$router.go(-1);
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../assets/css/WorkManagement/QuestionnaireInvestigation/InvestigationDetails.scss';
</style>
