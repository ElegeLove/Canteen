<template>
  <div>
    <a-table :columns="columns" :data-source="data"
     :scroll="{ x: 1500, y: 500 }"
     bordered
     :rowKey="(record,index)=>{return index}"
     @change="pageCheck"
     :pagination="pagination"
     :loading="loading">
     </a-table>

  </div>
</template>

<script>
  export default{
    data(){
      return{
        columns:[
          { title: '序号', width: 100, dataIndex: 'sort', key: 'sort', fixed: 'left',align:"center" },
          { title: '就职学校', width: "10%", dataIndex: 'full_name', key: 'full_name',align:"center"},
          { title: '合同类型', dataIndex: 'type_text', key: 'type_text', width: "10%",align:"center" },
          { title: '姓名', dataIndex: 'name', key: 'name', width: "10%",align:"center" },
          { title: '性别', dataIndex: 'sex', key: 'sex', width: "10%",align:"center",
            customRender: (value, row, index) => {
              return value==1?'男':value==2?'女':'保密'
            }
          },
          { title: '年龄', dataIndex: 'age', key: 'age', width: "10%",align:"center" },
          { title: '职位', dataIndex: 'position', key: 'position', width: "10%" ,align:"center"},
          { title: '联系方式', dataIndex: 'mobile', key: 'mobile', width: "10%",align:"center" },
          { title: '入职时间', dataIndex: 'entry_time_text', key: 'entry_time_text', width: "15%",align:"center" },
          { title: '离职时间', dataIndex: 'quit_time_text', key: 'quit_time_text', width: "15%",align:"center" },
          {
            title: '离职原因',
            key: 'quit_reason',
            fixed: 'right',
            width: 200,
            align:"center",
            dataIndex:'quit_reason'
          },
        ],
        loading:true,
        data:[],
        pagination:{
          total: 0,
          pageSize: Number(this.$commonJs.PAGE_LINES[0]),//每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper:true,
          pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
        postData:{                       //搜索obj
          quit:1,
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0])
        },
      }
    },
    created(){
       this.getList()
    },
    methods:{
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion
        this.postData.page = current
        this.postData.pageSize = pageSize
        this.pagination.pageSize = pageSize
        this.getList()
      },
      getList(){             //列表请求
        this.loading = true
        this.$http.FacultyLists(this.postData).then((res)=>{
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

<style>
</style>
