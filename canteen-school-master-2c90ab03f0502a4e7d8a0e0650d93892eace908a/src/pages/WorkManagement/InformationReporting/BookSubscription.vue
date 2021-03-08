<template>
  <div>
    <goback title="返回" />
    <a-form-model ref="formModel" :model="postData" :rules="Validata">
      <div class="boxs">
        <div class="top_box">
          <div>
            <span>学校：{{school}}</span>
          </div>
          <div>
            <span>学期：{{year}}</span>
          </div>
        </div>
        <div class="titles">
          <span>作业本数量标准</span>
          <div></div>
        </div>
        <div class="alls">
          <div class="rowBoxs">
            <div>小学生数：{{postData.pupil_count}}人</div>
            <div>
              <span>小学生作业本标准数：</span>
              <a-form-model-item ref="pupil_book_standard_count" prop="pupil_book_standard_count">
                <a-input placeholder="请输入" @change="regIpt('pupil_book_standard_count')"
                 @input="calculation('pupil_book_standard_count','pupil_count','pupil_book_standard_total_count')"
                 :maxLength="6"
                 v-model="postData.pupil_book_standard_count" />
              </a-form-model-item>
              <div>本</div>
            </div>
            <div>小学生作业本总数：{{postData.pupil_book_standard_total_count}}本</div>
          </div>
          <div class="rowBoxs">
            <div>初中生数：{{postData.junior_count}}人</div>
            <div>
              <span>初中生作业本标准数：</span>
              <a-form-model-item ref="junior_book_standard_count" prop="junior_book_standard_count">
                 <a-input placeholder="请输入" @change="regIpt('junior_book_standard_count')"
                  @input="calculation('junior_book_standard_count','junior_count','junior_book_standard_total_count')"
                  :maxLength="6"
                  v-model="postData.junior_book_standard_count" />
              </a-form-model-item>
              <div>本</div>
            </div>
            <div>初中生作业本总数：{{postData.junior_book_standard_total_count}}本</div>
          </div>
        </div>
        <div class="tips">
          <span class="main_color" @click="lookStu">查看学生</span>
          <div>提示：请根据教委发布的标准进行填写</div>
        </div>
        <div class="tips">
          <div>提示：若数据与实际人数不符，请查看学生情况修正</div>
        </div>
        <div class="allBool">合计作业本大本数：{{postData.total_count}}本</div>
        <div class="titles">
          <span>大本子数量</span>
          <div></div>
        </div>
        <div class="iptBox">
          <div>
            <div>
              <p>作业本</p>
              <div>
                <a-form-model-item ref="big_work_book" prop="big_work_book">
                  <a-input placeholder="请输入"
                  @change="regIpt('big_work_book')"
                  @input="bigNums('big')"
                  :maxLength="7"
                  v-model="postData.big_work_book" />
                </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div>
              <p>数学本</p>
              <div>
                <a-form-model-item ref="big_math_book" prop="big_math_book">
                  <a-input placeholder="请输入"
                  @change="regIpt('big_math_book')"
                  @input="bigNums('big')"
                  :maxLength="7"
                  v-model="postData.big_math_book" />
                </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div>
              <p>作文本</p>
              <div>
                <a-form-model-item ref="big_composition_book" prop="big_composition_book">
                  <a-input placeholder="请输入"
                  @change="regIpt('big_composition_book')"
                   @input="bigNums('big')"
                   :maxLength="7"
                   v-model="postData.big_composition_book" />
                </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div>
              <p>大字本</p>
              <div>
                <a-form-model-item ref="big_word_book" prop="big_word_book">
                  <a-input placeholder="请输入"
                  @change="regIpt('big_word_book')"
                   @input="bigNums('big')"
                   :maxLength="7"
                   v-model="postData.big_word_book" />
                </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div>
              <p>图画本</p>
              <div>
                <a-form-model-item ref="big_picture_book" prop="big_picture_book">
                  <a-input placeholder="请输入"
                  @change="regIpt('big_picture_book')"
                  @input="bigNums('big')"
                  :maxLength="7"
                  v-model="postData.big_picture_book" />
                </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div>
              <p>英语本</p>
              <div>
                <a-form-model-item ref="big_english_book" prop="big_english_book">
                  <a-input placeholder="请输入"
                  @change="regIpt('big_english_book')"
                  @input="bigNums('big')"
                  :maxLength="7"
                  v-model="postData.big_english_book" />
                </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div class="setNum noHeight">
              <div>
                <span class="noLefts">小计：{{postData.big_total_count}}本</span>
              </div>
            </div>
          </div>
        </div>
        <div class="titles">
          <span>小本子数量</span>
          <div></div>
        </div>
        <div class="tips">
          <div>提示：2个小本子计算为1个大本子</div>
        </div>
        <div class="iptBox">
          <div>
            <div>
              <p>拼音本</p>
              <div>
                <a-form-model-item ref="small_abc_book" prop="small_abc_book">
                  <a-input placeholder="请输入"
                  @change="regIpt('small_abc_book')"
                  @input="bigNums('samll')"
                  :maxLength="7"
                  v-model="postData.small_abc_book" />
                </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div>
              <p>练习本</p>
              <div>
                <a-form-model-item ref="small_practice_book" prop="small_practice_book">
                  <a-input placeholder="请输入"
                  @change="regIpt('small_practice_book')"
                  @input="bigNums('samll')"
                  :maxLength="7"
                  v-model="postData.small_practice_book" />
                </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div>
              <p>习字本</p>
              <div>
                <a-form-model-item ref="small_writing_book" prop="small_writing_book">
                  <a-input placeholder="请输入"
                  @change="regIpt('small_writing_book')"
                  @input="bigNums('samll')"
                  :maxLength="7"
                  v-model="postData.small_writing_book" />
                </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div>
              <p>小字本</p>
              <div>
                <a-form-model-item ref="small_word_book" prop="small_word_book">
                  <a-input placeholder="请输入"
                   @change="regIpt('small_word_book')"
                   @input="bigNums('samll')"
                   :maxLength="7"
                   v-model="postData.small_word_book" />
                </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div>
              <p>数学本</p>
              <div>
                <a-form-model-item ref="small_math_book" prop="small_math_book">
                  <a-input placeholder="请输入"
                  @change="regIpt('small_math_book')"
                  @input="bigNums('samll')"
                  :maxLength="7"
                  v-model="postData.small_math_book" />
                </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div>
              <p>作业本</p>
              <div>
                 <a-form-model-item ref="small_work_book" prop="small_work_book">
                   <a-input placeholder="请输入"
                   @change="regIpt('small_work_book')"
                   @input="bigNums('samll')"
                   :maxLength="7"
                   v-model="postData.small_work_book" />
                 </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div>
              <p>作文本</p>
              <div>
                 <a-form-model-item ref="small_composition_book" prop="small_composition_book">
                   <a-input placeholder="请输入"
                   @change="regIpt('small_composition_book')"
                   @input="bigNums('samll')"
                   :maxLength="7"
                   v-model="postData.small_composition_book" />
                 </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div>
              <p>图画本</p>
              <div>
                <a-form-model-item ref="small_picture_book" prop="small_picture_book">
                  <a-input placeholder="请输入"
                   @change="regIpt('small_picture_book')"
                   @input="bigNums('samll')"
                   :maxLength="7"
                   v-model="postData.small_picture_book" />
                </a-form-model-item>
                <span>本</span>
              </div>
            </div>
            <div class="setNum noHeight">
              <div>
                <span class="noLefts">小计：{{postData.small_total_count}}本</span>
              </div>
            </div>
          </div>
        </div>
        <div class="titles">
          <span>填报信息</span>
          <div></div>
        </div>
        <div class="iptBox">
          <div>
            <div>
              <p>填报人</p>
              <div>
                <a-form-model-item ref="user_name" prop="user_name">
                  <a-input placeholder="请输入" v-model="postData.user_name" />
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>联系电话</p>
              <div>
                <a-form-model-item ref="phone" prop="phone">
                  <a-input placeholder="请输入"
                   @change="regIpt('phone')"
                   v-model="postData.phone" :maxLength="11" />
                </a-form-model-item>
              </div>
            </div>
            <div>
              <p>学校收货人联系电话</p>
              <div>
                <a-form-model-item ref="school_phone" prop="school_phone">
                  <a-input placeholder="请输入"
                   @change="regIpt('school_phone')"
                   v-model="postData.school_phone" :maxLength="11"/>
                </a-form-model-item>
              </div>
            </div>
          </div>
        </div>
        <a-button type="primary" class="btns" @click="saves">提交</a-button>
      </div>
    </a-form-model>
  </div>
