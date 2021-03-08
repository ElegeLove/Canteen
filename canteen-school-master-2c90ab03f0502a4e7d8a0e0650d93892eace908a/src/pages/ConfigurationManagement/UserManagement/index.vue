<template>
  <div class="boxss">
     <div class="selecs">
        <p>用户：</p>
        <a-input placeholder="用户名/职位/账号" v-model="postData.keyword"/>
        <a-button type="primary" @click="searchs">搜索</a-button>
     </div>
     <div class="selecs">
        <p>职位权限：</p>
        <a-select
            style="width: 200px"
            default-value="全部"
            placeholder="请选择职位"
            @change="searchs"
             v-model="postData.role"
          >
            <a-select-option :value="item.id" v-for="(item,index) in position" :key="index">{{item.name}}</a-select-option>
        </a-select>
     </div>
     <div class="btnBox">
        <a-button type="primary" icon="usergroup-add" @click="adduser('')">添加用户</a-button>
         <a-button @click="stopStatus">批量停用</a-button>
         <a-button @click="openAlls">批量启用</a-button>
         <a-button @click="deleAll">批量删除</a-button>
     </div>
     <a-table
       :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange,getCheckboxProps:getCheckboxProps }"
       :columns="columns"
       :data-source="data"
        bordered
       :loading="loading"
       class="tables"
        @change="pageCheck"
       :pagination="pagination"
       :scroll="{x:1500, y: 500 }"
     >
       <div slot="imgs" slot-scope="text">
         <img src="../../../assets/image/loginBg.png" class="imgs"/>
       </div>
       <div slot="status" slot-scope="text,items,index">
         <a-switch checked-children="启用" un-checked-children="关闭" :disabled="items.role==0" :checked="items.status==1?true:false" @click="switchs(items,index)"/>
       </div>
       <div slot="action" slot-scope="text,rows" class="actiosn main_color">
         <span @click="lookDetails(rows)">查看</span>
         <span @click="adduser(rows.id)" v-if="rows.role!==0">编辑</span>
         <span @click="delets(rows.id)" v-if="rows.role!==0">删除</span>
       </div>
     </a-table>
     <a-modal
       v-model="statusShow"
       :title="modalObj.title"
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
        modalObj:{},
        statusShow:false,
        position:[{id:"",name:"全部"}],
        columns:[
          {
            title: '用户名',
            dataIndex: 'username',
            align:"center",
            width:260,
            fixed: 'left',
          },
          {
            title: '职位权限',
            dataIndex: 'role_name',
            align:"center",
            width:"25%",
          },
          {
            title: '手机号码',
            dataIndex: 'mobile',
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
        selectedRowKeys: [],   //选中得下标
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
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
          role:undefined,
          keyword:""
        }
      }
    },
    created(){
      this.getPosition()
      this.getList()
    },
    methods:{
      getCheckboxProps(record){
        return {
           props: {
            disabled: record.role ==0||record.role ==1,
            role: record.role,
          }
        }
      },
      getList(){                 //获取列表
        this.loading = true;
        this.emptyCheck();
        this.$http.RoleUser(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            var asss = JSON.parse(JSON.stringify(res.data.data))
            asss.forEach((it,index)=>{
              it.key=index
            })
            this.data = asss
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
      searchs(){        //搜索
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      getPosition(){            //获取角色筛选列表
        this.$http.RoleUserRole().then((res)=>{
          if(res.code==1){
            this.position = this.position.concat(res.data)
            localStorage.setItem("rolelist",JSON.stringify(res.data))
          }
        })
      },
      onSelectChange(selectedRowKeys,item) {         //选中的数据处理
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
          this.$http.RoleUserEnable(this.actionIds).then((res)=>{
            if(res.code==1){
              this.emptyCheck()
              item.status = item.status==1?2:1
            }
          })
        }
      },
      switchTxt(type){              //状态提示框
        this.modalObj = {
         title:"确认停用",
         cont:"停用后用户将无法正常登录，是否继续？",
         type:type
        }
         this.statusShow = true
      },
      openDele(){            //删除提示框
        this.modalObj = {
         title:"确认删除",
         cont:"删除后用户将无法正常登录，是否继续？",
         type:"dele"
        }
         this.statusShow = true
      },
      delets(id){                //删除
        this.actionIds.ids = id
        this.openDele()
      },
      deleAll(){          //批量删除
        if(this.actionIds.ids.length==0){
          return this.$message.error("请选择用户");
        }
        this.openDele()
      },
      openAlls(){          //批量启用
        if(this.actionIds.ids.length==0){
          return this.$message.error("请选择用户");
        }
        this.$http.RoleUserEnable(this.actionIds).then((res)=>{
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
      emptyCheck(){        //清空选中
        this.selectedRowKeys = []
        this.actionIds.ids = []
      },
      subModals(){         //弹框确认
        this.statusShow = false
        var {type} = this.modalObj
        if(type=="dele"){         //删除
          this.$http.RoleUserDelete(this.actionIds).then((res)=>{
            if(res.code==1){
              this.emptyCheck()
              this.getList()
            }
          })
        }else if(type=="closeStatus"){       //停用
           this.$http.RoleUserDisable(this.actionIds).then((res)=>{
             if(res.code==1){
              this.getList()
              this.emptyCheck()
             }
           })
        }
      },
      adduser(id){        //添加用户
        this.$router.push({path:"/ManagementPanel/AddUser",query:{id}})
      },
      lookDetails(item){      //查看详情
        this.$router.push({path:"/ManagementPanel/lookDetails",query:{id:item.id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../assets/css/ConfigurationManagement/UserManagement/index.scss';
</style>
