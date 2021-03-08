<template>
  <div>
    <div class="topBox">
      <div class="searBox">
        <span>员工：</span>
        <a-input placeholder="请输入姓名" v-model="postData.name" />
        <a-button type="primary" class="bg_color" @click="emptyLoad">搜索</a-button>
      </div>
      <a-button type="primary" icon="download" @click="addUser('add')">添加员工</a-button>
    </div>
    <a-row class="seleBox" type="flex" justify="start">
      <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="3">
        <span>职位：</span>
        <a-select style="width: 120px" default-value="全部" v-model="postData.position" @change="emptyLoad">
          <a-select-option :value="item.name_text" v-for="(item,index) in position" :key="index">{{item.name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="3">
        <span>性别：</span>
        <a-select default-value="全部" style="width: 120px" v-model="postData.sex" @change="emptyLoad">
          <a-select-option :value="item.id" v-for="(item,index) in sex" :key="index">{{item.name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="3">
        <span>合同类型：</span>
        <a-select default-value="全部" style="width: 120px" v-model="postData.type" @change="emptyLoad">
          <a-select-option :value="item.id" v-for="(item,index) in contract" :key="index">{{item.name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5">
        <span>就职学校：</span>
        <a-select style="width: 160px" placeholder="请选择学校" default-value="全部" v-model="postData.school_id" @change="emptyLoad">
          <a-select-option :value="item.id" v-for="(item,index) in scolls" :key="index">{{item.full_name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="3">
        <a-button type="primary" ghost class="main_color" @click="exportRoster">导出花名册</a-button>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="3">
        <a-tooltip placement="top">
          <template slot="title">
            <span>请先下载模板，在模板表格中填写信息后，再导入表格</span>
          </template>
          <div class="downLoad">
            <span @click="importModu">导入教职工</span>
            <span @click="downLoad">下载模板</span>
          </div>
        </a-tooltip>
      </a-col>
    </a-row>
    <a-table :columns="columns"
      @change="pageCheck"
      bordered
      :rowKey="(record,index)=>{return index}"
      :data-source="data" :scroll="{ x: 1500, y: 500 }" :pagination="pagination"
      :loading="loading">
      <div slot="action" slot-scope="text" class="actiosn main_color">
        <span @click="lookDea(text.id)">查看</span>
        <span @click="addUser('update',text.id)">修改</span>
        <span @click="openQuit(text)">离职</span>
      </div>
    </a-table>
    <a-modal v-model="modalShow" title="离职" centered cancelText="取消" okText="确认" @ok="quit">
      <div class="quitSele">
        <span>选择离职原因：</span>
        <a-select placeholder="请选择离职原因" style="width: 220px" v-model="quitObj.quit_reason">
          <a-select-option :value="item" v-for="(item,index) in quitData" :key="index">{{item}}</a-select-option>
        </a-select>
      </div>
    </a-modal>
    <a-modal v-model="scollImport" title="选择导入学校" centered cancelText="取消" okText="确认" @ok="importSubs">
      <div class="quitSele">
        <span>选择学校：</span>
        <a-select placeholder="请选择学校" style="width: 220px" v-model="importData.school_id">
          <a-select-option :value="item.id" v-for="(item,index) in importScoll" :key="index">{{item.full_name}}</a-select-option>
        </a-select>
      </div>
    </a-modal>
    <impmodule ref="upfile" @getFiles="getFile"/>
  </div>
</template>

<script>
  import impmodule from "../../components/ImportModule.vue"
  import {
    mapState
  } from 'vuex';
  export default {
    data() {
      return {
        scollImport:false,
        sex: [{
          id: "",
          name: "全部"
        }, {
          id: 1,
          name: "男"
        }, {
          id: 2,
          name: "女"
        }],
        contract: [{
          id: "",
          name: "全部"
        }, {
          id: 0,
          name: "正式"
        }, {
          id: 1,
          name: "临时"
        }],
        position: [{
          name: "全部",
          name_text: ""
        }], //职位
        scolls: [{
          id: "",
          full_name: "全部"
        }], //就职学校
        columns: [{
            title: '序号',
            width: 100,
            dataIndex: 'sort',
            key: 'sort',
            fixed: 'left',
            align: "center"
          },
          {
            title: '就职学校',
            width: "20%",
            dataIndex: 'full_name',
            key: 'full_name',
            align: "center"
          },
          {
            title: '合同类型',
            dataIndex: 'type_text',
            key: 'type_text',
            width: "10%",
            align: "center"
          },
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: "20%",
            align: "center"
          },
          {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            width: "10%",
            align: "center",
            customRender: (value, row, index) => {
              return value == 1 ? '男' : value == 2 ? '女' : '保密'
            }
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: "10%",
            align: "center"
          },
          {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
            width: "20%",
            align: "center"
          },
          {
            title: '联系电话',
            dataIndex: 'mobile',
            key: 'mobile',
            width: "10%",
            align: "center"
          },
          {
            title: '操作按钮',
            key: 'operation',
            fixed: 'right',
            width: 200,
            align: "center",
            scopedSlots: {
              customRender: 'action'
            },
          },
        ],
        data: [],
        loading: true,
        pagination: {
          total: 0,
          current:1,
          pageSize: Number(this.$commonJs.PAGE_LINES[0]), //每页中显示10条数据
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: this.$commonJs.PAGE_LINES, // 每页数量选项
          showTotal: total => `共有 ${total} 条数据`, //分页中显示总的数据
        },
        modalShow: false, //离职弹窗
        quitData: ["正常退休", "正常离职", "违规辞退", "其他原因"], //离职下拉数据
        postData: { //搜索obj
          position: "",
          type: "",
          sex: "",
          school_id: "",
          name: "",
          quit: 0,
          page: 1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
          id:""
        },
        quitObj: { //离职obj
          id: "",
          quit_reason: undefined
        }
        ,importScoll:[],                 //导入选择学校的数据
        importData:{
          school_id:undefined,
          file:""
        }
      }
    },
    components: {
      impmodule
    },
    computed: {
      ...mapState(['commonSchoolSet'])
    },
    mounted() {
      this.postData.id = localStorage.getItem("school_id")
      this.commonSchoolSet.position.forEach((item) => {
        this.position.push({
          name: item.name,
          name_text: item.name_text
        })
      })
    },
    created() {
      this.getScoll()
      this.getList()
    },
    methods: {
      pageCheck(pagetion){              //分页
        var {current,pageSize} = pagetion
        this.postData.page = current
        this.postData.pageSize = pageSize
        this.pagination.pageSize = pageSize
        this.pagination.current = current
        this.getList()
      },
      importModu(){          //导入文档
        this.scollImport = true
      },
      importSubs(){          //确认导入
        if(this.importData.school_id==undefined){
          return this.$message.error('请选择学校');
        }
        this.$refs.upfile.upFile(1);
        this.scollImport = false
      },
      getFile(file){         //获取文件
        this.importData.file = file
        var formData = new FormData();
        formData.append("file",file)
        formData.append("school_id",this.importData.school_id);
        formData.append('central_id',localStorage.getItem("school_id"))
        const hide = this.$message.loading('导入中', 0);
        this.$http.FacultyImport(formData).then((res)=>{
          setTimeout(hide, 0);
          if(res.code==1){
            this.postData.page = 1
            this.getList()
          }
        }).catch(()=>{
           setTimeout(hide, 0);
        })
      },
      downLoad(){         //下载模板
        this.$http.FcultyExcelMoban({})
      },
      exportRoster(){            //导出花名册
         this.$http.FacultyExport(this.postData)
      },
      openQuit(item) { //打开离职弹窗
        this.quitObj.id = item.id
        this.modalShow = true
      },
      quit() { //确认离职
        if (this.quitObj.quit_reason == undefined) {
          return this.$message.error('请选择离职原因');
        }
        this.$http.FacultyQuit(this.quitObj).then((res) => {
          this.quitObj.quit_reason == undefined
          if (res.code == 1) {
            this.modalShow = false
            this.getList()
          }
        })
      },
      getScoll() { //获取学校
        this.$commonJs.getSchool((data) => {
          this.scolls = this.scolls.concat(data)
          this.importScoll = data
        })
      },
      addUser(type, id) { //添加员工
        this.$router.push({
          path: "/AddEmployee",
          query: {
            type,
            id
          }
        })
      },
      lookDea(id) { //查看详情
        this.$router.push({
          path: "/ManagementPanel/EmployeeDetails",
          query: {
            id
          }
        })
      },
      emptyLoad() { //搜索
        this.postData.page = 1
        this.pagination.current = 1
        this.getList()
      },
      getList() { //列表请求
        this.loading = true
        this.$http.FacultyLists(this.postData).then((res) => {
          this.loading = false
          if (res.code == 1) {
            this.data = res.data.data
            this.pagination.total = res.data.total
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../assets/css/internalManagement/Faculty.scss';
</style>
