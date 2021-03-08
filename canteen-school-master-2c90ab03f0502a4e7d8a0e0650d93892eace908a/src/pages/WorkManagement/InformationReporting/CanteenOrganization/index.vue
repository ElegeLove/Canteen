<template>
  <div>
    <goback title="返回" />
    <div class="boxs">
      <a-tabs v-model="typekey" tabPosition="top" @change="change">
        <a-tab-pane :tab="item.tit" :key="item.key" v-for="(item,index) in typeArr">
          <!-- <canteenManagement :types="typekey" ref="chList"/> -->
        </a-tab-pane>
      </a-tabs>
      <div class="seachBox">
        <div>
          <span>学期：</span>
          <a-select
              default-value="全部"
              @change="searchs"
               placeholder="请选择"
               v-model="postData.semester"
            >
              <a-select-option :value="item.id" v-for="(item,index) in semester" :key="index">{{item.year}}{{item.semester}}</a-select-option>
          </a-select>
        </div>
        <div>
          <span>学校：</span>
          <a-select
              default-value="全部"
              @change="searchs"
               placeholder="请选择"
               v-model="postData.school_id"
            >
              <a-select-option :value="item.id" v-for="(item,index) in schoolData" :key="index">{{item.abbreviation}}</a-select-option>
          </a-select>
        </div>
        <div>
          <span>状态：</span>
          <a-select
              default-value="全部"
              @change="searchs"
               placeholder="请选择"
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
          class="tables"
          @change="pageCheck"
         :loading="loading">
          <div slot="action" slot-scope="text,row,index" class="actiosn main_color">
             <span v-if="row.is_fill=='未填写'" @click="edites(row)">填写</span>
             <span v-else @click="lookDetails(row)">查看</span>
          </div>
       </a-table>
    </div>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  import canteenManagement from "./CanteenManagement.vue"
  export default {
    components: {
      goback,
      canteenManagement
    },
    data() {
      return {
        semester:[{id:"",year:"全",semester:"部"}],
        schoolData:[{id:"",abbreviation:"全部"}],
        statusData:[{id:"",name:"全部"},{id:2,name:"未填写"},{id:1,name:"已填写"}],
        typekey: 1,
        typeArr: [{
          tit: "食堂管理人员",
          key: 1
        }, {
          tit: "监委会",
          key: 2
        }, {
          tit: "家长委员会",
          key: 3
        },{
          tit: "膳食委员会",
          key: 4
        },{
          tit: "食品安全领导小组",
          key: 5
        },{
          tit: "营改领导小组",
          key: 6
        },{
          tit: "食品采购小组",
          key: 7
        }],
        columns:[
          { title: '学校', width: 300, dataIndex: 'full_name', key: 'full_name', fixed: 'left',align:"center" },
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
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
          semester:"",
          school_id:"",
          status:"",
          type:1
        },
      }
    },
    created() {
      var key = localStorage.getItem("routesKey");
      if (key !== null) {
        this.typekey = Number(key)
        this.postData.type = Number(key)
      }
      this.getSemester();
      this.getSchool();
      this.getList()
    },
    methods: {
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
      change(e) { //切换
        localStorage.setItem("routesKey", e)
        this.postData.type = e;
        this.searchs()
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
        this.$http.InfoCanteengrouplist(this.postData).then((res)=>{
           this.loading = false
          if(res.code==1){
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      },
      edites(row){        //填写
        var objs = {
          school:row.full_name,
          year:row.year+"年"+row.semester
        }
        localStorage.setItem("infoScolls",JSON.stringify(objs))
        if(this.typekey==1){             //食堂管理人员
          this.$router.push({path:"/ManagementPanel/t_FillManager",query:{calendar_id:row.calendar_id,school_id:row.id}})
        }else{
          this.$router.push({path:"/ManagementPanel/t_OtherPersonnel",query:{type:this.typekey,calendar_id:row.calendar_id,school_id:row.id}})
        }
      },
      lookDetails(row){        //查看
        var objs = {
          school:row.full_name,
          year:row.year+"年"+row.semester
        }
        localStorage.setItem("infoScolls",JSON.stringify(objs))
        this.$router.push({path:"/ManagementPanel/t_CanteenDetails",query:{type:this.typekey,calendar_id:row.calendar_id,school_id:row.id}})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/CanteenOrganization/index.scss';
</style>
