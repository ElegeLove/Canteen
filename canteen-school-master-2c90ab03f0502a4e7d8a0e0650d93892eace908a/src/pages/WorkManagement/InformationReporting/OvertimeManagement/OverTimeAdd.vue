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
          <span>学期：{{$route.query.year}}</span>
        </div>
      </div>
       <div class="oneHeads">
         <div>
            <div class="rows">
              <div>
                <p>经营模式：</p>
                <div>
                  <a-form-model-item ref="sell_model" prop="sell_model">
                    <a-select
                        style="width: 200px"
                        placeholder="请选择"
                        v-model="postData.sell_model"
                      >
                        <a-select-option :value="item.id" v-for="(item,index) in typeData" :key="index">{{item.txt}}</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </div>
              </div>
             <div class="dataBox">
                <p>租赁/承包起止日期：</p>
                <div>
                   <a-form-model-item ref="start_time" prop="start_time">
                      <a-date-picker
                        :disabled-date="disabledStartDate"
                         v-model="postData.start_time"
                        style="width: 250px;"
                        valueFormat="YYYY-MM-DD"
                        placeholder="请选择开始日期"
                        @openChange="handleStartOpenChange"
                        @change="checkTim('start_time')"
                      />
                  </a-form-model-item>
                  <span class="lines">-</span>
                  <a-form-model-item ref="end_time" prop="end_time">
                    <a-date-picker
                      style="width: 250px;"
                      :disabled-date="disabledEndDate"
                      valueFormat="YYYY-MM-DD"
                      placeholder="请选择结束日期"
                      :open="endOpen"
                      v-model="postData.end_time"
                      @openChange="handleEndOpenChange"
                      @change="checkTim('end_time')"
                    />
                    </a-form-model-item>
                </div>
             </div>
            </div>
            <div class="rowTwos">
              <div class="rowfg marRigs">
                <p>年租金/上年度利润：</p>
                  <div>
                    <a-form-model-item ref="money" prop="money">
                    <a-input placeholder="请输入" v-model="postData.money" type="number"/>
                    </a-form-model-item>
                    <span>元</span>
                  </div>
              </div>
              <div class="allIpts">
                <div class="rowfg mars">
                  <p>经营主体名称：</p>
                    <div>
                      <a-form-model-item ref="name" prop="name">
                        <a-input placeholder="请输入" v-model="postData.name"/>
                      </a-form-model-item>
                    </div>
                </div>
                <div class="rowfg">
                  <p>信用代码：</p>
                    <div>
                      <a-form-model-item ref="code" prop="code">
                        <a-input placeholder="请输入" v-model="postData.code"/>
                      </a-form-model-item>
                    </div>
                </div>
              </div>
            </div>
         </div>
         <div class="uploads">
            <div>营业执照</div>
            <a-form-model-item ref="license" prop="license">
            <up-file @getImg="getImg($event,'license')" :max_num="1">
                <div>
                  <a-icon type="plus" />
                  <div class="ant-upload-text">上传</div>
                </div>
             </up-file>
             </a-form-model-item>
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
                 <p>到期日期：</p>
                 <div>
                    <a-form-model-item ref="card_end_time" prop="card_end_time">
                      <a-date-picker placeholder="到期日期选择"
                       valueFormat="YYYY-MM-DD"
                       v-model="postData.card_end_time"
                       @change="checkTim('card_end_time')"
                       />
                     </a-form-model-item>
                 </div>
               </div>
               <div class="divRow">
                 <p>许可证编号：</p>
                 <div>
                   <a-form-model-item ref="card_number" prop="card_number">
                      <a-input placeholder="请输入" class="smallIpt" v-model="postData.card_number"/>
                   </a-form-model-item>
                 </div>
               </div>
            </div>
            <div class="uploads">
               <div>证件图片</div>
               <a-form-model-item ref="card_img" prop="card_img">
                 <up-file @getImg="getImg($event,'card_img')" :max_num="1">
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
            <span>法定代表人信息</span>
            <div></div>
          </div>
          <div class="allRow">
            <div>
               <div class="divRow">
                 <p>姓名：</p>
                 <div>
                    <a-form-model-item ref="person_name" prop="person_name">
                      <a-input placeholder="请输入" class="smallIpt" v-model="postData.person_name"/>
                    </a-form-model-item>
                 </div>
               </div>
               <div class="divRow">
                 <p>身份证号：</p>
                 <div>
                   <a-form-model-item ref="person_id_card" prop="person_id_card">
                    <a-input placeholder="请输入" class="smallIpt" v-model="postData.person_id_card" type="number"/>
                   </a-form-model-item>
                 </div>
               </div>
               <div class="divRow">
                 <p>手机号：</p>
                 <div>
                   <a-form-model-item ref="person_phone" prop="person_phone">
                      <a-input placeholder="请输入" class="smallIpt" v-model="postData.person_phone" type="number"/>
                   </a-form-model-item>
                 </div>
               </div>
               <div class="divRow">
                 <p>家庭地址：</p>
                 <div>
                   <a-form-model-item ref="address" prop="address">
                      <a-input placeholder="请输入" class="smallIpt" v-model="postData.address"/>
                   </a-form-model-item>
                 </div>
               </div>
            </div>
            <div class="uploads">
               <div>身份证正反面</div>
               <div class="cardBox">
                 <a-form-model-item ref="id_card_front" prop="id_card_front">
                  <up-file @getImg="getImg($event,'id_card_front')" :max_num="1">
                      <div class="cardsOne">
                        <div>
                           <a-icon type="plus" />
                           <div class="ant-upload-text">上传正面</div>
                         </div>
                      </div>
                   </up-file>
                   </a-form-model-item>
                   <a-form-model-item ref="id_card_back" prop="id_card_back">
                   <up-file @getImg="getImg($event,'id_card_back')" :max_num="1">
                       <div class="cardsOne cardsTwo">
                         <div>
                            <a-icon type="plus" />
                            <div class="ant-upload-text">上传反面</div>
                          </div>
                       </div>
                    </up-file>
                    </a-form-model-item>
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
             <a-form-model-item ref="contract" prop="contract">
             <up-file @getImg="getImg($event,'contract')" :max_num="5" :multiple="true">
                 <div>
                   <a-icon type="plus" />
                   <div class="ant-upload-text">上传</div>
                 </div>
              </up-file>
              </a-form-model-item>
          </div>
       </div>
        <a-button type="primary" class="btns" @click="saves">提交至教委</a-button>
    </div>
     </a-form-model>
  </div>
