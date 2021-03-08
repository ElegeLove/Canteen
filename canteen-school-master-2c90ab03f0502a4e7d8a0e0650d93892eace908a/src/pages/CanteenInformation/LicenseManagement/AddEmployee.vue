<template>
  <div>
    <backs :title="type=='add'?'添加员工':'修改信息'"/>
    <a-form :form="form" @submit="handleSubmit">
    <div class="boxss">
      <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>所属食堂</p>
           <a-form-item>
               <a-select
                style="width: 300px"
                placeholder="所属食堂选择"
                 v-decorator="['canteen_id',Validata.canteen_id]"
               >
                 <a-select-option :value="item.id" v-for="(item,index) in scrolls" :key="index">{{item.name}}</a-select-option>
               </a-select>
           </a-form-item>
         </a-col>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>姓名</p>
           <a-form-item>
              <a-input placeholder="填写员工姓名" v-decorator="['name',Validata.name]"/>
           </a-form-item>
         </a-col>
      </a-row>
      <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>性别选择</p>
           <a-form-item>
               <a-select
                 style="width: 300px"
                 placeholder="性别选择"
                 v-decorator="['sex',Validata.sex]"
               >
                   <a-select-option :value="item.id" v-for="(item,index) in sexData" :key="index">{{item.name}}</a-select-option>
               </a-select>
           </a-form-item>
         </a-col>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>出生日期</p>
            <a-form-item>
              <a-date-picker
                valueFormat="YYYY-MM-DD"
                :disabled-date="disabledDate"
                v-decorator="['birthday',Validata.birthday]"
                placeholder="员工出生日期选择"/>
           </a-form-item>
         </a-col>
      </a-row>
      <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>职位</p>
           <a-form-item>
              <a-input placeholder="填写职位"  v-decorator="['position',Validata.position]"/>
           </a-form-item>
         </a-col>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>入职日期</p>
           <a-form-item>
             <a-date-picker
              valueFormat="YYYY-MM-DD"
              placeholder="入职日期选择"
              v-decorator="['entry_time',Validata.entry_time]"
              />
           </a-form-item>
         </a-col>
      </a-row>
      <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>联系电话</p>
           <a-form-item>
           <a-input placeholder="填写联系电话"
            :maxLength="11"
            v-decorator="['mobile',Validata.mobile]"/>
           </a-form-item>
         </a-col>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>联系地址</p>
            <a-form-item>
           <a-input placeholder="填写联系地址" v-decorator="['address',Validata.address]"/>
           </a-form-item>
         </a-col>
      </a-row>
      <div class="uploads">
        <p>照片（选填）</p>
        <a-form-item>
        <up-file @getImg="getImg" :de_fileList="picture" v-decorator="['picture']">
            <div class="upSize">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传</div>
            </div>
         </up-file>
         </a-form-item>
      </div>
      <div class="btnBox">
           <a-button type="primary" html-type="submit">下一步</a-button>
      </div>
    </div>
    </a-form>
  </div>
</template>

<script>
  import moment from "moment"
  import { mapState,mapMutations} from 'vuex';
  import backs from "../../../components/goBack/index.vue"
  export default{
    data(){
      return{
         scrolls:[],
         sexData:[{id:1,name:"男"},{id:2,name:"女"}],
         type:"",     //add是新增   update是修改
         picture:[],
         form: this.$form.createForm(this),
         Validata:{
           canteen_id:{ rules: [{ required: true, message: '请选择食堂' }]},
           name:{ rules: [{ required: true, message: '请填写员工姓名' }]},
           sex:{ rules: [{ required: true, message: '请选择性别' }]},
           birthday:{ rules: [{ required: true, message: '请选择出生日期' }]},
           position:{ rules: [{ required: true, message: '请填写职位' }]},
           entry_time:{ rules: [{ required: true, message: '请选择入职日期' }]},
           mobile:{ rules: [{required: true,validator:this.$commonJs.phoneCheck.bind(this)}]},
          //  mobile:{ rules: [{ required: true, message: '请填写联系电话',trigger: 'blur' },{required: true,validator:this.$commonJs.phoneCheck.bind(this),trigger: 'blur'}]},
           address:{ rules: [{ required: true, message: '请填写联系地址' }]}
         },
      }
    },
    components:{
      backs
    },
    computed: {
      ...mapState(['commonSchoolSet','addEmployee'])
    },
    created(){
       var type = this.$route.query.type
       this.type = type
       this.getCtern()
       var id = this.$route.query.id
       if(id){
         this.getDetails(id)
       }
    },
    mounted(){
      if(!this.$route.query.id){
         this.setValue()
      }
    },
    methods:{
      disabledDate(current) {            //设置出生日期不能选未来
        return current && current >moment().endOf('day');
      },
      ...mapMutations(['setAddEmployee']),
      getDetails(id){          //获取食堂详情
         this.$store.commit("sch_setLoaing",true)
         this.$http.CanteenFacultyInfo({id}).then((res)=>{
           this.$store.commit("sch_setLoaing",false)
            if(res.code==1){
               this.setAddEmployee(res.data)
               this.setValue()
            }
         })
      },
      setValue(){             //表单赋值
        let {canteen_id,name,sex,birthday,position,entry_time,mobile,address,picture} = this.addEmployee
        this.$nextTick(()=>{
          this.form.setFieldsValue({
           canteen_id,name,sex,birthday,position,entry_time,mobile,address,picture
          });
          if(picture!==undefined&&picture!==''){
            this.picture = [{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:picture}]
          }
        })
      },
      handleSubmit(e) {
        e.preventDefault();
        var type = true
        this.form.validateFields((err, values) => {
          if (!err) {
            var old = JSON.parse(JSON.stringify(this.addEmployee))
            var newObj =  Object.assign(old,values);
             this.setAddEmployee(newObj)
             this.$router.push({path:"/ManagementPanel/JobAddEmployeeTwo",query:{id:this.$route.query.id,type:this.type}})
          }
        });
      },
      getCtern(){
        this.$http.CommonGetCanteen().then((res)=>{           //获取所有食堂
          if(res.code==1){
            this.scrolls = res.data
          }
        })
      },
      getImg(data){
        if(data.length!==0){
          this.form.setFieldsValue({
            picture:data[0].url
          });
        }else{
          this.form.setFieldsValue({
            picture:""
          });
        }
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/CanteenInformation/LicenseManagement/AddEmployee.scss';
</style>
