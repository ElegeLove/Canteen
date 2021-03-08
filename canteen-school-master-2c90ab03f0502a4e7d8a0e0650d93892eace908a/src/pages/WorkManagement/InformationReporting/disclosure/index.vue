<template>
  <div class="padd">
    <div class="searBox">
      <div class="search">
        <span>名称：</span>
        <a-input placeholder="输入标题名称" v-model="postData.keyword"/>
        <a-button type="primary" @click="searchs">搜索</a-button>
      </div>
    </div>
    <div class="seleBox">
      <div>
        <div>
          <span>学期：</span>
          <a-select
              default-value="全部"
              style="width: 120px"
              v-model="postData.semester"
              @change="calenChange('semester')"
            >
              <a-select-option :value="item.id" v-for="(item,index) in semester" :key="index">{{item.year}}{{item.semester}}</a-select-option>
          </a-select>
        </div>
        <div  class="dateBox">
          <span>周：</span>
           <a-select
                placeholder="请选择"
                style="width: 120px"
                v-model="postData.week_id"
                :disabled="postData.semester==''?true:false"
                @change="calenChange"
              >
                <a-select-option :value="item.id" v-for="(item,index) in weekData" :key="index">{{item.id==""?item.weeks:"第"+item.weeks+"周"}}</a-select-option>
            </a-select>
        </div>
        <div>
          <timeSelection title="创建日期" @getTims="getTims"/>
        </div>
      </div>
      <a-button type="primary" @click="adds('')">新增</a-button>
    </div>
    <a-table :columns="columns" :data-source="data"
     :scroll="{ y: 500,x:1500 }"
     class="tables"
     bordered
     :rowKey="(record,index)=>{return index}"
     @change="pageCheck"
     :pagination="pagination"
     :loading="loading">
         <div slot="imgs" slot-scope="text,row">
           <img v-lazy="row.image[0]" class="tabImg"/>
         </div>
        <div slot="action" slot-scope="text,row,index" class="actiosn main_color">
          <span @click="looks(row.id)">查看</span>
          <span @click="adds(row.id)">编辑</span>
          <span @click="deles(row.id,index)">删除</span>
        </div>
        <div slot="feedback" slot-scope="text,row,index">
           <a-tooltip placement="topLeft" :title="text" arrow-point-at-center>
             <span class="danshen maxwidths curpoter">{{text}}</span>
           </a-tooltip>
        </div>
     </a-table>
     <a-modal
        v-model="deleShow"
        title="删除确认"
        centered
        cancelText="取消"
        okText="确认"
        @ok="okDelets"
      >
        <div class="deleTxt">确认删除该记录吗？</div>
      </a-modal>
  </div>
</template>

<script>
  import moment from "moment";
  import timeSelection from "../../../../components/TimeSelection/index.vue"
  export default {
    data() {
      return {
        semester:[{id:"",year:"全",semester:"部"}],
        columns:[
          { title: '学期', width: 150, dataIndex: 'semester', key: 'semester',align:"center",fixed: 'left',
            customRender: (value, row, index) => {
              return row.year+"年"+value
            }
          },
          { title: '学周', dataIndex: 'week', key: 'week', width: "10%",align:"center",
            customRender: (value, row, index) => {
              return "第"+value+"周"
            }
          },
          { title: '标题', dataIndex: 'title', key: 'title', width: "20%",align:"center"},
          { title: '营改（食堂）公示栏照片', dataIndex: 'image', key: 'image', width: "30%",align:"center",
            scopedSlots: { customRender: 'imgs' },
          },
          { title: '创建时间', dataIndex: 'create_time', key: 'create_time', width: "20%",align:"center" },
          { title: '上级反馈内容', dataIndex: 'feedback', key: 'feedback', width: "20%",align:"center",
            scopedSlots: { customRender: 'feedback' },
          },
          {
            title: '操作按钮',
            key: 'operation',
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
            align:"center",
            width:150
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
          keyword:"",
          semester:"",
          week_id:undefined,
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
          start_time:"",
          end_time:""
        },
        weekData:[],
        deleData:{           //删除缓存数据
          id:"",
          index:""
        },
        deleShow:false
      }
    },
    created(){
      this.getSemester("semester")
      this.getList()
    },
    components:{
      timeSelection
    },
    methods: {
      getTims(obj){
        this.postData.start_time = obj.start_time
        this.postData.end_time = obj.end_time
        this.searchs()
      },
      deles(id,index){          //删除
        this.deleData.index = index
        this.deleData.id = id
        this.deleShow = true
      },
      okDelets(){          //确认删除
        this.$http.InfoInformationDel(this.deleData).then((res)=>{
          if(res.code==1){
            this.data.splice(this.deleData.index,1)
            this.deleShow = false
          }
        })
      },
      adds(id){            //新增
        this.$router.push({path:"/ManagementPanel/DisclosureNewInformation",query:{id}})
      },
      looks(id){            //查看详情
       this.$router.push({path:"/ManagementPanel/DisclosureLookDetails",query:{id}})
      },
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion;
        this.postData.page = current;
        this.postData.pageSize = pageSize;
        this.pagination.pageSize = pageSize;
        this.pagination.current = current;
        this.getList()
      },
      searchs(){            //搜索
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      getList(){                 //获取列表
        this.loading = true
        this.$http.InfoInformationList(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },
      calenChange(type){          //选择学期回调
        this.getSemester('week',this.postData.semester);
        if(this.postData.semester==""||type=="semester"){
          this.postData.week_id = undefined
        }
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      getSemester(type,id){            //获取搜索条件
         this.$http.RecipesGetSearch({id:id}).then((res)=>{
           if(res.code==1){
             if(type=='semester'){
                this.semester = this.semester.concat(res.data)
             }else{
               var weekData = [{id:"",weeks:"全部"}]
               this.weekData = weekData.concat(res.data)
             }
           }
         })
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/disclosure.scss';
</style>
