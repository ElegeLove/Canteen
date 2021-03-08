<template>
  <div>
    <steps :current="2"/>
    <a-form :form="form" @submit="handleSubmit">
    <div class="rows">
        <div class="divFlex">
           <div>
             <p>法人代表姓名及联系方式</p>
             <a-form-item>
               <a-input placeholder="填写法人姓名"
                v-decorator="['legal_person', Validata.legal_person]"
                />
             </a-form-item>
           </div>
           <span>
             <span></span>
           </span>
           <div>
             <p></p>
              <a-form-item>
                <a-input placeholder="填写法人联系电话"
                  :maxLength="11"
                  v-decorator="['legal_person_mobile',Validata.legal_person_mobile]"
                 />
             </a-form-item>
           </div>
        </div>
        <div v-if="scollData.affiliated_kindergarten==1">
            <div class="divFlex">
               <div>
                 <p>校长姓名及联系方式</p>
                 <a-form-item>
                    <a-input placeholder="填写校长姓名"
                    v-decorator="['principal', Validata.principal]"
                    />
                 </a-form-item>
               </div>
               <span>
                 <span></span>
               </span>
               <div>
                 <p></p>
                  <a-form-item>
                    <a-input placeholder="填写校长联系电话"
                    :maxLength="11"
                     v-decorator="['principal_mobile',Validata.principal_mobile ]"
                     />
                 </a-form-item>
               </div>
            </div>
            <div class="divFlex">
               <div>
                 <p>园长姓名及联系方式</p>
                 <a-form-item>
                    <a-input placeholder="填写园长姓名"
                     v-decorator="['director',Validata.director ]"
                     />
                 </a-form-item>
               </div>
               <span>
                 <span></span>
               </span>
               <div>
                 <p></p>
                 <a-form-item>
                    <a-input placeholder="填写园长联系电话"
                    :maxLength="11"
                      v-decorator="['director_mobile',Validata.director_mobile ]"
                     />
                 </a-form-item>
               </div>
            </div>
            <div class="radios">
              <div>是否为普惠幼儿园</div>
              <a-form-item>
                  <a-radio-group name="radioGroup"
                   v-decorator="['inclusive_garden']"
                  >
                      <a-radio :value="1">是</a-radio>
                      <a-radio :value="0">否</a-radio>
                   </a-radio-group>
               </a-form-item>
            </div>
        </div>
        <div class="divFlex" v-else>
           <div>
             <p>校（园）长姓名及联系方式</p>
             <a-form-item>
                <a-input placeholder="填写校（园）长姓名"
                 v-decorator="['principal',Validata.principal ]"
                  />
             </a-form-item>
           </div>
           <span>
             <span></span>
           </span>
           <div>
             <p></p>
              <a-form-item>
                <a-input placeholder="填写校（园）长联系电话"
                 :maxLength="11"
                 v-decorator="['principal_mobile',Validata.principal_mobile ]"
                />
             </a-form-item>
           </div>
        </div>
        <div class="flexs">
          <a-button ghost type="primary" @click="goFrst">上一步</a-button>
          <a-button type="primary"  html-type="submit">下一步</a-button>
        </div>
    </div>
    </a-form>
  </div>
</template>

<script>
  import steps from "../../../components/step/index.vue"
  import { mapState,mapMutations} from 'vuex';
  export default{
    data(){
      return{
        radio:1,
        scollData:{},
        form: this.$form.createForm(this),
        Validata:{
          legal_person:{ rules: [{ required: true, message: '请输入法人姓名' }]},
          legal_person_mobile:{ rules: [{ required: true, message: '请输入法人联系电话' }] },
          principal:{ rules: [{ required: true, message: '请输入校长姓名' }] },
          principal_mobile:{ rules: [{ required: true, message: '请输入校长联系电话' }] },
          director:{ rules: [{ required: true, message: '请输入园长姓名' }] },
          director_mobile:{ rules: [{ required: true, message: '请输入园长联系电话' }] }
        }
      }
    },
    computed: {
      ...mapState(['scollInfo'])
    },
    mounted(){
       this.scollData = JSON.parse(JSON.stringify(this.scollInfo))
       let {legal_person,legal_person_mobile,principal,principal_mobile,director,director_mobile,inclusive_garden} = this.scollData
       this.$nextTick(()=>{
         this.form.setFieldsValue({
          legal_person,
          legal_person_mobile,
          principal,
          principal_mobile,
          director,
          director_mobile,
          inclusive_garden
         });
       })
    },
    components:{
      steps
    },
    methods:{
      ...mapMutations(['setScollInfo']),
      goFrst(){       //上一步
        this.$router.go(-1)
      },
      handleSubmit(e) {
        e.preventDefault();
        var type = true
        this.form.validateFields((err, values) => {
          if (!err) {
            let obj = JSON.parse(JSON.stringify(values))
            var oldObj = JSON.parse(JSON.stringify(this.scollInfo))
            this.$store.commit("sch_setLoaing",true)
            this.$http.IndexLegal(values).then((res)=>{
              this.$store.commit("sch_setLoaing",false)
              if(res.code==1){
                var newObj =  Object.assign(oldObj,obj);
                this.setScollInfo(newObj)
                this.$router.push({name:"InfoSuccess"})
              }
            })
          }
        });
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/internalManagement/ChargeInformation.scss';
</style>
