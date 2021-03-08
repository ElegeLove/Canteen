<template>
  <div>
     <goback title="返回"/>
     <div class="boxs">
       <div v-for="(item,index) in allData" :key="index">
           <div class="titles">
             <span>{{item.product_name}}</span>
             <div></div>
           </div>
           <div class="contLine">
             <div>单位名称：{{item.name}}</div>
             <div>履约保证金：{{item.bond}}元</div>
           </div>
       </div>
        <emptys titles="暂无定点供应商" v-if="allData.length==0"/>
     </div>
  </div>
</template>

<script>
  import goback from "../../../components/goBack/index.vue"
  import emptys from "../../../components/EmptyNum/index.vue"
  export default{
    data(){
      return{
        allData:[]
      }
    },
    components:{
      goback,emptys
    },
    created(){
      this.getDetails()
    },
    methods:{
      getDetails(){       //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.InfoSupplierinfo().then((res)=>{
          console.log(res)
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
  @import '../../../assets/css/WorkManagement/InformationReporting/DesignatedSupplier.scss';
</style>
