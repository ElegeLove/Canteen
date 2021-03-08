<template>
  <div>
    <backs title="查看详情"/>
    <div class="boxss">
       <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="modulesBox">
            <div>
              <div class="txtBox">
                <span>用户名（登录账号）：</span>
                <div>{{allData.username}}</div>
              </div>
              <div class="txtBox">
                <span>职位权限：</span>
                <div>{{allData.role_name}}</div>
              </div>
              <div class="txtBox">
                <span>手机号码：</span>
                <div>{{allData.mobile}}</div>
              </div>
              <div class="txtBox">
                <span>登录密码：</span>
                <div>*****</div>
              </div>
              <div class="txtBox">
                <span>用户状态：</span>
                <div>{{allData.status==0?'禁用':'启用'}}</div>
              </div>
            </div>
         </a-col>
       </a-row>
    </div>
  </div>
</template>

<script>
  import backs from "../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        allData:{}
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
        this.$http.RoleUserDetails({id}).then((res)=>{
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
@import '../../../assets/css/ConfigurationManagement/UserManagement/lookDetails.scss';
</style>
