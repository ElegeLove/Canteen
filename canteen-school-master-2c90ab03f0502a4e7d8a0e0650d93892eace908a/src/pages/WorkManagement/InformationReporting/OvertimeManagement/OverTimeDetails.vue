<template>
  <div>
    <goback title="返回"/>
    <div class="padBox" v-if="allData!==''">
     <!-- <div class="top_box">
        <div>
          <span>学期：{{allData.year}}年{{allData.semester}}季</span>
        </div>
      </div> -->
       <div>
          <div class="allRow">
            <div>
              <div class="divRow">
                <p>学期：{{allData.year}}年{{allData.semester}}</p>
              </div>
               <div class="divRow">
                 <p>经营模式：{{typeArr[allData.sell_model]}}</p>
               </div>
               <div class="divRow">
                 <p>租赁/承包起止日期：{{allData.start_time}}~{{allData.end_time}}</p>
               </div>
               <div class="divRow">
                 <p>年租金/上年度利润：{{allData.money}}元</p>
               </div>
               <div class="divRow">
                 <p>经营主体名称：{{allData.name}}</p>
               </div>
               <div class="divRow">
                 <p>信用代码：{{allData.code}}</p>
               </div>
            </div>
            <div class="uploads">
               <div>营业执照</div>
               <div class="rigs">
                 <div @click="openImg(allData.license)">
                   <img v-lazy="allData.license" />
                 </div>
               </div>
            </div>
          </div>
       </div>
       <div>
          <div class="titles">
            <span>食品经营许可证</span>
            <div></div>
          </div>
          <div class="allRow">
            <div>
               <div class="divRow">
                 <p>到期日期：{{allData.card_end_time}}</p>
               </div>
               <div class="divRow">
                 <p>许可证编号：{{allData.card_number}}</p>
               </div>
            </div>
            <div class="uploads">
               <div>证件图片</div>
               <div class="rigs">
                 <div @click="openImg(allData.card_img)">
                   <img v-lazy="allData.card_img" />
                 </div>
               </div>
            </div>
          </div>
       </div>
       <div>
          <div class="titles">
            <span>法定代表人信息</span>
            <div></div>
          </div>
          <div class="allRow">
            <div>
               <div class="divRow">
                 <p>姓名：{{allData.person_name}}</p>
               </div>
               <div class="divRow">
                 <p>身份证号：{{allData.person_id_card}}</p>
               </div>
               <div class="divRow">
                 <p>手机号：{{allData.person_phone}}</p>
               </div>
               <div class="divRow">
                 <p>家庭地址：{{allData.address}}</p>
               </div>
            </div>
            <div class="uploads">
               <div>身份证正反面</div>
               <div class="cardBox">
                  <div class="rigs newIm">
                    <div @click="openImg(allData.id_card_front)">
                      <img v-lazy="allData.id_card_front" />
                    </div>
                  </div>
                   <div class="rigs newIm">
                     <div @click="openImg(allData.id_card_back)">
                       <img v-lazy="allData.id_card_back" />
                     </div>
                   </div>
               </div>
            </div>
          </div>
       </div>
       <div>
          <div class="titles">
            <span>合同扫描件</span>
            <div></div>
          </div>
          <div class="uploads">
             <div>合同扫描件</div>
             <div class="rigs newsArrs">
               <div v-for="(item,index) in allData.contract" :key="index"  @click="openImg(item)">
                 <img v-lazy="item" />
               </div>
             </div>
          </div>
       </div>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
  import moment from "moment";
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        allData:"",
        typeArr:{
          1:"自管",
          2:"承包",
          3:"租赁"
        },
        previewVisible: false,
        previewImage:''
      }
    },
    components:{
      goback
    },
    created(){
      this.getDetails(this.$route.query.calendar_id)
    },
    methods:{
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
      getDetails(calendar_id){      //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.InfoSupermarketInfo({calendar_id}).then((res)=>{
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
  @import '../../../../assets/css/WorkManagement/InformationReporting/OvertimeManagement/details.scss';
</style>
