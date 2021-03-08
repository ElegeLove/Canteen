<template>
  <div>
    <div class="heads">
       <a-button type="primary" @click="adds('add')" icon="form">新建菜品</a-button>
    </div>
    <div class="boxs">
        <a-row>
          <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="17" class="tabBox">
            <a-tabs tabPosition="top" v-model="postData.type" @change="checkTab">
              <a-tab-pane :tab="item.name" :key="item.id" v-for="(item,index) in typeData"></a-tab-pane>
            </a-tabs>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="7" class="topRig">
              <a-input placeholder="搜索菜品" v-model="postData.keyword"/>
               <a-button type="primary" @click="searchs">搜索</a-button>
          </a-col>
        </a-row>
    </div>

    <div class="listBox"  v-if='list.length!==0'>
      <a-list
        :pagination="pageGration"
        :dataSource="list"
        :split="false"
      >
      <a-list-item slot="renderItem" slot-scope="item, index">
       <div class="list" :key="index">
          <p class="danshen">{{item.name}}</p>
          <div>本月已排{{item.schedule}}次</div>
          <div>
            <span>最近排期：</span>
            <div>{{item.schedule_time_text}}</div>
          </div>
          <div>
            <img src="../../assets/image/edits.png" @click="adds('update',item)"/>
            <img src="../../assets/image/dele.png" @click="deletes(item,index)">
          </div>
       </div>
       </a-list-item>
       </a-list>
    </div>
    <emptys titles="暂无菜品" v-else/>
    <a-modal
          v-model="deleShow"
          title="确认删除"
          centered
          cancelText="取消"
          okText='确定'
          @ok="subDeles"
        >
        <p>删除该菜品后，食谱中将无法添加此菜品</p>
     </a-modal>
  </div>
</template>

<script>
  import { mapState} from 'vuex';
  import emptys from "../../components/EmptyNum/index.vue"
  export default{
    data(){
      return{
        typeData:[{id:0,name:"全部"}],
        deleShow:false,
        postData:{
          type:0,
          keyword:"",
          page:1,
          pageSize:14
        },
        list:[],
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
          pageSizeOptions:['14','20','30'], // 每页数量选项
          showTotal: total => `共有${total} 条数据`,  //分页中显示总的数据
        },
        deleteData:{
          id:"",
          index:""
        }
      }
    },
    components:{
      emptys
    },
    computed: {
      ...mapState(['commonSchoolSet'])
    },
    mounted(){
       this.typeData = this.typeData.concat(this.commonSchoolSet.menu)
       this.getList()
    },
    methods:{
      adds(type,item){
        if(type=="update"){
          this.$router.push({path:"/ManagementPanel/CreateDishes",query:{type,id:item.id}})
        }else{
          this.$router.push({path:"/ManagementPanel/CreateDishes",query:{type}})
        }
      },
      deletes(item,index){      //删除
        this.deleteData.id = item.id
        this.deleteData.index = index
         this.deleShow = true
      },
      subDeles(){        //确定删除
        this.$http.RecipesDeleteMenu(this.deleteData).then((res)=>{
          if(res.code==1){
            this.deleShow = false
            this.list.splice(this.deleteData.index,1)
          }
        })
      },
      searchs(){           //搜索
        this.postData.type = 0;
        this.postData.page = 1;
        this.pageGration.current = 1
        this.getList()
      },
      getList(data){            //获取列表
        this.$store.commit("sch_setLoaing",true)
        this.$http.RecipesMenu(this.postData).then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            this.pageGration.total = res.data.total
            this.list = res.data.data
          }
        })
      },
      checkTab(e){
        this.pageGration.current = 1
        this.postData.page = 1
        this.getList()
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../assets/css/NutritionDiet/index.scss';
</style>
