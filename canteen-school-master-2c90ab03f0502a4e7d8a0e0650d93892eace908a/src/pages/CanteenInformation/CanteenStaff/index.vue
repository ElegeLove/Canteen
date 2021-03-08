<template>
  <div>
    <div class="heads">
       <a-button type="primary" @click="adds">添加食堂及证书</a-button>
    </div>
    <div class="boxs">
      <a-row v-if="allData.length!==0">
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="lists"
         v-for="(item,index) in allData"
         :key="index"
         @click.stop="goDetails(item)">
          <div class="tops">
             <span class="danshen">{{item.name}}</span>
             <div>
                <img src="../../../assets/image/edits.png" @click.stop="updates(item)"/>
                <img src="../../../assets/image/dele.png" @click.stop="openDeta(item,index)"/>
             </div>
          </div>
          <div class="contBox">
             <div class="lef">
               <div>
                 <span>负责人：</span>
                 <div>{{item.person_charge}}</div>
               </div>
               <div>
                 <span>联系方式：</span>
                 <div>{{item.person_charge_mobile}}</div>
               </div>
               <div>
                 <span>员工人数：</span>
                 <div>{{item.faculty_total}}人</div>
               </div>
               <div>
                 <span>供水方式：</span>
                 <div>{{item.water_supply_mode_text}}</div>
               </div>
             </div>
             <div class="rig">
                <img v-lazy="item.license_certificate" />
             </div>
          </div>
          <div class="fot">
            <span>食品经营许可证到期日期：{{item.end_time_text}}</span>
            <div :class="{'txtColor':item.status==1,'reds':item.status==2}">{{item.status==1?'即将过期':item.status==2?'已过期':''}}</div>
          </div>
        </a-col>
       </a-row>
       <emptys titles="暂无食堂" v-else/>
    </div>
     <a-modal
        v-model="deleShow"
        title="删除确认"
        centered
        cancelText="取消"
        okText="确认"
        @ok="okDelets"
      >
        <div class="deleTxt">删除后所有所有关联信息将被清空，是否继续？</div>
      </a-modal>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import emptys from "../../../components/EmptyNum/index.vue"
  export default{
    data(){
      return{
        deleShow:false,
        allData:[],
        deleData:{
          id:"",
          index:""
        }
      }
    },
    created(){
      this.getDatas()
    },
    components:{
      emptys
    },
    methods:{
      ...mapMutations(['setAddCanteen']),
      adds(){
        this.setAddCanteen({})
        this.$router.push({path:'/ManagementPanel/AddCanteen'})
      },
      updates(item){          //编辑
        this.$router.push({path:'/ManagementPanel/AddCanteen',query:{id:item.id}})
      },
      goDetails(item){       //详情
        this.$router.push({path:"/ManagementPanel/StaffDetails",query:{id:item.id}})
      },
      getDatas(){            //获取列表
        this.$store.commit("sch_setLoaing",true)
        this.$http.CanteenLists().then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data
          }
        })
      },
      openDeta(item,index){        //打开删除弹窗
        this.deleData.id = item.id
        this.deleData.index = index
        this.deleShow = true
      },
      okDelets(){             //确认删除
        this.$http.CanteenDeleteCanteen(this.deleData).then((res)=>{
          if(res.code==1){
            this.allData.splice(this.deleData.index,1)
            this.deleShow = false
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/CanteenInformation/CanteenStaff/index.scss';
</style>
