<template>
  <div>
     <backs title="查看详情"/>
     <div class="boxss" v-if="allData!==''">
        <div>
          <div class="txtBox">
            <span>职位名称：</span>
            <div>{{allData.name}}</div>
          </div>
          <div class="txtBox">
            <span>职位描述：</span>
            <div>{{allData.description}}</div>
          </div>
          <div class="txtBox">
            <span>权限板块：</span>
            <div>{{allData.menu_name}}</div>
          </div>
        </div>
     </div>
  </div>
</template>

<script>
  import backs from "../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        allData:""
      }
    },
    components:{
      backs
    },
    created(){
       this.getDetails(this.$route.query.id)
    },
    methods:{
      getDetails(id){
        this.$store.commit("sch_setLoaing",true)
        this.$http.RoleDetails({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/ConfigurationManagement/AuthorityManagement/AuthDetails.scss';
</style>
