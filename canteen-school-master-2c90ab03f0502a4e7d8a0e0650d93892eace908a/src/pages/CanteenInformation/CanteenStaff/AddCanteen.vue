<template>
  <div>
     <backs :title="id!==undefined?'修改食堂':'添加食堂'"/>
     <a-form :form="form" @submit="handleSubmit">
     <div class="boxss">
        <a-row>
           <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
             <p>学校</p>
             <a-form-item>
             <a-select
                 style="width: 300px"
                 placeholder="请选择学校"
                 v-decorator="['school_id',Validata.school_id ]"
               >
                 <a-select-option :value="item.id" v-for="(item,index) in scrolls" :key="index">{{item.full_name}}</a-select-option>
             </a-select>
             </a-form-item>
           </a-col>
           <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
             <p>食堂名称</p>
             <a-form-item>
               <a-input placeholder="填写食堂名称" v-decorator="['name',Validata.name ]"/>
             </a-form-item>
           </a-col>
        </a-row>
        <a-row>
           <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
             <p>负责人</p>
             <a-form-item>
               <a-input placeholder="填写负责人姓名" v-decorator="['person_charge',Validata.person_charge ]"/>
             </a-form-item>
           </a-col>
           <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
             <p>联系方式</p>
             <a-form-item>
               <a-input placeholder="填写联系电话"
                :maxLength="11"
                v-decorator="['person_charge_mobile',Validata.person_charge_mobile]"/>
             </a-form-item>
           </a-col>
        </a-row>
        <a-row>
           <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
             <p>法人代表</p>
             <a-form-item>
               <a-input placeholder="填写法人姓名" v-decorator="['legal_person',Validata.legal_person ]"/>
             </a-form-item>
           </a-col>
           <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
             <p>法人联系电话</p>
             <a-form-item>
               <a-input placeholder="填写法人联系电话"
                :maxLength="11"
                v-decorator="['legal_person_mobile',Validata.legal_person_mobile ]"/>
             </a-form-item>
           </a-col>
        </a-row>
        <div class="btnBox">
          <a-button @click="goBack">取消</a-button>
          <a-button type="primary" html-type="submit">下一步</a-button>
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
        scrolls:[],
        form: this.$form.createForm(this),
        Validata:{
          school_id:{ rules: [{ required: true, message: '请选择学校' }]},
          name:{ rules: [{ required: true, message: '请输入食堂名称' }] },
          person_charge:{ rules: [{ required: true, message: '请输入负责人姓名' }] },
          person_charge_mobile:{ rules: [{ required: true, message: '请输入负责人电话'},{validator:this.$commonJs.phoneCheck.bind(this)}]},
          legal_person:{ rules: [{ required: true, message: '请输入法人姓名' }] },
          legal_person_mobile:{ rules: [{ required: true, message: '请输入法人电话'},{validator:this.$commonJs.phoneCheck.bind(this)}] }
        },
        id:""
      }
    },
    components:{
      backs
    },
    created(){
       this.id = this.$route.query.id
       if(this.id){
         this.getDetails(this.id)
       }
    },
    computed: {
      ...mapState(['addCanteenData'])
    },
    mounted(){
       this.$commonJs.getSchool((data)=>{
         this.scrolls = data
       })
       if(!this.$route.query.id){
          this.setValue()
       }
    },
    methods:{
      goBack(){
         this.$router.go(-1)
      },
      setValue(){             //表单赋值
        let {school_id,name,person_charge,person_charge_mobile,legal_person,legal_person_mobile} = this.addCanteenData
        this.$nextTick(()=>{
          this.form.setFieldsValue({
           school_id,name,person_charge,person_charge_mobile,legal_person,legal_person_mobile
          });
        })
      },
      getDetails(id){          //获取食堂详情
         this.$store.commit("sch_setLoaing",true)
         this.$http.CanteenInfo({id}).then((res)=>{
           this.$store.commit("sch_setLoaing",false)
            if(res.code==1){
               this.setAddCanteen(res.data)
               this.setValue()
            }
         })
      },
      ...mapMutations(['setAddCanteen']),
      handleSubmit(e) {              //提交
        e.preventDefault();
        var type = true
        this.form.validateFields((err, values) => {
          if (!err) {
            var old = JSON.parse(JSON.stringify(this.addCanteenData))
            var newObj =  Object.assign(old,values);
             this.setAddCanteen(newObj)
             this.$router.push({path:"/ManagementPanel/GoNext",query:{id:this.$route.query.id}})
          }
        });
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/CanteenInformation/CanteenStaff/AddCanteen.scss';
</style>
