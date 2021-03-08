<template>
  <div class="boxss">
    <div class="search">
      <span>职位：</span>
      <a-input placeholder="职位名称" v-model="postData.keyword"/>
      <a-button type="primary" @click="searchs">搜索</a-button>
    </div>
    <div class="btnBox">
       <a-button type="primary" icon="usergroup-add" @click="adduser('')">添加职位</a-button>
        <a-button @click="stopStatus">批量停用</a-button>
        <a-button @click="openAlls">批量启用</a-button>
        <a-button @click="deleAlls">批量删除</a-button>
    </div>
    <a-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="data"
      bordered
      class="tables"
      :loading="loading"
      :rowKey="(record,index)=>{return index}"
       @change="pageCheck"
      :pagination="pagination"
      :scroll="{x:1500, y: 500 }"
    >
      <div slot="status" slot-scope="text,rows">
        <a-switch checked-children="启用" un-checked-children="关闭" :checked="rows.status==1?true:false" @click="switchs(rows)"/>
      </div>
      <div slot="action" slot-scope="text,rows" class="actiosn main_color">
        <span @click="lookDetails(rows.id)">查看</span>
        <span @click="adduser(rows.id)">编辑</span>
        <span @click="delets(rows.id)">删除</span>
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
      <p>{{modalObj.cont}}</p>
    </a-modal>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        modalObj:{
           cont:"停用职位后配置该职位的用户将无法正常使用，是否继续？"
        },
         statusShow:false,
        columns:[
          {
            title: '名称',
            dataIndex: 'name',
            align:"center",
            fixed: 'left',
            width:200
          },
          {
            title: '描述',
            dataIndex: 'description',
            align:"center",
            width:"25%",
          },
          {
            title: '创建人',
            dataIndex: 'founder',
            align:"center",
            width:"25%",
          },
          {
            title: '创建时间',
            dataIndex: 'create_time',
            align:"center",
            width:"25%",
          },
          {
            title: '状态',
            dataIndex: 'status',
            align:"center",
            width:"25%",
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作按钮',
            dataIndex: 'action',
            fixed: 'right',
            align:"center",
            width:200,
            scopedSlots: { customRender: 'action' },
          }
        ],
        data:[],
        selectedRowKeys: [],
        actionIds:{              //删除  停启用数据id
          ids:[]
        },
        loading: false,
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
          page:1,
          keyword:"",
          pageSize:Number(this.$commonJs.PAGE_LINES[0])
        }
      }
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){                 //获取列表
        this.loading = true
        this.$http.roleLists(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion
        this.postData.page = current
        this.postData.pageSize = pageSize
        this.pagination.pageSize = pageSize
        this.pagination.current = current
        this.getList()
      },
      searchs(){             //搜索
         this.postData.page = 1
         this.pagination.current = 1
         this.getList()
      },
      onSelectChange(selectedRowKeys,item) {          //选中的数据
        this.selectedRowKeys = selectedRowKeys;
        var arr = []
        item.forEach((item)=>{
          arr.push(item.id)
        })
        this.actionIds.ids = arr
      },
      switchs(item){          //切换switch
        this.actionIds.ids = item.id
        if(item.status==1){
          this.switchTxt('closeStatus')
        }else{
          this.$http.RoleRoleEnable(this.actionIds).then((res)=>{
            if(res.code==1){
              this.emptyCheck()
              item.status = item.status==1?2:1
            }
          })
        }
      },
      switchTxt(type){              //状态提示框
        this.modalObj = {
         cont:"停用职位后配置该职位的用户将无法正常使用，是否继续？",
         type:type
        }
         this.statusShow = true
      },
      emptyCheck(){        //清空选中
        this.selectedRowKeys = []
        this.actionIds.ids = []
      },
      subModals(){         //弹框确认
        this.statusShow = false
        var {type} = this.modalObj
        if(type=="dele"){         //删除
          this.$http.RoleRoleDelete(this.actionIds).then((res)=>{
            if(res.code==1){
              this.emptyCheck()
              this.getList()
            }
          })
        }else if(type=="closeStatus"){       //停用
           this.$http.RoleRoleDisable(this.actionIds).then((res)=>{
             if(res.code==1){
              this.getList()
              this.emptyCheck()
             }
           })
        }
      },
      openDele(){            //删除提示框
        this.modalObj = {
         cont:"删除职位后配置该职位的用户将无法正常使用，是否继续？",
         type:"dele"
        }
         this.statusShow = true
      },
      delets(id){            //删除
        this.actionIds.ids = id
        this.openDele()
      },
      deleAlls(){           //批量删除
        if(this.actionIds.ids.length==0){
          return this.$message.error("请选择用户");
        }
        this.openDele()
      },
      openAlls(){          //批量启用
        if(this.actionIds.ids.length==0){
          return this.$message.error("请选择用户");
        }
        this.$http.RoleRoleEnable(this.actionIds).then((res)=>{
          if(res.code==1){
            this.emptyCheck()
            this.getList()
          }
        })
      },
      stopStatus(){       //批量停用
        if(this.actionIds.ids.length==0){
          return this.$message.error("请选择用户");
        }
        this.switchTxt('closeStatus')
      },
      adduser(id){        //添加用户
		this.$router.push({path:"AddRole",query:{id}}) 
      },
      lookDetails(id){      //查看详情
        this.$router.push({path:"userRoleDetails",query:{id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
	@import '@/assets/css/ConfigurationManagement/AuthorityManagement/index.scss';
</style>