</template>

<script>
  import moment from "moment";
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        typeData:[{id:1,txt:"自管"},{id:2,txt:"承包"},{id:3,txt:"租赁"}],
        postData:{
          sell_model:undefined,
          start_time:null,
          end_time:null,
          money:"",
          name:"",
          code:"",
          license:"",
          card_end_time:"",
          card_number:"",
          card_img:"",
          person_name:"",
          person_id_card:"",
          person_phone:"",
          id_card_front:"",
          id_card_back:"",
          address:"",
          contract:"",
          school_id:"",
          calendar_id:"",
        },
        Validata:{
          sell_model:[{ required: true, message: '请选择经营模式',trigger: 'blur' }],
          start_time:[{ required: true, message: '请选择承包开始日期',trigger: 'blur' }],
          end_time:[{ required: true, message: '请选择承包结束日期',trigger: 'blur' }],
          money:[{ required: true, message: '请输入',trigger: 'blur' }],
          name:[{ required: true, message: '请输入经营主体名称',trigger: 'blur' }],
          code:[{ required: true, message: '请输入信用代码',trigger: 'blur' }],
          license:[{ required: true, message: '请上传营业执照',trigger: 'blur' }],
          card_end_time:[{ required: true, message: '请选择到期日期',trigger: 'blur' }],
          card_number:[{ required: true, message: '请输入许可证编号',trigger: 'blur' }],
          card_img:[{ required: true, message: '请上传证件图片',trigger: 'blur' }],
          person_name:[{ required: true, message: '请输入姓名',trigger: 'blur' }],
          person_id_card:[{ required: true, message: '请输入身份证号',trigger: 'blur' }],
          person_phone:[{ required: true, message: '请输入手机号',trigger: 'blur' }],
          id_card_front:[{ required: true, message: '请上传正面图',trigger: 'blur' }],
          id_card_back:[{ required: true, message: '请上传反面图',trigger: 'blur' }],
          address:[{ required: true, message: '请输入家庭住址',trigger: 'blur' }],
          contract:[{ required: true, message: '请上传',trigger: 'blur' }],
        },
        endOpen: false,
        semester:["1学期"],
      }
    },
    components:{
      goback
    },
    created(){
       var {school_id,calendar_id} = this.$route.query;
       this.postData.school_id = school_id;
       this.postData.calendar_id = calendar_id;
    },
    methods:{
      getImg(data,type){
        if(data.length!==0){
          if(type=="contract"){
            this.postData[type] = data
          }else{
            this.postData[type] = data[0].url
          }
        }else{
          this.postData[type] = ""
        }
        this.$refs.formModel.clearValidate(type);
      },
      checkTim(type){         //选择承包起止日期
         this.$refs.formModel.clearValidate(type);
      },
      saves(){             //保存
        this.$refs.formModel.validate(valid => {
          if (valid) {
            this.$store.commit("sch_setLoaing",true)
            var allDatas = JSON.parse(JSON.stringify(this.postData));
            var imgs = []
            allDatas.contract.forEach((items)=>{
               imgs.push(items.url)
            })
            allDatas.contract = imgs
            this.$http.InfoSupermarketupdate(allDatas).then((res)=>{
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

      disabledStartDate(startValue) {
        const endValue = moment(this.postData.end_time);
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
      },
      disabledEndDate(endValue) {
        const startValue = moment(this.postData.start_time);
        if (!endValue || !startValue) {
          return false;
        }
        return startValue.valueOf() >= endValue.valueOf();
      },
      handleStartOpenChange(open) {
        if (!open) {
          this.endOpen = true;
        }
      },
      handleEndOpenChange(open) {
        this.endOpen = open;
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/OvertimeManagement/index.scss';
</style>
