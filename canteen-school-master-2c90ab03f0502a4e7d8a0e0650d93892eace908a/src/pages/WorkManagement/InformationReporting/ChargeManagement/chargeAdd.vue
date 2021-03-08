<template>
  <div>
    <goback title="返回"/>
    <a-form-model ref="formModel" :model="postData" :rules="Validata">
    <div class="padBox">
      <div class="top_box">
        <div>
          <span>学校：{{full_name}}</span>
        </div>
        <div>
          <span>年份：{{year}}年</span>
        </div>
        <div>
          <span>月份：{{month}}月</span>
        </div>
      </div>
      <div class="addDays">
        <p>就餐天数（天）：</p>
        <div>
          <a-form-model-item ref="eat_day" prop="eat_day">
            <a-input placeholder="请输入"
            :maxLength="10"
             @change="regIpt('eat_day')"
             v-model="postData.eat_day"/>
          </a-form-model-item>
        </div>
      </div>
       <div>
         <div class="titles">
           <span>幼儿园伙食费标准（元）</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>早餐：</p>
              <div>
                <a-form-model-item ref="child_breakfast" prop="child_breakfast">
                  <a-input placeholder="请输入"
                  :maxLength="10"
                   @change="regIpt('child_breakfast')"
                   @input="setTotal('child_total',1)"
                   v-model="postData.child_breakfast"/>
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>午餐：</p>
              <div>
                 <a-form-model-item ref="child_lunch" prop="child_lunch">
                   <a-input placeholder="请输入"
                   :maxLength="10"
                    @change="regIpt('child_lunch')"
                    @input="setTotal('child_total',1)"
                    v-model="postData.child_lunch"/>
                 </a-form-model-item>
              </div>
            </div>
            <div>
              <p>晚餐：</p>
              <div>
                <a-form-model-item ref="child_dinner" prop="child_dinner">
                  <a-input placeholder="请输入"
                  :maxLength="10"
                  @input="setTotal('child_total',1)"
                   @change="regIpt('child_dinner')"
                   v-model="postData.child_dinner"/>
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>点心：</p>
              <div>
                <a-form-model-item ref="child_snack" prop="child_snack">
                  <a-input placeholder="请输入"
                  :maxLength="10"
                  @input="setTotal('child_total',1)"
                   @change="regIpt('child_snack')"
                   v-model="postData.child_snack"/>
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>几点：</p>
              <div>
                <a-form-model-item ref="child_spot" prop="child_spot">
                  <a-input placeholder="请输入"
                  :maxLength="10"
                  @input="setTotal('child_total',1)"
                   @change="regIpt('child_spot')"
                   v-model="postData.child_spot"/>
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>几餐：</p>
              <div>
                <a-form-model-item ref="child_count" prop="child_count">
                  <a-input placeholder="请输入"
                  :maxLength="10"
                  @input="setTotal('child_total',1)"
                   @change="regIpt('child_count')"
                   v-model="postData.child_count"/>
                </a-form-model-item>
              </div>
            </div>
            <div class="setNum">
              <div class="noHeight">
                <span>全天：{{child_total}}元</span>
              </div>
            </div>
         </div>
       </div>
       <div>
         <div class="titles">
           <span>其他学段伙食费标准（元）</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>早餐：</p>
              <div>
                <a-form-model-item ref="other_breakfast" prop="other_breakfast">
                  <a-input placeholder="请输入"
                  :maxLength="10"
                   @change="regIpt('other_breakfast')"
                   @input="setTotal('outh_total',2)"
                   v-model="postData.other_breakfast"/>
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>午餐：</p>
              <div>
                <a-form-model-item ref="other_lunch" prop="other_lunch">
                  <a-input placeholder="请输入"
                  :maxLength="10"
                   @change="regIpt('other_lunch')"
                   @input="setTotal('outh_total',2)"
                   v-model="postData.other_lunch"/>
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>晚餐：</p>
              <div>
                <a-form-model-item ref="other_dinner" prop="other_dinner">
                  <a-input placeholder="请输入"
                  :maxLength="10"
                    @change="regIpt('other_dinner')"
                    @input="setTotal('outh_total',2)"
                   v-model="postData.other_dinner"/>
                </a-form-model-item>
              </div>
            </div>
            <div class="setNum">
              <div class="noHeight">
                <span>全天：{{outh_total}}元</span>
              </div>
            </div>
         </div>
       </div>
       <div>
         <div class="titles">
           <span>学生每天就餐情况</span>
           <div></div>
         </div>
         <div class="iptBox">
            <div>
              <p>早餐人次：</p>
              <div>
                <a-form-model-item ref="student_breakfast_count" prop="student_breakfast_count">
                  <a-input placeholder="请输入"
                   @change="regNums('student_breakfast_count')"
                   @input="setTotal('stu_total',3)"
                   :maxLength="7"
                   v-model="postData.student_breakfast_count"/>
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>午餐人次：</p>
              <div>
                <a-form-model-item ref="student_lunch_count" prop="student_lunch_count">
                  <a-input placeholder="请输入"
                  @input="setTotal('stu_total',3)"
                   @change="regNums('student_lunch_count')"
                   :maxLength="7"
                   v-model="postData.student_lunch_count"/>
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>晚餐人次：</p>
              <div>
                <a-form-model-item ref="student_dinner_count" prop="student_dinner_count">
                  <a-input placeholder="请输入"
                  @input="setTotal('stu_total',3)"
                  :maxLength="7"
                   @change="regNums('student_dinner_count')"
                   v-model="postData.student_dinner_count"/>
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>点心人次：</p>
              <div>
                <a-form-model-item ref="student_cake_count" prop="student_cake_count">
                  <a-input placeholder="请输入"
                  @input="setTotal('stu_total',3)"
                  :maxLength="7"
                   @change="regNums('student_cake_count')"
                   v-model="postData.student_cake_count"/>
                </a-form-model-item>
              </div>
            </div>
            <div class="setNum">
              <div class="noHeight">
                <span>全校就餐总人次：{{stu_total}}人次</span>
              </div>
            </div>
         </div>
       </div>
       <div>
          <div class="titles">
            <span>本月教职工就餐情况</span>
            <div></div>
          </div>
          <div class="new_boxsd">
            <p>总人次</p>
            <div>
              <div>
                <p>月人次：</p>
                <a-form-model-item ref="month_total_count" prop="month_total_count">
                  <a-input placeholder="请输入"
                  :maxLength="7"
                   @change="regNums('month_total_count')"
                   v-model="postData.month_total_count"/>
                </a-form-model-item>
              </div>
              <div>
                <p>日平均人次：</p>
                <a-form-model-item ref="month_day_count" prop="month_day_count">
                  <a-input placeholder="请输入"
                  :maxLength="7"
                   @change="regNums('month_day_count')"
                   v-model="postData.month_day_count"/>
                </a-form-model-item>
              </div>
            </div>
          </div>
          <div class="new_boxsd">
            <p>早餐人次</p>
            <div>
              <div>
                <p>日平均人次：</p>
                <a-form-model-item ref="month_breakfast_day_count" prop="month_breakfast_day_count">
                  <a-input placeholder="请输入"
                  :maxLength="7"
                   @change="regNums('month_breakfast_day_count')"
                   v-model="postData.month_breakfast_day_count"/>
                </a-form-model-item>
              </div>
               <div class="upds">
                 <p>上传本月就餐名单:</p>
                <a-tooltip placement="top" v-if="postData.month_breakfast_day_list==''">
                   <template slot="title">
                     <span>请先下载模板，在模板表格中填写信息后，再导入表格</span>
                   </template>
                   <div class="downLoad">
                     <span @click="importModule('month_breakfast_day_list')">导入教职工</span>
                     <span @click="downLoad">下载模板</span>
                   </div>
                 </a-tooltip>
                 <div class="fileView main_color" v-else>
                   <span class="main_color">本月就餐名单</span>
                   <a-icon type="delete" @click="deleFile('month_breakfast_day_list')"/>
                 </div>
               </div>
            </div>
          </div>
          <div class="new_boxsd">
            <p>午餐人次</p>
            <div>
              <div>
                <p>日平均人次：</p>
                <a-form-model-item ref="month_lunch_day_count" prop="month_lunch_day_count">
                  <a-input placeholder="请输入"
                  :maxLength="7"
                   @change="regNums('month_lunch_day_count')"
                   v-model="postData.month_lunch_day_count"/>
                </a-form-model-item>
              </div>
               <div class="upds">
                 <p>上传本月就餐名单:</p>
                 <a-tooltip placement="top" v-if="postData.month_lunch_day_list==''">
                   <template slot="title">
                     <span>请先下载模板，在模板表格中填写信息后，再导入表格</span>
                   </template>
                   <div class="downLoad">
                     <span @click="importModule('month_lunch_day_list')">导入教职工</span>
                     <span @click="downLoad">下载模板</span>
                   </div>
                 </a-tooltip>
                 <div class="fileView main_color" v-else>
                   <span class="main_color">本月就餐名单</span>
                   <a-icon type="delete" @click="deleFile('month_lunch_day_list')"/>
                 </div>
               </div>
            </div>
          </div>
          <div class="new_boxsd">
            <p>晚餐人次</p>
            <div>
              <div>
                <p>日平均人次：</p>
                <a-form-model-item ref="month_dinner_day_count" prop="month_dinner_day_count">
                  <a-input placeholder="请输入"
                  :maxLength="7"
                   @change="regNums('month_dinner_day_count')"
                   v-model="postData.month_dinner_day_count"/>
                </a-form-model-item>
              </div>
               <div class="upds">
                 <p>上传本月就餐名单:</p>
                 <a-tooltip placement="top" v-if="postData.month_dinner_day_list==''">
                   <template slot="title">
                     <span>请先下载模板，在模板表格中填写信息后，再导入表格</span>
                   </template>
                   <div class="downLoad">
                     <span @click="importModule('month_dinner_day_list')">导入教职工</span>
                     <span @click="downLoad">下载模板</span>
                   </div>
                 </a-tooltip>
                 <div class="fileView main_color" v-else>
                   <span class="main_color">本月就餐名单</span>
                   <a-icon type="delete" @click="deleFile('month_dinner_day_list')"/>
                 </div>
               </div>
            </div>
          </div>
          <div class="new_boxsd">
            <p>缴费额</p>
            <div>
              <div>
                <p>年度累计数：</p>
                <a-form-model-item ref="money" prop="money">
                  <a-input placeholder="请输入"
                    @change="regIpt('money')"
                    :maxLength="10"
                   class="bot_ipt" v-model="postData.money"/>
                   <span>元</span>
                </a-form-model-item>
              </div>
              <div>
                <p>本月数：</p>
                <a-form-model-item ref="month_money" prop="month_money">
                  <a-input placeholder="请输入"
                   @change="regIpt('month_money')"
                   :maxLength="10"
                   class="bot_ipt" v-model="postData.month_money"/>
                   <span>元</span>
                </a-form-model-item>
              </div>
            </div>
          </div>
       </div>
       <div class="textAreas">
         <div class="titles">
           <span>备注</span>
           <div></div>
         </div>
         <a-textarea :maxLength="50" placeholder="限制输入50个字" :rows="4" v-model="postData.remark"/>
       </div>
       <a-button type="primary" class="btns" @click="saves">提交</a-button>
       <impmodule ref="upfile" @getFiles="getFile"/>
    </div>
    </a-form-model>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  import impmodule from "../../../../components/ImportModule.vue"
  import {put} from "../../../../assets/js/upload.js"
  export default{
    data(){
      return{
        child_total:0,        //幼儿园伙食费标准合计
        outh_total:0,        //其他学段伙食费标准合计
        stu_total:0,            //学生每天就餐情况总人次
        fileSave:"",            //导入教职工  点击的是谁
         full_name:"",
         year:"",
         month:"",
         downloadUrl:"",               //模板下载路径
         postData:{
           school_id:"",
           week_id:"",
           eat_day:"",
           child_breakfast:"",
           child_lunch:"",
           child_dinner:"",
           child_snack:"",
           child_spot:"",
           child_count:"",
           other_breakfast:"",
           other_lunch:"",
           other_dinner:"",
           student_breakfast_count:"",
           student_lunch_count:"",
           student_dinner_count:"",
           student_cake_count:"",
           month_total_count:"",
           month_day_count:"",
           month_lunch_day_count:"",
           month_dinner_day_count:"",
           month_breakfast_day_count:"",
           month_lunch_day_list:"",
           month_dinner_day_list:"",
           month_breakfast_day_list:"",
           money:"",
           month_money:"",
           remark:""
         },
         Validata:{}
      }
    },
    components:{
      goback,impmodule
    },
    created(){
      var localData = JSON.parse(localStorage.getItem("localInfo"))
      this.full_name = localData.full_name;
      this.loadValidata();
      this.getDownLoadUrl();
      this.year = localData.year;
      this.month = localData.month;
      this.postData.school_id = localData.school_id;
      this.postData.week_id = localData.week_id;
    },
    methods:{
      setTotal(key,type){         //计算
        var {child_breakfast,child_lunch,child_dinner,child_snack,child_spot,child_count,other_breakfast,other_lunch,other_dinner,student_breakfast_count,
          student_lunch_count,student_dinner_count,student_cake_count
        } = this.postData;
        var keyArr = [];
        if(type==1){
          keyArr = [child_breakfast,child_lunch,child_dinner,child_snack,child_spot,child_count];
        }else if(type==2){
          keyArr = [other_breakfast,other_lunch,other_dinner];
        }else{
          keyArr = [student_breakfast_count,student_lunch_count,student_dinner_count,student_cake_count];
        }
        var alls = keyArr.reduce((total,num)=>{
          return Number(total)+Number(num);
        })
        this[key] = alls;
      },
      deleFile(key){            //删除文件
        this.postData[key] = "";
      },
      saves(){           //提交
        this.$refs.formModel.validate(valid => {
          if (valid) {
            this.$store.commit("sch_setLoaing",true)
            var allDatas = JSON.parse(JSON.stringify(this.postData));
            this.$http.InformationChargeAdd(allDatas).then((res)=>{
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
      loadValidata() { //初始验证
        var arr = ["eat_day","child_breakfast", "child_lunch", "child_dinner", "child_snack",
          "child_spot", "child_count","other_breakfast", "other_lunch", "other_dinner", "student_breakfast_count", "student_lunch_count",
          "student_dinner_count", "student_cake_count",
          "month_total_count", "month_day_count", "month_lunch_day_count", "month_dinner_day_count", "month_breakfast_day_count", "money","month_money"
        ];
        var valis = {}
        arr.forEach((item) => {
          valis[item] = [{
            required: true,
            message: '请输入',
            trigger: 'blur'
          }]
        })
        this.Validata = valis
      },
      getDownLoadUrl(call){           //获取模板下载路径
         this.$http.CommonDownloadTemplate().then((res)=>{
           if(res.code==1){
             this.downloadUrl = res.data.staff_dining_list;
             if(call!==undefined){
               call()
             }
           }
         })
      },
      downLoad(){          //下载模板
        if(this.downloadUrl!==''){
          window.open(this.downloadUrl)
        }else{
          this.getDownLoadUrl(()=>{
             window.open(this.downloadUrl)
          })
        }
      },
      regIpt(type) { //限制整数
        this.postData[type] = this.$commonJs.regMoney(this.postData[type])
      },
      regNums(type){           //限制纯数字
        this.postData[type] = this.postData[type].replace(/[^\d]/g, '')
      },
      getFile(file){        //获取文件
         const hide = this.$message.loading('上传中', 0);
        var fileName = parseInt(Math.random() * 10000) + file.name;
        put(fileName, file).then(result => {
          setTimeout(hide, 0);
          this.$message.success('上传成功');
          this.postData[this.fileSave] = result.url;
        }).catch(e => {
          setTimeout(hide, 0);
          this.$message.error('导入失败');
        })
      },
      importModule(type){        //导入教职工
        this.fileSave = type;
        this.$refs.upfile.upFile();
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/ChargeManagement/index.scss';
</style>
