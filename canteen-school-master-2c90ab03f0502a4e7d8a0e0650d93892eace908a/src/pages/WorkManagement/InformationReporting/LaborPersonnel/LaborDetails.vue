<template>
  <div>
    <goback title="返回"/>
    <div class="padBox" v-if="allData!==''">
      <div class="top_box">
        <div>
          <span>学期：{{year}}</span>
        </div>
      </div>
      <div class="titBoxs">
         <div class="iptBox rigMa">
           <div>
             <p>劳务总人数：{{allData.labour_total_count}}人</p>
           </div>
           <div>
             <p>劳务方式：{{typeObj[allData.labour_type]}}</p>
           </div>
         </div>
         <div class="lookStu">
           <p @click="lookPers">查看员工情况</p>
           <div>提示：若数据与实际人数不符，请查看用工情况修正</div>
         </div>
      </div>
      <div>
        <div class="titles">
          <span>上年度劳务支出</span>
          <div></div>
        </div>
        <div class="iptBox">
          <div>
            <p>年度总额：{{allData.last_year_total_money}}元</p>
          </div>
          <div class="margns">
            <p>人均年工资：{{allData.last_year_wages}}元</p>
          </div>
          <div class="margns">
            <p>人均年社保：{{allData.last_year_social}}元</p>
          </div>
        </div>
      </div>
      <div>
         <div class="titles">
           <span>劳务服务商</span>
           <div></div>
         </div>
         <div class="allRow">
           <div>
              <div class="divRow">
                <p>名称：{{allData.labour_service}}</p>
              </div>
              <div class="divRow">
                <p>信用代码编号：{{allData.labour_credit_code}}</p>
              </div>
              <div class="divRow">
                <p>许可证编号：{{allData.labour_licence}}</p>
              </div>
           </div>
           <div class="uploads">
              <div>信用代码图片</div>
              <div class="rigs newIm">
                <div @click="openImg(allData.labour_credit_code_image)">
                  <img v-lazy="allData.labour_credit_code_image" />
                </div>
              </div>
           </div>
           <div class="uploads">
              <div>许可证图片</div>
              <div class="rigs newIm">
                <div @click="openImg(allData.labour_licence_image)">
                  <img v-lazy="allData.labour_licence_image" />
                </div>
              </div>
           </div>
         </div>
      </div>
      <div>
         <div class="titles">
           <span>服务商法定代表人信息</span>
           <div></div>
         </div>
         <div class="allRow">
           <div>
              <div class="divRow">
                <p>姓名：{{allData.legal_person}}</p>
              </div>
              <div class="divRow">
                <p>身份证号：{{allData.legal_person_id_card}}</p>
              </div>
              <div class="divRow">
                <p>手机号：{{allData.legal_person_phone}}</p>
              </div>
              <div class="divRow">
                <p>家庭地址：{{allData.legal_person_address}}</p>
              </div>
           </div>
           <div class="uploads">
              <div>身份证正面</div>
              <div class="rigs newIm">
                <div @click="openImg(allData.id_card_front)">
                  <img v-lazy="allData.id_card_front"/>
                </div>
              </div>
           </div>
           <div class="uploads">
              <div>身份证反面</div>
              <div class="rigs newIm">
                <div @click="openImg(allData.id_card_back)">
                  <img v-lazy="allData.id_card_back" />
                </div>
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
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        postData:{
          school_id:"",
          calendar_id:""
        },
        year:"",
        allData:"",
        typeObj:{
          1:"自管",
          2:"派遣",
          3:"承包"
        },
        previewVisible: false,
        previewImage:''
      }
    },
    components:{
      goback
    },
    created(){
      var {
        years,
        calendar_id,
        school_id
      } = JSON.parse(localStorage.getItem("localInfo"));
      this.year = years;
      this.postData.calendar_id = calendar_id;
      this.postData.school_id = school_id;
      this.getDetails()
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
      getDetails(){      //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.InfoLabourInfo(this.postData).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            console.log(res)
            this.allData = res.data
          }
        })
      },
      lookPers(){        //查看员工情况
         this.$router.push({path:"/ManagementPanel/LicenseManagement/JobEmployees"})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/LaborPersonnel/details.scss';
</style>
