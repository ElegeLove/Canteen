<template>
  <div>
    <backs title="查看详情"/>
    <div class="boxs" v-if="allData!==''">
      <div class="tops">
        <img v-lazy="allData.image" />
        <div>
          <p>{{allData.title}}</p>
          <div>
            <span>商品售价</span>
            <div>
              <div>¥{{allData.unit_meterage}}</div>
              <span>/{{allData.small_unit}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="titles">
         商品介绍
      </div>
      <div class="allCont">
        <a-row class="conBoxs" v-if="allData.type==0">
          <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="contBox">
            <span>产地品牌生厂商：</span>
            <p>{{allData.brand}},{{allData.produce}}</p>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="contBox">
            <span>等级规格：</span>
            <p>{{allData.grade}},{{allData.net_content}}{{allData.unit}}/{{allData.small_unit}}</p>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="contBox">
            <span>生产日期：</span>
            <p>{{allData.production_time}}</p>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="contBox">
            <span>保质期至：</span>
            <p>{{allData.expiration_time}}</p>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="contBox">
            <span>类型：</span>
            <p>{{allData.type==0?'预包装食品':allData.type==1?'农产品':'小作坊食品'}}</p>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="contBox">
            <span>计量单位价：</span>
            <p>￥{{allData.unit_price}}/{{allData.unit}}</p>
          </a-col>
        </a-row>
        <a-row v-if="allData.type==1" class="conBoxs">
          <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="contBox">
            <span>产地：</span>
            <p>{{allData.origin}}</p>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="contBox">
            <span>类型：</span>
            <p>{{allData.type==0?'预包装食品':allData.type==1?'农产品':'小作坊食品'}}</p>
          </a-col>
        </a-row>
        <a-row v-if="allData.type==2" class="conBoxs">
          <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="contBox">
            <span>小作坊名称：</span>
            <p>{{allData.workshop_name}}</p>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="contBox">
            <span>生产日期：</span>
            <p>{{allData.production_time}}</p>
          </a-col>
        </a-row>
      </div>
      <div class="imgBox" v-html="allData.introduce">

      </div>
    </div>
  </div>
</template>

<script>
  import backs from "../../components/goBack/index.vue"
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
        this.$http.SupplierProductInfo({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data
          }
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/SupplierManagement/CommodityDetails.scss';
</style>
