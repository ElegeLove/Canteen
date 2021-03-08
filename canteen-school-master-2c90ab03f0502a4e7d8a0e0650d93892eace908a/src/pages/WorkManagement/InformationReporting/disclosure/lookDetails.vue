<template>
  <div>
     <goback title="查看"/>
     <div class="boxs" v-if="allData!==''">
       <div class="tophead">
         <div>
           <span>学期：</span>
           <div>{{allData.year}}年{{allData.semester}}</div>
         </div>
         <div>
           <span>周数：</span>
           <div>第{{allData.week}}周</div>
         </div>
         <div>
           <span>标题：</span>
           <div>{{allData.title}}</div>
         </div>
         <div>
           <span>创建人：</span>
           <div>{{allData.nickname}}</div>
         </div>
         <div>
           <span>创建时间：</span>
           <div>{{allData.create_time}}</div>
         </div>
       </div>
       <div class="files">
         <p>文件：</p>
         <img v-lazy="item" v-for="(item,index) in allData.image" :key="index" @click="openImg(item)"/>
         <div>
           <span>教委反馈内容：</span>
           <div>{{allData.feedback}}</div>
         </div>
       </div>
     </div>
     <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
       <img alt="example" style="width: 100%" :src="previewImage" />
     </a-modal>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        allData:"",
        previewVisible: false,
        previewImage:''
      }
    },
    components:{
      goback
    },
    created(){
      this.getDetails(this.$route.query.id)
    },
    methods:{
      handleCancel(){
         this.previewVisible = false;
      },
      openImg(url){       //打开图片
        if(url==""){
          return false;
        }
       this.previewImage = url;
       this.previewVisible = true;
      },
      getDetails(id){       //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.InfoInformationDetail({id}).then((res)=>{
            this.$store.commit("sch_setLoaing",false)
            if(res.code==1){
              this.allData = res.data
            }
        })
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/lookDetails.scss';
</style>
