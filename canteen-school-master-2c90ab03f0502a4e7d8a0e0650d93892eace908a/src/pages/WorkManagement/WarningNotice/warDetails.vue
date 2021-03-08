<template>
  <div>
     <goback title="查看详情"/>
     <div v-if="allData!==''">
       <!--食品保证期-->
       <div class="padd" v-if="type==2">
         <div class="products">
           <div class="pro_top">
             <span>订单号：{{allData.order.order_sn}}</span>
           </div>
           <div class="pro_conts">
             <img v-lazy="allData.order.image" @click="openImg(allData.order.image)"/>
             <div>
               <span>{{allData.order.product_name}}</span>
               <span>￥{{allData.order.unit_price}}/{{allData.order.unit}}</span>
               <span>{{allData.order.now_count}}{{allData.order.unit}}</span>
             </div>
           </div>
           <div class="pro_price">
             <span>总价:</span>
             <div>
               <span>￥</span>
               <div>{{allData.order.total_price}}</div>
             </div>
           </div>
         </div>
         <div class="bot_alls">
           <div class="conts">
             <div>入库时间：{{allData.order.warehousing_time}}</div>
             <div>保  质  期：{{allData.order.expiration_time1}}天</div>
             <div>有效截止日期：{{allData.order.expiration_time}}</div>
           </div>
         </div>
       </div>
       <!--健康证-->
       <div class="padd" v-if="type==8">
         <div class="products">
           <div class="pro_top">
             <span>{{allData.order.canteen_name}}</span>
             <span>{{allData.order.position}}</span>
           </div>
           <div class="pro_conts">
             <img v-lazy="allData.order.picture" @click="openImg(allData.order.picture)"/>
             <div>
               <span>{{allData.order.name}}</span>
               <span>{{allData.order.mobile}}</span>
             </div>
           </div>
         </div>
         <div class="bot_alls">
           <div class="conts">
             <div>健康证发证单位：{{allData.order.health_certificate_unit}}</div>
             <div>健康证到期日期：{{allData.order.health_certificate_time}}</div>
           </div>
          <div class="cards" @click="openImg(allData.order.health_certificate_image)">
             <img v-lazy="allData.order.health_certificate_image" />
           </div>
         </div>
       </div>
       <!--学校证件-->
       <div class="padd" v-if="type==7">
         <div class="products">
           <div class="pro_top">
             <span>食品经营许可证</span>
           </div>
           <div class="pro_conts">
             <img v-lazy="allData.order.license_certificate" @click="openImg(allData.order.license_certificate)"/>
             <div>
               <span>{{allData.order.school_name}}</span>
             </div>
           </div>
         </div>
         <div class="bot_alls">
           <div class="conts">
             <div>许可证编号：{{allData.order.license_number}}</div>
             <div>许可项目：{{allData.order.license_projects}}</div>
             <div>有效期起止日期：{{allData.order.start_time}}~{{allData.order.end_time}}</div>
           </div>
         </div>
       </div>
       <!--超支比例预警-->
       <div class="padd" v-if="type==9">
         <div class="products">
           <div class="pro_top">
             <span>超支比例预警（{{allData.order.month}}月）</span>
           </div>
           <div class="newsCont">
              <div>月伙食费总收入(计划数)总金额：{{allData.order.expenditure_total_money}}元</div>
              <div>当月食材支出（出库）金额：{{allData.order.expenditure_month_money}}元</div>
              <div>当月食材支出（出库）百分比：{{allData.order.expenditure_month_percentage}}</div>
              <p></p>
              <div>当月食材超支（出库）金额：{{allData.order.Overspending_month_money}}元</div>
              <div>当月食材超支（出库）百分比：{{allData.order.Overspending_month_percentage}}</div>
           </div>
         </div>
       </div>
       <!--入库出库-->
       <div class="padd" v-if="type==3||type==4">
         <div class="products">
           <div class="pro_top">
             <span>订单号：{{allData.order.order_sn}}</span>
           </div>
           <div class="pro_conts" v-for="(it,ix) in allData.order.product_list" :key="ix">
             <img v-lazy="it.image" @click="openImg(it.image)"/>
             <div>
               <span>{{it.product_name}}</span>
               <span>￥{{it.unit_price}}/{{it.unit}}</span>
               <span>{{it.now_count}}{{it.unit}}</span>
             </div>
           </div>
            <div class="pro_price">
              <span>总价:</span>
              <div>
                <span>￥</span>
                <div>{{allData.order.total_price}}</div>
              </div>
            </div>
         </div>
         <div class="bot_alls">
           <div class="conts" v-if="type==3">
             <div>下单时间：{{allData.order.order_time}}</div>
             <div>供应商确认配送时间：{{allData.order.create_time}}</div>
           </div>
           <div class="conts" v-else>
             <div>入库时间：{{allData.order.warehousing_time}}</div>
           </div>
         </div>
       </div>
       <a-button type="primary" class='btns' @click="goCheck" v-if="allData.warning.status==1">去处理</a-button>
     </div>
     <a-modal
       v-model="modelShow"
       title="确认处理"
       centered
       @ok="subOvers"
     >
      <a-textarea placeholder="填写处理方式说明" :rows="5" class="textArea" v-model="postData.handle"/>
     </a-modal>
     <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
       <img alt="example" style="width: 100%" :src="previewImage" />
     </a-modal>
  </div>
</template>

<script>
  import goback from "../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        modelShow:false,
        allData:"",
        type:"",
        previewVisible: false,
        previewImage:'',
        postData:{
          id:"",
          handle:""
        }
      }
    },
    components:{
      goback
    },
    created(){
       this.postData.id = this.$route.query.id;
       this.getDetails(this.$route.query.id)
    },
    methods:{
      subOvers(){             //确认处理
        if(this.postData.handle==""){
          return this.$message.error('请填写说明');
        }
        this.modelShow = false;
        this.$store.commit("sch_setLoaing",true);
        this.$http.WarningHandle(this.postData).then((res)=>{
          this.$store.commit("sch_setLoaing",false);
          if(res.code==1){
            this.$router.go(-1);
          }
        })
      },
      handleCancel(){
         this.previewVisible = false;
      },
      openImg(url){       //打开图片
        if(url==""){
          return false;
        }
       this.previewImage = url;
       this.previewVisible = true;
      },
      goCheck(){
        this.modelShow = true;
      },
      getDetails(id){      //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.WarningDetails({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            console.log(res)
            this.allData = res.data;
            this.type = res.data.warning.type;
          }
        })
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../assets/css/WorkManagement/WarningNotice/Untreated.scss';
</style>
