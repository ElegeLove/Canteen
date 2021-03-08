<template>
  <div>
      <backs title="查看详情"/>
      <div class="boxs">
          <a-row class="rows">
            <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" >
               <div class="divs">
                 <span>就职学校：</span>
                 <div>{{allData.full_name}}</div>
               </div>
               <div class="divs">
                 <span>合同类型：</span>
                 <div>{{allData.type_text}}</div>
               </div>
               <div class="divs">
                 <span>姓名：</span>
                 <div>{{allData.name}}</div>
               </div>
               <div class="divs">
                 <span>性别：</span>
                 <div>{{allData.sex_text}}</div>
               </div>
               <div class="divs">
                 <span>出生日期：</span>
                 <div>{{allData.birthday}}</div>
               </div>
               <div class="divs">
                 <span>入职日期：</span>
                 <div>{{allData.entry_time}}</div>
               </div>
               <div class="divs">
                 <span>职位：</span>
                 <div>{{allData.position}}</div>
               </div>
               <div class="divs">
                 <span>联系地址：</span>
                 <div>{{allData.address}}</div>
               </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" >
               <div class="imagBoxs">
                  <p>照片</p>
                  <div>
                    <img  @click="openImg(allData.face_picture)" v-lazy="allData.face_picture"/>
                  </div>
               </div>
            </a-col>
          </a-row>
      </div>
      <div class="boxs">
          <a-row class="rows">
            <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <div class="divs">
                  <span>联系电话：</span>
                  <div>{{allData.mobile}}</div>
                </div>
                <div class="divs">
                  <span>身份证号：</span>
                  <div>{{allData.id_card}}</div>
                </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <div class="creda">
                <p>身份证正反面图片</p>
                <div>
                  <img v-lazy="allData.front" @click="openImg(allData.front)" />
                  <img v-lazy="allData.behind" @click="openImg(allData.behind)" v-show="allData.behind"/>
                </div>
              </div>
            </a-col>
          </a-row>
      </div>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
  </div>
</template>

<script>
  import backs from "../../components/goBack/index.vue"
  export default{
    data(){
      return{
        allData:{},
        previewVisible: false,
        previewImage:''
      }
    },
    components:{
      backs
    },
    created(){
       this.getDetails(this.$route.query.id)
    },
    methods:{
      getDetails(id){             //获取详情
        this.$store.commit("sch_setLoaing",true)
        this.$http.schoolFacultyInfo({id}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.allData = res.data
          }
        })
      },
      handleCancel(){
         this.previewVisible = false;
      },
      openImg(url){       //打开图片
        if(url==""){
          return false;
        }
       this.previewImage = url;
       this.previewVisible = true;
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/internalManagement/EmployeeDetails.scss';
</style>
