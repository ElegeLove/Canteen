<template>
  <div class="pads">
    <div class="searchBoxs">
      <div class="seleBoxs">
        <div>
          <span>状态：</span>
          <a-select
              default-value="全部"
              style="width: 150px"
              v-model="postData.status"
              @change="searchs"
            >
              <a-select-option :value="item.id" v-for="(item,index) in semester" :key="index">{{item.name}}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="btnBoxs">
         <a-button type="primary" @click="allDus('sets')">标注已读</a-button>
         <a-button type="primary"  @click="deleAll('all')">批量删除</a-button>
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
        <span @click="deleAll('one',row)">删除</span>
      </div>
      <div slot="content" slot-scope="text,row" class="danshen">
        <a-tooltip placement="topLeft" :title="text" arrow-point-at-center>
          <span class="messag danshen curpoter"><span v-if="row.status==1&&text!==''"></span>{{text}}</span>
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
  import {mapMutations} from 'vuex';
  export default{
    data(){
      return{
        statusShow:false,
        semester:[{id:"",name:"全部"},{id:1,name:"未读"},{id:2,name:"已读"}],
        columns:[
          {
            title: '标题',
            dataIndex: 'content',
            align:"center",
            key:"content",
            width: "34%",
            scopedSlots: { customRender: 'content' },
          },
          {
            title: '类型',
            dataIndex: 'message_type',
            key:"message_type",
            align:"center",
            width: "33%"
          },
          {
            title: '时间',
            dataIndex: 'create_time',
            key:"create_time",
            align:"center",
            width: "33%"
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
        postData:{
          status:1,
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
        },
        actionIds:{              //标注已读，批量删除的数据
          ids:[]
        },
      }
    },
    created(){
      var loca = localStorage.getItem('statusKey');
      if(loca!=null||loca!=undefined){
        this.postData.status = localStorage.getItem('statusKey')==""?"":Number(localStorage.getItem('statusKey'));
        localStorage.removeItem('statusKey')
      }
      this.getList()
    },
    methods:{
      getList(){                 //获取列表
        this.emptyCheck()
        this.loading = true
        this.$http.MessageNoticeCenterList(this.postData).then((res)=>{
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
      onSelectChange(selectedRowKeys,item) {              //选择
         this.selectedRowKeys = selectedRowKeys;
         var arr = []
         item.forEach((item)=>{
           arr.push(item.id)
         })
         this.actionIds.ids = arr;
      },
      emptyCheck(){        //清空选中
        this.selectedRowKeys = []
        this.actionIds.ids = []
      },
      allDus(call){             //标注已读
        if(this.actionIds.ids.length==0){
          return this.$message.error("请选择消息");
        }
        this.$store.commit("sch_setLoaing",true)
        this.$http.MessageReadAll(this.actionIds).then((res)=>{
          this.$store.commit("sch_setLoaing",false);
          if(res.code==1){
            this.$store.commit("sch_setMessages",true);
            this.emptyCheck()
            if(call=='sets'){
              this.$message.success('已读成功');
              this.getList()
            }
            setTimeout(()=>{
              this.$store.commit("sch_setMessages",false);
            },300)
          }else{
            this.$message.error('已读失败');
          }
          if(call!='sets'){
            call()
          }
        })
      },
      deleAll(type,item){          //批量删除,删除
        if(type=="all"){
          if(this.actionIds.ids.length==0){
            return this.$message.error("请选择消息");
          }
        }else{
          this.actionIds.ids = [item.id]
        }
        this.statusShow = true;
      },
      subModals(){             //删除确认
        this.statusShow = false;
        this.$store.commit("sch_setLoaing",true)
        this.$http.MessageDeleteAll(this.actionIds).then((res)=>{
          this.$store.commit("sch_setLoaing",false);
          if(res.code==1){
            this.allDus(()=>{})
            this.getList()
          }
        })
      },
      lookDetails(item){        //查看详情
        var objs = {
          7:"/ManagementPanel/t_WarningNotice/t_Untreated",
          8:"/ManagementPanel/t_WarningNotice/t_Untreated",
          9:"/ManagementPanel/t_WarningNotice/t_Untreated",
          10:"/ManagementPanel/CreateRecipes",
          11:"/outAndIn/in/inIndex/list",
          12:"/outAndIn/out/outIndex/list",
          13:"/ManagementPanel/Disclosure",
          14:"/ManagementPanel/t_WorkRecord",
          15:"/ManagementPanel/t_NoticeDetails",             //详情
          16:"/ManagementPanel/t_NoticeNotice/t_TwoCenter",
          17:"/ManagementPanel/t_QuestionnaireInvestigation",
          18:"/ManagementPanel/t_BusinessTraining",
          19:"/ManagementPanel/SupplierManagement/SuppliersAudited",
          20:"/ManagementPanel/t_NoticeDetails",                //详情
          21:"/ManagementPanel/t_WarningNotice/t_Untreated",
          22:"/ManagementPanel/t_NoticeDetails",                    //详情
          23:"/ManagementPanel/SupplierManagement/PartnerSuppliers",                    //详情
          26:"/ManagementPanel/t_NoticeDetails",
          27:"/ManagementPanel/t_NoticeDetails"
        }
        if(item.status==1){
          this.actionIds.ids = [item.id];
          this.allDus(()=>{
            this.goRoutes(objs,item)
          })
        }else{
          this.goRoutes(objs,item)
        }
      },
      goRoutes(objs,item){        //跳转
        if(item.type==10){   //创建食谱
          this.$router.push({path:objs[item.type],query:{week_id:item.order_id,type:"add"}})
        }else{
          if(item.type == 15 || item.type == 17 || item.type == 20 || item.type == 22|| item.type == 26|| item.type == 27){
            localStorage.setItem('statusKey',this.postData.status);
          }
          this.$router.push({path:objs[item.type],query:{id:item.id}})
        }
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
@import '../../../../assets/css/WorkManagement/NoticeNotice/NotificationCenter/index.scss';
</style>
