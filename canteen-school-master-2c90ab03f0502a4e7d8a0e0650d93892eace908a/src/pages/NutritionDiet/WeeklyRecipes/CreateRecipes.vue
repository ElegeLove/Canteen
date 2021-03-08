<template>
  <div>
      <backs :title="type=='update'?'修改食谱':type=='add'?'创建食谱':'复制食谱'"/>
      <div class="boxs">
        <div class="topss">
          <div class="lef">
            <div class="btnDate">
               <div @click="chekcs('last_week')" :class="{'disabled':allData.last_week==0}">
                 <a-icon type="left" class="main_color"/>
                 <span class="main_color">上一周</span>
               </div>
               <a-button type="primary" @click="chekcs('nowWeek')">本周</a-button>
               <div @click="chekcs('next_week')" :class="{'disabled':allData.next_week==0}">
                 <span class="main_color">下一周</span>
                 <a-icon type="right" class="main_color"/>
               </div>
            </div>
            <div class="dates">
              <span>日期：</span>
             <!--  <a-range-picker :placeholder="['开始日期','结束日期']">
                  <a-icon slot="suffixIcon" type="calendar" />
               </a-range-picker> -->
               <div>
                  {{allData.start_time}}~{{allData.end_time}}
               </div>
            </div>
          </div>
          <div class="rig">
              <a-button @click="emptys">清空</a-button>
              <a-button @click="cancels">取消编辑</a-button>
              <a-button type="primary" @click="saveMenu">保存食谱</a-button>
          </div>
        </div>
        <a-table :columns="columns"
        :data-source="allData.recipes"
        bordered
        :rowKey="(record,index)=>{return index}"
        :loading="tabLoading"
        class="tables"
        :scroll="{ x: 1500 }"
        :pagination="false" >
           <template slot="title" slot-scope="currentPageData" class="headers">
             学校食堂{{allData.year}}年{{allData.semester}}学期第{{allData.weeks}}周食谱总表
           </template>
           <div slot="customTitle" style="position: relative;">
             <p class="titDate">日期</p>
             <p class="lines"></p>
             <p class="titTxt">餐次</p>
           </div>
           <div :slot="'week'+ix" class="weekTit" v-for="(it,ix) in allData.dates" :key="ix">
               <p>{{it.day}}</p>
               <p>{{it.week}}</p>
           </div>
           <div v-for="(it,ix) in 7" :slot="'week' + (it+1)" slot-scope="text, record,index" class="colClass">
               <div v-if="record.recipes[it-1].length!==0">
                  <div v-for="(item,indexs) in record.recipes[it-1]" class="checkLisd" :key="indexs">
                       {{item.name}}
                       <a-icon type="close" class="deles" @click="deletMenu(record,ix,indexs)"/>
                   </div>
               </div>
               <img src="../../../assets/image/addMenu.png" class="addMenu" v-else @click="addDish(record,ix,index)"/>
               <div class="checkLisd addCais" v-if="record.recipes[it-1].length!==0"@click="addDish(record,ix,index)">
                 <a-icon type="plus"/>
                 添加菜品
               </div>
           </div>
         </a-table>
      </div>
       <a-modal
            v-model="tips"
            title="切换提示"
            centered
            cancelText="关闭"
            okText="保存"
            @ok="() => (tips = false)"
          >
            <p>当前编辑食谱未保存，是否保存后再进行切换？</p>
          </a-modal>
  </div>
</template>

