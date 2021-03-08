<template>
  <div>
    <backs :title="type=='add'?'新增员工':'修改信息'"/>
     <a-form :form="form" @submit="handleSubmit">
      <div class="boxss">
      <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>就职学校</p>
            <a-form-item>
               <a-select
                 placeholder="请选择"
                 style="width: 300px"
                 v-decorator="['school_id',Validata.school_id]"
                 >
                   <a-select-option :value="item.id" v-for="(item,index) in scolls" :key="index">{{item.full_name}}</a-select-option>
               </a-select>
           </a-form-item>
         </a-col>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>合同类型</p>
           <a-form-item>
               <a-select
                   style="width: 300px"
                   placeholder="请选择"
                   v-decorator="['type',Validata.type]"
                 >
                   <a-select-option :value="item.id" v-for="(item,index) in typeData" :key="index">{{item.txt}}</a-select-option>
               </a-select>
           </a-form-item>
         </a-col>
      </a-row>
      <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>姓名</p>
           <a-form-item>
              <a-input placeholder="填写员工姓名"  v-decorator="['name',Validata.name]"/>
           </a-form-item>
         </a-col>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>性别选择</p>
           <a-form-item>
             <a-select
                 style="width: 300px"
                 placeholder="请选择"
                v-decorator="['sex',Validata.sex]"
               >
                 <a-select-option :value="item.id" v-for="(item,index) in sex" :key="index">{{item.txt}}</a-select-option>
             </a-select>
           </a-form-item>
         </a-col>
      </a-row>
      <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>出生日期</p>
           <a-form-item>
              <a-date-picker placeholder="出生日期选择"
               valueFormat="YYYY-MM-DD"
               :disabled-date="disabledDate"
               v-decorator="['birthday',Validata.birthday]"/>
           </a-form-item>
         </a-col>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>职位</p>
           <a-form-item>
               <a-select
                  style="width: 300px"
                  placeholder="请选择"
                  v-decorator="['position',Validata.position]"
                 >
                   <a-select-option :value="item.name" v-for="(item,index) in commonSchoolSet.position" :key="index">{{item.name}}</a-select-option>
               </a-select>
           </a-form-item>
         </a-col>
      </a-row>
      <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>入职日期</p>
           <a-form-item>
              <a-date-picker placeholder="入职日期选择"
               valueFormat="YYYY-MM-DD"
               v-decorator="['entry_time',Validata.entry_time]"/>
           </a-form-item>
         </a-col>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>联系电话</p>
           <a-form-item>
              <a-input placeholder="填写联系电话"
               :maxLength="11"
               v-decorator="['mobile',Validata.mobile]"/>
           </a-form-item>
         </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="seleBox">
          <p>联系地址</p>
            <a-form-item>
              <a-input placeholder="填写联系地址" v-decorator="['address',Validata.address]"/>
           </a-form-item>
        </a-col>
      </a-row>
      <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>身份证正反面图片（选填）</p>
           <div class="cardBox">
              <a-form-item>
                <up-file @getImg="getImg($event,'front')" :de_fileList="cardOne" v-decorator="['front']">
                    <div class="cardsOne">
                      <div>
                         <a-icon type="plus" />
                         <div class="ant-upload-text">上传正面</div>
                       </div>
                    </div>
                 </up-file>
               </a-form-item>
               <a-form-item>
                 <up-file @getImg="getImg($event,'behind')" :de_fileList="cardTwo" v-decorator="['behind']">
                     <div class="cardsOne cardsTwo">
                       <div>
                          <a-icon type="plus" />
                          <div class="ant-upload-text">上传反面</div>
                        </div>
                     </div>
                  </up-file>
                </a-form-item>
           </div>
         </a-col>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>照片（选填）</p>
            <a-form-item>
              <up-file @getImg="getImg($event,'face_picture')" :de_fileList="defaImg" v-decorator="['face_picture']">
                  <div>
                    <a-icon type="plus" />
                    <div class="ant-upload-text">上传</div>
                  </div>
               </up-file>
             </a-form-item>
         </a-col>
      </a-row>
      <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
           <p>身份证号码</p>
            <a-form-item>
                <a-input placeholder="填写身份证号码" v-decorator="['id_card',Validata.id_card]"/>
            </a-form-item>
            <a-form-item>
              <span v-decorator="['id']"></span>
            </a-form-item>
         </a-col>
      </a-row>
      <div class="btnBox">
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" html-type="submit">{{type=='add'?'保存':'保存更新'}}</a-button>
      </div>
    </div>
    </a-form>
  </div>
</template>

<script>
  import { mapState} from 'vuex';
  import backs from "../../components/goBack/index.vue"
  import moment from "moment"
  export default{
    data(){
      return{
        scolls:[],
        typeData:[{id:0,txt:"正式"},{id:1,txt:"临时"}],
        sex:[{id:1,txt:"男"},{id:2,txt:"女"}],
        fileList:[],
        type:"",          //add是新增  update是修改
        form: this.$form.createForm(this),
        Validata:{
          school_id:{ rules: [{ required: true, message: '请选择学校' }]},
          type:{ rules: [{ required: true, message: '请选择合同类型' }]},
          name:{ rules: [{ required: true, message: '请填写员工姓名' }]},
          sex:{ rules: [{ required: true, message: '请选择性别' }]},
          birthday:{ rules: [{ required: true, message: '请选择出生日期' }]},
          position:{ rules: [{ required: true, message: '请选择员工职位' }]},
          entry_time:{ rules: [{ required: true, message: '请选择入职日期' }]},
          mobile:{ rules: [{ required: true, message: '请填写联系电话' }]},
          id_card:{ rules: [{ required: true, message: '请填写身份证号码' }]},
          address:{ rules: [{ required: true, message: '请填写联系地址' }]}
        },
        cardOne:[],
        cardTwo:[],
        defaImg:[]
      }
    },
    components:{
      backs
    },
    computed: {
      ...mapState(['commonSchoolSet'])
    },
    created(){
      this.type = this.$route.query.type
      var id = this.$route.query.id
      if(id){
        this.getDetails(id)
      }
      this.getScoll()
    },
    methods:{
      cancel(){            //取消
         this.$router.go(-1)
      },
      disabledDate(current) {            //设置出生日期不能选未来
        return current && current >moment().endOf('day');
      },
      getDetails(id){
        this.$store.commit("sch_setLoaing",true)
        this.$http.schoolFacultyInfo({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            let {school_id,name,type,sex,position,birthday,entry_time,mobile,address,id_card,behind,face_picture,front} = res.data
             this.$nextTick(()=>{
               this.form.setFieldsValue({
                 school_id,name,type,sex,position,birthday,entry_time,mobile,address,id_card,
                 id
               });
             })
             if(front!==''){
                this.cardOne = [{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:front}]
             }else if(behind!==''){
                this.cardTwo = [{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:behind}]
             }else if(face_picture!==''){
               this.defaImg = [{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:face_picture}]
             }
          }
        })
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
      getScoll(){          //获取学校
         this.$commonJs.getSchool((data) => {
          this.scolls = data
        })
      },
      handleSubmit(e){
        e.preventDefault();
        var type = true
        this.form.validateFields((err, values) => {
          if (!err) {
              this.$store.commit("sch_setLoaing",true)
              this.$http.FacultyDataManipulation(values).then((res)=>{
                this.$store.commit("sch_setLoaing",false)
                if(res.code==1){
                  this.$router.go(-1)
                }
              })
          }
        });
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/internalManagement/AddEmployee.scss';
</style>
