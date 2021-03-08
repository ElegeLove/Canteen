<template>
  <div class="padd">
    <div class="topRig">
      <span>培训主题：</span>
      <a-input placeholder="输入关键字" v-model="postData.keyword"/>
       <a-button type="primary" @click="searchs">搜索</a-button>
    </div>
    <timeSelection title="发送日期" @getTims="getTims"/>
    <a-table
      :columns="columns"
      :data-source="data"
       bordered
       :loading="loading"
        @change="pageCheck"
       class="tables"
       :rowKey="(record,index)=>{return index}"
      :pagination="pagination"
      :scroll="{ x: 1500, y: 500 }"
    >
      <div slot="action" slot-scope="text,row" class="actiosn main_color">
        <span @click="lookDetails(row)">查看</span>
      </div>
    </a-table>
  </div>
</template>

<script>
  import timeSelection from "../../../components/TimeSelection/index.vue"
  export default{
    data(){
      return{
        columns:[
          {
            title: '培训主题',
            dataIndex: 'title', key: 'title',
            align:"center",
            width: "50%"
          },
          {
            title: '发送时间',
            dataIndex: 'create_time', key: 'create_time',
            align:"center",
            width: "50%"
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            align:"center",
            scopedSlots: { customRender: 'action' },
          },
        ],
        data:[],
        pagination:{
          total: 0,
          current:1,
          pageSize: Number(this.$commonJs.PAGE_LINES[0]),//每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper:true,
          pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
        postData:{
          keyword:"",
          start_time:"",
          end_time:"",
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
        },
        loading:false
      }
    },
    created(){
      this.getList()
    },
    components:{
      timeSelection
    },
    methods:{
      getTims(obj){          //获取日期
        this.postData.start_time = obj.start_time
        this.postData.end_time = obj.end_time
        this.searchs()
      },
      getList(){                 //获取列表
        this.loading = true
        this.$http.BusinessBusinessList(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },
      searchs(){          //搜索
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion;
        this.postData.page = current;
        this.postData.pageSize = pageSize;
        this.pagination.pageSize = pageSize;
        this.pagination.current = current;
        this.getList()
      },
      lookDetails(item){           //查看
        this.$router.push({path:"/ManagementPanel/t_BusineDetails",query:{id:item.id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/WorkManagement/BusinessTraining/index.scss';
</style>
