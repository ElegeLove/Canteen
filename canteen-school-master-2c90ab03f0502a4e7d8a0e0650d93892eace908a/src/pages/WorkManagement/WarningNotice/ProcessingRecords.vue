<template>
  <div>
     <div class="tipsBox">
       <div>
         <span>预警类型：</span>
         <a-select
             default-value="全部"
             style="width: 150px"
             @change="searchs"
             v-model="postData.type"
           >
             <a-select-option :value="item.id" v-for="(item,index) in typeData" :key="index">{{item.name}}</a-select-option>
         </a-select>
       </div>
       <div class="tips">Tip：未处理过期后会将异常反馈至教委，请及时处理。</div>
     </div>
     <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 500 }"
        :pagination="pagination"
         bordered
         :rowKey="(record,index)=>{return index}"
          @change="pageCheck"
         class="tables"
        :loading="loading">
         <div slot="action" slot-scope="text,row" class="actiosn main_color">
           <span @click="setPro(row)">查看</span>
         </div>
         <div slot="content" slot-scope="text,row,index">
            <a-tooltip placement="topLeft" :title="text" arrow-point-at-center>
              <span class="danshen maxwidths curpoter">{{text}}</span>
            </a-tooltip>
         </div>
      </a-table>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        typeData:[{id:0,name:"全部"}],
        columns:[
          { title: '类型', width: 200, dataIndex: 'type_text', key: 'type_text', fixed: 'left',align:"center" },
          { title: '预警事件', width: "40%", dataIndex: 'content', key: 'content',align:"center",
            scopedSlots: { customRender: 'content' },
          },
          { title: '预警日期', dataIndex: 'create_time_text', key: 'create_time_text', width: "30%",align:"center" },
          { title: '处理状态', dataIndex: 'status_text', key: 'status_text', width: "30%",align:"center" },
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
        postData:{
          status:2,
          type:0,
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
        }
      }
    },
    created(){
      this.getTypes()
       this.getList()
    },
    methods:{
      getTypes(){          //获取类型
        this.$http.WarningGetType().then((res)=>{
          if(res.code==1){
            this.typeData = this.typeData.concat(res.data);
          }
        })
      },
      getList(){                 //获取列表
        this.loading = true
        this.$http.WarningLists(this.postData).then((res)=>{
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
      setPro(item){            //去处理
        this.$router.push({path:'/ManagementPanel/t_WarDetails',query:{id:item.id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../assets/css/WorkManagement/WarningNotice/WarningNotice.scss';
</style>
