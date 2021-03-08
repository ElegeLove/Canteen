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
          <span>学校：{{school}}</span>
        </div>
        <div>
          <span>学期：{{year}}</span>
        </div>
      </div>
      <div>
          <div class="titBoxs">
             <div class="iptBox">
               <div>
                 <p>学生人数：</p>
                 <div>
                   <div>{{postData.student_count}}人</div>
                 </div>
               </div>
               <div>
                 <p>容器式供水点数：</p>
                 <div>
                   <a-form-model-item ref="container_water_point" prop="container_water_point">
                    <a-input placeholder="请输入" v-model="postData.container_water_point" type="number"/>
                   </a-form-model-item>
                 </div>
               </div>
               <div>
                <p>供水点总数：</p>
                <div>
                  <a-form-model-item ref="total_point" prop="total_point">
                    <a-input placeholder="请输入" v-model="postData.total_point" type="number"/>
                  </a-form-model-item>
                </div>
               </div>
             </div>
             <div class="lookStu">
               <p @click="lookStu">查看学生情况</p>
               <div>提示：若数据与实际人数不符，请查看学生情况修正</div>
             </div>
          </div>
          <div>
            <div class="titles">
              <span>桶装水</span>
              <div></div>
            </div>
            <div class="rowsd">
              <div class="inputs">
                <p>点数：</p>
                <div>
                  <a-form-model-item ref="bucket_water_point" prop="bucket_water_point">
                    <a-input placeholder="请输入" v-model="postData.bucket_water_point" type="number"/>
                  </a-form-model-item>
                </div>
              </div>
              <div class="uploads">
                 <div>水质报告</div>
                 <a-form-model-item ref="bucket_water_image" prop="bucket_water_image">
                   <up-file @getImg="getImg($event,'bucket_water_image')" :max_num="5">
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
              <span>电热直供式（开水）</span>
              <div></div>
            </div>
            <div class="iptBox newsImd">
              <div>
                <p>点数：</p>
                <div>
                  <a-form-model-item ref="hot_water_point" prop="hot_water_point">
                    <a-input placeholder="请输入" class="smallIpt" v-model="postData.hot_water_point" type="number"/>
                  </a-form-model-item>
                </div>
              </div>
              <div class="margns">
                <p>设备质量：</p>
                <div>
                  <a-form-model-item ref="hot_water_quality" prop="hot_water_quality">
                    <a-input placeholder="请输入" class="smallIpt" v-model="postData.hot_water_quality"/>
                  </a-form-model-item>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="titles">
              <span>电热直供式（冷热开）</span>
              <div></div>
            </div>
            <div class="iptBox newsImd">
              <div>
                <p>点数：</p>
                <div>
                  <a-form-model-item ref="hot_cold_water_point" prop="hot_cold_water_point">
                    <a-input placeholder="请输入" class="smallIpt" v-model="postData.hot_cold_water_point"/>
                  </a-form-model-item>
                </div>
              </div>
              <div class="margns">
                <p>设备质量：</p>
                <div>
                  <a-form-model-item ref="hot_cold_water_quality" prop="hot_cold_water_quality">
                    <a-input placeholder="请输入" class="smallIpt" v-model="postData.hot_cold_water_quality"/>
                  </a-form-model-item>
                </div>
              </div>
              <div class="uploads margns">
                 <div>水质报告</div>
                 <a-form-model-item ref="hot_cold_water_image" prop="hot_cold_water_image">
                   <up-file @getImg="getImg($event,'hot_cold_water_image')" :max_num="5">
                       <div>
                         <a-icon type="plus" />
                         <div class="ant-upload-text">上传</div>
                       </div>
                    </up-file>
                  </a-form-model-item>
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
    </div>
     </a-form-model>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        postData:{
          school_id:"",
          calendar_id:"",
          student_count:"",
          container_water_point:"",
          total_point:"",
          bucket_water_point:"",
          bucket_water_image:[],
          hot_water_point:"",
          hot_water_quality:"",
          hot_cold_water_point:"",
          hot_cold_water_quality:"",
          hot_cold_water_image:[],
          remark:""
        },
        Validata:{
          container_water_point:[{ required: true, message: '请输入容器式供水点数',trigger: 'blur' }],
          total_point:[{ required: true, message: '请输入供水点总数',trigger: 'blur' }],
          bucket_water_point:[{ required: true, message: '请输入点数',trigger: 'blur' }],
          hot_water_point:[{ required: true, message: '请输入点数',trigger: 'blur' }],
          hot_water_quality:[{ required: true, message: '请输入设备质量',trigger: 'blur' }],
          hot_cold_water_point:[{ required: true, message: '请输入点数',trigger: 'blur' }],
          hot_cold_water_quality:[{ required: true, message: '请输入设备质量',trigger: 'blur' }],
          bucket_water_image:[{ required: true, message: '请上传水质报告'}],
          hot_cold_water_image:[{ required: true, message: '请上传水质报告'}],
          remark:[{ required: true, message: '请输入备注',trigger: 'blur' }],
        },
        year:"",
        school:""
      }
    },
    components:{
      goback
    },
    created(){
       var {years,school,school_id,calendar_id,total_count} = this.$route.query;
       this.year = years;
       this.school = school;
       this.postData.school_id = school_id
       this.postData.calendar_id = calendar_id
       this.postData.student_count = total_count
    },
    methods:{
      saves(){             //保存
        this.$refs.formModel.validate(valid => {
          if (valid) {
            this.$store.commit("sch_setLoaing",true)
            var allDatas = JSON.parse(JSON.stringify(this.postData));
            var bucket_water_image = []
            var hot_cold_water_image = []
            allDatas.bucket_water_image.forEach((items)=>{
               bucket_water_image.push(items.url)
            })
            allDatas.hot_cold_water_image.forEach((items)=>{
               hot_cold_water_image.push(items.url)
            })
            allDatas.bucket_water_image = bucket_water_image
            allDatas.hot_cold_water_image = hot_cold_water_image
            this.$http.InfoWaterUpdate(allDatas).then((res)=>{
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
          this.postData[type] = data
          this.$refs.formModel.clearValidate(type);
        }else{
          this.postData[type] = ""
        }
      },
      lookStu(){         //查看学生情况
        this.$router.push({path:"/ManagementPanel/StudentNum"})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/DrinkingWater/index.scss';
</style>
