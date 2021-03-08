<template>
  <div>
     <backs title="教委推荐食谱"/>
     <div class="boxs">
       <timeSelection title="日期" @getTims="getTims"/>
       <a-table :columns="columns" :data-source="data"
        :scroll="{ y: 500 }"
        bordered
        :rowKey="(record,index)=>{return index}"
         @change="pageCheck"
        class="tables"
        :pagination="pagination"
        :loading="loading">
           <div slot="action" slot-scope="text" class="actiosn main_color">
             <span @click="looks(text)">查看</span>
           </div>
        </a-table>
     </div>
  </div>
</template>

<script>
  import backs from "../../../components/goBack/index.vue"
  import moment from "moment"
  import timeSelection from "../../../components/TimeSelection/index.vue"
  export default{
    components:{
      backs,timeSelection
    },
    data(){
      return{
        columns:[
          { title: '序号', width: 120,align:"center",dataIndex: 'id', key: 'id', fixed: 'left' },
          { title: '标题', width: "50%",align:"center",dataIndex: 'title', key: 'title'},
          { title: '时间', width: "50%", dataIndex: 'create_time_txt', key: 'create_time_txt',align:"center" },
          {
            title: '操作按钮',
            key: 'operation',
            fixed: 'right',
            width: 200,
            scopedSlots: { customRender: 'action' },
            align:"center"
          },
        ],
        data:[],
        loading:true,
        pagination:{
          total: 0,
          current:1,
          pageSize: Number(this.$commonJs.PAGE_LINES[0]),//每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper:true,
          pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
        postData: { //搜索obj
          page: 1,
          start_time:"",
          end_time:"",
          pageSize:Number(this.$commonJs.PAGE_LINES[0])
        },
      }
    },
    created(){
      this.getList()
    },
    methods:{
      getTims(obj){
        this.postData.start_time = obj.start_time
        this.postData.end_time = obj.end_time
        this.timChange()
      },
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion
        this.postData.page = current
        this.postData.pageSize = pageSize
        this.pagination.pageSize = pageSize
        this.pagination.current = current
        this.getList()
      },
      looks(item){
         this.$router.push({path:"/ManagementPanel/RecipeDetails",query:{id:item.id}})
      },
      timChange(e){
       this.postData.page = 1
       this.pagination.current = 1
       this.getList()
      },
      getList(){
         this.loading = true
        this.$http.RecipesRecommendedRecipes(this.postData).then((res)=>{
          this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/NutritionDiet/WeeklyRecipes/RecommendedRecipes.scss';
</style>
