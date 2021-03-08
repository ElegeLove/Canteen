<template>
  <div>
    <backs title="查看详情"/>
    <div v-if="allData!==''">
    <div class="boxs">
      <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="txtBox">
            <span>供应商全称：</span>
            <div>{{allData.supplier.name}}</div>
          </div>
          <div class="txtBox">
            <span>供应商简称：</span>
            <div>{{allData.supplier.abbreviation}}</div>
          </div>
          <div class="txtBox">
            <span>企业类型：</span>
            <div>{{allData.supplier.nature}}</div>
          </div>
          <div class="txtBox">
            <span>供应商代码：</span>
            <div>{{allData.supplier.code}}</div>
          </div>
          <div class="txtBox">
            <span>供应类目：</span>
            <div>{{allData.info.product}}</div>
          </div>
          <div class="txtBox">
            <span>联系人：</span>
            <div>{{allData.supplier.contacts}}</div>
          </div>
          <div class="txtBox">
            <span>联系电话：</span>
            <div>{{allData.supplier.contacts_mobile}}</div>
          </div>
          <div class="txtBox">
            <span>办公地址：</span>
            <div>{{allData.supplier.office_address}}</div>
          </div>
          <div class="txtBox noMar">
            <span>仓库地址：</span>
            <div>{{allData.supplier.warehouse_address}}</div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="colBox">
          <p>LOGO</p>
          <div class="imgBox">
            <img v-lazy="allData.supplier.logo" @click="openImg(allData.supplier.logo)"/>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="boxs">
      <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="txtBox">
            <span>法&emsp;&emsp;人：</span>
            <div>{{allData.supplier.legal_person}}</div>
          </div>
          <div class="txtBox">
            <span>联系电话：</span>
            <div>{{allData.supplier.legal_person_mobile}}</div>
          </div>
          <div class="txtBox noMar">
            <span>身份证号码：</span>
            <div>{{allData.supplier.id_card}}</div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="colBox">
          <p>身份证正反面图片</p>
          <div class="cardImg">
            <div>
              <img v-lazy="allData.supplier.front" @click="openImg(allData.supplier.front)"/>
            </div>
            <div>
              <img v-lazy="allData.supplier.behind" @click="openImg(allData.supplier.behind)"/>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="boxs">
      <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <p class="alltitle">统一社会信用代码</p>
          <div class="txtBox noMar">
            <div>{{allData.supplier.credit_code}}</div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="colBox">
          <p>营业执照</p>
          <div class="imgBox news">
            <img v-lazy="allData.supplier.business_license" @click="openImg(allData.supplier.business_license)"/>
          </div>
        </a-col>
      </a-row>
     </div>
      <div class="boxs">
        <a-row>
          <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <p class="alltitle">食品经营许可证</p>
            <div class="txtBox noMar">
              <span>有效期至：</span>
              <div>{{allData.supplier.fbl_end_time}}</div>
            </div>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="colBox">
            <p>食品经营许可证图片</p>
            <div class="imgBox news">
              <img v-lazy="allData.supplier.food_business_license" @click="openImg(allData.supplier.food_business_license)"/>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="boxs">
        <a-row>
          <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <p class="alltitle">合同</p>
            <div class="txtBox">
              <span>合作期限：</span>
              <div>{{allData.info.start_time}}  至  {{allData.info.end_time}}</div>
            </div>
            <div class="txtBox noMar">
              <span>履约保证金(元)：</span>
              <div>¥{{allData.info.bond}}</div>
            </div>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="colBox allImgs">
            <div>
              <p>合同扫描件</p>
              <div class="flexCen">
                <div class="imgBox" v-for="(it,ix) in allData.info.contract" :key="ix">
                  <img v-lazy="it" @click="openImg(it)"/>
                </div>
              </div>
            </div>
            <div>
              <p>保证金缴纳凭证</p>
              <div class="flexCen">
                <div class="imgBox" v-for="(item, index) in allData.info.bond_voucher" :key="index">
                   <img v-lazy="item" @click="openImg(item)"/>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="boxs">
        <a-row>
          <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <p class="alltitle">保险</p>
            <div class="txtBox">
              <span>保险公司：</span>
              <div>{{allData.supplier.insurance_company}}</div>
            </div>
            <div class="txtBox">
              <span>购买保险保额（元）：</span>
              <div>¥{{allData.supplier.insurance_amount}}</div>
            </div>
            <div class="btnBox" v-if="allData.info.school_status==0 && isShow != 1">
              <a-button @click="setStatus(2)">拒绝</a-button>
              <a-button type="primary"  @click="setStatus(1)">通过</a-button>
            </div>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="colBox">
            <div>
              <p>保单</p>
              <div class="flexCen">
                <div class="imgBox" v-for="(it,ix) in allData.supplier.insurance_image" :key="ix">
                   <img v-lazy="it" @click="openImg(it)"/>
                </div>
              </div>
              <div class="filesd">
                <div v-for="(it,ix) in allData.supplier.insurance_file" :key="ix" class="filesArr main_color" @click="openFile(it)">查看文件{{ix+1}}</div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
      <a-modal
        v-model="refuse"
        title="拒绝原因"
        centered
        @ok="subRefuse"
      >
       <a-textarea placeholder="填写拒绝理由" :rows="4" class="text_areas" v-model="refuseData.reasons_refusal"/>
      </a-modal>
     </div>
  </div>
