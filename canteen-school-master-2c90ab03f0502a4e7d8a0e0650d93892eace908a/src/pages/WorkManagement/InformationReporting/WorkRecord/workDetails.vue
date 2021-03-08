<template>
  <div>
     <goback title="查看"/>
     <div class="boxs">
       <div class="tophead">
         <div>
           <span>年份：</span>
           <div>{{allData.year}}年</div>
         </div>
         <div>
           <span>月份：</span>
           <div>{{allData.month}}月</div>
         </div>
         <div>
           <span>记录类型：</span>
           <div>{{allData.type}}</div>
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
         <img v-lazy="item" v-for="(item,index) in allData.content" :key="index" @click="openImg(item)"/>
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
        this.$http.InfoRecordDetail({id}).then((res)=>{
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
