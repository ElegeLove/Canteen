<template>
  <div class="padd">
    <div class="disWeek">
        <div class="title">学期:</div>
        <a-select
          v-model="weekId"
          default-value
          style="width: 120px"
          @change="getWeekData"
        >
          <a-select-option value>全部</a-select-option>
          <a-select-option
            v-for="(item,index) in weekList"
            :key="index"
            :value="item.id"
          >{{item.year}}{{item.semester}}</a-select-option>
        </a-select>
      </div>
   <a-row>
     <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" v-for="(item,ix) in studentList" class="chilBox" :key="ix">
       <div>
          <div class="headers">
             <span class="bg_color"></span>
             <div>{{item.school_name}}{{item.student_num}}人</div>
             <div class="main_color" @click="update(item)" v-if="item.update == 1">修改</div>
          </div>
          <a-row class="rowBox">
             <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" v-for="(it,index) in item.student" :key="index" class="colList">
                <span>{{it.name}}：</span>
                <div>{{it.people}}人</div>
             </a-col>
          </a-row>
       </div>
      </a-col>
    </a-row>
    <a-modal
      v-model="updateShow"
      title="学生人数填写"
      centered
      width="900px"
      okText="保存"
      cancelText="取消"
      @ok="updateScoll"
     >
      <a-row>
         <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" class="iptBox" v-for="(item,index) in updatePost.student" :key="index">
          <div class="padBox">
              <div>{{item.name}}学生数</div>
              <div>
                <a-input placeholder="请填写" type="number" v-model="item.people"/>
                <span>人</span>
              </div>
          </div>
         </a-col>
      </a-row>
     </a-modal>
    </div>
</template>

<script>
  export default{
    data(){
      return{
         updateShow:false,
         studentList:[],
         updatePost:{
           school_id:"",
           student:[]
         },
         weekList:[],
         weekId:''
      }
    },
    created(){
      this.getData();
      this.getWeek();
    },
    methods:{
      getWeek(){
        //获取周，年份，学期
        this.$http.weekData({ id: "" }).then((res) => {
          this.weekList = res.data;
        });
      },
      getWeekData(){
        this.getData();
      },
      updateScoll(){         //确认修改
         this.$http.IndexStudent(this.updatePost).then((res)=>{
           this.updateShow = false
           if(res.code==1){
              this.getData()
           }
         })
      },
      update(item){        //修改
        this.updatePost.school_id = item.school_id
        this.updatePost.student = JSON.parse(JSON.stringify(item.student))
        this.updateShow = true
      },
      getData(){
        this.$store.commit("sch_setLoaing",true)
        this.$http.IndexStudentList({calendar_id:this.weekId}).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
             this.studentList = res.data
          }

        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/internalManagement/StudentNum/StudentNum.scss';
.disWeek{
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
</style>
