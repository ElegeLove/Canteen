<template>
  <div class="pads">
    <div class="topRig">
      <span>通&emsp;知：</span>
      <a-input placeholder="标题名称" v-model="postData.keyword"/>
       <a-button type="primary" @click="searchs">搜索</a-button>
    </div>
    <div class="searchBoxs">
      <div class="seleBoxs">
        <div>
          <span>接收对象：</span>
          <a-select
              default-value="全部"
              style="width: 150px"
              placeholder="请选择"
              @change="searchs"
              v-model="postData.supplier_id"
            >
              <a-select-option :value="item.supplier_id" v-for="(item,index) in typeData" :key="index">{{item.name}}</a-select-option>
          </a-select>
        </div>
        <timeSelection title="日期" @getTims="getTims"/>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
       bordered
        :loading="loading"
        @change="pageCheck"
        :rowKey="(record,index)=>{return index}"
       class="tables"
      :pagination="pagination"
      :scroll="{ x: 1500, y: 500 }"
    >
      <div slot="action" slot-scope="text,row" class="actiosn main_color">
        <span v-if="row.status==1" @click="editor(row)">编辑</span>
        <span @click="lookDetails(row)" v-else>查看</span>
      </div>
      <div slot="titles" slot-scope="text,row">
        <a-tooltip placement="topLeft" :title="text" arrow-point-at-center>
          <span class="danshen curpoter maxAllwids">{{text}}</span>
        </a-tooltip>
      </div>
    </a-table>
  </div>
</template>

<script>
  import timeSelection from "../../../../components/TimeSelection/index.vue"
  export default{
    data(){
      return{
        loading:true,
        typeData:[{supplier_id:"",name:"全部"}],
        columns:[
          {
            title: '标题',
            dataIndex: 'title',
            key:"title",
            fixed: 'left',
            align:"center",
            width: 250,
            scopedSlots: { customRender: 'titles' }
          },
          {
            title: '接收对象',
            dataIndex: 'supplier',
            key:"supplier",
            align:"center",
            width: "25%"
          },
          {
            title: '发送人',
            dataIndex: 'nickname',
            key:'nickname',
            align:"center",
            width: "25%"
          },
          {
            title: '发送时间',
            dataIndex: 'send_time',
            key:"send_time",
            align:"center",
            width: "25%"
          },
          {
            title: '状态',
            dataIndex: 'status_text',
            key:"status_text",
            align:"center",
            width: "25%"
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
          start_time:null,
          end_time:null,
          supplier_id:"",
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
        }
      }
    },
    created(){
      this.getSupper();
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
      getSupper(){              //获取接受对象
        this.$http.SupplierLists({cooperation:1}).then((res)=>{
          if(res.code==1){
            this.typeData = this.typeData.concat(res.data)
          }
        })
      },
      getList(){                 //获取列表
        this.loading = true;
        this.$http.NoticeNoticeRecordList(this.postData).then((res)=>{
           this.loading = false;
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
      lookDetails(item){            //查看详情
        this.$router.push({path:"/ManagementPanel/t_RecordDetails",query:{id:item.id}})
      },
      editor(item){           //编辑
        localStorage.setItem("sendTypes","update")
        this.$router.push({path:"/ManagementPanel/t_NoticeNotice/t_SendNotification",query:{id:item.id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../../assets/css/WorkManagement/NoticeNotice/SendRecord/index.scss';
</style>
