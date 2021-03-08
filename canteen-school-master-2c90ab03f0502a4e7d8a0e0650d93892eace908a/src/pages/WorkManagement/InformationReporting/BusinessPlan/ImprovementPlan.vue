<template>
  <div>
    <div class="flexBox marginsd">
      <div>
        <span>学期：</span>
        <a-select
            default-value="全部"
            style="width: 120px"
            placeholder="请选择"
            @change="searchs"
            v-model="postData.calendar_id"
          >
            <a-select-option :value="item.id" v-for="(item,index) in semester" :key="index">{{item.year}}{{item.semester}}</a-select-option>
        </a-select>
      </div>
      <div>
        <span>学校：</span>
        <a-select
            default-value="全部"
            style="width: 120px"
            placeholder="请选择"
            @change="searchs"
            v-model="postData.school_id"
          >
            <a-select-option :value="item.id" v-for="(item,index) in schoolData" :key="index">{{item.full_name}}</a-select-option>
        </a-select>
      </div>
      <div>
        <span>状态：</span>
        <a-select
            default-value="全部"
            style="width: 120px"
            placeholder="请选择"
            @change="searchs"
            v-model="postData.is_set"
          >
            <a-select-option :value="item.id" v-for="(item,index) in statusData" :key="index">{{item.name}}</a-select-option>
        </a-select>
      </div>
    </div>
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 500 }"
       :pagination="pagination"
        bordered
        @change="pageCheck"
        :rowKey="(record,index)=>{return index}"
       :loading="loading">
        <div slot="action" slot-scope="text,row" class="actiosn main_color">
          <span v-if="row.is_set==2" @click="whiteForm(row)">填写营改计划</span>
          <span v-else @click="lookDetails(row)">查看</span>
        </div>
     </a-table>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        semester:[{id:"",year:"全",semester:"部"}],
        schoolData:[{id:"",full_name:"全部"}],
        statusData:[{id:"",name:"全部"},{id:2,name:"未填写"},{id:1,name:"已填写"}],
        columns:[
          { title: '学校', width: 280, dataIndex: 'school', key: 'school', fixed: 'left',align:"center" },
          { title: '学期', dataIndex: 'year', key: 'year', width: "50%",align:"center",
            customRender: (value, row, index) => {
              return row.year+"年"+row.semester
            }
          },
          { title: '状态', dataIndex: 'is_set_text', key: 'is_set_text', width: "50%",align:"center" },
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
          calendar_id:"",
          school_id:"",
          is_set:"",
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
        },
      }
    },
    created(){
      this.getSemester();
      this.getSchool();
      this.getList();
    },
    methods:{
      getSemester(){            //获取学期
         this.$http.RecipesGetSearch().then((res)=>{
           if(res.code==1){
            this.semester = this.semester.concat(res.data)
           }
         })
      },
      getSchool(){          //获取学校
        this.$commonJs.getSchool((data)=>{
          this.schoolData = this.schoolData.concat(data)
        })
      },
      searchs(){          //搜索
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      getList(){                 //获取列表
        this.loading = true
        this.$http.InformationBusinessReformUserList(this.postData).then((res)=>{
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
      whiteForm(item){        //添加营改计划
        this.$router.push({path:"/ManagementPanel/t_planOne",query:{id:item.id}})
      },
      lookDetails(item){         //查看
         this.$router.push({path:"/ManagementPanel/t_ImprovementDetails",query:{id:item.id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/ImprovementPlan.scss';
</style>
