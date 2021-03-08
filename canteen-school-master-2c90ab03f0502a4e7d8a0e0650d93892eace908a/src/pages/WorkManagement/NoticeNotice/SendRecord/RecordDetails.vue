<template>
  <div>
    <goback title="查看详情"/>
    <div class="padd" v-if="allData!==''">
      <div class="contTit">
        <p>{{allData.title}}</p>
        <div v-if="allData.send_type==2">接收对象：{{allData.supplier}}</div>
        <div v-if="allData.send_type==1">发件人：{{allData.nickname}}</div>
        <div>{{allData.send_type==1?'发送时间':'时间'}}：{{allData.send_time}}</div>
        <div class="atachs">
          <span>附件：</span>
          <div>
            <div v-for="(item,index) in allData.file" :key="index">
               <p>{{item.name}}</p>
               <a-button type="primary" ghost @click="downLoad(item)">下载</a-button>
            </div>
          </div>
        </div>
      </div>
      <div class="richTxt" v-html="allData.content">

      </div>
    </div>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        allData:""
      }
    },
    components:{
      goback
    },
    created(){
       this.getDetails(this.$route.query.id)
    },
    methods:{
      getDetails(id){      //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.NoticeDetails({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data;
            var fileNews = [];
            this.allData.file.forEach((file)=>{
              fileNews.push({url:file,name:decodeURI(this.$commonJs.getType(file))})
            })
            this.allData.file = fileNews;
          }
        })
      },
      downLoad(item){              //下载
        window.open(item.url)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../../assets/css/WorkManagement/NoticeNotice/SendRecord/RecordDetails.scss';
</style>
