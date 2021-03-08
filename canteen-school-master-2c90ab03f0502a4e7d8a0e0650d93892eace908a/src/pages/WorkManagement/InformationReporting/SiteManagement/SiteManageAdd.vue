<template>
  <div>
    <goback title="返回"/>
    <a-form-model ref="formModel" :model="postData" :rules="Validata">
    <div class="padBox">
      <div class="top_box">
        <div>
          <span>学校：{{school}}</span>
        </div>
        <div>
          <span>学期：{{year}}</span>
        </div>
      </div>
       <div>
         <div class="titles">
           <span>最多就餐学生数</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>最多就餐学生人数：</p>
              <div>
                <a-form-model-item ref="max_student" prop="max_student">
                  <a-input placeholder="请输入"
                   @change="regIpt('max_student')"
                   v-model="postData.max_student"/>
                </a-form-model-item>
              </div>
            </div>
         </div>
         <div class="titles">
           <span>最多就餐职工数</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>最多就餐教职工人数（正式）：</p>
              <div>
                <a-form-model-item ref="max_worker_formal" prop="max_worker_formal">
                  <a-input placeholder="请输入"
                   @change="regIpt('max_worker_formal')"
                   @input="setTotal"
                   v-model="postData.max_worker_formal"/>
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>最多就餐教职工人数（临时）：</p>
              <div>
                <a-form-model-item ref="max_worker_temporary" prop="max_worker_temporary">
                  <a-input placeholder="请输入"
                    @input="setTotal"
                    @change="regIpt('max_worker_temporary')"
                   v-model="postData.max_worker_temporary"/>
                </a-form-model-item>
              </div>
            </div>
            <div class="setNum noHeight">
              <div>
                <span>最多就餐教职工人数合计：{{postData.max_total}}人</span>
              </div>
            </div>
         </div>
       </div>
        <div>
          <div class="titles">
            <span>加工间</span>
            <div></div>
          </div>
          <div class="iptBox">
             <div>
               <p>面积：</p>
               <div>
                 <a-form-model-item ref="processing_room_area" prop="processing_room_area">
                   <a-input placeholder="请输入" type="number" v-model="postData.processing_room_area"/>
                 </a-form-model-item>
                 <span>㎡</span>
               </div>
             </div>
          </div>
        </div>
       <div>
         <div class="titles">
           <span>库房</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>间数：</p>
              <div>
                <a-form-model-item ref="storage_room_count" prop="storage_room_count">
                  <a-input placeholder="请输入"
                   @change="regIpt('storage_room_count')"
                   v-model="postData.storage_room_count"/>
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>总面积：</p>
              <div>
                <a-form-model-item ref="storage_room_area" prop="storage_room_area">
                  <a-input placeholder="请输入" type="number" v-model="postData.storage_room_area"/>
                </a-form-model-item>
                <span>㎡</span>
              </div>
            </div>
         </div>
       </div>
       <div>
         <div class="titles">
           <span>学生餐厅</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>面积：</p>
              <div>
                <a-form-model-item ref="student_room_count" prop="student_room_count">
                  <a-input placeholder="请输入" type="number" v-model="postData.student_room_count"/>
                </a-form-model-item>
                <span>㎡</span>
              </div>
            </div>
            <div>
              <p>座位数：</p>
              <div>
                <a-form-model-item ref="student_room_set" prop="student_room_set">
                  <a-input placeholder="请输入"
                   @change="regIpt('student_room_set')"
                   v-model="postData.student_room_set"/>
                </a-form-model-item>
              </div>
            </div>
         </div>
       </div>
        <div>
          <div class="titles">
            <span>教师餐厅</span>
            <div></div>
          </div>
          <div class="iptBox">
             <div>
               <p>面积：</p>
               <div>
                 <a-form-model-item ref="teacher_room_count" prop="teacher_room_count">
                   <a-input placeholder="请输入" type="number" v-model="postData.teacher_room_count"/>
                 </a-form-model-item>
                 <span>㎡</span>
               </div>
             </div>
             <div>
               <p>座位数：</p>
               <div>
                 <a-form-model-item ref="teacher_room_set" prop="teacher_room_set">
                   <a-input placeholder="请输入"
                    @change="regIpt('teacher_room_set')"
                    v-model="postData.teacher_room_set"/>
                 </a-form-model-item>
               </div>
             </div>
          </div>
        </div>
       <div>
         <div class="titles">
           <span>其他用房</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>间数：</p>
              <div>
                <a-form-model-item ref="other_room_count" prop="other_room_count">
                  <a-input placeholder="请输入"
                    @change="regIpt('other_room_count')"
                   v-model="postData.other_room_count"/>
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>总面积：</p>
              <div>
                <a-form-model-item ref="other_room_area" prop="other_room_area">
                  <a-input placeholder="请输入" v-model="postData.other_room_area" type="number"/>
                </a-form-model-item>
                <span>㎡</span>
              </div>
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
        year: "",
        school: "",
        postData:{
          school_id:"",
          calendar_id:"",
          max_student:"",
          max_worker_formal:"",
          max_worker_temporary:"",
          max_total:0,
          processing_room_area:"",
          storage_room_count:"",
          student_room_count:"",
          student_room_set:"",
          teacher_room_count:"",
          teacher_room_set:"",
          other_room_count:"",
          other_room_area:""
        },
        Validata:{
          max_student:[{ required: true, message: '请输入学生人数',trigger: 'blur' }],
          max_worker_formal:[{ required: true, message: '请输入教职工人数',trigger: 'blur' }],
          max_worker_temporary:[{ required: true, message: '请输入教职工人数',trigger: 'blur' }],
          processing_room_area:[{ required: true, message: '请输入面积',trigger: 'blur' }],
          storage_room_count:[{ required: true, message: '请输入间数',trigger: 'blur' }],
          storage_room_area:[{ required: true, message: '请输入面积',trigger: 'blur' }],
          student_room_count:[{ required: true, message: '请输入面积',trigger: 'blur' }],
          student_room_set:[{ required: true, message: '请输入座位数',trigger: 'blur' }],
          teacher_room_count:[{ required: true, message: '请输入面积',trigger: 'blur' }],
          teacher_room_set:[{ required: true, message: '请输入座位数',trigger: 'blur' }],
          other_room_count:[{ required: true, message: '请输入间数',trigger: 'blur' }],
          other_room_area:[{ required: true, message: '请输入面积',trigger: 'blur' }],
        },
      }
    },
    components:{
      goback
    },
    created(){
      var {
        years,
        school,
        calendar_id,
        school_id
      } = JSON.parse(localStorage.getItem("localInfo"));
      this.year = years;
      this.school = school;
      this.postData.calendar_id = calendar_id;
      this.postData.school_id = school_id;
    },
    methods:{
      regIpt(type) { //限制整数
        this.postData[type] = this.postData[type].replace(/[^\d]/g, '')
      },
      setTotal(){         //计算最多就餐教职工人数合计
        var {max_worker_formal,max_worker_temporary} = this.postData;
         this.postData.max_total = Number(max_worker_formal)+Number(max_worker_temporary)
      },
      saves(){        //保存
        this.$refs.formModel.validate(valid => {
          if (valid) {
            this.$store.commit("sch_setLoaing",true)
            var allDatas = JSON.parse(JSON.stringify(this.postData));
            this.$http.InfoPlaceUpdate(allDatas).then((res)=>{
              this.$store.commit("sch_setLoaing",false)
              if(res.code==1){
                this.$router.go(-1)
              }
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/SiteManagement.scss';
</style>