</template>

<script>
  import goback from "../../../components/goBack/index.vue"
  export default {
    data() {
      return {
        year: "",
        school: "",
        postData: {
          school_id: "",
          calendar_id: "",
          pupil_count: 0,
          total_count:0,
          pupil_book_standard_count: "",
          pupil_book_standard_total_count: 0,
          junior_count: 0,
          junior_book_standard_count: "",
          junior_book_standard_total_count: 0,
          big_work_book: "",
          big_math_book: "",
          big_composition_book: "",
          big_word_book: "",
          big_picture_book: "",
          big_english_book: "",
          big_total_count: 0,
          small_abc_book: "",
          small_practice_book: "",
          small_writing_book: "",
          small_word_book: "",
          small_math_book: "",
          small_work_book: "",
          small_composition_book: "",
          small_picture_book: "",
          small_total_count: 0
        },
        Validata: {},
      }
    },
    components: {
      goback
    },
    created() {
      var {
        years,
        school,
        calendar_id,
        school_id,
        pupil_count,
        junior_count
      } = JSON.parse(localStorage.getItem("localInfo"));
      this.year = years;
      this.school = school;
      this.postData.calendar_id = calendar_id;
      this.postData.school_id = school_id;
      this.postData.pupil_count = pupil_count;
      this.postData.junior_count = junior_count;
      this.loadValidata()
    },
    methods: {
      loadValidata() { //初始验证
        var arr = ["pupil_book_standard_count", "junior_book_standard_count", "big_work_book", "big_math_book",
          "big_composition_book", "big_word_book",
          "big_picture_book", "big_english_book", "small_abc_book", "small_practice_book", "small_writing_book",
          "small_word_book", "small_math_book",
          "small_work_book", "small_composition_book", "small_picture_book", "user_name", "phone", "school_phone"
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
      regIpt(type) { //限制整数
        this.postData[type] = this.postData[type].replace(/[^\d]/g, '')
      },
      bigNums(type) { //计算大本子数量小计/小本子数量小计
        var {
          big_work_book,
          big_math_book,
          big_composition_book,
          big_word_book,
          big_picture_book,
          big_english_book,
          small_abc_book,
          small_practice_book,
          small_writing_book,
          small_word_book,
          small_math_book,
          small_work_book,
          small_composition_book,
          small_picture_book,
        } = this.postData;
        if(type=="big"){      //大本子计算
           this.postData.big_total_count = (
             Number(big_work_book) + Number(big_math_book) + Number(big_composition_book) + Number(big_word_book) +
             Number(big_picture_book) + Number(big_english_book)
           );
        }else{         //小本子计算
          this.postData.small_total_count = (
            Number(small_abc_book) + Number(small_practice_book) + Number(small_writing_book) + Number(small_word_book) +
            Number(small_math_book) + Number(small_work_book)+ Number(small_composition_book)+ Number(small_picture_book)
          );
        }
      },
      calculation(num,people,total){           //计算小学生/初中生作业本总数
        this.postData[total] = (Number(this.postData[people])*Number(this.postData[num])).toFixed(2);
        this.postData.total_count = Number(this.postData.pupil_book_standard_total_count)+Number(this.postData.junior_book_standard_total_count)
      },
      saves() { //保存
        this.$refs.formModel.validate(valid => {
          if (valid) {
            var setNums = Number(this.postData.big_total_count)+(Number(this.postData.small_total_count)/2)
            if(Number(this.postData.total_count)!==setNums){
              return this.$message.error('填写数量与作业本大本总数不相等，请验证后再提交');
            }
            this.$store.commit("sch_setLoaing",true)
            var allDatas = JSON.parse(JSON.stringify(this.postData));
            this.$http.InfoBookUpdate(allDatas).then((res)=>{
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
      lookStu() { //查看学生
        this.$router.push({
          path: "/ManagementPanel/StudentNum"
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../assets/css/WorkManagement/InformationReporting/BookSubscription.scss';
</style>
