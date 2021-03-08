<template>
  <div>
    <div class="lookGos" @click="gobacks">
      <div>
        <a-icon type="left" />
        <span>查看</span>
      </div>
      <div>学校：{{infoData.school}}</div>
      <div>学期：{{infoData.year}}</div>
    </div>
    <div class="listBox" v-if="lists.length!==0">
      <div v-for="(it,ix) in lists" :key="ix">
         <img v-lazy="it.image" v-if="types==1"/>
         <div class="contBoxs">
           <p>岗位：{{it.position}}</p>
           <p>姓名：{{it.name}}</p>
           <p>电话：{{it.phone}}</p>
         </div>
      </div>
    </div>
    <emptynums titles="暂无数据" v-else/>
  </div>
</template>

<script>
  import emptynums from "../../../../components/EmptyNum/index.vue"
  export default{
    props:["types"],
    data(){
      return{
        lists:[],
        infoData:""
      }
    },
    components:{
      emptynums
    },
    mounted(){
       this.getList(this.types)
       var infoData = JSON.parse(localStorage.getItem("infoScolls"))
       this.infoData = infoData
    },
    methods:{
      getList(type){           //获取列表
        this.$store.commit("sch_setLoaing",true)
        var objs = {
          type,
          calendar_id:this.$route.query.calendar_id,
          school_id:this.$route.query.school_id
        }
        this.$http.InfoCanteenGroupDetail(objs).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.lists = res.data
          }
        })
      },
      gobacks(){           //返回
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/CanteenOrganization/CanteenManagement.scss';
</style>
