<template>
  <div>
    <backs :title="type=='add'?'添加员工':'修改信息'"/>
    <a-form :form="form" @submit="handleSubmit">
    <div class="boxss">
       <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="seleBox">
              <p>身份证号码</p>
              <a-form-item>
                <a-input placeholder="填写身份证号码"
                  v-decorator="['id_card',Validata.id_card ]"
                 />
              </a-form-item>
            </div>
            <div class="seleBox">
              <p>身份证地址</p>
              <a-form-item>
                <a-input placeholder="填写身份证地址"
                 v-decorator="['id_card_address',Validata.id_card_address ]"
                 />
              </a-form-item>
            </div>
         </a-col>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="uploads">
              <p>身份证正反面图片</p>
              <div class="cardBox">
                <a-form-item>
                 <up-file @getImg="getImg($event,'front')" :de_fileList="cardOne" v-decorator="['front',Validata.front]">
                     <div class="cardsOne">
                       <div>
                          <a-icon type="plus" />
                          <div class="ant-upload-text">上传正面</div>
                        </div>
                     </div>
                  </up-file>
                  </a-form-item>
                 <a-form-item>
                 <up-file @getImg="getImg($event,'behind')" :de_fileList="cardTwo" v-decorator="['behind',Validata.behind]">
                     <div class="cardsOne cardsTwo">
                       <div>
                          <a-icon type="plus" />
                          <div class="ant-upload-text">上传反面</div>
                        </div>
                     </div>
                  </up-file>
                  </a-form-item>
              </div>
            </div>
         </a-col>
       </a-row>
       <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="seleBox">
              <p>健康证发证单位</p>
              <a-form-item>
                <a-input placeholder="填写发证单位"
                  v-decorator="['health_certificate_unit',Validata.health_certificate_unit ]"
                 />
              </a-form-item>
            </div>
            <div class="seleBox">
              <p>健康证到期日期</p>
              <a-form-item>
                <a-date-picker
                 v-decorator="['health_certificate_time',Validata.health_certificate_time ]"
                 valueFormat="YYYY-MM-DD"
                 placeholder="到期日期选择"/>
              </a-form-item>
            </div>
         </a-col>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
           <a-form-item>
            <div class="uploads" v-decorator="['health_certificate_image',Validata.health_certificate_image]">
              <p>健康证图片</p>
              <up-file @getImg="getImg($event,'health_certificate_image')" :de_fileList="defaImg">
                  <div>
                    <a-icon type="plus" />
                    <div class="ant-upload-text">上传</div>
                  </div>
               </up-file>
            </div>
            </a-form-item>
         </a-col>
       </a-row>
       <div class="btnBox">
         <a-button @click="goBacks">上一步</a-button>
         <a-button type="primary" html-type="submit">{{type=='add'?'保存':'更新保存'}}</a-button>
       </div>
    </div>
    </a-form>
  </div>
</template>

<script>
  import { mapState,mapMutations} from 'vuex';
  import backs from "../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        cardOne:[],
        cardTwo:[],
        defaImg:[],
        form: this.$form.createForm(this),
        Validata:{
          front:{ rules: [{ required: true, message: '请上传身份证正面' }]},
          behind:{ rules: [{ required: true, message: '请上传身份证反面' }] },
          id_card:{ rules: [{ required: true, message: '请填写身份证号码' }] },
          id_card_address:{ rules: [{ required: true, message: '请填写身份证地址' }] },
          health_certificate_unit:{ rules: [{ required: true, message: '请填写发证单位' }] },
          health_certificate_time:{ rules: [{ required: true, message: '请选择到期日期' }] },
          health_certificate_image:{ rules: [{ required: true, message: '请上传健康证图片' }] }
        },
      }
    },
    components:{
      backs
    },
    computed: {
      ...mapState(['addEmployee'])
    },
    created(){
       var type = this.$route.query.type
       this.type = type
    },
    mounted(){
      if(this.addEmployee.id_card!=undefined){
        let {front,behind,id_card,id_card_address,health_certificate_unit,health_certificate_time,health_certificate_image} = this.addEmployee
        this.$nextTick(()=>{
          this.form.setFieldsValue({
            front,behind,id_card,id_card_address,health_certificate_unit,health_certificate_time,health_certificate_image
          });
           this.cardOne = [{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:front}]
           this.cardTwo = [{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:behind}]
           this.defaImg = [{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:health_certificate_image}]
        })
      }
    },
    methods:{
       ...mapMutations(['setAddEmployee']),
      goBacks(){
        this.$router.go(-1)
      },
      getImg(data,type){
        if(data.length!==0){
          this.form.setFieldsValue({
            [type]:data[0].url
          });
        }else{
          this.form.setFieldsValue({
            [type]:""
          });
        }
      },
      handleSubmit(e) {
        e.preventDefault();
        var type = true
        this.form.validateFields((err, values) => {
          if (!err) {
            var old = JSON.parse(JSON.stringify(this.addEmployee))
            var newObj =  Object.assign(old,values);
            this.setAddEmployee(newObj)
            this.$store.commit("sch_setLoaing",true)
            this.$http.CanteenFacultyDataManipulation(newObj).then((res)=>{
              this.$store.commit("sch_setLoaing",false)
                if(res.code==1){
                  this.setAddEmployee({})
                  this.$router.go(-2)
                }
            })
          }
        });
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/CanteenInformation/LicenseManagement/AddEmployeeTwo.scss';
</style>
