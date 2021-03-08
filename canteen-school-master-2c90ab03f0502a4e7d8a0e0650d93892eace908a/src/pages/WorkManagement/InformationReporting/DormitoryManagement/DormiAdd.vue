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
        <div>
          <div class="iptBox">
            <div>
              <p>寄宿男生人数：</p>
              <div>
                <a-form-model-item ref="boy_count" prop="boy_count">
                  <a-input placeholder="请输入"
                  @change="regIpt('boy_count')"
                  @input="getToal"
                  v-model="postData.boy_count"/>
                </a-form-model-item>
                <span>人</span>
              </div>
            </div>
            <div>
              <p>寄宿女生人数：</p>
              <div>
                <a-form-model-item ref="girl_count" prop="girl_count">
                  <a-input placeholder="请输入"
                   @change="regIpt('girl_count')"
                   @input="getToal"
                   v-model="postData.girl_count"/>
                </a-form-model-item>
                <span>人</span>
              </div>
            </div>
            <div class="setNum">
              <div>
                <span>合计：{{postData.total_count}}人</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="titles">
            <span>男生寝室</span>
            <div></div>
          </div>
          <div class="iptBox">
              <div>
                <p>栋数：</p>
                <div>
                   <a-form-model-item ref="boy_tung_count" prop="boy_tung_count">
                     <a-input placeholder="请输入"
                      @change="regIpt('boy_tung_count')"
                      v-model="postData.boy_tung_count"/>
                   </a-form-model-item>
                  <span>栋</span>
                </div>
              </div>
              <div>
                <p>间数：</p>
                <div>
                  <a-form-model-item ref="boy_room_count" prop="boy_room_count">
                    <a-input placeholder="请输入"
                    @change="regIpt('boy_room_count')"
                    v-model="postData.boy_room_count"/>
                  </a-form-model-item>
                  <span>间</span>
                </div>
              </div>
              <div>
                <p>床位数：</p>
                <div>
                  <a-form-model-item ref="boy_bed_count" prop="boy_bed_count">
                    <a-input placeholder="请输入"
                     @change="regIpt('boy_bed_count')"
                     v-model="postData.boy_bed_count"/>
                  </a-form-model-item>
                  <span>床</span>
                </div>
              </div>
            </div>
            <div class="iptBox">
                <div>
                  <p>淋浴间数：</p>
                  <div>
                    <a-form-model-item ref="boy_shower_count" prop="boy_shower_count">
                      <a-input placeholder="请输入"
                       @change="regIpt('boy_shower_count')"
                       v-model="postData.boy_shower_count"/>
                    </a-form-model-item>
                    <span>间</span>
                  </div>
                </div>
                <div>
                  <p>是否有热水：</p>
                  <div>
                    <a-form-model-item ref="boy_is_hot" prop="boy_is_hot">
                      <a-radio-group name="radioGroup" v-model="postData.boy_is_hot">
                          <a-radio :value="1">是</a-radio>
                          <a-radio :value="2">否</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </div>
                </div>
                <div>
                  <p>管理员人数：</p>
                  <div>
                    <a-form-model-item ref="boy_admin_count" prop="boy_admin_count">
                      <a-input placeholder="请输入"
                       @change="regIpt('boy_admin_count')"
                       v-model="postData.boy_admin_count"/>
                    </a-form-model-item>
                    <span>人</span>
                  </div>
                </div>
              </div>
          </div>
        <div>
          <div class="titles">
            <span>女生寝室</span>
            <div></div>
          </div>
          <div class="iptBox">
              <div>
                <p>栋数：</p>
                <div>
                  <a-form-model-item ref="girl_tung_count" prop="girl_tung_count">
                    <a-input placeholder="请输入"
                     @change="regIpt('girl_tung_count')"
                     v-model="postData.girl_tung_count"/>
                  </a-form-model-item>
                  <span>栋</span>
                </div>
              </div>
              <div>
                <p>间数：</p>
                <div>
                  <a-form-model-item ref="girl_room_count" prop="girl_room_count">
                    <a-input placeholder="请输入"
                     @change="regIpt('girl_room_count')"
                     v-model="postData.girl_room_count"/>
                  </a-form-model-item>
                  <span>间</span>
                </div>
              </div>
              <div>
                <p>床位数：</p>
                <div>
                  <a-form-model-item ref="girl_bed_count" prop="girl_bed_count">
                    <a-input placeholder="请输入"
                     @change="regIpt('girl_bed_count')"
                     v-model="postData.girl_bed_count"/>
                  </a-form-model-item>
                  <span>床</span>
                </div>
              </div>
            </div>
            <div class="iptBox">
                <div>
                  <p>淋浴间数：</p>
                  <div>
                    <a-form-model-item ref="girl_shower_count" prop="girl_shower_count">
                      <a-input placeholder="请输入"
                       @change="regIpt('girl_shower_count')"
                       v-model="postData.girl_shower_count"/>
                    </a-form-model-item>
                    <span>间</span>
                  </div>
                </div>
                <div>
                  <p>是否有热水：</p>
                  <div>
                    <a-form-model-item ref="girl_is_hot" prop="girl_is_hot">
                      <a-radio-group name="radioGroup" v-model="postData.girl_is_hot">
                          <a-radio :value="1">是</a-radio>
                          <a-radio :value="2">否</a-radio>
                      </a-radio-group>
                    </a-form-model-item>
                  </div>
                </div>
                <div>
                  <p>管理员人数：</p>
                  <div>
                    <a-form-model-item ref="girl_admin_count" prop="girl_admin_count">
                      <a-input placeholder="请输入"
                      @change="regIpt('girl_admin_count')"
                      v-model="postData.girl_admin_count"/>
                    </a-form-model-item>
                    <span>人</span>
                  </div>
                </div>
              </div>
          </div>
          <div class="textAreas">
            <div class="titles">
              <span>备注</span>
              <div></div>
            </div>
            <a-form-model-item ref="remark" prop="remark">
              <a-textarea :maxLength="50" placeholder="限制输入50个字" :rows="4" v-model="postData.remark"/>
            </a-form-model-item>
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
        postData:{
          school_id:"",
          calendar_id:"",
          boy_count:"",
          girl_count:"",
          total_count:0,
          boy_tung_count:"",
          boy_room_count:"",
          boy_bed_count:"",
          boy_shower_count:"",
          boy_is_hot:1,
          boy_admin_count:"",
          girl_tung_count:"",
          girl_room_count:"",
          girl_bed_count:"",
          girl_shower_count:"",
          girl_is_hot:1,
          girl_admin_count:"",
          remark:""
        },
        Validata:{
          boy_count:[{ required: true, message: '请输入寄宿男生人数',trigger: 'blur' }],
          girl_count:[{ required: true, message: '请输入寄宿女生数量',trigger: 'blur' }],
          boy_tung_count:[{ required: true, message: '请输入栋数',trigger: 'blur' }],
          boy_room_count:[{ required: true, message: '请输入间数',trigger: 'blur' }],
          boy_bed_count:[{ required: true, message: '请输入床位数',trigger: 'blur' }],
          boy_shower_count:[{ required: true, message: '请输入淋浴间数',trigger: 'blur' }],
          boy_admin_count:[{ required: true, message: '请输入管理员人数',trigger: 'blur' }],
          girl_tung_count:[{ required: true, message: '请输入栋数',trigger: 'blur'}],
          girl_room_count:[{ required: true, message: '请输入间数',trigger: 'blur'}],
          girl_bed_count:[{ required: true, message: '请输入床位数',trigger: 'blur' }],
          girl_shower_count:[{ required: true, message: '请输入淋浴间数',trigger: 'blur' }],
          girl_admin_count:[{ required: true, message: '请输入管理员人数',trigger: 'blur' }],
          remark:[{ required: true, message: '请输入备注',trigger: 'blur' }],
        },
      }
    },
    components:{
      goback
    },
    created(){
      var {year,school_id,calendar_id} = this.$route.query;
      this.year = year;
      this.postData.calendar_id = calendar_id;
      this.postData.school_id = school_id;
    },
    methods:{
      regIpt(type){              //限制整数
        this.postData[type] = this.postData[type].replace(/[^\d]/g, '')
      },
      getToal(){      //计算总数
        var {boy_count,girl_count} = this.postData
        this.postData.total_count = Number(boy_count)+Number(girl_count)
      },
      saves(){             //保存
        this.$refs.formModel.validate(valid => {
          if (valid) {
            this.$store.commit("sch_setLoaing",true)
            var allDatas = JSON.parse(JSON.stringify(this.postData));
            this.$http.InfoRoomupdate(allDatas).then((res)=>{
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
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/DormitoryManagement/index.scss';
</style>
