<template>
  <div>
     <goback title="查看"/>
     <div class="boxs" v-if="allData!==''">
        <div class="titlesd">
          <div>
            <span>培训主题：</span>
            <div>{{allData.title}}</div>
          </div>
          <div>
            <span>创建时间：</span>
            <div>{{allData.create_time}}</div>
          </div>
        </div>
        <div class="contents">
          <p>培训内容：</p>
          <div v-html="allData.content" class="conts">

          </div>
          <div class="ateachMents">
            <p>文件：</p>
            <div class="main_color" v-for="(item,index) in allData.file" @click="downLoad(item)">{{item.name}}</div>
          </div>
        </div>
     </div>
  </div>
</template>

<script>
  import goback from "../../../components/goBack/index.vue"
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
        this.$http.BusinessBusinessDetail({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data;
            var arr = [];
            this.allData.file.forEach((item)=>{
               var types = this.$commonJs.getType(item);
               arr.push({name:decodeURI(types),url:item})
            })
            this.allData.file = arr;
          }
        })
      },
      downLoad(item){       //下载
        window.open(item.url)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/WorkManagement/BusinessTraining/busineDetails.scss';
</style>
