<template>
  <div class="pads">
    <div class="topRig">
      <span>通知：</span>
      <a-input placeholder="标题名称" v-model="postData.keyword"/>
       <a-button type="primary" @click="searchs">搜索</a-button>
    </div>
    <div class="justBtwns">
      <timeSelection title="日期" @getTims="getTims"/>
      <div>
        <a-button type="primary" @click="deleAll('all')">批量删除</a-button>
      </div>
    </div>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="data"
      :rowKey="(record,index)=>{return index}"
       bordered
       :loading="loading"
        @change="pageCheck"
       class="tables"
      :pagination="pagination"
      :scroll="{ x: 1500, y: 500 }"
    >
      <div slot="action" slot-scope="text,row" class="actiosn main_color">
        <span @click="lookDetails(row)">查看</span>
        <span  @click="deleAll('one',row)">删除</span>
      </div>
      <div slot="titles" slot-scope="text,row">
        <a-tooltip placement="topLeft" :title="text" arrow-point-at-center>
          <span class="danshen curpoter maxWidtyhs">{{text}}</span>
        </a-tooltip>
      </div>
    </a-table>
    <a-modal
      v-model="statusShow"
      title="提示"
      centered
      cancelText="取消"
      okText="确认"
      @ok="subModals"
    >
      <p class="conts">消息通知删除后无法恢复，是否继续？</p>
    </a-modal>
  </div>
</template>

<script>
  import timeSelection from "../../../../components/TimeSelection/index.vue"
  export default{
    data(){
      return{
        statusShow:false,
        postData:{
          keyword:"",
          start_time:null,
          end_time:null,
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
        },
        columns:[
          {
            title: '标题',
            dataIndex: 'title',
            align:"center",
            key:"title",
            width: "50%",
            scopedSlots: { customRender: 'titles' },
          },
          {
            title: '接收时间',
            dataIndex: 'create_time_text',
            key:"create_time_text",
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
        selectedRowKeys: [],
        pagination:{
          total: 0,
           current:1,
          pageSize: Number(this.$commonJs.PAGE_LINES[0]),//每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper:true,
          pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
        loading:true,
        actionIds:{              //批量删除的数据
          ids:[]
        },
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
         this.emptyCheck()
        this.loading = true
        this.$http.NoticeNoticeCenterList(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion;
        this.postData.page = current;
        this.postData.pageSize = pageSize;
        this.pagination.pageSize = pageSize;
        this.pagination.current = current;
        this.getList()
      },
      searchs(){          //搜索
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      emptyCheck(){        //清空选中
        this.selectedRowKeys = []
        this.actionIds.ids = []
      },
      deleAll(type,item){          //批量删除,删除
        if(type=="all"){
          if(this.actionIds.ids.length==0){
            return this.$message.error("请选择通知");
          }
        }else{
          this.actionIds.ids = [item.id]
        }
        this.statusShow = true;
      },
      subModals(){             //删除确认
        this.statusShow = false;
        this.$store.commit("sch_setLoaing",true)
        this.$http.NoticeNoticeDelete(this.actionIds).then((res)=>{
          this.$store.commit("sch_setLoaing",false);
          if(res.code==1){
            this.getList()
          }
        })
      },
      onSelectChange(selectedRowKeys,item) {
         this.selectedRowKeys = selectedRowKeys;
         var arr = []
         item.forEach((item)=>{
           arr.push(item.id)
         })
         this.actionIds.ids = arr;
      },
      lookDetails(item){                //查看
        this.$router.push({path:"/ManagementPanel/t_RecordDetails",query:{id:item.id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../../assets/css/WorkManagement/NoticeNotice/SendRecord/index.scss';
</style>
