<template>
  <div>
    <goback title="返回"/>
    <a-form :form="form" @submit="handleSubmit">
    <div class="padBox" v-if="allData!==''">
      <a-tabs v-model="typekey" tabPosition="top" @change="checkTab">
        <a-tab-pane :tab="item.full_name" :key="index" v-for="(item,index) in schoolData"></a-tab-pane>
      </a-tabs>
      <div class="checkScoll">
        <span>学期：{{$route.query.years}}</span>
      </div>
      <div>
         <div>
           <div class="titles">
             <span>基本情况</span>
             <div></div>
           </div>
           <div class="contBox">
             <div class="rowboxs">
                <div>学校代码：{{allData.schoolInfo.id}}</div>
                <div>学校简称：{{allData.schoolInfo.abbreviation}}</div>
                <div v-show="school_type==0">所属片区：{{allData.schoolInfo.area}}</div>
             </div>
             <div class="rowboxs">
                <div v-show="school_type==0">所属乡镇：{{allData.schoolInfo.township}}</div>
                <div>单位地址：{{allData.schoolInfo.address}}</div>
             </div>
             <div class="rowboxs">
                <div v-show="school_type==0">法定代表人姓名：{{allData.schoolInfo.legal_person}}</div>
                <div v-show="school_type==0">法定代表人电话：{{allData.schoolInfo.legal_person_mobile}}</div>
                <div v-show="school_type==1">幼儿园园长姓名：{{allData.schoolInfo.director}}</div>
                <div v-show="school_type==1">幼儿园园长电话：{{allData.schoolInfo.director_mobile}}</div>
             </div>
             <div class="rowboxs">
                <div>是否普惠园：{{allData.schoolInfo.inclusive_garden}}</div>
                <div>是否有食堂：{{allData.schoolInfo.is_canteen}}</div>
             </div>
           </div>
         </div>
         <div>
           <div class="titles">
             <span>学生人数</span>
             <div></div>
           </div>
           <div class="tips">
             <span class="main_color" @click="lookRouter('StudentNum')">查看学生情况</span>
             <div>提示：若数据与实际人数不符，请查看学生情况修正</div>
           </div>
           <div class="contBox">
             <div class="rowboxs">
                <div>幼儿：{{allData.studentInfo.child_count}}人</div>
                <div>小学：{{allData.studentInfo.pupil_count}}人</div>
                <div>初中：{{allData.studentInfo.junior_count}}人</div>
             </div>
             <div class="rowboxs">
                <div>高职中：{{allData.studentInfo.high_count}}人</div>
                <div>总数：{{allData.studentInfo.total_count}}人</div>
                <div>其他：{{allData.studentInfo.other_count}}人</div>
             </div>
           </div>
         </div>
         <div>
           <div class="titles">
             <span>用工人数</span>
             <div></div>
           </div>
           <div class="tips">
             <span class="main_color" @click="lookRouter('FacultyManagement/Faculty')">查看用工情况</span>
             <div>提示：若数据与实际人数不符，请查看用工情况修正</div>
           </div>
           <div class="contBox">
             <div class="rowboxs">
                <div>正式职工：{{allData.facultyInfo.formal_count}}人</div>
             </div>
           </div>
           <div class="contBox">
             <p>临时用工</p>
             <div class="rowboxs">
                <div>教师：{{allData.facultyInfo.teacher_count}}人</div>
                <div>保安：{{allData.facultyInfo.security_count}}人</div>
                <div>生活指导老师：{{allData.facultyInfo.life_teacher_count}}人</div>
             </div>
             <div class="rowboxs">
                <div>保育员：{{allData.facultyInfo.nursery_count}}人</div>
                <div>炊事员：{{allData.facultyInfo.cook_count}}人</div>
                <div>其他：{{allData.facultyInfo.other_count}}人</div>
             </div>
           </div>
         </div>
         <div v-if="school_type==0&&allData.expenditure.is_fill==0">
           <div class="titles">
             <span>上年度伙食支出</span>
             <div></div>
           </div>
            <div class="iptBox">
              <div>
                <p>食材:</p>
                <div>
                  <a-form-item>
                    <a-input placeholder="请输入" type="number" v-decorator="['last_year_food',Validata.last_year_food]"/>
                  </a-form-item>
                  <span>元</span>
                </div>
              </div>
              <div>
                <p>人工:</p>
                <div>
                   <a-form-item>
                      <a-input placeholder="请输入" type="number" v-decorator="['last_year_people',Validata.last_year_people]"/>
                   </a-form-item>
                  <span>元</span>
                </div>
              </div>
              <div>
                <p>运行费及其他:</p>
                <div>
                  <a-form-item>
                    <a-input placeholder="请输入" type="number" v-decorator="['last_year_other',Validata.last_year_other]"/>
                  </a-form-item>
                  <span>元</span>
                </div>
              </div>
            </div>
         </div>
         <div v-if="school_type==0&&allData.expenditure.is_fill==0">
           <div class="titles">
             <span>本年度伙食计划支出</span>
             <div></div>
           </div>
            <div class="iptBox">
              <div>
                <p>食材:</p>
                <div>
                  <a-form-item>
                    <a-input placeholder="请输入" type="number" v-decorator="['now_year_food',Validata.now_year_food]"/>
                  </a-form-item>
                  <span>元</span>
                </div>
              </div>
              <div>
                <p>人工:</p>
                <div>
                  <a-form-item>
                    <a-input placeholder="请输入" type="number" v-decorator="['now_year_people',Validata.now_year_people]"/>
                  </a-form-item>
                  <span>元</span>
                </div>
              </div>
              <div>
                <p>运行费及其他:</p>
                <div>
                  <a-form-item>
                    <a-input placeholder="请输入" type="number" v-decorator="['now_year_other',Validata.now_year_other]"/>
                  </a-form-item>
                  <span>元</span>
                </div>
              </div>
            </div>
         </div>
         <div class="btns">
           <a-button type="primary" html-type="submit" v-show="school_type==0&&allData.expenditure.is_fill==0">提交</a-button>
         </div>
      </div>
    </div>
    </a-form>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        semester:["全部","1学期"],
        typekey:0,
        schoolData:[],
        allData:"",
        form: this.$form.createForm(this),
        Validata:{
          last_year_food:{ rules: [{ required: true, message: '请输入' }]},
          last_year_people:{ rules: [{ required: true, message: '请输入' }]},
          last_year_other:{ rules: [{ required: true, message: '请输入' }]},
          now_year_food:{ rules: [{ required: true, message: '请输入' }]},
          now_year_people:{ rules: [{ required: true, message: '请输入' }]},
          now_year_other:{ rules: [{ required: true, message: '请输入' }]}
        },
        school_type:""
      }
    },
    components:{
      goback
    },
    methods:{
      lookRouter(route){         //查看学生情况
        this.$router.push({path:"/ManagementPanel/"+route})
      },
      getSchool(){          //获取其学校
        this.$http.InfoVillageInfo().then((res)=>{
          if(res.code==1){
            this.schoolData = res.data
            if(res.data.length!==0){
              this.getDetails(res.data[0].id)
              this.school_type = res.data[0].school_type
            }
          }
        })
      },
      getDetails(id){      //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.InfoSchoolinfo({id,calendar_id:this.$route.query.calendar_id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data;
            console.log(this.allData)
          }
        })
      },
      checkTab(e){           //切换tab
        this.school_type = this.schoolData[e].school_type;
        var id = this.schoolData[e].id;
        this.getDetails(id)
      },
      handleSubmit(){      //提交
        this.form.validateFields((err, values) => {
          if (!err) {
             this.$store.commit("sch_setLoaing",true);
            var newsObj = JSON.parse(JSON.stringify(values));
            newsObj.calendar_id = this.$route.query.calendar_id
            this.$http.InfoFoodExpenditure(newsObj).then((res)=>{
               this.$store.commit("sch_setLoaing",false)
              if(res.code==1){
                this.$router.go(-1)
              }
            })
          }
        });
      }
    },
    created(){
      this.type = this.$route.name;
      this.getSchool()
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/BasicInformation.scss';
</style>
