<template>
  <div>
      <backs :title="id!==undefined?'修改食堂':'添加食堂'"/>
      <a-form :form="form" @submit="handleSubmit">
      <div class="boxs">
         <div class="listLin">
            <p>生活饮用水</p>
            <a-row>
              <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="seleBox">
                <p>供水方式</p>
                <a-form-item>
                  <a-select
                    style="width: 300px"
                    placeholder="请选择供水方式"
                    v-decorator="['water_supply_mode',Validata.water_supply_mode ]"
                    >
                    <a-select-option :value="item.id" v-for="(item,index) in scrolls" :key="index">{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <a-form-item>
                  <div class="uploads" v-decorator="['water_certificate']">
                     <div>水质检验报告扫描件（选填）</div>
                      <up-file @getImg="getImg($event,'water_certificate')" :de_fileList="water_certificate" >
                          <div class="upSize">
                            <a-icon type="plus" />
                            <div class="ant-upload-text">上传</div>
                          </div>
                       </up-file>
                  </div>
                </a-form-item>
              </a-col>
            </a-row>
         </div>
         <div class="listLin">
            <p>食品经营许可证信息</p>
            <a-row>
              <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <div class="seleBox">
                  <p>许可证编号</p>
                  <a-form-item>
                    <a-input placeholder="填写许可证编号"  v-decorator="['license_number',Validata.license_number ]"/>
                  </a-form-item>
                </div>
                <div class="seleBox">
                  <p>许可项目</p>
                  <a-form-item>
                    <a-input placeholder="填写许可项目" v-decorator="['license_projects',Validata.license_projects ]"/>
                  </a-form-item>
                </div>
              </a-col>
              <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <a-form-item>
                  <div class="uploads"  v-decorator="['license_certificate',Validata.license_certificate ]" >
                     <div>证件图片</div>
                     <up-file @getImg="getImg($event,'license_certificate')" :de_fileList="license_certificate">
                         <div class="upSize">
                           <a-icon type="plus" />
                           <div class="ant-upload-text">上传</div>
                         </div>
                      </up-file>
                  </div>
                </a-form-item>
              </a-col>
            </a-row>
         </div>
         <div class="dataBox">
            <p>有效期起止日期</p>
            <div>
              <a-form-item>
                <a-date-picker
                  v-decorator="['start_time',Validata.start_time ]"
                  :disabled-date="disabledStartDate"
                  format="YYYY-MM-DD"
                  valueFormat="YYYY-MM-DD"
                  placeholder="请选择开始日期"
                  @openChange="handleStartOpenChange"
                  @change="timchange($event,'startValue')"
                />
              </a-form-item>
              <span class="lines">-</span>
              <a-form-item>
                <a-date-picker
                  v-decorator="['end_time',Validata.end_time ]"
                  :disabled-date="disabledEndDate"
                  format="YYYY-MM-DD"
                  valueFormat="YYYY-MM-DD"
                  placeholder="请选择结束日期"
                  :open="endOpen"
                  @openChange="handleEndOpenChange"
                  @change="timchange($event,'endValue')"
                />
              </a-form-item>
            </div>
         </div>
         <div class="btnBox">
           <a-button>取消</a-button>
           <a-button type="primary" html-type="submit">{{id!==undefined?'更新':'确定'}}</a-button>
         </div>
      </div>
      </a-form>
  </div>
</template>

<script>
  import { mapState,mapMutations} from 'vuex';
  import backs from "../../../components/goBack/index.vue"
  import moment from "moment"
  export default{
    data(){
      return{
        scrolls:[{id:0,name:"市政供水"},{id:1,name:"自备水"}],
        startValue: null,
        endValue: null,
        endOpen: false,
        form: this.$form.createForm(this),
        Validata:{
          water_supply_mode:{ rules: [{ required: true, message: '请选择供水方式' }]},
          license_number:{ rules: [{ required: true, message: '请输入许可证编号' }] },
          person_charge_mobile:{ rules: [{ required: true, message: '请输入负责人电话' }] },
          license_projects:{ rules: [{ required: true, message: '请输入许可项目' }] },
          license_certificate:{ rules: [{ required: true, message: '请上传证件图片' }] },
          start_time:{ rules: [{ required: true, message: '请选择开始日期' }] },
          end_time:{ rules: [{ required: true, message: '请选择结束日期' }] }
        },
        license_certificate:[],
        water_certificate:[],
        id:""
      }
    },
    created(){
      this.id = this.$route.query.id
    },
    components:{
      backs
    },
    computed: {
      ...mapState(['addCanteenData'])
    },
    mounted(){
      if(this.addCanteenData.water_supply_mode!=undefined){
        let {water_supply_mode,license_number,person_charge_mobile,license_projects,license_certificate,start_time,end_time,water_certificate} = this.addCanteenData
        this.$nextTick(()=>{
          this.form.setFieldsValue({
            water_supply_mode,license_number,person_charge_mobile,license_projects,license_certificate,start_time,end_time,water_certificate
          });
           this.license_certificate = [{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:license_certificate}]
           if(water_certificate!==''){
             this.water_certificate = [{uid:this.$commonJs.randoms(),status:"done",name:this.$commonJs.randoms(),url:water_certificate}]
           }
        })
      }
    },
    methods:{
       ...mapMutations(['setAddCanteen']),
      disabledStartDate(startValue) {
        const endValue = moment(this.endValue);
        if (!startValue || !endValue) {
          return false;
        }
        return moment(startValue).valueOf() > endValue.valueOf();
      },
      disabledEndDate(endValue) {
        const startValue = moment(this.startValue);
        if (!endValue || !startValue) {
          return false;
        }
        return startValue.valueOf() >= moment(endValue).valueOf();
      },
      handleStartOpenChange(open) {
        if (!open) {
          this.endOpen = true;
        }
      },
      timchange(e,type){         //设置时间
       this[type] = e
      },
      handleEndOpenChange(open) {
        this.endOpen = open;
      },
      handleSubmit(e) {
        e.preventDefault();
        var type = true
        this.form.validateFields((err, values) => {
          if (!err) {
            var old = JSON.parse(JSON.stringify(this.addCanteenData))
            var newObj =  Object.assign(old,values);
            this.setAddCanteen(newObj)
            this.$store.commit("sch_setLoaing",true)
            this.$http.CnteenDataManipulation(newObj).then((res)=>{
              this.$store.commit("sch_setLoaing",false)
              if(res.code==1){
                 this.setAddCanteen({})
                 this.$router.go(-2)
              }
            })
          }
        });
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
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/CanteenInformation/CanteenStaff/goNext.scss';
</style>
