<template>
  <div>
    <goback title="返回"/>
    <div class="boxs">
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
          class="tables"
         :loading="loading">
          <div slot="action" slot-scope="text,row" class="actiosn main_color">
            <span @click="lookFiles(row)" v-if="row.status_name!==0">查看文件</span>
            <span @click="upFilesd(row)" v-if="row.status_name!==2">{{row.status_name==0?'上传扫描件':'重新上传扫描件'}}</span>
            <span @click="upDrFile(row)" v-if="row.status_name!==2">{{row.status_name==0?'上传文件':'重新上传文件'}}</span>
          </div>
          <div slot="filesd" slot-scope="text,row" class="actiosn">
            <span v-if="text==''">--</span>
            <span class="main_color" v-else @click="lookImage(row)">预览</span>
          </div>
       </a-table>
       <a-modal
             v-model="upShow"
             title="上传扫描件"
             centered
             width="900"
             okText="提交"
             @ok="subScann"
           >
           <div class="up_tit">上传扫描件（不超过10张）：</div>
          <drg-file @getFile="getImg" :max="10" ref="is_scanning" accept=".jpg,.png,.jpeg"/>
      </a-modal>
      <a-modal
             v-model="fileShow"
             title="上传文件"
             centered
             width="900"
             okText="提交"
             @ok="subFile"
           >
           <div class="up_tit">上传文件（不超过10张）：</div>
          <drg-file @getFile="getFile" :max="10" ref="file" accept=".pdf,.doc,.docx" acceptTxt="只能上传 word、pdf文件"/>
      </a-modal>
      <a-modal
         v-model="lookFile"
         title="查看文件"
         centered
         width="50%"
         @ok="() => (lookFile = false)"
       >
         <a-table :columns="lookColumns" :data-source="lookDatas" :scroll="{ y: 500 }"
            :pagination="false"
             bordered
             :loading="lookLoading"
             :rowKey="(record,index)=>{return index}"
            >
            <div slot="lookAction" slot-scope="text,row" class="actiosn main_color">
               <span @click="downLoad(row)">下载</span>
            </div>
          </a-table>
      </a-modal>
    </div>
    <!--预览-->
    <div class="images" v-viewer="{movable: false}" v-show="false">
       <img v-for="src in modelImage" :src="src" :key="src">
      </div>
  </div>
</template>

