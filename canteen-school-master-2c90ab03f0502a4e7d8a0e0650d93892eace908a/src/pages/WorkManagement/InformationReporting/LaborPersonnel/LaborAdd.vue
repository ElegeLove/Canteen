<template>
  <div>
    <goback title="返回"/>
    <a-form-model
       ref="formModel"
       :model="postData"
       :rules="Validata"
    >
    <div class="padBox">
      <div class="top_box">
        <div>
          <span>学期：{{year}}</span>
        </div>
      </div>
      <div class="titBoxs">
         <div class="iptBox rigMa">
           <div>
             <p>劳务总人数：</p>
             <div>
               <div>{{postData.labour_total_count}}人</div>
             </div>
           </div>
           <div>
             <p>劳务方式：</p>
             <div>
               <a-form-model-item ref="labour_type" prop="labour_type">
                  <a-select
                      style="width: 150px"
                      placeholder="请选择"
                      v-model="postData.labour_type"
                    >
                      <a-select-option :value="item.id" v-for="(item,index) in typeData" :key="index">{{item.txt}}</a-select-option>
                  </a-select>
               </a-form-model-item>
             </div>
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
            <p>年度总额：</p>
            <div>
              <a-form-model-item ref="last_year_total_money" prop="last_year_total_money">
                <a-input placeholder="请输入" class="smallIpt"
                type="number"
                v-model="postData.last_year_total_money"/>
              </a-form-model-item>
              <span>元</span>
            </div>
          </div>
          <div class="margns">
            <p>人均年工资：</p>
            <div>
              <a-form-model-item ref="last_year_wages" prop="last_year_wages">
                <a-input placeholder="请输入"
                 type="number"
                 class="smallIpt" v-model="postData.last_year_wages"/>
              </a-form-model-item>
              <span>元</span>
            </div>
          </div>
          <div class="margns">
            <p>人均年社保：</p>
            <div>
              <a-form-model-item ref="last_year_social" prop="last_year_social">
                <a-input placeholder="请输入"
                 type="number"
                 class="smallIpt" v-model="postData.last_year_social"/>
              </a-form-model-item>
              <span>元</span>
            </div>
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
                <p>名称：</p>
                <div>
                  <a-form-model-item ref="labour_service" prop="labour_service">
                    <a-input placeholder="请输入" class="smallIpt" v-model="postData.labour_service"/>
                  </a-form-model-item>
                </div>
              </div>
              <div class="divRow">
                <p>信用代码编号：</p>
                <div>
                  <a-form-model-item ref="labour_credit_code" prop="labour_credit_code">
                    <a-input placeholder="请输入" class="smallIpt" v-model="postData.labour_credit_code"/>
                  </a-form-model-item>
                </div>
              </div>
              <div class="divRow">
                <p>许可证编号：</p>
                <div>
                  <a-form-model-item ref="labour_licence" prop="labour_licence">
                    <a-input placeholder="请输入" class="smallIpt" v-model="postData.labour_licence"/>
                  </a-form-model-item>
                </div>
              </div>
           </div>
           <div class="uploads">
              <div>信用代码图片</div>
              <a-form-model-item ref="labour_credit_code_image" prop="labour_credit_code_image">
                <up-file  @getImg="getImg($event,'labour_credit_code_image')" :max_num="1">
                    <div>
                      <a-icon type="plus" />
                      <div class="ant-upload-text">上传</div>
                    </div>
                 </up-file>
              </a-form-model-item>
           </div>
           <div class="uploads">
              <div>许可证图片</div>
              <a-form-model-item ref="labour_licence_image" prop="labour_licence_image">
                <up-file @getImg="getImg($event,'labour_licence_image')" :max_num="1">
                    <div>
                      <a-icon type="plus" />
                      <div class="ant-upload-text">上传</div>
                    </div>
                 </up-file>
              </a-form-model-item>
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
                <p>姓名：</p>
                <div>
                  <a-form-model-item ref="legal_person" prop="legal_person">
                    <a-input placeholder="请输入" class="smallIpt" v-model="postData.legal_person"/>
                  </a-form-model-item>
                </div>
              </div>
              <div class="divRow">
                <p>身份证号：</p>
                <div>
                  <a-form-model-item ref="legal_person_id_card" prop="legal_person_id_card">
                    <a-input placeholder="请输入" class="smallIpt" v-model="postData.legal_person_id_card"/>
                  </a-form-model-item>
                </div>
              </div>
              <div class="divRow">
                <p>手机号：</p>
                <div>
                  <a-form-model-item ref="legal_person_phone" prop="legal_person_phone">
                    <a-input placeholder="请输入"
                     type="number"
                     class="smallIpt" v-model="postData.legal_person_phone"/>
                  </a-form-model-item>
                </div>
              </div>
              <div class="divRow">
                <p>家庭地址：</p>
                <div>
                  <a-form-model-item ref="legal_person_address" prop="legal_person_address">
                    <a-input placeholder="请输入" class="smallIpt" v-model="postData.legal_person_address"/>
                  </a-form-model-item>
                </div>
              </div>
           </div>
           <div class="uploads">
              <div>身份证正面</div>
              <a-form-model-item ref="id_card_front" prop="id_card_front">
                  <up-file @getImg="getImg($event,'id_card_front')" :max_num="1">
                      <div>
                        <a-icon type="plus" />
                        <div class="ant-upload-text">上传</div>
                      </div>
                   </up-file>
              </a-form-model-item>
           </div>
           <div class="uploads">
              <div>身份证反面</div>
              <a-form-model-item ref="id_card_back" prop="id_card_back">
                  <up-file @getImg="getImg($event,'id_card_back')" :max_num="1">
                      <div>
                        <a-icon type="plus" />
                        <div class="ant-upload-text">上传</div>
                      </div>
                   </up-file>
              </a-form-model-item>
           </div>
         </div>
      </div>
       <a-button type="primary" class="btns" @click="saves">提交至教委</a-button>
    </div>
    </a-form-model>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        year:"",
        typeData:[{id:1,txt:"自管"},{id:2,txt:"派遣"},{id:3,txt:"承包"}],
        postData:{
          school_id:"",
          calendar_id:"",
          labour_total_count:0,
          labour_type:undefined,
          last_year_total_money:"",
          last_year_wages:"",
          last_year_social:"",
          labour_service:"",
          labour_credit_code:"",
          labour_credit_code_image:"",
          labour_licence:"",
          labour_licence_image:"",
          legal_person:"",
          legal_person_id_card:"",
          legal_person_phone:"",
          legal_person_address:"",
          id_card_front:"",
          id_card_back:""
        },
        Validata:{
          labour_type:[{ required: true, message: '请选择',trigger: 'blur' }],
          last_year_total_money:[{ required: true, message: '请输入年度总额',trigger: 'blur' }],
          last_year_wages:[{ required: true, message: '请输入工资',trigger: 'blur' }],
          last_year_social:[{ required: true, message: '请输入社保',trigger: 'blur' }],
          labour_service:[{ required: true, message: '请输入名称',trigger: 'blur' }],
          labour_credit_code:[{ required: true, message: '请输入代码编号',trigger: 'blur' }],
          labour_licence:[{ required: true, message: '请输入许可证编号',trigger: 'blur' }],
          labour_credit_code_image:[{ required: true, message: '请上传',trigger: 'blur' }],
          labour_licence_image:[{ required: true, message: '请上传',trigger: 'blur' }],
          legal_person:[{ required: true, message: '请输入姓名',trigger: 'blur' }],
          legal_person_id_card:[{ required: true, message: '请输入身份证',trigger: 'blur' }],
          legal_person_phone:[{ required: true, message: '请输入手机号',trigger: 'blur' }],
          legal_person_address:[{ required: true, message: '请输入住址',trigger: 'blur' }],
          id_card_front:[{ required: true, message: '请上传',trigger: 'blur' }],
          id_card_back:[{ required: true, message: '请上传',trigger: 'blur' }],
        },
      }
    },
    components:{
      goback
    },
    created(){
      var {
        years,
        calendar_id,
        school_id,
        labour_total_count
      } = JSON.parse(localStorage.getItem("localInfo"));
      this.year = years;
      this.postData.calendar_id = calendar_id;
      this.postData.school_id = school_id;
      this.postData.labour_total_count = labour_total_count
    },
    methods:{
      saves(){             //保存
        this.$refs.formModel.validate(valid => {
          if (valid) {
            this.$store.commit("sch_setLoaing",true)
            var allDatas = JSON.parse(JSON.stringify(this.postData));
            this.$http.InfoLabourUpdate(allDatas).then((res)=>{
              this.$store.commit("sch_setLoaing",false)
              if(res.code==1){
                this.$router.go(-1)
              }
            })
          } else {
            return false;
          }
        });
      },
      getImg(data,type){
        if(data.length!==0){
          this.postData[type] = data[0].url
          this.$refs.formModel.clearValidate(type);
        }else{
          this.postData[type] = ""
        }
      },
      lookPers(){        //查看员工情况
         this.$router.push({path:"/ManagementPanel/LicenseManagement/JobEmployees"})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/LaborPersonnel/index.scss';
</style>
