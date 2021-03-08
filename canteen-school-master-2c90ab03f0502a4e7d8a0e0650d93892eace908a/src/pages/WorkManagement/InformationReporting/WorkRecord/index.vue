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
          <span>记录类型：</span>
          <a-select
              default-value="全部"
              style="width: 170px"
              v-model="postData.type"
              @change="searchs"
            >
              <a-select-option :value="item.id" v-for="(item,index) in typeArr" :key="index">{{item.name}}</a-select-option>
          </a-select>
        </div>
        <div>
          <span>年份：</span>
          <a-select
              default-value="全部"
              style="width: 170px"
               v-model="postData.year"
               @change="searchs('mounth')"
            >
              <a-select-option :value="item.id" v-for="(item,index) in yearData" :key="index">{{item.year}}</a-select-option>
          </a-select>
        </div>
        <div>
          <span>月份：</span>
          <a-select
              placeholder="请选择"
              style="width: 170px"
              v-model="postData.month"
              :disabled="postData.year==''?true:false"
               @change="searchs"
            >
              <a-select-option :value="item.month" v-for="(item,index) in mounths" :key="index">{{item.month_name}}</a-select-option>
          </a-select>
        </div>
      </div>
      <a-button type="primary" @click="adds('')">新增</a-button>
    </div>
    <a-table :columns="columns" :data-source="data"
     :scroll="{ y: 540,x:1500 }"
     class="tables"
     bordered
     :rowKey="(record,index)=>{return index}"
     @change="pageCheck"
     :pagination="pagination"
     :loading="loading">
         <div slot="imgs" slot-scope="text,row">
           <img v-lazy="row.content[0]" class="tabImg"/>
         </div>
        <div slot="action" slot-scope="text,row,index" class="actiosn main_color">
          <span @click="looks(row.id)">查看</span>
          <span @click="adds(row.id)">编辑</span>
          <span @click="deles(row.id,index)">删除</span>
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
  export default {
    data() {
      return {
        deleShow:false,
        typeArr:[{id:"",name:"全部"}],
        yearData:[{id:"",year:"全部"}],
        mounths:[],
        postData:{
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
          keyword:"",
          type:"",
          year:"",
          month:undefined
        },
        deleData:{
          id:"",
          index:""
        },
        columns:[
          { title: '年份', width: 150, dataIndex: 'year', key: 'year',align:"center",fixed: 'left',
            customRender: (value, row, index) => {
              return value+"年"
            }
          },
          { title: '月份', width: "13%", dataIndex: 'month', key: 'month',align:"center",
            customRender: (value, row, index) => {
              return value+"月"
            }
          },
          { title: '标题', width: "22%", dataIndex: 'title', key: 'title',align:"center"},
          { title: '工作记录', dataIndex: 'img', key: 'img', width: "35%",align:"center",
            scopedSlots: { customRender: 'imgs' },
          },
          { title: '记录类型', width: "20%", dataIndex: 'type', key: 'type',align:"center" },
          { title: '创建时间', dataIndex: 'create_time', key: 'create_time', width: "20%",align:"center" },
          { title: '创建人', dataIndex: 'nickname', key: 'nickname', width: "20%",align:"center"},
          {
            title: '操作',
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
      }
    },
    created(){
      this.getWorkType()
      this.getSearchs("year");
      this.getList();
    },
    methods: {
      getWorkType(){
        this.$store.commit("sch_setLoaing",true)
        this.$http.CommonWorkType().then((res)=>{
          this.$store.commit("sch_setLoaing",false)
          if(res.code==1){
            localStorage.setItem("workTypesd",JSON.stringify(res.data))
            this.typeArr = this.typeArr.concat(res.data)
          }
        })
      },
      deles(id,index){          //删除
        this.deleData.index = index
        this.deleData.id = id
        this.deleShow = true
      },
      okDelets(){          //确认删除
        this.$http.InfoRecordDel(this.deleData).then((res)=>{
          if(res.code==1){
            this.data.splice(this.deleData.index,1)
            this.deleShow = false
          }
        })
      },
      getSearchs(type,id){           //获取搜索条件
         this.$http.RecipesGetSearchMonth({id}).then((res)=>{
            if(res.code==1){
              if(type=='year'){
                 this.yearData = this.yearData.concat(res.data);
              }else{
                var mounths = [{month:"",month_name:"全部"}]
                var newsd = JSON.parse(JSON.stringify(res.data))
                newsd.forEach((item)=>{
                  item.month_name = item.month
                })
                this.mounths = mounths.concat(newsd)
              }
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
      getList(){                 //获取列表
        this.loading = true
        this.$http.InfoRecordList(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },
      searchs(type){            //搜索
        if(type=="mounth"){
          this.getSearchs('mounth',this.postData.year)
          this.postData.month = undefined
        }
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      adds(id){            //新增
        this.$router.push({path:"/ManagementPanel/t_addWork",query:{id}})
      },
      looks(id){            //查看详情
       this.$router.push({path:"/ManagementPanel/t_workDetails",query:{id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/disclosure.scss';
</style>