<script>
  import goback from "../../../../components/goBack/index.vue"
  export default{
    data(){
      return{
        modelImage:[],
        semester:[{id:"",year:"全",semester:"部"}],
        schoolData:[{id:"",full_name:"全部"}],
        statusData:[{id:"",name:"全部"},{id:0,name:"未提交"},{id:1,name:"未审核"},{id:2,name:"审核通过"},{id:3,name:"审核不通过"}],
        columns:[
          { title: '学校', width: 280, dataIndex: 'full_name', key: 'full_name', fixed: 'left',align:"center" },
          { title: '学期', width: "20%", dataIndex: 'year', key: 'year',align:"center",
            customRender: (value, row, index) => {
              return row.year+"年"+row.semester
            }
          },
          { title: '文件数量', width: "20%", dataIndex: 'file_count', key: 'file_count',align:"center",
            customRender: (value, row, index) => {
              return value==""?'--':value+'个'
            }
          },
          { title: '扫描件', dataIndex: 'is_scanning', key: 'is_scanning', width: "20%",align:"center",
            scopedSlots: { customRender: 'filesd' },
          },
          { title: '状态', dataIndex: 'status', key: 'status', width: "20%",align:"center" },
          { title: '上传时间', width: "20%", dataIndex: 'create_time', key: 'create_time',align:"center" },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 250,
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
        upShow:false,
        fileShow:false,          //上传文件弹窗控制
        lookFile:false,            //查看文件弹窗控制
        lookDatas:[],               //查看文件数据
        lookLoading:false,        //查看文件loading
        lookColumns:[                   //查看文件表格title
          { title: '文件名',dataIndex: 'name', key: 'name',align:"center" },
          { title: '操作',dataIndex: 'operation', key: 'operation',align:"center",
            scopedSlots: { customRender: 'lookAction' },
          }
        ],
        postData:{
          semester:"",
          school_id:"",
          status:"",
          page:1,
          pageSize:Number(this.$commonJs.PAGE_LINES[0]),
        },
        updateData:{               //上传扫描件/文件请求数据
          school_id:"",
          calendar_id:"",
          file:[],
          image:[]
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
      lookImage(item){          //预览
        this.modelImage = item.is_scanning;
        const viewer = this.$el.querySelector('.images').$viewer
        viewer.show()
      },
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
        this.$http.InfoConstructionList(this.postData).then((res)=>{
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
      getImg(data){           //获取扫描件图片
        this.updateData.image = data;
      },
      getFile(file){            //获取文件
        this.updateData.file = file;
      },
      upFilesd(item){     //上传扫面件
        this.updateData.school_id = item.id;
        this.updateData.calendar_id = item.calendar_id;
        this.upShow = true;
        this.reloadFile(item)
      },
      reloadFile(item){      //重新赋值数据
        var newImage = [];
        var newsFile = [];
        if(item.is_scanning!==''){
          item.is_scanning.forEach((item)=>{
            newImage.push({load:false,url:item,name:decodeURI(this.$commonJs.getType(item))})
          })
        }
        if(item.file!==''){
          item.file.forEach((item)=>{
            newsFile.push({load:false,url:item,name:decodeURI(this.$commonJs.getType(item))})
          })
        }
        this.updateData.image = newImage;
        this.updateData.file = newsFile;
        this.$nextTick(()=>{
          if(this.upShow){
            this.$refs.is_scanning.setArr(newImage)
          }
          if(this.fileShow){
            this.$refs.file.setArr(newsFile)
          }
        })
      },
      subScann(){         //确认上传扫描件
        if(this.updateData.image.length!==0){
          this.updateRequest()
        }else{
          this.$message.error('请上传扫描件');
        }
      },
      subFile(){         //确认上传文件
        if(this.updateData.file.length!==0){
          this.updateRequest()
        }else{
          this.$message.error('请上传文件');
        }
      },
      updateRequest(){          //更新扫描件/文件
        var allDatas = JSON.parse(JSON.stringify(this.updateData))
        var imgs = [];
        var files = [];
        allDatas.file.forEach((item)=>{
          files.push(item.url)
        })
        allDatas.image.forEach((item)=>{
          imgs.push(item.url)
        })
        allDatas.file = files;
        allDatas.image = imgs;
         this.$http.InfoConstructionUpdate(allDatas).then((res)=>{
           if(res.code==1){
             this.fileShow = false;
             this.upShow = false;
             this.getList()
           }
         })
      },
      upDrFile(item){        //上传文件
        this.updateData.school_id = item.id;
        this.updateData.calendar_id = item.calendar_id;
        this.fileShow = true;
        this.reloadFile(item);
      },
      lookFiles(item){          //查看文件
        this.lookDatas = []
        this.lookFile = true;
        this.lookLoading = true;
        this.$store.commit("sch_setLoaing",true)
         this.$http.InfoConstructionInfo({school_id:item.id,calendar_id:item.calendar_id}).then((res)=>{
           this.$store.commit("sch_setLoaing",false)
           this.lookLoading = false;
           if(res.code==1){
             var newsData = JSON.parse(JSON.stringify(res.data.file));
             var fileNews = []
             newsData.forEach((file)=>{
               fileNews.push({url:file,name:decodeURI(this.$commonJs.getType(file))})
             })
             this.lookDatas = fileNews;
           }
         })
      },
      downLoad(item){       //下载文件
         window.open(item.url)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../../assets/css/WorkManagement/InformationReporting/SystemConstruction/index.scss';
</style>
