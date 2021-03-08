<template>
  <div class="boxs">
    <div class="disWeek">
        <div class="title">合同到期时间节点：</div>
        <a-select
          v-model="dataId"
          default-value
          style="width: 120px"
          @change="getWeekData"
        >
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item,index) in timeList"
            :key="index"
            :value="item.id"
          >{{item.create_time_text}}</a-select-option>
        </a-select>
      </div>
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
             <p><span class="danshen">{{it.name}}</span></p>
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
        <div class="contents" @click.stop>
          <span>合作期限至：</span>
          <div class="tims">{{it.end_time}}</div>
          <!-- <div class="jiechu" v-if="it.status==0" @click="openOver(it,ix)">解除合作</div>
          <div class="over" v-if="it.status==1">即将过期</div>
          <div class="redAl" v-if="it.status==2">已过期</div>
          <a-switch checked-children="启动" unCheckedChildren="禁用" v-model="it.state==0?true:false" @change="switchChan(it)" class="witchs"/> -->
        </div>
      </div>
    </div>
    <emptys titles="暂无供应商" v-else/>
    <a-modal
      v-model="overCon"
      title="提示"
      centered
      cancelText="取消"
      okText="确认"
      @ok="subOver"
    >
      <p>提前解除合作，该供应商提供的采购类目，您将无法在系统中采购，已下单商品不受影响。请谨慎操作！</p>
    </a-modal>
  </div>
</template>

<script>
  import emptys from "../../components/EmptyNum/index.vue"
  export default{
    data(){
       return{
         list:[],
         overCon:false,
         deleObj:{
           id:"",
           index:""
         },
         dataId:'',
         timeList:[]
       }
    },
    created(){
      this.getTimeList();
      this.getList();
    },
    components:{
      emptys
    },
    methods:{
      subOver(){       //确认解除
        this.$http.SupplierCancellationCooperation(this.deleObj).then((res)=>{
          if(res.code==1){
            this.list.splice(this.deleObj.index,1)
          }
        })
        this.overCon = false
      },
      getTimeList(){
         this.$http.GetTimeList({}).then((res)=>{
          if(res.code==1){
            this.timeList = res.data;
          }
        })
      },
      getWeekData(){
        console.log(this.dataId);
        this.getList();
      },
      openOver(item,ix){             //打开解除合作弹窗
          this.deleObj.id = item.id
          this.deleObj.index = ix
         this.overCon = true
      },
      goDetails(item){      //详情
        this.$router.push({path:"/ManagementPanel/SupplierDetails",query:{type:1,id:item.id,show:1}})
      },
      getList(){          //获取列表
        this.$store.commit("sch_setLoaing",true)
        this.$http.PastSupplierLists({disassociate_id:this.dataId}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.list = res.data
          }
        })
      },
      switchChan(item){            //启动禁用
        var state = item.state==0?1:0;
        this.$http.SupplierState({state,id:item.id}).then((res)=>{
           if(res.code==1){
             item.state = state
           }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/SupplierManagement/PartnerSuppliers.scss';
.disWeek{
  margin-bottom: 20px;
}
</style>
