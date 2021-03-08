<template>
  <div>
     <backs title="添加菜品"/>
    <div class="tops">
       <div class="dateWeek">
          <p>{{addMenuData.date}}&emsp;
          {{addMenuData.week}}&emsp;&emsp;{{addMenuData.typetxt}}</p>
          <a-button type="primary" @click="savePro('save')">保存({{addMenuData.menu.length}})</a-button>
          <!-- <a-button type="primary" @click="saveNext">保存并添加下一条</a-button> -->
       </div>
       <div class="typeBox">
         <div class="types" v-for="(item,index) in addMenuData.menu" :key="index">
           <span>{{item.name}}</span>
           <a-icon type="close" @click="delets(index,item)"/>
         </div>
       </div>
    </div>
    <div class="serchBox">
      <div class="topRig">
        <a-input placeholder="搜索菜品" v-model="postData.keyword"/>
         <a-button type="primary" @click="searchs">搜索</a-button>
      </div>
      <a-tabs  v-model="postData.type" tabPosition="top"  @change="checkTab">
        <a-tab-pane :tab="item.name" :key="item.id" v-for="(item,index) in typeData"></a-tab-pane>
      </a-tabs>
      <div class="listBox"  v-if="list.length!==0">
        <a-list
          :pagination="pageGration"
          :dataSource="list"
          :split="false"
        >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <div class="list" :key="index">
            <div class="top">
              <span class="danshen">{{item.name}}</span>
              <img src="../../../assets/image/adds.png" @click="addmenuList(item)" v-if="item.checks!==true"/>
              <img src="../../../assets/image/overs.png" v-else/>
            </div>
            <div class="bot">
              <p>本月已排{{item.schedule}}次</p>
              <div>最近排期：{{item.schedule_time_text}}</div>
            </div>
          </div>
        </a-list-item>
        </a-list>
      </div>
      <div class="emptyss" v-else>
         <img src="../../../assets/image/noSearch.png" />
         <div v-if="keywords!==''">
           菜品库里没有<span>”{{keywords}}“</span>相关的菜品，<span @click="addMenus">请点击此处手动创建</span>
         </div>
         <div v-else>
           暂无菜品
         </div>
       </div>
    </div>
  </div>
</template>

<script>
   import { mapState} from 'vuex';
  import backs from "../../../components/goBack/index.vue"
  export default{
    data(){
      return{
         typeData:[{id:0,name:"全部"}],
         list:[],
         postData:{
           type:0,
           keyword:"",
           page:1,
           pageSize:14
         },
         pageGration:{
           pageSize:14,
           current:1,
           total:0,
           showSizeChanger:true,
           showQuickJumper:true,
           onShowSizeChange:(current,nums)=>{
             this.pageGration.pageSize = nums
             this.pageGration.current = 1
             this.postData.pageSize = nums
             this.postData.page = 1
             this.getList()
           },
           onChange: (page,pageSize) => {
             this.pageGration.current = page
             this.postData.page = page
             this.getList()
           },
           pageSizeOptions: ['14','20','30'], // 每页数量选项
           showTotal: total => `共有${total} 条数据`,  //分页中显示总的数据
         },
         recipes:[],
         addMenuData:{
           recipes_id:"",
           week_id:"",
           type:"",
           date_time:"",
           menu:[],
           date:"",
           week:"",
           typetxt:""
         },
         keywords:""
      }
    },
    components:{
      backs
    },
    computed: {
      ...mapState(['commonSchoolSet','addMenu'])
    },
    created(){
       var {week_id,type,date_time,recipes_id} = this.$route.query
       var {listData,index,ix,date,week,typetxt} = this.addMenu
       this.addMenuData.week_id = week_id
       this.addMenuData.type = type
       this.addMenuData.date_time = date_time
       this.addMenuData.menu = listData[index].recipes[ix];
       this.addMenuData.recipes_id = recipes_id
       this.addMenuData.date = date
       this.addMenuData.week = week
       this.addMenuData.typetxt = typetxt;
    },
    mounted(){
       this.typeData = this.typeData.concat(this.commonSchoolSet.menu)
       this.getList()
    },
    methods:{
      savePro(type,callbak){           ///保存
         if(this.addMenuData.menu.length==0){
           return this.$message.error('请添加菜品');
         }
         var alldata = JSON.parse(JSON.stringify(this.addMenuData))
         var arr = []
         alldata.menu.forEach((it)=>{
           arr.push(it.id)
         })
         alldata.menu = arr
         this.$store.commit("sch_setLoaing",true)
         this.$http.RecipesEveryMeal(alldata).then((res)=>{
           this.$store.commit("sch_setLoaing",false)
           if(res.code==1){
             if(type=="save"){
               this.$router.go(-1)
             }else{
                callbak(res.data)
             }
           }
         })
      },
      addmenuList(item){         //添加菜品
        if(this.addMenuData.menu.length>=18){
          return this.$message.error('最多添加18个菜品');
        }
        this.addMenuData.menu.push(item);
        this.addChecks(item,true)
        this.$forceUpdate()
      },
      addChecks(it,bools){            //选中取消后改变checks
        this.list.forEach((item,ix)=>{
          if(item.id==it.id){
            item.checks = bools;
            this.$set(this.list,ix,item);
          }
        })
      },
      delets(index,it){         //删除菜品
        this.addMenuData.menu.splice(index,1);
        this.addChecks(it,false);
      },
      addMenus(){     //去添加
        this.$router.push({path:"/ManagementPanel/NutritionDiet"})
      },
      onChange(e){               //分页监听
        this.postData.page = e
        this.getList()
      },
      checkTab(e){           //tab切换
        this.postData.keyword = ""
        this.postData.page = 1;
        this.pageGration.current = 1;
        this.getList()
      },
      searchs(){            //搜索
        this.postData.type = 0;
        this.postData.page = 1;
        this.pageGration.current = 1;
        this.getList()
      },
      getList(){            //获取列表
        this.$store.commit("sch_setLoaing",true)
        this.$http.RecipesMenu(this.postData).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.pageGration.total = res.data.total
            this.list = res.data.data;
            this.compares();
            this.keywords = this.postData.keyword
          }
        })
      },
      compares(){          //比较是否选择
        this.list.forEach((item)=>{
          item.checks = false;
        })
        this.list.forEach((item)=>{
          this.addMenuData.menu.forEach((it)=>{
            if(item.id==it.id){
              item.checks = true;
            }
          })
        });
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/NutritionDiet/WeeklyRecipes/AddDishes.scss';
</style>
