<template>
  <div>
    <goback title="返回"/>
    <div class="boxsd">
      <timeSelection title="日期" @getTims="getTims"/>
      <a-table
        :columns="columns"
        :data-source="data"
         bordered
         @change="pageCheck"
         :rowKey="(record,index)=>{return index}"
         class="tables"
         :loading="loading"
        :pagination="pagination"
        :scroll="{ x: 1500, y: 500 }"
      >
        <div slot="action" slot-scope="text,row" class="actiosn main_color">
          <span @click="lookDetails(row)">查看</span>
        </div>
        <div slot="requirement" slot-scope="text,row" >
          <a-tooltip placement="topLeft" :title="text" arrow-point-at-center>
            <span class="danshen maxwidth curpoter">{{text}}</span>
          </a-tooltip>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
  import goback from "../../../components/goBack/index.vue"
  import timeSelection from "../../../components/TimeSelection/index.vue"
  export default{
    components:{
      goback,timeSelection
    },
    data(){
      return{
        postData:{
          start_time:null,
          end_time:null,
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
        },
        loading:true,
        columns:[
          {
            title: '问卷名称',
            dataIndex: 'title', key: 'title',
            align:"center",
            width: "20%"
          },
          {
            title: '问卷开始时间',
            dataIndex: 'start_time', key: 'start_time',
            align:"center",
            width: "20%"
          },
          {
            title: '问卷结束日期',
            dataIndex: 'end_time', key: 'end_time',
            align:"center",
            width: "20%"
          },
          {
            title: '填写描述',
            dataIndex: 'requirement', key: 'requirement',
            align:"center",
            width: "20%",
            scopedSlots: { customRender: 'requirement' },
          },
          {
            title: '接收时间',
            dataIndex: 'create_time', key: 'create_time',
            align:"center",
            width: "20%"
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
      }
    },
    created(){
       this.getList()
    },
    methods:{
      getTims(obj){          //获取日期
        this.postData.start_time = obj.start_time
        this.postData.end_time = obj.end_time
        this.searchs()
      },
      getList(){                 //获取列表
        this.loading = true
        this.$http.QuestionnaireQuestionnaireList(this.postData).then((res)=>{
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
      lookDetails(item){          //查看
        this.$router.push({path:"/ManagementPanel/t_InvestigationDetails",query:{id:item.id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../assets/css/WorkManagement/QuestionnaireInvestigation/index.scss';
</style>
