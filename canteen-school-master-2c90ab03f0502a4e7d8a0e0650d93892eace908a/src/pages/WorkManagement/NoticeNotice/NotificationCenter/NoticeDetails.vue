<template>
  <div>
    <goback title="查看详情"/>
    <div class="padd" v-if="allData!==''">
      <div class="contTit">
        <p>{{allData.title}}</p>
        <div>时&emsp;间：{{allData.create_time}}</div>
        <div>类&emsp;型：{{allData.message_type}}</div>
      </div>
      <div class="content" v-html="allData.content">
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
        this.$http.MessageDetails({id}).then((res)=>{
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
@import '../../../../assets/css/WorkManagement/NoticeNotice/NotificationCenter/NoticeDetails.scss';
</style>
