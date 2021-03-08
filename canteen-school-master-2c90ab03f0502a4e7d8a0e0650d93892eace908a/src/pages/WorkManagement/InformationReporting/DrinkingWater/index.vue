<template>
  <div>
    <goback title="返回"/>
    <div class="box_padd">
       <div class="flexBox">
         <div>
           <span>学期：</span>
           <a-select
               default-value="全部"
               style="width: 120px"
               placeholder="请选择"
               @change="searchs"
               v-model="postData.semester"
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
               v-model="postData.status"
             >
               <a-select-option :value="item.id" v-for="(item,index) in statusData" :key="index">{{item.name}}</a-select-option>
           </a-select>
         </div>
       </div>
       <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 500 }"
          :pagination="pagination"
           bordered
           :rowKey="(record,index)=>{return index}"
           @change="pageCheck"
          :loading="loading">
           <div slot="action" slot-scope="text,row,index" class="actiosn main_color">
              <span @click="editPage(row)" v-if="row.is_fill=='未填写'">填写</span>
              <span v-else @click="lookDetails(row)">查看</span>
           </div>
        </a-table>
    </div>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        semester:[{id:"",year:"全",semester:"部"}],
        schoolData:[{id:"",full_name:"全部"}],
        statusData:[{id:"",name:"全部"},{id:2,name:"未填写"},{id:1,name:"已填写"}],
        columns:[
          { title: '学校', width: 300, dataIndex: 'full_name', key: 'full_name',align:"center",fixed: 'left'},
          { title: '学期', width: "50%", dataIndex: 'year', key: 'year',align:"center",
            customRender: (value, row, index) => {
              return row.year+"年"+row.semester
            }
          },
          { title: '状态', dataIndex: 'is_fill', key: 'is_fill', width: "50%",align:"center" },
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
          semester:"",
          school_id:"",
          status:"",
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
        }
      }
    },
    components:{
      goback
    },
    created(){
      this.getSemester()
      this.getSchool()
      this.getList()
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
      getList(){                 //获取列表
        this.loading = true
        this.$http.InfoWaterList(this.postData).then((res)=>{
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
      editPage(item){         //填写
        var years = item.year+"年"+item.semester
        var objs = {
          calendar_id:item.calendar_id,
          years,
          school_id:item.id,
          school:item.full_name,
          total_count:item.total_count
        }
        this.$router.push({path:"/ManagementPanel/t_WaterAdd",query:objs})
      },
      lookDetails(item){          //查看
        var objs = {
          school_id:item.id,
          calendar_id:item.calendar_id,
          years:item.year+"年"+item.semester,
          school:item.full_name,
          total_count:item.total_count
        }
        this.$router.push({path:'/ManagementPanel/t_WaterDetails',query:objs})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
.flexBox{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  >div{
    margin-right: 20px;
    margin-bottom: 30px;
    >span{
      color: #333333;
    }
  }
}
.box_padd{
  box-sizing: border-box;
  padding: 10px 40px;
}
.actiosn{
  cursor: pointer;
}
</style>
