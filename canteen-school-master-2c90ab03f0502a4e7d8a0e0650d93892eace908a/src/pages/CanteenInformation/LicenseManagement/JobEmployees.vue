<template>
  <div>
    <a-button type="primary" icon="user-add" class="addBtn" @click="addUser('add')">添加员工</a-button>
     <a-row  class="seleBox"  type="flex" justify="start">
        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="4">
          <span>食堂：</span>
          <a-select
              default-value="全部"
              style="width: 120px"
              v-model="postData.canteen_id"
              @change="emptyLoad"
            >
              <a-select-option :value="item.id" v-for="(item,index) in canteen" :key="index">{{item.name}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="4">
          <span>健康证状态：</span>
          <a-select
              default-value="全部"
              style="width: 120px"
               v-model="postData.status"
              @change="emptyLoad"
            >
              <a-select-option :value="item.id" v-for="(item,index) in stausArr" :key="index">{{item.name}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="4" class="topBox">
          <div class="searBox">
             <span>员工：</span>
             <a-input placeholder="请输入姓名" v-model="postData.name"/>
             <a-button type="primary" class="bg_color" @click="emptyLoad">搜索</a-button>
          </div>
        </a-col>
     </a-row>
     <a-table :columns="columns"
        @change="pageCheck"
        :rowKey="(record,index)=>{return index}"
        :data-source="data" :scroll="{ x: 1500, y: 500 }"
        :pagination="pagination"
         bordered
        :loading="loading">
          <div slot="imgs" slot-scope="text">
           <img v-lazy="text" class="imgs"/>
          </div>
         <div slot="action" slot-scope="text" class="actiosn main_color">
           <span @click="lookDetails(text.id)">查看</span>
           <span @click="addUser('update',text.id)">修改</span>
           <span @click="openQuit(text)">离职</span>
         </div>
      </a-table>
      <a-modal
         v-model="modalShow"
         title="离职"
         centered
         cancelText="取消"
         okText="确认"
        @ok="quit"
       >
         <div class="quitSele">
           <span>选择离职原因：</span>
           <a-select
              placeholder="请选择离职原因"
               style="width: 220px"
               v-model="quitObj.quit_reason"
             >
               <a-select-option :value="item" v-for="(item,index) in quitData" :key="index">{{item}}</a-select-option>
             </a-select>
         </div>
       </a-modal>
  </div>
</template>

<script>
  import { mapState,mapMutations} from 'vuex';
  export default{
    data(){
      return{
        modalShow:false,
        quitData:["正常退休","正常离职","违规辞退","其他原因"],           //离职下拉数据CanteenFacultyList
        canteen:[{id:"",name:"全部"}],           //食堂数组
        postion:[{name_text:"",name:"全部"}],            //职位数据
        stausArr:[{id:"",name:"全部"},{id:0,name:"正常"},{id:1,name:"即将过期"},{id:2,name:"已过期"}],           //健康证状态数据
        columns:[
          { title: '序号', width: 100, dataIndex: 'sort', key: 'sort', fixed: 'left',align:"center" },
          { title: '食堂', width: "15%", dataIndex: 'canteen_name', key: 'canteen_name',align:"center"  },
          { title: '照片', dataIndex: 'picture', key: 'picture', width: "15%",
             scopedSlots: { customRender: 'imgs' },align:"center"
          },
          { title: '姓名', dataIndex: 'name', key: 'name', width: "10%",align:"center" },
          { title: '性别', dataIndex: 'sex_text', key: 'sex_text', width: "10%",align:"center", },
          { title: '年龄', dataIndex: 'age', key: 'age', width: "10%",align:"center" },
          { title: '职位', dataIndex: 'position', key: 'position', width: "20%" ,align:"center"},
          { title: '联系电话', dataIndex: 'mobile', key: 'mobile', width: "10%" ,align:"center"},
          { title: '健康证状态', dataIndex: 'health_certificate_status', key: 'health_certificate_status', width: "10%" ,align:"center",
            customRender: (value, row, index) => {
              return value==1?'即将过期':value==2?'已过期':'正常'
            }
          },
          {
            title: '操作按钮',
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
           pageSizeOptions:  this.$commonJs.PAGE_LINES, // 每页数量选项
          showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
        },
        postData:{                       //搜索obj
          canteen_id:"",
          quit:0,
          position:"",
          status:"",
          name:"",
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0])
        },
        quitObj:{            //离职obj
          id:"",
          quit_reason:undefined
        }
      }
    },
    computed: {
      ...mapState(['commonSchoolSet'])
    },
    created(){
      this.getGanteen()
      this.getList()
    },
    methods:{
      ...mapMutations(['setAddEmployee']),
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion
        this.postData.page = current
        this.postData.pageSize = pageSize
        this.pagination.pageSize = pageSize
        this.pagination.current = current
        this.getList()
      },
      openQuit(item){         //打开离职弹窗
        this.quitObj.id = item.id
        this.modalShow = true
      },
      quit(){      //确认离职
        if(this.quitObj.quit_reason==undefined){
          return  this.$message.error('请选择离职原因');
        }
        this.$http.CanteenQuit(this.quitObj).then((res)=>{
          this.quitObj.quit_reason==undefined
          if(res.code==1){
            this.modalShow = false
            this.getList()
          }
        })
      },
      getGanteen(){        //获取所有食堂
        this.$http.CommonGetCanteen().then((res)=>{
          if(res.code==1){
            this.canteen = this.canteen.concat(res.data)
          }
        })
        this.postion = this.postion.concat(this.commonSchoolSet.position)
      },
      addUser(type,id){
        this.setAddEmployee({})
        this.$router.push({path:"/ManagementPanel/JobAddEmployee",query:{type,id}})
      },
      lookDetails(id){      //查看详情
        this.$router.push({path:"/ManagementPanel/JobEmployDetails",query:{id}})
      },
      emptyLoad(){            //搜索
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      getList(){             //列表请求
        this.loading = true
        this.$http.CanteenFacultyList(this.postData).then((res)=>{
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
@import '../../../assets/css/CanteenInformation/LicenseManagement/JobEmployees.scss';
</style>
