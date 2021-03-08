<template>
  <div>
    <a-page-header style="border-bottom: 1px solid rgb(235, 237, 240)" title="查看详情" @back="() => this.$router.back()" />
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
  export default{
    data(){
      return{
        allData:""
      }
    },
    created(){
       this.getDetails(this.$route.query.id)
    },
    methods:{
      getDetails(id){ 
        this.$http.RoleDetails({id}).then((res)=>{ 
          if(res.code==1){
            this.allData = res.data
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '@/assets/css/ConfigurationManagement/AuthorityManagement/AuthDetails.scss';
</style>