</template>

<script>
  import backs from "../../components/goBack/index.vue"
  export default{
    data(){
      return{
        type:"",
        allData:"",
        previewVisible: false,
        previewImage:'',
        refuse:false,
        refuseData:{
          id:"",
          status:"",
          reasons_refusal:""
        },
        isShow:''
      }
    },
    created(){
       this.type = this.$route.query.type
       this.refuseData.id = this.$route.query.id
       this.isShow = this.$route.query.show
       if(this.isShow == 1){
        this.getDetailShow(this.$route.query.id)
       }else{
         this.getDetails(this.$route.query.id)
       }
    },
    components:{
      backs
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
      getDetails(id){
        this.$store.commit("sch_setLoaing",true)
        this.$http.SupplierInfo({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data;
            var fileArr = res.data.supplier.insurance_image;
            var imgArr = [];
            var files = [];
            fileArr.forEach((item)=>{
              var types = this.getType(item)
              if(types==".pdf"){
                files.push(item)
              }else{
                imgArr.push(item)
              }
            })
            this.allData.supplier.insurance_image = imgArr;
            this.allData.supplier.insurance_file = files;
          }
        })
      },
      getDetailShow(id){
        this.$store.commit("sch_setLoaing",true)
        this.$http.PastSupplierInfo({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data;
            var fileArr = res.data.supplier.insurance_image;
            var imgArr = [];
            var files = [];
            fileArr.forEach((item)=>{
              var types = this.getType(item)
              if(types==".pdf"){
                files.push(item)
              }else{
                imgArr.push(item)
              }
            })
            this.allData.supplier.insurance_image = imgArr;
            this.allData.supplier.insurance_file = files;
          }
        })
      },
      getType(file){          //截取后缀
          var filename=file;
          var index1=filename.lastIndexOf(".");
          var index2=filename.length;
          var type=filename.substring(index1,index2);
          return type;
      },
      subRefuse(){         //确认拒绝
        if(this.refuseData.reasons_refusal==""){
          return this.$message.error('请输入拒绝理由');
        }
        this.subRquest()
      },
      setStatus(status){             //待审核---通过拒绝
       this.refuseData.status = status
        if(status==2){
          this.refuse = true
        }else{
           this.subRquest()
        }
      },
      subRquest(){              //拒绝通过请求
        this.$http.SupplierSchoolStatus(this.refuseData).then((res)=>{
          if(res.code==1){
            this.getDetails(this.$route.query.id)
            this.refuse = false
          }
        })
      },
      openFile(url){        //打开文件
        window.open(url)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/SupplierManagement/SupplierDetails.scss';
</style>
