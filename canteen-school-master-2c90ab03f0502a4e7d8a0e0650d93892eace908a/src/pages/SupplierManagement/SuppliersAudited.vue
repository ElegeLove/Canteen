<template>
  <div class="boxs">
    <div v-if="list.length!==0">
      <div class="lists"
       v-for="(it,ix) in list" :key="ix"
       @click.stop="goDetails(it)"
       >
        <div class="tops">
           <div class="lef">
             <img v-lazy="it.logo" />
           </div>
           <div class="rigs">
             <p class="betwwons"><span class="danshen">{{it.name}}</span>
              <span class="noTord" v-if="it.school_status==0">学校未审核</span>
              <span class="noTord" v-else>
                <span  v-if="it.sec_status==0">教委未审核</span>
              </span>
             </p>
             <div>联系方式：{{it.contacts_mobile}}</div>
             <div>法人：{{it.legal_person}}</div>
           </div>
        </div>
        <div class="contents">
          <span>办公地址：</span>
          <div>{{it.office_address}}</div>
        </div>
        <div class="contents">
          <span>供应类目：</span>
          <div>{{it.product}}</div>
        </div>
        <div class="contents betwwons">
          <div class="centers">
            <span>提交时间：</span>
            <div>{{it.create_time_text}}</div>
          </div>
          <div class="looks" @click.stop="goDetails(it)">查看审核</div>
        </div>
      </div>
    </div>
    <emptys titles="暂无供应商" v-else/>
  </div>
</template>

<script>
  import emptys from "../../components/EmptyNum/index.vue"
  export default{
    data(){
       return{
         list:[]
       }
    },
    created(){
      this.getList()
    },
    components:{
      emptys
    },
    methods:{
      goDetails(item){      //详情
        this.$router.push({path:"/ManagementPanel/SupplierDetails",query:{type:2,id:item.id}})
      },
      getList(){          //获取列表
        this.$store.commit("sch_setLoaing",true)
        this.$http.SupplierLists({cooperation:0}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.list = res.data
          }
          console.log(res)
        })
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/SupplierManagement/PartnerSuppliers.scss';
</style>