<script>
  import { mapState,mapMutations} from 'vuex';
  import backs from "../../../components/goBack/index.vue"
  import moment from 'moment';
  export default{
    data(){
      return{
        tips:false,
          columns:[{
            align:'center',
            dataIndex: 'title',
            width:140,
            slots: { title: 'customTitle' }
          },
          {
            slots: { title: 'week0' },
            scopedSlots: {customRender: 'week2'},
            dataIndex: 'recipes',
            align:'center',
          },
          {
            align:'center',
            dataIndex: 'recipes1',
            slots: { title: 'week1' },
            scopedSlots: {customRender: 'week3'}
          },
          {
            align:'center',
            dataIndex: 'recipes2',
            slots: { title: 'week2' },
            scopedSlots: {customRender: 'week4'}
          },
          {
            align:'center',
            dataIndex: 'recipes3',
            slots: { title: 'week3' },
            scopedSlots: {customRender: 'week5'}
          },
          {
            align:'center',
            dataIndex: 'recipes4',
            slots: { title: 'week4' },
            scopedSlots: {customRender: 'week6'}
          },
          {
            align:'center',
            dataIndex: 'recipes5',
            slots: { title: 'week5' },
            scopedSlots: {customRender: 'week7'}
          },
          {
            align:'center',
            dataIndex: 'recipes6',
            slots: { title: 'week6' },
            scopedSlots: {customRender: 'week8'}
          },
        ]
        ,weekNum:0,
        weekList:[],
        postData:{
          recipes:[]
        },
        allData:{},
        tabLoading:false,           //表格加载
        type:"",
        week_id:""
      }
    },
    components:{
      backs
    },
    beforeRouteLeave(to,from,next){
      if(to.name!="AddDishes"){
        localStorage.removeItem("week_id")
      }
      next()
    },
    created(){
      this.type = this.$route.query.type
      var week_ids = localStorage.getItem("week_id")
      if(week_ids!==null){
        this.week_id = week_ids
      }else{
         this.week_id = this.$route.query.week_id
      }
      this.getMentList()
    },
    computed: {
      ...mapState(['weekData'])
    },
    methods:{
      ...mapMutations(['setRecipeData','setAddMenu']),
      getMentList(){            //获取食谱列表
        this.tabLoading = true
        this.$http.RecipesWeekRecipesList({week_id:this.week_id}).then((res)=>{
          this.tabLoading = false
          if(res.code==1){
            this.allData = res.data
          }
        })
      },
      cancels(){         //取消编辑
        this.$router.go(-1)
      },
      saveMenu(){                 //保存食谱
        var allMenu = []
        this.allData.recipes.forEach((item)=>{
          item.recipes.forEach((it)=>{
            allMenu.push(it)
          })
        })
        var bools = allMenu.every((item)=>{
          return item.length==0;
        })
        if(bools){
          this.$message.error('请添加菜品');
        }else{
          this.$notification.success({
            message: '保存成功'
          });
          this.$router.go(-1)
        }
      },
      chekcs(val){       //切换周
         if(val=="nowWeek"){
            this.week_id = this.$route.query.week_id
            this.getMentList()
         }else{
           if(this.allData[val]!==0){
             this.week_id = this.allData[val]
             this.getMentList()
           }
         }
      },
      emptys(){       //清空
        this.$http.RecipesClearRecipes({recipes_week_id:this.allData.recipes_week_id}).then((res)=>{
          if(res.code==1){
            this.getMentList()
          }
        })
      },
      addDish(record,ix,index){         //添加菜品
        var recId = record.recipes[ix][0]
        var obj = {
          week_id:this.week_id,
          type:record.type,
          date_time:this.allData.dates[ix].date_time,
          recipes_id: recId==undefined?'':recId.recipes_id
        }
        var menuObj = {
          date:this.allData.dates[ix].day,
          week:this.allData.dates[ix].week,
          typetxt:record.title,
          listData:this.allData.recipes,
          index,
          ix
        }
         localStorage.setItem("week_id",this.week_id)
         this.setAddMenu(menuObj)
         this.$router.push({path:'/ManagementPanel/AddDishes',query:obj})
      },
      deletMenu(item,ix,indexs){       //删除菜品
        var menuId = item.recipes[ix][indexs].id
        const hide = this.$message.loading('删除中', 0);
        this.$http.RecipesDeleteRecipesMenu({recipes_id:item.recipes[ix][indexs].recipes_id,menu_id:menuId}).then((res)=>{
          setTimeout(hide,0);
          if(res.code==1){
            item.recipes[ix].splice(indexs,1)
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/NutritionDiet/WeeklyRecipes/CreateRecipes.scss';
</style>
